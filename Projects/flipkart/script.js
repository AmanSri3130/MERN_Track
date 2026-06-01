// Carousel Configuration State Parameters
const trackElement = document.getElementById('carousel-track');
const nextBtn = document.getElementById('next-slide');
const prevBtn = document.getElementById('prev-slide');
const slidesArray = document.querySelectorAll('.carousel-slide');

let activeSlideIndex = 0;
const totalSlidesCount = slidesArray.length;
let autoCyclePlayInterval = null;

// Move slide track position to active index transform coordinates
function updateCarouselPosition() {
    const translationOffsetPercentage = -(activeSlideIndex * (100 / totalSlidesCount));
    trackElement.style.transform = `translateX(${translationOffsetPercentage}%)`;
}

// Logic routine functions to shift forward or backward safely
function advanceToNextSlide() {
    activeSlideIndex = (activeSlideIndex + 1) % totalSlidesCount;
    updateCarouselPosition();
}

function retreatToPrevSlide() {
    activeSlideIndex = (activeSlideIndex - 1 + totalSlidesCount) % totalSlidesCount;
    updateCarouselPosition();
}

// Reset the interval whenever a manual click occurs
function resetAutoCyclePlayTimer() {
    clearInterval(autoCyclePlayInterval);
    autoCyclePlayInterval = setInterval(advanceToNextSlide, 4000);
}

// Attach Interactive Event Handler Observers
nextBtn.addEventListener('click', () => {
    advanceToNextSlide();
    resetAutoCyclePlayTimer();
});

prevBtn.addEventListener('click', () => {
    retreatToPrevSlide();
    resetAutoCyclePlayTimer();
});

// Emulate Search Box input key actions behaviors updates
const searchField = document.getElementById('search-input');
searchField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const queryVal = searchField.value.trim();
        if (queryVal) {
            alert(`Flipkart Engine Query Routing API Search Simulation Trigger for: "${queryVal}"`);
        }
    }
});

// Mock interactive buttons action notifications
document.getElementById('login-trigger').addEventListener('click', () => {
    alert("Flipkart Identity Gateway Authentication Frame Simulation Activated.");
});

const cards = document.querySelectorAll('.product-item-card');
cards.forEach(card => {
    card.addEventListener('click', () => {
        const titleText = card.querySelector('.prod-title').textContent;
        alert(`Navigating inside deep product metrics detailed page stack context for: "${titleText}"`);
    });
});

// Initialize Automated Rotation Loop Cycle Timeline on mount
autoCyclePlayInterval = setInterval(advanceToNextSlide, 4000);