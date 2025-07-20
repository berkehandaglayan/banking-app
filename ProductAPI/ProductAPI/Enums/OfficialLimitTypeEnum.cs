using System.ComponentModel.DataAnnotations;

namespace ProductAPI.Enums
{
    public enum OfficialLimitTypeEnum
    {

        [Display(Name = "İhracat Alacakları İskonto Programı")]
        IhracatAlacaklariIskontoProgrami = 1,

        [Display(Name = "Marka Kredisi")]
        MarkaKredisi = 2,

        [Display(Name = "Yurt Dışı Mağazalar Yatırım Kredisi")]
        YurtDisiMagazalarYatirimKredisi = 3
    }
}