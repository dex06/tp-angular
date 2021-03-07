import { Component, OnInit, Inject } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import {Assignment} from './assignment.model';
import { Course } from './course.model';
import { Router } from '@angular/router';
import { VariablesGlobales } from '../shared/VariablesGlobales';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AssignmentDialogComponent } from './assignment-dialog/assignment-dialog.component';
import { AssignmentModifyComponent } from './assignment-modify/assignment-modify.component';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})


export class AssignmentsComponent implements OnInit {

  assignments:Assignment[];
  
  constructor(private assignmentService:AssignmentsService, public params:VariablesGlobales, public dialog: MatDialog, private router:Router) { }

  ngOnInit(): void {
    this.getAssignments();
  }

  getAssignments() {
    this.assignmentService.getAssignments()
      .subscribe((assignments) => {
        this.assignments = assignments
      });
    
  }

  isAdmin(){
    return this.params.userRole == 'Admin'
  }

  hasStatus(){
    let currentRole = this.params.userRole;
    if(currentRole == 'Admin' || currentRole == 'Author') return true;
    return false;
  }

  deleteAssignment(id){
    this.assignmentService.deleteAssignment(id);
  }

  showDetails(id){
    console.log("the id" + id)
    this.router.navigate([`/assignments/${id}`]);
  }

  openDetailsDialog(assignment){
    this.dialog.open(AssignmentDialogComponent, { 
      width: '500px',data: { assignment : assignment, coursesName: this.assignmentService.getCoursesNames()},
    }).afterClosed().subscribe(data => {
      if(data) {
        console.log(data)
      }
    });
  }

  openModifyDialog(assignment){
    this.dialog.open(AssignmentModifyComponent, { 
      width: '600px',data: { assignment : assignment, coursesName: this.assignmentService.getCoursesNames()},
    }).afterClosed().subscribe(data => {
      console.log(data)
      if(data) {
        console.log(data)
      }
    });
  }

  changeRendu(assignment){
    assignment.rendu = !assignment.rendu;
  }
}
