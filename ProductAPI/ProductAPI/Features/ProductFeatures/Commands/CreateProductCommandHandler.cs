using MediatR;
using ProductAPI.Data;
using ProductAPI.Models;


namespace ProductAPI.Features.ProductFeatures.Commands
{
    public class CreateProductCommandHandler : IRequestHandler<CreateProductCommand, int>
    {
        private readonly ApplicationDbContext _context;

        public CreateProductCommandHandler(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(CreateProductCommand command, CancellationToken cancellationToken)
        {
            var product = new Product
            {
                ProductCode = Guid.NewGuid().ToString(),

                Name = command.Name,
                Description = command.Description,
                LetterTypes = command.LetterTypes,
                MaturityTypes = command.MaturityTypes,
                Currencies = command.Currencies,
                Channels = command.Channels,
                OfficialLimitType = command.OfficialLimitType,
                IsActive = command.IsActive,
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync(cancellationToken);

            return product.Id;


        }



    }
}
