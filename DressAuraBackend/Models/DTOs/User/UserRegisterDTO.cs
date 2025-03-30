using System.ComponentModel.DataAnnotations;

namespace DressAuraBackend.Models.DTOs
{
    public class UserRegisterDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? ProfilePictureUrl { get; set; }
    }
}
