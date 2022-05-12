window.onresize = function() { location.replace(location.href); }

// INICIALIZAÇÃO DE OBSERVADOR
const fadeObserver = new IntersectionObserver(entries => {
    const classNames = [".product-box", ".specialty-box", ".contact-banner", ".kit-box"];
    let targetClass;

    entries.forEach(obj => {
        for (let i=0; i < classNames.length; i++) {
            if (obj.target.querySelector(classNames[i]) !== null) {
                targetClass = classNames[i];
                break;
            }
        }
        if (obj.intersectionRatio >= .5 && !obj.target.classList.contains("unseen")) {
            elementsOnScreen(obj.target, targetClass);
        }
    });
}, { threshold: [.5] });

// FUNÇÕES
function sliderSectionSlice(sectionId) {
    const sliderSection = document.querySelector(sectionId);
    const levels = Array.from(sliderSection.children);
    const rows = [];

    levels.forEach(level => {
        rows.push(level);
    });
    return rows;
}
function fadeObserverCaller(sectionId) {
    const rows = sliderSectionSlice(sectionId);
    rows.forEach(level => {
        fadeObserver.observe(level);
    });
}
function elementsOnScreen(level, targetClass) {
    const divs = Array.from(level.querySelectorAll(targetClass)).reverse();
    fadeBottomEffect(divs, divs.pop());
}
function fadeBottomEffect(arr, element) {
    if ((element == null) || (element.classList.contains("fadeInBottom"))) return

    element.classList.add("fadeInBottom");
    setTimeout(() => {
        fadeBottomEffect(arr, arr.pop());
    }, 250);
}
function toggleActiveTab(index) {
    const clickedTab = document.querySelector('#tabItems').children[index];
    if (clickedTab.classList.contains("is-active")){
        return;
    }

    let currentTab = getActiveTab()
    if (currentTab !== undefined && currentTab !== null) {
        currentTab.classList.remove("is-active");
    } 
    clickedTab.classList.add("is-active");
    sessionStorage.setItem('currentTabIndex', Number(clickedTab.getAttribute('data-index')));
}
function getActiveTab() {
    const tabs = document.querySelector('#tabItems').children;
    for (const tab of tabs) {
        if (tab.classList.contains("is-active")) {
            return tab
        }
    }
}
function loadLastTab(dataIndex) {
    if (dataIndex === null) dataIndex = 0;

    toggleActiveTab(dataIndex);
}
function playSlideItemEffect(dataIndex) {
    if (dataIndex === null) dataIndex = 0; 

    const sliderContent = document.querySelector('#carousel-body').querySelector('.slider-container');
    const slideItems = sliderContent.children
    const levels = slideItems[dataIndex].querySelectorAll('.unseen');
    const currentSlide = slideItems[dataIndex].querySelector('.fadeIn');

    for (const level of levels) {
        level.classList.remove('unseen');
    }
    currentSlide.classList.remove('fadeOut');
    sliderContent.style.height = getComputedStyle(currentSlide).height;
}
