const {Resend}= require('resend');
const resend= new Resend(process.env.RESEND_API)
const sendEmailR= async({email,subject,message})=>{
    console.log("inside resend function ")
    console.log("api key :",process.env.RESEND_API)
    try{
    const response=await resend.emails.send({
        from:"Tastify <noreply@divyanshu-verma.me>",
        to:[email],
        subject,
        html:message,
    }) ;
    console.log("resend ne bej di ",response)
}
    catch(error){
        console.log(error)
    }
}
module.exports= sendEmailR