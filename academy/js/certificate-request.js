import { db } from "./firebase-config.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const form = document.getElementById("certForm");

form.addEventListener("submit", async function(e){

e.preventDefault();

const name = document.getElementById("name").value;
const phone = document.getElementById("phone").value;
const course = document.getElementById("course").value;
const txid = document.getElementById("txid").value;

if(txid.length < 8){
alert("Invalid Transaction ID");
return;
}

try{

await addDoc(collection(db,"certificateRequests"),{
name:name,
phone:phone,
course:course,
txid:txid,
status:"pending",
created:serverTimestamp()
});

alert("Request submitted successfully. Verification in progress.");

window.location.href="course-complete.html";

}catch(err){

alert("Error submitting request");

}

});
