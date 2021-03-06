﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using GenFu;
using Microsoft.Extensions.Logging;
using PocOAMA.Models;
using System.IO;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Hosting;

namespace PocOAMA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        protected readonly ILogger<InventoryController> _logger;
        private IHostingEnvironment _env;

        public InventoryController(IHostingEnvironment env, ILogger<InventoryController> logger = null)
        {
            _env = env;

            if (null != logger)
            {
                _logger = logger;
            }
        }
        // GET: api/Inventory
        [HttpGet]
        public IEnumerable<Inventory> Get()
        {
            _logger.LogDebug($"Called GetPersons method");
            //var vehicles = A.ListOf<Vehicle>(50);

            //GenFu.GenFu.Configure<Inventory>()
            //    .Fill(asst => asst.Vehicle).WithRandom(vehicles)
            //    .Fill(x => x.AssetStatus).WithinRange(100, 110);
            int[] asstStatuses = new int[] { 100, 101, 101, 103, 104, 105, 106, 107, 108, 109, 110, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210 };
            string[] vehStatus = new string[] { "active", "inactive", "spare", "training" };
            GenFu.GenFu.Configure<Inventory>()
                .Fill(p => p.VehicleAge).WithinRange(1, 20)
                 .Fill(p => p.SBCCode).AsMusicGenreName()
                 .Fill(p => p.Notes).AsLoremIpsumSentences()
                 .Fill(p => p.VehicleAssociationStatus).WithRandom(vehStatus)
                .Fill(p => p.AssetStatus).WithRandom(asstStatuses)
                .Fill(c => c.SerialNumber).AsFirstName();
            var inventory = A.ListOf<Inventory>(1000);
            return inventory;
        }

        [HttpGet("getall")]
        public IEnumerable<Inventory> GetAll()
        {
            _logger.LogDebug($"Called GetPersons method");
            string json = string.Empty;
            string path = _env.WebRootPath + "\\MOCK_DATA.json";
            

            using (StreamReader r = new StreamReader(path))
            {
                json = r.ReadToEnd();

            }

            List<Inventory> items = JsonConvert.DeserializeObject<List<Inventory>>(json);
            return items;
        }

        [HttpGet("getbypage")]
        public IEnumerable<Inventory> GetByPage(int pagesize, int currPageNumber)
        {
            _logger.LogDebug($"Called GetPersons method");
            string json = string.Empty;

            using (StreamReader r = new StreamReader(@"D:\Lakshmi\OPT\OAMAProject\POC\PocOAMA\PocOAMA\Models\MOCK_DATA.json"))
            {
                json = r.ReadToEnd();

            }

            List<Inventory> items = JsonConvert.DeserializeObject<List<Inventory>>(json);
            return items.Skip((currPageNumber - 1) * pagesize).Take(pagesize).ToList();
        }




        // GET: api/Inventory/5
        [HttpGet("{id}", Name = "Get")]
        public AssetVM Get(string SerialNumber)
        {
            int[] asstStatuses = new int[] { 100, 101, 101, 103, 104, 105, 106, 107, 108, 109, 110, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210 };
            string[] vehStatus = new string[] { "active", "inactive", "spare", "training" };
            string[] assetPossData = new string[] { "ASSET VENDOR", "OPT", "TRAINING", "SBC", "UNKNOWN" };
            string[] softwareType = new string[] { "GE", "SE", "Pre-K/El" };
            string[] ttnmAccountNameData = new string[] { "Nav1", "Nav2" };
            string[] ttnmAccountGroupData = new string[] { "Navman1 Account", "Navman2 Account" };

            string[] vehAssocStatusData = new string[] { "Disassociated", "Unassociated" };






            GenFu.GenFu.Configure<AssetVM>()
                .Fill(p => p.TtnmAccountName).WithRandom(ttnmAccountNameData)
                .Fill(p => p.TtnmAccountGroup).WithRandom(ttnmAccountGroupData)

                .Fill(p => p.SoftwareType).WithRandom(softwareType)
                .Fill(p => p.AssetPossession).WithRandom(assetPossData)
                 .Fill(p => p.vendorCode).AsMusicGenreName()
                  .Fill(p => p.vendorName).AsMusicArtistName()
                  .Fill(p => p.parentVendorCode).AsMusicGenreName()
                  .Fill(p => p.parentVendorName).AsMusicArtistName()
                 .Fill(p => p.AssetNotes).AsLoremIpsumSentences()
                 .Fill(p => p.AssociationStatus).WithRandom(vehAssocStatusData)
                .Fill(p => p.AssetStatus).WithRandom(asstStatuses)
                .Fill(c => c.SerialNumber, c => $"hkfsk-skfjskfjsk-iufhksd-slfksdlf")
            .Fill(c => c.AssetType, c => $"GPS Device");


            var inventory = A.ListOf<AssetVM>(1);
            return inventory[0];
        }

        public class SerialNumberSearchResult
        {
            public bool Exists { get; set; }

        }

        [Route("[action]/{serial}")]
        [HttpGet]
        public JsonResult SearchSerialNumber(string serial)
        {
            SerialNumberSearchResult obj = new SerialNumberSearchResult();

            if (serial.Equals("abc123"))
            {
                obj.Exists = true;
                return new JsonResult(obj);
            }
            else
            {
                obj.Exists = false;
                return new JsonResult(obj);
            }

        }

        // POST: api/Inventory
        [Route("[action]")]
        [HttpPost]
        public IActionResult SaveNewAsset([FromBody] AssetVM value)
        {
            return Ok(value);
        }

        // PUT: api/Inventory/5
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
