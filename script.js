/**
 * HARSH GAWDE // GTA VI VICE CITY CINEMATIC PORTFOLIO
 * 1-TO-1 EXACT REEL SYSTEM WITH SYNTHWAVE RADIO, WEAPON WHEEL,
 * CHECKMARKS, 3D MINIMAP, AND ALL 8 SCREENS.
 */

// Global State
let currentScreen = 0;
let totalScreens = 9;
let isRolling = false;
let cash = 1875659;
let rapidCashClicks = 0;
let lastCashClickTime = 0;
let wantedLevel = 3;
let visitedScreens = new Set();
let isWeaponWheelOpen = false;
let isFullMapOpen = false;
let selectedMapIndex = 1;

// Expose state and robust nav helpers globally
window.currentScreen = currentScreen;
window.totalScreens = totalScreens;
window.navNextScreen = function() {
    if (currentScreen < totalScreens - 1) {
        window.jumpToScreen(currentScreen + 1, true);
    }
};
window.navPrevScreen = function() {
    if (currentScreen > 0) {
        window.jumpToScreen(currentScreen - 1, true);
    }
};

// Full Map District Intel Data
const MAP_DISTRICTS = {
    0: {
        title: "MARINA BAYFRONT",
        sub: "MISSION 00: MAIN MENU",
        desc: "Main command center on the Bayfront boardwalk with the sports coupe and Ocean Drive sunset.",
        territory: "Marina Bayfront",
        bounty: "+$50,000",
        pos: { x: 220, y: 500 }
    },
    1: {
        title: "OCEAN BEACH",
        sub: "MISSION 01: ABOUT ME",
        desc: "Discover the origin story, tech philosophy, and full-stack engineering profile of Harsh Gawde.",
        territory: "Vice Beach",
        bounty: "+$150,000",
        pos: { x: 780, y: 460 }
    },
    2: {
        title: "DOWNTOWN HQ",
        sub: "MISSION 02: SKILLS ARSENAL",
        desc: "High-rise rooftop overlooking Vice City skyline. High-caliber Java 21, Python ML, and GCP architectures.",
        territory: "Downtown",
        bounty: "+$150,000",
        pos: { x: 240, y: 140 }
    },
    3: {
        title: "VICE PORT",
        sub: "MISSION 03: PROJECTS SHOWCASE",
        desc: "Shipping docks holding enterprise deployments: BeanByte Coffee Shop, Portfolio VI, and AI pipelines.",
        territory: "Port Gellhorn",
        bounty: "+$175,000",
        pos: { x: 140, y: 400 }
    },
    4: {
        title: "STARFISH MANSION",
        sub: "MISSION 04: EXPERIENCE JOURNEY",
        desc: "Private estate tracking industry tenures at BlueStock.in as Backend Software Engineer & Data Analyst.",
        territory: "Starfish Island",
        bounty: "+$200,000",
        pos: { x: 510, y: 290 }
    },
    5: {
        title: "VICE POINT CLUB",
        sub: "MISSION 05: ACHIEVEMENTS & CERTS",
        desc: "Neon nightlife strip unlocking trophies: GCP Arcade Certified, BlueStock.in SDE, and ATS Dossier.",
        territory: "Vice Point",
        bounty: "+$150,000",
        pos: { x: 820, y: 140 }
    },
    6: {
        title: "ESCOBAR ACADEMY",
        sub: "MISSION 06: CDGI & EDUCATION",
        desc: "Tech campus grounds training the next generation in B.Tech AI & Data Science and peer mentoring.",
        territory: "Escobar District",
        bounty: "+$125,000",
        pos: { x: 180, y: 260 }
    },
    7: {
        title: "GRASSRIVERS CAUSEWAY",
        sub: "MISSION 07: CONTACT HOTLINE",
        desc: "Secured highway transmission line: Direct Email, Phone, LinkedIn, GitHub Vault, and Resume download.",
        territory: "Leonida Causeway",
        bounty: "+$100,000",
        pos: { x: 830, y: 300 }
    }
};

// Dynamic Screen Objectives matching the viral reel
const SCREEN_OBJECTIVES = {
    0: { text: "PRESS START GAME TO BEGIN", color: "#ff007f" },
    1: { text: "LEARN WHO YOU ARE DEALING WITH", color: "#00f0ff" },
    2: { text: "INSPECT THE HIGH-CALIBER TECH ARSENAL", color: "#00f0ff" },
    3: { text: "INSPECT THE COMPLETED BUILDS", color: "#00d2be" },
    4: { text: "TRACE THE FULL CAREER PATH", color: "#9d4edd" },
    5: { text: "COLLECT EVERY UNLOCKED TROPHY", color: "#ff007f" },
    6: { text: "RECRUIT THE NEXT GENERATION", color: "#ffaa00" },
    7: { text: "OPEN A SECURE LINE OF CONTACT", color: "#1e90ff" },
    8: { text: "RIDE OFF INTO THE SUNRISE", color: "#ff007f" }
};

// Map screen index to checkmark element IDs in Main Menu
const SCREEN_CHECK_IDS = {
    1: "chk-about",
    2: "chk-skills",
    3: "chk-projects",
    4: "chk-experience",
    5: "chk-achievements",
    6: "chk-academy",
    7: "chk-contact"
};

// ========================================================
// 1. AUTHENTIC 80s SYNTHWAVE AUDIO & SOUND FX ENGINE
// ========================================================
class SynthwaveAudioEngine {
    constructor() {
        this.ctx = null;
        this.isPlaying = false;
        this.tempo = 118; // 80s synthwave BPM
        this.step = 0;
        this.timer = null;
        this.masterGain = null;
        this.sfxGain = null;

        // A Minor / Vice City Chord Progression (Am -> F -> C -> G)
        this.chords = [
            [220.00, 261.63, 329.63], // Am (A3, C4, E4)
            [174.61, 220.00, 261.63], // F  (F3, A3, C4)
            [130.81, 164.81, 196.00], // C  (C3, E3, G3)
            [196.00, 246.94, 293.66]  // G  (G3, B3, D4)
        ];
        
        // 16th-note rolling bassline notes for each chord
        this.basslines = [
            [110, 110, 220, 110, 110, 164.8, 110, 130.8], // Am
            [87.3, 87.3, 174.6, 87.3, 87.3, 130.8, 87.3, 110], // F
            [65.4, 65.4, 130.8, 65.4, 65.4, 98.0, 65.4, 82.4], // C
            [98.0, 98.0, 196.0, 98.0, 98.0, 146.8, 98.0, 123.5] // G
        ];

        // Lead Arpeggio notes
        this.leadNotes = [
            440, 523.25, 659.25, 523.25, 440, 659.25, 783.99, 659.25,
            349.23, 440, 523.25, 440, 349.23, 523.25, 659.25, 523.25,
            523.25, 659.25, 783.99, 659.25, 523.25, 783.99, 987.77, 783.99,
            392.00, 493.88, 587.33, 493.88, 392.00, 587.33, 659.25, 587.33
        ];
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();

            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.value = 0.45;
            this.masterGain.connect(this.ctx.destination);

            this.sfxGain = this.ctx.createGain();
            this.sfxGain.gain.value = 0.55;
            this.sfxGain.connect(this.ctx.destination);
        }
        if (this.ctx.state === "suspended") {
            this.ctx.resume();
        }
    }

    start() {
        this.init();
        if (this.isPlaying) return;
        this.isPlaying = true;
        this.step = 0;

        const intervalMs = (60 / this.tempo / 4) * 1000; // 16th note interval
        this.timer = setInterval(() => this.tick(), intervalMs);

        // Animate radio waves in top bar
        const waves = document.getElementById("radioWaves");
        if (waves) waves.classList.add("playing");
    }

    stop() {
        if (!this.isPlaying) return;
        this.isPlaying = false;
        clearInterval(this.timer);
        this.timer = null;

        const waves = document.getElementById("radioWaves");
        if (waves) waves.classList.remove("playing");
    }

    toggle() {
        if (this.isPlaying) {
            this.stop();
        } else {
            this.start();
        }
    }

    tick() {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const sixteenth = this.step % 16;
        const beat = Math.floor(sixteenth / 4); // 0, 1, 2, 3
        const measure = Math.floor(this.step / 16);
        const chordIdx = measure % 4;

        // 1. Kick Drum (4-on-the-floor: sixteenth 0, 4, 8, 12)
        if (sixteenth % 4 === 0) {
            this.playKick(now);
        }

        // 2. Gated Reverb Snare (beats 2 and 4: sixteenth 4 and 12)
        if (sixteenth === 4 || sixteenth === 12) {
            this.playSnare(now);
        }

        // 3. Hi-Hats (every 16th note, slightly accented off-beats)
        this.playHiHat(now, sixteenth % 2 === 1);

        // 4. Rolling Synth Bassline (every 16th note)
        const bassArr = this.basslines[chordIdx];
        const bassFreq = bassArr[sixteenth % 8];
        this.playBass(now, bassFreq);

        // 5. Synth Chords (every measure start)
        if (sixteenth === 0) {
            this.playPad(now, this.chords[chordIdx]);
        }

        // 6. Lead Synth (arpeggiated)
        const leadFreq = this.leadNotes[this.step % this.leadNotes.length];
        if (sixteenth % 2 === 0 && Math.random() > 0.15) {
            this.playLead(now, leadFreq);
        }

        this.step++;
    }

    // Punchy 80s Kick
    playKick(time) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.frequency.setValueAtTime(140, time);
        osc.frequency.exponentialRampToValueAtTime(38, time + 0.12);

        gain.gain.setValueAtTime(0.7, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(time);
        osc.stop(time + 0.18);
    }

    // 80s Gated Snare
    playSnare(time) {
        // Noise burst
        const bufferSize = this.ctx.sampleRate * 0.15;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = this.ctx.createBufferSource();
        whiteNoise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = "highpass";
        filter.frequency.value = 800;

        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0.45, time);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, time + 0.14);

        whiteNoise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(this.masterGain);

        whiteNoise.start(time);
        whiteNoise.stop(time + 0.15);

        // Body tone
        const osc = this.ctx.createOscillator();
        const toneGain = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(180, time);
        osc.frequency.exponentialRampToValueAtTime(90, time + 0.08);

        toneGain.gain.setValueAtTime(0.35, time);
        toneGain.gain.exponentialRampToValueAtTime(0.01, time + 0.1);

        osc.connect(toneGain);
        toneGain.connect(this.masterGain);

        osc.start(time);
        osc.stop(time + 0.1);
    }

    // Filtered Hi-Hat
    playHiHat(time, isAccent) {
        const bufferSize = this.ctx.sampleRate * 0.04;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = "highpass";
        filter.frequency.value = 6500;

        const gain = this.ctx.createGain();
        const vol = isAccent ? 0.22 : 0.12;
        gain.gain.setValueAtTime(vol, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.035);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        noise.start(time);
        noise.stop(time + 0.04);
    }

    // Rolling Saw Bass
    playBass(time, freq) {
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(freq, time);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(450, time);
        filter.frequency.exponentialRampToValueAtTime(120, time + 0.12);
        filter.Q.value = 4.0;

        gain.gain.setValueAtTime(0.4, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.12);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start(time);
        osc.stop(time + 0.13);
    }

    // Lush Pad Chords
    playPad(time, chordFreqs) {
        chordFreqs.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = "sawtooth";
            osc.frequency.setValueAtTime(freq, time);
            osc.detune.setValueAtTime((idx - 1) * 8, time);

            gain.gain.setValueAtTime(0.001, time);
            gain.gain.linearRampToValueAtTime(0.12, time + 0.2);
            gain.gain.exponentialRampToValueAtTime(0.001, time + 1.8);

            osc.connect(gain);
            gain.connect(this.masterGain);

            osc.start(time);
            osc.stop(time + 1.9);
        });
    }

    // Lead Arpeggio
    playLead(time, freq) {
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc.type = "square";
        osc.frequency.setValueAtTime(freq, time);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1800, time);

        gain.gain.setValueAtTime(0.16, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.22);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start(time);
        osc.stop(time + 0.24);
    }

    // Realistic Game Sound Effects
    playMetallicTick() {
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(1600, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.035);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + 0.04);
    }

    playSelectSound() {
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.06); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.12); // G5

        gain.gain.setValueAtTime(0.28, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + 0.27);
    }

    playCashChime() {
        this.init();
        const now = this.ctx.currentTime;
        [784, 1046, 1318].forEach((f, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(f, now + i * 0.05);

            gain.gain.setValueAtTime(0.3, now + i * 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.35);

            osc.connect(gain);
            gain.connect(this.sfxGain);

            osc.start(now + i * 0.05);
            osc.stop(now + i * 0.05 + 0.36);
        });
    }

    playWheelRatchet() {
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.04);

        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + 0.045);
    }

    playRollWhoosh() {
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(60, now);
        osc.frequency.exponentialRampToValueAtTime(240, now + 0.15);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.35);

        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + 0.39);
    }

    // Iconic Vice City Police Siren Wail
    playPoliceSiren() {
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(650, now);
        osc.frequency.linearRampToValueAtTime(950, now + 0.35);
        osc.frequency.linearRampToValueAtTime(650, now + 0.7);
        osc.frequency.linearRampToValueAtTime(1050, now + 1.05);
        osc.frequency.linearRampToValueAtTime(600, now + 1.4);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.35, now + 0.1);
        gain.gain.setValueAtTime(0.35, now + 1.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + 1.52);
    }

    // Police Dispatch Radio Chirp
    playPoliceDispatch() {
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.setValueAtTime(900, now + 0.08);
        osc.frequency.setValueAtTime(1400, now + 0.16);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + 0.29);
    }

    // Teleport GPS Map Warp Sound
    playTeleportSound() {
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.25);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.5);

        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.52);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + 0.53);
    }
}

