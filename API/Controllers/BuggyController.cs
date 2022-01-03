using System;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        [HttpGet("not-found")]
        public ActionResult GetNotFound() {
            //return NotFound();
            return new NotFoundResult();
        }
        [HttpGet("bad-request")]
        public ActionResult GetBadRequests() {
            //return GetBadRequest(new ProblemDetails{Title="This is a bad request"});
            
            ProblemDetails problemDetails = new ProblemDetails();
            problemDetails.Title = "This is a bad request";

            //return GetBadRequest(problemDetails);
            //return BadRequest(new ProblemDetails{Title = "This is a bad request"});
            //return Status(400, "This is a bad request");
            //return BadRequestResult();
            
            var result = new BadRequestObjectResult(new { message = "400 Bad Request", currentDate = DateTime.Now });
            return result;
            
        }
        [HttpGet("unauthorised")]
        public ActionResult GetUnauthorised() {
            //return GetUnauthorised();
            return new UnauthorizedResult();
        }
        
        /*[HttpGet("validation-error")]
        public ActionResult GetValidationError() {
            ModelState.AddModelError("Problem1", "This is the first error");
            ModelState.AddModelError("Problem2", "This is the second errror");
            //return ValidationProblem();
            return ValidationProblemDetails();
        }*/

        [HttpGet("server-error")]
        public ActionResult GetServerError() {
            throw new Exception("This is a server error");
        }
    }
}