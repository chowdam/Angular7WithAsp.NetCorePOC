using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using GenFu;

namespace PocOAMA.Controllers
{

    [ApiController]
    //[Authorize]
    public class PersonController : ControllerBase
    {
        protected readonly ILogger<PersonController> _logger;

        public PersonController(ILogger<PersonController> logger = null)
        {
            if (null != logger)
            {
                _logger = logger;
            }
        }


        [HttpGet]
        [Route("api/person/getall")]
        [AllowAnonymous]
        public ActionResult<IEnumerable<Person>> GetPersons()
        {
            _logger.LogDebug($"Called GetPersons method");
            var persons = A.ListOf<Person>(25);
            return persons;
        }
        public class Person
        {
            public int Id { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public int Age { get; set; }
            public string EmailAddress { get; set; }
            public string Address { get; set; }
            public string City { get; set; }
            public string Phone { get; set; }
        }

    }
}