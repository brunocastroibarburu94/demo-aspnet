using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; // Solves error CS1061: 'DbSet<Order>' does not contain a definition for 'Include'

namespace FoodOrdering.Controllers;
[ApiController]
[Route("api/[controller]/[action]")]
public class KitchenController
{
    private readonly DataContext _context;

    public KitchenController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    public List<Order> GetExistingOrders()
    {
        var orders = _context.Orders.Include(x => x.FoodItem).Where(x => x.OrderState != OrderState.Completed);
        return orders.ToList();
    }
}