const radio = new SynthwaveAudioEngine();

// Window-accessible audio helpers (Controls Official GTA Theme Song)
window.toggleMusicMute = function() {
    const audio = document.getElementById("gtaThemeAudio");
    const muteBtn = document.getElementById("reelMuteBtn");
    const muteIcon = document.getElementById("muteIcon");
    const muteLabel = document.getElementById("muteLabel");
    const waves = document.getElementById("radioWaves");

    if (audio) {
        audio.volume = 0.65;
        audio.muted = !audio.muted;

        const isMuted = audio.muted;
        if (muteBtn) muteBtn.classList.toggle("muted", isMuted);
        if (muteIcon) muteIcon.className = isMuted ? "fa-solid fa-volume-xmark" : "fa-solid fa-volume-high";
        if (muteLabel) muteLabel.textContent = isMuted ? "UNMUTE" : "MUTE";

        if (waves) {
            if (isMuted || audio.paused) {
                waves.classList.remove("playing");
            } else {
                waves.classList.add("playing");
            }
        }

        radio.playSelectSound();
    } else {
        radio.toggle();
        const isMuted = !radio.isPlaying;
        if (muteBtn) muteBtn.classList.toggle("muted", isMuted);
        if (muteIcon) muteIcon.className = isMuted ? "fa-solid fa-volume-xmark" : "fa-solid fa-volume-high";
        if (muteLabel) muteLabel.textContent = isMuted ? "UNMUTE" : "MUTE";
    }
};

window.toggleViceCityRadio = function() {
    const audio = document.getElementById("gtaThemeAudio");
    const waves = document.getElementById("radioWaves");
    const pill = document.getElementById("reelRadioPill");
    const muteBtn = document.getElementById("reelMuteBtn");
    const muteIcon = document.getElementById("muteIcon");
    const muteLabel = document.getElementById("muteLabel");

    if (audio) {
        if (audio.paused) {
            audio.volume = 0.65;
            audio.muted = false;
            audio.play().then(() => {
                if (waves) waves.classList.add("playing");
                if (pill) pill.classList.add("active");
                if (muteBtn) muteBtn.classList.remove("muted");
                if (muteIcon) muteIcon.className = "fa-solid fa-volume-high";
                if (muteLabel) muteLabel.textContent = "MUTE";
                hideAudioHint();
            }).catch(e => {
                console.log("Audio play fallback to synthwave:", e);
                radio.start();
                hideAudioHint();
            });
        } else {
            audio.pause();
            if (waves) waves.classList.remove("playing");
            if (pill) pill.classList.remove("active");
            if (muteBtn) muteBtn.classList.add("muted");
            if (muteIcon) muteIcon.className = "fa-solid fa-volume-xmark";
            if (muteLabel) muteLabel.textContent = "UNMUTE";
        }
    } else {
        radio.toggle();
        hideAudioHint();
    }
};

window.startAudioAndHideBanner = function() {
    const audio = document.getElementById("gtaThemeAudio");
    const waves = document.getElementById("radioWaves");
    const pill = document.getElementById("reelRadioPill");

    if (audio) {
        audio.volume = 0.65;
        audio.play().then(() => {
            if (waves) waves.classList.add("playing");
            if (pill) pill.classList.add("active");
            hideAudioHint();
        }).catch(e => {
            radio.start();
            hideAudioHint();
        });
    } else {
        radio.start();
        hideAudioHint();
    }
};

function hideAudioHint() {
    const b = document.getElementById("audioHintBanner");
    if (b) b.classList.add("hidden");
}

// First interaction on page starts the official GTA Theme
document.addEventListener("click", () => {
    radio.init();
    const audio = document.getElementById("gtaThemeAudio");
    if (audio && audio.paused) {
        audio.volume = 0.65;
        audio.play().then(() => {
            const waves = document.getElementById("radioWaves");
            const pill = document.getElementById("reelRadioPill");
            if (waves) waves.classList.add("playing");
            if (pill) {
                pill.classList.add("playing");
                pill.classList.add("active");
            }
            hideAudioHint();
        }).catch(() => {});
    }
}, { once: true });


// ========================================================
// 2. SCREEN NAVIGATION & 3D CAMERA ROLL
// ========================================================
window.jumpToScreen = function(targetIndex, force = false) {
    if (targetIndex < 0 || targetIndex >= totalScreens || targetIndex === currentScreen) {
        return;
    }
    if (isRolling && !force) {
        return;
    }

    const screens = document.querySelectorAll(".gta-screen");
    if (!screens || screens.length === 0) return;

    const prevIndex = currentScreen;
    // Synchronize currentScreen immediately so no subsequent click uses stale screen index
    currentScreen = targetIndex;
    window.currentScreen = targetIndex;
    isRolling = true;

    radio.playRollWhoosh();

    // Auto-reset rolling lock after 450ms safety buffer
    if (window._rollingTimer) clearTimeout(window._rollingTimer);
    window._rollingTimer = setTimeout(() => { isRolling = false; }, 450);

    const currentEl = screens[prevIndex];
    const targetEl = screens[targetIndex];
    const flashOverlay = document.getElementById("rollFlashOverlay");

    // Camera roll direction
    const direction = targetIndex > prevIndex ? 1 : -1;

    // Glitch flash
    if (flashOverlay) {
        flashOverlay.classList.add("active");
        setTimeout(() => flashOverlay.classList.remove("active"), 220);
    }

    // Clean up any other screens immediately so no rogue screen stays active
    screens.forEach((s, idx) => {
        if (idx !== prevIndex && idx !== targetIndex) {
            s.classList.remove("active");
            if (typeof gsap !== "undefined" && gsap.killTweensOf) {
                gsap.killTweensOf(s);
                gsap.set(s, { clearProps: "all" });
            }
        }
    });

    if (typeof gsap !== "undefined" && gsap.to && gsap.fromTo) {
        gsap.killTweensOf(currentEl);
        gsap.killTweensOf(targetEl);
        targetEl.classList.add("active");

        // 3D Roll Out
        gsap.to(currentEl, {
            duration: 0.38,
            rotationY: -direction * 16,
            rotationX: 4,
            z: -180,
            opacity: 0,
            ease: "power2.inOut",
            onComplete: () => {
                currentEl.classList.remove("active");
                gsap.set(currentEl, { clearProps: "all" });
            }
        });

        // 3D Roll In
        gsap.fromTo(targetEl, {
            rotationY: direction * 16,
            rotationX: -4,
            z: -180,
            opacity: 0
        }, {
            duration: 0.40,
            rotationY: 0,
            rotationX: 0,
            z: 0,
            opacity: 1,
            ease: "power2.out",
            onComplete: () => {
                isRolling = false;
                screens.forEach((s, idx) => {
                    if (idx !== targetIndex) {
                        s.classList.remove("active");
                        gsap.set(s, { clearProps: "all" });
                    }
                });
                gsap.set(targetEl, { clearProps: "all" });
                onScreenArrived(targetIndex);
            }
        });
    } else {
        // Pure CSS Fail-Safe Fallback
        currentEl.classList.remove("active");
        targetEl.classList.add("active");
        isRolling = false;
        screens.forEach((s, idx) => {
            if (idx !== targetIndex) s.classList.remove("active");
        });
        onScreenArrived(targetIndex);
    }
};

