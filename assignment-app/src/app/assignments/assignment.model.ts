import { Course } from './course.model'

export class Assignment {
  _id?:string;
  id:number;
  nom:string;
  student:string;
  dateDeRendu:Date;
  rendu:boolean;
  course: Course;
  comments: string;
  grade: number;
}
