require('dotenv').config()

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const serviceSid= process.env.TWILIO_SERVICE_SID
module.exports={
    doSms:(noData)=>{
      
        let res={}
        return new Promise(async(resolve,reject)=>{
            client.verify.services(serviceSid).verifications.create({
                to:`+91${noData.phone}`,
                channel:"sms"
            }).then((res)=>{
                res.valid=true;
                resolve(res)
                console.log(res)
            })
            
        })
    },
    otpVerify:(otpData,noData)=>{
        let resp={}
        return new Promise(async(resolve,reject)=>{
            client.verify.services(serviceSid).verificationChecks.create({
                to:`+91${noData.phone}`,
                code: otpData.otp   
            }).then((resp)=>{
                console.log('verification success');
                console.log(resp);
                resolve(resp)
            })
        })
    }
}