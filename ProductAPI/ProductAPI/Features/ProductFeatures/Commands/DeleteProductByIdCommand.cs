using MediatR;
using ProductAPI.Data;


namespace ProductAPI.Features.ProductFeatures.Commands
{
    public class DeleteProductByIdCommand : IRequest<bool>
    {
        public int Id { get; set; }
    }
    public class DeleteProductByIdCommandHandler : IRequestHandler<DeleteProductByIdCommand, bool>
    {
        private readonly ApplicationDbContext _context;
        public DeleteProductByIdCommandHandler(ApplicationDbContext context) => _context = context;

        public async Task<bool> Handle(DeleteProductByIdCommand command, CancellationToken cancellationToken)
        {
            var product = await _context.Products.FindAsync(command.Id);
            if (product == null) return false;

            _context.Products.Remove(product);
            await _context.SaveChangesAsync(cancellationToken);
            return true;
        }

    }
}
