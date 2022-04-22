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
  //this.getDataDB();
  }
  getDataDB(event:any):void{
    console.log(event.target.value);

    this.teamsService.searchTeams(event.target.value).subscribe(teams => {
      console.log(teams);

      this.teams= teams; });
  }

}
