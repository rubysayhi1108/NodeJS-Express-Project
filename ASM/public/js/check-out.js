loadCartFromSessionStorage();
renderProduct(); 
function showOrderSuccessPopup() {
    var confirmationPopup = document.getElementById('confirmation-popup');
    confirmationPopup.style.display = 'flex';
}
// function validateForm() {
//     var addressError = document.getElementById('address-error');
    
//     if (addressError !== null) {
//         var hoTen = document.getElementById('hoTen').value;
//         var soDienThoai = document.getElementById('soDienThoai').value;
//         var email = document.getElementById('email').value;
//         var diaChiCuThe = document.getElementById('diaChiCuThe').value;
//         var phuongXa = document.getElementById('phuongXa').value;
//         var quanHuyen = document.getElementById('quanHuyen').value;
//         var tinhThanhPho = document.getElementById('tinhThanhPho').value;

//         if (hoTen && soDienThoai && validateEmail(email) && diaChiCuThe && phuongXa && quanHuyen && tinhThanhPho) {
//             addressError.textContent = ''; 
//         } else {
//             addressError.textContent = 'Vui lòng điền đầy đủ thông tin và email hợp lệ.';
//             return false; 
//         }
//     }
// }
function validateEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function saveCart() {
    sessionStorage.setItem('cart', JSON.stringify(arrCart));
}
function loadCartFromSessionStorage() {
    const storedCart = sessionStorage.getItem('cart');
    if (storedCart) {
        arrCart = JSON.parse(storedCart);
    }
}
function placeOrder() {
    validateForm(); 
    renderProduct();  
    clearCart(); 
}
function renderProduct() {
    const cartShow = document.querySelector('#container-product-cart');
    let tongTien = 0;
    let ship = 0;
    let totalAll = 0;
    cartShow.innerHTML = '';

    arrCart.forEach(product => {
        const { name, image, price, quantity } = product;
        const thanhTien = price * quantity;

        const boxSP = `
            <div class="box-sp">
                <div class="sp">
                    <img src="${image}" alt="">
                    <h4 class="ten">${name}</h4>
                    <p style="color: red;" class="gia">${formatMoney(price)}</p>
                    <p>X${quantity}</p>
                </div>
            </div>
        `;

        cartShow.innerHTML += boxSP;
        tongTien += thanhTien;
    });

    if (ship === 0) {
        totalAll = tongTien;
    } else {
        totalAll = tongTien + ship;
    }

    document.querySelector('#shipping').textContent = formatMoney(ship);
    document.querySelector('#total').innerHTML = `<h3>Tạm tính :</h3><h3>${formatMoney(tongTien)}</h3>`;
    document.querySelector('#shipping').innerHTML = `<h3>Phí vận chuyển:</h3><h3>${formatMoney(ship)}</h3>`;
    document.querySelector('#totalAll').innerHTML = `<h2 name="totalAll">Tổng:</h2><h2>${formatMoney(totalAll)}</h2>`;
}


