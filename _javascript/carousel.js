class Slider {
    idx;
    translation;
    carouselEl;
    sliderViewport;
    slideItems;

    constructor() {
        this.idx = 0;
        this.translation = 0;
        this.carouselEl = document.getElementById("sliderContent");
        this.sliderViewport = document.getElementsByClassName("carousel__viewport")[0];
        this.slideItems = this.sliderViewport.children;
    }

    slideTo(next) {
        if (next == this.idx) return;
        
        this.translation += (next - this.idx) * -100;
        this.idx = next;
        
        this.sliderViewport.style.transform = 'translateX('+this.translation+'vw)';
    }
    adjustHeight() {
        const elCurrentHeight = this.sliderViewport.querySelector(".is_current");
        this.carouselEl.style.height = getComputedStyle(elCurrentHeight).height;
    }
    changeSlide(index) {
        const currIdItem = this.getActiveTab().getAttribute('data-index')
        const currentLevels = this.sliderViewport.querySelector(".is_current").querySelector("section").children;
        const targetLevels = this.slideItems[index].querySelector('section').children;
    
        for (const level of currentLevels) {
            level.classList.add("unsee");
        }
        
        this.slideItems[currIdItem].classList.add("fadeOut");
        this.slideItems[currIdItem].classList.remove("is_current");
        this.slideTo(index);
        
        for (const level of targetLevels) {
            level.classList.remove("unseen");
        }
    
        this.slideItems[index].classList.remove("fadeOut");
        this.slideItems[index].classList.add("is_current");
    }

    toggleActiveTab(index) {
        const clickedTab = document.querySelector('#tabItems').children[index];
        if (clickedTab.classList.contains("is-active")){
            return;
        }
    
        let currentTab = this.getActiveTab()
        if (currentTab !== undefined && currentTab !== null) {
            currentTab.classList.remove("is-active");
        } 
        clickedTab.classList.add("is-active");
        sessionStorage.setItem('currentTabIndex', Number(clickedTab.getAttribute('data-index')));
    }
    getActiveTab() {
        const tabs = document.querySelector('#tabItems').children;
        for (const tab of tabs) {
            if (tab.classList.contains("is-active")) {
                return tab
            }
        }
    }
    activeCurrentTab(dataIndex) {
        if (dataIndex === null) dataIndex = 0;
    
        this.toggleActiveTab(dataIndex);
        console.log(this.idx);
        this.slideTo(dataIndex);
    }
    playSlideItemEffect(dataIndex) {
        if (dataIndex === null) dataIndex = 0; 
    
        const levels = this.slideItems[dataIndex].querySelectorAll('.unseen');
        const currentSlide = this.slideItems[dataIndex]
    
        for (const level of levels) {
            level.classList.remove('unseen');
        }
        currentSlide.classList.remove('fadeOut');
        currentSlide.classList.add('is_current');
        this.adjustHeight();
    }
}
