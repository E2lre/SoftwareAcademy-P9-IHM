import { Component, OnInit } from '@angular/core';
import {NoteService} from "../services/note.services";
import {PatientService} from "../services/patient.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-note-add',
  templateUrl: './note-add.component.html',
  styleUrls: ['./note-add.component.scss']
})
export class NoteAddComponent implements OnInit {
  notes: any[];
  noteSubscription: Subscription;
  patient: any;
  patientSubscription: Subscription;
  noteText: string;

  constructor(private noteService: NoteService ,private patientService: PatientService, private router:Router) { }

  ngOnInit(): void {
    this.noteSubscription = this.noteService.notesSubject.subscribe(
      (notes: any[]) =>{
        this.notes = notes;
      }
    );
    this.noteService.emitNotesSubject();
    this.patientSubscription = this.patientService.patientSubject.subscribe(
      (patient ) =>{
        this.patient = patient;
      }
    );
    console.log('NoteAddComponent recher pour  id'+this.patientService.getCurrentId() );
    this.patient = this.patientService.findPatientById(this.patientService.getCurrentId());
  }
  onAdd(){
    console.log('On ajoute une liste');
    this.noteService.addNoteForPatientId(this.patientService.getCurrentId(),this.noteText);
    this.router.navigate(['notes']);
  }
  onCancel(){
    console.log('On retourne à la liste de note');
    this.router.navigate(['notes']);
  }
}
