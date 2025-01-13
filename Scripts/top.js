document.addEventListener("DOMContentLoaded", function() {
    const header = document.createElement('header');
    header.innerHTML = "<h1>Jungmin Lee's Resume</h1>";
    document.body.appendChild(header);
    header.classList.add("header");
    document.body.insertBefore(header, document.body.firstChild);
});
