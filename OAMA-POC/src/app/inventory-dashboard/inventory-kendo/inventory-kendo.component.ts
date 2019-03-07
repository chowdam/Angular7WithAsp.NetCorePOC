import {
  Component,
  OnInit,
  AfterViewInit,
  NgZone,
  ViewChild
} from "@angular/core";
import { Inventory } from "../inventory";
import { InventoryService } from "../inventory.service";
import { ActivatedRoute, Router } from "@angular/router";

import {
  State,
  process,
  SortDescriptor,
  orderBy
} from "@progress/kendo-data-query";
import {
  GridComponent,
  GridDataResult,
  PageChangeEvent,
  DataStateChangeEvent,
  SelectableSettings,
  RowArgs
} from "@progress/kendo-angular-grid";
import { take } from "rxjs/operators";
import { ExcelExportData } from "@progress/kendo-angular-excel-export";
import { exportPDF, Group } from "@progress/kendo-drawing";
import { saveAs } from "@progress/kendo-file-saver";

@Component({
  selector: "app-inventory-kendo",
  templateUrl: "./inventory-kendo.component.html",
  styleUrls: ["./inventory-kendo.component.css"]
})
export class InventoryKendoComponent implements OnInit, AfterViewInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private inventoryService: InventoryService,
    private ngZone: NgZone
  ) {}
  @ViewChild(GridComponent)
  public grid: GridComponent;

  inventoryData: Inventory[] = [];
  public gridView: GridDataResult;

  public pageSize = 20;
  public skip = 0;
  public buttonCount = 5;
  public info = true;
  public type: "numeric" | "input" = "numeric";
  public pageSizes = [5, 10, 20, 50, 100, 200, 500];
  public previousNext = true;

  public myFileTitle = "Inventory_" + new Date().toDateString();
  public myFileName = "Inventory_" + new Date().toDateString() + ".xlsx";
  public myFileNamePdf = "Inventory_" + new Date().toDateString() + ".pdf";

  private data: Object[];
  public selectableSettings: SelectableSettings;
  // public mySelection: number[] = [];
  public mySelection: string[] = [];
  public sort: SortDescriptor[] = [
    {
      field: "serialNumber",
      dir: "asc"
    }
  ];

  public state: State = {
    skip: this.skip,
    take: this.pageSize,

    // Initial filter descriptor
    filter: {
      logic: "and",
      filters: [{ field: "serialNumber", operator: "contains", value: "" }]
    }
  };
  public mySelectionKey(context: RowArgs): string {
    // console.log("selected context:");
    // console.log(JSON.stringify(context));
    // return context.dataItem.serialNumber + " " + context.index;
    return context.dataItem;
  }

  ngOnInit() {
    this.inventoryData = <Inventory[]>this.route.snapshot.data["inventory"];
    this.loadItems();
    this.setSelectableSettings();
    this.allData = this.allData.bind(this);
    console.log(JSON.stringify(this.inventoryData[1]));
  }

  ngAfterViewInit(): void {
    this.fitColumns();
  }
  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.pageSize = event.take;
    this.loadItems();
  }
  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.loadItems();
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.fitColumns();
    this.state = state;
    this.gridView = process(this.inventoryData, this.state);
  }

  private fitColumns(): void {
    this.ngZone.onStable
      .asObservable()
      .pipe(take(1))
      .subscribe(() => {
        this.grid.autoFitColumns();
      });
  }

  public setSelectableSettings(): void {
    this.selectableSettings = {
      checkboxOnly: false,
      mode: "multiple"
    };
  }

  private loadItems(): void {
    this.gridView = {
      data: orderBy(
        this.inventoryData.slice(this.skip, this.skip + this.pageSize),
        this.sort
      ),
      total: this.inventoryData.length
    };
    // console.log("this.gridView data:");
    // console.log(JSON.stringify(this.gridView));
  }

  public editHandler({ sender, rowIndex, dataItem }) {
    const myurl = "/asset/" + dataItem.serialNumber;
    this.router.navigateByUrl(myurl);
  }

  public allData(): ExcelExportData {
    let selInventory: Inventory[] = [];
    let result: ExcelExportData;

    selInventory = JSON.parse(JSON.stringify(this.mySelection));

    // const result: ExcelExportData = {
    //   data: process(this.inventoryData, {
    //     sort: [{ field: "serialNumber", dir: "asc" }]
    //   }).data
    // };

    if (selInventory.length > 0) {
      result = {
        data: process(selInventory, {
          sort: [{ field: "serialNumber", dir: "asc" }]
        }).data
      };
    } else {
      result = {
        data: process(this.inventoryData, {
          sort: [{ field: "serialNumber", dir: "asc" }]
        }).data
      };
    }

    return result;
  }
  public exportToPDF(grid: GridComponent): void {
    console.log("selected Rows:");
    console.log(JSON.stringify(this.mySelection));
    grid.saveAsPDF();
  }

  public exportToExcel(grid: GridComponent): void {
    console.log("selected Rows:");
    console.log(JSON.stringify(this.mySelection));
    let selInventory: Inventory[] = [];
    selInventory = JSON.parse(JSON.stringify(this.mySelection));
    grid.saveAsExcel();
  }
}
