# Readme FoodOrdering: .NET + Angular + SignlaR + Database

In this example we are putting it all together following the example from [Lewis Cianci](https://blog.logrocket.com/using-real-time-data-angular-signalr/#creating-server-side-app).

## Local serve:
```shell
dotnet watch run --project ./FoodOrdering
```

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
- `FoodOrdering/Model/FoodItem.cs`
- `FoodOrdering/Model/Order.cs`

### Step 4: Add context & Initial Migration file

Create the context file to setup database connection between models and data:
- `Contexts/DataContext.cs`

Generate migration files using Entity Framework:
```shell
dotnet ef --project ./FoodOrdering migrations add Initial
```

#### Notes
This step had several errors whilst following the example linked above. To debug it, it was necessary to build the project and read the error logs

##### Fixing references in `Contexts/DataContext.cs` & `Model/Order.cs`
After executing 

```shell
dotnet ef --project ./FoodOrdering migrations add Initial
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
<PathToDirectory>\demo-aspnet\FoodOrdering\Contexts\DataContext.cs(1,28): error CS0246: The type or namespace name 'DbContext' could not be found (are you missing a using directive or an assembly reference?) [<PathToDirectory>\demo-aspnet\FoodOrdering\FoodOrdering.csproj]
<PathToDirectory>\demo-aspnet\FoodOrdering\Contexts\DataContext.cs(3,24): error CS0246: The type or namespace name 'DbContextOptions<>' could not be found (are you missing a using directive or an assembly reference?) [<PathToDirectory>\demo-aspnet\FoodOrdering\FoodOrdering.csproj]
<PathToDirectory>\demo-aspnet\FoodOrdering\Contexts\DataContext.cs(7,12): error CS0246: The type or namespace name 'DbSet<>' could not be found (are you missing a using directive or an assembly reference?) [<PathToDirectory>\demo-aspnet\FoodOrdering\FoodOrdering.csproj]
<PathToDirectory>\demo-aspnet\FoodOrdering\Model\Order.cs(11,2): error CS0246: The type or namespace name 'JsonConverterAttribute' could not be found (are you missing a using directive or an assembly reference?) [<PathToDirectory>\demo-aspnet\FoodOrdering\FoodOrdering.csproj]
<PathToDirectory>\demo-aspnet\FoodOrdering\Model\Order.cs(11,2): error CS0246: The type or namespace name 'JsonConverter' could not be found (are you missing a using directive or an assembly reference?) [<PathToDirectory>\demo-aspnet\FoodOrdering\FoodOrdering.csproj]
<PathToDirectory>\demo-aspnet\FoodOrdering\Model\Order.cs(11,23): error CS0246: The type or namespace name 'JsonStringEnumConverter' could not be found (are you missing a using directive or an assembly reference?) [<PathToDirectory>\demo-aspnet\FoodOrdering\FoodOrdering.csproj]
<PathToDirectory>\demo-aspnet\FoodOrdering\Contexts\DataContext.cs(8,12): error CS0246: The type or namespace name 'DbSet<>' could not be found (are you missing a using directive or an assembly reference?) [<PathToDirectory>\demo-aspnet\FoodOrdering\FoodOrdering.csproj]
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
dotnet ef --project ./FoodOrdering migrations add Initial
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
dotnet ef --project ./FoodOrdering migrations add Initial
```

Should generate the files: 
- `FoodOrdering/Migrations/<Timestamp>_Initial.cs`
- `FoodOrdering/Migrations/<Timestamp>_Initial.Designer.cs`
- `FoodOrdering/Migrations/DataContextModelSnapshot.cs`


### Step 5: Add a seeding worker (populates the database)
The workers are services that run with the app, in this case we define a worker that ensures the database is in a useful state and populates it with some data. This is done by adding the file `Workers/SeedingWorker.cs` and adding a reference to it in the `Program.cs` file.


```cs
using Microsoft.EntityFrameworkCore;// Add reference to dependency to "AddDbContext"

// var builder = WebApplication.CreateBuilder(args);// Declaration of builder (already present)

// Make sure theline below is between the declarations of builder and app.
builder.Services.AddHostedService<SeedingWorker>();

// var app = builder.Build();// Declaration of app (already present)
```

Now if you run the app by executing

```shell
dotnet watch run --project ./FoodOrdering
```
You will see that the SQLite database is created by generating the file `mydatabase.sqlite`, this sqlite database can be queried and after running the app you can see that it has been populated with data. 

- **Note that the app still doesn't have a front-end so the only way to see the data is by inspecting the sqlite database file `mydatabase.sqlite`**

### Step 6: Set up Angular Client
To do this step make sure that:

1. You have `node` installed in your system.
    1. You can verify this by running `node -v` which should return the version of node in your system.
    1. This example was tested using version `v20.14.0`
1. Verify `npm` is installed in your system.
    1.  You can verify this by running `npm -v` which should return the version of node in your system.
    1. This example was tested using version `v10.7.0`
1. Make sure you have installed angular in your system
    1.  You can verify this by running `ng --version` which should return the version of node in your system.
    1. This can be installed by running: `npm install -g @angular/cli`
    1. This example was tested using version `v18.0.2`

To create the Angular Client execute the following command one level above the .NET project. (Don't worry its exactly where we have been working so far :D )
```shell
ng new FoodOrderingClient
```
This will pop up a couple of choices
1. Share data with Google (I put No)
1. ? Which stylesheet format would you like to use? CSS             [ https://developer.mozilla.org/docs/Web/CSS                     ]
1. ? Do you want to enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering)? Yes

This should have created a directory"`FoodOrderingClient`" right next to the directory `FoodOrdering`

### Step 7: Align our Angular Client with the server - Creation of Data Model
> Because our project will need to receive food items that align with what we have on the server, we’ll first need to create our data model. 

The data model is created in the file `FoodOrderingClient/model/data.ts`

### Step 8: Align our Angular Client with the server - Real-time service creation

To create the service in the Angular client execute the code below but make sure your terminal is in the directory `./FoodOrderingClient`.
```shell
# Terminal must be in the directory ./FoodOrderingClient 
ng generate service RealtimeClient
```

This should have created the following 2 files
- `./FoodOrderingClient/src/app/realtime-client.service.spec.ts`
- `./FoodOrderingClient/src/app/realtime-client.service.ts`


##### Notes on ts (TypeScript) files
> TypeScript is a primary language for Angular application development. It is a superset of JavaScript with design-time support for type safety and tooling. Browsers can't execute TypeScript directly. Typescript must be "transpiled" into JavaScript using the tsc compiler, which requires some configuration. [Angular Documentation](https://v2.angular.io/docs/ts/latest/guide/typescript-configuration.html#:~:text=TypeScript%20is%20a%20primary%20language,compiler%2C%20which%20requires%20some%20configuration.)

### Step 9: Align our Angular Client with the server - Real-time service configuration
**Note**: To execute this step make sure you have installed the angular dependency `@microsoft/signalr`. You can do that by executing the command below.
```shell
npm i @microsoft/signalr@latest --save
```

This `realtime-client` service needs still to be configured, to do so we must introduce the following modifications in the TypeScript file `./FoodOrderingClient/src/app/realtime-client.service.ts`.

```ts
// FoodOrderingClient/src/app/realtime-client.service.ts

// import { Injectable } from '@angular/core';...
// [1] - Import dependencies on top of the file
import * as signalR from '@microsoft/signalr';
import {Observable, Subject} from "rxjs";
import {FoodRequest, Order, OrderState} from "../model/data";


// [2] - Add attributes to the class RealtimeClientService
// ...export class RealtimeClientService {...
  private hubConnection?: signalR.HubConnection; // References our SignalR hub
  private pendingFoodUpdatedSubject = new Subject<Order[]>(); //Houses our Subject
  ordersUpdated$: Observable<Order[]> = this.pendingFoodUpdatedSubject.asObservable(); //Other parts of our application can subscribe to this attribute

//   ...constructor() {    
// [3] - Modify the constructor
  this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('http://localhost:4200/foodhub') // Replace with your SignalR hub URL
    .build();

  this.hubConnection
    .start()
    .then(() => console.log('Connected to SignalR hub'))
    .catch(err => console.error('Error connecting to SignalR hub:', err));

  this.hubConnection.on('PendingFoodUpdated', (orders: Order[]) => {
    this.pendingFoodUpdatedSubject.next(orders);
  });

// }...
// Note: For some reason in the repository used by the article instead of putting this code in constructor it vreates an additional method called "connect" and implements a similar version of step [3] there

// [4] - Create methods orderFoodItem & updateFoodItem
    async orderFoodItem(foodId: number, table: number) {
        console.log("ordering");
        await this.hubConnection.invoke('OrderFoodItem', {
            foodId,
            table,
        } as FoodRequest);
    }

    async updateFoodItem(orderId: number, state: OrderState) {
        await this.hubConnection.invoke('UpdateFoodItem', orderId, state);
    }

```
### Step 10: Check that the angular app can be run
Although we still haven't configured the app pages to order food it is important to check that the application we have been writing so far still compiles and can be served. To test this we will attempt to serve the Angular client exeucting the code below

```shell
ng serve
```

### Step 11: Configure pages