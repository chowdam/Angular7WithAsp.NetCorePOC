import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { InventoryDashboardRoutingModule } from './inventory-dashboard-routing.module';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { AssetDetailComponent } from './asset-detail/asset-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { InventoryPrimengComponent } from './inventory-primeng/inventory-primeng.component';
import { TableModule } from 'primeng/table';
import {DataTableModule} from 'primeng/datatable';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {MultiSelectModule} from 'primeng/multiselect';
import { InventoryAgGridComponent } from './inventory-ag-grid/inventory-ag-grid.component';
import { AgGridModule } from 'ag-grid-angular';


@NgModule({
  declarations: [
    InventoryListComponent,
    AssetDetailComponent,
    InventoryPrimengComponent,
    InventoryAgGridComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    AgGridModule.withComponents([]),
    TableModule,
    DataTableModule,
    MultiSelectModule,
    PanelModule,
    DropdownModule,
    ButtonModule,
    NgbModule.forRoot(),
    InventoryDashboardRoutingModule
  ]
})
export class InventoryDashboardModule {}
