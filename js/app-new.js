// NoctuaBot - App Logic
class NoctuaApp {
    constructor() {
        this.currentView = 'home';
        this.conversations = [];
        this.currentConversation = null;

        this.init();
    }

    init() {
        // Get DOM elements
        this.homeView = document.getElementById('homeView');
        this.chatView = document.getElementById('chatView');
        this.messagesContainer = document.getElementById('messagesContainer');
        this.messageInput = document.getElementById('messageInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.micBtn = document.getElementById('micBtn');
        this.backBtn = document.getElementById('backBtn');

        // Event listeners
        this.setupEventListeners();

        // Load sample conversation
        this.loadSampleConversation();
    }

    setupEventListeners() {
        // Action cards
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', () => {
                const action = card.dataset.action;
                this.openChat(action);
            });
        });

        // History items
        document.querySelectorAll('.history-item').forEach(item => {
            item.addEventListener('click', () => {
                const id = item.dataset.id;
                this.openHistoryChat(id);
            });
        });

        // Back button
        if (this.backBtn) {
            this.backBtn.addEventListener('click', () => {
                this.showView('home');
            });
        }

        // Send message
        if (this.sendBtn) {
            this.sendBtn.addEventListener('click', () => {
                this.sendMessage();
            });
        }

        // Enter key to send
        if (this.messageInput) {
            this.messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }

        // Mic button
        if (this.micBtn) {
            this.micBtn.addEventListener('click', () => {
                this.toggleVoiceInput();
            });
        }
    }

    showView(viewName) {
        // Hide all views
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active', 'slide-left');
        });

        // Show requested view
        if (viewName === 'home') {
            this.homeView.classList.add('active');
            this.currentView = 'home';
        } else if (viewName === 'chat') {
            this.chatView.classList.add('active');
            this.currentView = 'chat';
        }
    }

    openChat(action) {
        this.currentConversation = {
            type: action,
            messages: []
        };

        this.showView('chat');
    }

    openHistoryChat(id) {
        // Load conversation from history
        this.showView('chat');
    }

    sendMessage() {
        const text = this.messageInput.value.trim();
        if (!text) return;

        // Add user message
        this.addMessage('user', text);

        // Clear input
        this.messageInput.value = '';

        // Simulate bot response
        setTimeout(() => {
            this.addBotResponse(text);
        }, 1000);
    }

    addMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;

        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        bubble.textContent = text;

        messageDiv.appendChild(bubble);

        // Add actions for bot messages
        if (sender === 'bot') {
            const actions = document.createElement('div');
            actions.className = 'message-actions';
            actions.innerHTML = `
                <button class="action-btn" title="Copy">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                </button>
                <button class="action-btn" title="Like">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                    </svg>
                </button>
                <button class="action-btn" title="Speak">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                    </svg>
                </button>
                <button class="action-btn" title="Refresh">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="23 4 23 10 17 10"></polyline>
                        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                    </svg>
                </button>
            `;
            messageDiv.appendChild(actions);

            // Add suggestion chips for first message
            if (this.messagesContainer.children.length === 0) {
                const suggestions = document.createElement('div');
                suggestions.className = 'suggestion-chips';
                suggestions.innerHTML = `
                    <button class="chip">Tell me more about it please</button>
                `;
                messageDiv.appendChild(suggestions);

                // Add click handler for chip
                suggestions.querySelector('.chip').addEventListener('click', (e) => {
                    this.messageInput.value = e.target.textContent;
                    this.sendMessage();
                });
            }
        }

        this.messagesContainer.appendChild(messageDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    addBotResponse(userMessage) {
        const responses = [
            "Describe to me the basic principles of healthy eating. Healthy eating involves consuming a balanced diet that includes a variety of nutrient-dense foods from all food groups, such as fruits, vegetables, whole grains, lean proteins, and healthy fats. It's important to limit processed foods, added sugars, and excessive salt intake.",
            "Basic principles of a healthy diet: Make sure your diet includes plenty of fruits and vegetables, whole grains, lean proteins, and healthy fats. Focus on portion control and micronutrients in the correct proportions, carbohydrates, proteins, fats, vitamins, and minerals. It is important to maintain a balance of calories to meet your body's needs, but not exceed.",
            "I'd be happy to help you with that! What specific aspect would you like to know more about?"
        ];

        const response = responses[Math.floor(Math.random() * responses.length)];
        this.addMessage('bot', response);
    }

    toggleVoiceInput() {
        // Voice input functionality
        console.log('Voice input toggled');
        // TODO: Implement Web Speech API
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new NoctuaApp();
});
