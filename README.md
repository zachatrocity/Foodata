# Foodata
A asp.net web api/front end to show interaction with food data from data.gov

Zach Russell and Brock McFarland
			Present
Foodata

#install:

clone: https://github.com/zachatrocity/Foodata

start in visual studio

#web service calls:
GET api/Food
GET api/Food?refine=sassyfats
GET api/Food?refine=calcounter
GET api/Food/5
PUT api/Food/5
POST api/Food
DELETE api/Food/5

#issues
No bugs that we know of.

#libraries
toastr (https://github.com/CodeSeven/toastr)
bootstrap (http://getbootstrap.com/)
animate.css (http://daneden.github.io/animate.css/)
Hint.css (http://kushagragour.in/lab/hint/)
jquery

#teamwork
Zach:
	Built the home, sassyfats, and calcounter pages. Created the base/skeleton of the fuzzy search on the home page.
	Built the animations using animate.css
Brock:
	Build the update, and create pages. Enhanced the fuzzy search algorithm by adding a ranking system to sort
	the results	in a way that makes sense. 
Both:
	Initialized the Entity database and the seed function, created the architecture/skeleton of the app.

(50%, 50%) 
 
 