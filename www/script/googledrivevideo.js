function showVideo(container) {
    var thumbnail = container.querySelector('.thumbnail');
    var playButton = container.querySelector('.play-button-overlay');
    var iframe = container.nextElementSibling;
    
    if (iframe.style.display === 'none') {
        thumbnail.style.display = 'none';
        playButton.style.display = 'none';
        iframe.style.display = 'block';
    } else {
        iframe.src += "&autoplay=1";
    }
}