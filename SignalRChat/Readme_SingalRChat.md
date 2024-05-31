# SignalRChat
This app was developed following [Microsoft documentation](https://learn.microsoft.com/en-us/aspnet/core/tutorials/signalr?view=aspnetcore-8.0&tabs=visual-studio-code). With the purpose of  learning to make use of JavaScript in ASP.NET MVC web apps.


```shell
# Creates a folder and files for a ASP.NET webapp
dotnet new webapp -o SignalRChat


# cd .\SignalRChat\
dotnet tool install -g Microsoft.Web.LibraryManager.Cli

libman install @microsoft/signalr@latest -p unpkg -d wwwroot/js/signalr --files dist/browser/signalr.js
```