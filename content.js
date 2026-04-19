function addDownloadButton(video) {
    if (video.dataset.btnAdded) return;

    const btn = document.createElement("button");
    btn.innerText = "⬇ Download";
    btn.style.position = "absolute";
    btn.style.top = "10px";
    btn.style.right = "10px";
    btn.style.zIndex = "9999";
    btn.style.background = "red";
    btn.style.color = "white";
    btn.style.padding = "5px";
    btn.style.border = "none";
    btn.style.cursor = "pointer";

    btn.onclick = () => {
        const url = video.currentSrc || video.src;

        if (!url) {
            alert("Video URL not found");
            return;
        }

        chrome.runtime.sendMessage({
            action: "download",
            url: url
        });
    };

    const parent = video.parentElement;
    if (parent) {
        parent.style.position = "relative";
        parent.appendChild(btn);
    }

    video.dataset.btnAdded = "true";
}

// 🔥 detect video again & again
setInterval(() => {
    const videos = document.querySelectorAll("video");

    videos.forEach(video => {
        addDownloadButton(video);
    });
}, 2000);