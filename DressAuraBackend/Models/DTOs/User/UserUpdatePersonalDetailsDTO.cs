namespace DressAuraBackend.Models.DTOs
{
    public class UserUpdatePersonalDetailsDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateOnly Birthday { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Gender { get; set; }
        public string? ProfilePictureUrl { get; set; }
    }
}