function onScreenArrived(index) {
    // 1. Update Objective Text & Color
    const obj = SCREEN_OBJECTIVES[index] || { text: "EXPLORE VICE CITY", color: "#00f0ff" };
    const objEl = document.getElementById("reelObjectiveText");
    const labelEl = document.getElementById("reelObjectiveLabel");
    if (objEl) {
        objEl.textContent = obj.text;
        objEl.style.color = obj.color;
    }
    if (labelEl) {
        labelEl.style.color = obj.color;
    }

    // 2. Toggle ESC Back to Menu button
    const escBtn = document.getElementById("reelEscBtn");
    if (escBtn) {
        if (index === 0) {
            escBtn.classList.add("hidden");
        } else {
            escBtn.classList.remove("hidden");
        }
    }

    // 3. Track visited section & award Cash & checkmark
    if (index > 0 && index < 8) {
        if (!visitedScreens.has(index)) {
            visitedScreens.add(index);
            // Cash Reward
            const reward = 150000;
            cash += reward;
            updateCashDisplay(reward);
            radio.playCashChime();

            // Mark Checkmark on Menu
            const checkId = SCREEN_CHECK_IDS[index];
            if (checkId) {
                const checkEl = document.getElementById(checkId);
                if (checkEl) checkEl.textContent = "✓";
            }
        }
    }
    updateMapTelemetry();

    // Trigger living atmospheric weather transition for the new screen
    if (window.atmosphericEngine) {
        window.atmosphericEngine.setScreen(index);
    }
}

function updateCashDisplay(flyoutAmount) {
    const cashEl = document.getElementById("cashAmount");
    if (cashEl) {
        cashEl.textContent = "$" + cash.toLocaleString();
    }
    if (flyoutAmount) {
        const flyEl = document.getElementById("cashFlyout");
        if (flyEl) {
            flyEl.textContent = "+$" + flyoutAmount.toLocaleString();
            flyEl.classList.remove("animate");
            void flyEl.offsetWidth; // trigger reflow
            flyEl.classList.add("animate");
        }
    }
}


// ========================================================
// 3. MAIN MENU ARROW KEYS & HOVER SOUNDS
// ========================================================
function setupMainMenu() {
    const menuLinks = document.querySelectorAll("#reelVerticalMenu .reel-menu-link");
    menuLinks.forEach((link, idx) => {
        link.addEventListener("mouseenter", () => {
            menuLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
            radio.playMetallicTick();
        });

        link.addEventListener("click", () => {
            radio.playSelectSound();
            const targetAttr = link.getAttribute("data-target");
            if (targetAttr === "start_game" || link.id === "startGameMenuBtn") {
                openWeaponWheel(true);
                return;
            }
            const target = parseInt(targetAttr);
            if (!isNaN(target)) {
                jumpToScreen(target, true);
            }
        });
    });
}


// ========================================================
// 4. RADIAL WEAPON WHEEL & MODALS
// ========================================================
window.openWeaponWheel = function(autoLaunch = false) {
    const overlay = document.getElementById("weaponWheelOverlay");
    if (!overlay) return;
    overlay.classList.add("active");
    isWeaponWheelOpen = true;
    radio.playSelectSound();

    if (autoLaunch) {
        if (window._autoLaunchTimer) clearTimeout(window._autoLaunchTimer);
        window._autoLaunchTimer = setTimeout(() => {
            if (isWeaponWheelOpen) {
                equipAndLaunchGame();
            }
        }, 1500);
    }
};

window.closeWeaponWheel = function() {
    const overlay = document.getElementById("weaponWheelOverlay");
    if (!overlay) return;
    overlay.classList.remove("active");
    isWeaponWheelOpen = false;
};

window.closeWeaponWheelOnOutside = function(e) {
    if (e.target.id === "weaponWheelOverlay") {
        closeWeaponWheel();
    }
};

window.openProjectsModal = function() {
    const overlay = document.getElementById("projectsModalOverlay");
    if (overlay) {
        overlay.classList.add("active");
        radio.playSelectSound();
    }
};

window.closeProjectsModal = function() {
    const overlay = document.getElementById("projectsModalOverlay");
    if (overlay) overlay.classList.remove("active");
};

window.closeProjectsModalOnOutside = function(e) {
    if (e.target.id === "projectsModalOverlay") {
        closeProjectsModal();
    }
};

window.openCertsModal = function() {
    const overlay = document.getElementById("certsModalOverlay");
    if (overlay) {
        overlay.classList.add("active");
        radio.playSelectSound();
    }
};

window.closeCertsModal = function() {
    const overlay = document.getElementById("certsModalOverlay");
    if (overlay) overlay.classList.remove("active");
};

window.closeCertsModalOnOutside = function(e) {
    if (e.target.id === "certsModalOverlay") {
        closeCertsModal();
    }
};

function setupWeaponWheelSlots() {
    const slots = document.querySelectorAll(".radial-slice-slot");
    slots.forEach(slot => {
        slot.addEventListener("mouseenter", () => {
            slots.forEach(s => s.classList.remove("active"));
            slot.classList.add("active");
            radio.playWheelRatchet();

            // Update stats panel
            const name = slot.getAttribute("data-name");
            const cat = slot.getAttribute("data-cat");
            const desc = slot.getAttribute("data-desc");
            const icon = slot.getAttribute("data-icon");
            const dmg = slot.getAttribute("data-dmg");
            const spd = slot.getAttribute("data-spd");
            const acc = slot.getAttribute("data-acc");
            const rng = slot.getAttribute("data-rng");

            document.getElementById("hubWeaponTitle").textContent = name.toUpperCase();
            document.getElementById("hubWeaponCat").textContent = cat;
            document.getElementById("statPanelWeaponName").textContent = name.toUpperCase();
            document.getElementById("statPanelDesc").textContent = desc;

            const iconEl = document.getElementById("hubWeaponIcon");
            if (iconEl) iconEl.className = icon;

            document.getElementById("meterDmgVal").textContent = dmg + "%";
            document.getElementById("meterDmgFill").style.width = dmg + "%";

            document.getElementById("meterSpdVal").textContent = spd + "%";
            document.getElementById("meterSpdFill").style.width = spd + "%";

            document.getElementById("meterAccVal").textContent = acc + "%";
            document.getElementById("meterAccFill").style.width = acc + "%";

            document.getElementById("meterRngVal").textContent = rng + "%";
            document.getElementById("meterRngFill").style.width = rng + "%";
        });

        // Clicking any slice equips it and rolls into mission
        slot.addEventListener("click", () => {
            slots.forEach(s => s.classList.remove("active"));
            slot.classList.add("active");
            radio.playSelectSound();
            equipAndLaunchGame();
        });
    });
}

window.equipAndLaunchGame = function() {
    const activeSlot = document.querySelector(".radial-slice-slot.active");
    const name = activeSlot ? activeSlot.getAttribute("data-name") : "Java 21 Enterprise";
    const cat = activeSlot ? activeSlot.getAttribute("data-cat") : "HEAVY AUTOMATIC";

    // Update HUD weapon slot tag
    const hudTag = document.getElementById("hudWeaponTag");
    if (hudTag && activeSlot) {
        const shortSpan = activeSlot.querySelector("span");
        hudTag.textContent = shortSpan ? `[ ${shortSpan.textContent} ]` : "[ JAVA ]";
    }

    triggerMissionToast("LOADOUT EQUIPPED!", 100000, `${name.toUpperCase()} // ${cat}`);
    closeWeaponWheel();

    // Check off START GAME checkmark
    const chkStart = document.getElementById("chk-start");
    if (chkStart) chkStart.textContent = "✓";

    // Roll into Screen 1 (About Me) ONLY if starting from main menu (screen 0)
    if (currentScreen === 0) {
        setTimeout(() => {
            window.jumpToScreen(1, true);
        }, 300);
    }
};

window.equipCurrentHighlightedWeapon = function() {
    const activeSlot = document.querySelector(".radial-slice-slot.active");
    if (activeSlot) {
        const name = activeSlot.getAttribute("data-name");
        triggerMissionToast("TECH ARSENAL EQUIPPED!", 50000, name);
        closeWeaponWheel();
    }
};

window.equipTech = function(name, role, desc) {
    radio.playSelectSound();
    triggerMissionToast("EQUIPPED: " + name, 25000, role + " // " + desc);
};

window.triggerMissionToast = function(headline, bounty, detail) {
    const banner = document.getElementById("missionPassedBanner");
    const rewardEl = document.getElementById("mpReward");
    const detailEl = document.getElementById("mpDetail");

    if (banner) {
        if (rewardEl) rewardEl.textContent = "REWARD: + $" + bounty.toLocaleString();
        if (detailEl) detailEl.textContent = detail;

        banner.classList.add("active");
        radio.playCashChime();

        cash += bounty;
        updateCashDisplay(bounty);

        setTimeout(() => banner.classList.remove("active"), 2800);
    }
};

// ========================================================
// 4B. INTERACTIVE MONEY SYSTEM (FREELANCE CONTRACTS & HEISTS)
// ========================================================
window.collectCashBounty = function() {
    const now = Date.now();
    if (now - lastCashClickTime < 1400) {
        rapidCashClicks++;
    } else {
        rapidCashClicks = 1;
    }
    lastCashClickTime = now;

    let payout = 25000 + Math.floor(Math.random() * 50000);
    let label = "FREELANCE CONTRACT BOUNTY";

    if (rapidCashClicks >= 4) {
        payout = 150000;
        label = "🔥 HEIST COMBO MULTIPLIER x4!";
        rapidCashClicks = 0;
    }

    cash += payout;
    radio.playCashChime();
    updateCashDisplay(payout);
    triggerMissionToast("CASH SECURED!", payout, label);
};

// ========================================================
// 4C. INTERACTIVE WANTED STARS & POLICE HEAT
// ========================================================
window.setWantedLevel = function(level) {
    if (wantedLevel === level) {
        // Clicking same star lowers heat by 1, or clears if at 1
        wantedLevel = level > 1 ? level - 1 : 0;
    } else {
        wantedLevel = level;
    }
    updateWantedStarsDisplay();
};

window.cycleWantedLevel = function() {
    wantedLevel = (wantedLevel + 1) % 6; // cycles 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 0
    updateWantedStarsDisplay();
};

window.clearWantedLevel = function() {
    wantedLevel = 0;
    updateWantedStarsDisplay();
};

function updateWantedStarsDisplay() {
    const stars = document.querySelectorAll("#wantedStars .star");
    const strobeOverlay = document.getElementById("policeHeatStrobe");

    stars.forEach((star, idx) => {
        const starNum = idx + 1;
        if (starNum <= wantedLevel) {
            star.classList.add("active");
            if (wantedLevel >= 3) {
                star.classList.add("flashing");
            } else {
                star.classList.remove("flashing");
            }
        } else {
            star.classList.remove("active", "flashing");
        }
    });

    if (strobeOverlay) {
        if (wantedLevel >= 4) {
            strobeOverlay.classList.add("active");
            if (wantedLevel === 5) {
                strobeOverlay.classList.add("intense");
            } else {
                strobeOverlay.classList.remove("intense");
            }
        } else {
            strobeOverlay.classList.remove("active", "intense");
        }
    }

    // Dynamic GTA Toast & Siren
    if (wantedLevel === 0) {
        radio.playSelectSound();
        triggerMissionToast("HEAT EVADED!", 50000, "VCPD Lost the Trail // All Charges Dropped");
    } else if (wantedLevel === 1) {
        radio.playPoliceDispatch();
        triggerMissionToast("WANTED ★ [1 STAR]", 15000, "Minor Infraction // Local Patrols Alerted");
    } else if (wantedLevel === 2) {
        radio.playPoliceDispatch();
        triggerMissionToast("WANTED ★★ [2 STARS]", 35000, "Squad Cars Dispatched // 10-33 Code Active");
    } else if (wantedLevel === 3) {
        radio.playPoliceSiren();
        triggerMissionToast("WANTED ★★★ [3 STARS]", 75000, "SWAT Units En Route // Roadblocks Armed");
    } else if (wantedLevel === 4) {
        radio.playPoliceSiren();
        triggerMissionToast("WANTED ★★★★ [4 STARS]", 150000, "FBI Tactical Strike // VCPD Air Support Called");
    } else if (wantedLevel === 5) {
        radio.playPoliceSiren();
        triggerMissionToast("WANTED ★★★★★ [5 STARS]", 250000, "MAXIMUM PURSUIT! Choppers & Military Active!");
    }
}

