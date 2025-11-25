// Welcome Screen Handler
class WelcomeScreen {
    constructor() {
        this.welcomeScreen = document.getElementById('welcomeScreen');
        this.getStartedBtn = document.getElementById('getStartedBtn');
        this.chatWidget = document.getElementById('chatWidget');

        this.init();
    }

    init() {
        // Check if user has seen welcome screen before
        const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');

        if (hasSeenWelcome) {
            this.hideWelcome();
        } else {
            this.showWelcome();
        }

        // Get Started button click
        if (this.getStartedBtn) {
            this.getStartedBtn.addEventListener('click', () => {
                this.onGetStarted();
            });
        }
    }

    showWelcome() {
        if (this.welcomeScreen) {
            this.welcomeScreen.classList.remove('hidden');
        }
        if (this.chatWidget) {
            this.chatWidget.classList.add('hidden');
        }
    }

    hideWelcome() {
        if (this.welcomeScreen) {
            this.welcomeScreen.classList.add('hidden');
        }
        if (this.chatWidget) {
            this.chatWidget.classList.remove('hidden');
        }
    }

    onGetStarted() {
        // Mark as seen
        localStorage.setItem('hasSeenWelcome', 'true');

        // Fade out welcome screen
        if (this.welcomeScreen) {
            this.welcomeScreen.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                this.hideWelcome();
            }, 300);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new WelcomeScreen();
});
