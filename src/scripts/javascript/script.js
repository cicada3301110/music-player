const background = $("body"),
    musicFile = $(".music"),
    timeLine = $("#time-line"),
    likeBtn = $("#like-button"),
    repeatBtn = $("#repeat-button"),
    likeIcon = $("#like"),
    repeatIcon = $(".loop"),
    musicStatus = $("#status"),
    musicName = $("#music-name"),
    artist = $("#artist"),
    currentTime = $("#current-time"),
    duration = $("#duration"),
    playPauseIcon = $("#play-pause-icon"),
    playPause = $("#play-pause"),
    backward = $("#backward"),
    backwardSecond = $("#backward-second"),
    forwardSecond = $("#forward-second"),
    forward = $("#forward"),
    coverImageBox = $(".cover-image"),
    music = [
        {
            id: 1,
            source: "./assets/media/music1.mp3",
            coverSource: "./assets/images/cover1.jpg",
            name: "lotus",
            artist: "unknown artist",
        },
        {
            id: 2,
            source: "./assets/media/music2.mp3",
            coverSource: "./assets/images/cover2.jpg",
            name: "ash",
            artist: "unknown artist",
        },
        {
            id: 3,
            source: "./assets/media/music3.mp3",
            coverSource: "./assets/images/cover3.jpg",
            name: "meditation",
            artist: "unknown artist",
        },
        {
            id: 4,
            source: "./assets/media/music4.mp3",
            coverSource: "./assets/images/cover4.jpg",
            name: "amelie",
            artist: "unknown artist",
        },
        {
            id: 5,
            source: "./assets/media/music5.mp3",
            coverSource: "./assets/images/cover5.jpg",
            name: "relax music",
            artist: "unknown artist",
        },
        {
            id: 6,
            source: "./assets/media/music6.mp3",
            coverSource: "./assets/images/cover6.jpg",
            name: "duydum ki unutmuşsun",
            artist: "cengiz coşkun",
        },
    ];
let randomNumber,
    currentTimeMinute,
    currentTimeSecond,
    durationMinute,
    durationSecond,
    interval,
    isLiked = false,
    isRepeat = false,
    isPlaying = false;
const onLoad = () => {
    randomNumber = Math.floor(Math.random() * music.length);
    coverImageBox.css(
        "cssText",
        `background: url(${music[randomNumber].coverSource}) no-repeat center / cover;`
    );
    background.css(
        "cssText",
        `background: url(${music[randomNumber].coverSource}) no-repeat center / cover;`
    );
    musicFile.attr("src", music[randomNumber].source);
    musicName.html(music[randomNumber].name);
    artist.html(music[randomNumber].artist);
    currentTime.html("00 : 00");
    duration.html("00 : 00");
}
const likeHandler = () => {
    if (!isLiked) {
        likeIcon.attr("href", "#liked");
        Swal.fire({
            icon: "success",
            title: "Good Job",
            text: "Music added to liked songs !",
        });
        isLiked = true;
    }
    else {
        likeIcon.attr("href", "#unliked");
        Swal.fire({
            icon: "info",
            title: "Good Job",
            text: "Music removed from liked songs !",
        });
        isLiked = false;
    }
}
const repeatHandler = () => {
    if (!isRepeat) {
        repeatIcon.css("color", "#5b21b6");
        isRepeat = true;
    }
    else {
        repeatIcon.css("color", "#000");
        isRepeat = false;
    }
}
const playPauseHandler = () => {
    if (!isPlaying) {
        musicFile[0].play();
        timeLine.attr("max", Math.floor(musicFile[0].duration));
        interval = setInterval(() => {
            currentTimeMinute = Math.floor(musicFile[0].currentTime / 60);
            currentTimeSecond = Math.floor(musicFile[0].currentTime % 60);
            if (Math.floor(musicFile[0].currentTime / 60) < 10) {
                currentTimeMinute = `0${Math.floor(musicFile[0].currentTime / 60)}`;
            }
            if (Math.floor(musicFile[0].currentTime % 60) < 10) {
                currentTimeSecond = `0${Math.floor(musicFile[0].currentTime % 60)}`;
            }
            currentTime.html(`${currentTimeMinute} : ${currentTimeSecond}`);
            timeLine.val(Math.floor(musicFile[0].currentTime));
            if (timeLine.val() === timeLine.attr("max") && isRepeat) {
                musicFile[0].currentTime = 0;
            }
            if (timeLine.val() === timeLine.attr("max") && !isRepeat) {
                timeLine.val(0);
                playPauseIcon.attr("href", "#play");
                playPause.attr("title", "Play");
                musicStatus.html("-----");
                coverImageBox.css("animation", "");
                currentTime.html("00 : 00");
                duration.html("00 : 00");
                clearInterval(interval);
                isPlaying = false;
            }
        }, 1);
        durationMinute = Math.floor(musicFile[0].duration / 60);
        durationSecond = Math.floor(musicFile[0].duration % 60);
        if (Math.floor(musicFile[0].duration / 60) < 10) {
            durationMinute = `0${Math.floor(musicFile[0].duration / 60)}`;
        }
        if (Math.floor(musicFile[0].duration % 60) < 10) {
            durationSecond = `0${Math.floor(musicFile[0].duration % 60)}`;
        }
        playPauseIcon.attr("href", "#pause");
        playPause.attr("title", "Pause");
        musicStatus.html("now playing");
        coverImageBox.css("animation", "spin 30s linear infinite");
        duration.html(`${durationMinute} : ${durationSecond}`);
        isPlaying = true;
    }
    else {
        musicFile[0].pause();
        playPauseIcon.attr("href", "#play");
        playPause.attr("title", "Play");
        musicStatus.html("paused");
        coverImageBox.css("animation", "");
        isPlaying = false;
    }
}

