import { Component, OnInit } from '@angular/core';
import {PatientService} from "../services/patient.service";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.scss']
})
export class AuthSignupComponent implements OnInit {

  authStatus: boolean;
  username:string ='';
  password:string ='';
  errorMessage:string = '';
  errorMessageSubject: Subscription;
  resultSignUp: boolean;
  constructor(private patientService: PatientService, private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
    this.errorMessage ='';
    this.errorMessageSubject = this.patientService.errorMessageSubject.subscribe(
      (errorMessage: any) =>{
        this.errorMessage = errorMessage;
      }
    );
    this.patientService.emiterrorMessageSubjectSubject();
  }
  onSignUp(){
    this.patientService.signUp(this.username,this.password);
    //this.errorMessage = this.patientService.getErrorMessage();
  /*  this.errorMessageSubject = this.patientService.errorMessageSubject.subscribe(
      (errorMessage: any) =>{
        this.errorMessage = errorMessage;
      }
    );*/
    //this.patientService.emiterrorMessageSubjectSubject();
   /* if (this.resultSignUp) {
      this.router.navigate(['auth']);
    }*/
  }

  onCancel(){

    this.router.navigate(['auth']);
  }
}
