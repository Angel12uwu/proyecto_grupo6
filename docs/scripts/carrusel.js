

document.addEventListener("DOMContentLoaded", ()=>{
    let carruselPrincial = new Carrusel(
        document.querySelector(".carrusel")
    );
    carruselPrincial.init();
});


class Carrusel {
    contendor = null;
    track = null;
    items = [];
    originalItems = [];
    slidesCount = 0;

    direction = 1;

    timeInSeconds = 3;
    timerId = null;

    currentItem = 1;

    rightButton = null;
    leftButton = null;

    constructor(contenedor){
        this.contendor = contenedor;
        this.track = this.contendor.querySelector(".carrusel-track");

        this.originalItems = [...this.track.querySelectorAll(".carrusel-item")];
        this.slidesCount = this.originalItems.length;


        if (this.slidesCount === 0) {
            this.items = [];
            return;
        }

        this.cloneCount = Math.min(2, this.slidesCount);

        for (let i = this.cloneCount - 1; i >= 0; i--) {
            const idx = this.slidesCount - this.cloneCount + i;
            const clone = this.originalItems[idx].cloneNode(true);
            clone.classList.add('clone');
            this.track.insertBefore(clone, this.track.firstChild);
        }
        for (let i = 0; i < this.cloneCount; i++) {
            const clone = this.originalItems[i].cloneNode(true);
            clone.classList.add('clone');
            this.track.appendChild(clone);
        }

        this.items = [...this.track.querySelectorAll(".carrusel-item")];

        this.currentItem = this.cloneCount;

        if (this.items.length > this.cloneCount + 1) {
            const first = this.items[this.currentItem];
            const second = this.items[this.currentItem + 1];
            this.slideDistance = Math.abs(second.offsetLeft - first.offsetLeft) || first.getBoundingClientRect().width;
        } else if (this.items.length === 1) {
            this.slideDistance = this.items[0].getBoundingClientRect().width;
        } else {
            this.slideDistance = 0;
        }

        this.track.style.transform = `translateX(-${this.currentItem * this.slideDistance}px)`;

        this.track.addEventListener('transitionend', ()=>{
            const lastIndex = this.items.length - 1;
            if (!this.items.length) return;
            if (this.items[this.currentItem].classList.contains('clone')){

                const savedTransition = this.track.style.transition;
                this.track.style.transition = 'none';

                if (this.currentItem < this.cloneCount) {
                    this.currentItem = this.currentItem + this.slidesCount;
                } else if (this.currentItem >= this.cloneCount + this.slidesCount) {
                    this.currentItem = this.currentItem - this.slidesCount;
                }

                this.track.style.transform = `translateX(-${this.currentItem * this.slideDistance}px)`;

                this.track.offsetWidth;

                setTimeout(()=>{
                    this.track.style.transition = savedTransition || 'transform 0.7s ease-in-out';
                }, 20);
            }
            this.updateActive();
        });
    }

    init(){
        console.log("Carrusel Inicializado");
        console.log("items:", this.items);
        this.generateUX();
        this.updateActive();
        window.addEventListener('resize', ()=>{
            if (this.items.length > this.cloneCount + 1) {
                const first = this.items[this.currentItem];
                const second = this.items[this.currentItem + 1];
                this.slideDistance = Math.abs(second.offsetLeft - first.offsetLeft) || first.getBoundingClientRect().width;
            } else if (this.items.length === 1) {
                this.slideDistance = this.items[0].getBoundingClientRect().width;
            }
            // reposition to current
            this.track.style.transition = 'none';
            this.track.style.transform = `translateX(-${this.currentItem * this.slideDistance}px)`;
            this.track.offsetWidth;
            this.track.style.transition = 'transform 0.7s ease-in-out';
        });
        this.tick();
    }

