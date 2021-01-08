import { Component, OnInit } from '@angular/core';
import {PatientService} from "../services/patient.service";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Subscription} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.scss']
})
export class AuthSignupComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  authStatus: boolean;
  canSignUp: boolean;
  username:string ='';
  password:string ='';

  errorMessage:string = '';
  errorMessageSubject: Subscription;
  resultSignUp: boolean;

  constructor(private patientService: PatientService, private authService: AuthService, private router:Router, private formBuilder: FormBuilder) {
    this.canSignUp = false;
 /*   if ((this.username!=="") && (this.password!=="")) {
      this.canSignUp = true;
      console.log('cansignup c true');
    } else {
      this.canSignUp = false;
      console.log('cansignup c true');
    }*/
  }

  ngOnInit(): void {
    this.errorMessage ='';
    this.errorMessageSubject = this.patientService.errorMessageSubject.subscribe(
      (errorMessage: any) =>{
        this.errorMessage = errorMessage;
      }
    );
    this.patientService.emiterrorMessageSubjectSubject();


    this.registerForm = this.formBuilder.group({
      username1: ['', [Validators.required, Validators.minLength(6)]]
    });
 /*   if ((this.username!=="") && (this.password!=="")) {
      this.canSignUp = true;
      console.log('cansignup true');
    } else {
      this.canSignUp = false;
      console.log('cansignup true');
    }*/

    // Validators fields

 /*   this.authSignup = new FormGroup({
      pwd1: new FormGroup(this.password1,[
        Validators.required,
        Validators.minLength(4),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
      ]),
    });*/
/*    this.authSignup = new FormGroup({
      pwd1: new FormGroup(this.password1,[
        Validators.required,
        Validators.minLength(4),
        forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
      ]),
      username: new FormControl(this.username,Validators.required)
      });*/

  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }
  onSignUp(){

    if ((this.username!=="") && (this.password!=="")) {
      if (this.password.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/g)) {
        console.log('save');
        this.patientService.signUp(this.username, this.password);

      } else {
        console.log('err pwd');
        this.errorMessage = "incorect password format ";
      }
    } else {
      this.errorMessage = "username and password required";
    }
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
