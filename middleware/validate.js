const jwt = require('jsonwebtoken');
const { User } = require('../models/index');
module.exports = function(req, res, next){
	if(req.method == 'OPTIONS'){
	     next()
	}else{
          let token = req.headers.authorization;
          if(!token) return res.status(403).send({ auth: false, message: 'No token provided.' });
          else{
               jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                    if(decoded){
                         User.findOne(
                              {
                                   Where: {
                                        id: decoded.id
                                   }
                              }
                         ).then(user => {
                              req.user = user;
                              next();
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