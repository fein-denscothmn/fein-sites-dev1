function loadFooter() {
    fetch('/externalization/commongdl.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('commongdl').innerHTML = data;
        })
        .catch(error => console.error('Error loading commongdl.html:', error));
}
window.onload = loadFooter;
