import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsDashboardRoutingModule } from './notifications-dashboard-routing.module';
import { NotificationsListComponent } from './notifications-list/notifications-list.component';

@NgModule({
  declarations: [NotificationsListComponent],
  imports: [
    CommonModule,
    NotificationsDashboardRoutingModule
  ]
})
export class NotificationsDashboardModule { }
