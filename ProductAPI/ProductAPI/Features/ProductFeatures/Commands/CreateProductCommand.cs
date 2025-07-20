using MediatR;
using ProductAPI.Enums;

namespace ProductAPI.Features.ProductFeatures.Commands
{
    public class CreateProductCommand : IRequest<int>
    {
    public string Name { get; set; }
    public string Description { get; set; }
    public string LetterTypes { get; set; }
        public MaturityTypeEnum? MaturityTypes { get; set; }
        public CurrencyEnum Currencies { get; set; }
        public ChannelEnum Channels { get; set; }
        public OfficialLimitTypeEnum? OfficialLimitType { get; set; }

        public bool IsActive {  get; set; }

    }
}
