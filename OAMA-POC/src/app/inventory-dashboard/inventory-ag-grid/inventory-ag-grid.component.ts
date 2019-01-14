import { Component, OnInit, ViewChild } from '@angular/core';
import { Inventory } from './../inventory';
import { ActivatedRoute } from '@angular/router';
import { AgGridNg2 } from 'ag-grid-angular';

@Component({
  selector: 'app-inventory-ag-grid',
  templateUrl: './inventory-ag-grid.component.html',
  styleUrls: ['./inventory-ag-grid.component.css']
})
export class InventoryAgGridComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridNg2;

  inventory: Inventory[] = [];
  selectedDataStringPresentation: string;
  columnDefs;
  gridApi;
  gridColumnApi;
  paginationPageSize;
  paginationNumberFormatter;

  constructor(private route: ActivatedRoute) {
    this.paginationPageSize = 10;
    this.paginationNumberFormatter = function(params) {
      return '[' + params.value.toLocaleString() + ']';
    };

    this.columnDefs = [
      {
        field: 'serialNumber',
        headerName: 'Serial Number',
        width: 150,
        minWidth: 50,
        maxWidth: 200,
        sortable: true,
        resizable: true,
        filter: true,
        filterParams: {
          applyButton: true,
          clearButton: true
        },
        checkboxSelection: true
      },
      {
        field: 'storagePossession',
        headerName: 'Storage Possession',
        width: 150,
        minWidth: 50,
        maxWidth: 200,
        sortable: true,
        resizable: true,
        filter: true,
        filterParams: {
          applyButton: true,
          clearButton: true
        }
      },
      {
        field: 'assetUseAge',
        headerName: 'Asset Use Age',
        width: 150,
        minWidth: 50,
        maxWidth: 200,
        sortable: true,
        resizable: true,
        filter: true,
        filterParams: {
          applyButton: true,
          clearButton: true
        }
      },
      {
        field: 'assetStatus',
        headerName: 'Asset Status',
        width: 150,
        minWidth: 50,
        maxWidth: 200,
        sortable: true,
        resizable: true,
        filter: 'agNumberColumnFilter',
        filterParams: {
          applyButton: true,
          clearButton: true
        }
      },
      {
        field: 'vin',
        headerName: 'VIN',
        width: 150,
        minWidth: 50,
        maxWidth: 200,
        sortable: true,
        resizable: true,
        filter: true,
        filterParams: {
          applyButton: true,
          clearButton: true
        }
      },
      {
        field: 'installationDate',
        headerName: 'Installation Date',
        width: 150,
        minWidth: 50,
        maxWidth: 200,
        sortable: true,
        filter: 'agDateColumnFilter',
        filterParams: {
          applyButton: true,
          clearButton: true
        },
        resizable: true
      },
      {
        field: 'garage',
        headerName: 'Garage',
        width: 150,
        minWidth: 50,
        maxWidth: 200,
        sortable: true,
        filter: 'agTextColumnFilter',
        filterParams: {
          applyButton: true,
          clearButton: true
        },
        resizable: true
      },
      {
        field: 'busNumber',
        headerName: 'Bus Number',
        width: 150,
        minWidth: 50,
        maxWidth: 200,
        sortable: true,
        resizable: true,
        filter: true,
        filterParams: {
          applyButton: true,
          clearButton: true
        }
      },
      {
        field: 'licensePlate',
        headerName: 'License Plate',
        width: 150,
        minWidth: 50,
        maxWidth: 200,
        sortable: true,
        resizable: true,
        filter: true,
        filterParams: {
          applyButton: true,
          clearButton: true
        }
      },
      {
        field: 'vehicleType',
        headerName: 'Vehicle Type',
        width: 150,
        minWidth: 50,
        maxWidth: 200,
        sortable: true,
        resizable: true,
        filter: true,
        filterParams: {
          applyButton: true,
          clearButton: true
        }
      }
    ];
  }

  ngOnInit() {
    this.inventory = <Inventory[]>this.route.snapshot.data['inventory'];
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  onPageSizeChanged() {
    const value = (<HTMLInputElement>document.getElementById('page-size'))
      .value;
    // document.getElementById('page-size').value;
    this.gridApi.paginationSetPageSize(Number(value));
  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    this.selectedDataStringPresentation = selectedData
      .map(node => node.serialNumber + ' ' + node.vin)
      .join(', ');
    // alert(`Selected nodes: ${this.selectedDataStringPresentation}`);
    console.log(
      'selectedDataStringPresentation: ' + this.selectedDataStringPresentation
    );
  }

  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }

  autoSizeAll() {
    const allColumnIds = [];
    this.gridColumnApi.getAllColumns().forEach(function(column) {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds);
  }
}
