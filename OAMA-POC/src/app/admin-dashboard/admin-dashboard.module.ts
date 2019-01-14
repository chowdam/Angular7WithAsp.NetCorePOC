import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AdminComponent } from './admin/admin.component';
import { AppSettingsComponent } from './app-settings/app-settings.component';

@NgModule({
  declarations: [AdminComponent, AppSettingsComponent],
  imports: [CommonModule, FormsModule, AdminDashboardRoutingModule]
})
export class AdminDashboardModule {}
