// DYNAMIC COMPONENT SCROLL AND TRANSFORMATION CAROUSEL ENGINE
const slider = document.getElementById('main-slider');
const slides = document.querySelectorAll('.slide');
const dockItems = document.querySelectorAll('.dock-item');

let currentSlideIndex = 0;
let isTransitioning = false;

function changeSlide(index) {
    if (index < 0 || index >= slides.length || isTransitioning) return;
    
    isTransitioning = true;
    currentSlideIndex = index;

    // Trigger hardware-accelerated 3D momentum slide shift
    slider.style.transform = `translateY(-${currentSlideIndex * 100}vh)`;

    slides.forEach((slide, i) => {
        if (i === currentSlideIndex) {
            slide.classList.add('active');
            if(i === 1) triggerCompetencyBars(slide);
        } else {
            slide.classList.remove('active');
        }
    });

    dockItems.forEach((item, i) => {
        if (i === currentSlideIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    setTimeout(() => { isTransitioning = false; }, 1200);
}

function triggerCompetencyBars(slideContainer) {
    const fills = slideContainer.querySelectorAll('.progress-bar-fill');
    fills.forEach(fill => {
        fill.style.width = fill.getAttribute('data-percent');
    });
}

// Global Wheel Intercept
window.addEventListener('wheel', (e) => {
    if (e.deltaY > 0) {
        changeSlide(currentSlideIndex + 1);
    } else {
        changeSlide(currentSlideIndex - 1);
    }
}, { passive: true });

// Sync Dock click handlers
dockItems.forEach(item => {
    item.addEventListener('click', () => {
        const targetedIndex = parseInt(item.getAttribute('data-slide'));
        changeSlide(targetedIndex);
    });
});

// Sync Keyboard navigation parameters
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') changeSlide(currentSlideIndex + 1);
    if (e.key === 'ArrowUp') changeSlide(currentSlideIndex - 1);
});

// MULTI-STACK AUTOMATED ROLE ROTATION TYPER ENGINE
const structuralRolesArray = [
    "Java Backend Architect",
    "MERN Stack Developer",
    "Data Analytics Specialist",
    "Full-Stack Software Engineer"
];
let coreArrayPointer = 0;
let elementCharacterIndex = 0;
let isDeletingSequence = false;
const targetRotatorElement = document.getElementById("role-rotator-engine");

function processTypeSequenceEngine() {
    const currentFullString = structuralRolesArray[coreArrayPointer];
    
    if (isDeletingSequence) {
        targetRotatorElement.textContent = currentFullString.substring(0, elementCharacterIndex - 1);
        elementCharacterIndex--;
    } else {
        targetRotatorElement.textContent = currentFullString.substring(0, elementCharacterIndex + 1);
        elementCharacterIndex++;
    }

    let computationDelay = isDeletingSequence ? 40 : 90;

    if (!isDeletingSequence && elementCharacterIndex === currentFullString.length) {
        computationDelay = 2200; // Hold role visibility state
        isDeletingSequence = true;
    } else if (isDeletingSequence && elementCharacterIndex === 0) {
        isDeletingSequence = false;
        coreArrayPointer = (coreArrayPointer + 1) % structuralRolesArray.length;
        computationDelay = 400; // Rest phase before next insertion
    }

    setTimeout(processTypeSequenceEngine, computationDelay);
}
// Launch typing system cycle
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(processTypeSequenceEngine, 1000);
});

// INTERACTIVE 3D AXIS CARD MAGNET INTERFACING
document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const boundary = card.getBoundingClientRect();
        const horizontalVector = e.clientX - boundary.left - (boundary.width / 2);
        const verticalVector = e.clientY - boundary.top - (boundary.height / 2);
        card.style.transform = `perspective(1000px) rotateX(${-verticalVector * 0.015}deg) rotateY(${horizontalVector * 0.015}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
});

// PROMINENT SCALED CURSOR REPULSION PHYSICS BACKDROP ENGINE
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let nodeArray = [];
let cursor = { x: null, y: null };

function syncCanvasViewport() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', syncCanvasViewport);
syncCanvasViewport();

window.addEventListener('mousemove', (e) => {
    cursor.x = e.clientX;
    cursor.y = e.clientY;
});
window.addEventListener('mouseleave', () => {
    cursor.x = null;
    cursor.y = null;
});

class KineticSpaceNode {
    constructor() {
        this.baseX = Math.random() * canvas.width;
        this.baseY = Math.random() * canvas.height;
        this.x = this.baseX;
        this.y = this.baseY;
        this.radius = Math.random() * 2.8 + 1.4; // Scaled Up Background Nodes
        this.vx = Math.random() * 0.4 - 0.2;
        this.vy = Math.random() * 0.4 - 0.2;
    }
    advance() {
        this.baseX += this.vx;
        this.baseY += this.vy;
        
        if (this.baseX > canvas.width || this.baseX < 0) this.vx *= -1;
        if (this.baseY > canvas.height || this.baseY < 0) this.vy *= -1;

        if (cursor.x !== null && cursor.y !== null) {
            let dx = this.x - cursor.x;
            let dy = this.y - cursor.y;
            let distance = Math.hypot(dx, dy);
            let repulsionRadius = 150; 

            if (distance < repulsionRadius) {
                let force = (repulsionRadius - distance) / repulsionRadius;
                this.x += (dx / distance) * force * 7;
                this.y += (dy / distance) * force * 7;
                return;
            }
        }
        
        this.x += (this.baseX - this.x) * 0.08;
        this.y += (this.baseY - this.y) * 0.08;
    }
    render() {
        ctx.fillStyle = 'rgba(0, 229, 255, 0.32)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < 65; i++) {
    nodeArray.push(new KineticSpaceNode());
}

function processConstellationPipeline() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    nodeArray.forEach(node => {
        node.advance();
        node.render();
    });

    for (let a = 0; a < nodeArray.length; a++) {
        for (let b = a + 1; b < nodeArray.length; b++) {
            const distanceDelta = Math.hypot(nodeArray[a].x - nodeArray[b].x, nodeArray[a].y - nodeArray[b].y);
            if (distanceDelta < 120) {
                ctx.strokeStyle = `rgba(0, 229, 255, ${0.14 * (1 - distanceDelta / 120)})`;
                ctx.lineWidth = 0.6;
                ctx.beginPath();
                ctx.moveTo(nodeArray[a].x, nodeArray[a].y);
                ctx.lineTo(nodeArray[b].x, nodeArray[b].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(processConstellationPipeline);
}
processConstellationPipeline();