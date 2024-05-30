using Microsoft.AspNetCore.Mvc;
using MyProductApp.Models;
using System.Collections.Generic;
using System.Diagnostics;//Activity

namespace MyProductApp.Controllers
{
    public class ProductsController : Controller
    {
        static List<Product> products = new List<Product>();

        public IActionResult Index()
        {
            return View(products);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(Product product)
        {
            products.Add(product);
            return RedirectToAction("Index");
        }

        public IActionResult Edit(int id)
        {
            Product product = products.Find(p => p.Id == id);
            return View(product);
        }

        [HttpPost]
        public IActionResult Edit(Product product)
        {
            products[products.FindIndex(p => p.Id == product.Id)] = product;
            return RedirectToAction("Index");
        }

        public IActionResult Delete(int id)
        {
            products.RemoveAt(products.FindIndex(p => p.Id == id));
            return RedirectToAction("Index");
        }
        
        public string Welcome()
        {
            return "Welcome master Wayne!";
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

    }
}