using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ProductAPI.Enums;

namespace ProductAPI.Models

{
    public class Product
    {
        [Key] public int Id { get; set; }

        [Required][StringLength(50)] public string ProductCode { get; set; }

        [Required][StringLength(250)] public string Name { get; set; }

        [Required][StringLength (1000)] public string Description { get; set; }

        [Required][StringLength(250)] public string LetterTypes {  get; set; }

        [StringLength(50)] public MaturityTypeEnum? MaturityTypes { get; set; }

        [Required][StringLength(1000)] public CurrencyEnum Currencies { get; set; }

        [Required][StringLength(250)] public ChannelEnum Channels { get; set; }

        public OfficialLimitTypeEnum? OfficialLimitType { get; set; }

        public bool IsActive { get; set; }
    }
}
