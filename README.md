** Neighborhood Map **

=============

*Overview*
------

On this project I have created a website with a map showing some amazing places in **Florida**, if you decide to go there and have some fun.

The most important thing of creating this project is to apply many concepts related to the implementation of API's and the famous Knockout Javascript library.

I did a map which has names of places in Florida, and on the map I did a marker on those places, and by clicking on them you can see the small box with the name of places address of them and photos.

*Instructions*

--------

-- To see this project and to test it, you can go on my github page:

--

-- You can get it by clicking on "Download zip", and then extract on your computer, or by clicking "Clone or Download", and then on "Open in Desktop".

----------

How did I made it"

- I did a page responsive with bootstrap, I did two coloms: "col-md-4" and "col-md-8".
- On "col-md-4", you can search the place on empty box that you can see and then you can click on button "Search for it".
-Under the first list which is made Javascript, you can see another list which are the names for the same places but on this list you can click on them and you can see more information that I made a link by using <a href="https://en.wikipedia.org/wiki/....."> on Html File, all the information that you can read are from Wikipedia.

-Then on "col-md-8" it's a map, which showed the marker on the places, and by clicking on them you can see the name of the places, and the address of that places that I got by google.map, and under those you can see some photos of the places, and I made it by using ** Foursquare API**, and you can see on the list on class " placesLocations", under name, address and on the end is "fsID", which showes the number of every single places, I got this number by typing the name of the place on Foursquare website and after showing what I was searching for, I got the last numbers on the link on the page, and I put that number on the code which has the link: "https://api.foursquare.com/v2/venues/+places.fsID()....".
