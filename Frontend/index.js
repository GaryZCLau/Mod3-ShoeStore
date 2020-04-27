// Code your solution here
let shoeList = document.querySelector("ul#shoe-list")
let mainShoe = document.querySelector("div#main-shoe")

// shoes to side bar
fetch("http://localhost:3000/shoes").then(r => r.json())
    .then((shoeArray) => {
        shoeArray.forEach((shoe) => {
            makeShoeToLi(shoe)
        })
    })

function makeShoeToLi (shoe) {
    let shoeLi = document.createElement("li")
    shoeLi.classList.add("list-group-item")
    shoeLi.innerText = shoe.name
    shoeList.append(shoeLi)
// shoes appended to side bar

// click on shoe to put in main
    shoeLi.addEventListener("click", (evt) => {
        mainShoe.innerHTML = ""
        mainShoe.innerHTML =
        `<img class="card-img-top" id="shoe-image" src="${shoe.image}">
        <div class="card-body">
    
        <h4 class="card-title" id="shoe-name">${shoe.name}</h4>
        <p class="card-text" id="shoe-description">${shoe.description}</p>
        <p class="card-text"><small class="text-muted" id="shoe-price">${shoe.price}</small></p>
    
        <div class="container" id="form-container">
        <!-- FORM GOES HERE -->
        <form id="new-review">
            <div class="form-group">
                <textarea class="form-control" id="review-content" rows="3"></textarea>
                <input type="submit" class="btn btn-primary"></input>
            </div>
        </form>
        </div>
    
        </div>
        <h5 class="card-header">Reviews</h5>
        <ul class="list-group list-group-flush" id="reviews-list">
        <!-- REVIEWS GO HERE -->
        </ul>`
        // reviews
        let reviewUl = mainShoe.querySelector("ul#reviews-list")
        shoe.reviews.forEach((review) => {
            let reviewLi = document.createElement("li")
            reviewLi.innerText = review.content
            reviewUl.append(reviewLi)

        })
        // reviews
    
    
        // main shoe form logic
        let newReviewForm = mainShoe.querySelector("form#new-review")
        newReviewForm.addEventListener("submit", (evt) => {
            evt.preventDefault()
            let newReview = newReviewForm.querySelector("#review-content").value
            fetch(`http://localhost:3000/shoes/${shoe.id}/reviews`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    content: newReview
                })
            }).then(r => r.json()).then((createdReview) => {
                // shoe.reviews = shoe.reviews.push(createdReview)
                let newShoeReviewLi = document.createElement("li")
                newShoeReviewLi.innerText = createdReview.content
                reviewUl.append(newShoeReviewLi)
            })
        })
        // main shoe form logic


    })
}
// click on shoe to put in main

// main shoe container

fetch(`http://localhost:3000/shoes/1`).then(r => r.json())
.then((firstShoe) => {
    mainShoe.innerHTML =
    `<img class="card-img-top" id="shoe-image" src="${firstShoe.image}">
    <div class="card-body">

    <h4 class="card-title" id="shoe-name">${firstShoe.name}</h4>
    <p class="card-text" id="shoe-description">${firstShoe.description}</p>
    <p class="card-text"><small class="text-muted" id="shoe-price">${firstShoe.price}</small></p>

    <div class="container" id="form-container">
    <!-- FORM GOES HERE -->
    <form id="new-review">
        <div class="form-group">
            <textarea class="form-control" id="review-content" rows="3"></textarea>
            <input type="submit" class="btn btn-primary"></input>
        </div>
    </form>
    </div>

    </div>
    <h5 class="card-header">Reviews</h5>
    <ul class="list-group list-group-flush" id="reviews-list">
    <!-- REVIEWS GO HERE -->
    </ul>`
    // reviews
    let reviewUl = mainShoe.querySelector("ul#reviews-list")
    firstShoe.reviews.forEach((review) => {
        let reviewLi = document.createElement("li")
        reviewLi.innerText = review.content
        reviewUl.append(reviewLi)
    })
    // reviews


    // main shoe form logic
    let newReviewForm = mainShoe.querySelector("form#new-review")
    newReviewForm.addEventListener("submit", (evt) => {
        evt.preventDefault()
        let newReview = newReviewForm.querySelector("#review-content").value
        fetch(`http://localhost:3000/shoes/1/reviews`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                content: newReview
            })
        }).then(r => r.json()).then((createdReview) => {
            // firstShoe.reviews = firstShoe.reviews.push(createdReview)
            let newShoeReviewLi = document.createElement("li")
            newShoeReviewLi.innerText = createdReview.content
            reviewUl.append(newShoeReviewLi)
        })
    })
    // main shoe form logic

})

{/* main shoe container */}