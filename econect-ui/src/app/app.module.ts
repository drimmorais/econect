import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { EconectComponent } from './components/econect-page/econect-page.component';
import { NgbDatepickerModule, NgbModalModule, NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LayoutsModule } from './components/layout/layout.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { RegisterComponent } from './components/register/register.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { RegisterService } from './components/service/register/register.service';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { LayoutModule } from '@angular/cdk/layout'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ProfileComponent } from './components/dashboard/profile/profile.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { EcoBlogComponent } from './components/dashboard/eco-blog/eco-blog.component';
import { ConfigurationComponent } from './components/dashboard/configuration/configuration.component';
import { MatCardModule } from '@angular/material/card';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { AdComponent } from './components/dashboard/ad/ad.component';
import { ResetPasswordComponent } from './components/service/reset-password/reset-password.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScheduleComponent } from './components/dashboard/schedule/schedule.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatExpansionModule} from '@angular/material/expansion';
import { SchedulingComponent } from './components/dashboard/scheduling/scheduling.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {MatRippleModule} from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NgxMaskModule} from 'ngx-mask';
import { ApproveCollectPointComponent } from './components/dashboard/admin/approve-collect-point/approve-collect-point.component'
import {MatTableModule} from '@angular/material/table';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { EcopointsComponent } from './components/dashboard/ecopoints/ecopoints.component';
import { CollectPointComponent } from './components/dashboard/collect-point/collect-point.component';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    EconectComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    RecoverPasswordComponent,
    EcoBlogComponent,
    ConfigurationComponent,
    AdComponent,
    ResetPasswordComponent,
    ScheduleComponent,
    SchedulingComponent,
    ApproveCollectPointComponent,
    EcopointsComponent,
    CollectPointComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NgbModule,
    NgbModalModule,
    NgbPaginationModule,
    NgbAlertModule,
    BrowserAnimationsModule,
    LayoutsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSliderModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    LayoutModule,
    MatCardModule,
    ModalModule,
    NgSelectModule,
    NgbToastModule,
    NgbDatepickerModule,
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule,
    MatRadioModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatRippleModule,
    MatSnackBarModule,
    MatTableModule,
    MaterialFileInputModule,
    NgxMaskModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [RegisterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
