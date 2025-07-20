using MediatR;
using ProductAPI.Features.ProductFeatures.Commands;
using ProductAPI.Features.ProductFeatures.Queries;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace ProductAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {

        private readonly IMediator _mediator;


        //IMediator enjekte etmece
        public ProductsController(IMediator mediator)
        {
            _mediator = mediator;  
        }


        // GET: Tüm ürünleri getirme

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            //var products = await _context.Products.ToListAsync();
            var products = await _mediator.Send(new GetAllProductsQuery());
            return Ok(products);
        }



        // GET: Bir ürün getirme
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            //var product = await _context.Products.FindAsync(id);
            var product = await _mediator.Send(new GetProductByIdQuery {  Id = id });

            //ürün yoksa 404 not found getirme
            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        // POST: Ürün ekleme
        [HttpPost]
        public async Task<IActionResult> CreateProduct(CreateProductCommand command)
        {
            /*
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            */
            var productId = await _mediator.Send(command);

            // Oluşturulan kaynağın lokasyonunu ve kendisini döner (REST standardı)
            return CreatedAtAction(nameof(GetProductById), new { id = productId }, command);
        }

        // PUT: Ürün güncelleme
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, UpdateProductCommand command)
        {
            if (id != command.Id)
            {
                return BadRequest("ID uyuşmazlığı.");
            }

            var result = await _mediator.Send(command);

            if (result)
            {
                return NoContent(); //başarılı.
            }
            else
            {
                return NotFound(); //ürün bulunamadı veya bir hata oluştu.
            }
        }


        // DELETE: Ürün silme
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var result = await _mediator.Send(new DeleteProductByIdCommand { Id = id });

            if (result)
            {
                return NoContent(); //silme başarılı.
            }
            else
            {
                return NotFound(); //silinecek ürün bulunamadı.
            }
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchProducts([FromQuery] GetProductsByFilterQuery query)
        {
            //getproductsbyfilterquery'e doldurtmaca
            var products = await _mediator.Send(query);
            return Ok(products);
        }


    }
}