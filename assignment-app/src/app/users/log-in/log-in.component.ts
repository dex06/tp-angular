import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service'
import { UsersService } from '../../shared/users.service'
import {Users} from '../users.model';
import { VariablesGlobales } from '../../shared/VariablesGlobales';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private userService:UsersService, private authService: AuthService, private params: VariablesGlobales, private router:Router) { }

  ngOnInit(): void {
    console.log(this.params.userName)
  }

  userEmail:string
  userPassword:string

  onSubmit(event) {
    event.preventDefault();

    const loginUser = new Users();

    loginUser.email = this.userEmail;
    loginUser.password = this.userPassword;


    this.userService.loginUser(loginUser)
      .subscribe(message => {
      
        if(message.auth == true) {
          this.authService.logIn();
          this.userService.setUserRole(message.role);
          this.userService.setUserName(message.name);
          this.userService.setLogged(true);
          this.params.isLogged = true;
          this.params.userName = message.name;
          this.params.userRole = message.role;
          

          this.router.navigate(['home']);
        }
        else this.router.navigate(['login']);
        
        
      });


  }

}
