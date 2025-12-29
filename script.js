const ol = document.getElementById('overlay');
const body = document.body;
const c3d = document.getElementById('c3d');
const mc = document.getElementById('mainCard');
const pc = document.getElementById('player'); 
const pfp = document.getElementById('pfp');

const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pb = document.getElementById('progressBar');
const prog = document.getElementById('progress');
const ct = document.getElementById('currentTime');
const tt = document.getElementById('totalTime');
const sn = document.getElementById('songName');
const art = document.getElementById('art');

const cfg = {
    gen: {
        title: "Example Profile",
        olText: "example",
        bgColor: "rgba(0, 0, 0, 0.95)",
        bgVid: "https://files.catbox.moe/jdygd0.mp4"
    },
    prof: {
        on: true,
        pfpUrl: "https://files.catbox.moe/o3ohyb.png",
        name: "Example",
        loc: "Example",
        bio: "This is an example bio that will have a typing effect.",
        showDot: true,
        showGlow: true,
        uid: "UID 0", // Added UID for tooltip
        badges: [
            {
                name: "Premium",
                svg: `<path fill="currentColor" d="M396.31 32H264l84.19 112.26L396.31 32zm-280.62 0l48.12 112.26L248 32H115.69zM256 74.67L192 160h128l-64-85.33zm166.95-23.61L376.26 160H488L422.95 51.06zm-333.9 0L23 160h112.74L89.05 51.06zM146.68 192H24l222.8 288h.53L146.68 192zm218.64 0L264.67 480h.53L488 192H365.32zm-35.93 0H182.61L256 400l73.39-208z"></path>`,
                color: "#ffffff",
                viewBox: "23 32 465 448"
            },
            {
                name: "OG",
                svg: `<path fill="currentColor" d="m12 8.5l2.116 5.088l5.492.44l-4.184 3.585l1.278 5.36L12 20.1l-4.702 2.872l1.278-5.36l-4.184-3.584l5.492-.44L12 8.5ZM8 2v9H6V2h2Zm10 0v9h-2V2h2Zm-5 0v5h-2V2h2Z"></path>`,
                color: "#ffffff",
                viewBox: "4.39 2 15.22 20.97"
            },
            {
                name: "Owner",
                svg: `<path fill="currentColor" d="M9.153 5.408C10.42 3.136 11.053 2 12 2c.947 0 1.58 1.136 2.847 3.408l.328.588c.36.646.54.969.82 1.182c.28.213.63.292 1.33.45l.636.144c2.46.557 3.689.835 3.982 1.776c.292.94-.546 1.921-2.223 3.882l-.434.507c-.476.557-.715.836-.822 1.18c-.107.345-.071.717.001 1.46l.066.677c.253 2.617.38 3.925-.386 4.506c-.766.582-1.918.051-4.22-1.009l-.597-.274c-.654-.302-.981-.452-1.328-.452c-.347 0-.674.15-1.329.452l-.595.274c-2.303 1.06-3.455 1.59-4.22 1.01c-.767-.582-.64-1.89-.387-4.507l.066-.676c.072-.744.108-1.116 0-1.46c-.106-.345-.345-.624-.821-1.18l-.434-.508c-1.677-1.96-2.515-2.941-2.223-3.882c.293-.941 1.523-1.22 3.983-1.776l.636-.144c.699-.158 1.048-.237 1.329-.45c.28-.213.46-.536.82-1.182l.328-.588Z"></path>`,
                color: "#ffffff",
                viewBox: "2 2 20 20"
            },
            {
                name: "Verified",
                svg: `<path fill="currentColor" d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45Z"></path>`,
                color: "#ffffff",
                viewBox: "1 1.5 22 21"
            },
            {
                name: "Staff",
                svg: `<path fill="currentColor" d="m16.06 13.09l5.63 5.59l-3.32 3.28l-5.59-5.59v-.92l2.36-2.36h.92m.91-2.53L16 9.6l-4.79 4.8v1.97L5.58 22L2.3 18.68l5.59-5.59h1.97l.78-.78L6.8 8.46H5.5L2.69 5.62L5.31 3l2.8 2.8v1.31L12 10.95l2.66-2.66l-.96-1.01L15 5.97h-2.66l-.65-.65L15 2l.66.66v2.66L16.97 4l3.28 3.28c1.09 1.1 1.09 2.89 0 3.98l-1.97-2.01l-1.31 1.31Z"></path>`,
                color: "#ffffff",
                viewBox: "2.3 2 19.39 20"
            },
            {
                name: "Bug Finder",
                svg: `<path fill="currentColor" d="M19 8h-1.81a5.985 5.985 0 0 0-1.82-1.96l.93-.93a.996.996 0 1 0-1.41-1.41l-1.47 1.47C12.96 5.06 12.49 5 12 5s-.96.06-1.41.17L9.11 3.7A.996.996 0 1 0 7.7 5.11l.92.93C7.88 6.55 7.26 7.22 6.81 8H5c-.55 0-1 .45-1 1s.45 1 1 1h1.09c-.05.33-.09.66-.09 1v1H5c-.55 0-1 .45-1 1s.45 1 1 1h1v1c0 .34.04.67.09 1H5c-.55 0-1 .45-1 1s.45 1 1 1h1.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H19c.55 0 1-.45 1-1s-.45-1-1-1h-1.09c.05-.33.09-.66.09-1v-1h1c.55 0 1-.45 1-1s-.45-1-1-1h-1v-1c0-.34-.04-.67-.09-1H19c.55 0 1-.45 1-1s-.45-1-1-1m-6 8h-2c-.55 0-1-.45-1-1s.45-1 1-1h2c.55 0 1 .45 1 1s-.45 1-1 1m0-4h-2c-.55 0-1-.45-1-1s.45-1 1-1h2c.55 0 1 .45 1 1s-.45 1-1 1"></path>`,
                color: "#ffffff",
                viewBox: "4 3.41 16 17.59"
            }
        ]
    },
    soc: {
        on: true,
        links: [
            {
                n: "spotify",
                url: "https://spotify.com",
                on: true
            },
            {
                n: "github",
                url: "https://github.com",
                on: true
            },
            {
                n: "x",
                url: "https://x.com",
                on: true
            },
            {
                n: "telegram",
                url: "https://telegram.org",
                on: true
            },
            {
                n: "instagram",
                url: "https://instagram.com",
                on: true
            },
            {
                n: "youtube",
                url: "https://youtube.com",
                on: true
            }
        ]
    },
    vc: {
        on: true,
        init: 0,
        auto: true,
        realTime: true,
        growthRate: 1.05
    },
    mp: {
        on: true,
        pl: [
            {
                t: "Example1",
                aUrl: ".mp3",
                cUrl: ".jpg"
            },
            {
                t: "Example2",
                aUrl: ".mp3",
                cUrl: ".jpg"
            },
            {
                t: "Example3",
                aUrl: ".mp3",
                cUrl: ".jpg"
            },
            {
                t: "Example4",
                aUrl: ".mp3",
                cUrl: ".jpg"
            },
            {
                t: "Example5",
                aUrl: ".mp3",
                cUrl: ".jpg"
            },
            {
                t: "Example6",
                aUrl: ".mp3",
                cUrl: ".jpg"
            },
            {
                t: "Example7",
                aUrl: ".mp3",
                cUrl: ".jpg"
            }
        ]
    },
    td: {
        on: true,
        rot: 15,
        vrot: 12,
        smooth: 0.15
    }
};

