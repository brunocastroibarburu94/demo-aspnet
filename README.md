# demo-aspnet
This is a repo for demo to try out ASP.NET development


```shell
dotnet run --project ./ConsoleApp1
dotnet run --project ./ConsoleApp2
dotnet run --project ./WebApplication1
dotnet run --project ./MyProductApp

# Allow for auto-refresh of site when modifying the C# files
dotnet watch run --project .\MyProductApp\
```


### MyProductApp
This example is adapted from [Brilliant Medium Article](https://medium.com/itthirit-technology/building-your-first-net-core-web-app-a-step-by-step-guide-a69af3f55105) in combination with the [ASP.NET Core .NET 8.0 Documentation](https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app/adding-controller?view=aspnetcore-8.0&tabs=visual-studio)

##### Dependencies
```shell
dotnet tool install --global dotnet-aspnet-codegenerator
dotnet tool install --global dotnet-ef
dotnet add ./MyProductApp package Microsoft.EntityFrameworkCore.Design 
dotnet add ./MyProductApp package Microsoft.EntityFrameworkCore.SQLite
dotnet add ./MyProductApp package Microsoft.VisualStudio.Web.CodeGeneration.Design
dotnet add ./MyProductApp package Microsoft.EntityFrameworkCore.SqlServer
dotnet add ./MyProductApp package Microsoft.EntityFrameworkCore.Tools

```

##### Shortcuts for CR UDfile generation
**dotnet-aspnet-codegenerator**: Is a useful CLI tool that one can use to auto-generate code. This is called **Scaffolding**
```shell
# Automatically create controller using the code generator with CRUD actions for the data context (dc) MyProductApp.Data.MvcMovieContext 

dotnet aspnet-codegenerator --project ./MyProductApp controller -name MoviesController -m Movie -dc MyProductApp.Data.MvcMovieContext --relativeFolderPath ./Controllers --useDefaultLayout --referenceScriptLibraries --databaseProvider sqlite 
```
**Scaffolding** creates the following:

- A movies controller: `Controllers/MoviesController.cs`
- Razor view files for **Create, Delete, Details, Edit**, and **Index** pages: `Views/Movies/*.cshtml`
- A database context class: `Data/MvcMovieContext.cs`

Scaffolding updates the following:

- Registers the database context in the `Program.cs` file
- Adds a database connection string to the `appsettings.json` file.

###### Creation of database:
```shell
# Generate a Migrations/{timestamp}_InitialCreate.cs migration file. (This automatically scans the project and creates the )
dotnet ef --project ./MyProductApp migrations add InitialCreate
# Create database
dotnet ef --project ./MyProductApp  database update

```
###### Note on dev and prod environments
For some reason whilst following the Microsoft example "[Part 4, add a model to an ASP.NET Core MVC app | Microsoft Learn](https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app/adding-model?view=aspnetcore-8.0&tabs=visual-studio-code)" the addition of the code below into `Program.cs` makes the database generation codes of the previous section to fail.

```c#
var builder = WebApplication.CreateBuilder(args);

if (builder.Environment.IsDevelopment())
{
    builder.Services.AddDbContext<MvcMovieContext>(options =>
        options.UseSqlite(builder.Configuration.GetConnectionString("MvcMovieContext")));
}
else
{
    builder.Services.AddDbContext<MvcMovieContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("ProductionMvcMovieContext")));
}
```

##### Quick Links
- [Product Controller Welcome Message: http://localhost:5110/Products/Welcome](http://localhost:5110/Products/Welcome)
- [Second Controller Welcome Message: http://localhost:5110/HelloWorld/Welcome](http://localhost:5110/HelloWorld/Welcome)
- [Error page: http://localhost:5110/Products/Error](http://localhost:5110/Products/Error)
- [http://localhost:5110/HelloWorld/RepeatHi?name=Wayne&numtimes=2]

### Installing node
[Nodejs website](https://nodejs.org/en/download/package-manager)
```shell
# installs fnm (Fast Node Manager)
winget install Schniz.fnm

# download and install Node.js
# fnm use --install-if-missing 20
fnm install v20.14.0

# Add installation path to environment variable PATH
#i.e., C:\Users\{user}\AppData\Roaming\fnm\node-versions\v20.14.0\installation
# verifies the right Node.js version is in the environment
node -v # should print `v20.14.0`

# verifies the right NPM version is in the environment
npm -v # should print `10.7.0`
```