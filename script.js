```javascript
function toggleMenu() {
    const menu = document.getElementById("navMenu");

    if (menu.style.display === "flex") {
        menu.style.display = "none";
    } else {
        menu.style.display = "flex";
    }
}


document.querySelectorAll("#navMenu a").forEach(link => {

    link.addEventListener("click", () => {

        if (window.innerWidth <= 850) {
            document.getElementById("navMenu").style.display = "none";
        }

    });

});


window.addEventListener("resize", () => {

    const menu = document.getElementById("navMenu");

    if (window.innerWidth > 850) {
        menu.style.display = "flex";
    } else {
        menu.style.display = "none";
    }

});
```
