using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.Web;

namespace Foodata.Models
{
    public class Food
    {
        [Key]
        public Guid primaryKey { get; set; }
        public string Food_Code { get; set; }
        public string Display_Name { get; set; }
        public double Portion_Default { get; set; }
        public double Portion_Amount { get; set; }
        public string Portion_Display_Name { get; set; }
        public double Factor { get; set; }
        public double Increment { get; set; }
        public double Multiplier { get; set; }
        public double Grains { get; set; }
        public double Whole_Grains { get; set; }
        public double Vegetables { get; set; }
        public double Orange_Vegetables { get; set; }
        public double Drkgreen_Vegetables { get; set; }
        public double Starchy_vegetables { get; set; }
        public double Other_Vegetables { get; set; }
        public double Fruits { get; set; }
        public double Milk { get; set; }
        public double Meats { get; set; }
        public double Soy { get; set; }
        public double Drybeans_Peas { get; set; }
        public double Oils { get; set; }
        public double Solid_Fats { get; set; }
        public double Added_Sugars { get; set; }
        public double Alcohol { get; set; }
        public double Calories { get; set; }
        public double Saturated_Fats { get; set; }
    }
}