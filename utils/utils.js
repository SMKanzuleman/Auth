export function generateOTP(){
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export function getOTPhtml(otp){
    return `
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
        <h2 style="color: #333;">Your One-Time Password (OTP)</h2>
        <p style="font-size: 18px; color: #555;">Use the following OTP to complete your verification process:</p>
        <h3 style="color: #007bff;">${otp}</h3>
        <p style="font-size: 14px; color: #999;">This OTP is valid for 10 minutes. Please do not share it with anyone.</p>
    </div>
    `
}