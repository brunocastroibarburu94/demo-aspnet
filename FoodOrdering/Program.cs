using Microsoft.EntityFrameworkCore;//AddDbContext
using System.Text.Json.Serialization;//JsonSerializerOptions
// using SignalRChat.Hubs;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Improve logging
builder.Services.AddLogging(logging =>
    logging.AddSimpleConsole(options =>
    {
        options.SingleLine = true;
        options.TimestampFormat = "yyyy-MM-dd HH:mm:ss ";
    })
);

// The connection string is specified directly here.[Without referecing appsettings.json]
builder.Services.AddDbContext<DataContext>(options => options.UseSqlite("Data Source=mydatabase.sqlite"));

// Add service that populates the database & puts in a usable state
builder.Services.AddHostedService<SeedingWorker>();

// Add MVC functionality to .NET app, i.e., to load Controllers used for API endpoints & Configure the pipeline to accept enums as strings, instead of just numbers
builder.Services.AddMvc().AddJsonOptions(x => { x.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()); });

// Add SignalR
builder.Services.AddSignalR(o =>
                {
                    o.KeepAliveInterval = TimeSpan.FromSeconds(15);  
                });

// Networking Policy (maybe not needed atm)
// builder.Services.AddCors(o => o.AddPolicy("CorsPolicy", builder => {
//         builder
//         .AllowAnyMethod()
//         .AllowAnyHeader()
//         .WithOrigins("http://localhost:4200");
//     })); 
var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();

// Networking Policy (maybe not needed atm)
// app.UseCors("CorsPolicy");

// Configure our API Endpoints
app.MapControllers();

// Configure our SignalR hub
app.MapHub<FoodHub>("/foodhub");

app.Run();