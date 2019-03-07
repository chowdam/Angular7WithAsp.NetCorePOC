import {
  AssetVMResolved,
  ttnmAccountData,
  ttnmGroupData,
  assetPossesionData,
  vehicleAssociationStatusData,
  softwareTypeData,
  assetStatusData,
  currentAssetStatusCodes,
  retiredAssetStatusCodes
} from "./../AssetVM";
import { Subscription } from "rxjs";

import { Inventory } from "./../inventory";
import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";

import { InputTextModule } from "primeng/inputtext";
import { RadioButtonModule } from "primeng/radiobutton";
import { DropdownModule } from "primeng/dropdown";
import { KeyFilterModule } from "primeng/keyfilter";
import { CalendarModule } from "primeng/calendar";
import { AssetVM } from "../AssetVM";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-asset-detail",
  templateUrl: "./asset-detail.component.html",
  styleUrls: ["./asset-detail.component.css"]
})
export class AssetDetailComponent implements OnInit, AfterViewInit {
  serialNumber = "";
  assetEditForm: FormGroup;
  pageTitle = "Edit Asset";
  assetData: AssetVM = new AssetVM();
  selectedAssetStatus;
  selectedAssetPossesion;

  ttnmAccountValues = ttnmAccountData;
  ttnmGroupValues = ttnmGroupData;
  assetPossesionValues = assetPossesionData;
  vehicleAssociationStatusValues = vehicleAssociationStatusData;
  softwareTypeValues = softwareTypeData;
  assetStatusValues = assetStatusData;
  currentAssetStatusCodesValues = currentAssetStatusCodes;
  retiredAssetStatusCodesValues = retiredAssetStatusCodes;

  currentDate = new Date();
  minDate = new Date("June 01 2015");
  minDateValue = this.minDate.getDate();
  maxDateValue = this.currentDate.getDate();
  selDate: Date;
  aqrdDate;
  rtrdDate;
  assocStartDate;
  assocEndDate;

  // date: NgbDateStruct = { year: 2015, month: 6, day: 1 };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.InitializeAssetEditForm();
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get("id");
    const data = <AssetVMResolved>this.route.snapshot.data["assetmodel"];
    this.assetData = <AssetVM>data.assetmodel;

    console.log("asset data from resolver: ");
    console.log(JSON.stringify(this.assetData));

