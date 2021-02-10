import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {PatientService} from "./patient.service";

@Injectable()
export class NoteService{
  notesSubject = new Subject<any[]>();
  noteSubject = new Subject<any>();
  private notes =[
  /*  {
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
    }*/
  ]
  private note = {
    //id: 0,
    patientId: 0,
    textNote: '',
    dateNote : ''
  };
  private noteUpd = {
    id: '',
    patientId: 0,
    textNote: '',
    dateNote : ''
  };
  //private noteEmpty: any[];
  private notesEmpty  = [];
  private noteEmpty  = {
    //id: 0,
    patientId: 0,
    textNote: '',
    dateNote : ''
  };

  private currentNoteId:number;

  constructor(private httpClient: HttpClient, private patientService: PatientService,private router:Router) { }

  emitNotesSubject(){
    //console.log('emitPatientsSubject - start');
    this.notesSubject.next(this.notes.slice());
    //console.log('emitPatientsSubject - end');
  }
  emitNoteSubject(){
    //console.log('emitPatientsSubject - start');
    this.noteSubject.next(this.note);
    //console.log('emitPatientsSubject - end');
  }
  getcurrentNoteId(){
    return this.currentNoteId;
  }
  setcurrentNoteId(noteId: number) {
    this.currentNoteId = noteId;
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
      .get<any>('http://localhost:9004/microservice-notes/patientpatHistories/'+ patientId,{headers: reqHeader})
      //.get<any>('http://localhost:8085/patientpatHistories/'+ patientId,{headers: reqHeader})
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
            console.log('getNoteListForPatientId List de note non trouvée pour le patient Id' + patientId);
            this.notes = this.notesEmpty;
            this.emitNotesSubject();
            this.patientService.setErrorMessage('getNoteListForPatientId - Patient notes not found for patient id ' + patientId + ' Error : '+ error.status + error.message);
            this.patientService.emiterrorMessageSubjectSubject();
          } else {
            console.log('getNoteListForPatientId technical Error ' + patientId);
            this.notes = this.notesEmpty;
            this.emitNotesSubject();
            this.patientService.setErrorMessage(' Technical error on getNoteListForPatientId : '+ error.status + error.message);
            this.patientService.emiterrorMessageSubjectSubject();
            this.router.navigate(['patient-Erreur']);
          }
        }
      );
    console.log('getNoteListForPatientId finish');
    return this.notes;

  }

  getNotebyNoteId(noteId:number) {
    console.log('getNotebyNoteId- start noteId='+noteId);

    this.patientService.setErrorMessage('') ;
    this.patientService.emiterrorMessageSubjectSubject();

    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.patientService.getTocken()
    });

    this.httpClient
      .get<any>('http://localhost:9004/microservice-notes/patHistory/'+ noteId,{headers: reqHeader})
      //.get<any>('http://localhost:8085/patHistory/'+ noteId,{headers: reqHeader})
      .subscribe((reponse) =>{
          console.log('getNotebyNoteId - recup info');
          this.note = reponse;
          console.log('getNotebyNoteId - recup ok');
          this.emitNoteSubject();
          console.log('getNotebyNoteId - recup exit');
        },
        (error) => {
          console.log('getNotebyNoteId Erreur ! : ' + error);
          if (error.status === 404) {
            console.log('getNotebyNoteId List de note non trouvée pour la note Id' + noteId);
            this.note = this.noteEmpty;
            this.emitNoteSubject();
            this.patientService.setErrorMessage('getNotebyNoteId - Patient note not found for note id ' + noteId + ' Error : '+ error.status + error.message);
            this.patientService.emiterrorMessageSubjectSubject();
          } else {
            console.log('getNotebyNoteId - technical Error ' + noteId);
            this.note = this.noteEmpty;
            this.emitNoteSubject();
            this.patientService.setErrorMessage(' getNotebyNoteId-Technical error on getNotebyNoteId : '+ error.status + error.message);
            this.patientService.emiterrorMessageSubjectSubject();
            this.router.navigate(['patient-Erreur']);
          }
        }
      );
    console.log('getNotebyNoteId finish');
    return this.note;

  }

  addNoteForPatientId(patientId: number, noteText: string) {
    console.log('addNoteForPatientId- start' + patientId);


    this.patientService.setErrorMessage('') ;
    this.patientService.emiterrorMessageSubjectSubject();

    this.note.patientId = patientId;
    this.note.textNote = noteText;
    this.note.dateNote = '1970-01-01'; //Date in overwrite by microservice

    console.log('addNoteForPatientId- datas affected');

    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.patientService.getTocken()
    });
    this.httpClient
      .post(' http://localhost:9004/microservice-notes/patHistory/add', this.note,{observe: 'response',headers: reqHeader})
      //.post('http://localhost:8085/patHistory/d', this.note,{observe: 'response',headers: reqHeader})
      .subscribe(response =>{
          console.log('addNoteForPatientId - recup info');
          console.log(response.status);
          this.emitNotesSubject();
          this.getNoteListForPatientId(patientId);
        },
        (error) => {
          console.log('addNoteForPatientId Erreur ! : ' + error.status + " " + error.message);
          if (error.status !== 201)  {
            if (error.status === 304) {
              console.log('addNoteForPatientId tu es mal baré');
              this.patientService.setErrorMessage('note already exist : '+ error.status + error.message);
              this.patientService.emiterrorMessageSubjectSubject();
            } else {
              console.log('addNoteForPatientId tu es mal baré');
              this.patientService.setErrorMessage(' Technical error : '+ error.status + error.message);
              this.patientService.emiterrorMessageSubjectSubject();
            }
            this.router.navigate(['patient-Erreur']);
          }
        }
      );
    this.emitNotesSubject();
    this.getNoteListForPatientId(patientId);
    console.log('addNoteForPatientId- END');
  }
  updateNoteForPatientId(noteId: string, patientId: number, noteText: string) {
    console.log('updateNoteForPatientId- pour id note :' + noteId + ' text :'+ noteText);
    this.patientService.setErrorMessage('') ;
    this.patientService.emiterrorMessageSubjectSubject();
    this.noteUpd.id =noteId;
    this.noteUpd.patientId = patientId;
    this.noteUpd.textNote = noteText;
    this.noteUpd.dateNote = '1970-01-01'; //Date in overwrite by microservice

    console.log('updateNoteForPatientId- datas affected');


    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.patientService.getTocken()
    });

    this.httpClient
      .put(' http://localhost:9004/microservice-notes/patHistory', this.note,{observe: 'response',headers: reqHeader})
      //.put('http://localhost:8085/patHistory', this.noteUpd,{observe: 'response',headers: reqHeader})
      .subscribe(response =>{
          console.log('updateNoteForPatientId - recup info');
          console.log(response.status);
          //this.emitPatientsSubject();
          this.emitNotesSubject();
          this.getNoteListForPatientId(patientId);
        },
        (error) => {
          console.log('updateNoteForPatientId Erreur ! : ' + error.status + " " + error.message);
          if (error.status !== 202)  {
            if (error.status === 304) {
              console.log('updateNoteForPatientId tu es mal barré');
              this.patientService.setErrorMessage('updateNoteForPatientId - Note already exist : '+ error.status + error.message);
              this.patientService.emiterrorMessageSubjectSubject();
            } else {
              console.log('updateNoteForPatientId tu es mal barré');
              this.patientService.setErrorMessage(' updateNoteForPatientId- Technical error : '+ error.status + error.message) ;
              this.patientService.emiterrorMessageSubjectSubject();
            }
            this.router.navigate(['patient-Erreur']);
          } else {
            console.log('updateNoteForPatientId- 202 ok -END');
          }
        }
      );
    this.emitNotesSubject();
    this.getNoteListForPatientId(patientId);
    console.log('updateNoteForPatientId- END');
  }

  deleteNoteForPatientId(noteId: string, patientId: number) {
    console.log('deleteNoteForPatientId- pour id note :' + noteId );
    this.patientService.setErrorMessage('') ;
    this.patientService.emiterrorMessageSubjectSubject();
    this.noteUpd.id =noteId;
    this.noteUpd.patientId = patientId;
    this.noteUpd.textNote = '';
    this.noteUpd.dateNote = '1970-01-01'; //Date in overwrite by microservice

    console.log('deleteNoteForPatientId- datas affected');


    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.patientService.getTocken() }), body: this.noteUpd};

    this.httpClient
      .delete<any>('http://localhost:9004/microservice-notes/patHistory', httpOptions)//
      //.delete<any>('http://localhost:8085/patHistory', httpOptions)
      .subscribe(response =>{
          console.log('deleteNoteForPatientId - recup info');
          console.log(response.status);
          //this.emitPatientsSubject();
          this.emitNotesSubject();
          this.getNoteListForPatientId(patientId);
        },
        (error) => {
          console.log('deleteNoteForPatientId Erreur ! : ' + error.status + " " + error.message);
          if (error.status !== 200) {
            if (error.status !== 202) {
                if (error.status === 304) {
                  console.log('deleteNoteForPatientId tu es mal barré');
                  this.patientService.setErrorMessage('deleteNoteForPatientId - Note already exist : ' + error.status + error.message);
                  this.patientService.emiterrorMessageSubjectSubject();
                } else {
                  console.log('deleteNoteForPatientId tu es mal barré');
                  this.patientService.setErrorMessage(' deleteNoteForPatientId- Technical error : ' + error.status + error.message);
                  this.patientService.emiterrorMessageSubjectSubject();
                }
                this.router.navigate(['patient-Erreur']);
              } else {
                console.log('deleteNoteForPatientId- 202 ok -END');
              }
            }
        }
      );
    this.emitNotesSubject();
    this.getNoteListForPatientId(patientId);
    console.log('deleteNoteForPatientId- END');
  }

}
