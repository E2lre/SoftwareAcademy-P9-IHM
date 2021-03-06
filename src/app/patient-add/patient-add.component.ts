import { Component, OnInit } from '@angular/core';
import {PatientService} from '../services/patient.service';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {Subject, Subscription} from 'rxjs';

@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.scss']
})
export class PatientAddComponent implements OnInit {

  lastName:string ='';
  firstName:string ='';
  birthdate: Date; //= '1966-12-30'//yyyy-MM-dd'T'HH:mm:ss.SSSX '01/01/1900';
  sex: string = '';
  address: string = "";
  phone: string = "";

  /*lastName:string ='lastname par defaut';
  firstName:string ='firstname par defaut';
  birthdate: Date; //= '1966-12-30'//yyyy-MM-dd'T'HH:mm:ss.SSSX '01/01/1900';
  sex: string = 'X';
  address: string = "address par défaut";
  phone: string = "0000000000";*/

  patient: any;
  patientUpd: any;
  patientSubscription: Subscription;
  constructor(private patientService: PatientService, private router:Router) { }

  onAjouter(){
    console.log('On ajoute un patient');

/*   this.patient =[
      {
        lastName: 'Nom 111',
        firstName: 'prénom1',
        birthdate: '01/01/1980',
        sex : "M",
        address : "15 rue de la Paix",
        phone : "0123456789"
      }];

    this.patientService.addPatientToServer(this.patient);*/
    this.patientService.addPatientToServer(this.lastName,this.firstName,this.birthdate,this.sex,this.address,this.phone);
    this.router.navigate(['patients']);
  }
  onRetourner(){
    console.log('On retourne à la liste');
    this.router.navigate(['patients']);
  }
  ngOnInit(): void {
  }


}