// ========================================================
// 4D. FULL-SCREEN VICE CITY SATELLITE GPS MAP MODAL
// ========================================================
window.openFullMap = function() {
    const overlay = document.getElementById("fullMapOverlay");
    if (!overlay) return;
    overlay.classList.add("active");
    isFullMapOpen = true;
    radio.playSelectSound();
    updateMapTelemetry();
    previewMapWaypoint(currentScreen);
};

window.closeFullMap = function() {
    const overlay = document.getElementById("fullMapOverlay");
    if (!overlay) return;
    overlay.classList.remove("active");
    isFullMapOpen = false;
};

window.closeFullMapOnOutside = function(e) {
    if (e.target.id === "fullMapOverlay") {
        closeFullMap();
    }
};

window.previewMapWaypoint = function(screenIdx) {
    selectedMapIndex = screenIdx;
    const district = MAP_DISTRICTS[screenIdx];
    if (!district) return;

    // Update Tactical card info
    const titleEl = document.getElementById("tacTitle");
    const subEl = document.getElementById("tacSub");
    const descEl = document.getElementById("tacDesc");
    const territoryEl = document.getElementById("tacTerritory");
    const bountyEl = document.getElementById("tacBounty");

    if (titleEl) titleEl.textContent = district.title;
    if (subEl) subEl.textContent = district.sub;
    if (descEl) descEl.textContent = district.desc;
    if (territoryEl) territoryEl.textContent = district.territory;
    if (bountyEl) bountyEl.textContent = district.bounty;

    // Draw GPS line from current player position to target waypoint
    const currentDistrict = MAP_DISTRICTS[currentScreen] || MAP_DISTRICTS[0];
    const targetDistrict = district;
    const routeLine = document.getElementById("mapGpsLiveRoute");
    if (routeLine) {
        const midX = (currentDistrict.pos.x + targetDistrict.pos.x) / 2;
        const midY = (currentDistrict.pos.y + targetDistrict.pos.y) / 2 - 30;
        routeLine.setAttribute("d", `M ${currentDistrict.pos.x},${currentDistrict.pos.y} Q ${midX},${midY} ${targetDistrict.pos.x},${targetDistrict.pos.y}`);
    }

    radio.playMetallicTick();
};

window.fastTravelToScreen = function(screenIdx) {
    if (screenIdx < 0 || screenIdx >= totalScreens) return;
    radio.playTeleportSound();
    closeFullMap();
    window.jumpToScreen(screenIdx, true);
    triggerMissionToast("GPS WARP COMPLETE!", 50000, `Fast-Traveled to ${MAP_DISTRICTS[screenIdx]?.title || 'Destination'}`);
};

window.fastTravelSelected = function() {
    fastTravelToScreen(selectedMapIndex);
};

function updateMapTelemetry() {
    const cur = MAP_DISTRICTS[currentScreen];
    const curEl = document.getElementById("mapTelemetryCurrent");
    if (curEl && cur) {
        curEl.textContent = cur.title;
    }

    // Update player icon position on map
    const playerMarker = document.getElementById("mapLivePlayerMarker");
    if (playerMarker && cur) {
        playerMarker.setAttribute("transform", `translate(${cur.pos.x}, ${cur.pos.y})`);
    }
}


// ========================================================
// 5. CLOCK & COUNTDOWN TICKERS
// ========================================================
function initClock() {
    function tickClock() {
        const now = new Date();
        const hrs = String(now.getHours()).padStart(2, "0");
        const mins = String(now.getMinutes()).padStart(2, "0");
        const el = document.getElementById("reelClock");
        if (el) el.textContent = hrs + ":" + mins;
    }
    tickClock();
    setInterval(tickClock, 1000);
}

function initCountdown() {
    let secs = 18;
    let mins = 33;
    let hours = 15;
    let days = 108;

    setInterval(() => {
        secs--;
        if (secs < 0) {
            secs = 59;
            mins--;
            if (mins < 0) {
                mins = 59;
                hours--;
                if (hours < 0) {
                    hours = 23;
                    days--;
                }
            }
        }
        const sEl = document.getElementById("cdSecs");
        const mEl = document.getElementById("cdMins");
        const hEl = document.getElementById("cdHours");
        const dEl = document.getElementById("cdDays");
        if (sEl) sEl.textContent = String(secs).padStart(2, "0");
        if (mEl) mEl.textContent = String(mins).padStart(2, "0");
        if (hEl) hEl.textContent = String(hours).padStart(2, "0");
        if (dEl) dEl.textContent = days;
    }, 1000);
}


// ========================================================
// 6. GLOBAL KEYBOARD & WHEEL LISTENERS
// ========================================================
function setupGlobalControls() {
    // Keyboard listener
    window.addEventListener("keydown", (e) => {
        // Tab: Weapon Wheel
        if (e.key === "Tab") {
            e.preventDefault();
            if (isWeaponWheelOpen) closeWeaponWheel();
            else openWeaponWheel();
            return;
        }

        // T: Toggle Radio Theme
        if (e.key === "t" || e.key === "T") {
            toggleViceCityRadio();
            return;
        }

        // M: Toggle Music Mute / Unmute
        if (e.key === "m" || e.key === "M") {
            toggleMusicMute();
            return;
        }

        // P: Toggle Full Vice City Satellite GPS Map
        if (e.key === "p" || e.key === "P") {
            if (isFullMapOpen) closeFullMap();
            else openFullMap();
            return;
        }

        // W: Cycle Police Wanted Heat Level (0 to 5 stars)
        if (e.key === "w" || e.key === "W") {
            cycleWantedLevel();
            return;
        }

        // V: Watch Full Reel Trailer Mode
        if (e.key === "v" || e.key === "V") {
            if (window.isReelModalOpen) {
                window.closeCinematicReel();
            } else {
                window.openCinematicReel();
            }
            return;
        }

        // ESC: Back to Menu / Close modals
        if (e.key === "Escape") {
            if (window.isReelModalOpen) {
                window.closeCinematicReel();
                return;
            }
            if (window.isTheaterModalOpen) {
                window.closeProjectClipModal();
                return;
            }
            if (isFullMapOpen) {
                closeFullMap();
                return;
            }
            if (isWeaponWheelOpen) {
                closeWeaponWheel();
                return;
            }
            closeProjectsModal();
            closeCertsModal();
            if (currentScreen !== 0) {
                window.jumpToScreen(0, true);
            }
            return;
        }

        // Enter: select in Screen 0 or equip loadout in Weapon Wheel
        if (e.key === "Enter") {
            if (isWeaponWheelOpen) {
                equipAndLaunchGame();
                return;
            }
            if (currentScreen === 0) {
                const activeLink = document.querySelector("#reelVerticalMenu .reel-menu-link.active");
                if (activeLink) {
                    const targetAttr = activeLink.getAttribute("data-target");
                    if (targetAttr === "start_game" || activeLink.id === "startGameMenuBtn") {
                        openWeaponWheel(true);
                        return;
                    }
                    const target = parseInt(targetAttr);
                    if (!isNaN(target)) window.jumpToScreen(target, true);
                }
            }
            return;
        }

        // Space / Arrow Right: Next Screen
        if (e.key === " " || e.key === "ArrowRight") {
            e.preventDefault();
            window.navNextScreen();
            return;
        }

        // Arrow Left: Prev Screen
        if (e.key === "ArrowLeft") {
            e.preventDefault();
            window.navPrevScreen();
            return;
        }

        // Arrow Up / Down in Screen 0 Menu
        if (currentScreen === 0 && (e.key === "ArrowUp" || e.key === "ArrowDown")) {
            e.preventDefault();
            const links = Array.from(document.querySelectorAll("#reelVerticalMenu .reel-menu-link"));
            const currentActiveIdx = links.findIndex(l => l.classList.contains("active"));
            let nextIdx = 0;
            if (e.key === "ArrowDown") {
                nextIdx = (currentActiveIdx + 1) % links.length;
            } else {
                nextIdx = (currentActiveIdx - 1 + links.length) % links.length;
            }
            links.forEach(l => l.classList.remove("active"));
            links[nextIdx].classList.add("active");
            radio.playMetallicTick();
        }
    });

    // Mouse Wheel & Trackpad Navigation with sensitive accumulator
    let scrollDelta = 0;
    let wheelTimer = null;
    window.addEventListener("wheel", (e) => {
        if (isWeaponWheelOpen || isFullMapOpen) return;
        scrollDelta += e.deltaY;
        if (wheelTimer) clearTimeout(wheelTimer);
        wheelTimer = setTimeout(() => { scrollDelta = 0; }, 180);

        if (scrollDelta > 30) {
            scrollDelta = 0;
            window.navNextScreen();
        } else if (scrollDelta < -30) {
            scrollDelta = 0;
            window.navPrevScreen();
        }
    }, { passive: true });

    // Touch Swipe Navigation for mobile & touchscreens
    let touchStartY = 0;
    let touchStartX = 0;
    window.addEventListener("touchstart", (e) => {
        if (e.touches && e.touches.length > 0) {
            touchStartY = e.touches[0].clientY;
            touchStartX = e.touches[0].clientX;
        }
    }, { passive: true });

    window.addEventListener("touchend", (e) => {
        if (isWeaponWheelOpen || isFullMapOpen) return;
        if (!e.changedTouches || e.changedTouches.length === 0) return;
        const touchEndY = e.changedTouches[0].clientY;
        const touchEndX = e.changedTouches[0].clientX;
        const diffY = touchStartY - touchEndY;
        const diffX = touchStartX - touchEndX;

        if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 25) {
            if (diffY > 25) {
                window.navNextScreen();
            } else if (diffY < -25) {
                window.navPrevScreen();
            }
        }
    }, { passive: true });
}


