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
    // <!-- Initialize Swiper -->
    let data;
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function (event) {
        const req = event.target;
        if (req.readyState === XMLHttpRequest.DONE) {
            data = JSON.parse(req.response);
            makePromotionSlide();
        }
    };
    xhttp.open("GET", "prodata.json");
    xhttp.send();

    function makePromotionSlide() {
        let swPromotionHtml = ``;
        for (let i = 0; i < data.good_count; i++) {
            let obj = data[`good_${i + 1}`];

            let html = `
      <div class="swiper-slide">
        <a href="${obj.link}">
          <img src="images/${obj.img}" alt="${obj.name}">
        </a>
      </div>
      `;
            swPromotionHtml += html;
        }

        let swPromotionWrapper = document.querySelector(
            ".sw-promotion .swiper-wrapper"
        );
        swPromotionWrapper.innerHTML = swPromotionHtml;

        let promotionSwiper = new Swiper(".sw-promotion", {
            slidesPerView: 1,
            spaceBetween: 24,
            speed: 1000,
            loop: true,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".promotion .sw-next",
                prevEl: ".promotion .sw-prev",
            },
            pagination: {
                el: ".sw-promotion-pg",
                clickable: true,
            },
            breakpoints: {
                760: {
                    slidesPerView: 2,
                },
            },
        });
    }

    // Shopping Swiper
    let shoppingData;
    const shopXhttp = new XMLHttpRequest();
    shopXhttp.onreadystatechange = function (event) {
        let req = event.target;
        if (req.readyState === XMLHttpRequest.DONE) {
            shoppingData = JSON.parse(req.response);
            makeShoppingSlide();
        }
    };
    shopXhttp.open("GET", "shoppingdata.json");
    shopXhttp.send();

    function makeShoppingSlide() {
        let swShoppingHtml = ``;
        for (let i = 0; i < shoppingData.good_count; i++) {
            let obj = shoppingData[`good_${i + 1}`];

            let temp = `
        <div class="swiper-slide">
          <a href="${obj.link}" class="good">
            <img src="images/${obj.pic}" alt="${obj.product}" />
            <div class="good-info">
              <ul class="good-info-list">
                <li>
                  <b><span>${obj.ratio}%</span> ${obj.price}원</b>
                </li>
                <li><p>${obj.product}</p></li>
              </ul>
            </div>
          </a>
        </div>
      `;
            swShoppingHtml += temp;
        }
        let swShoppingWrapper = document.querySelector(
            ".sw-shopping .swiper-wrapper"
        );
        swShoppingWrapper.innerHTML = swShoppingHtml;

        let shoppingSwiper = new Swiper(".sw-shopping", {
            slidesPerView: 5,
            grid: {
                rows: 2,
                fill: "row",
            },
            spaceBetween: 10,
            navigation: {
                nextEl: ".shopping .sw-next",
                prevEl: ".shopping .sw-prev",
            },
            breakpoints: {
                1024: {
                    spaceBetween: 32,
                    slidesPerView: 3,
                    // 화면당 3개씩 슬라이드 이동
                    slidesPerGroup: 3,
                    grid: {
                        rows: 1,
                    },
                },
                1280: {
                    spaceBetween: 26,
                    slidesPerView: 4,
                    // 화면당 4개씩 슬라이드 이동
                    slidesPerGroup: 4,
                    grid: {
                        rows: 1,
                    },
                },
            },
        });
    }

    let tourData;
    const tourXhttp = new XMLHttpRequest();
    tourXhttp.onreadystatechange = function (event) {
        const req = event.target;
        if (req.readyState === XMLHttpRequest.DONE) {
            tourData = JSON.parse(req.response);
            makeTourSlide();
        }
    };
    tourXhttp.open("GET", "tourdata.json");
    tourXhttp.send();

    function makeTourSlide() {
        let swTourHtml = ``;
        for (let i = 0; i < tourData.tour_total; i++) {
            let obj = tourData[`tour_${i + 1}`];
            let temp = `
      <div class="swiper-slide">
        <a href="${obj.link}" class="tour-link">
          <div class="tour-img">
            <img src="images/${obj.pic}" alt="${obj.alt}" />
          </div>
          <div class="tour-info">
            <ul class="tour-info-list">
              <li ${obj.category ? "style='display:block'" : "style='display:none'"
                }>
                <span class="tour-cate">${obj.category}</span>
              </li>
              <li>
                <span class="tour-title">${obj.title}</span>
              </li>
              <li>
                <span class="tour-place">${obj.place}</span>
              </li>
              <li>
                <span class="tour-price"><b>${obj.price}</b>원~</span>
              </li>
            </ul>
          </div>
        </a>
      </div>
      `;
            swTourHtml += temp;
        }

        let swTourWrapper = document.querySelector(".sw-tour .swiper-wrapper");
        swTourWrapper.innerHTML = swTourHtml;

        let tourSwiper = new Swiper(".sw-tour", {
            slidesPerView: 3,
            grid: {
                rows: 2,
                fill: "row",
            },
            spaceBetween: 10,
            navigation: {
                nextEl: ".tour .sw-next",
                prevEl: ".tour .sw-prev",
            },
            breakpoints: {
                1024: {
                    spaceBetween: 32,
                    slidesPerView: 2,
                    // 화면당 2개씩 슬라이드 이동
                    slidesPerGroup: 2,
                    grid: {
                        rows: 1,
                    },
                },
                1280: {
                    spaceBetween: 26,
                    slidesPerView: 3,
                    // 화면당 4개씩 슬라이드 이동
                    slidesPerGroup: 3,
                    grid: {
                        rows: 1,
                    },
                },
            },
        });
    }

    // 티켓 json 연동
    let ticketData;
    const ticketXhttp = new XMLHttpRequest();
    ticketXhttp.onreadystatechange = function (event) {
        const req = event.target;
        if (req.readyState === XMLHttpRequest.DONE) {
            ticketData = JSON.parse(req.response);
            makeTicketSlide();
        }
    };
    ticketXhttp.open("GET", "ticketdata.json");
    ticketXhttp.send();
    function makeTicketSlide() {
        let html = ``;
        for (let i = 0; i < ticketData.ticket_total; i++) {
            let obj = ticketData[`ticket_${i + 1}`];
            let temp = `
        <div class="swiper-slide">
          <a href="${obj.link}" class="ticket-link">
            <div class="ticket-img">
              <img src="images/${obj.poster}" alt="${obj.title}" />
              <span class="ticket-rank">${obj.rank}</span>
            </div>
            <div class="ticket-info">
              <ul class="ticket-info-list">
                <li>
                  <span class="ticket-title"><b>${obj.title}</b></span>
                </li>
                <li>
                  <span class="ticket-hall">${obj.hall}</span>
                </li>
                <li>
                  <span class="ticket-date">${obj.date}</span>
                </li>
                <li><span class="ticket-sale">${obj.sale}</span></li>
              </ul>
            </div>
          </a>
        </div>
      `;
            html += temp;
        }
        const swTicketWrapper = document.querySelector(
            ".sw-ticket .swiper-wrapper"
        );
        swTicketWrapper.innerHTML = html;

        let ticketSwiper = new Swiper(".sw-ticket", {
            slidesPerView: "auto",
            spaceBetween: 10,
            navigation: {
                nextEl: ".ticket .sw-next",
                prevEl: ".ticket .sw-prev",
            },
            breakpoints: {
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 32,
                },
                1280: {
                    slidesPerView: 4,
                    spaceBetween: 27,
                },
            },
        });
    }

    let liveSwiper = new Swiper(".sw-live", {
        slidesPerView: 4,
        spaceBetween: 10,
        navigation: {
            nextEl: ".live .sw-next",
            prevEl: ".live .sw-prev",
        },
        breakpoints: {
            1024: {
                slidesPerView: 3,
                spaceBetween: 32,
            },
            1280: {
                slidesPerView: 4,
                spaceBetween: 27,
            },
        },
    });
    let booksSwiper = new Swiper(".sw-books", {
        slidesPerView: 3,
        grid: {
            rows: 4,
            fill: "row",
        },
        spaceBetween: 19,
        navigation: {
            nextEl: ".books .sw-next",
            prevEl: ".books .sw-prev",
        },
        breakpoints: {
            1024: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 30,
                grid: {
                    rows: 1,
                },
            },
            1280: {
                slidesPerView: 5,
                slidesPerGroup: 5,
                spaceBetween: 27,
                grid: {
                    rows: 1,
                },
            },
        },
    });

    let eventsSwiper = new Swiper(".sw-events", {
        slidesPerView: 3,
        spaceBetween: 27,
        navigation: {
            nextEl: ".event .sw-next",
            prevEl: ".event .sw-prev",
        },
        breakpoints: {
            1280: {
                slidesPerView: 4,
            },
        },
    });
};
