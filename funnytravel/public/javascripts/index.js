function articleHot() {
    document.getElementById("new-article").style.display = "none";
    document.getElementById("new-article-btn").style.color = "#929292";
    document.getElementById("hot-article").style.display = "block";
    document.getElementById("hot-article-btn").style.color = "black";
    
}

function articleNew() {
    document.getElementById("hot-article").style.display = "none";
    document.getElementById("hot-article-btn").style.color = "#929292";
    document.getElementById("new-article").style.display = "block";
    document.getElementById("new-article-btn").style.color = "black";
    
}
  $('.register').on('click', function () {
    window.location.href = './register';
  })
  $('.login').on('click', function () {
    window.location.href = './login';
  })