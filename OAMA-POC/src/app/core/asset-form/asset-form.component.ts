import { SearchService, VinSearchResult } from "./search.service";
import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AutoCompleteModule } from "primeng/autocomplete";
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl
} from "@angular/forms";
import { AssetVM } from "src/app/inventory-dashboard/AssetVM";
import {
  debounceTime,
  map,
  distinctUntilChanged,
  switchMap
} from "rxjs/operators";
import { Observable } from "rxjs";

@Component({
  selector: "app-asset-form",
  templateUrl: "./asset-form.component.html",
  styleUrls: ["./asset-form.component.css"]
})
export class AssetFormComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService
  ) {}

  results: any[] = [];
  results2: Observable<any[]>;
  queryField: FormControl = new FormControl();
  msg;
  text: string;
  vinObj: string;
  results3: VinSearchResult[] = [];
  vins: string[] = [];

  ngOnInit() {
    this.queryField.valueChanges
      .pipe(
        debounceTime(5000),
        distinctUntilChanged(),
        switchMap(query => this.searchService.search(query))
      )
      .subscribe(result => console.log(result));

    // this.people = this.searchText.valueChanges
    //   .debounceTime(200)
    //   .filter((val: string) => (val.length > 1))
    //   .switchMap((val: string) => db.searchNodes("Person", val))
  }

  getVehicleInfo(event) {
    console.log("getting vehicle info....");
    this.searchService
      .getVehicleInfoByVIN("1BAKFCPA6EF301250")
      .subscribe(data => {
        console.log(JSON.stringify(data));
        this.vinObj = JSON.stringify(data);
        this.msg = JSON.stringify(data);
      });
  }
  clickMe() {
    console.log("getting vehicle info....");
    this.searchService
      .getVehicleInfoByVIN("1BAKFCPA6EF301250")
      .subscribe(data => {
        console.log(JSON.stringify(data));
        this.vinObj = JSON.stringify(data);
        this.msg = JSON.stringify(data);
      });
  }
  search(event) {
    this.searchService.search(event.query).subscribe(data => {
      this.results3 = data;
    });
  }
}
