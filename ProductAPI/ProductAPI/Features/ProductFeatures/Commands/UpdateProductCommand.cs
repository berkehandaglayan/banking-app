using MediatR;
using ProductAPI.Enums; 

namespace ProductAPI.Features.ProductFeatures.Commands
{
    public class UpdateProductCommand : IRequest<bool>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string LetterTypes { get; set; }

        // string olan alanları enum tipleriyle değiştiriyoruz
        public MaturityTypeEnum? MaturityTypes { get; set; }
        public CurrencyEnum Currencies { get; set; }
        public ChannelEnum Channels { get; set; }
        public OfficialLimitTypeEnum? OfficialLimitType { get; set; }

        public bool IsActive { get; set; }
    }
}
