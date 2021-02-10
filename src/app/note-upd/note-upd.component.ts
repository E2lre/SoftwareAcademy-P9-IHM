import { Component, OnInit } from '@angular/core';
import {NoteService} from "../services/note.services";
import {PatientService} from "../services/patient.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-note-upd',
  templateUrl: './note-upd.component.html',
  styleUrls: ['./note-upd.component.scss']
})
export class NoteUpdComponent implements OnInit {
  notes: any[];
  noteSubscription: Subscription;
  patient: any;
  note: any;
  patientSubscription: Subscription;
  noteText: string;


  constructor(private noteService: NoteService ,private patientService: PatientService, private router:Router) { }

  ngOnInit(): void {
    this.noteSubscription = this.noteService.noteSubject.subscribe(
      (note: any[]) =>{
        this.note = note;
      }
    );
    this.note = this.noteService.getNotebyNoteId(this.noteService.getcurrentNoteId());
    this.noteService.emitNoteSubject();

    this.patientSubscription = this.patientService.patientSubject.subscribe(
      (patient ) =>{
        this.patient = patient;
      }
    );
    console.log('NoteupdComponent recher pour  id'+this.patientService.getCurrentId() );
    this.patient = this.patientService.findPatientById(this.patientService.getCurrentId());
    this.patientService.emitPatientSubject();
  }


  onUpdate(noteId:string){
    console.log('On update une liste');
    this.noteService.updateNoteForPatientId(noteId, this.patientService.getCurrentId(),this.note.textNote);
    this.router.navigate(['notes']);
  }
  onCancel(){
    console.log('On retourne à la liste de note');
    this.router.navigate(['notes']);
  }
}
