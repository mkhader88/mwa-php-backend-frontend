import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamsDataService } from '../teams-data.service';
import { Players } from '../teams/teams.component';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  playerId!:string;
  player!:any;
  constructor(private route:ActivatedRoute, private router:Router, private teamsDataservice:TeamsDataService) { }

  ngOnInit(): void {
    const playerId = this.route.snapshot.params["playerId"];
    const teamId = this.route.snapshot.params["teamId"];
    this.teamsDataservice.getOnePlayer(teamId,playerId).subscribe(player=>{
      console.log(player);
      this.playerId=playerId;
      this.player=player;
    });
  }

 
  deletePlayer():void{
    const playerId = this.route.snapshot.params["playerId"];
    const teamId = this.route.snapshot.params["teamId"];
    this.teamsDataservice.deleteOnePlayer(teamId,playerId).subscribe(result=>{
      this.router.navigate(["team/"+teamId]);
    });
  }
}
