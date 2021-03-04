import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../shared/users.service'
import {Users} from '../users.model';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private userService:UsersService, private router:Router) { }

  ngOnInit(): void {
  }

  userEmail:string
  userPassword:string

  onSubmit(event) {
    event.preventDefault();

    const loginUser = new Users();

    loginUser.email = this.userEmail;
    loginUser.password = this.userPassword;

    //this.assignments.push(nouvelAssignment);
    // on envoie un événement appelé "nouvelAssignment" vers le père (ou autres..)
    //this.nouvelAssignment.emit(nouvelAssignment);

    this.userService.loginUser(loginUser)
      .subscribe(message => {
        console.log(message);
        // on navigue vers la page d'accueil, en mettant cette ligne ici on est sur
        // d'afficher le nouvel élément inséré...
        this.router.navigate(['home']);
      });


  }

}
