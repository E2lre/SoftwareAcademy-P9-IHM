import { Component, OnInit } from '@angular/core';
import {PatientService} from "../services/patient.service";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

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
  resultSignUp: boolean;
  constructor(private patientService: PatientService, private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
    this.errorMessage ='';
  }
  onSignUp(){
    this.patientService.signUp(this.username,this.password);
    this.errorMessage = this.patientService.getErrorMessage();
   /* if (this.resultSignUp) {
      this.router.navigate(['auth']);
    }*/
  }

  onCancel(){

    this.router.navigate(['auth']);
  }
}
