import { Component, OnInit } from '@angular/core';
import {PatientService} from '../services/patient.service';
import {Subscription} from 'rxjs';

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
  patientSubscription: Subscription;

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
  onCharger(){
    console.log('Démarage du chargement des donnée');
    this.patientService.getPatientsFromServer();
    console.log('Fin du chargement des donnée');
  }
  onTest(){
    this.patientService.switchName();
  }
  ngOnInit(): void {
//   this.patients = this.patientService.patients;

    this.patientSubscription = this.patientService.patientSubject.subscribe(
      (patients: any[]) =>{
        this.patients = patients;
      }
    );
    this.patientService.getPatientsFromServer(); // Chargement des données sur l'API au démarrage
    this.patientService.emitPatientSubject();
  }

}