const icons = {
    spotify: `<path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.66.3 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.48.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.36.18.54.78.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.721 1.621.54.3.72 1.02.42 1.56-.299.42-1.02.6-1.56.3z"/>`,
    github: `<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>`,
    x: `<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>`,
    telegram: `<path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.697.064-1.225-.461-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.150-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.440-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>`,
    instagram: `<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>`,
    youtube: `<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>`
};

const tooltipNames = {
    spotify: "Spotify",
    github: "GitHub",
    x: "X (Twitter)",
    telegram: "Telegram",
    instagram: "Instagram",
    youtube: "YouTube"
};

let ti = 0;
let ip = false;
let cp = 0;
let id = false;
let pi;
let cs = 0;
let aud = null;
let tiInt = null;
let bioInt = null;
let currentDuration = 0;
let viewInterval = null;

function startTitle() {
    let t = cfg.prof.name || "Profile";
    let ci = t.length;
    let del = false;
    let chi = 0;
    
    function update() {
        let dt;
        
        if (del) {
            dt = t.substring(0, chi - 1) + "|";
            chi--;
            
            if (chi === 0) {
                del = false;
            }
        } else {
            dt = t.substring(0, chi + 1) + "|";
            chi++;
            
            if (chi === t.length) {
                del = true;
            }
        }
        
        document.title = dt;
    }
    
    if (tiInt) clearInterval(tiInt);
    tiInt = setInterval(update, 200);
    update();
}

