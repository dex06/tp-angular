import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-assignment-grade',
  templateUrl: './assignment-grade.component.html',
  styleUrls: ['./assignment-grade.component.css']
})
export class AssignmentGradeComponent implements OnInit {

  _id: string
  title: string
  student: string
  course: string
  date: Date
  rendu: boolean
  comments: string
  grade: number
  

  constructor(public dialog:MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private assignmentService: AssignmentsService, @Inject(DOCUMENT) private _document: Document, private router: Router) { }


  ngOnInit(): void {
    this._id = this.data.assignment._id;
    this.title = this.data.assignment.nom;
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
      _id: this._id,
      id: this.assignmentService.getNewId(),
      nom: this.title,
      dateDeRendu: this.date,
      student: this.student,
      rendu: Boolean(this.rendu),
      course: this.assignmentService.getCoursesDict()[`${this.course}`],
      comments: this.comments,
      grade: this.grade,
    }
    console.log(newAssignment);
    this.assignmentService.updateAssignment(newAssignment).subscribe(() => {console.log("assignment updated"); this.reloadCurrentRoute()});
  }

  refreshRoute(){
    this._document.defaultView.location.reload();
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

}
