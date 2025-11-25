// NoctuaBot - Main Chatbot Logic
class NoctuaBot {
    constructor() {
        this.chatBody = document.getElementById('chatBody');
        this.messageInput = document.getElementById('messageInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.typingIndicator = document.getElementById('typingIndicator');
        this.quickActions = document.querySelectorAll('.quick-btn');
        this.soundToggle = document.getElementById('soundToggle');
        this.minimizeBtn = document.getElementById('minimizeBtn');
        this.chatWidget = document.getElementById('chatWidget');
        this.chatToggle = document.getElementById('chatToggle');

        // Initialize sound system
        this.soundSystem = new SoundSystem();

        this.init();
    }

    init() {
        // Send message on button click
        this.sendBtn.addEventListener('click', () => this.sendMessage());

        // Send message on Enter key
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // Quick actions
        this.quickActions.forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                this.soundSystem.click();
                this.handleQuickAction(action);
            });
        });

        // Sound toggle
        if (this.soundToggle) {
            this.soundToggle.addEventListener('click', () => this.toggleSound());
        }

        // Minimize/maximize
        this.minimizeBtn.addEventListener('click', () => this.toggleMinimize());
        this.chatToggle.addEventListener('click', () => this.toggleMinimize());
    }

    sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message) return;

        // Play send sound
        this.soundSystem.messageSent();

        // Check for easter eggs first
        if (this.handleEasterEgg(message)) {
            this.messageInput.value = '';
            return;
        }

        // Add user message
        this.addMessage(message, 'user');
        this.messageInput.value = '';

        // Show typing indicator
        this.showTyping();

        // Get response
        setTimeout(() => {
            this.hideTyping();
            this.soundSystem.messageReceived();
            const response = findResponse(message);

            if (response.action) {
                this.handleAction(response.action);
            } else if (response.text) {
                this.addMessage(response.text, 'bot');
            }
        }, 1000 + Math.random() * 1000);
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.className = 'message-avatar';

        if (sender === 'bot') {
            avatar.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4C10 4 8.5 5 8.5 7.5C8.5 10 12 13 12 13C12 13 15.5 10 15.5 7.5C15.5 5 14 4 12 4Z"></path><path d="M10.5 7.5L10.5 8"></path><path d="M13.5 7.5L13.5 8"></path><path d="M8.5 7.5C6 9 5 14 7 18C9 21 15 21 17 18C19 14 18 9 15.5 7.5"></path><path d="M15.5 7.5C15.5 7.5 16 12 14 16"></path></svg>`;
        } else {
            avatar.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`;
        }

        const content = document.createElement('div');
        content.className = 'message-content';

        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        bubble.innerHTML = text;

        const time = document.createElement('span');
        time.className = 'message-time';
        time.textContent = new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });

        content.appendChild(bubble);
        content.appendChild(time);
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);

        this.chatBody.appendChild(messageDiv);
        this.scrollToBottom();
    }

    handleQuickAction(action) {
        this.handleAction(action);
    }

    handleAction(action) {
        switch (action) {
            case 'projects':
            case 'showProjects':
                this.showProjects();
                break;
            case 'skills':
            case 'showSkills':
                this.showSkills();
                break;
            case 'contact':
            case 'showContact':
                this.showContact();
                break;
            case 'github':
            case 'showGitHub':
                this.showGitHub();
                break;
        }
    }

    showProjects() {
        let html = `<p><strong>Here are Alana's featured projects:</strong></p>`;

        portfolioData.projects.forEach(project => {
            html += `
                <div class="project-card">
                    <div class="project-title">${project.name}</div>
                    <p style="font-size: 13px; margin-bottom: 12px;">${project.description}</p>
                    <div class="project-tech">
                        ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        ${project.demo ? `<a href="${project.demo}" target="_blank" class="project-link">🔗 Demo</a>` : ''}
                        <a href="${project.github}" target="_blank" class="project-link">💻 Code</a>
                    </div>
                </div>
            `;
        });

        this.addMessage(html, 'bot');
    }

    showSkills() {
        let html = `<p><strong>Alana's Technical Skills:</strong></p>`;

        for (const [skill, level] of Object.entries(portfolioData.skills)) {
            const bars = '█'.repeat(Math.floor(level / 10)) + '░'.repeat(10 - Math.floor(level / 10));
            html += `
                <div style="margin: 8px 0; font-family: 'JetBrains Mono', monospace; font-size: 12px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                        <span>${skill}</span>
                        <span style="color: var(--accent-primary);">${level}%</span>
                    </div>
                    <div style="color: var(--accent-primary);">${bars}</div>
                </div>
            `;
        }

        this.addMessage(html, 'bot');
    }

    showContact() {
        const html = `
            <p><strong>Let's connect!</strong></p>
            <p>📧 <strong>Email:</strong><br><a href="mailto:${portfolioData.contact.email}" style="color: var(--accent-primary);">${portfolioData.contact.email}</a></p>
            <p>💼 <strong>LinkedIn:</strong><br><a href="${portfolioData.contact.linkedin}" target="_blank" style="color: var(--accent-primary);">linkedin.com/in/noctuacoder</a></p>
            <p>🌐 <strong>Portfolio:</strong><br><a href="${portfolioData.contact.portfolio}" target="_blank" style="color: var(--accent-primary);">View Full Portfolio</a></p>
            <p style="margin-top: 12px; padding: 12px; background: rgba(0,255,255,0.1); border-radius: 8px; border-left: 3px solid var(--accent-primary);">
                💡 <strong>${portfolioData.availability}</strong>
            </p>
        `;

        this.addMessage(html, 'bot');
    }

    showGitHub() {
        const html = `
            <p><strong>GitHub Profile:</strong></p>
            <p>🐙 <a href="${portfolioData.contact.github}" target="_blank" style="color: var(--accent-primary); font-weight: 600;">@NoctuaCoder</a></p>
            <p>Check out the repositories:</p>
            <ul style="margin-left: 20px; line-height: 1.8;">
                <li>⭐ stellar-task-manager (React)</li>
                <li>⭐ noctua-command-center (Dashboard)</li>
                <li>⭐ matrix-owl (Terminal)</li>
                <li>⭐ stellar-dots (Dotfiles)</li>
            </ul>
            <p style="margin-top: 12px;">
                <a href="${portfolioData.contact.github}" target="_blank" class="project-link" style="display: inline-block; padding: 8px 16px; background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: 8px; text-decoration: none; color: var(--text-primary);">Visit GitHub →</a>
            </p>
        `;

        this.addMessage(html, 'bot');
    }

    showTyping() {
        this.typingIndicator.classList.remove('hidden');
        this.scrollToBottom();
    }

    hideTyping() {
        this.typingIndicator.classList.add('hidden');
    }

    scrollToBottom() {
        setTimeout(() => {
            this.chatBody.scrollTop = this.chatBody.scrollHeight;
        }, 100);
    }

    toggleSound() {
        const enabled = this.soundSystem.toggle();
        this.soundToggle.innerHTML = enabled ?
            `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="url(#icon-gradient)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>` :
            `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="url(#icon-gradient)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`;
        if (enabled) {
            this.soundSystem.success();
        }
    }

    toggleMinimize() {
        this.chatWidget.classList.toggle('hidden');
        this.chatToggle.classList.toggle('hidden');
        this.soundSystem.click();
    }

    handleEasterEgg(message) {
        const lower = message.toLowerCase();

        // Owl animation
        if (lower.includes('owl') || lower.includes('coruja')) {
            this.triggerOwlAnimation();
            this.addMessage('🦉 <strong>Hoot hoot!</strong> The owl awakens! ✨', 'bot');
            this.soundSystem.notification();
            return true;
        }

        // Color theme change
        if (lower.startsWith('color ') || lower.startsWith('cor ')) {
            const color = lower.split(' ')[1];
            this.changeAccentColor(color);
            return true;
        }

        // Time
        if (lower.includes('time') || lower.includes('hora')) {
            const now = new Date();
            const timeStr = now.toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            this.addMessage(`🕐 Current time: <strong>${timeStr}</strong>`, 'bot');
            return true;
        }

        return false;
    }

    triggerOwlAnimation() {
        const avatar = document.querySelector('.bot-avatar');
        avatar.style.animation = 'none';
        setTimeout(() => {
            avatar.style.animation = 'pulse 0.5s ease-in-out 3';
        }, 10);
    }

    changeAccentColor(color) {
        const colorMap = {
            'blue': '#0066ff',
            'azul': '#0066ff',
            'purple': '#8b5cf6',
            'roxo': '#8b5cf6',
            'pink': '#ec4899',
            'rosa': '#ec4899',
            'green': '#10b981',
            'verde': '#10b981',
            'cyan': '#06b6d4',
            'ciano': '#06b6d4'
        };

        if (colorMap[color]) {
            document.documentElement.style.setProperty('--primary-blue', colorMap[color]);
            this.addMessage(`✨ Accent color changed to <strong>${color}</strong>!`, 'bot');
            this.soundSystem.success();
        } else {
            this.addMessage(`❌ Color "${color}" not found. Try: blue, purple, pink, green, cyan`, 'bot');
        }
    }
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new NoctuaBot();
});