function startBio() {
    const bio = cfg.prof.bio;
    const desc = document.getElementById('desc');
    let index = 0;
    let typing = true;
    
    function type() {
        if (typing) {
            if (index <= bio.length) {
                desc.textContent = bio.substring(0, index) + "|";
                index++;
            } else {
                typing = false;
                setTimeout(() => {
                    type();
                }, 2000);
                return;
            }
        } else {
            if (index > 0) {
                desc.textContent = bio.substring(0, index - 1) + "|";
                index--;
            } else {
                typing = true;
                setTimeout(() => {
                    type();
                }, 500);
                return;
            }
        }
        setTimeout(type, 100);
    }
    
    if (bioInt) clearInterval(bioInt);
    type();
}

function applyCfg() {
    document.title = cfg.gen.title;
    startTitle();
    
    if (cfg.gen.olText) {
        document.querySelector('.overlay-title').textContent = cfg.gen.olText;
    }
    
    if (cfg.gen.bgVid) {
        const vid = document.querySelector('#bg-video source');
        vid.src = cfg.gen.bgVid;
        document.querySelector('#bg-video').load();
    }
    
    if (cfg.prof.on) {
        if (cfg.prof.pfpUrl) {
            pfp.src = cfg.prof.pfpUrl;
        }
        
        const nameElement = document.getElementById('name');
        nameElement.textContent = cfg.prof.name;
        nameElement.title = cfg.prof.uid || "UID 0";
        
        document.getElementById('loc').textContent = cfg.prof.loc;
        
        const dot = document.querySelector('.dot');
        if (!cfg.prof.showDot && dot) {
            dot.style.display = 'none';
        }
        
        const name = document.querySelector('.name');
        if (!cfg.prof.showGlow && name) {
            name.style.animation = 'none';
        }
        
        const badges = document.getElementById('badges');
        if (cfg.prof.badges && cfg.prof.badges.length > 0) {
            cfg.prof.badges.forEach(badge => {
                const span = document.createElement('span');
                span.className = 'badge';
                span.title = badge.name;
                
                const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svg.setAttribute('class', `badge-${badge.name}`);
                svg.setAttribute('width', '1em');
                svg.setAttribute('height', '1em');
                svg.setAttribute('viewBox', badge.viewBox);
                svg.innerHTML = badge.svg.replace(/fill="[^"]*"/g, 'fill="#ffffff"');
                
                span.appendChild(svg);
                badges.appendChild(span);
            });
        } else {
            document.querySelector('.badges-container').classList.add('hidden');
        }
        
        if (cfg.prof.bio) {
            startBio();
        }
    } else {
        document.querySelector('.profile-header').classList.add('hidden');
        document.querySelector('.desc').classList.add('hidden');
    }
    
    if (cfg.soc.on) {
        const container = document.getElementById('links');
        container.innerHTML = '';
        
        cfg.soc.links.forEach(link => {
            if (link.on && icons[link.n]) {
                const a = document.createElement('a');
                a.href = link.url;
                a.target = '_blank';
                a.className = 'link';
                a.title = tooltipNames[link.n] || link.n;
                
                const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svg.setAttribute('class', 'icon');
                svg.setAttribute('viewBox', '0 0 24 24');
                svg.innerHTML = icons[link.n];
                
                a.appendChild(svg);
                container.appendChild(a);
            }
        });
        
        if (container.children.length === 0) {
            container.classList.add('hidden');
        }
    } else {
        document.getElementById('links').classList.add('hidden');
    }
    
    if (!cfg.vc.on) {
        document.getElementById('views').classList.add('hidden');
    }
    
    if (!cfg.mp.on) {
        document.getElementById('player').classList.add('hidden');
    }
    
    // Tooltips removed for location and views as requested
}

