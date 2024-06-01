using System.Text.Json.Serialization;

public class FoodRequest
{
    [JsonNumberHandling(JsonNumberHandling.AllowReadingFromString)]
    public int table { get; set; }
    [JsonNumberHandling(JsonNumberHandling.AllowReadingFromString)]
    public int foodId { get; set; }
}