import { LoggingService } from "./_logging/logging.service";
import { AlertifyService } from "./_logging/alertify.service";
import { BrowserModule } from "@angular/platform-browser";
import {
  NgModule,
  ErrorHandler,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA
} from "@angular/core";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { AngularFontAwesomeModule } from "angular-font-awesome";
import { TableModule } from "primeng/table";
import { AgGridModule } from "ag-grid-angular";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { HomeComponent } from "./core/home/home.component";
import { NavComponent } from "./core/nav/nav.component";

import { AboutComponent } from "./core/about/about.component";
import { ContactComponent } from "./core/contact/contact.component";

import { LoginComponent } from "./core/login/login.component";
import { PageNotFoundComponent } from "./core/page-not-found/page-not-found.component";

import { ErrorsModule } from "./errors/errors.module";
import { LogPublisherService } from "./_logging/log-publisher.service";

import { SpinnerComponent } from "./_shared/spinner/spinner.component";
import { InventoryDashboardModule } from "./inventory-dashboard/inventory-dashboard.module";
import { AdminDashboardModule } from "./admin-dashboard/admin-dashboard.module";
import { NotificationsDashboardModule } from "./notifications-dashboard/notifications-dashboard.module";
import { AssetFormComponent } from "./core/asset-form/asset-form.component";
import { DatepickerPopupComponent } from "./_shared/datepicker-popup/datepicker-popup.component";
import { AutoCompleteModule } from "primeng/autocomplete";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    LoginComponent,
    AboutComponent,
    ContactComponent,
    SpinnerComponent,
    PageNotFoundComponent,
    AssetFormComponent,
    DatepickerPopupComponent
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
    AutoCompleteModule,
    AgGridModule.withComponents([]),
    NgbModule,
    ErrorsModule,
    InventoryDashboardModule,
    AdminDashboardModule,
    NotificationsDashboardModule,
    AppRoutingModule
  ],
  providers: [AlertifyService, LoggingService, LogPublisherService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
