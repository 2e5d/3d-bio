const overlay = document.getElementById('overlay');
const body = document.body;
const c3d = document.getElementById('c3d');
const mainCard = document.getElementById('mainCard');
const musicCard = document.getElementById('musicCard');
const profileImage = document.getElementById('profileImage');

const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const progress = document.getElementById('progress');
const currentTime = document.getElementById('currentTime');
const totalTime = document.getElementById('totalTime');
const songName = document.getElementById('songName');
const albumArt = document.getElementById('albumArt');

// Change this 
const playlist = [
    {
        title: "Example1",
        audioUrl: "",
        coverUrl: "https://files.catbox.moe/3ub9hk.jpg",
        duration: 180
    },
    {
        title: "Example2",
        audioUrl: "",
        coverUrl: "https://files.catbox.moe/3hk4r9.jpg",
        duration: 190
    },
    {
        title: "Example3",
        audioUrl: "",
        coverUrl: "https://files.catbox.moe/9rk4h3.jpg",
        duration: 175
    },
    {
        title: "Example4",
        audioUrl: "",
        coverUrl: "https://files.catbox.moe/h3k9r4.jpg",
        duration: 210
    },
    {
        title: "Example5",
        audioUrl: "",
        coverUrl: "https://files.catbox.moe/r4h9k3.jpg",
        duration: 165
    },
    {
        title: "Example6",
        audioUrl: "",
        coverUrl: "https://files.catbox.moe/k3r4h9.jpg",
        duration: 200
    },
    {
        title: "Example7",
        audioUrl: "",
        coverUrl: "https://files.catbox.moe/4h3r9k.jpg",
        duration: 185
    }
];

let currentTrack = 0;
let isPlaying = false;
let currentProgress = 0;
let isDragging = false;
let playbackInterval;
let currentSeconds = 0;
let audio = null;

// Change this 
const config = {
    profilePicUrl: 'https://files.catbox.moe/o3ohyb.png',
    username: 'Example',
    location: 'Example',
    description: 'Example',
    socialLinks: {
        spotify: 'https://spotify.com',
        github: 'https://github.com',
        x: 'https://x.com',
        telegram: 'https://telegram.org',
        instagram: 'https://instagram.com',
        youtube: 'https://youtube.com'
    },
    playlist: playlist
};

// don't change 
window.addEventListener('DOMContentLoaded', () => {

    if (config.profilePicUrl) {
        profileImage.src = config.profilePicUrl;
    }
    
    const usernameElement = document.querySelector('.username');
    if (usernameElement && config.username) {
        usernameElement.textContent = config.username;
    }
    

    const locationElement = document.querySelector('.location span');
    if (locationElement && config.location) {
        locationElement.textContent = config.location;
    }
    

    const descriptionElement = document.querySelector('.description');
    if (descriptionElement && config.description) {
        descriptionElement.textContent = config.description;
    }
    
    const links = document.querySelectorAll('.link');
    if (links.length >= 6) {
        links[0].href = config.socialLinks.spotify;
        links[1].href = config.socialLinks.github;
        links[2].href = config.socialLinks.x;
        links[3].href = config.socialLinks.telegram;
        links[4].href = config.socialLinks.instagram;
        links[5].href = config.socialLinks.youtube;
    }
  
    loadTrack(currentTrack);
});

overlay.addEventListener('click', () => {
    body.classList.add('overlay-hidden');
    setTimeout(() => {
        init3D();
        initMusic();
        startViews();
    }, 1500);
});

document.addEventListener('keydown', (e) => {
    if (!body.classList.contains('overlay-hidden')) {
        body.classList.add('overlay-hidden');
        setTimeout(() => {
            init3D();
            initMusic();
            startViews();
        }, 1500);
    }
});

function startViews() {
    let viewCount = 0;
    const viewCountElement = document.getElementById('viewCount');
    
    if (localStorage.getItem('profileViews')) {
        viewCount = parseInt(localStorage.getItem('profileViews'));
        viewCountElement.textContent = viewCount.toLocaleString();
    }
    
    setInterval(() => {
        if (Math.random() > 0.7) {
            viewCount++;
            viewCountElement.textContent = viewCount.toLocaleString();
            localStorage.setItem('profileViews', viewCount);
        }
    }, Math.random() * 10000 + 5000);
}

function init3D() {
    let isHovering = false;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    
    function animate() {
        currentX += (targetX - currentX) * 0.15;
        currentY += (targetY - currentY) * 0.15;
        
        c3d.style.transform = `
            rotateX(${currentY}deg) 
            rotateY(${currentX}deg)
            translateZ(${Math.abs(currentX + currentY) * 0.3}px)
        `;
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    function handleMouseMove(e) {
        isHovering = true;
        const rect = c3d.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const normalizedX = (mouseX / rect.width) - 0.5;
        const normalizedY = (mouseY / rect.height) - 0.5;
        targetX = normalizedX * 15;
        targetY = normalizedY * -12;
    }
    
    function reset3D() {
        isHovering = false;
        targetX = 0;
        targetY = 0;
    }
    
    c3d.addEventListener('mousemove', handleMouseMove);
    c3d.addEventListener('mouseleave', reset3D);
    mainCard.addEventListener('mousemove', handleMouseMove);
    musicCard.addEventListener('mousemove', handleMouseMove);
    mainCard.addEventListener('mouseleave', reset3D);
    musicCard.addEventListener('mouseleave', reset3D);
    
    let isTouching = false;
    c3d.addEventListener('touchstart', (e) => {
        isTouching = true;
        if (e.touches.length === 1) {
            const touch = e.touches[0];
            handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY });
        }
    });
    
    c3d.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (e.touches.length === 1 && isTouching) {
            const touch = e.touches[0];
            handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY });
        }
    });
    
    c3d.addEventListener('touchend', () => {
        isTouching = false;
        reset3D();
    });
}

