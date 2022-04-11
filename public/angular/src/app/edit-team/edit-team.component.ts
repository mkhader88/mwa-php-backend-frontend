import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamsDataService } from '../teams-data.service';
import { Teams } from '../teams/teams.component';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent implements OnInit {
  @ViewChild("teamForm")
  teamForm!:NgForm;
  @Input()
  team!:Teams;
  @Input()
  teamId!:string;

  @Output()
  editTeamEmitter: EventEmitter<number> = new EventEmitter<number>();

  
  constructor(private teamDataservice:TeamsDataService,private route:ActivatedRoute,) { }

  ngOnInit(): void {
    const teamId = this.route.snapshot.params["teamId"];
    this.teamDataservice.getOneTeam(teamId).subscribe(team=>{
      console.log(team);
      this.teamForm.setValue(team);
      this.teamId=teamId;
      this.team=team});
  }

  onUpdateClick(){
    console.log("onEdit called", this.teamForm.value);
    this.teamDataservice.editOneTeam(this.route.snapshot.params["teamId"], this.teamForm.value).subscribe({
      next:(result)=>{
      }, 
      error:(err)=>{
        console.log("error", err);
        this.editTeamEmitter.emit(500);
      },
      complete:()=>{
        this.editTeamEmitter.emit(200);
        alert("Team Updated Succesfully");
      }
    });
  }

}
