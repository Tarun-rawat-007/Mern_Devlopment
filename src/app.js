const express =require("express"); // Importing the Express framework
const app=express(); // Creating an Express application instance
const hbs=require("hbs");  // Importing Handlebars
const path=require("path");  
const port=process.env.PORT  || 3000 ;  // Setting the port for the server to listen on
require("./db/conn");             // Connecting to the database
const Resgister =require("./models/registers");   // Importing the Register model



// Setting up paths for static files,views , templates, and partials
const static_path=path.join(__dirname,"../public");
const template_path=path.join(__dirname,"../templates/views");
const partials_path=path.join(__dirname,"../templates/partials");


// console.log(path.join(__dirname,"../public"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);



app.get("/",(req, res) =>{
    res.render("index");    // Rendering the 'index' template when the root URL is accessed

});

app.get("/register",(req,res)=>{
    res.render("register");          // Rendering the 'register' template when '/register' URL is accessed

})
// create  a new user  in our database
app.post("/register",async(req,res)=>{
  try{
   
 // Creating a new instance of the Register model with data from the request body
    const registerEmployee = new Resgister({
      name:req.body.name,
      number:req.body. number,
      email:req.body.email,
      country:req.body.country,
      message:req.body.message,
    })


    
   // Saving the new user to the database
   const registered= await registerEmployee.save();


  // Rendering the 'index' template upon successful registration
   res.status(201).render("index");

  }catch(error){
    res.status(400).send(error);
  }
})


// Starting the server and listening on the specified port
app.listen(port, ()=>{
    console.log(`server is running at port no ${port}`);
})