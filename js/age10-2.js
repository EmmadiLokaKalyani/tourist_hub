let cont = document.getElementById("container");
let data = [];
let ratingBtn = document.getElementById("ratingSelect");
let priceBtn = document.getElementById("priceSelect");
let btnBox = document.getElementById("btnbox");
fetching(1);

function fetching(pageNum) {
    fetch('json/age10-2.json')  // Assuming age10.json is in the same directory as your HTML file
        .then(function(res) {
            return res.json();
        })
        .then(function(datas) {
            let itemsPerPage = 18;
            let startIndex = (pageNum - 1) * itemsPerPage;
            let endIndex = startIndex + itemsPerPage;
            let pageData = datas.slice(startIndex, endIndex);
            
            let totalBtn = Math.ceil(datas.length / itemsPerPage); // Calculate total number of pages
            btnBox.innerHTML = null; // Clear existing buttons
            for (let i = 1; i <= totalBtn; i++) {
                btnBox.append(createButton(i, i)); // Create pagination buttons
            }
            
            return pageData;
        })
        .then(function(data) {
            display(data);
        })
        .catch(function(err) {
            console.log(err);
        });
}


function display(data) {
    cont.innerHTML = "";

    data.forEach(function(item) {
        let anchor = document.createElement("a");
        anchor.setAttribute("href", "./destination.html");
        anchor.addEventListener("click", function() {
            let destination = [];
            destination.push(item);
            localStorage.setItem("destination", JSON.stringify(destination));
        });

        let card = document.createElement("div");

        let image = document.createElement("img");
        image.setAttribute("src", item.image);

        let name = document.createElement("h5");
        name.innerText = item.name;

        let location = document.createElement("h4");
        location.innerText = item.location;

        let box = document.createElement("div");

        let rating = document.createElement("h6");
        rating.innerText = `⭐ ${Number(item.rating) / 20}`;

        let price = document.createElement("h6");
        price.innerText = `₹ ${Number(item.price) } / Person`;

        box.append(rating, price);
        card.append(image, name, location, box);
        anchor.append(card);
        cont.append(anchor);
    });
}

let downBtn = document.getElementById("decrease");
downBtn.addEventListener("click", function() {
    ratingBtn.value = "";
    priceBtn.value = "";
    data.sort(function(a, b) {
        return b.price - a.price;
    });
    display(data);
});
let searchBar = document.getElementById("searchBar");

searchBar.addEventListener("input", function() {
    let searched = data.filter(function(item) {
        if (item.name.toUpperCase().includes(searchBar.value.toUpperCase())) {
            return true;
        } else {
            return false;
        }
    });
    display(searched);
});

priceBtn.addEventListener("change", function() {
    ratingBtn.value = "";
    if (priceBtn.value == "") {
        display(data);
    } else {
        let priceData = data.filter(function(ele) {
            if (Number(ele.price * 10) < Number(priceBtn.value)) {
                return true;
            } else {
                return false;
            }
        });
        display(priceData);
    }
});

ratingBtn.addEventListener("change", function() {
    priceBtn.value = "";
    if (ratingBtn.value == "") {
        display(data);
    } else {
        let rate = data.filter(function(element) {
            if (Number(element.rating / 20) < Number(ratingBtn.value)) {
                return true;
            } else {
                return false;
            }
        });
        // console.log(rate);
        display(rate);
    }
});

function createButton(a, b) {
    let btn = document.createElement("button");
    btn.setAttribute("data-id", b);
    btn.innerText = a;
    btn.addEventListener("click", function(e) {
        fetching(e.target.dataset.id);
    });
    return btn;
}