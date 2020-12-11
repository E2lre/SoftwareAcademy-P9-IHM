import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
import {Subject} from 'rxjs';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import {Observable, throwError} from "rxjs/index";
import { catchError, retry } from 'rxjs/operators';
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
 /* Patient:{
  'lastName':string,
    'firstName':string,
    'birthdate': string,
    'sex': string,
    'address':string,
    'phone': string
};*/

export interface Patient {
  lastName: string;
  firstName: string;
  birthdate: string;
  sex: string;
  address: string;
  phone: string
}
@Injectable()
export class PatientService {

  patientsSubject = new Subject<any[]>();
  patientSubject = new Subject<any>();
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
  /*export interface Patient {
    lastName: string='';
    firstName: string='';
    birthdate: string='';
    sex: string='';
    address: string='';
    phone: string=''
  }*/
  //private patient: Patient;
  private patient = {
    firstName: 'firstName',
    lastName: 'lastName',
    birthdate: '01/01/2000',
    sex : "sex",
    address : "address",
    phone : "phone"
  }
  //TODO : verifier si on peut fusionner patient et patientUpd
  private patientUpd = {
    id : 0,
    firstName: 'firstName',
    lastName: 'lastName',
    birthdate: '01/01/2000',
    sex : "sex",
    address : "address",
    phone : "phone"
  }
  private errorMessage:string;
  private currentId:number;
  constructor(private httpClient: HttpClient, private router:Router) { }
  emitPatientsSubject(){
    //console.log('emitPatientsSubject - start');
    this.patientsSubject.next(this.patients.slice());
    //console.log('emitPatientsSubject - end');
  }
  emitPatientSubject(){
    //console.log('emitPatientSubject - start');
    this.patientSubject.next(this.patientUpd);
    //console.log('emitPatientSubject - end');
  }
  getCurrentId(){
    return this.currentId;
  }
  setCurrentId(id: number) {
    this.currentId = id;
  }
  getPatientById(id:number){
    const patient = this.patients.find(
      (patientObject) => {
        return patientObject.id === id;
      }
    );
    this.patientUpd = patient;
    return patient;
  }
  getPatientCurent(){
    return this.patientUpd;
  }
  switchName(){
    for(let patient of this.patients) {
      patient.firstName='Bilou';
    }
    this.emitPatientsSubject();
  }
  switchNameOne(index: number) {
    console.log('tut');
    this.patients[index].firstName= 'Hola !';
    this.emitPatientsSubject();
  }
  getErrorMessage(){
    return this.errorMessage;
  }
  setErrorMessage (message: string){
    this.errorMessage = message;
  }
  getPatientsFromServer() {
    console.log('getPatientsFromServer- start');
 /*   const headers_object = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
                                            .append('Authorization', 'Basic ' + btoa('utilisateur' + ':' + 'mdp'));*/

    var headers_object = new HttpHeaders();
    headers_object.append('Content-Type', 'application/json');
    headers_object.append('Authorization', 'Basic' + btoa('utilisateur:mdp'));

    const httpOptions = {
      headers: headers_object
    };

    this.httpClient
          //.get<any[]>('http://localhost:9004/microservice-patients/patients',httpOptions)
          //.get<any[]>('http://localhost:9004/microservice-patients/patients',{headers: headers_object})
          .get<any[]>('http://localhost:9004/microservice-patients/patients')
          //.get<any[]>('http://localhost:8081/patients')
          .subscribe((reponse) =>{
            console.log('getPatientsFromServer - recup info');
            this.patients = reponse;
            console.log('getPatientsFromServer - recup ok');
            this.emitPatientsSubject();
            console.log('getPatientsFromServer - recup exit');
            },
            (error) => {
              console.log('getPatientsFromServer Erreur ! : ' + error);
              this.router.navigate(['fourofour']);
            }
          );
  }

  findPatientById(id:number) {
    console.log('getPatientById- start id='+id);
    /*   const headers_object = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
                                               .append('Authorization', 'Basic ' + btoa('utilisateur' + ':' + 'mdp'));*/

    var headers_object = new HttpHeaders();
    headers_object.append('Content-Type', 'application/json');
    headers_object.append('Authorization', 'Basic' + btoa('utilisateur:mdp'));

    const httpOptions = {
      headers: headers_object
    };

    this.httpClient
      //.get<any[]>('http://localhost:9004/microservice-patients/patients',httpOptions)
      .get<any>('http://localhost:9004/microservice-patients/patient/'+ id,{headers: headers_object})
      //.get<any>('http://localhost:8081/patient/'+ id)
      .subscribe((reponse) =>{
          console.log('findPatientById - recup info');
          this.patientUpd = reponse;
          console.log('findPatientById - recup ok');
          console.log('findPatientById - value'+this.patientUpd.firstName + ' - ' + this.patientUpd.lastName);
          this.emitPatientSubject();
          console.log('findPatientById - recup exit');
        },
        (error) => {
          console.log('findPatientById Erreur ! : ' + error);
          this.router.navigate(['fourofour']);
        }
      );
    console.log('findPatientById'+this.patientUpd.firstName + ' - ' + this.patientUpd.lastName);
    return this.patientUpd;
  }

