/* ========================================
   MAIN CHATBOT LOGIC
   Handles UI interactions and message flow
   ======================================== */

class PortfolioChatbot {
    constructor() {
        this.messagesContainer = document.getElementById('messagesContainer');
        this.messageInput = document.getElementById('messageInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.micBtn = document.getElementById('micBtn');
        this.heroSection = document.getElementById('heroSection');
        this.suggestionChips = document.getElementById('suggestionChips');
        this.loadingIndicator = document.getElementById('loadingIndicator');

        this.isFirstMessage = true;
        this.isRecording = false;

        this.init();
    }

    init() {
        // Event listeners
        this.sendBtn.addEventListener('click', () => this.handleSend());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSend();
        });
        this.micBtn.addEventListener('click', () => this.toggleVoiceInput());

        // Quick action chips
        document.querySelectorAll('.action-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const message = chip.dataset.message;
                this.messageInput.value = message;
                this.handleSend();
            });
        });

        // Navigation items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                const command = item.dataset.command;
                this.messageInput.value = command;
                this.handleSend();

                // Update active state
                document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            });
        });

        // Download CV button
        document.getElementById('downloadCV')?.addEventListener('click', () => {
            this.addBotMessage("I don't have a downloadable CV yet, but you can view my portfolio and GitHub to see all my work! 📄");
        });

        // Sidebar toggle (mobile)
        const sidebarToggle = document.getElementById('sidebarToggle');
        const sidebar = document.getElementById('sidebar');
        sidebarToggle?.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });

        // Custom cursor
        this.initCustomCursor();

        // Initialize particles
        if (typeof initParticles === 'function') {
            initParticles();
        }
    }

    initCustomCursor() {
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');

        if (!cursorDot || !cursorOutline) return;

        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        // Smooth follow for outline
        const animateOutline = () => {
            outlineX += (mouseX - outlineX) * 0.2;
            outlineY += (mouseY - outlineY) * 0.2;

            cursorOutline.style.left = outlineX + 'px';
            cursorOutline.style.top = outlineY + 'px';

            requestAnimationFrame(animateOutline);
        };
        animateOutline();

        // Cursor interactions
        document.querySelectorAll('button, a, input').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.style.transform = 'scale(1.5)';
                cursorOutline.style.transform = 'scale(1.5)';
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.style.transform = 'scale(1)';
                cursorOutline.style.transform = 'scale(1)';
            });
        });
    }

    async handleSend() {
        const message = this.messageInput.value.trim();
        if (!message) return;

        // Hide hero on first message
        if (this.isFirstMessage) {
            this.heroSection.style.display = 'none';
            this.isFirstMessage = false;
        }

        // Add user message
        this.addUserMessage(message);
        this.messageInput.value = '';

        // Show loading
        this.showLoading();

        // Get response
        const response = await responseSystem.generateResponse(message);

        // Hide loading
        this.hideLoading();

        // Display response
        await this.displayResponse(response);

        // Scroll to bottom
        this.scrollToBottom();
    }

    addUserMessage(text) {
        const messageEl = this.createMessageElement(text, 'user');
        this.messagesContainer.appendChild(messageEl);
    }

    addBotMessage(text, isHTML = false) {
        const messageEl = this.createMessageElement(text, 'bot', isHTML);
        this.messagesContainer.appendChild(messageEl);
        return messageEl;
    }

    createMessageElement(text, type, isHTML = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        if (type === 'bot') {
            avatar.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6 L15 12 L12 18 L9 12 Z" fill="white"/>
                </svg>
            `;
        } else {
            avatar.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
            `;
        }

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';

        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';

        if (isHTML) {
            bubble.innerHTML = text;
        } else {
            bubble.textContent = text;
        }

        const time = document.createElement('div');
        time.className = 'message-time';
        time.textContent = new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });

        contentDiv.appendChild(bubble);
        contentDiv.appendChild(time);
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(contentDiv);

        return messageDiv;
    }

    async displayResponse(response) {
        if (!response) return;

        // Handle different response types
        switch (response.type) {
            case 'projects':
                await this.displayProjects();
                break;
            case 'project-detail':
                this.displayProjectDetail(response.project);
                break;
            case 'github-projects':
                this.displayGitHubProjects(response.projects, response.text);
                break;
            case 'skills':
                this.displaySkills();
                break;
            case 'github-stats':
                await this.displayGitHubStats();
                break;
            case 'contact':
                this.displayContact();
                break;
            default:
                this.addBotMessage(response.text);
        }

        // Show suggestions
        if (response.suggestions) {
            this.showSuggestions(response.suggestions);
        }
    }

    async displayProjects() {
        this.addBotMessage("Here are my featured projects:");

        for (const project of portfolioData.projects) {
            const projectHTML = `
                <div class="project-card">
                    <h4>${project.name}</h4>
                    <p>${project.description}</p>
                    <div class="project-tech">
                        ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    ${project.highlights ? `
                        <p style="font-size: 0.875rem; color: var(--text-tertiary); margin-bottom: var(--spacing-md);">
                            ✨ ${project.highlights.join(' • ')}
                        </p>
                    ` : ''}
                    <div class="project-links">
                        ${project.demo ? `
                            <a href="${project.demo}" target="_blank" class="project-link">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                    <polyline points="15 3 21 3 21 9"></polyline>
                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                </svg>
                                Live Demo
                            </a>
                        ` : ''}
                        <a href="${project.github}" target="_blank" class="project-link">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                            </svg>
                            GitHub
                        </a>
                    </div>
                </div>
            `;

            this.addBotMessage(projectHTML, true);
            await this.delay(200); // Stagger the display
        }
    }

    displayProjectDetail(project) {
        const projectHTML = `
            <div class="project-card">
                <h4>${project.name}</h4>
                <p>${project.description}</p>
                <div class="project-tech">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                ${project.highlights ? `
                    <div style="margin: var(--spacing-md) 0;">
                        <strong style="color: var(--text-primary);">Key Features:</strong>
                        <ul style="margin-top: var(--spacing-xs); padding-left: var(--spacing-lg); color: var(--text-secondary);">
                            ${project.highlights.map(h => `<li>${h}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                <div class="project-links">
                    ${project.demo ? `
                        <a href="${project.demo}" target="_blank" class="project-link">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                            Live Demo
                        </a>
                    ` : ''}
                    <a href="${project.github}" target="_blank" class="project-link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                        GitHub
                    </a>
                </div>
            </div>
        `;

        this.addBotMessage(projectHTML, true);
    }

    displayGitHubProjects(projects, text) {
        if (text) {
            this.addBotMessage(text);
        }

        projects.forEach(project => {
            const projectHTML = `
                <div class="project-card">
                    <h4>${project.name}</h4>
                    <p>${project.description}</p>
                    ${project.language ? `
                        <div class="project-tech">
                            <span class="tech-tag">${project.language}</span>
                            ${project.topics.slice(0, 3).map(topic => `<span class="tech-tag">${topic}</span>`).join('')}
                        </div>
                    ` : ''}
                    <p style="font-size: 0.875rem; color: var(--text-tertiary); margin-top: var(--spacing-sm);">
                        ⭐ ${project.stars} stars • 🍴 ${project.forks} forks • Updated: ${project.updatedAt}
                    </p>
                    <div class="project-links">
                        ${project.homepage ? `
                            <a href="${project.homepage}" target="_blank" class="project-link">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                    <polyline points="15 3 21 3 21 9"></polyline>
                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                </svg>
                                Live Demo
                            </a>
                        ` : ''}
                        <a href="${project.url}" target="_blank" class="project-link">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                            </svg>
                            GitHub
                        </a>
                    </div>
                </div>
            `;

            this.addBotMessage(projectHTML, true);
        });
    }

    displaySkills() {
        this.addBotMessage("Here are my technical skills:");

        let skillsHTML = '<div style="margin-top: var(--spacing-md);">';

        for (const [category, skills] of Object.entries(portfolioData.skills)) {
            skillsHTML += `
                <div style="margin-bottom: var(--spacing-lg);">
                    <h4 style="text-transform: capitalize; margin-bottom: var(--spacing-sm); color: var(--primary-light);">
                        ${category}
                    </h4>
            `;

            for (const [skill, level] of Object.entries(skills)) {
                skillsHTML += `
                    <div style="margin-bottom: var(--spacing-sm);">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                            <span style="color: var(--text-primary);">${skill}</span>
                            <span style="color: var(--text-tertiary); font-size: 0.875rem;">${level}%</span>
                        </div>
                        <div style="height: 6px; background: var(--glass-bg); border-radius: 999px; overflow: hidden;">
                            <div style="height: 100%; width: ${level}%; background: linear-gradient(90deg, var(--primary), var(--secondary)); border-radius: 999px; transition: width 1s ease;"></div>
                        </div>
                    </div>
                `;
            }

            skillsHTML += '</div>';
        }

        skillsHTML += '</div>';

        this.addBotMessage(skillsHTML, true);
    }

    async displayGitHubStats() {
        const stats = await githubAPI.getStats();

        if (!stats) {
            this.addBotMessage("Sorry, I couldn't fetch GitHub stats right now. Please try again later.");
            return;
        }

        const statsHTML = `
            <div style="margin-top: var(--spacing-md);">
                <h4 style="margin-bottom: var(--spacing-md); color: var(--primary-light);">📊 GitHub Statistics</h4>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: var(--spacing-sm); margin-bottom: var(--spacing-md);">
                    <div style="background: var(--glass-bg); padding: var(--spacing-md); border-radius: var(--radius-md); border: 1px solid var(--glass-border); text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: 600; color: var(--primary-light);">${stats.publicRepos}</div>
                        <div style="font-size: 0.875rem; color: var(--text-tertiary);">Public Repos</div>
                    </div>
                    <div style="background: var(--glass-bg); padding: var(--spacing-md); border-radius: var(--radius-md); border: 1px solid var(--glass-border); text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: 600; color: var(--secondary-light);">${stats.totalStars}</div>
                        <div style="font-size: 0.875rem; color: var(--text-tertiary);">Total Stars</div>
                    </div>
                    <div style="background: var(--glass-bg); padding: var(--spacing-md); border-radius: var(--radius-md); border: 1px solid var(--glass-border); text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: 600; color: var(--accent-light);">${stats.followers}</div>
                        <div style="font-size: 0.875rem; color: var(--text-tertiary);">Followers</div>
                    </div>
                </div>
                
                <div style="margin-top: var(--spacing-md);">
                    <strong style="color: var(--text-primary);">Top Languages:</strong>
                    <div style="display: flex; flex-wrap: wrap; gap: var(--spacing-xs); margin-top: var(--spacing-xs);">
                        ${stats.topLanguages.map(lang => `<span class="tech-tag">${lang}</span>`).join('')}
                    </div>
                </div>
                
                ${stats.bio ? `
                    <p style="margin-top: var(--spacing-md); color: var(--text-secondary); font-style: italic;">
                        "${stats.bio}"
                    </p>
                ` : ''}
                
                <a href="https://github.com/NoctuaCoder" target="_blank" class="project-link" style="margin-top: var(--spacing-md); display: inline-flex;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    Visit GitHub Profile
                </a>
            </div>
        `;

        this.addBotMessage(statsHTML, true);
    }

    displayContact() {
        const contactHTML = `
            <div style="margin-top: var(--spacing-md);">
                <h4 style="margin-bottom: var(--spacing-md); color: var(--primary-light);">📬 Get In Touch</h4>
                
                <p style="color: var(--text-secondary); margin-bottom: var(--spacing-lg);">
                    ${portfolioData.availability}
                </p>
                
                <div style="display: flex; flex-direction: column; gap: var(--spacing-sm);">
                    <a href="mailto:${portfolioData.contact.email}" class="project-link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        ${portfolioData.contact.email}
                    </a>
                    
                    <a href="${portfolioData.contact.github}" target="_blank" class="project-link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                        GitHub Profile
                    </a>
                    
                    <a href="${portfolioData.contact.portfolio}" target="_blank" class="project-link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                        Portfolio Website
                    </a>
                </div>
            </div>
        `;

        this.addBotMessage(contactHTML, true);
    }

    showSuggestions(suggestions) {
        this.suggestionChips.innerHTML = '';
        this.suggestionChips.style.display = 'flex';

        suggestions.forEach(suggestion => {
            const chip = document.createElement('button');
            chip.className = 'suggestion-chip';
            chip.textContent = suggestion;
            chip.addEventListener('click', () => {
                this.messageInput.value = suggestion;
                this.handleSend();
            });
            this.suggestionChips.appendChild(chip);
        });
    }

    toggleVoiceInput() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            this.addBotMessage("Sorry, voice input is not supported in your browser. Please try Chrome or Edge.");
            return;
        }

        if (this.isRecording) {
            this.stopRecording();
        } else {
            this.startRecording();
        }
    }

    startRecording() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        this.recognition.lang = 'en-US';
        this.recognition.continuous = false;

        this.recognition.onstart = () => {
            this.isRecording = true;
            this.micBtn.classList.add('recording');
        };

        this.recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            this.messageInput.value = transcript;
        };

        this.recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            this.stopRecording();
        };

        this.recognition.onend = () => {
            this.stopRecording();
        };

        this.recognition.start();
    }

    stopRecording() {
        if (this.recognition) {
            this.recognition.stop();
        }
        this.isRecording = false;
        this.micBtn.classList.remove('recording');
    }

    showLoading() {
        this.loadingIndicator.style.display = 'block';
    }

    hideLoading() {
        this.loadingIndicator.style.display = 'none';
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.chatbot = new PortfolioChatbot();
});
