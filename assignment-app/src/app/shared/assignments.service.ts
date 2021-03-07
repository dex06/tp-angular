import { Injectable } from '@angular/core';
import {Assignment} from '../assignments/assignment.model';
import { Course } from '../assignments/course.model';
import {Observable, of} from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
import {map, tap, catchError} from 'rxjs/operators';

@Injectable({
  // permet d'éviter de l'ajouter dans les modules....
  providedIn: 'root'
})
export class AssignmentsService {

  constructor(private logginService:LoggingService,
              private http:HttpClient) { }

  courses:Course[] = [
    {
      id:1,
      title: "Angular",
      teacher: "Michel Buffa",
      teacher_src: "https://i1.rgstatic.net/ii/profile.image/712495153029121-1546883490651_Q512/Michel-Buffa.jpg",
      course_src: "https://cdn.worldvectorlogo.com/logos/angular-icon.svg"
    },
    {
      id:2,
      title:"Big Data",
      teacher:"Gabriel Mopolo",
      teacher_src: "https://www.fratmat.info/media/k2/items/cache/7a763ea01045fd6bbe9be20fa045d43a_XL.jpg",
      course_src:"https://cdn.app.compendium.com/uploads/user/e7c690e8-6ff9-102a-ac6d-e4aebca50425/bf8cb28a-a019-447d-8704-e443e13573e9/File/41401358ab0177ee831840a8f9addef5/photo.jpg"
    },
    {
      id:3,
      title:"Prospective et futurologie",
      teacher:"Serge Miranda",
      teacher_src: "https://d3istkvxa9aegd.cloudfront.net/media/filer_public_thumbnails/filer_public/f1/25/f1254340-9e46-4fd2-8d68-e4e821b95ad8/sergepresentation.png__200x200_q85_crop_subsampling-2_upscale.png",
      course_src:"https://assets.letemps.ch/sites/default/files/styles/share/public/media/2018/04/26/file6zom7ccajrmhi868kou.jpg.jpeg?itok=49r6sanW"
    }
  ]

  courses_dict: any = 
  { 
    "Angular": this.courses[0],
    "Big Data": this.courses[1],
    "Prospective et futurologie": this.courses[2],

  }

  assignments:Assignment[] = [
    {
      id:1,
      nom:"TP Angular INTENSE",
      dateDeRendu:new Date('2020-11-17'),
      student:"Mat Léchec",
      rendu:true,
      course: this.courses_dict['Angular'],
      mark: 13,
      comments: "Pas mal mais peut mieux faire."
    },
    {
      id:2,
      nom:"TP Futurologie MBDS",
      dateDeRendu:new Date('2020-12-03'),
      student:"Joe Mosquitto",
      rendu:false,
      course: this.courses_dict['Prospective et futurologie'],
      mark: null,
      comments: null
    },
    {
      id:3,
      nom:"TP React INTENSE",
      dateDeRendu:new Date('2021-01-10'),
      student:"David",
      rendu:false,
      course: this.courses_dict['Big Data'],
      mark: null,
      comments: null
    },
  ];

  uri = "http://localhost:8010/api/assignments";

  getAssignments():Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.uri)
    .pipe(map(liste => {
      liste.forEach(elem => {
          //elem.nom += " MODIFIE DANS LE PIPE / MAP";
      });
      return liste;
    }));
  }

  getAssignmentsPromise(): Promise<Assignment[]> {
    return this.http.get<Assignment[]>(this.uri).toPromise()
  }

  getAssignment(id) : Observable<Assignment> {
    return this.http.get<Assignment>(this.uri + "/" + id)
      .pipe(
        map(a => {
          a.nom += " MODIFIE DANS LE PIPE / MAP";
          return a;
        }),
      tap(_ => {
        console.log("Assignment id= " + id +
                        ",requête GET envoyée dans le cloud et réponse reçue...");
      }),
      catchError(this.handleError<Assignment>(`getAssignment(id=${id})`))
    )
  }

  private handleError<T>(operation, result?: T) {
    return (error:any) : Observable<T> => {
      console.error(error); // pour afficher l'erreur dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    };
  }

  getNewId():number {
    return Math.floor((Math.random()*100000));
  }

  addAssignment(assignment:Assignment):Observable<any> {
    //this.assignments.push(assignment);

    this.logginService.log(assignment.nom, "ajouté");

    //return of("assignmet ajouté");

    return this.http.post(this.uri, assignment);
  }


  updateAssignment(assignment:Assignment):Observable<any> {
    /*this.assignments.forEach((a, index) => {
      if(a === assignment) {
        this.assignments[index] = assignment;
      }
    });*/
    this.logginService.log(assignment.nom, "modifié");

    /*
    let pos = this.assignments.indexOf(assignment);
    this.assignments[pos] = assignment;
    */

    //return of("assignmentt modifié");
    return this.http.put(this.uri, assignment);
  }

  deleteAssignment(assignment:Assignment):Observable<any> {
    this.logginService.log(assignment.nom, "supprimé");

    //let pos = this.assignments.indexOf(assignment);
    //this.assignments.splice(pos, 1);

    // il faut _id et pas _id car _id est l'id mongoDB alors que id
    // est celui que nous générons manuellement.... on aurait pu se passer,
    // en fait, de id si on était partis directement sur mongoDB...
    let deleteURI = this.uri + '/' + assignment._id;
    return this.http.delete(deleteURI);
  }

  getCourses(){
    return this.courses;
  }

  getCoursesNames(){
    let res = [];
    this.courses.forEach(course => {
      res.push(course.title)
    });
    return res;
  }

  getCoursesDict(){
    return this.courses_dict;
  }

  
}
