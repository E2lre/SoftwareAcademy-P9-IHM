import { Component, OnInit } from '@angular/core';
import {PatientService} from '../services/patient.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-patient-del',
  templateUrl: './patient-del.component.html',
  styleUrls: ['./patient-del.component.scss']
})
export class PatientDelComponent implements OnInit {

  patient: any;
  patientSubscription: Subscription;
  constructor(private patientService: PatientService, private router:Router) { }

  ngOnInit(): void {
    this.patientSubscription = this.patientService.patientSubject.subscribe(
      (patient ) =>{
        this.patient = patient;
      }
    );
    this.patient = this.patientService.findPatientById(this.patientService.getCurrentId());

   /* this.id = this.patient.id;
    this.lastName = this.patient.lastName;
    this.firstName = this.patient.firstName;
    this.birthdate = this.patient.birthdate;
    this.sex = this.patient.sex;
    this.address = this.patient.address;
    this.phone = this.patient.phone;
    this.patientService.emitPatientSubject();*/

  }
  onDelete(){
    console.log('Delete - onDelete');
    this.patientService.deletePatientToServer(this.patient.id,this.patient.lastName,this.patient.firstName,this.patient.birthdate,this.patient.sex,this.patient.address,this.patient.phone);

    this.router.navigate(['patients']);
  }
  onCancel(){
    console.log('Delete - onCancel');
    this.router.navigate(['patients']);
  }
}
