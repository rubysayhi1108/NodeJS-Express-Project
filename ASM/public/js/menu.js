async function fetchMenu() {
    const apiUrl = 'http://localhost:3000/categories';  
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const container = document.querySelector('#menuCate');
        data.forEach(category => {
            const categoryHTML = showMenu(category.id, category.name);
            container.innerHTML += categoryHTML;
        });
    } catch (error) {
        console.error(`Lỗi khi tải danh mục: ${error}`);
    }
}
fetchMenu();
function showMenu(id, name) {
    return `
        <li><a href="../layout/shop.html?id=${id}"> Đồng hồ ${name}</a></li>
    `;
}
