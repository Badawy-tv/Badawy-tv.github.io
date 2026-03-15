document.addEventListener("DOMContentLoaded", function(){

}
}
});

document.addEventListener("DOMContentLoaded", function(){


});
}

});


document.addEventListener("DOMContentLoaded", function(){

const openSearch = document.getElementById("floating-search");
const panel = document.getElementById("search-panel");
const close = document.getElementById("close-search");

if(openSearch){
openSearch.addEventListener("click", function(){
panel.style.display = "block";
});
}

if(close){
close.addEventListener("click", function(){
panel.style.display = "none";
});
}

});


// Support Panel functionality
const supportBtn = document.getElementById("supportBtn");
const supportPanel = document.getElementById("supportPanel");
const closeSupport = document.getElementById("closeSupport");

if (supportBtn && supportPanel) {
  supportBtn.addEventListener("click", () => {
    supportPanel.style.display = supportPanel.style.display === "block" ? "none" : "block";
  });

  closeSupport.addEventListener("click", () => {
    supportPanel.style.display = "none";
  });

  document.addEventListener("click", (e) => {
    if (!supportPanel.contains(e.target) && !supportBtn.contains(e.target)) {
      supportPanel.style.display = "none";
    }
  });
}
