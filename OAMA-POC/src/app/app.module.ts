import { LoggingService } from './_logging/logging.service';
import { AlertifyService } from './_logging/alertify.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './core/home/home.component';
import { NavComponent } from './core/nav/nav.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AboutComponent } from './core/about/about.component';
import { ContactComponent } from './core/contact/contact.component';

import { LoginComponent } from './core/login/login.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';

import { ErrorsModule } from './errors/errors.module';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';
import { InventoryDashboardModule } from './inventory-dashboard/inventory-dashboard.module';
import { NotificationsDashboardModule } from './notifications-dashboard/notifications-dashboard.module';
import { LogPublisherService } from './_logging/log-publisher.service';
import { TableModule } from 'primeng/table';

import { AgGridModule } from 'ag-grid-angular';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    NavComponent,
    LoginComponent,
    AboutComponent,
    ContactComponent
  ],
  // tslint:disable-next-line:max-line-length
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    TableModule,
    AgGridModule.withComponents([]),
    ErrorsModule,
    InventoryDashboardModule,
    AdminDashboardModule,
    NotificationsDashboardModule,
    AppRoutingModule
  ],
  providers: [AlertifyService, LoggingService, LogPublisherService],
  bootstrap: [AppComponent]
})
export class AppModule {}
