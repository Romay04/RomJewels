let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productElement = button.parentElement;
        const product = {
            id: productElement.getAttribute('data-id'),
            name: productElement.getAttribute('data-name'),
            price: parseFloat(productElement.getAttribute('data-price')),
            quantity: 1,
            image: productElement.querySelector('img').getAttribute('src') // Get the image source
        };

        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        showNotification('Item added to cart!');
        console.log('Cart:', cart); 
    });
});

function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notification-message');

    notificationMessage.textContent = message;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 1000); 
}
