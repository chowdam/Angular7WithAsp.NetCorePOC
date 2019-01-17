import { InventoryService } from './../inventory.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Inventory } from './../inventory';
import { ActivatedRoute } from '@angular/router';
import { SelectItem, LazyLoadEvent } from 'primeng/api';
import { DataTableModule } from 'primeng/datatable';

@Component({
  selector: 'app-inventory-primeng',
  templateUrl: './inventory-primeng.component.html',
  styleUrls: ['./inventory-primeng.component.css']
})
export class InventoryPrimengComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private inventoryService: InventoryService
  ) {}
  inventory: Inventory[] = [];
  selectedInventory: Inventory[] = [];
  cols: any[];

  pageSize: SelectItem[];
  selectPageSize = 20;
  selectedColumns: any[];
  totalRecords: number;
  loading: boolean;
  pageNumber: SelectItem[];
  currentPageNumber = 1;

  @ViewChild('dt') dataTable: any;

  ngOnInit() {
    this.inventory = <Inventory[]>this.route.snapshot.data['inventory'];
    // console.log('Data for primeng table: ' + this.inventory);

    this.totalRecords = this.inventory.length;

    this.pageSize = [
      { label: '10', value: 10 },
      { label: '20', value: 20 },
      { label: '50', value: 50 },
      { label: '100', value: 100 },
      { label: '200', value: 200 },
      { label: '500', value: 500 }
    ];

    this.pageNumber = [
      { label: '1', value: 1 },
      { label: '10', value: 10 },
      { label: '20', value: 20 },
      { label: '30', value: 30 },
      { label: '50', value: 50 },
      { label: '100', value: 100 }
    ];
    this.cols = [
      {
        field: 'serialNumber',
        header: 'Serial Number'
      },

      {
        field: 'assetStatus',
        header: 'Asset Status'
      },
      {
        field: 'dateAcquired',
        header: 'Date Aquired'
      },
      {
        field: 'assetAge',
        header: 'Asset Age'
      },
      {
        field: 'vin',
        header: 'VIN'
      },
      {
        field: 'vehicleAssociationStatus',
        header: 'vehicleAssociationStatus'
      },
      {
        field: 'associationStartDate',
        header: 'Association StartDate'
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
        field: 'vehicleOwner',
        header: 'Vehicle Owner'
      }
    ];

    this.selectedColumns = this.cols;
    // console.log('this.selectedColumns:' + this.selectedColumns);
    this.loading = true;
  }

  setCurrentPage(n: number) {
    this.dataTable.reset();
    const paging = {
      first: (n - 1) * this.dataTable.rows,
      rows: this.dataTable.rows
    };
    this.dataTable.paginate(paging);
  }
  // this.setCurrentpage(pageNumber) will set table to given page number

  paginate(event) {
    // event.first: Index of first record being displayed
    // event.rows: Number of rows to display in new page
    // event.page: Index of the new page
    // event.pageCount: Total number of pages
    console.log('paging occured ...');
    console.log(event);
    const pageIndex = event.first / event.rows + 1; // Index of the new page if event.page not defined.
  }

  loadInventoryLazy(event: LazyLoadEvent) {
    this.loading = true;
    console.log('event: ' + JSON.stringify(event));
    console.log('event.rows: ' + event.rows);
    console.log('event.first: ' + event.first);

    // in a real application, make a remote request to load data using state metadata from event
    // event.first = First row offset
    // event.rows = Number of rows per page
    // event.sortField = Field name to sort with
    // event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    // filters: FilterMetadata object having field as key and filter value, filter matchMode as value

    // imitate db connection over a network
    setTimeout(() => {
      console.log('calling service to get by page size:');
      const pageIndex = event.first / event.rows + 1;
      this.inventoryService
        .getInventoryByPage(event.rows, pageIndex)
        .subscribe(resp => (this.inventory = resp));
    }, 1000);
  }

  resetTable(dt: any) {
    // console.log('type of dt:' + typeof dt);
    dt.reset();
  }
}