// ========================================================
// 7. CINEMATIC LIVING ATMOSPHERIC VIDEO ENGINE
// ========================================================
class AtmosphericVideoEngine {
    constructor() {
        this.canvas = document.getElementById("atmosphericCanvas");
        this.ctx = this.canvas ? this.canvas.getContext("2d") : null;
        this.currentScreen = 0;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.particles = [];
        this.lightningFlash = 0;
        this.lightningTimer = 0;
        this.lightningBranches = [];
        this.searchlightAngle = 0;
        this.carTrails = [];
        this.time = 0;
        this.isRunning = false;

        this.init();
    }

    init() {
        if (!this.canvas || !this.ctx) return;
        this.resize();
        window.addEventListener("resize", () => this.resize());
        this.initParticles();
        this.isRunning = true;
        this.animate = this.animate.bind(this);
        requestAnimationFrame(this.animate);
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        if (this.canvas) {
            this.canvas.width = this.width;
            this.canvas.height = this.height;
        }
    }

    setScreen(screenIndex) {
        this.currentScreen = screenIndex;
        this.initParticles();
    }

    initParticles() {
        this.particles = [];
        this.carTrails = [];
        const count = this.currentScreen === 2 ? 140 : 45; // Rain storm needs more drops

        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: this.currentScreen === 2 ? 3 + Math.random() * 2 : (Math.random() - 0.5) * 0.8,
                vy: this.currentScreen === 2 ? 16 + Math.random() * 8 : -0.4 - Math.random() * 0.8,
                size: this.currentScreen === 2 ? 18 + Math.random() * 12 : 2 + Math.random() * 4,
                alpha: 0.2 + Math.random() * 0.6,
                baseAlpha: 0.2 + Math.random() * 0.6,
                wobble: Math.random() * Math.PI * 2
            });
        }

        // Night screens (5 & 7): generate car trails
        if (this.currentScreen === 5 || this.currentScreen === 7) {
            for (let i = 0; i < 6; i++) {
                this.carTrails.push({
                    x: Math.random() * this.width,
                    y: this.height * (0.65 + Math.random() * 0.25),
                    vx: 8 + Math.random() * 14,
                    length: 80 + Math.random() * 120,
                    color: Math.random() > 0.5 ? "rgba(255, 30, 30, 0.7)" : "rgba(255, 255, 220, 0.85)",
                    glow: Math.random() > 0.5 ? "rgba(255, 0, 80, 0.4)" : "rgba(255, 255, 180, 0.3)"
                });
            }
        }
    }

    createLightning() {
        this.lightningFlash = 1.0;
        this.lightningBranches = [];
        const startX = this.width * (0.2 + Math.random() * 0.6);
        let currX = startX;
        let currY = 0;
        const pts = [{ x: currX, y: currY }];

        while (currY < this.height * 0.65) {
            currX += (Math.random() - 0.5) * 60;
            currY += 20 + Math.random() * 35;
            pts.push({ x: currX, y: currY });

            // Fork branch
            if (Math.random() < 0.3) {
                let forkX = currX;
                let forkY = currY;
                const forkPts = [{ x: forkX, y: forkY }];
                for (let b = 0; b < 3; b++) {
                    forkX += (Math.random() - 0.5) * 50;
                    forkY += 15 + Math.random() * 25;
                    forkPts.push({ x: forkX, y: forkY });
                }
                this.lightningBranches.push(forkPts);
            }
        }
        this.lightningBranches.push(pts);

        // Play thunder rumble via radio if available
        if (window.radio && window.radio.ctx) {
            try {
                const now = window.radio.ctx.currentTime;
                const osc = window.radio.ctx.createOscillator();
                const gain = window.radio.ctx.createGain();
                osc.type = "sawtooth";
                osc.frequency.setValueAtTime(80, now);
                osc.frequency.exponentialRampToValueAtTime(25, now + 1.2);
                gain.gain.setValueAtTime(0.35, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 1.2);
                osc.connect(gain);
                gain.connect(window.radio.ctx.destination);
                osc.start(now);
                osc.stop(now + 1.3);
            } catch(e) {}
        }
    }

    animate() {
        if (!this.isRunning || !this.ctx) return;
        this.time += 0.016;
        this.ctx.clearRect(0, 0, this.width, this.height);

        // SCREEN 2: HEAVY RAINSTORM & LIGHTNING
        if (this.currentScreen === 2) {
            this.lightningTimer += 0.016;
            if (this.lightningTimer > 5.5 + Math.random() * 4) {
                this.lightningTimer = 0;
                this.createLightning();
            }

            // Draw Lightning Flash & Bolts
            if (this.lightningFlash > 0.01) {
                this.ctx.fillStyle = `rgba(220, 245, 255, ${this.lightningFlash * 0.38})`;
                this.ctx.fillRect(0, 0, this.width, this.height);

                // Draw electric lightning lines
                this.ctx.save();
                this.ctx.strokeStyle = `rgba(255, 255, 255, ${this.lightningFlash})`;
                this.ctx.lineWidth = 2.5;
                this.ctx.shadowColor = "#00f0ff";
                this.ctx.shadowBlur = 18;

                for (const branch of this.lightningBranches) {
                    if (branch.length < 2) continue;
                    this.ctx.beginPath();
                    this.ctx.moveTo(branch[0].x, branch[0].y);
                    for (let p = 1; p < branch.length; p++) {
                        this.ctx.lineTo(branch[p].x, branch[p].y);
                    }
                    this.ctx.stroke();
                }
                this.ctx.restore();
                this.lightningFlash *= 0.88;
            }

            // Draw Rain Streaks
            this.ctx.strokeStyle = "rgba(180, 220, 255, 0.55)";
            this.ctx.lineWidth = 1.2;
            this.ctx.beginPath();
            for (const p of this.particles) {
                this.ctx.moveTo(p.x, p.y);
                this.ctx.lineTo(p.x + p.vx * 1.5, p.y + p.size);

                p.x += p.vx;
                p.y += p.vy;

                if (p.y > this.height) {
                    // Rain splash ripple at bottom
                    p.y = -10;
                    p.x = Math.random() * this.width;
                }
                if (p.x > this.width) p.x = 0;
            }
            this.ctx.stroke();
        }

        // SCREEN 0, 1, 3: OCEAN WATER RIPPLE SHIMMER & SUN PARTICLES
        else if (this.currentScreen === 0 || this.currentScreen === 1 || this.currentScreen === 3) {
            // Draw Ocean Water Wave Shimmer at bottom
            this.ctx.save();
            const waterY = this.height * 0.82;
            const grad = this.ctx.createLinearGradient(0, waterY, 0, this.height);
            grad.addColorStop(0, "rgba(0, 240, 255, 0.0)");
            grad.addColorStop(0.5, "rgba(0, 240, 255, 0.08)");
            grad.addColorStop(1, "rgba(0, 150, 255, 0.18)");
            this.ctx.fillStyle = grad;
            this.ctx.beginPath();
            this.ctx.moveTo(0, waterY);
            for (let x = 0; x <= this.width; x += 40) {
                const waveY = waterY + Math.sin(x * 0.015 + this.time * 2.2) * 8 + Math.cos(x * 0.03 + this.time * 1.5) * 4;
                this.ctx.lineTo(x, waveY);
            }
            this.ctx.lineTo(this.width, this.height);
            this.ctx.lineTo(0, this.height);
            this.ctx.closePath();
            this.ctx.fill();

            // Specular sun sparkle on water
            for (let s = 0; s < 12; s++) {
                const sx = (this.width * 0.45) + Math.sin(s + this.time * 3) * (this.width * 0.35);
                const sy = waterY + 20 + (s * 8);
                const r = 1.5 + Math.sin(this.time * 5 + s) * 1.2;
                if (r > 0) {
                    this.ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
                    this.ctx.beginPath();
                    this.ctx.arc(sx, sy, r, 0, Math.PI * 2);
                    this.ctx.fill();
                }
            }
            this.ctx.restore();

            // Floating Golden Sun Dust Motes
            for (const p of this.particles) {
                p.y += p.vy;
                p.x += Math.sin(this.time + p.wobble) * 0.4;
                if (p.y < 0) {
                    p.y = this.height + 10;
                    p.x = Math.random() * this.width;
                }
                const alpha = p.baseAlpha * (0.6 + Math.sin(this.time * 2 + p.wobble) * 0.4);
                this.ctx.fillStyle = `rgba(255, 220, 150, ${alpha})`;
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
                this.ctx.fill();
            }

            // Subtle Swaying Palm Leaf Silhouettes in corners
            this.ctx.save();
            this.ctx.fillStyle = "rgba(4, 7, 16, 0.45)";
            const sway = Math.sin(this.time * 0.8) * 8;
            // Top Right Palm
            this.ctx.beginPath();
            this.ctx.moveTo(this.width + 40, -20);
            this.ctx.bezierCurveTo(this.width - 80 + sway, 40, this.width - 180 + sway, 120, this.width - 240 + sway, 200);
            this.ctx.bezierCurveTo(this.width - 150, 100, this.width - 50, 30, this.width + 40, -20);
            this.ctx.fill();
            this.ctx.restore();
        }

        // SCREEN 5 & 7: DEEP NIGHT NEON, HELICOPTER SEARCHLIGHT & CAR TRAILS
        else if (this.currentScreen === 5 || this.currentScreen === 7) {
            this.searchlightAngle = Math.sin(this.time * 0.6) * 0.45;

            // Rotating Police Helicopter Searchlight Cone
            this.ctx.save();
            const sourceX = this.width * 0.85;
            const sourceY = 20;
            const beamLength = this.height * 1.1;
            const targetX = sourceX + Math.sin(this.searchlightAngle) * beamLength;
            const targetY = sourceY + Math.cos(this.searchlightAngle) * beamLength;
            const beamWidth = 140;

            const searchGrad = this.ctx.createRadialGradient(sourceX, sourceY, 10, targetX, targetY, beamWidth * 2);
            searchGrad.addColorStop(0, "rgba(220, 245, 255, 0.4)");
            searchGrad.addColorStop(0.3, "rgba(0, 240, 255, 0.18)");
            searchGrad.addColorStop(0.8, "rgba(0, 200, 255, 0.04)");
            searchGrad.addColorStop(1, "transparent");

            this.ctx.fillStyle = searchGrad;
            this.ctx.beginPath();
            this.ctx.moveTo(sourceX, sourceY);
            this.ctx.lineTo(targetX - beamWidth, targetY);
            this.ctx.lineTo(targetX + beamWidth, targetY);
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.restore();

            // High-speed car headlight & taillight laser trails
            for (const trail of this.carTrails) {
                this.ctx.save();
                this.ctx.strokeStyle = trail.color;
                this.ctx.lineWidth = 2.5;
                this.ctx.shadowColor = trail.color;
                this.ctx.shadowBlur = 10;
                this.ctx.beginPath();
                this.ctx.moveTo(trail.x, trail.y);
                this.ctx.lineTo(trail.x - trail.length, trail.y);
                this.ctx.stroke();
                this.ctx.restore();

                trail.x += trail.vx;
                if (trail.x - trail.length > this.width) {
                    trail.x = -trail.length;
                    trail.y = this.height * (0.68 + Math.random() * 0.22);
                    trail.vx = 8 + Math.random() * 14;
                }
            }

            // Neon dust floating
            for (const p of this.particles) {
                p.y += p.vy;
                p.x += Math.sin(this.time + p.wobble) * 0.5;
                if (p.y < 0) p.y = this.height + 10;
                this.ctx.fillStyle = `rgba(0, 240, 255, ${p.baseAlpha * 0.5})`;
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }

        // SCREEN 4, 6, 8: SUNRISE / GOLDEN EMBERS & HORIZON BIRDS
        else {
            for (const p of this.particles) {
                p.y += p.vy;
                p.x += Math.sin(this.time + p.wobble) * 0.6;
                if (p.y < 0) {
                    p.y = this.height + 10;
                    p.x = Math.random() * this.width;
                }
                const color = this.currentScreen === 8 ? "rgba(255, 120, 180," : "rgba(255, 210, 120,";
                this.ctx.fillStyle = `${color} ${p.baseAlpha * 0.6})`;
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
                this.ctx.fill();
            }

            // Golden God Rays streaming from top-right
            this.ctx.save();
            const rayGrad = this.ctx.createLinearGradient(this.width * 0.9, 0, this.width * 0.3, this.height);
            rayGrad.addColorStop(0, "rgba(255, 220, 140, 0.12)");
            rayGrad.addColorStop(0.5, "rgba(255, 180, 100, 0.05)");
            rayGrad.addColorStop(1, "transparent");
            this.ctx.fillStyle = rayGrad;
            this.ctx.beginPath();
            this.ctx.moveTo(this.width * 0.6, 0);
            this.ctx.lineTo(this.width, 0);
            this.ctx.lineTo(this.width * 0.4, this.height);
            this.ctx.lineTo(0, this.height);
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.restore();
        }

        requestAnimationFrame(this.animate);
    }
}


