using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DAL.Models;
using BusinessLogic;

namespace TestApp.Controllers
{
    public class UserManagementController : Controller
    {
        private MainBLL mainBLL = new MainBLL();
        // GET: User
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetUsers()
        {
            try
            {
                var jsonResult = mainBLL.GetUsers();
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public JsonResult RoleDropdown()
        {
            try
            {
                var roleDropdown = mainBLL.GetRoles();
                return Json(roleDropdown, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                throw;
            }
        }

    }
}