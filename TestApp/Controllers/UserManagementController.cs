using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DAL.Models;
using BusinessLogic;
using DAL;
using Microsoft.AspNet.Identity.Owin;

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
        
       
        public JsonResult DeleteUser(string Id)
        {
            try
            {
                mainBLL.DeleteUserFromDb(Id);
                return Json("success");
            }
            catch (Exception)
            {

                throw;
            }
        }

        
        
        [HttpPost]
        public void EditUser(AspNetUsersMeta editData)
        {
            try
            {

                ApplicationUserManager userManager = HttpContext.GetOwinContext().Get<ApplicationUserManager>();
                var role = mainBLL.EditDbUser(editData);
                userManager.AddToRoleAsync(editData.Id, role.Name);
            }
            catch (Exception)
            {

                throw;
            }
        }



    }
}