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

##### Shortcuts for CRUD file generation
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

###### Creation of database: SQLite

```shell
# Generate a Migrations/{timestamp}_InitialCreate.cs migration file. (This automatically scans the project and creates the )
dotnet ef --project ./MyProductApp migrations add InitialCreate
# Create database
dotnet ef --project ./MyProductApp  database update
```

###### Creation of database: SQL Server 2022 Developer Edition (Microsoft RDB)

Before you begin make sure to download and install the SQL Server 2022 in your system, the Developer Edition is Free and should be close to its enterprise counterpart to keep it real, [SQL Server Download site](https://www.microsoft.com/en-gb/sql-server/sql-server-downloads).

Once is installed in order to make use of SQL Server as the database there are 2 options
1. **Nice person option - Get a Certificate**:[StackOverflow](https://stackoverflow.com/questions/17615260/the-certificate-chain-was-issued-by-an-authority-that-is-not-trusted-when-conn)
1. **Security facepalm option - Just trust the connection**: At the end of the connection string slap the following text `TrustServerCertificate=True`

In the future (maybe) I will add a guide on how to do the nice person option but for now let's stick with the security facepalm.

To
```shell
# dotnet ef  --project ./MyProductApp  database update --connection "MvcMovieContext"
dotnet ef  --project ./MyProductApp  database update --connection "Server=localhost;Database=Master;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=True"

# To unapply all migrations:
dotnet ef  --project ./MyProductApp  database update 0 --connection "Server=localhost;Database=Master;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=True"

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