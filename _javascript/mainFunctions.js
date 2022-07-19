window.onload = function() {
    
    // => Efeito fade de entrada: Rodappé
    footerObserver.observe(document.querySelector(".footer"));

    // LISTERNERS 
    // => Botão burguer
    const navbarMenu = document.querySelector("#menuHero");
    const burgerButtons = Array.from(document.querySelectorAll('.navbar-burger'));
    burgerButtons.forEach(buttons => {
        addEvent(buttons, 'click', () => {
            if (navbarMenu.classList.contains('is-active')) {
                closeNavbarMenu(navbarMenu);
            } else {
                openNavbarMenu(navbarMenu);
            }
        })
    });

    // Detecta se o menu de abas está presente
    if (document.querySelector('#tabItems') !== null) {
        // Instanciação do carrossel
        const carousel = new Carousel(3500, true);
        carousel.attachEvents(this);
        // Instanciação do slider de conteúdo
        const sliderContent = new Slider();

        // Carrega a última aba aberta na memória
        let dataIndex = sessionStorage.getItem('currentTabIndex');
        sliderContent.activeCurrentTab(dataIndex);
        sliderContent.playSlideItemEffect(dataIndex);

        // LISTERNERS DE EVENTOS PARA O MENU DE ABAS
        const elTabs = document.querySelector("#tabItems").children
        for (const tab of elTabs) {
            addEvent(tab, 'click', () => { sliderContent.changeSlide(tab.dataset.index) });
            addEvent(tab, 'click', () => { sliderContent.toggleActiveTab(tab.dataset.index) });
        }

        // LISTERNER DE EVENTO PARA AJUSTE DA ALTURA DA VIEWPORT DO CARROSSEL
        addEvent(sliderContent.sliderViewport, 'transitionend', () => { sliderContent.adjustHeight(); });
        addEvent(this, 'resize', () => { sliderContent.adjustHeight(); });

        // CHAMADA DE OBSERVADORES
        // => Efeito fade de entrada: aba produtos
        fadeObserverCaller("#produtos");
        // => Efeito fade de entrada: aba especialidades
        fadeObserverCaller("#especialidades");
        // => Efeito fade de entrada: aba encomendas
        fadeObserverCaller("#encomendas");
        // => Efeito fade de entrada: aba kits
        fadeObserverCaller("#kitfesta");
    }
    /*
    bulmaCarousel.attach('#carousel-hero', {
        navigation: false,
        navigationKeys: false,
        autoplay: true,
        loop: true,
        autoplaySpeed: 5000,
        pauseOnHover: false,
        breakpoints: [
            { 
                changePoint: 1408, 
                slidesToShow: 1, 
                slidesToScroll: 1 
            },
            { 
                changePoint: 1216, 
                slidesToShow: 1, 
                slidesToScroll: 1 
            }, 
            { 
                changePoint: 1024, 
                slidesToShow: 1, 
                slidesToScroll: 1 
            }, 
            { 
                changePoint: 768, 
                slidesToShow: 1, 
                slidesToScroll: 1 
            } 
        ]
    });*/
}

// INICIALIZAÇÕES DE OBSERVADORES
const footerObserver = new IntersectionObserver(entries => {
    entries.forEach(obj => {
        if (obj.intersectionRatio > 0) {
            obj.target.classList.remove("is-invisible");
            obj.target.classList.add("fadeInBottom");
        }
    });
});

const openNavbarMenu = (navbarMenu) => {
    //btnBurger.classList.add("is-active");
    navbarMenu.classList.add("is-active");
}
const closeNavbarMenu = (navbarMenu) => {
    //btnBurger.classList.remove("is-active");
    navbarMenu.classList.remove("is-active");
}

// Funções Auxiliares
function addEvent(element, event, func) {
    if (element.attachEvent)
        return element.attachEvent('on'+event, func);
    else
        return element.addEventListener(event, func, false);
}
