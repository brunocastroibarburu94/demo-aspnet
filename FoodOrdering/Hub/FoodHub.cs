using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore; // Solves error CS1061: 'DbSet<Order>' does not contain a definition for 'Include'
using Microsoft.Extensions.Logging; // Logging into console


// using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
public class FoodHub : Hub<IFoodOrderClient>
{
    private readonly DataContext _context;
    private readonly ILogger _logger;

    public FoodHub(DataContext context, ILogger<FoodHub> logger)
    {
        _context = context;
        _logger = logger;
        _logger.LogInformation("Initialized FoodHub (SignalRHub)");
    }

    public async Task OrderFoodItem(FoodRequest request)
    {
        
        _logger.LogInformation("Received OrderFoodItem with FoodRequest ");
        _context.Orders.Add(new Order()
        {
            FoodItemId = request.foodId,
            OrderDate = DateTimeOffset.Now,
            TableNumber = request.table,
            OrderState = OrderState.Ordered,
        });

        await _context.SaveChangesAsync();
        await EmitActiveOrders();
    }

    public async Task UpdateFoodItem(int orderId, OrderState state)
    {
        var order = await _context.Orders.FindAsync(orderId);
        if (order != null)
        {
            order.OrderState = state;
        }

        await _context.SaveChangesAsync();
        await EmitActiveOrders();
    }

    public async Task EmitActiveOrders()
    {
        
        _logger.LogInformation("EmittingActiveOrders");
        var orders = _context.Orders.Include(x => x.FoodItem).Where(x => x.OrderState != OrderState.Completed).ToList();

        await Clients.All.PendingFoodUpdated(orders);
    }

    public override async Task OnConnectedAsync()
    {
        Console.WriteLine(Context.ConnectionId);
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception ex)
    {
        Console.WriteLine(Context.ConnectionId);
        await base.OnDisconnectedAsync(ex);
    }
}

// These are the RPC calls on the client
public interface IFoodOrderClient
{
    [AllowAnonymous]
    Task PendingFoodUpdated(List<Order> orders);
}