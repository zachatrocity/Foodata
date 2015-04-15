using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Xml;

namespace Foodata.Models
{
    public class FoodataContextInitializer : DropCreateDatabaseIfModelChanges<FoodataContext>
    {
        // Put initial data into the database
        protected override void Seed(FoodataContext context)
        {
            GetFoods().ForEach(s => context.Foods.Add(s));
        }

        private static List<Food> GetFoods()
        {
            var foods = new List<Food> {
            new Food { 
                Food_Code = 12350000,
                Display_Name = "Sour cream dip",
                Portion_Default = 1.00000,
                Portion_Amount = .25000,
                Portion_Display_Name = "cup ",
                Factor = .25000,
                Increment = .25000,
                Multiplier = 1.00000,
                Grains = .04799,
                Whole_Grains = .00000,
                Vegetables = .04070,
                Orange_Vegetables = .00000,
                Drkgreen_Vegetables = .00000,
                Starchy_vegetables = .00000,
                Other_Vegetables = .04070,
                Fruits = .00000,
                Milk = .00000,
                Meats = .00000,
                Soy = .00000,
                Drybeans_Peas = .00000,
                Oils = .00000,
                Solid_Fats = 105.64850,
                Added_Sugars = 1.57001,
                Alcohol = .00000,
                Calories = 133.65000,
                Saturated_Fats = 7.36898 }
        };

            return foods;
        }
    }

}