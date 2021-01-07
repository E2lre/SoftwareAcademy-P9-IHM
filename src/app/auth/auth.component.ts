import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {consoleTestResultHandler} from 'tslint/lib/test';
import {Router} from '@angular/router';
import {PatientService} from "../services/patient.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authStatus: boolean;
  //username:string ='toto';
  //password:string ='titi';
  username:string ='';
  password:string ='';
  tocken:string = '';
  errorMessage:string = '';
  errorMessageSubject: Subscription;
  tockenSubject: Subscription;
  isAuthSubject: Subscription;
//  constructor(private authService: AuthService,private router:Router) {  }
  constructor(private patientService: PatientService, private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
    //this.authStatus = this.authService.isAuth;
    this.authStatus = this.patientService.getIsAuth();
    this.authService.isAuth = this.patientService.getIsAuth();
    //this.errorMessage ='';
    this.errorMessageSubject = this.patientService.errorMessageSubject.subscribe(
      (errorMessage: any) =>{
        this.errorMessage = errorMessage;
      }
    );
    this.tockenSubject = this.patientService.tockenSubject.subscribe(
      (tocken: any) =>{
        this.tocken = tocken;
      }
    );
    this.isAuthSubject = this.patientService.isAuthSubject.subscribe(
      (isAuth: any) =>{
        this.authStatus = isAuth;
      }
    );
    this.patientService.emiterrorMessageSubjectSubject();
  }
  onSignIn(){
    this.patientService.signIn(this.username,this.password);
    //this.authService.signIn(this.username,this.password);
    console.log('connexion !');
    this.errorMessage = this.patientService.getErrorMessage();
    if (this.patientService.getIsAuth()){
      this.authService.signIn();
    }
    //this.authStatus = this.authService.isAuth;
    this.authStatus = this.patientService.getIsAuth();
    this.tocken = this.patientService.getTocken();
    //console.log('onSignin - patientService.tocken : ' + this.patientService.tocken);
    //console.log('onSignin - tocken : ' + this.tocken);
    console.log('onSignin - patientService.authStatus : ' + this.patientService.getIsAuth());
    console.log('onSignin - authStatus : ' + this.authStatus);
    this.authStatus = this.patientService.getIsAuth();
    //this.authService.isAuth = this.patientService.getIsAuth();
    //this.authService.signIn();
    this.router.navigate(['patients']);

  }
  onSignOut(){
    //this.authService.signOut();
    this.patientService.signOut();
    this.authService.signOut();
    console.log('Déconnexion !');
   // this.authStatus = this.authService.isAuth;
    this.authStatus = this.patientService.getIsAuth();
  }
  onSignUp(){
    this.router.navigate(['auth-signup']);
  }
}
