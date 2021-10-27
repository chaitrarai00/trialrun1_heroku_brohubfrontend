const {verify}=require("jsonwebtoken");
/***
 * A middleware for Authentication
 * grab the token through the content/ frontend it sent
 * validate using jwt verify funtion
 * verify and see if its valid
 * if valid continue with the request and send to database
 * if not valid return any error
 * */
// next is a function to be called for request to move forward


const validateToken= (req, res, next)=>{
    const accessToken = req.header("accessToken");
    
    if(!accessToken) {
        return res.json({error:"User not logged in!"});
    }

    try{
        const validToken= verify(accessToken, "importantsecret");
        //valid token is an object who is authenticated 

        req.user=validToken;//grabbing the authentiacted user for access in the req
        //check for the authenticated object
        if(validToken){
            return next();
        }
    }catch(err){
        return res.json({error: err});
    }
}


module.exports={validateToken};