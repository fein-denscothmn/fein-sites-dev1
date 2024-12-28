document.addEventListener("DOMContentLoaded", function() {
    var coll = document.getElementsByClassName("collapsible");
    for (var i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.classList.contains("show")) {
                content.classList.remove("show");
                content.style.maxHeight = null;
                this.innerHTML = 'タップして開く ▼';
            } else {
                content.classList.add("show");
                content.style.maxHeight = content.scrollHeight + "px";
                this.innerHTML = 'タップして閉じる ▲';
            }
        });
    }
});