// ========================================================
// 8. PROJECT MOVING VIDEO CLIPS ENGINE
// ========================================================
const PROJECT_CLIPS_DATA = [
    {
        id: 0,
        title: "BEANBYTE COFFEE SHOP",
        tag: "MISSION: FULL-STACK CAFE POS SYSTEM",
        desc: "Full-Stack hospitality web application for ordering, real-time cart persistence, status tracking, and dynamic menu catalog presentation.",
        tech: ["Java 21", "Spring Boot", "React.js", "Render Cloud"],
        demo: "https://beanbyte-coffee-shop.onrender.com",
        github: "https://github.com/HimanshiSolankii-28/beanbyte-coffee-shop",
        render: renderBeanByteClip
    },
    {
        id: 1,
        title: "PORTFOLIO VI DOSSIER",
        tag: "MISSION: GTA VI VICE CITY ENGINE",
        desc: "Next-gen developer showcase featuring 3D camera rolls, 8-way radial weapon wheel, interactive GPS minimap, and synthwave radio stream.",
        tech: ["JavaScript ES6", "CSS 3D", "Web Audio API", "GSAP Engine"],
        demo: "#",
        github: "https://github.com/harshgawde12112005-boop",
        render: renderPortfolioClip
    },
    {
        id: 2,
        title: "AI LANDSLIDE HAZARD DETECTION",
        tag: "MISSION: DEEP LEARNING RADAR VISION",
        desc: "Computer vision hazard monitoring pipeline using convolutional neural networks and geospatial terrain imagery to forecast mudslide risks.",
        tech: ["Python", "OpenCV", "PyTorch", "GIS Telemetry"],
        demo: "https://github.com/harshgawde12112005-boop",
        github: "https://github.com/harshgawde12112005-boop",
        render: renderLandslideClip
    },
    {
        id: 3,
        title: "BLUESTOCK FINANCIAL ANALYTICS",
        tag: "MISSION: REAL-TIME MARKET DEPTH",
        desc: "Automated financial analytics platform processing stock market indicators, IPO performance, candlestick charts, and database indexing.",
        tech: ["Python", "MySQL", "Pandas", "REST APIs"],
        demo: "https://github.com/harshgawde12112005-boop",
        github: "https://github.com/harshgawde12112005-boop",
        render: renderBlueStockClip
    }
];

// Project 0: BeanByte Coffee POS Clip Render
function renderBeanByteClip(ctx, w, h, t) {
    // Cafe Slate Background
    const bg = ctx.createLinearGradient(0, 0, w, h);
    bg.addColorStop(0, "#120a06");
    bg.addColorStop(1, "#22130c");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // Header Bar
    ctx.fillStyle = "rgba(255, 170, 0, 0.18)";
    ctx.fillRect(0, 0, w, h * 0.18);
    ctx.fillStyle = "#ffaa00";
    ctx.font = `bold ${Math.max(10, h * 0.08)}px 'Chakra Petch', sans-serif`;
    ctx.fillText("☕ BEANBYTE POS v2.4", 12, h * 0.12);

    ctx.fillStyle = "#00f0ff";
    ctx.font = `${Math.max(8, h * 0.07)}px monospace`;
    ctx.fillText("STATUS: ONLINE", w - (w > 300 ? 110 : 80), h * 0.12);

    // Left Side: Animated Coffee Cup with Steam
    const cupX = w * 0.22;
    const cupY = h * 0.58;
    const cupW = w * 0.18;
    const cupH = h * 0.32;

    // Coffee Cup Saucer
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.ellipse(cupX + cupW / 2, cupY + cupH + 4, cupW * 0.75, cupH * 0.15, 0, 0, Math.PI * 2);
    ctx.fill();

    // Coffee Cup Body
    ctx.fillStyle = "#f5f5f5";
    ctx.beginPath();
    ctx.moveTo(cupX, cupY);
    ctx.lineTo(cupX + cupW * 0.12, cupY + cupH);
    ctx.quadraticCurveTo(cupX + cupW * 0.5, cupY + cupH + 8, cupX + cupW * 0.88, cupY + cupH);
    ctx.lineTo(cupX + cupW, cupY);
    ctx.closePath();
    ctx.fill();

    // Coffee Cup Handle
    ctx.strokeStyle = "#f5f5f5";
    ctx.lineWidth = Math.max(2, w * 0.015);
    ctx.beginPath();
    ctx.arc(cupX + cupW + 4, cupY + cupH * 0.45, cupH * 0.25, -Math.PI / 2, Math.PI / 2);
    ctx.stroke();

    // Animated Coffee Liquid Filling Up
    const fillLevel = (Math.sin(t * 1.8) * 0.5 + 0.5); // 0.0 to 1.0
    const liquidY = cupY + 6 + (1 - fillLevel) * (cupH * 0.7);
    ctx.fillStyle = "#542f17";
    ctx.beginPath();
    ctx.ellipse(cupX + cupW / 2, liquidY, cupW * 0.38, cupH * 0.12, 0, 0, Math.PI * 2);
    ctx.fill();

    // Rising Animated Steam Wisps
    ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 3; i++) {
        const sx = cupX + cupW * 0.28 + (i * cupW * 0.22);
        const sy = cupY - 5;
        const wave = Math.sin(t * 3 + i) * 6;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.quadraticCurveTo(sx + wave, sy - cupH * 0.35, sx - wave, sy - cupH * 0.7);
        ctx.stroke();
    }

    // Right Side: Live Digital POS Order Receipt
    const rcX = w * 0.45;
    const rcY = h * 0.25;
    const rcW = w * 0.50;
    const rcH = h * 0.65;

    ctx.fillStyle = "rgba(10, 16, 28, 0.9)";
    ctx.strokeStyle = "rgba(255, 170, 0, 0.4)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(rcX, rcY, rcW, rcH, 6);
    ctx.fill();
    ctx.stroke();

    // Ticket text
    ctx.fillStyle = "#ffaa00";
    ctx.font = `bold ${Math.max(8, h * 0.075)}px 'Chakra Petch', sans-serif`;
    ctx.fillText("ACTIVE ORDER #408", rcX + 8, rcY + h * 0.13);

    ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
    ctx.font = `${Math.max(7, h * 0.065)}px sans-serif`;
    ctx.fillText("1x Caramel Macchiato", rcX + 8, rcY + h * 0.25);
    ctx.fillText("1x Dark Cold Brew", rcX + 8, rcY + h * 0.35);

    // Total Pulse
    const isReady = (Math.sin(t * 2) > 0);
    ctx.fillStyle = isReady ? "#39ff14" : "#00f0ff";
    ctx.font = `bold ${Math.max(8, h * 0.08)}px 'Chakra Petch', sans-serif`;
    ctx.fillText("TOTAL: $14.50", rcX + 8, rcY + h * 0.50);

    // Status Pill
    ctx.fillStyle = isReady ? "rgba(57, 255, 20, 0.2)" : "rgba(0, 240, 255, 0.2)";
    ctx.strokeStyle = isReady ? "#39ff14" : "#00f0ff";
    ctx.beginPath();
    ctx.roundRect(rcX + 8, rcY + h * 0.53, rcW - 16, h * 0.11, 4);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = isReady ? "#39ff14" : "#00f0ff";
    ctx.font = `bold ${Math.max(7, h * 0.065)}px monospace`;
    ctx.fillText(isReady ? "READY FOR PICKUP ✓" : "BREWING ESPRESSO...", rcX + 12, rcY + h * 0.60);
}

