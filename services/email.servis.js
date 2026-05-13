import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const GOOGLE_CLIENT_ID= process.env.GOOGLE_CLIENT_ID;
if(!GOOGLE_CLIENT_ID){
    console.error("GOOGLE_CLIENT_ID is not defined in environment variables.");
}
const GOOGLE_CLIENT_SECRET= process.env.GOOGLE_CLIENT_SECRET;
if(!GOOGLE_CLIENT_SECRET){
    console.error("GOOGLE_CLIENT_SECRET is not defined in environment variables.");
}
const GOOGLE_REFRESH_TOKEN= process.env.GOOGLE_REFRESH_TOKEN
if(!GOOGLE_REFRESH_TOKEN){
    console.error("GOOGLE_REFRESH_TOKEN is not defined in environment variables.");
}
const GOOGLE_USER= process.env.GOOGLE_USER;
if(!GOOGLE_USER){
    console.error("GOOGLE_USER is not defined in environment variables.");
}


const transporter= nodemailer.createTransport(
    {
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: GOOGLE_USER,
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            refreshToken: GOOGLE_REFRESH_TOKEN
        }
    }
)

transporter.verify((error, success) => {
    if(error){
        console.error("Error occurred while verifying transporter:", error);
    } else {
        console.log("Transporter verified successfully!");
    }
})

export const sendEmail= async (to , subject , text , html)=>{

    try {
        const info =await transporter.sendMail({
            from: GOOGLE_USER,
            to,
            subject,
            text,
            html
        })
        console.log("Email sent successfully:", info.response);
        console.log("Email sent successfully:", info.response);

    } catch (error) {
        console.error("Error occurred while sending email:", error);
    }
}