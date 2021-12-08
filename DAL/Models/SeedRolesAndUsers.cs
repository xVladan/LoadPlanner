using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class SeedRolesAndUsers
    {
        ApplicationDbContext c = new ApplicationDbContext();
        public static void Seed(ApplicationDbContext context)
        {
            var userManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(context));
            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(context));

            var seedStat = context.TransportStatus.ToList();

            TransportStatus statusesEmpty = new TransportStatus()
            {
                Status = "Planned",
                Color = "#2d7c68",
                Description = ""
            };

            TransportStatus statusesEmpty2 = new TransportStatus()
            {
                Status = "Completed",
                Color = "#136dcd",
                Description = ""
            };

            TransportStatus statusesEmpty3 = new TransportStatus()
            {
                Status = "In Process",
                Color = "#ea06e2",
                Description = ""
            };

            if (seedStat.Count == 0)
            {
                context.TransportStatus.Add(statusesEmpty);
                context.TransportStatus.Add(statusesEmpty2);
                context.TransportStatus.Add(statusesEmpty3);
                context.SaveChanges();
            }


            // Add roles in database
            if (!roleManager.RoleExists("admin"))
            {
                var roleresult = roleManager.Create(new IdentityRole("admin"));
            }

            if (!roleManager.RoleExists("user"))
            {
                var roleresult = roleManager.Create(new IdentityRole("user"));
            }

            string userEmail = "admin@admin.com";
            string userPassword = "Admin!123";
            string firstName = "Jon";
            string lastName = "Doe";

            ApplicationUser user = userManager.FindByEmail(userEmail);
            if (user == null)
            {
                user = new ApplicationUser()
                {
                    UserName = userEmail,
                    FirstName = firstName,
                    LastName = lastName,
                    Email = userEmail,
                    isActive = true,
                };

                IdentityResult userResult = userManager.Create(user, userPassword);
                if (userResult.Succeeded)
                {
                    var result = userManager.AddToRole(user.Id, "admin");
                }
            }

        }
    }
}
