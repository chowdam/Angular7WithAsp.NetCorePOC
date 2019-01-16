import { LogComponent } from './log/log.component';
import { AppSettingsComponent } from './app-settings/app-settings.component';
import { AdminComponent } from './admin/admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_security/auth.guard';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'settings',
        component: AppSettingsComponent
      },
      {
        path: 'log',
        component: LogComponent
      }
    ]
  },
  { path: '', redirectTo: '/admin', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule {}
