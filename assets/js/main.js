document.addEventListener("DOMContentLoaded", function(){
const navMenu = document.getElementById("nav-menu");

navMenu.classList.toggle("active");
}
}
});

document.addEventListener("DOMContentLoaded", function(){

const navMenu = document.getElementById("nav-menu");

navMenu.classList.toggle("active");
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