function initMusic() {
    playBtn.addEventListener('click', togglePlay);

    prevBtn.addEventListener('click', () => {
        changeTrack(-1);
    });
    
    nextBtn.addEventListener('click', () => {
        changeTrack(1);
    });
    

    progressBar.addEventListener('click', (e) => {
        if (isDragging) return;
        const rect = progressBar.getBoundingClientRect();
        const clickPosition = e.clientX - rect.left;
        const newProgress = (clickPosition / rect.width) * 100;
        currentProgress = Math.max(0, Math.min(100, newProgress));
        progress.style.width = `${currentProgress}%`;
        updateTime();
        
    
        if (audio) {
            const track = playlist[currentTrack];
            const newTime = (currentProgress / 100) * track.duration;
            currentSeconds = newTime;
        }
    });
    
    
    progressBar.addEventListener('mousedown', startDrag);
    
 
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            togglePlay();
        } else if (e.code === 'ArrowLeft') {
            changeTrack(-1);
        } else if (e.code === 'ArrowRight') {
            changeTrack(1);
        }
    });
}

function loadTrack(trackIndex) {
    currentTrack = trackIndex;
    const track = playlist[trackIndex];
  
    songName.textContent = track.title;
 
    albumArt.style.backgroundImage = `url('${track.coverUrl}')`;
    

    currentProgress = 0;
    progress.style.width = '0%';
    currentSeconds = 0;
    
 
    updateTime();
    
 
    const minutes = Math.floor(track.duration / 60);
    const seconds = track.duration % 60;
    totalTime.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
  
    if (audio) {
        audio.pause();
        audio = null;
    }
    
    audio = new Audio(track.audioUrl);
    
    if (isPlaying) {
        startPlayback();
    }
}

function changeTrack(direction) {
    let newTrack = currentTrack + direction;

  if (newTrack < 0) {
        newTrack = playlist.length - 1;
    } else if (newTrack >= playlist.length) {
        newTrack = 0;
    }
    
    loadTrack(newTrack);
    
    if (isPlaying) {
        startPlayback();
    }
}

function togglePlay() {
    isPlaying = !isPlaying;
    const svg = playBtn.querySelector('svg');
    
    if (isPlaying) {
        svg.innerHTML = '<path fill="currentColor" d="M8 19c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2v10c0 1.1.9 2 2 2m6-12v10c0 1.1.9 2 2 2s2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2"/>';
        startPlayback();
    } else {
        svg.innerHTML = '<path fill="currentColor" d="M8 17.175V6.825q0-.425.3-.713t.7-.287q.125 0 .263.037t.262.113l8.15 5.175q.225.15.338.375t.112.475t-.112.475t-.338.375l-8.15 5.175q-.125.075-.262.113T9 18.175q-.4 0-.7-.288t-.3-.712"/>';
        clearInterval(playbackInterval);
        if (audio) {
            audio.pause();
        }
    }
}

function startPlayback() {
    clearInterval(playbackInterval);
    
    if (audio) {
        audio.currentTime = currentSeconds;
        audio.play();
    }
    
    const track = playlist[currentTrack];
    playbackInterval = setInterval(() => {
        if (!isPlaying || isDragging) return;
        
        currentSeconds += 0.5;
        currentProgress = (currentSeconds / track.duration) * 100;
        
        if (currentProgress >= 100) {
   
            changeTrack(1);
        } else {
            progress.style.width = `${currentProgress}%`;
            updateTime();
        }
    }, 500);
}

function updateTime() {
    const track = playlist[currentTrack];
    const currentSecondsCalc = Math.floor((currentProgress / 100) * track.duration);
    const minutes = Math.floor(currentSecondsCalc / 60);
    const seconds = currentSecondsCalc % 60;
    currentTime.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function startDrag(e) {
    isDragging = true;
    e.preventDefault();
    
    function updateDragPosition(moveEvent) {
        if (!isDragging) return;
        const rect = progressBar.getBoundingClientRect();
        const clickPosition = Math.max(0, Math.min(rect.width, moveEvent.clientX - rect.left));
        const newProgress = (clickPosition / rect.width) * 100;
        currentProgress = Math.max(0, Math.min(100, newProgress));
        progress.style.width = `${currentProgress}%`;
        
    
        const track = playlist[currentTrack];
        currentSeconds = (currentProgress / 100) * track.duration;
        updateTime();
        
 
        if (audio) {
            audio.currentTime = currentSeconds;
        }
    }
    
    updateDragPosition(e);
    
    function onMouseMove(e) { updateDragPosition(e); }
    function stopDrag() { 
        isDragging = false; 
        document.removeEventListener('mousemove', onMouseMove); 
        document.removeEventListener('mouseup', stopDrag); 
    }
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', stopDrag);
}

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') || (e.ctrlKey && e.shiftKey && e.key === 'J') || (e.ctrlKey && e.key === 'u')) {
        e.preventDefault();
        return false;
    }
});