    this.displayProduct();
  }

  ngAfterViewInit() {}

  InitializeAssetEditForm(): any {
    this.assetEditForm = this.fb.group({
      serialNumber: ["", [Validators.required]],
      ttnmAccount: [null, [Validators.required]],
      ttnmGroup: [null, [Validators.required]],
      assetStatus: [null, [Validators.required]],
      assetPossession: [null, [Validators.required]],
      softwareType: [null, [Validators.required]],
      assetAge: [0, [Validators.required]],
      assetUseTime: [0, [Validators.required]],
      acquiredDate: [null, [Validators.required]],
      retiredDate: [new Date(), [Validators.required]],
      assetNotes: ["Notes...", [Validators.required]],
      associationStatus: ["n/a", [Validators.required]],
      associationStartDate: [new Date(), [Validators.required]],
      associationEndDate: [new Date(), [Validators.required]],

      vin: [{ value: "", disabled: true }],
      modelYear: [{ value: "", disabled: true }],
      vehicleAge: [{ value: "", disabled: true }],
      vehicleType: [{ value: "", disabled: true }],
      vehicleStatus: [{ value: "", disabled: true }],
      busNumber: [{ value: "", disabled: true }],
      licensePlate: [{ value: "", disabled: true }],
      garage: [{ value: "", disabled: true }],
      sbcCode: [{ value: "", disabled: true }],
      sbcName: [{ value: "", disabled: true }],
      vehicleOwner: [{ value: "", disabled: true }]
    });
  }

  displayProduct(): void {
    // if (this.assetEditForm) {
    //   this.assetEditForm.reset();
    // }

    if (this.assetData.serialNumber === "") {
      this.pageTitle = "Add Product";
    } else {
      this.pageTitle = `Edit Product: ${this.assetData.serialNumber + ""}`;
    }

    console.log("displayProduct asset" + JSON.stringify(this.assetData));

    // Update the data on the form
    this.assetEditForm.patchValue({
      serialNumber: this.assetData.serialNumber,
      assetAge: this.assetData.assetAge,
      assetUseTime: this.assetData.assetUseTime,
      assetNotes: this.assetData.assetNotes,
      vin: this.assetData.vin,
      modelYear: this.assetData.modelYear,
      vehicleAge: this.assetData.vehicleAge,
      vehicleType: this.assetData.vehicleType,
      vehicleStatus: this.assetData.vehicleStatus,
      busNumber: this.assetData.busNumber,
      licensePlate: this.assetData.licensePlate,
      garage: this.assetData.garage,
      sbcCode: this.assetData.sbcCode,
      sbcName: this.assetData.sbcName,
      vehicleOwner: this.assetData.vehicleOwner
    });

    this.assetEditForm.controls["acquiredDate"].setValue(
      this.formatDate(this.assetData.acquiredDate),
      {
        onlySelf: true
      }
    );
    this.assetEditForm.controls["retiredDate"].setValue(
      this.formatDate(this.assetData.retiredDate),
      {
        onlySelf: true
      }
    );

    this.assetEditForm.controls["associationStartDate"].setValue(
      this.formatDate(this.assetData.associationStartDate),
      {
        onlySelf: true
      }
    );
    this.assetEditForm.controls["associationEndDate"].setValue(
      this.formatDate(this.assetData.associationEndDate),
      {
        onlySelf: true
      }
    );

    this.assetEditForm.controls["ttnmAccount"].setValue(
      this.assetData.ttnmAccount,
      { onlySelf: true }
    );
    this.assetEditForm.controls["ttnmGroup"].setValue(
      this.assetData.ttnmGroup,
      {
        onlySelf: true
      }
    );
    this.assetEditForm.controls["assetStatus"].setValue(
      this.assetData.assetStatus,
      { onlySelf: true }
    );
    this.assetEditForm.controls["assetPossession"].setValue(
      this.assetData.assetPossession,
      { onlySelf: true }
    );
    this.assetEditForm.controls["softwareType"].setValue(
      this.assetData.softwareType,
      { onlySelf: true }
    );
    this.assetEditForm.controls["associationStatus"].setValue(
      this.assetData.associationStatus,
      { onlySelf: true }
    );

    this.assetEditForm.updateValueAndValidity();
  }

  validateAacquiredDate() {
    // console.log("Selected Aquired date:" + this.aqrdDate);

    this.assetEditForm.controls["acquiredDate"].setValue(
      this.formatDate(this.aqrdDate),
      {
        onlySelf: true
      }
    );
    this.assetEditForm.controls["acquiredDate"].clearValidators();
    this.assetEditForm.controls["acquiredDate"].updateValueAndValidity();
  }

  validateRetiredDate() {
    // console.log("Selected Retired date:" + this.rtrdDate);

    this.assetEditForm.controls["retiredDate"].setValue(
      this.formatDate(this.rtrdDate),
      {
        onlySelf: true
      }
    );
    this.assetEditForm.controls["retiredDate"].clearValidators();
    this.assetEditForm.controls["retiredDate"].updateValueAndValidity();
  }

  validatAssociationStartDate() {
    // console.log("Selected Aquired date:" + this.assocStartDate);

    this.assetEditForm.controls["acquiredDate"].setValue(
      this.formatDate(this.assocStartDate),
      {
        onlySelf: true
      }
    );
    this.assetEditForm.controls["associationStartDate"].clearValidators();
    this.assetEditForm.controls[
      "associationStartDate"
    ].updateValueAndValidity();
  }

  validatAssociationEndDate() {
    // console.log("Selected Aquired date:" + this.assocEndDate);

    this.assetEditForm.controls["associationEndDate"].setValue(
      this.formatDate(this.assocEndDate),
      {
        onlySelf: true
      }
    );
    this.assetEditForm.controls["associationEndDate"].clearValidators();
    this.assetEditForm.controls["associationEndDate"].updateValueAndValidity();
  }

  formatDate(todate: any) {
    const dt = new Date(todate);
    let dd = dt.getDate().toString();
    let mm = (dt.getMonth() + 1).toString(); // January is 0!
    const yyyy = dt.getFullYear();

    if (dt.getDate() < 10) {
      dd = "0" + dd;
    }
    if (dt.getMonth() + 1 < 10) {
      mm = "0" + mm;
    }
    const input = mm + "/" + dd + "/" + yyyy;
    // const parts = input.match(/(\d+)/g);
    // // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
    // return new Date(parts[0], parts[1] - 1, parts[2]);
    return input;
  }
  // ttnmAccountChnaged(event): void {
  //   console.log("ttnmAccountChnaged: ");
  //   console.log(event);

  //   this.assetEditForm.controls["ttnmAccount"].setValue(event.value, {
  //     onlySelf: true
  //   });
  //   this.assetEditForm.controls["ttnmAccount"].clearValidators();
  //   this.assetEditForm.controls["ttnmAccount"].updateValueAndValidity();
  // }

  saveAsset(): void {
    // console.log(this.assetEditForm.value);
    console.log("saved: " + JSON.stringify(this.assetEditForm));
  }

  reset(): void {
    this.assetEditForm.reset();
  }

  cancel(): void {
    this.router.navigate(["/primeng"]);
  }
}
