# Readme: dotnet webapp with React 

```shell
dotnet new react -o react_aspcore_app
```

The json dependencies of the client app are found in `<App_Dir>\package.json`

<!-- `<App_Dir>\ClientApp\package.json` -->

To install new dependencies use

```shell
npm install rimraf

# 
setx ASPNETCORE_ENVIROMENT "Development"

#Run the app
dotnet run
```