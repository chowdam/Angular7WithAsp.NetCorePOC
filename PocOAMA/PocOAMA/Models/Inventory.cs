using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PocOAMA.Models
{


    public class Inventory
    {
        public string SerialNumber { get; set; }

        public string AssetPossession { get; set; }

        public int AssetStatus { get; set; }


        public int AssetAge { get; set; }
        public int AssetUseTime { get; set; }

        public string Notes { get; set; }


        // Vehicle  related
        //public Vehicle Vehicle { get; set; } = new Vehicle();
        /// vehicle related properties

        public string VIN { get; set; }

        public string TTNMAccount { get; set; }

        public string TTNMGroup { get; set; }

        public string VehicleStatus { get; set; }

        public string BusNumber { get; set; }

        public string LicensePlate { get; set; }

        public string VehicleType { get; set; }

        public string ModelYear { get; set; }

        public int VehicleAge { get; set; }

        public string SBCName { get; set; }

        public string SBCCode { get; set; }

        public string VehicleOwner { get; set; }

        public string Garage { get; set; }

        public string SeasonalSBCName { get; set; }


        // Vehicle Association related


        public string VehicleAssociationStatus { get; set; }

        public DateTime DateAcquired { get; set; }
        public DateTime DateRetired { get; set; }


        public DateTime AssociationStartDate { get; set; }

        public DateTime AssociationEndDate { get; set; }

        public DateTime BillingStartDate { get; set; }

        public DateTime BillingEndDate { get; set; }







    }



    public class InventoryDto
    {
        public int Id { get; set; }
        public string SerialNumber { get; set; }

        public string DocumentStatus { get; set; }

        public DateTime AssetCreationDate { get; set; }









    }
    public class AssetStatus
    {

        public int AssetStatusCode { get; set; }

        public string AssetStatusDescription { get; set; }
    }

    public class AssetType
    {

        public int AssetTypeCode { get; set; }

        public string AssetTypeDescription { get; set; }
    }


    public class AssetVendor
    {
        public string VendorCode { get; set; }
        public string VendorName { get; set; }

        public string VendorGroup { get; set; }
    }
    public class Possesssion
    {
        public string PosessionStatus { get; set; }
        public string PossesionDescription { get; set; }

        public DateTime PossessionStartDate { get; set; }

        public DateTime PossessionEndDate { get; set; }

    }
    public class Vehicle
    {


        /// vehicle related properties
        //vin: string;
        //  modelYear: string;
        //  vehicleAge: string;
        //  vehicleType: string;
        //  vehicleStatus: string;
        //  busNumber: string;
        //  licensePlate: string;
        //  garage: string;
        //  vendorCode: string;
        //  vendorName: string;
        //  parentVendorCode: string;
        //  parentVendorName: string;
        //  vehicleOwner: string;
        public string Vin { get; set; }
        public string ModelYear { get; set; }
        public string VehicleAge { get; set; }
        public string VehicleType { get; set; }

        public string VehicleStatus { get; set; }



        public string BusNumber { get; set; }

        public string LicensePlate { get; set; }

        public string Garage { get; set; }



        public string VendorCode { get; set; }

        public string VendorName { get; set; }
        public string ParentVendorCode { get; set; }

        public string ParentVendorName { get; set; }






        public string VehicleOwner { get; set; }

        //public string TTNMAccount { get; set; }

        //public string TTNMGroup { get; set; }

        //public string SBCName { get; set; }

        //public string SBCCode { get; set; }


        //public string SeasonalSBCName { get; set; }
    }


    public class AssetVM
    {
        public string AssetType { get; set; }
        public string SerialNumber { get; set; }
        public string TtnmAccountName { get; set; }

        public string TtnmAccountGroup { get; set; }



        public string SoftwareType { get; set; }
        public int AssetAge { get; set; }
        public int AssetUseTime { get; set; }


        public DateTime AcquiredDate { get; set; }
        public DateTime? RetiredDate { get; set; }

        public string AssetNotes { get; set; }




        public int AssetStatus { get; set; }

        public string AssetPossession { get; set; }




        // Vehicle Association related

        public string AssociationStatus { get; set; }

        public DateTime? AssociationStartDate { get; set; }

        public DateTime? AssociationEndDate { get; set; }




        // Vehicle  related
        //public Vehicle Vehicle { get; set; } = new Vehicle();
        /// vehicle related properties

        public string VIN { get; set; }


        public string ModelYear { get; set; }

        public string VehicleAge { get; set; }
        public string VehicleType { get; set; }



        public string BusNumber { get; set; }

        public string LicensePlate { get; set; }

        public string Garage { get; set; }


        public string VehicleStatus { get; set; }
        public string VehicleOwner { get; set; }
        public string vendorCode { get; set; }

        public string vendorName { get; set; }

        public string parentVendorCode { get; set; }

        public string parentVendorName { get; set; }




    }


    public class AssetInventoryClientModel
    {
        [Required]
        public string AssetTypeCode { get; set; }
        [Required]
        public string AssetTypeValue { get; set; }
        [Required]
        public string SerialNumber { get; set; }
        [Required]
        public string TtnmAccount { get; set; }

        public string TtnmGroup { get; set; }
        [Required]
        public string SoftwareType { get; set; }
        [Required]
        public int AssetAge { get; set; }
        [Required]
        public int AssetUseTime { get; set; }
        [Required]
        public DateTime AcquiredDate { get; set; }

        public DateTime? RetiredDate { get; set; }
        [Required]
        public string AssetStatusCode { get; set; }

        public string AssetStatusValue { get; set; }
        [Required]
        public string AssetPossessionCode { get; set; }

        public string AssetPossessionValue { get; set; }
        [Required]
        public string AssociationStatus { get; set; }
        public DateTime? AssociationStartDate { get; set; }
        public DateTime? AssociationEndDate { get; set; }

        public string AssetNotes { get; set; }

        public string vin { get; set; }

        public string ModelYear { get; set; }

        public string VehicleAge { get; set; }

        public string VehicleType { get; set; }

        public string VehicleStatus { get; set; }

        public string BusNumber { get; set; }

        public string LicensePlate { get; set; }

        public string Garage { get; set; }

        public string VendorCode { get; set; }

        public string VendorName { get; set; }

        public string ParentVendorCode { get; set; }

        public string ParentVendorName { get; set; }

        public string vehicleOwner { get; set; }
    }


}
