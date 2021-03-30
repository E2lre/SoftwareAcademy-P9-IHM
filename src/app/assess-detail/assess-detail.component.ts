import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-assess-detail',
  templateUrl: './assess-detail.component.html',
  styleUrls: ['./assess-detail.component.scss']
})
export class AssessDetailComponent implements OnInit {

  @Input() assessPatientLastName: string;
  @Input() assessPatientFirstName: string;
  @Input() assessPatientAge:number;

  @Input() assessDiabetsAssessmentValue: string;
  @Input() assessDiabetsAssessmentId: number;

  constructor() { }

  ngOnInit(): void {
  }

}
