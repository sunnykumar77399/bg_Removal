//API controller Function to manage c;eark user with database
// hhtp://localhost:4000/api/user/webhooks
import { Webhook } from "svix"
import userModel from "../models/userModel.js";

const clearkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOKS_SECRET);

        await whook.verify(JSON.stringify(req.body),{
            "svix-id": req.headers['svix-id'],
            "svix-timestamp":req.headers['svix-timestamp'],
            "svix-signature":req.headers['svix-signature']
        
        })
        const {data, type} = req.body;

        switch (type) {
            case "user.created":{
                const userData = {
                    clerkId: data.id,
                    email: data.email_addresses[0].email_address,
                    photo: data.profile_image_url,
                    firstName: data.first_name,
                    lastName: data.last_name
                }
                await userModel.create(userData);
                res.json({});
                break;
            }
             case "user.updated":{
                    const userData = {
                    // clerkId: data.id,
                    email: data.email_addresses[0].email_address,
                    photo: data.profile_image_url,
                    firstName: data.first_name,
                    lastName: data.last_name
                }
                await userModel.findOneAndUpdate(
                    { clerkId: data.id },userData)
                    res.json({});
                break;
            }
             case "user.deleted":{
                await userModel.findOneAndDelete({ clerkId: data.id });
                res.json({});
                break;
            }
                
        
            default:
                break;
        }
    } catch (e) {
        console.error(e.message);
        res.json({success: false, message:e})
    }
}

export { clearkWebhooks };