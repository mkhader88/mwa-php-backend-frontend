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
  constructor(private service:UsersDataService) { }

  ngOnInit(): void {
  }
  setDefaultForm(){
    this.user = new Users();
    this.teamForm.setValue(this.user);
  }
  onSubmit(){
    this.service.register(this.teamForm.value).subscribe({
      next:(result)=>{
        this.setDefaultForm();
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
