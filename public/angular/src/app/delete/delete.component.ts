import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamsDataService } from '../teams-data.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  _teamId!:string;

  constructor(private gameDataservice:TeamsDataService, private router:Router) { }

  ngOnInit(): void {
  }

  @Input()
  set teamId(gameId:string){
    this._teamId = gameId;
  }

  onDelete():void{
    console.log("OnDelete Called", this._teamId);
    this.gameDataservice.deleteOne(this._teamId).subscribe(result=>{
      this.router.navigate(["teams"]);
    });
  }
}
