using MediatR;
using ProductAPI.Models;
using System.Collections.Generic;



namespace ProductAPI.Features.ProductFeatures.Queries
{
    public class GetProductsByFilterQuery : IRequest<IEnumerable<Product>>
    {

        public string? Name { get; set; }

        //filreleme olduğu için nullable olmalı.
        public string? ProductCode {  get; set; }
        public bool? IsActive { get; set; }


    }
}
