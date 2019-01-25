import { Subscription } from "rxjs";

import { Inventory, AssetVM } from "./../inventory";
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

@Component({
  selector: "app-asset-detail",
  templateUrl: "./asset-detail.component.html",
  styleUrls: ["./asset-detail.component.css"]
})
export class AssetDetailComponent implements OnInit, AfterViewInit {
  serialNumber = "";
  assetEditForm: FormGroup;
  pageTitle = "Edit Asset";
  productForm: FormGroup;

  assetData: AssetVM;

  ttnmAccountData = [
    { label: "Navman1 Account", value: "Navman1 Account" },
    { label: "Navman2 Account", value: "Navman2 Account" }
  ];
  selectedTtnmAccount = "";
  ttnmGroupData = [
    { label: "Navman1 Group", value: "Navman1 Group" },
    { label: "Navman2 Group", value: "Navman2 Group" }
  ];
  selectedTtnmGroup = "";
  assetPossesionData = [
    { label: "ASSET VENDOR", value: "ASSET VENDOR" },
    { label: "OPT", value: "OPT" },
    { label: "SBC", value: "SBC" },
    { label: "TRAINING", value: "TRAINING" },
    { label: "UNKNOWN", value: "UNKNOWN" }
  ];

  selectedAssetPossesion = "";

  vehicleAssociationStatusData = [
    { label: "Associated", value: "Associated" },
    { label: "Unassociated", value: "Unassociated" },
    { label: "Disassociated", value: "Disassociated" }
  ];

  selectedVehicleAssociationStatus = "";

  softwareTypeData = [
    { label: "GE", value: "GE" },
    { label: "SE", value: "SE" },
    { label: "Pre-K/EI", value: "Pre-K/EI" }
  ];

  selectedSoftwareType = "";

  currentDate = new Date();
  minDate = new Date("June 01 2015");
  minDateValue = this.minDate.getDate();
  maxDateValue = this.currentDate.getDate();

  assetStatusData = ["Current", "Retired"];
  selectedAssetStatus = 0;

  currentAssetStatusCodes = [
    100,
    113,
    114,
    116,
    117,
    201,
    202,
    101,
    120,
    121,
    122
  ];
  retiredAssetStatusCodes = [200, 115, 210, 211, 220, 221, 212, 213, 222, 299];
  associatedAssetStatusCodes = [100, 113, 114, 116, 117, 201, 202];
  disAssociatedAssetStatusCodes = [
    200,
    115,
    210,
    211,
    220,
    221,
    212,
    213,
    222,
    299
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.InitializeAssetEditForm();
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get("id");
    console.log("url param:" + param);
    if (param) {
      console.log("asset details for serialNumber: " + param);
      this.serialNumber = param;
    }
    // load data from service
    this.assetData = <AssetVM>this.route.snapshot.data["asset"];
  }
  ngAfterViewInit() {
    console.log(
      "Asset data after view init: " + JSON.stringify(this.assetData)
    );

    this.displayProduct(this.assetData);
  }

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
      acquiredDate: [new Date(), [Validators.required]],
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

  // createFormGroupWithBuilderAndModel(formBuilder: FormBuilder, asset: AssetVM) {
  //   return formBuilder.group({
  //     assetData: formBuilder.group(asset)
  //   });
  // }

  displayProduct(assetVM: AssetVM): void {
    if (this.assetEditForm) {
      this.assetEditForm.reset();
    }

    if (assetVM.serialNumber === "") {
      this.pageTitle = "Add Product";
    } else {
      this.pageTitle = `Edit Product: ${this.asset.serialNumber}`;
    }

    console.log("displayProduct asset" + JSON.stringify(assetVM));
    // Update the data on the form
    this.assetEditForm.patchValue({
      serialNumber: assetVM.serialNumber,
      assetAge: assetVM.assetAge,
      assetUseTime: assetVM.assetUseTime,
      acquiredDate: assetVM.acquiredDate,
      retiredDate: assetVM.retiredDate,
      assetNotes: assetVM.assetNotes,
      associationStartDate: assetVM.associationStartDate,
      associationEndDate: assetVM.associationEndDate,
      vin: assetVM.vin,
      modelYear: assetVM.modelYear,
      vehicleAge: assetVM.vehicleAge,
      vehicleType: assetVM.vehicleType,
      vehicleStatus: assetVM.vehicleStatus,
      busNumber: assetVM.busNumber,
      licensePlate: assetVM.licensePlate,
      garage: assetVM.garage,
      sbcCode: assetVM.sbcCode,
      sbcName: assetVM.sbcName,
      vehicleOwner: assetVM.vehicleOwner
    });

    // this.assetEditForm.controls["ttnmAccount"].setValue(
    //   this.asset.ttnmAccount,
    //   { onlySelf: true }
    // );
    // this.assetEditForm.controls["ttnmGroup"].setValue(this.asset.ttnmGroup, {
    //   onlySelf: true
    // });
    // this.assetEditForm.controls["assetStatus"].setValue(
    //   this.asset.assetStatus,
    //   { onlySelf: true }
    // );
    // this.assetEditForm.controls["assetPossession"].setValue(
    //   this.asset.assetPossession,
    //   { onlySelf: true }
    // );
    // this.assetEditForm.controls["softwareType"].setValue(
    //   this.asset.softwareType,
    //   { onlySelf: true }
    // );
    // this.assetEditForm.controls["associationStatus"].setValue(
    //   this.asset.associationStatus,
    //   { onlySelf: true }
    // );

    this.assetEditForm.updateValueAndValidity();
  }

  ttnmAccountChnaged(event): void {
    console.log("ttnmAccountChnaged: ");
    console.log(event);

    const ttnmAccountControl = this.assetEditForm.get("ttnmAccount");
    ttnmAccountControl.value = event.value;
    ttnmAccountControl.updateValueAndValidity();

    console.log("value changed: " + ttnmAccountControl.value);
  }
  saveAsset(): void {
    console.log(this.assetEditForm);
    console.log("saved: " + JSON.stringify(this.assetEditForm));
  }

  reset(): void {
    this.assetEditForm.reset();
  }

  cancel(): void {
    this.router.navigate(["/primeng"]);
  }
}
