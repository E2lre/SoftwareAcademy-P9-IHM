import { Component, OnInit } from '@angular/core';
import {PatientService} from '../services/patient.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-patient-upd',
  templateUrl: './patient-upd.component.html',
  styleUrls: ['./patient-upd.component.scss']
})
export class PatientUpdComponent implements OnInit {

  id:number =0;
  lastName:string ='lastname par defaut';
  firstName:string ='firstname par defaut';
  birthdate: string = '1966-12-30'//yyyy-MM-dd'T'HH:mm:ss.SSSX '01/01/1900';
  sex: string = 'X';
  address: string = "address par défaut";
  phone: string = "0000000000";

  patientUpd: any;
  patientSubscription: Subscription;

  constructor(private patientService: PatientService, private router:Router) { }

  ngOnInit(): void {
   this.patientSubscription = this.patientService.patientSubject.subscribe(
      (patientUpd ) =>{
        this.patientUpd = patientUpd;
      }
    );

    //const id = this.route.snapshot.params['id'];

    //const patient = this.patientService.getPatientById(this.patientService.getCurrentId());
    this.patientUpd = this.patientService.findPatientById(this.patientService.getCurrentId());

    this.patientService.emitPatientSubject();

    //this.id = this.patientService.getPatientCurent().id;
    console.log('upd-comp'+ this.id );
    console.log('-'+ this.patientService.getPatientCurent().id);
    console.log('-'+ this.patientService.getCurrentId());
    this.id = this.patientUpd.id;
    this.lastName = this.patientUpd.lastName;
    this.firstName = this.patientUpd.firstName;
    this.birthdate = this.patientUpd.birthdate;
    this.sex = this.patientUpd.sex;
    this.address = this.patientUpd.address;
    this.phone = this.patientUpd.phone;
    this.patientService.emitPatientSubject();
  }
  onUpdate(){
    console.log('On met à jour un patient');

   // this.patientService.updPatientToServer(this.id,this.lastName,this.firstName,this.birthdate,this.sex,this.address,this.phone);
    this.patientService.updPatientToServer(this.patientUpd.id,this.patientUpd.lastName,this.patientUpd.firstName,this.patientUpd.birthdate,this.patientUpd.sex,this.patientUpd.address,this.patientUpd.phone);
    this.router.navigate(['patients']);
  }
  onCancel(){
    console.log('On retourne à la liste');
    this.router.navigate(['patients']);
  }
}
