document.addEventListener("DOMContentLoaded", function() {
    // 全ての動画カードを取得
    const videoCards = document.querySelectorAll(".video-card");
    videoCards.forEach(videoCard => {
        const video = videoCard.querySelector(".myVideo");
        videoCard.querySelector(".play-pause").addEventListener("click", function() {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });
        videoCard.querySelector(".stop").addEventListener("click", function() {
            video.pause();
            video.currentTime = 0;
        });
        videoCard.querySelector(".mute-unmute").addEventListener("click", function() {
            video.muted = !video.muted;
        });
        videoCard.querySelector(".pip").addEventListener("click", async function() {
            try {
                if (video !== document.pictureInPictureElement) {
                    await video.requestPictureInPicture();
                } else {
                    await document.exitPictureInPicture();
                }
            } catch (error) {
                console.error("ピクチャインピクチャモードの切り替えエラー:", error);
            }
        });
    });
});
