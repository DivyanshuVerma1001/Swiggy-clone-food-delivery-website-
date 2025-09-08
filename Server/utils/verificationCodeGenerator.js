
const generateVerificationCode=()=>{
        const firstDigit= Math.floor(Math.random()*9)+1;
        const remainingDigits= Math.floor(Math.random()*1000).toString().padStart(4,0)
        return parseInt(firstDigit+remainingDigits)

}
module.exports= generateVerificationCode;