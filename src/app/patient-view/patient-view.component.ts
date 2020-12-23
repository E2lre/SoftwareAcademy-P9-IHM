import { Component, OnInit } from '@angular/core';
import {PatientService} from '../services/patient.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.scss']
})
export class PatientViewComponent implements OnInit {
  id: number = 0;
  lastName:String ='lastname par defaut';
  firstName:String ='firstname par defaut';
  birthdate: Date;//String = 'birthdate par défaut';
  sex: String = 'sex par defaut';
  address: String = "address par défaut";
  phone: String = "phone par defaut";

  patientUpd: any;
  patient: any;
  patientSubscription: Subscription;
  constructor(private patientService: PatientService, private router:Router) { }

  ngOnInit(): void {
    this.patientSubscription = this.patientService.patientSubject.subscribe(
      (patientUpd ) =>{
        this.patientUpd = patientUpd;
      }
    );
    this.patientUpd = this.patientService.findPatientById(this.patientService.getCurrentId());

    this.id = this.patientUpd.id;
    this.lastName = this.patientUpd.lastName;
    this.firstName = this.patientUpd.firstName;
    this.birthdate = this.patientUpd.birthdate;
    this.sex = this.patientUpd.sex;
    this.address = this.patientUpd.address;
    this.phone = this.patientUpd.phone;
    this.patientService.emitPatientSubject();


  }
  onBack(){
    console.log('View - onBack');
    this.router.navigate(['patients']);
  }
}
