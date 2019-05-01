const jwt = require('jsonwebtoken');
module.exports ={
    checkToken: (req) =>{
        return new Promise((resolve, reject)=> {
            const jwksClient = require("jwks-rsa");
            const client = jwksClient({
              jwksUri: process.env.JWK
            });
            let token = req.headers['authorization']
            if(!token){
                reject(new Error('Token required'))
                return
            }
            token = token.replace('Bearer ', '');

            function getKey(header, callback) {
              client.getSigningKey(header.kid, function(err, key) {
                var signingKey = key.publicKey || key.rsaPublicKey;
                callback(null, signingKey);
              });
            }    
            jwt.verify(token, getKey, function(err, decoded) {
              if (err) reject(err); 
              resolve(decoded);
            });
        })
    }
}