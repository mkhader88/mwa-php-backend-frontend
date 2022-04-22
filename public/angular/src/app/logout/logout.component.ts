import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {UsersDataService} from "../users-data.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  @ViewChild("loginForm")
  loginForm!:NgForm;

  userLoggedIn!:boolean;
  constructor(private service:UsersDataService) { }

  ngOnInit(): void {
    if(localStorage.getItem('userData')){
      this.userLoggedIn=true;
    }
  }
  onSubmit(){
    this.userLoggedIn=false;
    localStorage.setItem('userData',"");
  }
}
