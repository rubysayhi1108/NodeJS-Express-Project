
// set active menu
document.addEventListener('DOMContentLoaded', function () {
    const currentPage = window.location.pathname.split('/').pop();
    const currentMenuItem = document.querySelector(`.left-container .list-menu ul li a[href$="${currentPage}"]`);
    if (currentMenuItem) currentMenuItem.classList.add('active');
});

function setActive(element) {
    const menuItems = document.querySelectorAll('.left-container .list-menu ul li a');
    menuItems.forEach(item => item.classList.remove('active'));
    element.classList.add('active');
}
// xem anh upload
function previewImage() {
    const input = document.getElementById('productImage');
    const preview = document.getElementById('preview');

    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            preview.src = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);
    }
}
function formatMoney(number) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
}

