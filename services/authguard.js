const loginModel = require('../models/login')

let authguard = async(req,res,next)=>{
    let user = await loginModel.findOne({_id: req.session.userId})
    if (user) {
        next()
    }else{
        res.redirect('/projects')
    }
}

module.exports = authguard