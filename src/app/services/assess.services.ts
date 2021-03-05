import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {PatientService} from "./patient.service";
import {Router} from "@angular/router";

@Injectable()
export class AssessService{
  assessSubject = new Subject<any>();
  private assess = {
    patientId: 0,
    patientFirstName :'',
    patientLastName :'',
    patientAge :0,
    diabetsAssessmentId :0,
    diabetsAssessmentValue :''
  };
  private assessEmpty  = {
    patientId: 0,
    patientFirstName :'',
    patientLastName :'',
    patientAge :0,
    diabetsAssessmentId :0,
    diabetsAssessmentValue :''
  };
  constructor(private httpClient: HttpClient, private patientService: PatientService,private router:Router) { }

  emitAssessSubject(){
    this.assessSubject.next(this.assess);
  }
  getAssessByPatientId(patientId:number) {
    console.log('getAssessByPatientId- start patientId='+patientId);
    this.patientService.setErrorMessage('') ;
    this.patientService.emiterrorMessageSubjectSubject();

    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.patientService.getTocken()
    });
    this.httpClient
      .get<any>('http://localhost:9004/microservice-assess/assess/id?id='+ patientId,{headers: reqHeader})
      .subscribe((reponse) =>{
          console.log('getAssessByPatientId - recup info');
          this.assess = reponse;
          console.log('getAssessByPatientId - recup ok');
          this.emitAssessSubject();
          console.log('getAssessByPatientId - score'+ this.assess.diabetsAssessmentId);
          console.log('getAssessByPatientId - recup exit');
        },
        (error) => {
          console.log('getAssessByPatientId Erreur ! : ' + error);
          if (error.status === 404) {
            console.log('getAssessByPatientId assess non trouvée pour le patient Id' + patientId);
            this.assess = this.assessEmpty;
            this.emitAssessSubject();
            this.patientService.setErrorMessage('getAssessByPatientId - Patient assess not found for patient id ' + patientId + ' Error : '+ error.status + error.message);
            this.patientService.emiterrorMessageSubjectSubject();
          } else {
            console.log('getAssessByPatientId technical Error ' + patientId);
            this.assess = this.assessEmpty;
            this.emitAssessSubject();
            this.patientService.setErrorMessage(' Technical error on getNoteListForPatientId : '+ error.status + error.message);
            this.patientService.emiterrorMessageSubjectSubject();
            this.router.navigate(['patient-Erreur']);
          }
        }
      );
    console.log('getAssessByPatientId- finish');
    this.emitAssessSubject();
    return this.assess;
  }
}
