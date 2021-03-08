import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assignment-modify',
  templateUrl: './assignment-modify.component.html',
  styleUrls: ['./assignment-modify.component.css']
})
export class AssignmentModifyComponent implements OnInit {

  _id: string
  title: string
  student: string
  course: string
  date: Date
  rendu: boolean
  comments: string
  grade: number
  newAssignment: Assignment

  constructor(public dialog:MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private assignmentService: AssignmentsService,@Inject(DOCUMENT) private _document: Document, private router:Router) { }


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