// Project 1: Portfolio VI Radar Telemetry Clip Render
function renderPortfolioClip(ctx, w, h, t) {
    // Deep Vice City Grid Background
    ctx.fillStyle = "#050914";
    ctx.fillRect(0, 0, w, h);

    // Perspective wireframe floor lines
    ctx.strokeStyle = "rgba(255, 0, 127, 0.15)";
    ctx.lineWidth = 1;
    const horizon = h * 0.5;
    for (let x = 0; x <= w; x += w / 10) {
        ctx.beginPath();
        ctx.moveTo(w / 2, horizon);
        ctx.lineTo(x, h);
        ctx.stroke();
    }
    for (let y = horizon; y <= h; y += (h - horizon) / 6) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
    }

    // Circular Rotating Radar HUD
    const cx = w * 0.35;
    const cy = h * 0.52;
    const radius = Math.min(w, h) * 0.38;

    // Radar Rings
    ctx.strokeStyle = "rgba(0, 240, 255, 0.4)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 0.6, 0, Math.PI * 2);
    ctx.stroke();

    // Rotating Sweep Line
    const sweepAngle = (t * 2.5) % (Math.PI * 2);
    const sweepX = cx + Math.cos(sweepAngle) * radius;
    const sweepY = cy + Math.sin(sweepAngle) * radius;

    const sweepGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    sweepGrad.addColorStop(0, "rgba(0, 240, 255, 0.4)");
    sweepGrad.addColorStop(1, "transparent");
    ctx.fillStyle = sweepGrad;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, sweepAngle - 0.45, sweepAngle);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = "#00f0ff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(sweepX, sweepY);
    ctx.stroke();

    // Center Player Blip
    ctx.fillStyle = "#ff007f";
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fill();

    // Right Side: Live GTA VI HUD Telemetry
    const tx = w * 0.65;
    ctx.fillStyle = "#39ff14";
    ctx.font = `bold ${Math.max(10, h * 0.11)}px 'Bebas Neue', sans-serif`;
    ctx.fillText("$1,875,659", tx, h * 0.30);

    // Flashing Wanted Stars
    ctx.fillStyle = "#f5c400";
    ctx.font = `bold ${Math.max(10, h * 0.09)}px monospace`;
    const starCount = 3 + Math.floor(Math.sin(t * 3) + 1);
    let starsStr = "";
    for (let s = 0; s < 5; s++) starsStr += (s < starCount) ? "★" : "☆";
    ctx.fillText(starsStr, tx, h * 0.48);

    ctx.fillStyle = "#00f0ff";
    ctx.font = `bold ${Math.max(8, h * 0.07)}px 'Chakra Petch', sans-serif`;
    ctx.fillText("VICE CITY GPS", tx, h * 0.64);
    ctx.fillText("FREQ 104.9 FM", tx, h * 0.76);
}

// Project 2: AI Landslide Detection Geospatial Scan Clip
function renderLandslideClip(ctx, w, h, t) {
    // Geospatial Radar Slate
    ctx.fillStyle = "#04140d";
    ctx.fillRect(0, 0, w, h);

    // Topographic Elevation Contour Lines
    ctx.strokeStyle = "rgba(0, 230, 118, 0.25)";
    ctx.lineWidth = 1.2;
    for (let c = 1; c <= 5; c++) {
        ctx.beginPath();
        const r = c * (Math.min(w, h) * 0.12);
        for (let a = 0; a <= Math.PI * 2; a += 0.2) {
            const distort = Math.sin(a * 4 + c) * 8 + Math.cos(a * 2) * 5;
            const px = w * 0.42 + Math.cos(a) * (r + distort);
            const py = h * 0.52 + Math.sin(a) * (r + distort);
            if (a === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
    }

    // Moving Vertical Laser Radar Scan Bar
    const scanX = ((t * 120) % (w + 40)) - 20;
    const scanGrad = ctx.createLinearGradient(scanX - 25, 0, scanX + 5, 0);
    scanGrad.addColorStop(0, "transparent");
    scanGrad.addColorStop(1, "rgba(0, 255, 200, 0.35)");
    ctx.fillStyle = scanGrad;
    ctx.fillRect(scanX - 25, 0, 30, h);

    ctx.strokeStyle = "#00ffc8";
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(scanX, 0);
    ctx.lineTo(scanX, h);
    ctx.stroke();

    // AI Hazard Bounding Box with Red Alert Pulse
    const alertPulse = Math.sin(t * 6) > 0;
    const boxX = w * 0.40;
    const boxY = h * 0.32;
    const boxW = w * 0.35;
    const boxH = h * 0.38;

    ctx.strokeStyle = alertPulse ? "#ff1744" : "rgba(255, 23, 68, 0.5)";
    ctx.lineWidth = 1.8;
    ctx.strokeRect(boxX, boxY, boxW, boxH);

    // Corner crosshairs on bounding box
    const chLen = 6;
    ctx.beginPath();
    ctx.moveTo(boxX - chLen, boxY); ctx.lineTo(boxX + chLen, boxY);
    ctx.moveTo(boxX, boxY - chLen); ctx.lineTo(boxX, boxY + chLen);
    ctx.stroke();

    // Hazard Tag
    ctx.fillStyle = "#ff1744";
    ctx.font = `bold ${Math.max(7, h * 0.07)}px monospace`;
    ctx.fillText("HAZARD: 96.4% [CRITICAL]", boxX, boxY - 4);

    // Seismic Waveform Telemetry at Bottom
    ctx.strokeStyle = "#00e676";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let x = 0; x < w; x += 4) {
        const sy = h * 0.88 + Math.sin(x * 0.06 + t * 8) * (x > boxX && x < boxX + boxW ? 8 : 2);
        if (x === 0) ctx.moveTo(x, sy);
        else ctx.lineTo(x, sy);
    }
    ctx.stroke();

    ctx.fillStyle = "#00e676";
    ctx.font = `${Math.max(7, h * 0.06)}px monospace`;
    ctx.fillText("LAT 22.7196° N | LON 75.8577° E", 10, h * 0.14);
}

// Project 3: BlueStock Financial Analytics Candlestick Clip Render
function renderBlueStockClip(ctx, w, h, t) {
    // Dark Fintech Slate
    ctx.fillStyle = "#070e1a";
    ctx.fillRect(0, 0, w, h);

    // Ticker Marquee Bar at Top
    ctx.fillStyle = "rgba(0, 240, 255, 0.12)";
    ctx.fillRect(0, 0, w, h * 0.16);

    const tickerOffset = (t * 40) % 200;
    ctx.fillStyle = "#00e676";
    ctx.font = `bold ${Math.max(8, h * 0.075)}px monospace`;
    ctx.fillText("BLCK $438.20 ▲ +5.8%    NIFTY 24,912 ▲ +1.2%    TCS $4,120 ▲", 10 - tickerOffset, h * 0.11);

    // Candlestick Chart Area
    const chartY = h * 0.22;
    const chartH = h * 0.58;
    const numCandles = 14;
    const candleW = Math.max(4, (w * 0.8) / numCandles * 0.55);
    const gap = (w * 0.8) / numCandles;
    const startX = w * 0.08;

    // Grid lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
    ctx.lineWidth = 1;
    for (let g = 0; g < 4; g++) {
        const gy = chartY + (g * chartH / 3);
        ctx.beginPath();
        ctx.moveTo(startX, gy);
        ctx.lineTo(w * 0.95, gy);
        ctx.stroke();
    }

    // Moving EMA line points
    const emaPts = [];

    for (let i = 0; i < numCandles; i++) {
        const cx = startX + (i * gap);
        // Deterministic wave pattern + live bounce on last candle
        const base = Math.sin(i * 0.45 + 0.5) * (chartH * 0.28) + (chartH * 0.5);
        const liveBounce = (i === numCandles - 1) ? Math.sin(t * 8) * 8 : 0;
        const cy = chartY + base + liveBounce;
        const isBullish = (i % 3 !== 0);

        const open = cy;
        const close = cy + (isBullish ? -12 : 10);
        const high = Math.min(open, close) - (4 + Math.sin(i) * 6);
        const low = Math.max(open, close) + (4 + Math.cos(i) * 6);

        // Wick
        ctx.strokeStyle = isBullish ? "#00e676" : "#ff1744";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx, high);
        ctx.lineTo(cx, low);
        ctx.stroke();

        // Body
        ctx.fillStyle = isBullish ? "#00e676" : "#ff1744";
        ctx.fillRect(cx - candleW / 2, Math.min(open, close), candleW, Math.abs(close - open) || 2);

        emaPts.push({ x: cx, y: (open + close) / 2 });
    }

    // Exponential Moving Average Curve
    ctx.strokeStyle = "rgba(0, 240, 255, 0.85)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    if (emaPts.length > 0) {
        ctx.moveTo(emaPts[0].x, emaPts[0].y);
        for (let p = 1; p < emaPts.length; p++) {
            ctx.lineTo(emaPts[p].x, emaPts[p].y);
        }
    }
    ctx.stroke();

    // Volume histogram bars at bottom
    for (let i = 0; i < numCandles; i++) {
        const cx = startX + (i * gap);
        const vH = (Math.sin(i * 1.5 + t * 2) * 0.5 + 0.5) * (h * 0.12) + 4;
        ctx.fillStyle = (i % 3 !== 0) ? "rgba(0, 230, 118, 0.4)" : "rgba(255, 23, 68, 0.4)";
        ctx.fillRect(cx - candleW / 2, h * 0.94 - vH, candleW, vH);
    }
}

// Master Project Clips Manager
class ProjectVideoClipsEngine {
    constructor() {
        this.time = 0;
        this.clipCanvases = [
            { id: 0, el: document.getElementById("canvasClipBeanByte"), modalEl: document.getElementById("canvasModalClipBeanByte"), fn: renderBeanByteClip },
            { id: 1, el: document.getElementById("canvasClipPortfolio"), modalEl: document.getElementById("canvasModalClipPortfolio"), fn: renderPortfolioClip },
            { id: 2, el: document.getElementById("canvasClipLandslide"), modalEl: document.getElementById("canvasModalClipLandslide"), fn: renderLandslideClip },
            { id: 3, el: document.getElementById("canvasClipBlueStock"), modalEl: document.getElementById("canvasModalClipBlueStock"), fn: renderBlueStockClip }
        ];
        this.theaterCanvas = document.getElementById("theaterVideoCanvas");
        this.theaterCtx = this.theaterCanvas ? this.theaterCanvas.getContext("2d") : null;
        this.theaterActiveIndex = 0;
        this.theaterIsPlaying = true;
        this.theaterTime = 0;

        this.init();
    }

    init() {
        this.animate = this.animate.bind(this);
        requestAnimationFrame(this.animate);
    }

    animate() {
        this.time += 0.016;

        // Render mini clips on Screen 3 & Project Modal
        for (const item of this.clipCanvases) {
            if (item.el) {
                const ctx = item.el.getContext("2d");
                if (ctx) item.fn(ctx, item.el.width, item.el.height, this.time);
            }
            if (item.modalEl) {
                const mCtx = item.modalEl.getContext("2d");
                if (mCtx) item.fn(mCtx, item.modalEl.width, item.modalEl.height, this.time);
            }
        }

        // Render Theater Video Canvas if open
        if (window.isTheaterModalOpen && this.theaterCtx) {
            if (this.theaterIsPlaying) this.theaterTime += 0.016;
            const project = PROJECT_CLIPS_DATA[this.theaterActiveIndex];
            if (project) {
                project.render(this.theaterCtx, this.theaterCanvas.width, this.theaterCanvas.height, this.theaterTime);

                // Update theater progress bar & timecode
                const totalSec = 45;
                const currSec = Math.floor(this.theaterTime % totalSec);
                const progressPct = ((this.theaterTime % totalSec) / totalSec) * 100;
                const fillEl = document.getElementById("theaterProgressFill");
                if (fillEl) fillEl.style.width = progressPct + "%";

                const tcEl = document.getElementById("theaterTimecode");
                if (tcEl) {
                    const mm = String(Math.floor(currSec / 60)).padStart(2, "0");
                    const ss = String(currSec % 60).padStart(2, "0");
                    const ff = String(Math.floor((this.theaterTime * 60) % 60)).padStart(2, "0");
                    tcEl.textContent = `00:${mm}:${ss}:${ff}`;
                }
            }
        }

        requestAnimationFrame(this.animate);
    }
}


