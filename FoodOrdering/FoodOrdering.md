# Readme FoodOrdering: .NET + Angular + SignlaR + Database

In this example we are putting it all together following the example from [Lewis Cianci](https://blog.logrocket.com/using-real-time-data-angular-signalr/#creating-server-side-app).

## Steps
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

### Step 3: Add models

See the files:
- `Model/FoodItem.cs`
- `Model/Order.cs`

### Step 4: Add context & Initial Migration file

Create the context file to setup database connection between models and data:
- `Contexts/DataContext.cs`

Generate migration files using Entity Framework:
```shell
dotnet ef --project ./FoodOrdering migrations add InitialCreate
```

#### Notes
This step had several errors whilst following the example linked above. To debug it, it was necessary to build the project and read the error logs

##### Fixing references in `Contexts/DataContext.cs` & `Model/Order.cs`
After executing 

```shell
dotnet ef --project ./FoodOrdering migrations add InitialCreate
```


The following error message popped up:
```
Build failed. Use dotnet build to see the errors.
```

Executing the build command

```shell
dotnet build  ./FoodOrdering
```

Returns the following error message

```
C:\Users\bruno\Documents\Repo\demo-aspnet\FoodOrdering\Contexts\DataContext.cs(1,28): error CS0246: The type or namespace name 'DbContext' could not be found (are you missing a using directive or an assembly reference?) [C:\Users\bruno\Documents\Repo\demo-aspnet\FoodOrde
ring\FoodOrdering.csproj]
C:\Users\bruno\Documents\Repo\demo-aspnet\FoodOrdering\Contexts\DataContext.cs(3,24): error CS0246: The type or namespace name 'DbContextOptions<>' could not be found (are you missing a using directive or an assembly reference?) [C:\Users\bruno\Documents\Repo\demo-aspnet 
\FoodOrdering\FoodOrdering.csproj]
C:\Users\bruno\Documents\Repo\demo-aspnet\FoodOrdering\Contexts\DataContext.cs(7,12): error CS0246: The type or namespace name 'DbSet<>' could not be found (are you missing a using directive or an assembly reference?) [C:\Users\bruno\Documents\Repo\demo-aspnet\FoodOrderi 
ng\FoodOrdering.csproj]
C:\Users\bruno\Documents\Repo\demo-aspnet\FoodOrdering\Model\Order.cs(11,2): error CS0246: The type or namespace name 'JsonConverterAttribute' could not be found (are you missing a using directive or an assembly reference?) [C:\Users\bruno\Documents\Repo\demo-aspnet\Food 
Ordering\FoodOrdering.csproj]
C:\Users\bruno\Documents\Repo\demo-aspnet\FoodOrdering\Model\Order.cs(11,2): error CS0246: The type or namespace name 'JsonConverter' could not be found (are you missing a using directive or an assembly reference?) [C:\Users\bruno\Documents\Repo\demo-aspnet\FoodOrdering\ 
FoodOrdering.csproj]
C:\Users\bruno\Documents\Repo\demo-aspnet\FoodOrdering\Model\Order.cs(11,23): error CS0246: The type or namespace name 'JsonStringEnumConverter' could not be found (are you missing a using directive or an assembly reference?) [C:\Users\bruno\Documents\Repo\demo-aspnet\Fo 
odOrdering\FoodOrdering.csproj]
C:\Users\bruno\Documents\Repo\demo-aspnet\FoodOrdering\Contexts\DataContext.cs(8,12): error CS0246: The type or namespace name 'DbSet<>' could not be found (are you missing a using directive or an assembly reference?) [C:\Users\bruno\Documents\Repo\demo-aspnet\FoodOrderi 
ng\FoodOrdering.csproj]
```

The underlying issue is missing references in both files. To solve it it was necessary to add the following lines to the files `Contexts/DataContext.cs` & `Model/Order.cs`

```cs
// Model/Order.cs
using System.Text.Json.Serialization; //JsonConverterAttribute, JsonConverter, JsonStringEnumConverter
```

```cs
// Contexts/DataContext.cs
using Microsoft.EntityFrameworkCore;//DbContext, DbContextOptions<>, DbSet<>
```

##### Fixing undefined DbContextType
Now the build command executes correctly 
```shell
# Builds ok, with some warning but ok
dotnet build  ./FoodOrdering

# Still doesn't create migration files
dotnet ef --project ./FoodOrdering migrations add InitialCreate
```

Error message:
```
Unable to create a 'DbContext' of type ''. The exception 'Unable to resolve service for type 'Microsoft.EntityFrameworkCore.DbContextOptions`1[DataContext]' while attempting to activate 'DataContext'.' was thrown while attempting to create an instance. For the different patterns supported at design time, see https://go.microsoft.com/fwlink/?linkid=851728

```

To solve this issue the following lines needs to be added in the `Program.cs` file:

```cs
using Microsoft.EntityFrameworkCore;// Add reference to dependency to "AddDbContext"

// var builder = WebApplication.CreateBuilder(args);// Declaration of builder (already present)

// Make sure theline below is between the declarations of builder and app.
builder.Services.AddDbContext<DataContext>(options => options.UseSqlite("Data Source=mydatabase.sqlite"));

// var app = builder.Build();// Declaration of app (already present)
```

Now running the command 

```shell
dotnet ef --project ./FoodOrdering migrations add InitialCreate
```

Should generate the files: 
- `Migrations/20240601122655_initial.cs`
- `Migrations/20240601122655_initial.Designer.cs`
- `Migrations/DataContextModelSnapshot.cs`