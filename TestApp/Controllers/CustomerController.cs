using BusinessLogic;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TestApp.Controllers
{
    [Authorize]
    public class CustomerController : Controller
    {
        private MainBLL mainBLL = new MainBLL();
        // GET: Customer
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetCustomers()
        {
            try
            {
                var customerList = mainBLL.GetCustomers();
                return Json(customerList, JsonRequestBehavior.AllowGet);

            }
            catch (Exception)
            {

                throw;
            }
        }

        public void AddCustomer(Customer customerData )
        {
            try
            {
                mainBLL.AddCustomer(customerData);

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
                mainBLL.EditCustomer(customerData);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void DeleteCustomer(int Id)
        {
            try
            {
                mainBLL.DeleteCustomer(Id);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public JsonResult CustomerDropdown()
        {
            try
            {
                var dropdown = mainBLL.CustomerDropdown();
                return Json(dropdown, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                throw;
            }
        }

    }
}