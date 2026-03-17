document.addEventListener("DOMContentLoaded", function () {

if (!document.cookie.includes("badawy_cookie_consent=true")) {

let banner = document.createElement("div");
banner.innerHTML = `
<div style="
position:fixed;
bottom:0;
left:0;
width:100%;
background:#111;
color:#fff;
padding:15px;
font-family:sans-serif;
text-align:center;
z-index:9999;
">

This website uses cookies to improve your experience.
<a href="/pages/legal/cookie-policy.html" style="color:#4da6ff;">Learn more</a>

<button id="acceptCookies" style="
margin-left:15px;
padding:8px 14px;
border:none;
background:#2ecc71;
color:white;
cursor:pointer;
border-radius:4px;
">
Accept
</button>

</div>
`;

document.body.appendChild(banner);

document.getElementById("acceptCookies").onclick = function() {

document.cookie = "badawy_cookie_consent=true; path=/; max-age=" + 60*60*24*365;

banner.remove();

};

}

});
