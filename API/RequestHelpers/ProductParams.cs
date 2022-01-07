namespace API.RequestHelpers;

public class ProductParams : PaginationParams
{
    public string OrderBy { get; set; } = "name";
    public string SearchTerm { get; set; } = "empty";
    public string Types { get; set; } = "empty";
    public string Brands { get; set; } = "empty";
}