﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.DTO
{
    public class JobDTO
    {
        public int Id { get; set; }
        public string LoadNo { get; set; }
        public int TransportStatusId { get; set; }
        public int CustomerId { get; set; }
        public int DockId { get; set; }
        public int NoOfPallets { get; set; }
        public string LoadType { get; set; }
        public string ArrivalTime { get; set; }
        public string startDate { get; set; }
        public string endDate { get; set; }

    }
}
