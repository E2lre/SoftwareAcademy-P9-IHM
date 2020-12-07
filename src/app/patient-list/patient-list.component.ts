import { Component, OnInit } from '@angular/core';
import {PatientService} from '../services/patient.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {
  isAuthAppPatientList = false;


  patientLastName1="Nom 11";
  patientLastName2="Nom 21";
  patientLastName3="Nom 31";

  patients: any[];
  constructor(private patientService: PatientService) {
    /*TOTO : A remplacer par l'authentification*/
    setTimeout(
      () => {
        this.isAuthAppPatientList = true;
      }, 2000
    );
  }

  onAjouter(){
    console.log('On ajoute un patient');
    console.log('test');
  }
  onTest(){
    this.patientService.switchName();
  }
  ngOnInit(): void {
    this.patients = this.patientService.patients;
  }

}
