using System;
using System.Web;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Xml;
using System.Web.Hosting;

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
            var foods = new List<Food>(); 

            XmlDocument doc = new XmlDocument();
            doc.Load(HostingEnvironment.MapPath(@"~/App_Data/Food_Display_Table.xml"));

            foreach (XmlNode node in doc.DocumentElement.ChildNodes)
            {
                var f =   new Food();
                f.primaryKey = Guid.NewGuid();
                if (node["Food_Code"] != null) f.Food_Code = node["Food_Code"].InnerText ?? "Empty";
                if (node["Display_Name"] != null) f.Display_Name = node["Display_Name"].InnerText ?? "Empty";
                if (node["Portion_Default"] != null) f.Portion_Default = Convert.ToDouble(node["Portion_Default"].InnerText ?? "0.0");
                if (node["Portion_Amount"] != null) f.Portion_Amount = Convert.ToDouble(node["Portion_Amount"].InnerText ?? "0.0");
                if (node["Portion_Display_Name"] != null) f.Portion_Display_Name = node["Portion_Display_Name"].InnerText;
                if (node["Factor"] != null) f.Factor = Convert.ToDouble(node["Factor"].InnerText ?? "0.0");
                if (node["Increment"] != null) f.Increment = Convert.ToDouble(node["Increment"].InnerText ?? "0.0");
                if (node["Multiplier"] != null) f.Multiplier = Convert.ToDouble(node["Multiplier"].InnerText ?? "0.0");
                if (node["Grains"] != null) f.Grains = Convert.ToDouble(node["Grains"].InnerText ?? "0.0");
                if (node["Whole_Grains"] != null) f.Whole_Grains = Convert.ToDouble(node["Whole_Grains"].InnerText ?? "0.0");
                if (node["Vegetables"] != null) f.Vegetables = Convert.ToDouble(node["Vegetables"].InnerText ?? "0.0");
                if (node["Orange_Vegetables"] != null) f.Orange_Vegetables = Convert.ToDouble(node["Orange_Vegetables"].InnerText ?? "0.0");
                if (node["Drkgreen_Vegetables"] != null) f.Drkgreen_Vegetables = Convert.ToDouble(node["Drkgreen_Vegetables"].InnerText ?? "0.0");
                if (node["Starchy_vegetables"] != null) f.Starchy_vegetables = Convert.ToDouble(node["Starchy_vegetables"].InnerText ?? "0.0");
                if (node["Other_Vegetables"] != null) f.Other_Vegetables = Convert.ToDouble(node["Other_Vegetables"].InnerText ?? "0.0");
                if (node["Fruits"] != null) f.Fruits = Convert.ToDouble(node["Fruits"].InnerText ?? "0.0");
                if (node["Milk"] != null) f.Milk = Convert.ToDouble(node["Milk"].InnerText ?? "0.0");
                if (node["Meats"] != null) f.Meats = Convert.ToDouble(node["Meats"].InnerText ?? "0.0");
                if (node["Soy"] != null) f.Soy = Convert.ToDouble(node["Soy"].InnerText ?? "0.0");
                if (node["Drybeans_Peas"] != null) f.Drybeans_Peas = Convert.ToDouble(node["Drybeans_Peas"].InnerText ?? "0.0");
                if (node["Oils"] != null) f.Oils = Convert.ToDouble(node["Oils"].InnerText ?? "0.0");
                if (node["Solid_Fats"] != null) f.Solid_Fats = Convert.ToDouble(node["Solid_Fats"].InnerText ?? "0.0");
                if (node["Added_Sugars"] != null) f.Added_Sugars = Convert.ToDouble(node["Added_Sugars"].InnerText ?? "0.0");
                if (node["Alcohol"] != null) f.Alcohol = Convert.ToDouble(node["Alcohol"].InnerText ?? "0.0");
                if (node["Calories"] != null) f.Calories = Convert.ToDouble(node["Calories"].InnerText ?? "0.0");
                if (node["Saturated_Fats"] != null) f.Saturated_Fats = Convert.ToDouble(node["Saturated_Fats"].InnerText ?? "0.0");


                try
                {
                    foods.Add(f);
                }
                catch 
                {
                    Console.WriteLine("Could not get xml to parse");
                }
            }

            return foods;
        }
    }

}