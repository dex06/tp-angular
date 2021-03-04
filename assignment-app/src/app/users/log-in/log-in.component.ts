import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service'
import { UsersService } from '../../shared/users.service'
import {Users} from '../users.model';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private userService:UsersService, private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
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
        console.log(message);
        if(message.auth == true) {
          this.authService.logIn();
          this.router.navigate(['home']);
        }
        else this.router.navigate(['login']);
        
        
      });


  }

}
