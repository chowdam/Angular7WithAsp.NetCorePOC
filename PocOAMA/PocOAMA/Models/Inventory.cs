using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PocOAMA.Models
{
    public class Inventory
    {
        public string SerialNumber { get; set; }

        public string StoragePossession { get; set; }

        public int AssetStatus { get; set; }


        public int AssetUseAge { get; set; }

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

        public DateTime InstallationDate { get; set; }


        public DateTime DeinstallationDate { get; set; }

        public DateTime ReinstallationDate { get; set; }

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

        public string VIN { get; set; }
        public string LicensePlate { get; set; }
        public string BusNumber { get; set; }
        public string ModelYear { get; set; }
        public string VehicleType { get; set; }

        public string Garage { get; set; }



        public string VehicleStatus { get; set; }

        public string VehicleAge { get; set; }





        //public string VehicleOwner { get; set; }
        //public string TTNMAccount { get; set; }

        //public string TTNMGroup { get; set; }

        //public string SBCName { get; set; }

        //public string SBCCode { get; set; }


        //public string SeasonalSBCName { get; set; }
    }


}
