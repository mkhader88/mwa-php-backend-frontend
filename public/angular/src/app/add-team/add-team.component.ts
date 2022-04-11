import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TeamsDataService } from '../teams-data.service';
import { Teams } from '../teams/teams.component';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
  @ViewChild("teamForm")
  teamForm!:NgForm;
  team!:Teams;
  constructor(private teamDataservice:TeamsDataService) { }

  ngOnInit(): void {
  }

  setDefaultForm(){
    this.team = new Teams();
    this.teamForm.setValue(this.team);
  }
  onSubmit(){
    this.teamDataservice.addTeam(this.teamForm.value).subscribe({
      next:(result)=>{
        this.setDefaultForm();      
      }, 
      error:(err)=>{
        console.log("error", err);
        alert("Error "+err);
      },
      complete:()=>{
        alert("Team Added Succesfully");
      }
    });
  }
}
