export interface Asset {
  // asset realted
  SerialNumber: string;
  AssetStatus: string;
  StoragePossession: string;

  // Vehicle Association related
  VehicleAssociationStatus: string;
  InstallationDate: string;
  AssetUseAge: number;
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

export interface AssetResolved {
  asset: Asset;
  error?: any;
}
