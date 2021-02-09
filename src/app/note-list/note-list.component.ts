import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {PatientService} from "../services/patient.service";
import {NoteService} from "../services/note.services";

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {
  notes: any[];
  noteSubscription: Subscription;
  patientUpd: any;
  patient: any;
  patientSubscription: Subscription;
  patients: any[];
  patientsSubscription: Subscription;

  patientId: number = 0;
  patientLastName:String ='';
  patientFirstName:String ='';
  patientBirthdate: Date;//String = 'birthdate par défaut';

  constructor(private noteService: NoteService ,private patientService: PatientService, private router:Router) { }

  ngOnInit(): void {
    this.noteSubscription = this.noteService.notesSubject.subscribe(
      (notes: any[]) =>{
        this.notes = notes;
      }
    );
    this.noteService.emitNotesSubject();

   /* this.patientsSubscription = this.patientService.patientsSubject.subscribe(
      (patients ) =>{
        this.patients = patients;
      }
    );
    this.patientService.emitPatientsSubject();*/
  /*  this.patientSubscription = this.patientService.patientSubject.subscribe(
      (patient ) =>{
        this.patient = patient;
      }
    );
     this.patient = this.patientService.findPatientById(this.patientService.getCurrentId());*/
    //this.patientService.emitPatientSubject();
    this.patientSubscription = this.patientService.patientSubject.subscribe(
      (patient ) =>{
        this.patient = patient;
      }
    );
    console.log('NoteListComponent recher pour  id'+this.patientService.getCurrentId() );
    this.patient = this.patientService.findPatientById(this.patientService.getCurrentId());

    //this.patientService.emitPatientSubject();
    console.log('NoteListComponent findPatientById - id'+this.patient.id );
    console.log('NoteListComponent findPatientById - lastName'+this.patient.lastName );
    console.log('NoteListComponent findPatientById - firstName'+this.patient.firstName );
    console.log('NoteListComponent findPatientById - birthdate'+this.patient.birthdate );

    this.noteService.getNoteListForPatientId(this.patientService.getCurrentId());

  }
  onAjouter(){
    console.log('On ajoute une note');
  //  this.router.navigate(['patient-add']);
  }
  onPatientList(){
    console.log('On retourne à la liste des patients');
    this.router.navigate(['patients']);
  }
}
