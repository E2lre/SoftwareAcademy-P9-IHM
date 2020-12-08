import { Component, OnInit } from '@angular/core';
import {PatientService} from '../services/patient.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.scss']
})
export class PatientViewComponent implements OnInit {
  lastName:String ='lastname par defaut';
  firstName:String ='firstname par defaut';
  birthdate: String = 'birthdate par défaut';
  sex: String = 'sex par defaut';
  address: String = "address par défaut";
  phone: String = "phone par defaut";

  constructor(private patientService: PatientService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.lastName = this.patientService.getPatientById(+id).lastName;
    this.firstName = this.patientService.getPatientById(+id).firstName;
    this.birthdate = this.patientService.getPatientById(+id).birthdate;
    this.sex = this.patientService.getPatientById(+id).sex;
    this.address = this.patientService.getPatientById(+id).address;
    this.phone = this.patientService.getPatientById(+id).phone;
  }

}