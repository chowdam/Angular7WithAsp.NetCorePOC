import { Component, OnInit } from '@angular/core';
import { Inventory } from './../inventory';
import { ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/api';
import {DataTableModule} from 'primeng/datatable';

@Component({
  selector: 'app-inventory-primeng',
  templateUrl: './inventory-primeng.component.html',
  styleUrls: ['./inventory-primeng.component.css']
})
export class InventoryPrimengComponent implements OnInit {
  inventory: Inventory[] = [];
  selectedInventory: Inventory[] = [];
  cols: any[];
  
  pageSize: SelectItem[];
  selectPageSize = 20;
  selectedColumns: any[];


  constructor(private route: ActivatedRoute) {}

  
  ngOnInit() {
    this.inventory = <Inventory[]>this.route.snapshot.data['inventory'];
    // console.log('Data for primeng table: ' + this.inventory);

    this.pageSize = [
      { label: '10', value: 10 },
      { label: '20', value: 20 },
      { label: '50', value: 50 },
      { label: '100', value: 100 },
      { label: '200', value: 200 },
      { label: '500', value: 500 }
    ];
    this.cols = [
      {
        field: 'serialNumber',
        header: 'Serial Number'
      },
      {
        field: 'vin',
        header: 'VIN'
      },
      {
        field: 'assetStatus',
        header: 'Asset Status'
      },
      {
        field: 'installationDate',
        header: 'Installation Date'
      },
      {
        field: 'garage',
        header: 'Garage'
      },
      {
        field: 'busNumber',
        header: 'Bus Number'
      },
      {
        field: 'licensePlate',
        header: 'License Plate'
      },
      {
        field: 'vehicleType',
        header: 'Vehicle Type'
      }
    ];

    this.selectedColumns = this.cols;
    console.log('this.selectedColumns:' + this.selectedColumns);
  }


  resetTable(dt: any) {
    //console.log('type of dt:' + typeof dt);
    dt.reset();
}
}
