function showDawahPopup(){

const popup=document.createElement("div");
popup.className="dawah-popup";

popup.innerHTML=`
<div class="dawah-box">

<img src="https://upload.wikimedia.org/wikipedia/commons/1/15/M-PESA_LOGO-01.svg" class="mpesa-badge">

<h2>Support Da'wah</h2>

<p>
The Prophet ﷺ said:
<br><br>
<strong>"Charity does not decrease wealth."</strong>
<br><br>
Support Islamic Da'wah through <b>Pwani One Shilling Foundation</b>.
</p>

<div class="payment-steps">
<h3>How to Pay via M-Pesa</h3>
<ol>
<li>Open M-Pesa</li>
<li>Select Lipa na M-Pesa</li>
<li>Select Paybill</li>
<li>Enter <b>651282</b></li>
<li>Account: <b>EMPOWERMENT</b></li>
<li>Enter Amount → Confirm</li>
</ol>
</div>

<button onclick="copyPaybill()">Pay with M-Pesa</button>

<span class="close-popup" onclick="this.closest('.dawah-popup').remove()">×</span>

</div>
`;

document.body.appendChild(popup);
}

function copyPaybill(){
navigator.clipboard.writeText("651282");
alert("Paybill 651282 copied. Open M-Pesa to complete payment.");
}

setInterval(showDawahPopup,300000);
