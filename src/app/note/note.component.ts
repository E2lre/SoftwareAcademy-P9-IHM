import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

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

  constructor( private router:Router) { }

  ngOnInit(): void {
  }
  getColor() {

  }
  onUpdate (id:number){
    console.log('On va au détail pour noteId :'+ id);
    //this.patientService.setCurrentId(id);
    //this.router.navigate(['patient-upd']);
  }
  onDelete (id:number){
    console.log('On va au détail pour noteId :'+ id);
    //this.patientService.setCurrentId(id);
    //this.router.navigate(['patient-del']);
  }
}
