const addToCartBtn = document.querySelector('.cart-btn');

addToCartBtn.addEventListener('click',(ev)=>{
    const productId = addToCartBtn.getAttribute('productId');
    // console.log('Added to cart: ',productId);

    axios.get(`/shop/addtocart?productId=${productId}`)
        .then((res)=>{
            let cartCount = document.querySelector('.cart-count');
            let x = (Number(cartCount.innerText));
            x++;
            cartCount.innerText = x;
        })
        .catch((err)=>{
            console.log(err);
        })
})