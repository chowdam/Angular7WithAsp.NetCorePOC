using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PocOAMA.Models
{
    public class User
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "userName")]
        public string Username { get; set; }

        [JsonProperty(PropertyName = "passwordHash")]
        public byte[] PasswordHash { get; set; }

        [JsonProperty(PropertyName = "passwordSalt")]
        public byte[] PasswordSalt { get; set; }

        [JsonProperty(PropertyName = "userRole")]
        public string UserRole { get; set; }

        [JsonProperty(PropertyName = "accessRole")]
        public string AccessLevel { get; set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }

    public class AppUser
    {
        public string UserName { get; set; }
        public string Token { get; set; }
        public bool IsAuthenticated { get; set; }

        public bool IsAdmin { get; set; }

        public string UserRole { get; set; }

        public string AccessLevel { get; set; }
        public bool CanAccessInventory { get; set; }
        public bool CanSaveInventory { get; set; }

        public bool CanAccessAssets { get; set; }
        public bool canSaveAssets { get; set; }

        public bool CanAccessNotifications { get; set; }
        public bool CanSaveNotifications { get; set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }


    }

    //  userName = '';
    //bearerToken = '';
    //isAuthenticated = false;
    //claims: AppUserClaim[] = [];
    public class AppUserAuth
    {
        public string UserName { get; set; }
        public string BearerToken { get; set; }
        public bool IsAuthenticated { get; set; }



        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }


    }

    //claimId = '';
    //  userId = '';
    //claimType = '';
    //claimValue = '';


    public class AuthUser
    {
        public string FullName { get; set; }
        public string Token { get; set; }
        public bool IsAuthenticated { get; set; }

        public string UserRole { get; set; }

        public string AccessLevel { get; set; }

        public string ExtraInfo { get; set; }
        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }


    }

}
