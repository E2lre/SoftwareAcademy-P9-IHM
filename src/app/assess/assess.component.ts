import {Component, Input, OnInit} from '@angular/core';
import {PatientService} from "../services/patient.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {AssessService} from "../services/assess.services";

@Component({
  selector: 'app-assess',
  templateUrl: './assess.component.html',
  styleUrls: ['./assess.component.scss']
})
export class AssessComponent implements OnInit {
  /*@Input() patientId: number;
  @Input() patientFirstName: string;
  @Input() patientLastName: string;
  @Input() patientBirthdate: Date;
  @Input() patientSex: string;
  @Input() patientAssess: string;
  @Input() patientScore: string;
*/
  assessSubscription: Subscription;
  assess: any;

  constructor(private assessService: AssessService, private patientService: PatientService, private router:Router) { }

  ngOnInit(): void {
    console.log('assess - ngOnInit - Start');
    this.assessSubscription = this.assessService.assessSubject.subscribe(
      (assess: any[]) =>{
        this.assess = assess;
      }
    );

    this.assess = this.assessService.getAssessByPatientId(this.patientService.getCurrentId());
    this.assessService.emitAssessSubject();

    console.log('assess getAssessByPatientId - id'+this.assess.patientId);
    console.log('assess getAssessByPatientId - lastName'+this.assess.patientFirstName );
    console.log('assess getAssessByPatientId - firstName'+this.assess.patientLastName );
    console.log('assess getAssessByPatientId - age'+this.assess.patientAge );
    console.log('assess getAssessByPatientId - diabetsAssessmentId'+this.assess.diabetsAssessmentId );
    console.log('assess getAssessByPatientId - diabetsAssessmentValue'+this.assess.diabetsAssessmentValue );
    console.log('assess - ngOnInit - finish');
  }


  onBack(){
    console.log('assess - onBack');
    this.router.navigate(['patients']);
  }
}
