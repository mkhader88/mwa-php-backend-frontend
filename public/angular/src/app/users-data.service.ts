import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {Users} from "./register/register.component";

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {

  constructor(private http:HttpClient) { }

  register(newUser:Users){
    const url:string = environment.BASE_URL+"/users/register/";
    return this.http.post(url,newUser);
  }

  login(login:any){
    const url:string = environment.BASE_URL+"/users/login/";
    return this.http.post(url,login);
  }
}

