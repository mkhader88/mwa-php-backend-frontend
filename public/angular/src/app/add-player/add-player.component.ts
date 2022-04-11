import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TeamsDataService } from '../teams-data.service';
import { Players, Teams } from '../teams/teams.component';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {
  @Input()
  teamId!:string;

  @ViewChild("addPlayerForm", {static: false})
  addPlayerForm!:NgForm;

  @Output()
  addPlayerEmitter: EventEmitter<number> = new EventEmitter<number>();

  players!:Players;
  constructor(private teamDataservice:TeamsDataService) { }

  ngOnInit(): void {
  }


  onSubmit(){
    console.log(this.addPlayerForm.value);
    this.teamDataservice.addOnePlayer(this.teamId, this.addPlayerForm.value).subscribe({
      next:(result)=>{
      }, 
      error:(err)=>{
        console.log("error", err);
        this.addPlayerEmitter.emit(500);
      },
      complete:()=>{
        this.addPlayerEmitter.emit(200);
        console.log("Get All Players Completed");
      }
    });
  }

}
