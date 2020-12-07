const jwt = require('jsonwebtoken');
const { User } = require('../models/index');
module.exports = function(req, res, next){
	if(req.method == 'OPTIONS'){
	     return next()
	}else{
          let token = req.headers.authorization;
          if(!token) return res.status(403).send({ auth: false, message: 'No token provided.' });
          else{
               jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                    var userId = decoded.id;
                    if(decoded){
                         User.findOne(
                              {
                                   where: {
                                        id: userId
                                   }
                              }
                         ).then(user => {
                              req.user = user;
                              return next();
                         },
                         function(){
                              res.status(401).send({error: 'Not authorized'});
                         });
                    }else{
                         res.status(400).send({error: 'Not authorized'});
                    }
		     });
	     }
	}
}