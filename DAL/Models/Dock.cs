using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class Dock
    {
        [Key]
        public int Id { get; set; }
        [Required]

        [DisplayName("Dock")]
        public string DockName { get; set; }

    }
}
