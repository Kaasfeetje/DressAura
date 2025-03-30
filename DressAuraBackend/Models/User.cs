
using System.ComponentModel.DataAnnotations;

namespace DressAuraBackend.Models
{
    public class User
    {
        public int Id { get; set; }

        [StringLength(50)]
        public string? FirstName { get; set; }

        [StringLength(50)]
        public string? LastName { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(100)]
        public string? Email { get; set; }

        public string? ProfilePictureUrl { get; set; }

        public DateOnly? Birthday { get; set; }

        public string? PhoneNumber { get; set; }

        public string? Gender { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public bool IsActive { get; set; } = true;

        public bool IsRegistered { get; set; } = false;

    }

    public class Gender
    {
        public const string Male = "male";
        public const string Female = "female";
    }
}