using DAL;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

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
                   // var tempId = user.Roles.FirstOrDefault(x => x.RoleId == x.UserId);
                    var result = new ApplicationUser
                    {
                        Id = user.Id,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Address = user.Address,
                        City = user.City,
                        Email = user.Email,
                        Country = user.Country,
                        Phone = user.Phone,
                        isActive = user.isActive,
                        Role = user.Role
                       
                      //  Role = user.Roles.FirstOrDefault(x=>x.RoleId ==  )
                        // = user.Roles.Fir.stOrDefault(x => x.RoleId == tempId)
                    };
                    users.Add(result);
                }
             
                    return users;
            }

        }



        public void DeleteUserFromDb(string Id)
        {
            try
            {
                using (db = new ApplicationDbContext())
                {
                    var userById = db.Users.Include(x=>x.Roles).FirstOrDefault(x => x.Id == Id);
                    db.Users.Remove(userById);
                  
                    db.SaveChanges();
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        public ApplicationUser EditDbUser(ApplicationUser user)
        {
            try
            {
                using (db = new ApplicationDbContext())
                {
                    var userById = db.Users.FirstOrDefault(x => x.Id == user.Id);
                     // var roles = db.Roles.ToList();
                    //    var roleById = db.Roles.FirstOrDefault(x => x.Name == user.Role);
                    //.Select(role => new AspNetRolesMeta
                    //{
                    //    Id = role.Id,
                    //    Name = role.Name
                    //})
                    //.FirstOrDefault(role => role.Id == user.Role);

                    // if (roleById.Id == user.RoleId)
                    //{
                    userById.Id = user.Id;
                    userById.FirstName = user.FirstName;
                    userById.LastName = user.LastName;
                    userById.Phone = user.Phone;
                    userById.Address = user.Address;
                    userById.Email = user.Email;
                    userById.isActive = user.isActive;
                    userById.Password = user.Password;
                    userById.City = user.City;
                    userById.Role = user.Role;

                    db.SaveChanges();
                   return userById;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}

