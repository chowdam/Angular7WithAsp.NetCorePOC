import { FormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AdminComponent } from './admin/admin.component';
import { AppSettingsComponent } from './app-settings/app-settings.component';
import { LogComponent } from './log/log.component';

@NgModule({
  declarations: [AdminComponent, AppSettingsComponent, LogComponent],
  imports: [CommonModule, FormsModule, AdminDashboardRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminDashboardModule {}
