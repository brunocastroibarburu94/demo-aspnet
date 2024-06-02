using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; // Solves error CS1061: 'DbSet<Order>' does not contain a definition for 'Include'
using Microsoft.Extensions.Logging; // Logging into console

namespace FoodOrdering.Controllers;
[ApiController]
[Route("api/[controller]/[action]")]
public class KitchenController
{
    private readonly DataContext _context;
    private readonly ILogger _logger;
    public KitchenController(DataContext context, ILogger<KitchenController> logger)
    {
        _logger = logger;
        _context = context;
        _logger.LogInformation("Initialized KitchenController");
    }

    [HttpGet]
    public List<Order> GetExistingOrders()
    {
        _logger.LogInformation("Request received for GetExistingOrders");
        var orders = _context.Orders.Include(x => x.FoodItem).Where(x => x.OrderState != OrderState.Completed);
        return orders.ToList();
    }
}