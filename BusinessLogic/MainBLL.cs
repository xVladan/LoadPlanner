using DAL;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

//using System.Data.Entity;
//using System.Data.Entity.ModelConfiguration.Conventions;
//using System.Security.Claims;
//using Microsoft.AspNet.Identity;
//using Microsoft.AspNet.Identity.EntityFramework;


namespace BusinessLogic
{
    public class MainBLL
    {
        private ApplicationDbContext db;
        public List<AspNetRolesMeta> GetRoles()
        {
            try
            {
                using (db = new ApplicationDbContext())
                {
                    List<AspNetRolesMeta> roles = new List<AspNetRolesMeta>();
                    var dbRoles = db.Roles.ToList();

                    foreach (var role in dbRoles)
                    {
                        roles.Add(new AspNetRolesMeta
                        {
                            Id = role.Id,
                            Name = role.Name
                        });
                    }
                    return roles;
                }
            }
            catch (Exception)
            {

                throw;
            }
        }


        public List<ApplicationUser> GetUsers()
        {
            using (db = new ApplicationDbContext())
            {
                var dbUsers = db.Users.ToList();
                List<ApplicationUser> users = new List<ApplicationUser>();

                foreach (var user in dbUsers)
                {
                    var result = new ApplicationUser
                    {
                        Id = user.Id,
                        FirstName = user.FirstName,
                        Address = user.Address,
                        City = user.City,
                        Country = user.Country,
                        Phone = user.Phone,
                        isActive = user.isActive,
                        Role =user.Role,
       
                    };
                    users.Add(result);

                }
                    return users;
            }

        }
    }
}