window.addEventListener('DOMContentLoaded', () => {
    applyCfg();
    
    if (cfg.mp.on && cfg.mp.pl && cfg.mp.pl.length > 0) {
        loadTrack(ti);
    }
    
    if (cfg.vc.on) {
        startV();
    }
});

ol.addEventListener('click', () => {
    body.classList.add('overlay-hidden');
    setTimeout(() => {
        if (cfg.td.on) {
            init3D();
        }
        if (cfg.mp.on) {
            initM();
        }
    }, 1500);
});

document.addEventListener('keydown', (e) => {
    if (!body.classList.contains('overlay-hidden')) {
        body.classList.add('overlay-hidden');
        setTimeout(() => {
            if (cfg.td.on) {
                init3D();
            }
            if (cfg.mp.on) {
                initM();
            }
        }, 1500);
    }
});

function startV() {
    let vc = cfg.vc.init || 1250;
    const vce = document.getElementById('viewCount');
    const now = new Date();
    const today = now.toDateString();
    
    let viewData = localStorage.getItem('profileViewData');
    if (viewData) {
        viewData = JSON.parse(viewData);
        vc = viewData.total || vc;
        
        if (cfg.vc.realTime && viewData.lastUpdate) {
            const lastUpdate = new Date(viewData.lastUpdate);
            const daysSince = Math.floor((now - lastUpdate) / (1000 * 60 * 60 * 24));
            
            if (daysSince > 0) {
                const growthRate = cfg.vc.growthRate || 1.05;
                const dailyIncrement = Math.floor(vc * 0.01);
                
                for (let i = 0; i < daysSince; i++) {
                    vc += dailyIncrement + Math.floor(Math.random() * 50);
                }
            }
        }
    } else {
        viewData = {
            total: vc,
            daily: {},
            lastUpdate: now.toISOString()
        };
    }
    
    if (!viewData.daily[today]) {
        vc += 1 + Math.floor(Math.random() * 10);
        viewData.daily[today] = 1;
    } else {
        viewData.daily[today] += Math.floor(Math.random() * 3);
        vc += Math.floor(Math.random() * 3);
    }
    
    viewData.total = vc;
    viewData.lastUpdate = now.toISOString();
    localStorage.setItem('profileViewData', JSON.stringify(viewData));
    
    updateViewCount(vce, vc);
    
    if (cfg.vc.auto) {
        if (viewInterval) clearInterval(viewInterval);
        
        viewInterval = setInterval(() => {
            const chance = Math.random();
            
            if (chance < 0.3) {
                const increment = Math.floor(Math.random() * 5) + 1;
                vc += increment;
                viewData.total = vc;
                viewData.daily[today] = (viewData.daily[today] || 0) + increment;
                viewData.lastUpdate = new Date().toISOString();
                
                localStorage.setItem('profileViewData', JSON.stringify(viewData));
                updateViewCount(vce, vc);
                
                if (increment > 1) {
                    vce.style.color = '#4CAF50';
                    setTimeout(() => {
                        vce.style.color = '#ddd';
                    }, 500);
                }
            }
            
            const hour = now.getHours();
            if ((hour >= 14 && hour <= 18) || (hour >= 20 && hour <= 23)) {
                if (Math.random() < 0.4) {
                    const peakIncrement = Math.floor(Math.random() * 3) + 1;
                    vc += peakIncrement;
                    viewData.total = vc;
                    viewData.daily[today] = (viewData.daily[today] || 0) + peakIncrement;
                    localStorage.setItem('profileViewData', JSON.stringify(viewData));
                    updateViewCount(vce, vc);
                }
            }
        }, Math.random() * 15000 + 10000);
    }
}

