const cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const subtotalElement = document.getElementById("subtotal");
    const taxesElement = document.getElementById("taxes");
    const totalAmountElement = document.getElementById("total-amount");
    let subtotal = 0;

    cartItems.innerHTML = "";
    cart.forEach((item, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td><img src="${item.image}" alt="${item.name}"></td>
            <td>${item.name}</td>
            <td><input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}"></td>
            <td>GH₵ ${item.price.toFixed(2)}</td>
            <td>GH₵ ${(item.quantity * item.price).toFixed(2)}</td>
            <td><button class="remove-button" data-index="${index}">Remove</button></td>
        `;

        cartItems.appendChild(row);
        subtotal += item.quantity * item.price;
    });

    const taxRate = 0.125;
    const taxes = subtotal * taxRate;
    const total = subtotal + taxes;

    subtotalElement.textContent = `Subtotal: GH₵ ${subtotal.toFixed(2)}`;
    taxesElement.textContent = `Taxes: GH₵ ${taxes.toFixed(2)}`;
    totalAmountElement.textContent = `Total: GH₵ ${total.toFixed(2)}`;

    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', (event) => {
            const productId = event.target.getAttribute('data-id');
            const newQuantity = parseInt(event.target.value);
            const product = cart.find(item => item.id === productId);
            if (product) {
                product.quantity = newQuantity;
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartSummary();
            }
        });
    });

    document.querySelectorAll('.remove-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const productIndex = event.target.getAttribute('data-index');
            cart.splice(productIndex, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();
        });
    });

    console.log('Cart Items:', cart); // Debugging console log
}

function updateCartSummary() {
    const subtotalElement = document.getElementById("subtotal");
    const taxesElement = document.getElementById("taxes");
    const totalAmountElement = document.getElementById("total-amount");
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.quantity * item.price;
    });

    const taxRate = 0.125;
    const taxes = subtotal * taxRate;
    const total = subtotal + taxes;

    subtotalElement.textContent = `Subtotal: GHS ${subtotal.toFixed(2)}`;
    taxesElement.textContent = `Taxes: GHS ${taxes.toFixed(2)}`;
    totalAmountElement.textContent = `Total: GHS ${total.toFixed(2)}`;
}

function payWithPaystack() {
    const totalAmountText = document.getElementById("total-amount").textContent;
    console.log(`Total Amount Text: ${totalAmountText}`); 


    const totalAmountMatch = totalAmountText.match(/GH₵ ?([\d,.]+)/);
    if (!totalAmountMatch) {
        alert('Failed to extract total amount.');
        return;
    }

    const totalAmountCedis = parseFloat(totalAmountMatch[1].replace(/,/g, '')) * 100; 
    console.log(`Total Amount in Pesewas: ${totalAmountCedis}`);

    if (isNaN(totalAmountCedis) || totalAmountCedis <= 0) {
        alert('Transaction amount is not set or is invalid.');
        return;
    }

    const handler = PaystackPop.setup({
        key: 'pk_live_6ae61273e198a815cf8a88db80882b3e432347c5', 
        email: 'customer@example.com', 
        amount: totalAmountCedis,
        currency: 'GHS',
        ref: '' + Math.floor(Math.random() * 1000000000 + 1), 
        channels: ['mobile_money', 'card'], 
        callback: function(response) {
            alert('Payment successful. Transaction reference: ' + response.reference);
            localStorage.removeItem('cart');
            updateCart();
        },
        onClose: function() {
            alert('Payment window closed.');
        }
    });

    handler.openIframe();
}

document.getElementById("checkout-button").addEventListener("click", payWithPaystack);

updateCart();
