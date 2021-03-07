import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-assignment-modify',
  templateUrl: './assignment-modify.component.html',
  styleUrls: ['./assignment-modify.component.css']
})
export class AssignmentModifyComponent implements OnInit {

  title: string
  student: string
  course: string
  date: Date
  rendu: boolean
  comments: string
  grade: number
  newAssignment: Assignment

  constructor(public dialog:MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private assignmentService: AssignmentsService) { }


  ngOnInit(): void {
    this.title = this.data.assignment.title;
    this.student = this.data.assignment.student;
    this.course = this.data.assignment.course.title;
    this.date = this.data.assignment.dateDeRendu;
    this.rendu = this.data.assignment.rendu;
    this.comments = this.data.assignment.comments;
    this.grade = this.data.assignment.grade;
  }

  save(){
    let newAssignment: Assignment = 
    {
      id: this.assignmentService.getNewId(),
      nom: this.title,
      dateDeRendu: this.date,
      student: this.student,
      rendu: Boolean(this.rendu),
      course: this.assignmentService.getCoursesDict()[`${this.course}`],
      comments: this.comments,
      grade: this.grade,
    }
    this.assignmentService.updateAssignment(newAssignment);
  }

}
