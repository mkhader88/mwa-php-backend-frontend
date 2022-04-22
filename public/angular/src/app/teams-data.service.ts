import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Players, Teams } from './teams/teams.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamsDataService {

  constructor(private http:HttpClient) { }

  public getTeams(): Observable<Teams[]> {
    return this.http.get<Teams[]>(environment.BASE_URL + '/teams');
  }
  public searchTeams(search:string): Observable<Teams[]> {
    return this.http.get<Teams[]>(environment.BASE_URL + '/teams/search?search='+search);
  }
  getOneTeam(teamId:string):Observable<Teams>{
    const url:string = environment.BASE_URL+"/teams/"+teamId;
    return this.http.get<Teams>(url);
  }
  getOnePlayer(teamId:string,playerId:string):Observable<Teams>{
    const url:string = environment.BASE_URL+"/teams/"+teamId+"/players/"+playerId;
    return this.http.get<Teams>(url);
  }
  deleteOne(teamId:string){
    const url:string = environment.BASE_URL+"/teams/"+teamId;
    return this.http.delete<Teams>(url);
  }
  addTeam(newTeam:Teams){
/*    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': data });
    let options = { headers: headers };*/
    //console.log(headers);
    const url:string = environment.BASE_URL+"/teams/";
    return this.http.post(url,newTeam);
  }

  addOnePlayer(teamId:string,newPlayer:Players){
    const url:string = environment.BASE_URL+"/teams/"+teamId+"/players";
    console.log(url);

    return this.http.post(url,newPlayer);
  }

  deleteOnePlayer(teamId:string,playerId:string){
    const url:string = environment.BASE_URL+"/teams/"+teamId+"/players/"+playerId;
    console.log(url);

    return this.http.delete(url);
  }

  editOneTeam(teamId:string,editTeam:Teams){
    const url:string = environment.BASE_URL+"/teams/"+teamId;
    console.log(url);

    return this.http.put(url,editTeam);
  }


}

