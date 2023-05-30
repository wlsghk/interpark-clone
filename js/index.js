window.onload = function () {
    // top 버튼
    const goTop = document.querySelector(".gotop");

    // anime.js
    const scrollElement =
        window.document.scrollingElement ||
        window.document.body ||
        window.document.documentElement;
    goTop.addEventListener("click", function () {
        anime({
            targets: scrollElement,
            scrollTop: 0,
            duration: 500,
            easing: "easeInOutQuad",
        });
    });
}