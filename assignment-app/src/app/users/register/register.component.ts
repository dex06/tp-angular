import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../shared/users.service'
import {Users} from '../users.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  Roles: any = ['Admin', 'Author', 'Reader'];

  constructor(private userService:UsersService, private router:Router) { }

  ngOnInit(): void {}

  nouveauUser: Users
  userName: string
  userEmail: string
  userPassword: string
  userRole: string

  onSubmit(event) {
    event.preventDefault();

    const nouveauUser = new Users();

    nouveauUser.id = this.userService.getNewId();

    nouveauUser.name = this.userName;
    nouveauUser.email = this.userEmail;
    nouveauUser.password = this.userPassword;
    nouveauUser.role = this.userRole;

    //this.assignments.push(nouvelAssignment);
    // on envoie un événement appelé "nouvelAssignment" vers le père (ou autres..)
    //this.nouvelAssignment.emit(nouvelAssignment);

    this.userService.addUser(nouveauUser)
      .subscribe(message => {
        console.log(message);
        // on navigue vers la page d'accueil, en mettant cette ligne ici on est sur
        // d'afficher le nouvel élément inséré...
        this.router.navigate(['home']);
      });


  }
  

}
