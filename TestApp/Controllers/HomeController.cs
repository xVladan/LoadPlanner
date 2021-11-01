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
    public class HomeController : Controller
    {
        private MainBLL mainBLL = new MainBLL();
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetJobs()
        {
            try
            {
                var jobs = mainBLL.GetJobs();
                return Json(jobs, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void AddJob(Job jobData)
        {
            try
            {
                mainBLL.AddJob(jobData);
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
                mainBLL.EditJob(jobData);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void DeleteJob(int Id)
        {
            mainBLL.DeleteJob(Id);
        }


    }
}