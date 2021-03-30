import { Component, OnInit } from '@angular/core';
import {PatientService} from "../services/patient.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {AssessService} from "../services/assess.services";

@Component({
  selector: 'app-assess-list',
  templateUrl: './assess-list.component.html',
  styleUrls: ['./assess-list.component.scss']
})
export class AssessListComponent implements OnInit {
  assesses: any[];
  assessSubscription: Subscription;

  constructor(private assessService: AssessService,private patientService: PatientService, private router:Router) { }

  ngOnInit(): void {
    console.log('assess-list - ngOnInit - Start');
    this.assessSubscription = this.assessService.assessSubject.subscribe(
      (assesses: any[]) =>{
        this.assesses = assesses;
      }
    );
    this.assesses = this.assessService.getAssessByFamilyName(this.patientService.getFamilyName());
    this.assessService.emitAssessSubject();
  }
  onPatientList(){
    console.log('On retourne à la liste des patients');
    this.router.navigate(['patients']);
  }
}
