import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PatientService} from "../services/patient.service";
import {NoteService} from "../services/note.services";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  @Input() noteId: number;
  @Input() noteText: string;
  //patientBirthDate: string ='24/10/1968';
  @Input() noteDate: Date;

  constructor(private patientService: PatientService, private noteService: NoteService, private router:Router) { }

  ngOnInit(): void {
  }
  getColor() {

  }
  onUpdate (noteId:number){
    console.log('On va au détail pour noteId :'+ noteId);
    this.noteService.setcurrentNoteId(noteId);
    this.router.navigate(['note-upd']);
  }
  onDelete (noteId:number){
    console.log('On va au détail pour noteId :'+ noteId);
    this.noteService.setcurrentNoteId(noteId);
    this.router.navigate(['note-del']);
  }
}