  addPatientToServer(lastName: string,firstName: string,birthdate: string,sex: string,address: string,phone: string) {
    console.log('addPatientToServer- start');
    console.log(lastName);
    this.patient.phone ='123';

    this.patient.lastName = lastName;
    this.patient.firstName = firstName;
    this.patient.birthdate = birthdate;
    this.patient.sex = sex;
    this.patient.address = address;
    this.patient.phone = phone;

    console.log('addPatientToServer- datas affected');

    this.httpClient
      .post('http://localhost:9004/microservice-patients/patient/', this.patient,{observe: 'response'})
      //.post('http://localhost:8081/patient', this.patient,{observe: 'response'})
      .subscribe(response =>{
        console.log('addPatientToServer - recup info');
          console.log(response.status);
          this.getPatientsFromServer();
          this.emitPatientsSubject();
        },
      (error) => {
        console.log('addPatientToServer Erreur ! : ' + error.status + " " + error.message);
        if (error.status !== 201)  {
          if (error.status === 304) {
            console.log('addPatientToServer tu es mal baré');
            this.errorMessage = 'Patient already exist : '+ error.status + error.message;
          } else {
            console.log('addPatientToServer tu es mal baré');
            this.errorMessage = ' Technical error : '+ error.status + error.message ;
          }
          this.router.navigate(['patient-Erreur']);
        }
      }
    );
    this.getPatientsFromServer();
    this.emitPatientsSubject();
    console.log('addPatientToServer- END');
  }

  updPatientToServer(id:number, lastName: string,firstName: string,birthdate: string,sex: string,address: string,phone: string) {
    console.log('updPatientToServer- start'+id);

    this.patientUpd.id = id;
    this.patientUpd.lastName = lastName;
    this.patientUpd.firstName = firstName;
    this.patientUpd.birthdate = birthdate;
    this.patientUpd.sex = sex;
    this.patientUpd.address = address;
    this.patientUpd.phone = phone;

    console.log('updPatientToServer- datas affected');
    console.log(this.patientUpd.id);
    console.log(this.patientUpd.lastName);
    console.log(this.patientUpd.firstName);
    console.log(this.patientUpd.birthdate);
    console.log(this.patientUpd.sex);
    console.log(this.patientUpd.address);
    console.log(this.patientUpd.phone);


    this.httpClient
      .put('http://localhost:9004/microservice-patients/patient/', this.patientUpd,{observe: 'response'})
      //.put('http://localhost:8081/patient', this.patientUpd,{observe: 'response'})
      .subscribe(response =>{
          console.log('updPatientToServer - recup info');
          console.log(response.status);
          //this.emitPatientsSubject();
          this.emitPatientSubject();
          this.getPatientsFromServer();
        },
        (error) => {
          console.log('updPatientToServer Erreur ! : ' + error.status + " " + error.message);
          if (error.status !== 202)  {
            if (error.status === 304) {
              console.log('updPatientToServer tu es mal barré');
              this.errorMessage = 'Patient already exist : '+ error.status + error.message;
            } else {
              console.log('updPatientToServer tu es mal barré');
              this.errorMessage = ' Technical error : '+ error.status + error.message ;
            }
            this.router.navigate(['patient-Erreur']);
          }
        }
      );
    this.getPatientsFromServer();
    this.emitPatientsSubject();
    console.log('updPatientToServer- END');
  }

  deletePatientToServer(id:number, lastName: string,firstName: string,birthdate: string,sex: string,address: string,phone: string) {
    console.log('updPatientToServer- start'+id);

    this.patientUpd.id = id;
    this.patientUpd.lastName = lastName;
    this.patientUpd.firstName = firstName;
    this.patientUpd.birthdate = birthdate;
    this.patientUpd.sex = sex;
    this.patientUpd.address = address;
    this.patientUpd.phone = phone;

    console.log('updPatientToServer- datas affected');
    console.log(this.patientUpd.id);
    console.log(this.patientUpd.lastName);
    console.log(this.patientUpd.firstName);
    console.log(this.patientUpd.birthdate);
    console.log(this.patientUpd.sex);
    console.log(this.patientUpd.address);
    console.log(this.patientUpd.phone);

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: this.patientUpd};
    this.httpClient
      .delete<any>('http://localhost:9004/microservice-patients/patient/'+ id,httpOptions)
      //.delete<any>('http://localhost:8081/patient/'+ id,httpOptions)
      .subscribe(response =>{
          console.log('updPatientToServer - recup info');
          console.log(response.status);
          //this.emitPatientsSubject();
          this.emitPatientSubject();
          this.getPatientsFromServer();
        },
        (error) => {
          console.log('updPatientToServer Erreur ! : ' + error.status + " " + error.message);
          if (error.status !== 202)  {
            if (error.status === 304) {
              console.log('updPatientToServer tu es mal barré');
              this.errorMessage = 'Patient already exist : '+ error.status + error.message;
            } else {
              console.log('updPatientToServer tu es mal barré');
              this.errorMessage = ' Technical error : '+ error.status + error.message ;
            }
            this.router.navigate(['patient-Erreur']);
          }
        }
      );
    this.getPatientsFromServer();
    this.emitPatientsSubject();
    console.log('updPatientToServer- END');
  }
}
