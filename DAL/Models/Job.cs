using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class Job
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [DisplayName("Load No")]
        public string LoadNo { get; set; }

        [Required]
        [DisplayName("Status")]
        public int TransportStatusId { get; set; }

        [Required]
        [DisplayName("Customer")]
        public int CustomerId { get; set; }

        [Required]
        [DisplayName("Dock")]
        public int  DockId { get; set; }

        [Required]
        public int NoOfPallets { get; set; }

        [Required]
        public string LoadType { get; set; }

        [DisplayName("Arrival Time")]
        public DateTime ArrivalTime { get; set; }

        [DisplayName("Dock On")]
        public DateTime DockOn { get; set; }

        [DisplayName("Dock Of")]
        public DateTime DockOff { get; set; }




        [ForeignKey("TransportStatusId")]
        public virtual TransportStatus Status { get; set; }
       
        [ForeignKey("CustomerId")]
        public virtual Customer Customer { get; set; }

        [ForeignKey("DockId")]
        public virtual Dock Dock { get; set; }
        
    }
}
