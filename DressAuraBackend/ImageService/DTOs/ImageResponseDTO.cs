namespace DressAuraBackend.ImageService.DTOs
{
    public class ImageResponseDTO
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; }
        public string? FileName { get; set; }
        public string? FilePath { get; set; }
        public string? ContentType { get; set; }
    }
}
