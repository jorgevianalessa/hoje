const bcrypt = require('bcrypt-nodejs')
module.exports = app => {
    const { existsOrError,notExistsOrError,equalsOrError } = app.api.validation

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password,salt)
    }

    const save  = async (req,res) => {
        const user = {...req.body}
        if(req.params.id) user.id = req.params.id
       
        if(!req.originalUrl.startsWith('/users')) user.admin = false
        if(!req.user || !req.user.admin ) user.admin = false
        try{
            existsOrError(user.name,'Nome não informado')
            existsOrError(user.email,'E-mail não informado')
            existsOrError(user.password,'Senha não informada')
            existsOrError(user.confirmPassword,'Confirmação de senha inválida')
            equalsOrError(user.password,user.confirmPassword,
                     'Senhas incorretas"')
                           
            const userFromDB = await app.db('users')
                  .where({ email : user.email }).first()
                  if (!user.id) {
                      notExistsOrError(userFromDB,'Usuário já cadastrado')
                  } 
        }catch(msg){
             return res.status(400).send(msg)
        }
        // pode ser 'req.body.password
        user.password = encryptPassword(user.password)
        delete user.confirmPassword
         
        if(user.id){
             app.db('users')
                .update(user)
                .where({id: user.id})  
                .whereNull('deletedAt')
                .then(_ => res.status(204).send())
                .catch(err=> res.status(500).send(err))
        } else{
             app.db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }
      
    const get = (req,res) => {
        app.db('users')
           .select('id','name','email','admin')
           .whereNull('deletedAt')
           .then(users => res.json(users)) // nesse ponto faríamos as conversões com map
           .catch(err => res.status(500).send(err))
    }

    const getById = (req,res) => {
        app.db('users')
           .select('id','name','email','admin')
           .where({ id: req.params.id})  
           .whereNull('deletedAt')
           .first()
           .then(user => res.json(user)) // nesse ponto faríamos as conversões com map
           .catch(err => res.status(500).send(err))
    }

    const remove = async (req,res) => {
        // console.log('bom dia!')
        try{         
            existsOrError(req.params.id,'Código da categoria não informado.')
                  
            console.log(req.params.id + 'a')  
            const articles = await app.db('articles')
                where( { user_Id: req.params.id } ) 
                // notExistsOrError(articles,'Usuário possui artigos.')    
            if(!articles){    
               console.log(req.params.id + 'b')  
            } else{
                console.log('não há regsitro')
            }  
            const subcategory = await app.db('categories')
                .where({ parentId : req.body.id })
                notExistsOrError(subcategory,'Categoria possui subcategorias.')
                 
            
                  
            const rowsUpdated = await app.db('users')
                .update({ deletedAt: new Date()})
                .where({ id:req.params.id })
                existsOrError(rowsUpdated,'Usuário não encontrado.')     
                res.status(204).send()

        }catch(e){
             res.status(400).send(e)
        }
    }

    return { save , get , getById , remove }
}
