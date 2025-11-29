const main = document.querySelector(".main-image");
const thumbs = document.querySelectorAll(".thumb-image"); // seleciona todas as miniaturas

thumbs.forEach(thumb => {
    thumb.addEventListener("click", () => {
        const src = thumb.getAttribute("src");
        const alt = thumb.getAttribute("alt");

        main.setAttribute("src", src);
        main.setAttribute("alt", alt);
    });
});
