using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.Sqlite;

var builder = WebApplication.CreateBuilder(args);

var connectionStringBuilder = new SqliteConnectionStringBuilder();
connectionStringBuilder.DataSource = "./store.db";

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<StoreContext>(opt =>
{
    //opt.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));
    opt.UseSqlite(connectionStringBuilder.ConnectionString);
});

var app = builder.Build();

using var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

try
{
    context.Database.Migrate();
    DbInitializer.Initialize(context);
}
catch (Exception ex)
{
    logger.LogError(ex, "Problem migration data");
}
/*finally
{
    scope.Dispose();
}*/

//app.Services.AddCors();
app.UseCors(opt => {
    opt.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
});


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
