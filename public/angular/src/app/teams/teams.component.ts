import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamsDataService } from '../teams-data.service';

export class Players{
  _id!:string;
  name! : string;
  age!: Number;
}

export class Teams{
  _id!:string;
  country!:string;
  year!:number;
  color!:string;
  players!: Players[];

}
@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})



export class TeamsComponent implements OnInit {

  teams: Teams[]=[];
  userLoggedIn!:boolean;

    constructor(private teamsService:TeamsDataService,private _router:Router) { }
    ngOnInit(): void {
      if(localStorage.getItem('userData')){
        this.userLoggedIn=true;
      }else{
        this.userLoggedIn=false;
      }
    this.getDataDB();
    }

    getDataDB():void{
      this.teamsService.getTeams().subscribe(teams => { this.teams= teams; });
    }

    addTeam(): void {
      this._router.navigate(['team']);
    }

}
