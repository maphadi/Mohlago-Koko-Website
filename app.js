//step 1: get DOM
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 5000;
let timeAutoNext = 4000;

nextDom.onclick = function(){
    showSlider('next');    
}

prevDom.onclick = function(){
    showSlider('prev');    
}
let runTimeOut;
let runNextAuto = setTimeout(() => {
    next.click();
}, timeAutoNext)
function showSlider(type){
    let  SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        next.click();
    }, timeAutoNext)
}

// 

    document.addEventListener("DOMContentLoaded", () => {
        const modalOverlay = document.getElementById('promoModalOverlay');
        const closeButton = document.getElementById('closePromoModal');
        const promoButton = document.getElementById('promoModalButton');
        const sessionKey = 'promoModalShown';

        const showModal = () => {
            modalOverlay.classList.add('active');
        };

        const hideModal = () => {
            modalOverlay.classList.remove('active');
            sessionStorage.setItem(sessionKey, 'true');
        };

        // Show the modal only if it hasn't been shown in this session
        if (!sessionStorage.getItem(sessionKey)) {
            // Delay showing the modal slightly so the page can load
            setTimeout(showModal, 1500);
        }

        // Event listeners to close the modal
        closeButton.addEventListener('click', hideModal);
        promoButton.addEventListener('click', hideModal);
        modalOverlay.addEventListener('click', (event) => {
            // Only close if the overlay itself is clicked, not the modal content
            if (event.target === modalOverlay) {
                hideModal();
            }
        });
    });


    document.addEventListener("DOMContentLoaded", () => {
        const statsSection = document.querySelector('#stats');

        // Options for the Intersection Observer
        const observerOptions = {
            root: null, // relative to the viewport
            rootMargin: '0px',
            threshold: 0.4 // Trigger when 40% of the element is visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // If the stats section is intersecting the viewport
                if (entry.isIntersecting) {
                    const counters = document.querySelectorAll('[data-count]');
                    
                    counters.forEach(counter => {
                        const target = +counter.getAttribute('data-count');
                        // Reset counter to 0 to re-animate if it scrolls out and back in
                        counter.innerText = '0'; 

                        const speed = 200; // Lower is faster
                        const duration = 2000; // Total animation time in ms
                        const increment = target / (duration / (1000 / 60)); // Calculate increment per frame for smooth animation

                        const updateCount = () => {
                            const current = +counter.innerText;
                            
                            if (current < target) {
                                counter.innerText = Math.ceil(current + increment);
                                requestAnimationFrame(updateCount);
                            } else {
                                counter.innerText = target; // Ensure it ends on the exact target number
                            }
                        };
                        
                        requestAnimationFrame(updateCount);
                    });
                    
                    // Unobserve after the animation has been triggered to prevent re-triggering
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Start observing the stats section
        if (statsSection) {
            observer.observe(statsSection);
        }
    });
// 