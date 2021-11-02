using BusinessLogic.DTO;
using DAL;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

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


        /// Customer
        public List<Customer>GetCustomers()
        {
            try
            {
                using (db = new ApplicationDbContext())
                {
                    var customers = db.Customer.ToList();
                    return customers;
                }

            }
            catch (Exception)
            {

                throw;
            }
        }

        public void AddCustomer(Customer PostData)
        {
            try
            {
                using (db = new ApplicationDbContext())
                {
                    db.Customer.Add(PostData);
                    db.SaveChanges();
                }

            }
            catch (Exception)
            {

                throw;
            }
        }

        public void EditCustomer(Customer customerData)
        {
            try
            {
                using (db = new ApplicationDbContext())
                {
                    var customerId = db.Customer.FirstOrDefault(x => x.Id == customerData.Id);
                    customerId.FirstName = customerData.FirstName;
                    customerId.LastName = customerData.LastName;
                    customerId.Address = customerData.Address;
                    customerId.City = customerData.City;
                    customerId.Country = customerData.Country;
                    customerId.Phone = customerData.Phone;
                    customerId.isActive = customerData.isActive;
                    db.SaveChanges();
                }    
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void DeleteCustomer (int Id)
        {
            try
            {
                using (db = new ApplicationDbContext())
                {
                    var deleteById = db.Customer.FirstOrDefault(x => x.Id == Id);
                    db.Customer.Remove(deleteById);
                    db.SaveChanges();
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<GenericDropdown> CustomerDropdown()
        {
            try
            {
                using (db = new ApplicationDbContext())
                {
                    var dropList = db.Customer.Select(p => new GenericDropdown()
                    {
                        id = p.Id,
                        text = p.FirstName + " " + p.LastName,
                    }).OrderBy(x => x.id).ToList();

                    return dropList;
                }
            }
            catch (Exception)
            {

                throw;
            }
        }


        ///Transport Status
        public List<TransportStatus>GetStatus()
        {
            try
            {
                using (db = new ApplicationDbContext())
                {
                    var status = db.TransportStatus.ToList();
                    return status;
                }

            }
            catch (Exception)
            {

                throw;
            }
        }

        public void AddStatus(TransportStatus statusData)
        {
            try
            {
                using (db = new ApplicationDbContext())
                {
                    db.TransportStatus.Add(statusData);
                    db.SaveChanges();
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void EditStatus(TransportStatus statusData)
        {
            try
            {
                using (db = new ApplicationDbContext())
                {
                    var statusId = db.TransportStatus.FirstOrDefault(x => x.Id == statusData.Id);
                    statusId.Status = statusData.Status;
                    statusId.Description = statusData.Description;
                    db.SaveChanges();
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void DeleteStatus(int Id)
        {
            try
            {
                using (db = new ApplicationDbContext())
                {
                    var deleteById = db.TransportStatus.FirstOrDefault(x => x.Id == Id);
                    db.TransportStatus.Remove(deleteById);
                    db.SaveChanges();
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<GenericDropdown> StatusDropdown()
        {
            try
            {
                using (db = new ApplicationDbContext())
                {
                    var dropList = db.TransportStatus.Select(p => new GenericDropdown()
                    {
                        id = p.Id,
                        text = p.Status,
                    }).OrderBy(x => x.id).ToList();

                    return dropList;
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        ///Dock
        public List<Dock> GetDocks()
        {
            try
            {
                using (db = new ApplicationDbContext())
                {
                    var dock = db.Dock.ToList();
                    return dock;
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void AddDock(Dock postData)
        {
            try
            {
                using (db = new ApplicationDbContext())
                {
                    db.Dock.Add(postData);
                    db.SaveChanges();
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void EditDock(Dock dockData)
        {
            try
            {
                using (db = new ApplicationDbContext())
                {
                    var dockId = db.Dock.FirstOrDefault(x => x.Id == dockData.Id);
                    dockId.DockName = dockData.DockName;
                    db.SaveChanges();
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void DeleteDock(int Id)
        {
            try
            {
                using (db = new ApplicationDbContext())
                {
                    var deleteById = db.Dock.FirstOrDefault(x => x.Id == Id);
                    db.Dock.Remove(deleteById);
                    db.SaveChanges();
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<GenericDropdown> DockDropdown()
        {
            try
            {
                using (db = new ApplicationDbContext())
                {
                    var dropList = db.Dock.Select(p => new GenericDropdown()
                    {
                        id = p.Id,
                        text = p.DockName,
                    }).OrderBy(x => x.id).ToList();

                    return dropList;
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        ///Job
        public List<Job> GetJobs()
        {
            try
            {
                using (db = new ApplicationDbContext())
                {
                    var jobs = db.Job
                        //.Include("TransportStatusId")
                        //.Include("CustomerId")
                        //.Include("DockId")
                        .ToList();
                    return jobs;
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void AddJob(Job postData)
        {
            try
            {
                using (db = new ApplicationDbContext())
                {
                    db.Job.Add(postData);
                    db.SaveChanges();
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void EditJob(Job jobData)
        {
            try
            {
                using (db = new ApplicationDbContext())
                {
                    var jobId = db.Job.FirstOrDefault(x => x.Id == jobData.Id);
                    jobId.LoadNo = jobData.LoadNo;
                    jobId.TransportStatusId = jobData.TransportStatusId;
                    jobId.CustomerId = jobData.CustomerId;
                    jobId.DockId = jobData.DockId;
                    jobId.NoOfPallets = jobData.NoOfPallets;
                    jobId.LoadType = jobData.LoadType;
                    jobId.ArrivalTime = jobData.ArrivalTime;
                    jobId.DockOn = jobData.DockOn;
                    jobId.DockOff = jobData.DockOff;
                    db.SaveChanges();
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void DeleteJob(int Id)
        {
            try
            {
                using (db = new ApplicationDbContext())
                {
                    var deleteById = db.Job.FirstOrDefault(x => x.Id == Id);
                    db.Job.Remove(deleteById);
                    db.SaveChanges();
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

