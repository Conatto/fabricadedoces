window.onload = function() {
    
    // => Efeito fade de entrada: Rodappé
    footerObserver.observe(document.querySelector(".footer"));

    // LISTERNERS 
    // => Botão burguer
    const navbarMenu = document.querySelector("#menuHero");
    const burgerButtons = Array.from(document.querySelectorAll('.navbar-burger'));
    burgerButtons.forEach(buttons => {
        buttons.addEventListener('click', function() {
            if (this.classList.contains('is-active')) {
                closeNavbarMenu(this, navbarMenu);
            } else {
                openNavbarMenu(this, navbarMenu);
            }
        });
    });

    // Detecta se o menu de abas está presente
    if (document.querySelector('#tabItems') !== null) {
        let dataIndex = sessionStorage.getItem('currentTabIndex');
        loadLastTab(dataIndex);
        playSlideItemEffect(dataIndex);

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

const openNavbarMenu = (btnBurger, navbarMenu) => {
    btnBurger.classList.add("is-active");
    navbarMenu.classList.add("is-active");
}
const closeNavbarMenu = (btnBurger, navbarMenu) => {
    btnBurger.classList.remove("is-active");
    navbarMenu.classList.remove("is-active");
}
