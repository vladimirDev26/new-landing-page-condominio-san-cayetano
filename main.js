
const modalOverlay = document.getElementById('modalOverlay');
const modalImage = document.getElementById('modalImage');
const modalTitulo = document.getElementById('modalTitulo');
const modalDescripcion = document.getElementById('modalDescripcion');

function openModal(card) {
    const img = card.getAttribute('data-img');
    const titulo = card.getAttribute('data-titulo');
    const descripcion = card.getAttribute('data-descripcion');

    modalImage.src = img;
    modalImage.alt = titulo;
    modalTitulo.textContent = titulo;
    modalDescripcion.textContent = descripcion;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(event) {
    // Cierra si se hace click en el overlay o en el botón X
    if (event.target === modalOverlay || event.target.classList.contains('modal-close')) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restaura scroll
    }
}

// Cerrar con tecla Escape
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});

function openTab(evt, tabName) {
    // Ocultar todos los contenidos
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }

    // Quitar clase active de todos los botones
    const tabBtns = document.getElementsByClassName('tab-btn');
    for (let i = 0; i < tabBtns.length; i++) {
        tabBtns[i].classList.remove('active');
    }

    // Mostrar el tab seleccionado y activar el botón
    document.getElementById(tabName).classList.add('active');
    evt.currentTarget.classList.add('active');
}

function toggleFaq(button) {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains('active');

    // Cerrar todos los items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });

    // Abrir el item clickeado si no estaba activo
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================
       CARRUSEL 1: PROYECTOS (Nuestra manera de trabajar)
       ========================================== */
    const carruselProyectos = {
        container: document.getElementById('carrusel-proyectos'),
        slides: [],
        currentIndex: 0,
        
        init() {
            if (!this.container) return;
            
            this.slides = this.container.querySelectorAll('.carrusel-slide-proj');
            this.totalSlides = this.slides.length;
            this.dotsContainer = this.container.querySelector('.dots-proyectos');
            
            // Crear dots
            this.slides.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => this.goToSlide(index));
                this.dotsContainer.appendChild(dot);
            });
            
            this.dots = this.dotsContainer.querySelectorAll('.dot');
            this.update();
            
            // Botones
            this.container.querySelector('.prev').addEventListener('click', () => this.changeSlide(-1));
            this.container.querySelector('.next').addEventListener('click', () => this.changeSlide(1));
        },
        
        changeSlide(direction) {
            this.currentIndex += direction;
            if (this.currentIndex >= this.totalSlides) this.currentIndex = 0;
            if (this.currentIndex < 0) this.currentIndex = this.totalSlides - 1;
            this.update();
        },
        
        goToSlide(index) {
            this.currentIndex = index;
            this.update();
        },
        
        update() {
            // Actualizar slides
            this.slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === this.currentIndex);
            });
            
            // Actualizar dots
            this.dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentIndex);
            });
            
            // Actualizar contador
            const actualEl = this.container.querySelector('.slide-actual-proj');
            if (actualEl) actualEl.textContent = String(this.currentIndex + 1).padStart(2, '0');
            
            // Actualizar información
            const slideActivo = this.slides[this.currentIndex];
            const tituloEl = this.container.querySelector('.info-titulo-proj');
            const subtituloEl = this.container.querySelector('.info-subtitulo-proj');
            
            if (tituloEl) tituloEl.textContent = slideActivo.getAttribute('data-titulo') || '';
            if (subtituloEl) subtituloEl.textContent = slideActivo.getAttribute('data-subtitulo') || '';
        }
    };
    
    /* ==========================================
       CARRUSEL 2: EQUIPO COMERCIAL
       ========================================== */
    const carruselEquipo = {
        container: document.getElementById('carrusel-equipo'),
        slides: [],
        currentIndex: 0,
        
        init() {
            if (!this.container) return;
            
            this.slides = this.container.querySelectorAll('.carrusel-slide-eq');
            this.totalSlides = this.slides.length;
            this.update();
            
            // Botones
            const buttons = this.container.querySelectorAll('.carrusel-arrow');
            buttons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const direction = btn.classList.contains('prev') ? -1 : 1;
                    this.changeSlide(direction);
                });
            });
        },
        
        changeSlide(direction) {
            this.currentIndex += direction;
            if (this.currentIndex >= this.totalSlides) this.currentIndex = 0;
            if (this.currentIndex < 0) this.currentIndex = this.totalSlides - 1;
            this.update();
        },
        
        update() {
            // Actualizar slides
            this.slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === this.currentIndex);
            });
            
            // Actualizar contador
            const actualEl = this.container.querySelector('.slide-actual-eq');
            if (actualEl) actualEl.textContent = String(this.currentIndex + 1).padStart(2, '0');
            
            // Actualizar información
            const slideActivo = this.slides[this.currentIndex];
            
            const elementos = {
                nombre: '.info-nombre-eq',
                cargo: '.info-cargo-eq',
                subcargo: '.info-subcargo-eq',
                descripcion: '.info-descripcion-eq',
                telefono: '.info-telefono-eq',
                correo: '.info-correo-eq'
            };
            
            Object.keys(elementos).forEach(key => {
                const el = this.container.querySelector(elementos[key]);
                if (el) el.textContent = slideActivo.getAttribute(`data-${key}`) || '';
            });
        }
    };
    
    // Inicializar ambos carruseles
    carruselProyectos.init();
    carruselEquipo.init();
    
    // Navegación con teclado (opcional)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') carruselProyectos.changeSlide(-1);
        if (e.key === 'ArrowRight') carruselProyectos.changeSlide(1);
    });
});


// ===================== MENÚ HAMBURGUESA =====================
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        const isOpen = navMenu.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isOpen);
        
        // Bloquear scroll del body cuando el menú está abierto
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Cerrar menú al hacer clic en un enlace
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });

    // Cerrar menú con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
}