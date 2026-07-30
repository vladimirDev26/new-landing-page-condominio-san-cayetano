
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