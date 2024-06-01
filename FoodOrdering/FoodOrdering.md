# Readme FoodOrdering: .NET + Angular + SignlaR + Database

In this example we are putting it all together following the example from [Lewis Cianci](https://blog.logrocket.com/using-real-time-data-angular-signalr/#creating-server-side-app).

### Step 1: Create a .NET WebApi Template
```shell
dotnet new webapi -n FoodOrdering
```

### Step 2: Add libraries
For this example we are going to connect with a SQLite local database. TODO: Down the line I will change this to SQL Server.
- `Microsoft.EntityFrameworkCore.Design`
- `Microsoft.EntityFrameworkCore.Sqlite`
```shell
dotnet add ./FoodOrdering package Microsoft.EntityFrameworkCore.Design 
dotnet add ./FoodOrdering package Microsoft.EntityFrameworkCore.SQLite

```