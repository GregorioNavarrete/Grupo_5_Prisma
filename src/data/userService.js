const path = require('path');
const fs = require('fs');
const bcryptjs = require('bcryptjs');
const db = require('../model/database/models');
const { log } = require('console');


const userService = {

    getData : async function () {
        try {
            return await db.User.findAll(
                {
                    include : [{association : 'Rols'}]
                });
        } catch (error) {
            
        }

    },

     getOne: async function(id){
        try {
             usuario = await db.User.findByPk(id,{
                include : [{association : 'Rols'}]
            });
             return  usuario;
            
        } catch (error) {
            
        }
        
    }, 

    findByPk: async function (id){
        try {
            let allUsers = await this.getData(); // Aquí se llama a la función
            let userFound = allUsers.find(oneUser => oneUser.id === id );
            return userFound;
        } catch (error) {
            
        }
    },

    findByField: async function (field, otrotext, text){
        try {
            let allUsers = await this.getData() 
            let userFound = allUsers.find(oneUser => oneUser[field] === text || oneUser[otrotext] === text);
            return userFound;
        } catch (error) {
            
        }
    },

    create : async function (req) {
        try {
            let password = bcryptjs.hashSync(req.body.password, 10)
            let imageFilename = req.file ? req.file.filename :  'default.png';
            let newUser = await db.User.create({
                id_fav : 1,
                id_rol:2,
                name : req.body.nombre,
                last_name : req.body.apellido,
                name_user: req.body.usuario,
                email: req.body.email,
                password: password,
                image: imageFilename 
            })
            return newUser
        } catch (error) {
    
        }
    },

     /* search: async  function(req){
        try {
            let allUsers = await this.getData()
            let searchUsers = req.query.search.toLowerCase();
            let results = [];
            for ( let i=0; i < allUsers.length;i++){
               if(allUsers[i].name.toLowerCase().includes(searchUsers) || allUsers[i].last_name.toLowerCase().includes(searchUsers)){
                results.push(allUsers[i])
              }
            }
            return results
            
        } catch (error) {
            
        }
      
    }, */ 
  
    edit: async function(req){
        try {
            let imageFilename = req.file ? req.file.filename :  req.session.userLogged.image;
            let user = await this.getOne(req.params.id)
            
            if (user.image != "default.png") {
                
                let borrar = path.join(__dirname, `../../public/img/users/${user.image}`);
                fs.unlink(borrar, (err) => {
                if (err) {
                console.error(err);
                return;
                }
                });
            }
    
            await db.User.update({
                name : req.body.nombre,
                last_name : req.body.apellido,
                name_user: req.body.usuario,
                email: req.body.email,
                image: imageFilename 
            },{where:{id_user:req.params.id}})
    
            let userToEdit = await db.User.findOne({where: {id_user: req.params.id}});
            req.session.userLogged = userToEdit; // Actualiza el usuario en la sesión
            return userToEdit;
        } catch (error) {
             // Esto permitirá que el error se maneje en tu controlador
        }
    },
    
     delete: async function (id) {
        try {

            let user = await this.getOne(id)
            
            if (user.image != "default.png") {
                
                let borrar = path.join(__dirname, `../../public/img/users/${user.image}`);
                fs.unlink(borrar, (err) => {
                if (err) {
                console.error(err);
                }
                });
            }

            
            return await db.User.destroy({
                where:{
                    id_user: id
                }
            })
            
            
        } catch (error) {
            console.log(error)
        }
    }, 

}

module.exports = userService;