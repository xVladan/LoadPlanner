using DAL;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

//using System.Web;
//using System.Web.Mvc;
//using BusinessLogic;
//using Microsoft.AspNet.Identity.Owin;
//using Microsoft.AspNet.Identity;
//using Microsoft.AspNetCore.Identity;



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


        public List<AspNetUsersMeta> GetUsers()
        {
            using (db = new ApplicationDbContext())
            { 
       
                var dbUsers = db.Users.ToList();

                List<AspNetUsersMeta> users = new List<AspNetUsersMeta>();

                foreach (var user in dbUsers)
                {
                    //  var tempId = user.Roles.FirstOrDefault(x => x.RoleId == x.UserId);
                    var result = new AspNetUsersMeta
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
                         RoleId = user.Roles.FirstOrDefault(role => role.UserId == user.Id).RoleId
                       //oleId = user.Roles.FirstOrDefault(x => x.UserId == user.Id)
                        // RoleId = tempId.RoleId

                        //Role = user.Role
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

  public  AspNetRolesMeta EditDbUser(AspNetUsersMeta user)
        {
            try
            {
                using (db = new ApplicationDbContext())
                {

                    var userById = db.Users.FirstOrDefault(x => x.Id == user.Id);
                    var roles = db.Roles.ToList();
                    var roleById = db.Roles
                        .Select(role => new AspNetRolesMeta
                        {
                            Id = role.Id,
                            Name = role.Name
                        })
                        .FirstOrDefault(role => role.Id == user.RoleId);

                    userById.Id = user.Id;
                    userById.FirstName = user.FirstName;
                    userById.LastName = user.LastName;
                    userById.Phone = user.Phone;
                    userById.Address = user.Address;
                    userById.Email = user.Email;
                    userById.isActive = user.isActive;
             //       userById.Password = user.Password;
                    userById.City = user.City;
                    //     userById.Role = user.Role;
                    

                  //db.Entry(user).State = EntityState.Detached;


                    db.SaveChanges();

                    //       db.SaveChanges();
                       return roleById;

                    //  db.Users.FirstOrDefault(x => x.Id == user.Id).Roles.FirstOrDefault(v => v.UserId == user.Id).RoleId = user.RoleId;

                }
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}

