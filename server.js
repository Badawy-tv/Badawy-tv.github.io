const express = require("express");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

// Safaricom Sandbox credentials
const consumerKey = "pJlPAy9y3ddjeUoKG1nWAPHrcpqXkFVxto3g0ktvNzmaNROk";
const consumerSecret = "ZyIZ08qmbb27vLRoflAFb8x8zAYimdPEqGakAlebl3MrJW2MfCR4fjUUF2qJZUfR";
const shortcode = "174379";       // Sandbox shortcode
const passkey = "<YourSandboxPasskey>"; // Replace with sandbox passkey
const callbackURL = "https://yourdomain.com/callback"; // Replace with your live callback

// Generate access token
async function getAccessToken(){
    const response = await fetch("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
        headers: {
            "Authorization": "Basic " + Buffer.from(consumerKey + ":" + consumerSecret).toString("base64")
        }
    });
    const data = await response.json();
    return data.access_token;
}

// Endpoint to initiate payment
app.post("/pay-certificate", async (req,res)=>{
    try {
        const token = await getAccessToken();
        const timestamp = new Date().toISOString().replace(/[-:T.Z]/g,"").slice(0,14);
        const password = Buffer.from(shortcode + passkey + timestamp).toString("base64");

        const body = {
            "BusinessShortCode": shortcode,
            "Password": password,
            "Timestamp": timestamp,
            "TransactionType": "CustomerPayBillOnline",
            "Amount": 500,            // Certificate fee
            "PartyA": "<StudentPhoneNumber>", // Replace with student's phone if known or dynamic
            "PartyB": shortcode,
            "PhoneNumber": "<StudentPhoneNumber>", // Same here
            "CallBackURL": callbackURL,
            "AccountReference": "Tajweed Certificate",
            "TransactionDesc": "Payment for Tajweed Certificate"
        };

        const mpesaRes = await fetch("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
            method:"POST",
            headers: {
                "Authorization":"Bearer " + token,
                "Content-Type":"application/json"
            },
            body: JSON.stringify(body)
        });

        const result = await mpesaRes.json();
        res.json(result);

    } catch(err){
        res.json({ success:false, message: err.message });
    }
});

// Callback endpoint
app.post("/callback", (req,res)=>{
    console.log("Payment Callback:", req.body);
    // TODO: validate payment success and unlock certificate
    res.sendStatus(200);
});

app.listen(3000, ()=> console.log("Server running on http://localhost:3000"));
