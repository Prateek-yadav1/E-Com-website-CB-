const writeReviewBtn = document.querySelector('.write-review-btn');
const reviewInput = document.querySelector('.review-input');

writeReviewBtn.addEventListener('click',(e)=>{
    reviewInput.classList.toggle('hide');
})

// Submit review logic
const reviewName = document.querySelector('.review-name');
const reviewDesc = document.querySelector('.review-desc');
const productID = document.querySelector('.productID');
const submitReviewBtn = document.querySelector('.submit-review-btn');

function updateReviewList(reviews){
    const reviewsList = document.querySelector('.reviews-list');
    reviewsList.innerText = '';
            
    reviews.forEach((element)=>{
        let li = document.createElement('li');
        li.innerHTML = `
            <li class="review-list-item">
                <h4>${element.title}</h4>
                <p>${element.desc}</p>
                <button class="dlt-review-btn">
                    <a href="/admin/deletereview?id=${element._id}&productId=${productID.value}">Delete</a>
                </button>
            </li>
        `;
        reviewsList.append(li);
    })
}

submitReviewBtn.addEventListener('click',(ev)=>{
    const reviewNameText = reviewName.value;
    const reviewDescText = reviewDesc.value;
    const productIDText = productID.value;

    reviewName.value = reviewDesc.value = '';
    reviewInput.classList.toggle('hide');

    axios.post('/shop/submitreview', {
        title: reviewNameText,
        desc: reviewDescText,
        prodID: productIDText
    })
    .then((response)=>{
        // console.log(response);
        updateReviewList(response.data.reviews)
    })
    .catch((error)=>{
        console.log(error);
    }); 
})