import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {consoleTestResultHandler} from 'tslint/lib/test';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authStatus: boolean;
  constructor(private authService: AuthService,private router:Router) {
  }

  ngOnInit(): void {
    this.authStatus = this.authService.isAuth;
  }
  onSignIn(){
    this.authService.signIn();
    console.log('connexion !');
    this.authStatus = this.authService.isAuth;
    this.router.navigate(['patients']);

  }
  onSignOut(){
    this.authService.signOut();
    console.log('Déconnexion !');
    this.authStatus = this.authService.isAuth;

  }
}
