/*Es para gestionar todo el manejo de mis productos, para no tener
toda la logica en el "productController" y no ser muy grande
*/


const fs = require('fs');
const path = require('path');
//const upload = require('../middlewares/multer');





/*****Es para pasar el JASON a un arreglo de objetos y poder manipularlo ******/
const productsFilePath = path.join(__dirname, '../data/products.json');



const productService = {

    //es un atributo que tiene todos los productos en un Arrglo de objetos
    products:JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')),

    getAll: function(){
        return this.products;    
    },
    save : function(req){
        if (req.file !== undefined) {
            //le paso todo el req al back
            let product = req.body;
            let imagen = req.file;
            product.portada = imagen.filename;//no me reconose el filename

            //ME BUSCA EL OBJ, CON EL id MAS GRANDE
            let mayorID = this.products.reduce((maxID, Obj) => {
                if (Obj.id > maxID.id) {
                    return Obj;
                } else {
                    return maxID;
                }
                });
            product.id = mayorID.id+1;
            //Lo agrego al nuevo producto al arreglo de OBJ de productos
            this.products.push(product);
            //re escribimos el JSON anterio por el nuevo con mi nuevo producto
            fs.writeFileSync(productsFilePath,JSON.stringify(this.products),'utf-8');
        } else {            
            let product = req.body;
            //como no se puede poner null, los deja sin campo image
            //let imagen = "null";  con string traba el html 
            product.portada = 0;

            //ME BUSCA EL OBJ, CON EL id MAS GRANDE
            let mayorID = this.products.reduce((maxID, Obj) => {
                if (Obj.id > maxID.id) {
                    return Obj;
                } else {
                    return maxID;
                }
                });
            product.id = mayorID.id+1;
            this.products.push(product);
            fs.writeFileSync(productsFilePath,JSON.stringify(this.products),'utf-8');
        }
    },

    getOne: function(id){
        product = this.products.find((elem)=>elem.id == id);
            return product;
    },

    delete: function(id){
        indice = this.products.findIndex((elem)=>elem.id == id);
        this.products.splice(indice,1);
        fs.writeFileSync(productsFilePath,JSON.stringify(this.products),'utf-8');
    },
    edit: function(req){
        let producto = this.getOne(req.params.id);
        let nuevoProducto = req.body; // es porque el PUT viaja de forma privada
        let imagen = req.file;  //esto lo copie del Crear libro, para la imagen

        producto.titulo = nuevoProducto.titulo;
        producto.precio = nuevoProducto.precio;
        producto.genero = nuevoProducto.genero ;
        producto.autor = nuevoProducto.autor;
        producto.Estrellas = nuevoProducto.Estrellas;

        console.log("\n  antes : " + producto.portada);
        let borrar = path.join(__dirname, `../../public/img/portadas/${producto.portada}`);
        fs.unlink(borrar, (err) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log("\n  medio : " + producto.portada);
        });
        

    
    
        
        producto.descripcion = nuevoProducto.descripcion;
        if (req.file != undefined) {
            //no puedo esditar imagenes, xq el filename sale indefinido siempre !!!!
            producto.portada = imagen.filename;
        }else{
            producto.portada = 0;
        }

        console.log("\n  despues : " + imagen.filename);
        

        let indece = this.products.findIndex(elem => elem.id == req.params.id);
        this.products[indece]= producto;
    
        fs.writeFileSync(productsFilePath,JSON.stringify(this.products),'utf-8');
    },
    seach : function(req){
        //el "req.query" es el objeto que manda el GET 
        let buscar = req.query.Buscar;

        let buscados =[];

        for(let i=0;i<this.products.length;i++){
            if (this.products[i].titulo.includes(buscar)){
                //SI LA PALABRA ESTA CONTENIDA, GUARDARA EL ELEMENTO 
                buscados.push(this.products[i]);
            }
        }
        return buscados;
    },

    filter : (req, res) => {
        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        let generos = req.query.genero;
        let autores = req.query.autor;
        let formato = req.query.formato;
        let editorial = req.query.editoriales; 

        let filtrados=[];
        
    
        for(let i=0; i < products.length;i++ ){
          if(products[i].genero == generos   || products[i].autor == autores || products[i].formato == formato || products[i].editorial == editorial ){
                filtrados.push(products[i]);
                
          }
          
        }
        if(filtrados.length==0){
          res.render("products/noResult");
        }
        else{
          res.render('products/filtrados',{newObject:filtrados});
        }
              //res.send(autores)
              //res.render('products/filtrados', {newObject: filtrados});
        },
        
        
        detail:(req, res) => {
          let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
          let idLibro = req.params.idLibro;
          let product = products.find(product => product.id == idLibro);
          res.render('products/productDetail', {product:product})
        },

        catg:(req,res) => {
            let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
            let catg = Object.keys(req.query)[0];
            
            
            let newCatg=[];

            for(let i=0; i < products.length; i++){
                if(products[i].genero.includes(catg)){
                   newCatg.push(products[i])
                }
                
            }
            

            res.render('products/categoria',{newCatg:newCatg})
        }
    

}

module.exports = productService;