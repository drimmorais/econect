import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdComponent } from './components/dashboard/ad/ad.component';
import { ApproveCollectPointComponent } from './components/dashboard/admin/approve-collect-point/approve-collect-point.component';
import { CollectPointComponent } from './components/dashboard/collect-point/collect-point.component';
import { ConfigurationComponent } from './components/dashboard/configuration/configuration.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EcoBlogComponent } from './components/dashboard/eco-blog/eco-blog.component';
import { EcopointsComponent } from './components/dashboard/ecopoints/ecopoints.component';
import { ProfileComponent } from './components/dashboard/profile/profile.component';
import { ScheduleComponent } from './components/dashboard/schedule/schedule.component';
import { SchedulingComponent } from './components/dashboard/scheduling/scheduling.component';
import { EconectComponent } from './components/econect-page/econect-page.component';
import { LoginComponent } from './components/login/login.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/service/reset-password/reset-password.component';
// import { AuthGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  {
    path: '', redirectTo: '/econect', pathMatch: 'full',
    // canActivate: [AuthGuard]
  },
  {
    path: 'econect', component: EconectComponent
  },
  {
    path: 'dashboard', redirectTo: '/dashboard/eco-blog', pathMatch: 'full',
    // canActivate: [AuthGuard]
  },
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'eco-blog', component: EcoBlogComponent },
      { path: 'collect-point', component: CollectPointComponent},
      { path: 'ad', component: AdComponent },
      { path: 'configurations', component: ConfigurationComponent },
      { path: 'schedule', component: ScheduleComponent },
      { path: 'scheduling', component: SchedulingComponent },
      { path: 'validation', component: ApproveCollectPointComponent },
      { path: 'ecopoints', component: EcopointsComponent}
    ]
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'recover/password', component: RecoverPasswordComponent
  },
  {
    path: 'reset/password', component: ResetPasswordComponent
  }
  // {
  //   path: 'profile', component: ProfileComponent
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
