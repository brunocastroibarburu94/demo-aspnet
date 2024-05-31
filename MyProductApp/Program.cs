using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using MyProductApp.Data;
var builder = Microsoft.AspNetCore.Builder.WebApplication.CreateBuilder(args);
// Configure DataBase connection
if (builder.Environment.IsDevelopment())
{
    //   builder.Services.AddDbContext<MvcMovieContext>(options =>
    //     options.UseSqlite(builder.Configuration.GetConnectionString("MvcMovieContext")));
      builder.Services.AddDbContext<MvcMovieContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("MvcMovieContext")));
}
else
{
    builder.Services.AddDbContext<MvcMovieContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("ProductionMvcMovieContextContext")));
}
// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();


// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Products/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Products}/{action=Index}/{id?}"
    );

app.Run();
