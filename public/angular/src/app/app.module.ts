import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { TeamsComponent } from './teams/teams.component';
import { HttpClientModule } from '@angular/common/http';
import { TeamComponent } from './team/team.component';
import { DeleteComponent } from './delete/delete.component';
import { AddPlayerComponent } from './add-player/add-player.component';
import { AddTeamComponent } from './add-team/add-team.component';
import { FormsModule } from '@angular/forms';
import { PlayerComponent } from './player/player.component';
import { EditTeamComponent } from './edit-team/edit-team.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    HomeComponent,
    TeamsComponent,
    TeamComponent,
    DeleteComponent,
    AddPlayerComponent,
    AddTeamComponent,
    PlayerComponent,
    EditTeamComponent,
    ErrorPageComponent,
    TeamsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
      path: "",
      component: HomeComponent
      },
      {
        path: "teams",
        component: TeamsComponent
      },
            {
        path: "search/:search",
        component: SearchComponent
      },
      {
        path:"team/:teamId",
        component:TeamComponent
      },
      {
        path:"team/:teamId/player/:playerId",
        component:PlayerComponent
      },
      {
        path:"team",
        component:AddTeamComponent
      },
      {
        path:"team/edit/:teamId",
        component:EditTeamComponent
      },
      {
        path: "**",
        component:ErrorPageComponent
        }
        
      ])
      
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
