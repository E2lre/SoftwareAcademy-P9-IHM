import { Component, OnInit } from '@angular/core';
import {PatientService} from '../services/patient.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

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

  constructor(private patientService: PatientService,private router:Router) {

    /*TOTO : A remplacer par l'authentification*/

    setTimeout(
      () => {
        this.isAuthAppPatientList = true;
      }, 2000
    );
  }

  onAjouter(){
    console.log('On ajoute un patient');
    this.router.navigate(['patient-add']);
  }
  onCharger(){
    console.log('Démarage du chargement des donnée');
    this.patientService.getPatientsFromServer();
    console.log('Fin du chargement des donnée');
  }

  ngOnInit(): void {
//   this.patients = this.patientService.patients;

    this.patientSubscription = this.patientService.patientsSubject.subscribe(
      (patients: any[]) =>{
        this.patients = patients;
      }
    );
    this.patientService.getPatientsFromServer(); // Chargement des données sur l'API au démarrage
    this.patientService.emitPatientsSubject();
  }

}
