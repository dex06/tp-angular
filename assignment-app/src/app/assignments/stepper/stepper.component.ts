import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AssignmentsService } from '../../shared/assignments.service';
import {Assignment} from '../assignment.model';


/**
 * @title Stepper overview
 */
@Component({
  selector: 'stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
})
export class StepperComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  nouvelAssignment:Assignment;
  nomAssignment="";
  studentAssignment: string
  courseAssignment: string
  dateRendu:Date;

  Courses: any = ['Base de données', 'Angular', 'Anglais'];


  constructor(private _formBuilder: FormBuilder, private assignmentService:AssignmentsService, private router:Router) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });
  }

  onSubmit(event) {
    event.preventDefault();

    console.log("onSubmit dans add-assignment")
    const nouvelAssignment = new Assignment();

    nouvelAssignment.id = this.assignmentService.getNewId();
    nouvelAssignment.nom = this.nomAssignment;
    nouvelAssignment.student = this.studentAssignment
    nouvelAssignment.course = this.courseAssignment
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
