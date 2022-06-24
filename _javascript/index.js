// INICIALIZAÇÃO DE OBSERVADOR
const fadeObserver = new IntersectionObserver(entries => {
    const classNames = [".product-item", ".specialty-item", ".contact-item", ".kit-item"];
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
