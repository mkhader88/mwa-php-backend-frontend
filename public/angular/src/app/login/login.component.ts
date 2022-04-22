import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {UsersDataService} from "../users-data.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild("loginForm")
  loginForm!:NgForm;

  userLoggedIn!:boolean;

  constructor(private service:UsersDataService) { }

  ngOnInit(): void {
    console.log("user storage",localStorage.getItem('userData'));
    if(localStorage.getItem('userData')){
      this.userLoggedIn=true;
    }else{
      this.userLoggedIn=false;
    }
  }

  checkResult(result:any):void{
    console.log("Logged in successfully",result);
    localStorage.setItem('userData', result);
    this.userLoggedIn=true;
  }

  onSubmit(){
    console.log(this.loginForm.value);
    this.service.login(this.loginForm.value).subscribe({
      next:(result)=>{
        this.checkResult(result);
      },
      error:(err)=>{
        console.log("error", err);
        alert("Error "+err);
      },
      complete:()=>{
        alert("User Registered Successfully");
      }
    });
  }
}
