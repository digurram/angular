using ang4api.DBContext;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using System.Diagnostics;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.IO;
using System.Web.Hosting;
using System;

namespace ang4api.api
{

    [RoutePrefix("api/Ticketapi")]
    [Authorize(Roles = "Admin,BasicUser")]
    public class TicketapiController : BaseAPIController
    {
        #region "Basic data"
        [HttpGet]
        public HttpResponseMessage Get()
        {
            var _lstticket = from t in TicketDB.Tickets
                             join um in TicketDB.UserMasters on t.CreatedBy equals um.UserId
                             join pm in TicketDB.PriorityMasters on t.PriorityId equals pm.PriorityId
                             join am in TicketDB.ApplicationMasters on t.ApplicationId equals am.ApplicationId
                             join um2 in TicketDB.UserMasters on t.AssignedTo equals um2.UserId
                             join st in TicketDB.StatusMasters on t.StatusId equals st.StatusId
                             join tp in TicketDB.TypeMasters on t.TypeId equals tp.TypeId
                             select new { t.TicketId, t.Title, t.Createddate, pm.PriorityDescription, createdby = um.LName + ", " + um.FName, am.ApplicationName, AssignedTo = um2.LName + ", " + um2.FName, status = st.StatusDescription,tkttype= tp.TypeDescription };

            return ToJson(_lstticket);
        }

        [HttpPut, Route("Updateticket/{id}")]
        public HttpResponseMessage Put(int id, [FromBody]Ticket value)
        {
            Ticket _ticket = new Ticket() { TicketId = id, Title = value.Title, TDescription = value.TDescription, CreatedBy = value.CreatedBy, StatusId = value.StatusId, Createddate = value.Createddate, AssignedTo = value.AssignedTo, PriorityId = value.PriorityId, TypeId = value.TypeId, ApplicationId = value.ApplicationId, ModuleID = value.ModuleID, ResponseDeadline = value.ResponseDeadline, ResolutionDeadline = value.ResolutionDeadline, RootCauseId = value.RootCauseId, Coommnets = value.Coommnets, UpdatedBy = value.UpdatedBy, LastModifiedon = value.LastModifiedon };
            if (_ticket.TicketId == 0)
            {
                TicketDB.Tickets.Add(_ticket);
            }
            else
            {
                TicketDB.Entry(_ticket).State = System.Data.Entity.EntityState.Modified;
            }
            return ToJson(TicketDB.SaveChanges());
        }

        [HttpGet]
        [Route("{id}")]
        public HttpResponseMessage Get(int id)
        {
            return ToJson(
                from t in
                TicketDB.Tickets
                where t.TicketId == id
                select new { t.TicketId, t.Title, t.TDescription, t.CreatedBy, t.StatusId, t.Createddate, t.AssignedTo, t.PriorityId, t.TypeId, t.ApplicationId, t.ModuleID, t.ResponseDeadline, t.ResolutionDeadline, t.RootCauseId, t.Coommnets, t.UpdatedBy, t.LastModifiedon }
                );
        }

        [HttpGet]
        [Route("AppMaster")]
        public HttpResponseMessage AppMaster()
        {
            return BAppMaster();
        }

        [HttpGet]
        [Route("ModuleMaster")]
        public HttpResponseMessage ModuleMaster()
        {
            return BModuleMaster();
        }

        [HttpGet]
        [Route("PriorityMaster")]
        public HttpResponseMessage PriorityMaster()
        {
            return BPriorityMaster();
        }

        [HttpGet]
        [Route("StatusMaster")]
        public HttpResponseMessage StatusMaster()
        {
            return BStatusMaster();
        }

        [HttpGet]
        [Route("UserMaster")]
        public HttpResponseMessage UserMaster()
        {
            return BUserMaster();
        }

        [HttpGet]
        [Route("TypeMaster")]
        public HttpResponseMessage TypeMaster()
        {
            return BTypeMaster();
        }
        #endregion

        #region "file upload"
        
        [HttpPost,Route("Uploadattachments")]
        public async Task<HttpResponseMessage> PostFormDataAsync()
        {
            #region "Commented code"
            /*
            // Check if the request contains multipart/form-data.
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            string root = HttpContext.Current.Server.MapPath("~/App_Data");
            var provider = new MultipartFormDataStreamProvider(root);

            try
            {
                // Read the form data.
                await Request.Content.ReadAsMultipartAsync(provider);

                // This illustrates how to get the file names.
                foreach (MultipartFileData file in provider.FileData)
                {
                    Log.Debug(file.Headers.ContentDisposition.FileName);
                    Log.Debug("Server file path: " + file.LocalFileName);
                }
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (System.Exception e)
            {
                Log.Debug(e.Message);
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }

            */
            #endregion
            string diskFolderPath= HttpContext.Current.Server.MapPath("~/App_Data");
            var path = Path.GetTempPath();

            if (!Request.Content.IsMimeMultipartContent("form-data"))
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.UnsupportedMediaType));
            }

            MultipartFormDataStreamProvider streamProvider = new MultipartFormDataStreamProvider(path);

            await Request.Content.ReadAsMultipartAsync(streamProvider);

            foreach (MultipartFileData fileData in streamProvider.FileData)
            {
                string fileName = "";
                if (string.IsNullOrEmpty(fileData.Headers.ContentDisposition.FileName))
                {
                    fileName = Guid.NewGuid().ToString();
                }
                fileName = fileData.Headers.ContentDisposition.FileName;
                if (fileName.StartsWith("\"") && fileName.EndsWith("\""))
                {
                    fileName = fileName.Trim('"');
                }
                if (fileName.Contains(@"/") || fileName.Contains(@"\"))
                {
                    fileName = Path.GetFileName(fileName);
                }

                var newFileName = Path.Combine( diskFolderPath, fileName);
                var fileInfo = new FileInfo(newFileName);
                if (fileInfo.Exists)
                {
                    fileName = fileInfo.Name.Replace(fileInfo.Extension, "");
                    fileName = fileName + (new Random().Next(0, 10000)) + fileInfo.Extension;

                    newFileName = Path.Combine(HostingEnvironment.MapPath(diskFolderPath), fileName);
                }

                if (!Directory.Exists(fileInfo.Directory.FullName))
                {
                    Directory.CreateDirectory(fileInfo.Directory.FullName);
                }


                File.Move(fileData.LocalFileName, newFileName);

                return ToJson(new { link = diskFolderPath + fileName });
            }
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        #endregion
    }
}