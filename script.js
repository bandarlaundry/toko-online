// Toggle Hamburger Menu
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Page Navigation
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = e.target.getAttribute("href").substring(1);

    // Hide all pages
    document.querySelectorAll(".page").forEach((page) => {
      page.classList.add("hide");
    });

    // Show the selected page
    document.getElementById(targetId)?.classList.remove("hide");

    // Close the hamburger menu after selecting a link
    navLinks.classList.remove("active");
  });
});
