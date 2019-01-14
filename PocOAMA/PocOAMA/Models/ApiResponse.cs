using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PocOAMA.Models
{
    public class ApiResponse
    {
        public dynamic Resposne { get; set; }

        public Error Error { get; set; }
    }

    public class Error
    {
        public string Message { get; set; }

        public string StackTrace { get; set; }
    }
}
