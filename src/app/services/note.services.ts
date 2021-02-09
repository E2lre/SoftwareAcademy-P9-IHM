import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {PatientService} from "./patient.service";

@Injectable()
export class NoteService{
  notesSubject = new Subject<any[]>();
  private notes =[
    {
      noteId:'123abc',
      patientId: 1,
      noteText: 'texte 1',
      notedate: '1980-01-01'
    },
    {
      noteId:'999zzz',
      patientId: 1,
      noteText: 'Texte 2',
      notedate: '2021-01-01'
    }
  ]
  constructor(private httpClient: HttpClient, private patientService: PatientService,private router:Router) { }
  emitNotesSubject(){
    //console.log('emitPatientsSubject - start');
    this.notesSubject.next(this.notes.slice());
    //console.log('emitPatientsSubject - end');
  }

  getNoteListForPatientId(patientId:number) {
    console.log('getNoteListForPatientId- start patientId='+patientId);

    this.patientService.setErrorMessage('') ;
    this.patientService.emiterrorMessageSubjectSubject();

    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.patientService.getTocken()
    });

    this.httpClient
      .get<any>('http://localhost:9004/microservice-notes/patientnotes/'+ patientId,{headers: reqHeader})
      //.get<any>('http://localhost:8085/patientnotes/'+ patientId,{headers: reqHeader})
      //.get<any>('http://localhost:9004/microservice-patients/patient/'+ id,{headers: reqHeader})
      //.get<any>('http://localhost:8082/patient/'+ id,{headers: reqHeader})
      .subscribe((reponse) =>{
          console.log('getNoteListForPatientId - recup info');
          this.notes = reponse;
          console.log('getNoteListForPatientId - recup ok');
          this.emitNotesSubject();
          console.log('getNoteListForPatientId - recup exit');
        },
        (error) => {
          console.log('getNoteListForPatientId Erreur ! : ' + error);
          if (error.status === 404) {
            console.log('List de note non trouvée pour le patient Id' + patientId);
            this.patientService.setErrorMessage('getNoteListForPatientId - Patient notes not found for patient id ' + patientId + ' Error : '+ error.status + error.message);
            this.patientService.emiterrorMessageSubjectSubject()
          } else {
            this.patientService.setErrorMessage(' Technical error on getNoteListForPatientId : '+ error.status + error.message);
            this.patientService.emiterrorMessageSubjectSubject();

          }
          this.router.navigate(['patient-Erreur']);
        }
      );
    console.log('getNoteListForPatientId finish');
    return this.notes;

  }
}
