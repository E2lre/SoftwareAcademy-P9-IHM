import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {PatientService} from "./patient.service";


export class AuthService{
  isAuth = false;
  //private tocken;
  signIn(){

         this.isAuth = true;
  }
  signOut(){
    this.isAuth = false;
  }

}
