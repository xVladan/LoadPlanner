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
    public class DockController : Controller
    {
        private MainBLL mainBLL = new MainBLL();
        // GET: Dock
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetDocks()
        {
            try
            {
                var dock = mainBLL.GetDocks();
                return Json(dock, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void AddDock(Dock dockData)
        {
            try
            {
                mainBLL.AddDock(dockData);
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
                mainBLL.EditDock(dockData);
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
                mainBLL.DeleteDock(Id);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public JsonResult DockDropdown()
        {
            try
            {
                var dropdown = mainBLL.DockDropdown();
                return Json(dropdown, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                throw;
            }
        }

    }
}