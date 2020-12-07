export class PatientService {
  patients =[
    {
      id:1,
      lastName: 'Nom 111',
      firstName: 'prénom1',
      birthDate: '01/01/1980',
      sex : "M",
      address : "15 rue de la Paix",
      phone : "0123456789"
    },
    {
      id:2,
      lastName: 'Nom 211',
      firstName: 'prénom2',
      birthDate: '31/12/1990',
      sex : "F",
      address : "1 allée des oiseaux",
      phone : "0654321987"
    },
    {
      id:3,
      lastName: 'Nom 31144',
      firstName: 'prénom3',
      birthDate: '20/02/2000',
      sex : "M",
      address : "place du ruisseau",
      phone : "0567891234"
    },
  ];
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
  }
  switchNameOne(index: number) {
    console.log('tut');
    this.patients[index].firstName= 'Hola !';
  }
}