function updateViewCount(element, count) {
    const current = parseInt(element.textContent.replace(/,/g, '')) || 0;
    const diff = count - current;
    
    if (diff > 0) {
        let start = current;
        const duration = 1000;
        const increment = diff / (duration / 16);
        
        function animate() {
            start += increment;
            if (start >= count) {
                element.textContent = count.toLocaleString();
                return;
            }
            element.textContent = Math.floor(start).toLocaleString();
            requestAnimationFrame(animate);
        }
        animate();
    } else {
        element.textContent = count.toLocaleString();
    }
}

function init3D() {
    let ih = false;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    const rot = cfg.td.rot || 15;
    const vrot = cfg.td.vrot || 12;
    const sm = cfg.td.smooth || 0.15;
    
    function animate() {
        cx += (tx - cx) * sm;
        cy += (ty - cy) * sm;
        
        c3d.style.transform = `
            rotateX(${cy}deg) 
            rotateY(${cx}deg)
            translateZ(${Math.abs(cx + cy) * 0.3}px)
        `;
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    function handle(e) {
        ih = true;
        const rect = c3d.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        const nx = (mx / rect.width) - 0.5;
        const ny = (my / rect.height) - 0.5;
        tx = nx * rot;
        ty = ny * -vrot;
    }
    
    function reset() {
        ih = false;
        tx = 0;
        ty = 0;
    }
    
    c3d.addEventListener('mousemove', handle);
    c3d.addEventListener('mouseleave', reset);
    mc.addEventListener('mousemove', handle);
    pc.addEventListener('mousemove', handle);
    mc.addEventListener('mouseleave', reset);
    pc.addEventListener('mouseleave', reset);
    
    let it = false;
    c3d.addEventListener('touchstart', (e) => {
        it = true;
        if (e.touches.length === 1) {
            const t = e.touches[0];
            handle({ clientX: t.clientX, clientY: t.clientY });
        }
    });
    
    c3d.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (e.touches.length === 1 && it) {
            const t = e.touches[0];
            handle({ clientX: t.clientX, clientY: t.clientY });
        }
    });
    
    c3d.addEventListener('touchend', () => {
        it = false;
        reset();
    });
}

function initM() {
    playBtn.addEventListener('click', toggleP);
    
    prevBtn.addEventListener('click', () => {
        changeT(-1);
    });
    
    nextBtn.addEventListener('click', () => {
        changeT(1);
    });
    
    pb.addEventListener('click', (e) => {
        if (id) return;
        const rect = pb.getBoundingClientRect();
        const clickPos = e.clientX - rect.left;
        const np = (clickPos / rect.width) * 100;
        cp = Math.max(0, Math.min(100, np));
        prog.style.width = `${cp}%`;
        updateT();
        
        if (aud && currentDuration > 0) {
            const nt = (cp / 100) * currentDuration;
            cs = nt;
            if (aud) {
                aud.currentTime = cs;
            }
        }
    });
    
    pb.addEventListener('mousedown', startD);
    
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            toggleP();
        } else if (e.code === 'ArrowLeft') {
            changeT(-1);
        } else if (e.code === 'ArrowRight') {
            changeT(1);
        }
    });
}

