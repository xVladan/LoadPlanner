using DAL;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
    }
}
