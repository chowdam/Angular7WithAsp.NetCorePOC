import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { AngularFontAwesomeModule } from "angular-font-awesome";

import { InventoryDashboardRoutingModule } from "./inventory-dashboard-routing.module";
import { InventoryListComponent } from "./inventory-list/inventory-list.component";
import { AssetDetailComponent } from "./asset-detail/asset-detail.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbTooltip } from "@ng-bootstrap/ng-bootstrap";
import { InventoryPrimengComponent } from "./inventory-primeng/inventory-primeng.component";

import { TableModule } from "primeng/table";
import { DataTableModule } from "primeng/datatable";
import { PanelModule } from "primeng/panel";
import { DropdownModule } from "primeng/dropdown";
import { ButtonModule } from "primeng/button";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextModule } from "primeng/inputtext";
import { RadioButtonModule } from "primeng/radiobutton";
import { KeyFilterModule } from "primeng/keyfilter";
import { CalendarModule } from "primeng/calendar";

import { InventoryAgGridComponent } from "./inventory-ag-grid/inventory-ag-grid.component";
import { AgGridModule } from "ag-grid-angular";

import { AlertifyService } from "../_logging/alertify.service";
import { LoggingService } from "../_logging/logging.service";
import { LogPublisherService } from "../_logging/log-publisher.service";
import { InventoryKendoComponent } from "./inventory-kendo/inventory-kendo.component";
import {
  GridModule,
  PDFModule,
  ExcelModule
} from "@progress/kendo-angular-grid";

@NgModule({
  declarations: [
    InventoryListComponent,
    AssetDetailComponent,
    InventoryPrimengComponent,
    InventoryAgGridComponent,
    InventoryKendoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    AgGridModule.withComponents([]),
    NgbModule.forRoot(),
    TableModule,
    DataTableModule,
    MultiSelectModule,
    PanelModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    RadioButtonModule,
    KeyFilterModule,
    CalendarModule,
    GridModule,
    PDFModule,
    ExcelModule,
    InventoryDashboardRoutingModule
  ],
  providers: [AlertifyService, LoggingService, LogPublisherService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InventoryDashboardModule {}
