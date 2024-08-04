async function fetchShow() {
    const apiUrl = 'http://localhost:3000';
    try {
        const productResponse = await fetch(`${apiUrl}/product`);
        const orderResponse = await fetch(`${apiUrl}/order`);
        const productData = await productResponse.json();
        const orderData = await  orderResponse.json();
        
        const countOrder = document.querySelector("#coutOrder");
        if (countOrder) {
            const totalQty =orderData.length;
            const HTML = showCountOrder(totalQty);
            countOrder.innerHTML = HTML;
        }

        const containerOrder = document.querySelector('#containerOrder');
        if (containerOrder) {
            orderData.forEach(order => {
                let sttOrder = "";
                if(order.stt === 1){
                    sttOrder = "Chờ xác nhận";
                }
                else if(order.stt === 2){
                    sttOrder = "Chờ giao hàng";
                }
                else if(order.stt === 3){
                    sttOrder = "Đang giao hàng";
                }
                else if(order.stt === 4){
                    sttOrder = "Đã giao hàng";
                }
                else if(order.stt === 5){
                    sttOrder = "Hoàn / trả hàng";
                }
                let totalAll = 0;
                order.orderProduct.forEach(product => {
                    totalAll += product.thanhTien;
                });
        
                const HTML = showOrder(order.id, order.orderDate,order.hoTen, order.stt, sttOrder, totalAll);
                containerOrder.innerHTML += HTML;
                
            });
        }
       
        
       
    
    } catch (error) {
        console.error(`Lỗi : ${error}`);
    }
}
fetchShow();
function showOrder(id, orderDate, hoTen,stt, sttOrder, totalAll) {
    return `
        <tr>
            <td>#${id}</td>
            <td>${orderDate}</td>
            <td>${hoTen}</td>
            <td id="stt" class="dot-stt">
            <select class="btn-confirm" name="" id="orderStatus" onchange="updateOrderStatus('${id}')">
                    <option value="${stt}">${sttOrder}</option>
                    <option value="2">Chờ giao hàng</option>
                    <option value="3">Đang giao hàng</option>
                    <option value="4">Đã giao hàng</option>
                    <option value="5">Hoàn / trả hàng</option>
                </select>
        
            </td>
            <td>${formatMoney(totalAll)}</td>
            <td><a href=""><p>Xem chi tiết >></p></a></td>
        </tr>
    `;
}
function showCountOrder(totalQty){
    return`
        <p>Tổng đơn hàng:  ${totalQty}</p>
    `;
}
function formatMoney(number) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
}

async function updateOrderStatus(orderId) {
    const orderStatusSelect = document.getElementById('orderStatus');
    const newStatus = orderStatusSelect.value;
    // console.log(newStatus);
    try {
        const apiUrl = `http://localhost:3000/order/${orderId}`;
        const orderDataResponse = await fetch(apiUrl);
        const orderData = await orderDataResponse.json();

        const response = await fetch(apiUrl, {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({ stt: parseInt(newStatus) }),
        });

        if (!response.ok) {
            throw new Error('Lỗi khi cập nhật trạng thái');
        }
        fetchShow();
    } catch (error) {
        console.error(`${error.message}`);
    }
}