    updateActive(){
        if (!this.originalItems || !this.originalItems.length) return;

        this.items.forEach(it=> it.classList.remove('active','left','right','center-strong'));
        this.originalItems.forEach(it=> it.classList.remove('active','left','right','center-strong'));

        const realCenter = ((this.currentItem - this.cloneCount) % this.slidesCount + this.slidesCount) % this.slidesCount;

        const centerEl = this.originalItems[realCenter];
        if (centerEl) centerEl.classList.add('active','center-strong');

        const leftReal = (realCenter - 1 + this.slidesCount) % this.slidesCount;
        const rightReal = (realCenter + 1) % this.slidesCount;
        if (this.originalItems[leftReal]) this.originalItems[leftReal].classList.add('left');
        if (this.originalItems[rightReal]) this.originalItems[rightReal].classList.add('right');

        if (this.items && this.items.length) {
            const dispCenter = (this.currentItem + this.items.length) % this.items.length;
            const dispLeft = (dispCenter - 1 + this.items.length) % this.items.length;
            const dispRight = (dispCenter + 1) % this.items.length;
            if (this.items[dispCenter]) this.items[dispCenter].classList.add('active','center-strong');
            if (this.items[dispLeft]) this.items[dispLeft].classList.add('left');
            if (this.items[dispRight]) this.items[dispRight].classList.add('right');
        }
        if (this.dotsContainer) {
            const dotIndex = realCenter;
            Array.from(this.dotsContainer.children).forEach((b, idx)=> b.classList.toggle('active', idx === dotIndex));
        }
    }

    generateUX(){
        const prevBtn = document.getElementById('prev');
        const nextBtn = document.getElementById('next');

        if (prevBtn && nextBtn) {
            this.leftButton = prevBtn;
            this.rightButton = nextBtn;

            this.rightButton.addEventListener("click", (e)=>{ this.moveToDirection(1); });
            this.leftButton.addEventListener("click", (e)=>{ this.moveToDirection(-1); });
        } else {
            this.rightButton = document.createElement("button");
            this.leftButton = document.createElement("button");
            this.rightButton.classList.add("carrusel_right");
            this.leftButton.classList.add("carrusel_left");
            this.rightButton.innerHTML = ">";
            this.leftButton.innerHTML = "<";

            this.rightButton.addEventListener("click", (e)=>{ this.moveToDirection(1); });
            this.leftButton.addEventListener("click", (e)=>{ this.moveToDirection(-1); });

            this.contendor.appendChild(this.rightButton);
            this.contendor.appendChild(this.leftButton);
        }

        const dotsContainer = document.querySelector('.carousel-dots');
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            for (let i = 0; i < this.slidesCount; i++) {
                const btn = document.createElement('button');
                btn.addEventListener('click', ()=>{
                    clearTimeout(this.timerId);
                    this.currentItem = i + this.cloneCount;
                    this.moveTo(this.currentItem);
                    this.tick();
                });
                if (i === 0) btn.classList.add('active');
                dotsContainer.appendChild(btn);
            }
            this.dotsContainer = dotsContainer;
        }
    }

    moveToDirection(nextDirection) {
        clearTimeout(this.timerId);
        this.direction = nextDirection;
        this.moveToNext();
        this.tick();
    }

    tick(){
        this.timerId = setTimeout(
            ()=>{
                this.moveToNext();
                this.tick()
            },
            this.timeInSeconds * 1000
        );
    }

    moveToNext(){

        this.currentItem = this.currentItem + this.direction;
        this.moveTo(this.currentItem);
    }

    moveTo(index){
        this.track.style.transition = 'transform 0.7s ease-in-out';
        this.track.style.transform = `translateX(-${index * this.slideDistance}px)`;
        if (this.dotsContainer) {
            const activeIndex = ((index - this.cloneCount) + this.slidesCount) % this.slidesCount;
            Array.from(this.dotsContainer.children).forEach((b, idx)=> b.classList.toggle('active', idx === activeIndex));
        }
        this.updateActive();
    }
}