function clearCart() {
    arrCart = []; 
    saveCart(); 
}
function formatMoney(number) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
}
var orderSuccessPopup = document.getElementById('confirmation-popup');
var btnOrder = document.getElementById('btnOrder');
btnOrder.addEventListener('click', async function () {
    var addressError = document.getElementById('address-error');
    var orderSuccessPopup = document.getElementById('orderSuccessPopup');
    
    if (addressError !== null) {
        const hoTen = document.getElementById('hoTen').value;
        const soDienThoai = document.getElementById('soDienThoai').value;
        const email = document.getElementById('email').value;
        const diaChiCuThe = document.getElementById('diaChiCuThe').value;
        const phuongXa = document.getElementById('phuongXa').value;
        const quanHuyen = document.getElementById('quanHuyen').value;
        const tinhThanhPho = document.getElementById('tinhThanhPho').value;
        const shipping = document.getElementById('shipping').value;
        const pttt = document.getElementById('thanhToan').value;
        const orderProduct = renderProduct();
        const stt = 1;

        // if (hoTen && soDienThoai && validateEmail(email) && diaChiCuThe && phuongXa && quanHuyen && tinhThanhPho && shipping && pttt && orderProduct.length > 0) {
        //     addressError.textContent = '';
        //     const isValidForm = true;

        //     if (isValidForm) {
        //         try {
        //             const apiUrl = 'http://localhost:3000/order';
        //             const orderDataResponse = await fetch(apiUrl);
        //             const orderData = await orderDataResponse.json();

        //             // Lấy thông tin ngày hiện tại
        //             const currentDate = new Date();
        //             const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
        //             const lastOrderId = orderData.length > 0 ? parseInt(orderData[orderData.length - 1].id, 10) : 0;
        //             const newOrderId = lastOrderId + 1;
        //             const order = {
        //                 'id': newOrderId.toString(),
        //                 'hoTen': hoTen,
        //                 'soDienThoai': soDienThoai,
        //                 'email': email,
        //                 'diaChiCuThe': diaChiCuThe,
        //                 'phuongXa': phuongXa,
        //                 'quanHuyen': quanHuyen,
        //                 'tinhThanhPho': tinhThanhPho,
        //                 'shipping': shipping,
        //                 'pttt': pttt,
        //                 'stt': stt,
        //                 'orderDate': formattedDate,
        //                 'orderProduct': orderProduct
        //             };

        //             const response = await fetch(apiUrl, {
        //                 method: 'POST',
        //                 headers: {
        //                     'Content-Type': 'application/json', 
        //                 },
        //                 body: JSON.stringify(order),
        //             });

        //             if (!response.ok) {
        //                 throw new Error('Lỗi khi thêm đơn hàng');
        //             }
        //             orderSuccessPopup.style.display = 'block';
                    
        //         } catch (error) {
        //             console.error(`${error.message}`);
        //         }
        //         clearCart();
        //         renderProduct();
        //     }
        // } else {
        //     const errCheckout = document.getElementById('errCheckout');
        //     if (orderProduct.length === 0) {
        //         errCheckout.textContent = 'Không có sản phẩm trong giỏ hàng. Vui lòng thêm sản phẩm trước khi thanh toán.';
        //     } else {
        //         addressError.textContent = 'Vui lòng điền đầy đủ thông tin và email hợp lệ.';
        //     }
           
        // }
    }
});

const handlesCheckOut = () => {
    const formCheckOut = document.querySelector("#formCheckOut");
    formCheckOut.onsubmit = async (event) => {
        event.preventDefault();
        // Lấy dữ liệu giỏ hàng từ sessionStorage
        const storedCart = sessionStorage.getItem('cart');
        const cartData = storedCart ? JSON.parse(storedCart) : [];

        const formData = new FormData(formCheckOut);
        const hoTen = formData.get('hoTen');
        const soDienThoai = formData.get('soDienThoai');
        const email = formData.get('email');
        const diaChiCuThe = formData.get('diaChiCuThe');
        const phuongXa = formData.get('phuongXa');
        const quanHuyen = formData.get('quanHuyen');
        const tinhThanhPho = formData.get('tinhThanhPho');
        const shipping = formData.get('shipping');
        const pttt = formData.get('thanhToan');
        const requestData = {
            hoTen,
            soDienThoai,
            email,
            diaChiCuThe,
            phuongXa,
            quanHuyen,
            tinhThanhPho,
            shipping,
            pttt,
            cartData  
        };

        const response = await fetch('/postCheckout', {
            method: 'POST',
            body: JSON.stringify(requestData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const res = await response.json();
        if (response.status == 400) {
            alert(`Thông báo: ${res.message}`);
        } else if (response.status == 200) {
            alert(`Thông báo: ${res.message}`);
            sessionStorage.removeItem('cart');
            setTimeout(() => {
                window.location.href = '/home';
            }, 1000)
        }
    }
}

handlesCheckOut();