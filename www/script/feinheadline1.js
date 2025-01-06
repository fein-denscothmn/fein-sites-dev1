document.addEventListener("DOMContentLoaded", function () {
 let headingsGenerated = false;
 document.getElementById("generate-headings").addEventListener("click", function () {
  let tocContainer = document.getElementById("toc-container");
  let button = document.getElementById("generate-headings");
  if (!headingsGenerated) {
   if (!tocContainer) {
    tocContainer = document.createElement("div");
    tocContainer.id = "toc-container";
   }
   let headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
   headings.forEach((heading, index) => {
    let id = `heading-${index + 1}`;
    heading.id = id;
    let tocItem = document.createElement("p");
    tocItem.classList.add("toc-item");
    switch (heading.tagName.toLowerCase()) {
     case "h1":
      tocItem.classList.add("toc-item-h1");
      break;
     case "h2":
      tocItem.classList.add("toc-item-h2");
      break;
     case "h3":
      tocItem.classList.add("indent-1");
      break;
     case "h4":
      tocItem.classList.add("indent-3");
      break;
     case "h5":
      tocItem.classList.add("indent-5", "feinheadline-h5");
      heading.classList.add("feinheadline-h5");
      break;
     case "h6":
      tocItem.classList.add("indent-5");
      break;
    }
    let link = document.createElement("a");
    link.href = `#${id}`;
    link.textContent = heading.textContent;
    tocItem.appendChild(link);
    tocContainer.appendChild(tocItem);
   });
   document.getElementById("generate-headings").insertAdjacentElement('afterend', tocContainer);
   headingsGenerated = true;
  }
  if (tocContainer.classList.contains("show")) {
   tocContainer.style.height = "0";
   button.textContent = button.getAttribute("data-open-text");
  } else {
   tocContainer.style.height = tocContainer.scrollHeight + "px";
   button.textContent = button.getAttribute("data-close-text");
  }
  setTimeout(() => {
   tocContainer.classList.toggle("show");
  }, 10);
 });
});
