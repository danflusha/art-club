document.addEventListener("click", e => {
    let checkbox = e.target.closest(".border-checkbox");
    if (checkbox) {
        checkbox.querySelector(".checkbox-div").classList.toggle("active");
    }
})