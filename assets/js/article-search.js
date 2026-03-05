document.addEventListener("DOMContentLoaded", function () {
  const search = document.getElementById("article-search");
  const articles = document.querySelectorAll(".article-card");

  search.addEventListener("keyup", function () {
    const term = search.value.toLowerCase();

    articles.forEach(card => {
      const text = card.innerText.toLowerCase();
      card.style.display = text.includes(term) ? "block" : "none";
    });
  });
});
