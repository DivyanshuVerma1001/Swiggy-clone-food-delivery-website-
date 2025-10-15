const {Resend}= require('resend');
const resend= new Resend(process.env.RESEND_API)
const sendEmailR= async({email,subject,message})=>{
    try{
    const {data,error}=await resend.emails.send({
        from:"Tastify <noreply@divyanshu-verma.me>",
        to:[email],
        subject,
        html:message,
    }) ;
}
    catch(error){
        console.log(error)
    }
}
module.exports= sendEmailR