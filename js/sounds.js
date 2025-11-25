// Sound Effects System for NoctuaBot
class SoundSystem {
    constructor() {
        this.audioContext = null;
        this.enabled = localStorage.getItem('soundEnabled') !== 'false';
        this.initAudioContext();
    }

    initAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('Web Audio API not supported');
        }
    }

    toggle() {
        this.enabled = !this.enabled;
        localStorage.setItem('soundEnabled', this.enabled);
        return this.enabled;
    }

    playTone(frequency, duration, type = 'sine') {
        if (!this.enabled || !this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = type;

        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }

    // Message send sound
    messageSent() {
        this.playTone(800, 0.1);
        setTimeout(() => this.playTone(1000, 0.1), 50);
    }

    // Message received sound
    messageReceived() {
        this.playTone(600, 0.15);
    }

    // Notification sound
    notification() {
        this.playTone(880, 0.1);
        setTimeout(() => this.playTone(1046, 0.1), 100);
        setTimeout(() => this.playTone(1318, 0.15), 200);
    }

    // Click sound
    click() {
        this.playTone(1200, 0.05, 'square');
    }

    // Success sound
    success() {
        this.playTone(523, 0.1);
        setTimeout(() => this.playTone(659, 0.1), 100);
        setTimeout(() => this.playTone(784, 0.2), 200);
    }
}

// Export for use in other scripts
window.SoundSystem = SoundSystem;
