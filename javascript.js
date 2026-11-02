/*======================================================================
ANN'S BAKERY - MAIN.JS
Accordion, Tabs, Gallery Lightbox, and Animations
======================================================================*/
document.addEventListener("DOMContentLoaded", function () {

    //-------- 1. ACCORDION --------------
    const accordionHeaders = document.querySelectorAll("accordion-header");
    
    accordionHeaders.forEach(function (header){
     header.addEventListener("click", function () {

        const content = this.nextElementSibling;
        const isExpanded = this.getAttribute("aria-expanded") === "true";
        const icon = this.querySelector(".accordion-icon");

        //Close all other accordion sections
        accordion.Headers.forEach(function (otherheader) {
            if (otherHeader !== header) {
                otherHeader.setAttribute("aria-expanded", "false");

                const otherContent = otherHeader.nextElementSibling;
                if (otherContent) {
                    otherContent.classList.remove("open");
                } 
                const othericon = otherHeader.querySelector(".accordion-icon");
                if (otherIcon) {
                    otherIcon.textContent = "+";
               }
            }
      })
});

// Toggle this one
this.setAttribute("aria-expanded" ,String(!isExpanded));

if (content) {
    content.classList.toggle("open");
}

if (icon) {
    icon.textContent = isExpanded ? "+" : "−";
}
 });
      });


//-------- TABS --------------

const tabButtons = document.querySelectorAll(".tab-button");
const tabPanels = document.querySelectorAll("a.tab-panel");

tabButtons.forEach(function (button) {
    button.addEventListener("click", function (){

        const targetpanelId = this.getAttribute("data-target");

        tabButtons.forEach(function (btn) {
            btn.classList.remove("active");
            btn.setAttribute("aria-selected", "false");
        });

        tabPanels.forEach(function (panel) {
            panel.classList.remove("active");
        });

        this.classList.add("active");
        this.setAttribute("aria-selected", "true");

        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
            targetPanel.classList.add("active");
        }
    });
});

//--------  GALLERY LIGHTBOX --------------
const galleryImages = document.querySelectorAll(".gallery-image");

if (galleryImages.length > 0) {

    //Create lightbox struture
    const lightbox = document.createElement("div");
    lightbox.id = "lightbox";

    lightbox.innerHTML = '<button class="close-lightbox" aria-label="close image">&times;</button><img id="lightbox-image" src=" " alt=" "> <p class="lightbox-caption"> </p>';
    
    document.body.appendChild(lightbox);

    galleryImages.forEach(function(image) {
        image.addEventListener("click", function () {
             
            lightboxImage.src = this.src;
            lightboxImage.alt = this.alt;
            lightboxCaption.textContent = this.alt;

            lightbox.classList.add("open");
            document.body.style.overflow = "hidden";
        });
    });

    //Close lightbox
    function closeLightbox() {
        lightbox.classList.remove("open");
        document.body.style.overflow = "auto";
    }

    lightboxClose.addEventListener("click", closeLightbox);
    
    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeLightbox();

        }
    });
}

//--------  SCROLL ANIMATIONS --------------
const animatedElements = document.querySelectorAll(".animate-on-scroll");

if ("IntersectionObserver" in window && animatedElements.length > 0) {

    const observer = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
}, {threshold: 0.15});
animatedElements.forEach(function (element) {
    observer.observe(element);
});

}else {

    //fallback for oler browsers
    animatedElements.forEach(function (element){
        element.classList.add("visible");
    });
}


 //-------- BACK TO TOP BUTTON --------------

 const backToTop = document.createElement("button");

 backToTop.id = "back-to-top";
 backToTop.textContent = "↑";
 backToTop.setAttribute("aria-label", "back to top");

 document.body.appendChild(backToTop);

 window.addEventListener("scroll", function(){

    if (window.scrollY > 400) {
        backToTop.classList.add("visible");
        
    }else{
        backToTop.classList.remove("visible")
    }
 });

 backToTop.addEventListener("click", function (){
    window.scrollTo({top:0, behavior: "smooth"});
 });
 