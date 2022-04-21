import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamsDataService } from '../teams-data.service';
import { Teams } from '../teams/teams.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  teams: Teams[]=[];

  constructor(private teamsService:TeamsDataService,private route:ActivatedRoute,private _router:Router) { }
  ngOnInit(): void {
  this.getDataDB();
  }
  getDataDB():void{
    console.log(this.route.snapshot.params["search"]);
    
    this.teamsService.searchTeams(this.route.snapshot.params["search"]).subscribe(teams => {
      console.log(teams);
      
      this.teams= teams; });
  }
}
