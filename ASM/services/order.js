const openPopups = document.querySelectorAll('#orderDt'); 
const orderPopup = document.querySelector('#orderPopup');

openPopups.forEach(popup => popup.addEventListener('click', () => {
    orderPopup.style.display = 'block';
}));
