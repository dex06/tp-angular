import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import {Assignment} from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  assignments:Assignment[];

  constructor(private assignmentService:AssignmentsService) { }

  ngOnInit(): void {
    this.getAssignments();
  }

  getAssignments() {
    this.assignmentService.getAssignments()
      .subscribe((assignments) => {
        this.assignments = assignments
      });
    
  }

  peuplerBD(){

    /*this.assigmentsService.peuplerBD();

    this.assignmentService.peuplerBDJoin()
    .subscribe((message) => {
      console.log(message);
    })*/
  }
}
