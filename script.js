const apiKey = "fedfca3255374eeeba2be303d5472ce4";
const content = document.getElementById("news-content");
const searchBox = document.getElementById("searchBar");
const searchForm = document.getElementById("search-form");

async function news1() {
    const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;
    let response = await fetch(url);
    let data = await response.json();
    displayNews(data);
}

async function news2(keyword) {
    const searchNewsUrl = `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${apiKey}`;
    let response = await fetch(searchNewsUrl);
    let data = await response.json();
    displayNews(data);
}

function displayNews(data) {
    // Clear existing content
    content.innerHTML = "";

    const articles = data.articles;
    articles.forEach(article => {
        const innerDiv = document.createElement("div");
        const heading = document.createElement("h3");
        const desc = document.createElement("p");
        const image = document.createElement("img");
        const newsLink = document.createElement("a");

        innerDiv.classList.add("news");
        newsLink.innerText = article.title;
        newsLink.href = article.url;
        newsLink.target = "_blank";
        desc.innerText = article.content || article.description || "";

        if (article.urlToImage) {
            image.src = article.urlToImage;
        } else {
            // Set a placeholder image if no image is available
            image.src = "placeholder-image-url";
        }

        innerDiv.appendChild(heading);
        heading.appendChild(newsLink);
        innerDiv.appendChild(image);
        innerDiv.appendChild(desc);

        content.appendChild(innerDiv);
    });
}

// Load news1 on page load
window.addEventListener("load", () => {
    const state = history.state;
    if (state && state.page === "news2") {
        const keyword = state.keyword;
        if (keyword) {
            news2(keyword);
        }
    } else {
        news1();
    }
});

// Handle search form submission
searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const keyword = searchBox.value.trim();
    if (keyword !== "") {
        await news2(keyword);
        // Update history state
        history.pushState({ page: "news2", keyword: keyword }, "", "");
    }
});

// Handle back button press
window.addEventListener("popstate", (event) => {
    const state = event.state;
    if (state && state.page === "news2") {
        const keyword = state.keyword;
        if (keyword) {
            news2(keyword);
        }
    } else {
        news1();
    }
});
 