function loadTrack(idx) {
    ti = idx;
    const tr = cfg.mp.pl[idx];
    
    sn.textContent = tr.t;
    
    art.style.backgroundImage = `url('${tr.cUrl}')`;
    
    cp = 0;
    prog.style.width = '0%';
    cs = 0;
    currentDuration = 0;
    
    updateT();
    tt.textContent = "0:00";
    
    if (aud) {
        aud.pause();
        aud = null;
    }
    
    aud = new Audio(tr.aUrl);
    
    aud.addEventListener('loadedmetadata', function() {
        currentDuration = aud.duration;
        const m = Math.floor(currentDuration / 60);
        const s = Math.floor(currentDuration % 60);
        tt.textContent = `${m}:${s.toString().padStart(2, '0')}`;
    });
    
    aud.addEventListener('error', function() {
        console.error('Error loading audio:', tr.aUrl);
        tt.textContent = "0:00";
    });
    
    if (ip) {
        startP();
    }
}

function changeT(dir) {
    let nt = ti + dir;
    
    if (nt < 0) {
        nt = cfg.mp.pl.length - 1;
    } else if (nt >= cfg.mp.pl.length) {
        nt = 0;
    }
    
    loadTrack(nt);
    
    if (ip) {
        startP();
    }
}

function toggleP() {
    ip = !ip;
    const svg = playBtn.querySelector('svg');
    
    if (ip) {
        svg.innerHTML = '<path fill="currentColor" d="M8 19c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2v10c0 1.1.9 2 2 2m6-12v10c0 1.1.9 2 2 2s2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2"/>';
        startP();
    } else {
        svg.innerHTML = '<path fill="currentColor" d="M8 17.175V6.825q0-.425.3-.713t.7-.287q.125 0 .263.037t.262.113l8.15 5.175q.225.15.338.375t.112.475t-.112.475t-.338.375l-8.15 5.175q-.125.075-.262.113T9 18.175q-.4 0-.7-.288t-.3-.712"/>';
        clearInterval(pi);
        if (aud) {
            aud.pause();
        }
    }
}

function startP() {
    clearInterval(pi);
    
    if (aud) {
        aud.currentTime = cs;
        aud.play().catch(e => console.error('Playback error:', e));
    }
    
    pi = setInterval(() => {
        if (!ip || id || !aud) return;
        
        if (aud.readyState >= 2) {
            cs = aud.currentTime;
            if (currentDuration > 0) {
                cp = (cs / currentDuration) * 100;
                
                if (cp >= 100) {
                    changeT(1);
                } else {
                    prog.style.width = `${cp}%`;
                    updateT();
                }
            } else {
                prog.style.width = '0%';
                updateT();
            }
        }
    }, 500);
}

function updateT() {
    if (currentDuration > 0) {
        const csc = Math.floor((cp / 100) * currentDuration);
        const m = Math.floor(csc / 60);
        const s = csc % 60;
        ct.textContent = `${m}:${s.toString().padStart(2, '0')}`;
    } else {
        ct.textContent = "0:00";
    }
}

function startD(e) {
    id = true;
    e.preventDefault();
    
    function update(moveEvent) {
        if (!id) return;
        const rect = pb.getBoundingClientRect();
        const clickPos = Math.max(0, Math.min(rect.width, moveEvent.clientX - rect.left));
        const np = (clickPos / rect.width) * 100;
        cp = Math.max(0, Math.min(100, np));
        prog.style.width = `${cp}%`;
        
        if (currentDuration > 0) {
            cs = (cp / 100) * currentDuration;
            updateT();
            
            if (aud) {
                aud.currentTime = cs;
            }
        }
    }
    
    update(e);
    
    function onMove(e) { update(e); }
    function stop() { 
        id = false; 
        document.removeEventListener('mousemove', onMove); 
        document.removeEventListener('mouseup', stop); 
    }
    
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', stop);
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

window.addEventListener('beforeunload', () => {
    if (tiInt) clearInterval(tiInt);
    if (bioInt) clearInterval(bioInt);
    if (viewInterval) clearInterval(viewInterval);
    if (pi) clearInterval(pi);
});
