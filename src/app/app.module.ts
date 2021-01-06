import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientComponent } from './patient/patient.component';

import {PatientService} from './services/patient.service';
import { AuthComponent } from './auth/auth.component';
import {AuthSignupComponent} from './auth-signup/auth-signup.component';
import { PatientViewComponent } from './patient-view/patient-view.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthService} from './services/auth.service';
import { FourOFourComponent } from './four-o-four/four-o-four.component';
import {AuthGuard} from './services/auth-guard.service';
import {HttpClientModule} from '@angular/common/http';
import { PatientAddComponent } from './patient-add/patient-add.component';
import { PatientErreurComponent } from './patient-erreur/patient-erreur.component';
import { PatientUpdComponent } from './patient-upd/patient-upd.component';
import { PatientDelComponent } from './patient-del/patient-del.component';

const appRoutes: Routes = [
  {path:'patients',canActivate: [AuthGuard],component: PatientListComponent},
  {path:'patients/:id',canActivate: [AuthGuard],component: PatientViewComponent},
  {path:'auth',component: AuthComponent},
  {path:'auth-signup',component: AuthSignupComponent},
  {path:'patient-add',component:PatientAddComponent},
  {path:'patient-upd',component:PatientUpdComponent},
  {path:'patient-del',component:PatientDelComponent},
  {path:'patient-view',component:PatientViewComponent},
  {path:'patient-Erreur',component:PatientErreurComponent},
  {path:'',component:PatientListComponent},
  {path:'not-found',component:FourOFourComponent},
  {path:'**',redirectTo:'/not-found'}
];

@NgModule({
  declarations: [
    AppComponent,
    PatientListComponent,
    PatientComponent,
    AuthComponent,
    AuthSignupComponent,
    PatientViewComponent,
    PatientAddComponent,
    FourOFourComponent,
    PatientAddComponent,
    PatientUpdComponent,
    PatientDelComponent,
    PatientErreurComponent,
    PatientUpdComponent,
    PatientDelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    PatientService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
