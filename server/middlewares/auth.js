import jwt from "jsonwebtoken";

//middleware funtion to decod jwt token to get clerkID

const authUser = (req, res, next) => {
    const token = req.headers.authorization;
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.clerkId = decoded.clerkId;
        next();
    } catch (error) {
        console.error(error.message);
        res.json({ message:error.message });
    }
}

export default authUser;