import { Injectable } from '@angular/core';
import {Users} from '../users/users.model';
import {Observable, of} from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
import {map, tap, catchError} from 'rxjs/operators';

@Injectable({
  // permet d'éviter de l'ajouter dans les modules....
  providedIn: 'root'
})

export class UsersService {
    constructor(private logginService:LoggingService,
        private http:HttpClient) { }

    

    addUri = "http://localhost:8010/api/auth/register";
    loginUri= "http://localhost:8010/api/auth/login";

    userName="";
    userRole="";
    isLog = false;

    getNewId():number {
        return Math.floor((Math.random()*100000));
    }
    
    addUser(user:Users):Observable<any> {
        //this.assignments.push(assignment);
        console.log(user)
    
        this.logginService.log(user.name, "ajouté");
    
        //return of("assignmet ajouté");
    
        return this.http.post(this.addUri, user);
    }

    loginUser(user:Users):Observable<any>{
        //console.log(user)
        return this.http.post(this.loginUri, user);
    }


    getUserRole(){
        return this.userRole;
    }

    setUserRole(role){
        this.userRole = role;
    }

    getUserName(){
        return this.userName;
    }

    setUserName(name){
        this.userName = name;
    }

    getLogged(){
        return this.isLog;
    }

    setLogged(bool){
        this.isLog = bool;
    }

   

    
}