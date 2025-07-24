import jwt from "jsonwebtoken";

//middleware funtion to decod jwt token to get clerkID

const authUser = (req, res, next) => {
    const token = req.headers.authorization;
    
    try {
         const {token} = req.headers;
        if (!token) {
            return res.json({success:false, message: "No authorized provided provided" });
        }

        const token_decode = jwt.decode(token); 
        req.body.clerkId = token_decode.clerkId;
        next();
    } catch (error) {
        console.error(error.message);
        res.json({success: true, message:error.message });
    }
}

export default authUser;