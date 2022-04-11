import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamsDataService } from '../teams-data.service';
import { Teams } from '../teams/teams.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  @Input()
  teamId!:string;
  team!:Teams;
  constructor(private route:ActivatedRoute, private teamsDataservice:TeamsDataService) { }

  ngOnInit(): void {
    const teamId = this.route.snapshot.params["teamId"];
    this.teamsDataservice.getOneTeam(teamId).subscribe(team=>{
      console.log(team);
      
      this.team=team});
  }
  _updateTeam(){
    this.teamsDataservice.getOneTeam(this.route.snapshot.params["teamId"]).subscribe({
      next:(result)=>{
        this.team = result;
      }, 
      error:(err)=>{
        console.log("error", err);
      },
      complete:()=>{
        console.log("Get All teams Completed");
      }
    });
  }
  onPlayerChange(status:any){
    console.log("onPlayerAdded", status);
    this._onDataChanges(status);
  }
  onTeamChange(status:any){
    console.log("onTeamChange", status);
    this._onDataChanges(status);
  }
  _onDataChanges(status:any){
    if(status==200){
      this._updateTeam();
    }
  }

}
