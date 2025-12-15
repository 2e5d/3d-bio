const overlay = document.getElementById('overlay');
const body = document.body;
const c3d = document.getElementById('c3d');
const mainCard = document.getElementById('mainCard');
const musicCard = document.getElementById('musicCard');
const profileImage = document.getElementById('profileImage');
const linksContainer = document.getElementById('linksContainer');

const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const progress = document.getElementById('progress');
const currentTime = document.getElementById('currentTime');
const totalTime = document.getElementById('totalTime');
const songName = document.getElementById('songName');
const albumArt = document.getElementById('albumArt');

//Change this 
const playlist = [
    {
        title: "Example1",
        audioUrl: "https://files.catbox.moe/t2i1p6.mp3",
        coverUrl: "https://files.catbox.moe/3ub9hk.jpg",
        duration: 180
    },
    {
        title: "Example2",
        audioUrl: "https://files.catbox.moe/4kgtnq.mp3",
        coverUrl: "https://files.catbox.moe/3hk4r9.jpg",
        duration: 190
    },
    {
        title: "Example3",
        audioUrl: "https://files.catbox.moe/w1t3q9.mp3",
        coverUrl: "https://files.catbox.moe/9rk4h3.jpg",
        duration: 175
    },
    {
        title: "Example4",
        audioUrl: "https://files.catbox.moe/q9t1w3.mp3",
        coverUrl: "https://files.catbox.moe/h3k9r4.jpg",
        duration: 210
    },
    {
        title: "Example5",
        audioUrl: "https://files.catbox.moe/p6i1t2.mp3",
        coverUrl: "https://files.catbox.moe/r4h9k3.jpg",
        duration: 165
    },
    {
        title: "Example6",
        audioUrl: "https://files.catbox.moe/nqgt4k.mp3",
        coverUrl: "https://files.catbox.moe/k3r4h9.jpg",
        duration: 200
    },
    {
        title: "Example7",
        audioUrl: "https://files.catbox.moe/9q3t1w.mp3",
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
let titleTypingInterval = null;

//Change this 
const config = {
    websiteTitle: "Example",
    overlayText: "example",
    profilePicUrl: 'https://files.catbox.moe/o3ohyb.png',
    username: 'Example',
    location: 'Example',
    description: 'Example',
    enableViewCounter: true,
    enableMusicPlayer: true,
    enable3DEffect: true,
    enableRightClickProtection: true,
    enableDevToolsProtection: true,
    socialLinks: [
        {
            name: "spotify",
            url: "https://spotify.com",
            enabled: true,
            icon: `<path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.66.3 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.48.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.36.18.54.78.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.721 1.621.54.3.72 1.02.42 1.56-.299.42-1.02.6-1.56.3z"/>`
        },
        {
            name: "github",
            url: "https://github.com",
            enabled: true,
            icon: `<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>`
        },
        {
            name: "x",
            url: "https://x.com",
            enabled: true,
            icon: `<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>`
        },
        {
            name: "telegram",
            url: "https://telegram.org",
            enabled: true,
            icon: `<path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.697.064-1.225-.461-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.150-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>`
        },
        {
            name: "instagram",
            url: "https://instagram.com",
            enabled: true,
            icon: `<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>`
        },
        {
            name: "youtube",
            url: "https://youtube.com",
            enabled: true,
            icon: `<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>`
        }
    ],
    playlist: playlist
};

function startWebsiteTitleTyping() {
    const title = config.websiteTitle;
    let currentIndex = title.length;
    let isDeleting = false;
    let speed = 100;
    
    titleTypingInterval = setInterval(() => {
        if (!isDeleting && currentIndex < title.length) {
            currentIndex++;
            document.title = title.substring(0, currentIndex) + '|';
            speed = 100;
            
            if (currentIndex === title.length) {
                isDeleting = true;
                speed = 1500;
            }
        } else if (isDeleting && currentIndex > 0) {
            currentIndex--;
            document.title = title.substring(0, currentIndex) + '|';
            speed = 50;
            
            if (currentIndex === 0) {
                isDeleting = false;
                speed = 500;
            }
        }
    }, speed);
}

function renderSocialLinks() {
    linksContainer.innerHTML = '';
    
    config.socialLinks.forEach(link => {
        if (link.enabled) {
            const linkElement = document.createElement('a');
            linkElement.href = link.url;
            linkElement.target = '_blank';
            linkElement.className = 'link';
            
            linkElement.innerHTML = `
                <svg class="icon" viewBox="0 0 24 24">
                    ${link.icon}
                </svg>
            `;
            
            linksContainer.appendChild(linkElement);
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    startWebsiteTitleTyping();
    
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
    
    const overlayTitleElement = document.querySelector('.overlay-title');
    if (overlayTitleElement && config.overlayText) {
        overlayTitleElement.textContent = config.overlayText;
    }
    
    renderSocialLinks();
    
    if (!config.enableViewCounter) {
        document.querySelector('.view-counter').style.display = 'none';
    }
    
    if (!config.enableMusicPlayer) {
        document.getElementById('musicCard').style.display = 'none';
    }
    
    loadTrack(currentTrack);
});

overlay.addEventListener('click', () => {
    clearInterval(titleTypingInterval);
    document.title = config.websiteTitle;
    
    body.classList.add('overlay-hidden');
    setTimeout(() => {
        if (config.enable3DEffect) {
            init3D();
        }
        if (config.enableMusicPlayer) {
            initMusic();
        }
        startViews();
    }, 1500);
});

document.addEventListener('keydown', (e) => {
    if (!body.classList.contains('overlay-hidden')) {
        clearInterval(titleTypingInterval);
        document.title = config.websiteTitle;
        
        body.classList.add('overlay-hidden');
        setTimeout(() => {
            if (config.enable3DEffect) {
                init3D();
            }
            if (config.enableMusicPlayer) {
                initMusic();
            }
            startViews();
        }, 1500);
    }
});

function startViews() {
    if (!config.enableViewCounter) return;
    
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
            const track = config.playlist[currentTrack];
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
    const track = config.playlist[trackIndex];
    
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
        newTrack = config.playlist.length - 1;
    } else if (newTrack >= config.playlist.length) {
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
    
    const track = config.playlist[currentTrack];
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
    const track = config.playlist[currentTrack];
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
        
        const track = config.playlist[currentTrack];
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

if (config.enableRightClickProtection) {
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
}

if (config.enableDevToolsProtection) {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') || (e.ctrlKey && e.shiftKey && e.key === 'J') || (e.ctrlKey && e.key === 'u')) {
            e.preventDefault();
            return false;
        }
    });
}
