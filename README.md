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

##### Quick Links
- [Product Controller Welcome Message: http://localhost:5110/Products/Welcome](http://localhost:5110/Products/Welcome)
- [Second Controller Welcome Message: http://localhost:5110/HelloWorld/Welcome](http://localhost:5110/HelloWorld/Welcome)
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