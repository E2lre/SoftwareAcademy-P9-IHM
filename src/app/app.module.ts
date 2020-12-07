import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientComponent } from './patient/patient.component';

import {PatientService} from './services/patient.service';
import { AuthComponent } from './auth/auth.component';
import { PatientViewComponent } from './patient-view/patient-view.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthService} from './services/auth.service';
import { FourOFourComponent } from './four-o-four/four-o-four.component';
import {AuthGuard} from './services/auth-guard.service';
import {HttpClientModule} from '@angular/common/http';

const appRoutes: Routes = [
  {path:'patients',canActivate: [AuthGuard],component: PatientListComponent},
  {path:'patients/:id',canActivate: [AuthGuard],component: PatientViewComponent},
  {path:'auth',component: AuthComponent},
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
    PatientViewComponent,
    FourOFourComponent
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
