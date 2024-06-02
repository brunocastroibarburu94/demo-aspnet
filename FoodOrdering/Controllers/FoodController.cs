using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; // Solves error CS1061: 'DbSet<FoodItem>' does not contain a definition for 'ToListAsync'

namespace FoodOrdering.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class FoodItemsController : ControllerBase
{
    private readonly DataContext _context;

    public FoodItemsController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetFoodItems()
    {
        var foodItems = await _context.FoodItems.ToListAsync();
        return Ok(foodItems);
    }
}