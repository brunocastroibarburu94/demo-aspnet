using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;//DbContext
using MyProductApp.Models;

namespace MyProductApp.Data
{
    public class MvcMovieContext : DbContext
    {
        public MvcMovieContext (DbContextOptions<MvcMovieContext> options)
            : base(options)
        {
        }

        public DbSet<MyProductApp.Models.Movie> Movie { get; set; } = default!;
    }
}
