#Fipe-Table-Select

**_work in progress_**

A plugin to implement the brazilian **FIPE table** [veiculos.fipe.org.br](http://veiculos.fipe.org.br/)  in any web page.

The plugin will use the api available at [fipeapi.appspot.com](http://fipeapi.appspot.com/) which returns json files based on parameters passed to the url.

##Functionality

The goal is to get a plugin that will allow users to do the following operations:

1. Select a vehicle type (cars, motorbikes or trucks).
2. Select a brand based on step 1.
3. Select a model based on step 2.
4. Select a vehicle year based on step 3.
5. Save/Send the data retrieved for further use.

##Features
+ Display brand logo (if available)
+ Single select element (if possible in an easy way)
+ Text input for manual search
+ Any step edition
+ Responsive

##Development
+ [Harpjs](http://harpjs.com/) as a local server and to compile
+ [Jade](http://jade-lang.com/) for the html
+ [Stylus](http://stylus-lang.com/) for the css
+ [jQuery](https://jquery.com/) (vanillajs on its way)
+ Tests (incoming)

##How to use
**Development** files are in the `app` folder

**Production** files are in the `app/www` folder
