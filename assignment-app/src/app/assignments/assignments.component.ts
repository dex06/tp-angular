import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import {Assignment} from './assignment.model';
import { Course } from './course.model';
import { Router } from '@angular/router';



@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})


export class AssignmentsComponent implements OnInit {

  assignments:Assignment[];

  constructor(private assignmentService:AssignmentsService, private router:Router) { }

  ngOnInit(): void {
    this.getAssignments();
  }

  getAssignments() {
    this.assignmentService.getAssignments()
      .subscribe((assignments) => {
        this.assignments = assignments
      });
    
  }

  showDetails(id){
    console.log("the id" + id)
    this.router.navigate([`/assignments/${id}`]);
  }

  peuplerBD(){

    /*this.assigmentsService.peuplerBD();

    this.assignmentService.peuplerBDJoin()
    .subscribe((message) => {
      console.log(message);
    })*/
  }
}
