using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using GenFu;
using Microsoft.Extensions.Logging;
using PocOAMA.Models;
using System.IO;
using Newtonsoft.Json;

namespace PocOAMA.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class VehicleController : ControllerBase
    {
        // GET: api/Vehicle
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }



        public class VinSearchResult
        {
            public string Vin { get; set; }

        }



        // GET: api/Vehicle/5
        [HttpGet]
        [Route("[action]/{id}")]
        [ActionName("Search")]
        public JsonResult Search(string id)
        {

            VinSearchResult res = new VinSearchResult();
            string vin = id.ToLower();

            string json = string.Empty;

            using (StreamReader r = new StreamReader(@"~\Models\VIN_MOCK_DATA.json"))
            {
                json = r.ReadToEnd();

            }

            List<VinSearchResult> data = JsonConvert.DeserializeObject<List<VinSearchResult>>(json);
            var items = (from x in data
                         select x.Vin).ToList();

            if (id.Equals("novin"))
            {
                return new JsonResult(items.ToList());
            }

            int len = vin.Length;

            var isExists = items.Any(x => x.ToLower().StartsWith(vin));

            //var isExists2 = items.Any(x => x.Vin.ToLower().Substring(0, len) == vin);

            //var resStartsWith1 = items.Where(x => x.Vin.ToLower().StartsWith(vin)).ToList();

            //var resContains = items.Where(x => x.Vin.ToLower().Contains(vin)).ToList();

            //var resContains2 = items.Where(x => x.Vin.ToLower().Contains(vin, StringComparison.OrdinalIgnoreCase)).ToList();

            if (isExists)
                return new JsonResult(items.Where(x => x.ToLower().StartsWith(vin)).ToList());
            else
                return new JsonResult(items.Where(x => x.ToLower().Contains(vin, StringComparison.OrdinalIgnoreCase)).ToList());


            //if (items.Any(x => x.Vin.ToLower().Substring(0, len) == vin))
            //    return new JsonResult(items.Any(x => x.Vin.ToLower().Substring(0, len) == vin));
            //else
            //    return new JsonResult(items.Where(x => x.Vin.ToLower().Contains(vin, StringComparison.OrdinalIgnoreCase)).ToList());
        }


        //[HttpGet("{vin}")]
        //[ActionName("GetVehcileInfoByVin")]

        [Route("[action]/{vin}")]
        [HttpGet]

        public Vehicle GetVehcileInfoByVin(string vin)
        {
            if (vin.Equals("lakshmi123"))
            {
                return new Vehicle();
            }

            int[] asstStatuses = new int[] { 100, 101, 101, 103, 104, 105, 106, 107, 108, 109, 110, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210 };
            string[] vehStatus = new string[] { "active", "inactive", "spare", "training" };
            string[] modelYearData = new string[] { "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019" };
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

            GenFu.GenFu.Configure<Vehicle>()
                .Fill(c => c.Vin, c => vin);


            //A.Configure<Vehicle>()
            //    .Fill(c => c.VehicleAge).WithinRange(1, 20);
            //.Fill(c => c.VendorCode).AsMusicGenreName()
            //    .Fill(c => c.VendorName).AsMusicArtistName()
            //    .Fill(c => c.ParentVendorCode).AsMusicGenreName()
            //    .Fill(c => c.ParentVendorName).AsMusicArtistName()



            var vehicles = A.ListOf<Vehicle>(1);
            return vehicles[0];
        }
        // POST: api/Vehicle
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Vehicle/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
