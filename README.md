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

##Demos
+ Barebone
+ Styled with brands logos
+ Styled single element with logos and search input

##Development
+ [Harpjs](http://harpjs.com/) as a local server and to compile
+ [Jade](http://jade-lang.com/) for the html
+ [Stylus](http://stylus-lang.com/) for the css
+ [jQuery](https://jquery.com/) (vanillajs on its way)
+ Tests (incoming)

##How to use
**Development** files are in the `app` folder

1. In terminal, run `harp server` at root
2. Open `http://localhost:9000/app/` in browser
3. In terminal, run `harp compile` in `app` folder to compile the project

**Production** files are in the `app/www` folder

1. Html in `index.html`
2. Javascript in `app.js` (add jQuery if needed)
3. Css in `main.css`

##Roadmap

+ Test bikes type
+ Test trucks type
+ Allow edition
+ Vanilla Js version
+ Include tests
+ Styled demos
+ All-in-one element
