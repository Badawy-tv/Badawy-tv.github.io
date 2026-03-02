
window.onload = function() {

  let tapCount = 0;
  let tapTimer;

  const logo = document.querySelector(".profile-img");
  if (!logo) return;

  logo.addEventListener("click", function() {

    tapCount++;

    if (tapCount === 1) {
      tapTimer = setTimeout(() => {
        tapCount = 0;
      }, 3000);
    }

    if (tapCount >= 5) {
      clearTimeout(tapTimer);
      tapCount = 0;
      openLogin();
    }

  });

  function openLogin() {
    const email = prompt("Enter Admin Email:");
    if (!email) return;

    const password = prompt("Enter Password:");
    if (!password) return;

    firebase.auth().signInWithEmailAndPassword(email.trim(), password.trim())
      .then(() => {
        alert("Login Successful");
      })
      .catch(() => {
        alert("Login Failed");
      });
  }

};

