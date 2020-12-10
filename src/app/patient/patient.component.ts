import { Component, Input, OnInit } from '@angular/core';
import {PatientService} from '../services/patient.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  //patientLastName: string ='Delaire';
  @Input() id: number;
  @Input() patientLastName: string;
  //patientFirstName: string ='Eric';
  @Input() patientFirstName:string;
  //patientBirthDate: string ='24/10/1968';
  @Input() patientBirthDate: string;
  //patientSex: string ='M';
  @Input() patientSex: string;
  //patientAddress: string ='1 rue du test';
  @Input() patientAddress: string;
  //patientPhone: string ='0123456789';
  @Input() patientPhone: string;

  @Input() indexOfPatient: number;
  constructor(private patientService: PatientService, private router:Router) { }

  ngOnInit(): void {

  }

  getPatientLastName(){
    return this.patientLastName;
  }
  getColor() {
/*    if (this.patientSex === "M") {
      return 'blue';
    } else {
      return 'pink';
    }*/
  }
  onSwitchName (){
    this.patientService.switchNameOne(this.indexOfPatient);
  }
  onDetail (id:number){
    console.log('On va au détail pour id :'+ id);
    this.patientService.setCurrentId(id);
    this.router.navigate(['patient-view']);
  }
  onUpdate (id:number){
    console.log('On va au détail pour id :'+ id);
    this.patientService.setCurrentId(id);
    this.router.navigate(['patient-upd']);
  }
}
