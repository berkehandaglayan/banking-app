using MediatR;
using Microsoft.EntityFrameworkCore;
using ProductAPI.Data;
using ProductAPI.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;


namespace ProductAPI.Features.ProductFeatures.Queries
{
    public class GetProductsByFilterQueryHandler : IRequestHandler<GetProductsByFilterQuery, IEnumerable<Product>>
    {
        private readonly ApplicationDbContext _context;

        public GetProductsByFilterQueryHandler(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Product>> Handle(GetProductsByFilterQuery request, CancellationToken cancellationToken)
        {
            var query = _context.Products.AsQueryable();
            if (!string.IsNullOrEmpty(request.Name))
            {
                query = query.Where(p => p.Name.Contains(request.Name));
            }

            if (!string.IsNullOrEmpty(request.ProductCode))
            {
                query = query.Where(p => p.ProductCode.Contains(request.ProductCode));
            }
            if (request.IsActive.HasValue)
            {
                query = query.Where(p => p.IsActive == request.IsActive.Value);
            }

            return await query.ToListAsync(cancellationToken);




        }
    }
}
