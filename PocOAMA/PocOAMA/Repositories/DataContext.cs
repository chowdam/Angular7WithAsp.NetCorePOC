using Microsoft.EntityFrameworkCore;
using PocOAMA.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PocOAMA.Repositories
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
                
        public DbSet<User> Users { get; set; }
    }
}
