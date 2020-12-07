import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

export interface ReponsePatientList {
  //totalItems: number;
 /* items: Array<{
    patient: {
      id: string,
      firstName: string,
      lastName: string,
      birthdate: string,
      sex: string,
      address: string,
      phone: string
    }
  }>;*/
  items: Array<{
      id: number,
      lastName: string,
      firstName: string,
      birthdate: string,
      sex: string,
      address: string,
      phone: string
    }>;
}

@Injectable()
export class PatientService {

  patientSubject = new Subject<any[]>();
  //private patients =[
  private patients =[
    {
      id:1,
      lastName: 'Nom 111',
      firstName: 'prénom1',
      birthdate: '01/01/1980',
      sex : "M",
      address : "15 rue de la Paix",
      phone : "0123456789"
    },
    {
      id:2,
      lastName: 'Nom 211',
      firstName: 'prénom2',
      birthdate: '02/12/1990',
      sex : "F",
      address : "1 allée des oiseaux",
      phone : "0654321987"
    },
    {
      id:3,
      lastName: 'Nom 31144',
      firstName: 'prénom3',
      birthdate: '03/03/2000',
      sex : "M",
      address : "place du ruisseau",
      phone : "0567891234"
    },
  ];

  constructor(private httpClient: HttpClient, private router:Router) { }
  emitPatientSubject(){
    console.log('emitPatientSubject - start');
    this.patientSubject.next(this.patients.slice());
    console.log('emitPatientSubject - end');
  }
  getPatientById(id:number){
    const patient = this.patients.find(
      (patientObject) => {
        return patientObject.id === id;
      }
    );
    return patient;
  }
  switchName(){
    for(let patient of this.patients) {
      patient.firstName='Bilou';
    }
    this.emitPatientSubject();
  }
  switchNameOne(index: number) {
    console.log('tut');
    this.patients[index].firstName= 'Hola !';
    this.emitPatientSubject();
  }

  getPatientsFromServer() {
    console.log('getPatientsFromServer- start');
   this.httpClient
          .get<any[]>('http://localhost:8081/patients')
          .subscribe((reponse) =>{
            console.log('getPatientsFromServer - recup info');
            this.patients = reponse;
            console.log('getPatientsFromServer - recup ok');
            this.emitPatientSubject();
            console.log('getPatientsFromServer - recup exit');
            },
            (error) => {
              console.log('Erreur ! : ' + error);
              this.router.navigate(['fourofour']);
            }
          );
/*
    this.httpClient
      .get<ReponsePatientList>('http://localhost:8081/patients')
      .subscribe(reponsePatientList =>{
          console.log('getPatientsFromServer - recup info');
          this.patients = reponsePatientList.items;
          console.log('getPatientsFromServer - recup ok');
          this.emitPatientSubject();
          console.log('getPatientsFromServer - recup exit');
        }

      );
*/

    //const options = {  observe: 'text' as const,};
 /*   this.httpClient
      //.get<any[]>('http://localhost:8081/patients')
      .get<any[]>('http://localhost:8081/patients')
      .subscribe(
        (response) => {
          console.log('getPatientsFromServer- Récupération de la réponse');
        / this.patients = response;
          console.log('getPatientsFromServer- réponse récupérée');
          //this.emitAppareilSubject();
       },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );*/
  }
}
