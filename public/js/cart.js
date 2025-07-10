// Updating the quantity of item in cart
const cartBox = document.querySelector('.cart-box');
const priceValue = document.querySelector('.price-value');

cartBox.addEventListener('click',(ev)=>{
    let button = ev.target;
    let productId = button.getAttribute('productId');
    let sign = button.innerText;

    // Find the nearest .cart-items wrapper
    const cartItem = button.closest('.cart-items');

    // Then find the quantity span *inside* this item only
    const quantity = cartItem.querySelector('.quantity');

    if(sign === '+'){
        axios.get(`/shop/increasequantity?productId=${productId}`)
            .then((res)=>{
                quantity.innerText = res.data.quantity;
                priceValue.innerText = `₹${res.data.totalPrice}`;
            })
    }
    else if(sign === '-'){
        axios.get(`/shop/decreasequantity?productId=${productId}`)
            .then((res)=>{
                quantity.innerText = res.data.quantity;
                priceValue.innerText = `₹${res.data.totalPrice}`;
            })
    }
    else if (button.classList.contains('dlt-btn')) {
        axios.get(`/shop/deletecartitem?productId=${productId}`)
            .then((res) => {
                cartItem.remove();
                priceValue.innerText = `₹${res.data.totalPrice}`;
            });
    }
});