import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {NgForm} from "@angular/forms";
import {UsersDataService} from "../users-data.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @ViewChild("loginForm")
  loginForm!:NgForm;
  @ViewChild("loginForm")
  logoutForm!:NgForm;
  userLoggedIn!:boolean;
  constructor(private _router:Router,private service:UsersDataService) { }
onHome(): void {
  this._router.navigate(['']);
}
onTeams(): void {
  this._router.navigate(['teams']);
}
onSearch(): void {
  this._router.navigate(['search']);
}
onRegister(): void {
  this._router.navigate(['register']);
}
  ngOnInit(): void {
    console.log("user storage",localStorage.getItem('userData'));
    if(localStorage.getItem('userData')){
      this.userLoggedIn=true;
    }else{
      this.userLoggedIn=false;
    }
  }
  onLogout(){
    this.userLoggedIn=false;
    localStorage.setItem('userData',"");
    this._router.navigate(['']);
  }
  checkResult(result:any):void{
    console.log("Logged in successfully",result);
    localStorage.setItem('userData', result);
    this.userLoggedIn=true;
  }

  onLogin(){
    console.log(this.loginForm.value);
    this.service.login(this.loginForm.value).subscribe({
      next:(result)=>{
        this.checkResult(result);
      },
      error:(err)=>{
        console.log("error", err);
        alert("Wrong Username / Password");
      },
      complete:()=>{
        console.log("User Registered Successfully");
        this._router.navigate(['']);
      }
    });
  }

}
