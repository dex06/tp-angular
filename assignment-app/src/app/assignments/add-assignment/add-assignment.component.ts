import { Component, /*EventEmitter,*/ OnInit /*, Output*/ } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from '../../shared/assignments.service';
import {Assignment} from '../assignment.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  // @Output() nouvelAssignment = new EventEmitter<Assignment>();
  nouvelAssignment:Assignment;
  nomAssignment="";
  dateRendu:Date;

  constructor(private assignmentService:AssignmentsService, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(event) {
    event.preventDefault();

    console.log("onSubmit dans add-assignment")
    const nouvelAssignment = new Assignment();

    nouvelAssignment.id = this.assignmentService.getNewId();

    nouvelAssignment.nom = this.nomAssignment;
    nouvelAssignment.dateDeRendu = this.dateRendu;
    nouvelAssignment.rendu = false;

    //this.assignments.push(nouvelAssignment);
    // on envoie un événement appelé "nouvelAssignment" vers le père (ou autres..)
    //this.nouvelAssignment.emit(nouvelAssignment);

    this.assignmentService.addAssignment(nouvelAssignment)
      .subscribe(message => {
        console.log(message);
        // on navigue vers la page d'accueil, en mettant cette ligne ici on est sur
        // d'afficher le nouvel élément inséré...
        this.router.navigate(['home']);
      });


  }

}