const forwardSecondHandler = () => {
    if (!isPlaying) {
        Swal.fire({
            icon: "error",
            title: "Oops ...",
            text: "Play the music at first !",
        });
    }
    else {
        musicFile[0].currentTime += 5;
    }
}
const backwardSecondHandler = () => {
    if (!isPlaying) {
        Swal.fire({
            icon: "error",
            title: "Oops ...",
            text: "Play the music at first !",
        });
    }
    else {
        musicFile[0].currentTime -= 5;
    }
}

const forwardHandler = () => {
    if (isPlaying) {
        musicFile[0].pause();
        playPauseIcon.attr("href", "#play");
        playPause.attr("title", "Play");
        musicStatus.html("-----");
        coverImageBox.css("animation", "");
        isPlaying = false;
    }
    randomNumber++;
    if (randomNumber >= music.length) {
        randomNumber = 0;
    }
    coverImageBox.css(
        "cssText",
        `background: url(${music[randomNumber].coverSource}) no-repeat center / cover;`
    );
    background.css(
        "cssText",
        `background: url(${music[randomNumber].coverSource}) no-repeat center / cover;`
    );
    musicFile.attr("src", music[randomNumber].source);
    musicName.html(music[randomNumber].name);
    artist.html(music[randomNumber].artist);
    likeIcon.attr("href", "#unliked");
    isLiked = false;
}

const backwardHandler = () => {
    if (isPlaying) {
        musicFile[0].pause();
        playPauseIcon.attr("href", "#play");
        playPause.attr("title", "Play");
        musicStatus.html("-----");
        coverImageBox.css("animation", "");
        isPlaying = false;
    }
    randomNumber--;
    if (randomNumber < 0) {
        randomNumber = music.length - 1;
    }
    coverImageBox.css(
        "cssText",
        `background: url(${music[randomNumber].coverSource}) no-repeat center / cover;`
    );
    background.css(
        "cssText",
        `background: url(${music[randomNumber].coverSource}) no-repeat center / cover;`
    );
    musicFile.attr("src", music[randomNumber].source);
    musicName.html(music[randomNumber].name);
    artist.html(music[randomNumber].artist);
    likeIcon.attr("href", "#unliked");
    isLiked = false;
}

$(window).on("load", onLoad);
likeBtn.click(likeHandler);
repeatBtn.click(repeatHandler);
playPause.click(playPauseHandler);
forwardSecond.click(forwardSecondHandler);
backwardSecond.click(backwardSecondHandler);
forward.click(forwardHandler);
backward.click(backwardHandler);