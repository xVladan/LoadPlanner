using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
  
    public class TransportStatus
    {
        [Key]
        public int Id { get; set; }

        [Required]

        [DisplayName("Status")]
        public string Status { get; set; }

        public string Description { get; set; }
        public string Color { get; set; }

    }
}
