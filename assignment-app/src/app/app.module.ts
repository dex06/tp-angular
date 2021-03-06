import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { AssignmentsComponent } from './assignments/assignments.component';
import { RenduDirective } from './shared/rendu.directive';
import { FormsModule,  ReactiveFormsModule  } from '@angular/forms';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { RouterModule, Routes } from '@angular/router';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { AuthGuard } from './shared/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { LogInComponent } from './users/log-in/log-in.component';
import { RegisterComponent } from './users/register/register.component';
import { AngularMaterialModule } from './angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StepperComponent } from './assignments/stepper/stepper.component';
import { VariablesGlobales } from './shared/VariablesGlobales';


const routes:Routes = [
  {path:'', component:AssignmentsComponent},
  {path:'home', component:AssignmentsComponent},
  {path:'add', component:StepperComponent},
  {path:'assignment/:id', component:AssignmentDetailComponent},
  {
    path:'assignment/:id/edit',
    component:EditAssignmentComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    RenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssignmentComponent,
    LogInComponent,
    RegisterComponent,
    StepperComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, 
    BrowserAnimationsModule, AngularMaterialModule ,MatButtonModule,
    MatIconModule, MatDividerModule, FlexLayoutModule,
    MatInputModule, MatFormFieldModule, ReactiveFormsModule,
    MatDatepickerModule, MatNativeDateModule,
    MatListModule,MatCardModule,
    MatCheckboxModule, MatSlideToggleModule,
    FormsModule, HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    VariablesGlobales
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
