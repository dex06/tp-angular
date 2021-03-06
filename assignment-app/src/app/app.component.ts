import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';
import { UsersService } from "./shared/users.service";
import { VariablesGlobales } from './shared/VariablesGlobales';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  loggedUserName = this.params.userName;
  loggedUserRole = this.params.userRole;
  isLog = false;

 


  titre = 'Application de gestion des devoirs (Assignments)';
  constructor(private authService: AuthService, private userService: UsersService, public params: VariablesGlobales, private router:Router) {}




  isLogged(){
    return this.params.isLogged;
  }

  unlog() {
    if(this.authService.loggedIn) {
      this.authService.logOut();
      this.params.isLogged = false;
      this.params.userName = "";
      this.params.userRole = "";
      this.router.navigate(['/home']);
    } else {
      this.authService.logIn();
    }
  }
}
