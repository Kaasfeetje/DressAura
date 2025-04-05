using AutoMapper;
using DressAuraBackend.ProductService.Models;
using DressAuraBackend.ProductService.DTOs;
using DressAuraBackend.BrandService.DTOs;
using DressAuraBackend.ImageService.DTOs;
using DressAuraBackend.BrandService.Models;
using DressAuraBackend.ImageService.Models;
using DressAuraBackend.CategoryService.Models;

namespace DressAuraBackend.ProductService.Mappings
{
    public class ProductProfile : Profile
    {
        public ProductProfile()
        {
            CreateMap<Product, ProductResponseDTO>()
                .ForMember(dest => dest.Brand, opt => opt.MapFrom(src => src.Brand))
                .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category))
                .ForMember(dest => dest.ThumbnailImage, opt => opt.MapFrom(src => src.ThumbnailImage))
                .ForMember(dest => dest.Images, opt => opt.MapFrom(src => src.Images))
                .ForMember(dest => dest.Colors, opt => opt.MapFrom(src => src.ProductColors.Select(pc => pc.Color)))
                .ForMember(dest => dest.Sizes, opt => opt.MapFrom(src => src.ProductSizes.Select(ps => ps.Size)));

            CreateMap<Brand, BrandResponseDTO>();
            CreateMap<Category, CategoryResponseDTO>();
            CreateMap<Image, ImageResponseDTO>();
            CreateMap<Color, ColorResponseDTO>();
            CreateMap<Size, SizeResponseDTO>();
        }
    }
}
