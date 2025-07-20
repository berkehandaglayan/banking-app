using MediatR;
using ProductAPI.Data;
using System.Threading;
using System.Threading.Tasks;

namespace ProductAPI.Features.ProductFeatures.Commands
{
    
    public class UpdateProductCommandHandler : IRequestHandler<UpdateProductCommand, bool>
    {
        private readonly ApplicationDbContext _context;

        public UpdateProductCommandHandler(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Handle(UpdateProductCommand command, CancellationToken cancellationToken)
        {
            
            var productToUpdate = await _context.Products.FindAsync(new object[] { command.Id }, cancellationToken);

            
            if (productToUpdate == null)
            {
                return false;
            }

            
            productToUpdate.Name = command.Name;
            productToUpdate.Description = command.Description;
            productToUpdate.LetterTypes = command.LetterTypes;
            productToUpdate.MaturityTypes = command.MaturityTypes;
            productToUpdate.Currencies = command.Currencies;
            productToUpdate.Channels = command.Channels;
            productToUpdate.OfficialLimitType = command.OfficialLimitType;
            productToUpdate.IsActive = command.IsActive;

            
            var result = await _context.SaveChangesAsync(cancellationToken);

            
            return result > 0;
        }
    }
}