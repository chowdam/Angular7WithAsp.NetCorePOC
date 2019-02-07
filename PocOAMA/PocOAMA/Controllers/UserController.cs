using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using PocOAMA.Dtos;
using PocOAMA.Models;
using PocOAMA.Repositories;

namespace PocOAMA.Controllers
{


    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        protected readonly ILogger<UserController> _logger;
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;


        public UserController(IAuthRepository repo, IConfiguration config, ILogger<UserController> logger = null)
        {
            _config = config;
            _repo = repo;

            if (null != logger)
            {
                _logger = logger;
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            _logger.LogDebug($"User Register Method called");

            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();

            if (await _repo.UserExists(userForRegisterDto.Username))
                return BadRequest("Username already exists");

            var userToCreate = new User
            {
                Username = userForRegisterDto.Username,
                UserRole = userForRegisterDto.UserRole,
                AccessLevel = userForRegisterDto.AccessLevel
            };

            var createdUser = await _repo.Register(userToCreate, userForRegisterDto.Password);


            _logger.LogDebug($"User Register Method complete");

            return StatusCode(201);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            var userFromRepo = await _repo.Login(userForLoginDto.Username, userForLoginDto.Password);

            if (userFromRepo == null)
                return Unauthorized();


            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.Username),
                new Claim(ClaimTypes.Role, userFromRepo.UserRole),
                new Claim("AccessLevel", userFromRepo.AccessLevel)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var now = DateTime.UtcNow;
            // var requestAt = DateTime.Now;
            // var expiresIn = requestAt.Add(TimeSpan.FromMinutes(30));


            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                NotBefore = now,
                Expires = now.AddHours(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);


            AppUser userToReturn = new AppUser
            {
                UserName = userFromRepo.Username,
                Token = tokenHandler.WriteToken(token),
                IsAuthenticated = true,
                UserRole = userFromRepo.UserRole,
                AccessLevel = userFromRepo.AccessLevel

            };

            if (userFromRepo.UserRole == "admin" || userFromRepo.UserRole == "gpsops")
            {
                userToReturn.IsAdmin = true;

                userToReturn.CanAccessInventory = true;
                userToReturn.CanSaveInventory = true;

                userToReturn.CanAccessAssets = true;
                userToReturn.canSaveAssets = true;

                userToReturn.CanAccessNotifications = true;
                userToReturn.CanSaveNotifications = true;
            }
            else
            {
                userToReturn.IsAdmin = false;
                userToReturn.CanAccessInventory = false;
                userToReturn.CanSaveInventory = false;

                userToReturn.CanAccessAssets = false;
                userToReturn.canSaveAssets = false;

                userToReturn.CanAccessNotifications = false;
                userToReturn.CanSaveNotifications = false;
            }

            return Ok(userToReturn);

            //admin/admin
            //gpsops/gpsops
            //vendor/test
            //sbc/test
            //other/test

            //return Ok(new
            //{
            //    token = tokenHandler.WriteToken(token)
            //});
        }

        [HttpPost("signin")]
        public async Task<IActionResult> signin(UserForLoginDto userForLoginDto)
        {
            var userFromRepo = await _repo.Login(userForLoginDto.Username, userForLoginDto.Password);

            if (userFromRepo == null)
                return Unauthorized();


            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.Username),
                new Claim(ClaimTypes.Role, userFromRepo.UserRole),
                new Claim("AccessLevel", userFromRepo.AccessLevel)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var now = DateTime.UtcNow;
            // var requestAt = DateTime.Now;
            // var expiresIn = requestAt.Add(TimeSpan.FromMinutes(30));


            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                NotBefore = now,
                Expires = now.AddHours(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);


            AuthUser userToReturn = new AuthUser
            {
                FullName = userFromRepo.Username,
                Token = tokenHandler.WriteToken(token),
                IsAuthenticated = true,
                UserRole = userFromRepo.UserRole,
                AccessLevel = userFromRepo.AccessLevel

            };

            userToReturn.ExtraInfo = "";
            //if (userFromRepo.UserRole == "admin" || userFromRepo.UserRole == "gpsops")
            //{
            //    userToReturn.UserRole = "admin";
            //    userToReturn.AccessLevel = "write";
            //}
            //else
            //{
            //    userToReturn.UserRole = "other";
            //    userToReturn.AccessLevel = "read";
            //}

            return Ok(userToReturn);

            //admin/admin
            //gpsops/gpsops
            //vendor/test
            //sbc/test
            //other/test

            //return Ok(new
            //{
            //    token = tokenHandler.WriteToken(token)
            //});
        }

        [HttpPost("remove")]
        public async Task<IActionResult> Remove(string username)
        {
            _logger.LogDebug($"User Remove Method called");

            if (!await _repo.UserExists(username.ToLower()))
                return BadRequest("Username does not exists");


            var deleted = await _repo.Remove(username);


            _logger.LogDebug($"User Register Method complete");

            if (deleted)
                return StatusCode(200);
            else
                return StatusCode((int)System.Net.HttpStatusCode.InternalServerError);
        }
    }
}