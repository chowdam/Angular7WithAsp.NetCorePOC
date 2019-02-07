export interface Inventory {
  // asset related
  SerialNumber: string;
  AssetStatus: string;
  StoragePossession: string;

  // Vehicle Association related
  VehicleAssociationStatus: string;
  InstallationDate: string;
  AssetUseAge: string;
  DeinstallationDate: string;
  ReinstallationDate: string;
  BillingStartDate: string;
  BillingEndDate: string;

  // vehicle related properties
  VIN: string;
  TTNMAccount: string;
  TTNMGroup: string;
  VehicleStatus: string;
  BusNumber: string;
  LicensePlate: string;
  VehicleType: string;
  ModelYear: string;
  VehicleAge: string;
  SBCName: string;
  SBCCode: string;
  VehicleOwner: string;
  Garage: string;
  SeasonalSBCName: string;

  // asset related
  Notes: string;
}

export interface InventoryResolved {
  inventory: Inventory[];
  error?: any;
}

export class Vehicle {
  vin: string;
  modelYear: string;
  vehicleAge: string;
  vehicleType: string;
  vehicleStatus: string;
  busNumber: string;
  licensePlate: string;
  garage: string;
  sbcCode: string;
  sbcName: string;
  vehicleOwner: string;
}