// ========================================================
// 9. THEATER VIDEO CLIP MODAL INTERACTION
// ========================================================
window.isTheaterModalOpen = false;

window.openProjectClipModal = function(index) {
    const project = PROJECT_CLIPS_DATA[index];
    if (!project) return;

    window.isTheaterModalOpen = true;
    if (window.projectClipsEngine) {
        window.projectClipsEngine.theaterActiveIndex = index;
        window.projectClipsEngine.theaterTime = 0;
        window.projectClipsEngine.theaterIsPlaying = true;
    }

    // Populate modal metadata
    const titleEl = document.getElementById("theaterTitle");
    const descEl = document.getElementById("theaterDesc");
    const tagEl = document.getElementById("theaterMissionTag");
    const stackEl = document.getElementById("theaterTechStack");
    const demoBtn = document.getElementById("theaterDemoBtn");
    const codeBtn = document.getElementById("theaterCodeBtn");

    if (titleEl) titleEl.textContent = project.title;
    if (descEl) descEl.textContent = project.desc;
    if (tagEl) tagEl.textContent = project.tag;

    if (stackEl) {
        stackEl.innerHTML = project.tech.map(t => `<span>${t}</span>`).join("");
    }
    if (demoBtn) {
        demoBtn.href = project.demo;
        demoBtn.style.display = project.demo === "#" ? "none" : "inline-flex";
    }
    if (codeBtn) {
        codeBtn.href = project.github;
    }

    const overlay = document.getElementById("projectClipModal");
    if (overlay) {
        overlay.classList.add("active");
        if (window.radio) window.radio.playSelectSound();
    }
};

window.closeProjectClipModal = function() {
    window.isTheaterModalOpen = false;
    const overlay = document.getElementById("projectClipModal");
    if (overlay) overlay.classList.remove("active");
};

window.closeProjectClipModalOnOutside = function(e) {
    if (e.target.id === "projectClipModal") {
        window.closeProjectClipModal();
    }
};

window.toggleTheaterPlayback = function() {
    if (!window.projectClipsEngine) return;
    window.projectClipsEngine.theaterIsPlaying = !window.projectClipsEngine.theaterIsPlaying;
    const icon = document.getElementById("theaterPlayIcon");
    if (icon) {
        icon.className = window.projectClipsEngine.theaterIsPlaying ? "fa-solid fa-pause" : "fa-solid fa-play";
    }
};

window.scrubTheaterProgress = function(e) {
    const track = document.getElementById("theaterProgressTrack");
    if (!track || !window.projectClipsEngine) return;
    const rect = track.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    window.projectClipsEngine.theaterTime = pct * 45;
};


// ========================================================
// 10. CINEMATIC VIDEO REEL TRAILER DIRECTOR
// ========================================================
window.isReelModalOpen = false;

class CinematicReelDirector {
    constructor() {
        this.overlay = document.getElementById("cinematicReelOverlay");
        this.canvas = document.getElementById("reelCinemaCanvas");
        this.ctx = this.canvas ? this.canvas.getContext("2d") : null;
        this.isPlaying = true;
        this.currentClipIndex = 0;
        this.totalClips = 9;
        this.clipDuration = 6.0; // 6 seconds per scene cut
        this.timeInClip = 0;
        this.totalElapsedTime = 0;
        this.zoomProgress = 1.0;
        this.loadedImages = {};
        this.preloadScreens();

        this.animate = this.animate.bind(this);
    }

    preloadScreens() {
        const bgMap = {
            0: "assets/char_boardwalk.jpg",
            1: "assets/char_palace.jpg",
            2: "assets/bg_rooftop.jpg",
            3: "assets/char_poolside.jpg",
            4: "assets/char_mountain.jpg",
            5: "assets/char_cars_night.jpg",
            6: "assets/bg_morning.jpg",
            7: "assets/char_cars_night.jpg",
            8: "assets/bg_sunset.jpg"
        };

        for (const [idx, path] of Object.entries(bgMap)) {
            const img = new Image();
            img.src = path;
            this.loadedImages[idx] = img;
        }
    }

    open() {
        window.isReelModalOpen = true;
        if (this.overlay) this.overlay.classList.add("active");
        this.currentClipIndex = currentScreen || 0;
        this.timeInClip = 0;
        this.isPlaying = true;
        this.updateSceneStamp();

        // Start Synthwave Audio for authentic soundtrack experience
        if (window.radio && !window.radio.isPlaying) {
            window.radio.start();
        }

        requestAnimationFrame(this.animate);
    }

    close() {
        window.isReelModalOpen = false;
        if (this.overlay) this.overlay.classList.remove("active");
    }

    setClip(index) {
        this.currentClipIndex = ((index % this.totalClips) + this.totalClips) % this.totalClips;
        this.timeInClip = 0;
        this.updateSceneStamp();
        if (window.radio) window.radio.playMetallicTick();

        // Synchronize main portfolio background as well
        if (typeof window.jumpToScreen === "function") {
            window.jumpToScreen(this.currentClipIndex, false);
        }
    }

    nextClip() {
        this.setClip(this.currentClipIndex + 1);
    }

    prevClip() {
        this.setClip(this.currentClipIndex - 1);
    }

    togglePlay() {
        this.isPlaying = !this.isPlaying;
        const icon = document.getElementById("reelPlayIcon");
        if (icon) {
            icon.className = this.isPlaying ? "fa-solid fa-pause" : "fa-solid fa-play";
        }
    }

    updateSceneStamp() {
        const district = MAP_DISTRICTS[this.currentClipIndex] || {
            title: "SUNRISE FINISH",
            sub: "MISSION 08: COMPLETE"
        };
        const obj = SCREEN_OBJECTIVES[this.currentClipIndex] || { text: "RIDE OFF INTO THE SUNRISE" };

        const numEl = document.getElementById("stampSceneNum");
        const titleEl = document.getElementById("stampTitle");
        const objEl = document.getElementById("stampObjective");

        if (numEl) numEl.textContent = `SCENE 0${this.currentClipIndex + 1} / 09`;
        if (titleEl) titleEl.textContent = district.title;
        if (objEl) objEl.textContent = district.sub + " — " + obj.text;

        // Update waypoint dots in timeline
        const dots = document.querySelectorAll(".sc-dot");
        dots.forEach((d, idx) => {
            if (idx === this.currentClipIndex) d.classList.add("active");
            else d.classList.remove("active");
        });
    }

    animate() {
        if (!window.isReelModalOpen) return;

        if (this.isPlaying) {
            this.timeInClip += 0.016;
            this.totalElapsedTime += 0.016;

            if (this.timeInClip >= this.clipDuration) {
                this.nextClip();
            }
        }

        // Draw active screen in 2.39:1 Cinematic Ratio with Ken-Burns Camera Push
        if (this.ctx && this.canvas) {
            const w = this.canvas.width;
            const h = this.canvas.height;
            this.ctx.clearRect(0, 0, w, h);

            const img = this.loadedImages[this.currentClipIndex];
            if (img && img.complete && img.naturalWidth > 0) {
                // Smooth Ken-Burns camera zoom
                const zoomProgress = (this.timeInClip / this.clipDuration);
                const scale = 1.0 + (zoomProgress * 0.08);
                const panX = Math.sin(zoomProgress * Math.PI) * 15;

                this.ctx.save();
                this.ctx.translate(w / 2, h / 2);
                this.ctx.scale(scale, scale);
                this.ctx.drawImage(img, -w / 2 + panX, -h / 2, w, h);
                this.ctx.restore();
            }

            // Cinematic color grading & vignette
            const grad = this.ctx.createRadialGradient(w / 2, h / 2, h * 0.3, w / 2, h / 2, h * 0.85);
            grad.addColorStop(0, "rgba(0,0,0,0)");
            grad.addColorStop(1, "rgba(0,0,0,0.65)");
            this.ctx.fillStyle = grad;
            this.ctx.fillRect(0, 0, w, h);
        }

        // Update Scrub Progress Bar
        const fillEl = document.getElementById("reelScrubFill");
        if (fillEl) {
            const pct = ((this.currentClipIndex + (this.timeInClip / this.clipDuration)) / this.totalClips) * 100;
            fillEl.style.width = pct + "%";
        }

        // Update Playback Timecode
        const tcEl = document.getElementById("reelPlaybackTc");
        if (tcEl) {
            const curSec = Math.floor((this.currentClipIndex * this.clipDuration) + this.timeInClip);
            const totalSec = Math.floor(this.totalClips * this.clipDuration);
            const cM = String(Math.floor(curSec / 60)).padStart(2, "0");
            const cS = String(curSec % 60).padStart(2, "0");
            const tM = String(Math.floor(totalSec / 60)).padStart(2, "0");
            const tS = String(totalSec % 60).padStart(2, "0");
            tcEl.textContent = `${cM}:${cS} / ${tM}:${tS}`;
        }

        requestAnimationFrame(this.animate);
    }
}

// Global Reel Controls
window.openCinematicReel = function() {
    if (window.reelDirector) window.reelDirector.open();
};

window.closeCinematicReel = function() {
    if (window.reelDirector) window.reelDirector.close();
};

window.toggleReelAutoplay = function() {
    if (window.reelDirector) window.reelDirector.togglePlay();
};

window.reelNextClip = function() {
    if (window.reelDirector) window.reelDirector.nextClip();
};

window.reelPrevClip = function() {
    if (window.reelDirector) window.reelDirector.prevClip();
};

window.seekReel = function(e) {
    const track = document.getElementById("reelScrubTrack");
    if (!track || !window.reelDirector) return;
    const rect = track.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    const targetClip = Math.floor(pct * window.reelDirector.totalClips);
    window.reelDirector.setClip(targetClip);
};


// ========================================================
// 11. GLOBAL INITIALIZATION
// ========================================================
document.addEventListener("DOMContentLoaded", () => {
    setupMainMenu();
    setupWeaponWheelSlots();
    setupGlobalControls();
    initClock();
    initCountdown();

    // Initialize Video & Atmospheric Engines
    window.atmosphericEngine = new AtmosphericVideoEngine();
    window.projectClipsEngine = new ProjectVideoClipsEngine();
    window.reelDirector = new CinematicReelDirector();

    // Set initial objective
    const initObj = SCREEN_OBJECTIVES[0];
    const objEl = document.getElementById("reelObjectiveText");
    const labelEl = document.getElementById("reelObjectiveLabel");
    if (objEl) {
        objEl.textContent = initObj.text;
        objEl.style.color = initObj.color;
    }
    if (labelEl) {
        labelEl.style.color = initObj.color;
    }

    console.log("🎬 GTA VI Cinematic Moving Video Clips & Living World Engine Initialized!");
});
