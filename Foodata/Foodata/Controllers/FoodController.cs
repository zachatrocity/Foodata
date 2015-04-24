using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Foodata.Models;

namespace Foodata.Controllers
{
    public class FoodController : ApiController
    {
        private FoodataContext db = new FoodataContext();

        // GET api/Food
        public IEnumerable<Food> GetFoods()
        {
            return db.Foods.AsEnumerable();
        }

        // GET api/Food/5
        public Food GetFood(Guid id)
        {
            Food food = db.Foods.Find(id);
            if (food == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return food;
        }

        // PUT api/Food/5
        public HttpResponseMessage PutFood(Guid id, Food food)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != food.primaryKey)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(food).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        // POST api/Food
        public HttpResponseMessage PostFood(Food food)
        {
            food.primaryKey = Guid.NewGuid();

            if (ModelState.IsValid)
            {
                db.Foods.Add(food);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, food);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = food.Food_Code }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/Food/5
        public HttpResponseMessage DeleteFood(Guid id)
        {
            Food food = db.Foods.Find(id);
            if (food == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Foods.Remove(food);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, food);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}