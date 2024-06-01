using Microsoft.EntityFrameworkCore;//AddDbContext
using System.Text.Json.Serialization;//JsonSerializerOptions

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// The connection string is specified directly here.[Without referecing appsettings.json]
builder.Services.AddDbContext<DataContext>(options => options.UseSqlite("Data Source=mydatabase.sqlite"));

// Add service that populates the database & puts in a usable state
builder.Services.AddHostedService<SeedingWorker>();

// Add MVC functionality to .NET app, i.e., to load Controllers used for API endpoints
builder.Services.AddMvc().AddJsonOptions(x => { x.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()); });

// Add SignalR
builder.Services.AddSignalR();

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapControllers();

// Configure our SignalR hub
app.MapHub<FoodHub>("/foodhub");

app.Run();