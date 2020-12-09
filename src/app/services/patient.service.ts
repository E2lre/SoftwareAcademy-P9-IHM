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
  private errorMessage:string;

  constructor(private httpClient: HttpClient, private router:Router) { }
  emitPatientSubject(){
    //console.log('emitPatientSubject - start');
    this.patientSubject.next(this.patients.slice());
    //console.log('emitPatientSubject - end');
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
          //.get<any[]>('http://localhost:9004/microservice-patients/patients')
          .get<any[]>('http://localhost:8081/patients')
          .subscribe((reponse) =>{
            console.log('getPatientsFromServer - recup info');
            this.patients = reponse;
            console.log('getPatientsFromServer - recup ok');
            this.emitPatientSubject();
            console.log('getPatientsFromServer - recup exit');
            },
            (error) => {
              console.log('getPatientsFromServer Erreur ! : ' + error);
              this.router.navigate(['fourofour']);
            }
          );
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
  //    .post('http://localhost:8081/patient', this.patient,{observe: 'response'})
      .post('http://localhost:8081/patient', this.patient,{observe: 'response'})
      .subscribe(response =>{
        console.log('addPatientToServer - recup info');
          console.log(response.status);
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
/*        map((response: Response) => {
          console.log('addPatientToServer Status ! : '+ response.status);

        });*/
        //this.router.navigate(['fourofour']);
      }
    );

    /*  .subscribe(
        (reponse) =>{
          console.log('getPatientsFromServer - recup info');
         },
        (error) => {
          console.log('Erreur ! : ' + error);*/
          /*map((response: Response) => {
              console.log('Status ! : '+ response.status);
                      })*/

      /*.pipe(map(response => {
        console.log('addPatientToServer-call' + response.status);
            })
          )*/
/*      .subscribe(
        (error) => {
          console.log('Erreur ! : ');
          console.log(error);
          this.router.navigate(['fourofour']);
        }
      );*/
         /* if (res.status === 201) {
            return [{ status: res.status, json: res }]
          }
          else if (res.status === 200) {
            return [{ status: res.status, json: res }]
          }
        }*/
/*      .map((response: Response) => {
        this.responseStatus = response.status;
        return this.extractData(response);
      })
      .catch(this.handleError);*/

    /*this.httpClient
      .post('http://localhost:8081/patient', this.patient,{observe: 'response'})
      .subscribe(
        response => {
          console.log(response.status);
          console.log('addPatientToServer- resp');
        }
        /!*() => {
          console.log('Enregistrement terminé !');
        }*!/
        /!*,
        (error) => {
          console.log('Erreur ! : ' + error);
      this.router.navigate(['fourofour']);
        }*!/
      );*/
    console.log('addPatientToServer- END');
  }
}
