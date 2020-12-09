import { Component, OnInit } from '@angular/core';
import {PatientService} from '../services/patient.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-patient-erreur',
  templateUrl: './patient-erreur.component.html',
  styleUrls: ['./patient-erreur.component.scss']
})
export class PatientErreurComponent implements OnInit {
  errorMessage:string ='No error';
  constructor(private patientService: PatientService, private router:Router) { }

  ngOnInit(): void {
    this.errorMessage = this.patientService.getErrorMessage();
  }

}
