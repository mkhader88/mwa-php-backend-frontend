import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {UsersDataService} from "../users-data.service";
export class Users{
  _id!:string;
  name!:string;
  username!:string;
  password!:string;

}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild("teamForm")
  teamForm!:NgForm;
  user!:Users;
  message!:string;
  color!:string;
  constructor(private service:UsersDataService) { }

  ngOnInit(): void {
    this.message="";
    this.color="";
  }
  setDefaultForm(){
    this.user = new Users();
    this.teamForm.setValue(this.user);
  }
  onSubmit(){
    if(this.teamForm.value.password!=this.teamForm.value.repeatPassword){
      this.message="Password and Repeat Password not Match";
      this.color="red";
    }else{
    this.service.register(this.teamForm.value).subscribe({
      next:(result)=>{
        this.setDefaultForm();
      },
      error:(err)=>{
        console.log("error", err);
        alert("Error "+err);
      },
      complete:()=>{
        this.message="User Registered Successfully";
        this.color="green";
      }
    });
    }
  }
}
