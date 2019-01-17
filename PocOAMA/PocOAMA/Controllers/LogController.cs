using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PocOAMA.Models;

namespace PocOAMA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogController : ControllerBase
    {
        protected readonly ILogger<LogController> _logger;
        public LogController(ILogger<LogController> logger = null)
        {
            if (null != logger)
            {
                _logger = logger;
            }
        }


        // POST: api/Log
        [HttpPost("client")]
        public IActionResult FromClient(LogEntry value)
        {
            var logValue = value;
            _logger.LogError("Logging for Angualr client loginfo in API", logValue);

            return Ok(true);
        }
    }


}