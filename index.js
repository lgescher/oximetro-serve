var express =require("express");
var cors = require("cors");
var corsOptions = {origin:"*",optionSucessStatus:200};
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors(corsOptions));


var aplicaciones =[

    {"id": "1",
    "paciente": "Juan Corrales",
    "idoximetro": "003",
    "fechaInicio": "2019-10-26", 
    "hora": "12:07:24",
    "oxigenacion": 91.03,
    "latitud": -31.805608,
    "longitud": -60.513535,
    "calibracion": "Requiere"}
,
   
    {"id": "2",
    "paciente": "Joana Bosh",
    "idoximetro": "029",
    "fechaInicio": "2020-02-16", 
    "hora": "12:07:24",
    "oxigenacion": 96.00,
    "latitud": -31.825392, 
    "longitud": -60.520627,
    "calibracion": "No requiere"}
,

    {"id": "3",
    "paciente": "Pedro Vargas",
    "idoximetro": "017",
    "fechaInicio": "2020-05-27", 
    "hora": "12:07:24",
    "oxigenacion": 92.11,
    "latitud": -32.068746, 
    "longitud": -60.636835,
    "calibracion": "No requiere"}
,
    {"id": "4",
    "paciente": "Belen Martines",
    "idoximetro": "009",
    "fechaInicio": "2019-10-05", 
    "hora": "12:07:24",
    "oxigenacion": 89.04,
    "latitud": -32.030020,
    "longitud": -60.311900,
    "calibracion": "Requiere"}

]
  
var id =20;

app.get("/aplicaciones",function(req,res){
   setTimeout(function(){
    res.send(aplicaciones);    

        return;
    }, 2000);
   
   
    
});

app.get("/aplicaciones/:id",function(req,res){
  console.log(req.params.id);
  setTimeout(function(){
  if(req.params.id>0){
      var aplicacion={};
       aplicaciones.forEach(item=>{
    
        if(item.id==req.params.id){
        
          aplicacion= item;
         
        }
      });
      res.send(aplicacion);
      return; 
     
    }else{
        res.send({'type': 'error'});
        return; 
    }
  }, 1000);
});




app.post("/login",function(req,res){
    setTimeout(function(){
        console.log("Llego al servidor "+JSON.stringify(req.body));
        if(req.body.email!=undefined && req.body.password!=undefined){
            if(req.body.email==="user"&&req.body.password==="1234"){
                console.log("Sale del servidor "+"{'type': 'User'}")
                res.send({'type': 'User'});    
            }else if(req.body.email==="admin"&&req.body.password==="1234"){
                console.log("Sale del servidor "+"{'type': 'Admin'}")
                res.send({'type': 'Admin'});    
            }else{
                console.log("Sale del servidor "+"{'type': 'error'}")
                res.send({'type': 'error'});
            }
            return;
        }
        console.log("Sale del servidor "+"{'type': 'error'}")
        res.send({'type': 'error'});
    },2000);
    
});


app.post("/aplicaciones",function(req,res){
  console.log(req.body);
    setTimeout(function(){
        if((req.body.paciente!= undefined&&req.body.paciente!= "") &&(req.body.idoximetro!= undefined&&req.body.idoximetro!= "") 
      ){
     
      id = id +1;
       
      
      var data = {
		"id":id,
		"paciente":req.body.paciente,
		"idoximetro":req.body.idoximetro,
		"fechaInicio":req.body.fechaInicio,
		"hora":req.body.hora,
		"oxigenacion":req.body.oxigenacion,
"latitud":req.body.latitud,
"longitud":req.body.longitud,
"calibracion":req.body.calibracion};
        productos.push(data);
                res.send(data);    
     
            return;
        }
        res.send({'type': 'error'});
    },2000);
    
});

app.put("/aplicaciones/:id",function(req,res){
  console.log(req.params.id);
    setTimeout(function(){
        
       console.log(req.body);

        if((req.body.paciente!= undefined&&req.body.paciente!= "") &&(req.body.idoximetro!= undefined&&req.body.idoximetro!= "") 
      ){
  
        
        for(var i =0;i<aplicaciones.length;i++){
          if(req.params.id== aplicaciones[i].id){
            console.log("Atualiza")
            aplicaciones[i].paciente=req.body.paciente;
            aplicaciones[i].idoximetro=req.body.idoximetro;            aplicaciones[i].fechaInicio=req.body.fechaInicio;            aplicaciones[i].hora=req.body.hora;			aplicaciones[i].oxigenacion=req.body.oxigenacion;
	aplicaciones[i].latitud=req.body.latitud;
	aplicaciones[i].longitud=req.body.longitud;
	aplicaciones[i].calibracion=req.body.calibracion;
              
		res.send(req.body);    
              return;
          }
        }
    
        }
        res.send({'type': 'error'});
    },2000);
    
});



app.delete("/aplicaciones/:id",function(req,res){
  console.log(req.params.id);
    setTimeout(function(){
        
       console.log(req.params.id);
        if(req.params.id!= undefined){
  
      for(var i =0;i<aplicaciones.length;i++){
          if(req.params.id== aplicaciones[i].id){
            aplicaciones.splice(i,1);
          var data = {"type":"ok"};
              res.send(data);    
              return;
          }
        }
      
      

        }
        res.send({'type': 'error'});
    },2000);
    
});

app.listen(3000,function(){
    console.log("Api en el puerto 3000");
});