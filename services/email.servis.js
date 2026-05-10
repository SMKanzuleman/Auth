import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN,
    GOOGLE_USER
} = process.env;

const transporter= nodemailer.createTransport(
    {
        service: "gmail",
        auth: {
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