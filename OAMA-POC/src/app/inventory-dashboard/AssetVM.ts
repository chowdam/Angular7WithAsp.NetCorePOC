export class AssetVM {
  serialNumber: string;
  ttnmAccount: string;
  ttnmGroup: string;
  softwareType: string;
  assetAge: number;
  assetUseTime: number;
  acquiredDate: Date;
  retiredDate: Date;
  assetNotes: string;

  assetStatus: string;
  assetPossession: string;
  associationStatus: string;
  associationStartDate: Date;
  associationEndDate: Date;

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

export interface AssetVMResolved {
  assetmodel: AssetVM;
  error?: any;
}

export const ttnmAccountData = [
  { code: "Navman1 Account", description: "Navman1 Account" },
  { code: "Navman2 Account", description: "Navman2 Account" }
];

export const ttnmGroupData = [
  { code: "Navman1 Group", description: "Navman1 Group" },
  { code: "Navman2 Group", description: "Navman2 Group" }
];

export const assetPossesionData = [
  { code: "ASSET VENDOR", description: "ASSET VENDOR" },
  { code: "OPT", description: "OPT" },
  { code: "SBC", description: "SBC" },
  { code: "TRAINING", description: "TRAINING" },
  { code: "UNKNOWN", description: "UNKNOWN" }
];

export const vehicleAssociationStatusData = [
  { code: "Associated", description: "Associated" },
  { code: "Unassociated", description: "Unassociated" },
  { code: "Disassociated", description: "Disassociated" }
];

export const softwareTypeData = [
  { code: "GE", description: "GE" },
  { code: "SE", description: "SE" },
  { code: "Pre-K/EI", description: "Pre-K/EI" }
];

export const assetStatusData = ["Current", "Retired"];

export const currentAssetStatusCodes = [
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
export const retiredAssetStatusCodes = [
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

export const associatedAssetStatusCodes = [100, 113, 114, 116, 117, 201, 202];
export const disAssociatedAssetStatusCodes = [
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
