/* ========================================
   INTELLIGENT RESPONSE SYSTEM
   Handles user messages and generates responses
   ======================================== */

class ResponseSystem {
    constructor() {
        this.patterns = this.initializePatterns();
        this.suggestions = [
            "What projects have you built?",
            "What technologies do you use?",
            "Show me your GitHub stats",
            "How can I contact you?",
            "Tell me about yourself"
        ];
    }

    initializePatterns() {
        return {
            // Greetings
            greeting: {
                patterns: [/^(hi|hello|hey|greetings|good\s*(morning|afternoon|evening))/i],
                responses: [
                    {
                        text: `Hello! 👋 Welcome to my portfolio chatbot. I'm NoctuaCoder, a ${portfolioData.role}. ${portfolioData.tagline}\n\nI'd love to tell you about my projects, skills, and experience. What would you like to know?`,
                        suggestions: [
                            "Show me your projects",
                            "What are your skills?",
                            "View GitHub stats",
                            "How can I contact you?"
                        ]
                    }
                ]
            },

            // About
            about: {
                patterns: [
                    /about\s*(you|yourself)/i,
                    /who\s*are\s*you/i,
                    /tell\s*me\s*about/i,
                    /introduce/i,
                    /^\/about$/i
                ],
                responses: [
                    {
                        text: `# About Me\n\n${portfolioData.about.join('\n\n')}\n\n**Location:** ${portfolioData.location}\n**Status:** ${portfolioData.availability}`,
                        suggestions: [
                            "Show me your projects",
                            "What technologies do you use?",
                            "View GitHub stats"
                        ]
                    }
                ]
            },

            // Projects
            projects: {
                patterns: [
                    /projects?/i,
                    /portfolio/i,
                    /what\s*(have\s*you|did\s*you)\s*build/i,
                    /show\s*me\s*(your\s*)?work/i,
                    /^\/projects?$/i
                ],
                responses: [
                    {
                        type: 'projects',
                        text: "Here are my featured projects:",
                        suggestions: [
                            "Tell me more about Stellar Task Manager",
                            "Show GitHub stats",
                            "What technologies do you use?"
                        ]
                    }
                ]
            },

            // Specific Project
            projectDetail: {
                patterns: [
                    /tell\s*me\s*(more\s*)?about\s*(.+)/i,
                    /details?\s*(about|on)\s*(.+)/i,
                    /what\s*is\s*(.+)/i
                ],
                handler: async (match) => {
                    const projectName = match[match.length - 1].toLowerCase();

                    // Check in portfolio data first
                    const localProject = portfolioData.projects.find(p =>
                        p.name.toLowerCase().includes(projectName)
                    );

                    if (localProject) {
                        return {
                            type: 'project-detail',
                            project: localProject,
                            suggestions: [
                                "Show me more projects",
                                "What technologies do you use?",
                                "How can I contact you?"
                            ]
                        };
                    }

                    // Try GitHub API
                    const githubProject = await githubAPI.searchRepos(projectName);
                    if (githubProject && githubProject.length > 0) {
                        return {
                            type: 'github-projects',
                            projects: githubProject.slice(0, 3),
                            text: `I found these projects matching "${projectName}":`,
                            suggestions: [
                                "Show all projects",
                                "View GitHub stats"
                            ]
                        };
                    }

                    return null;
                }
            },

            // Skills
            skills: {
                patterns: [
                    /skills?/i,
                    /technologies/i,
                    /tech\s*stack/i,
                    /what\s*(do\s*you|can\s*you)\s*(know|use)/i,
                    /languages?/i,
                    /^\/skills?$/i
                ],
                responses: [
                    {
                        type: 'skills',
                        text: "Here are my technical skills:",
                        suggestions: [
                            "Show me your projects",
                            "View GitHub stats",
                            "How can I contact you?"
                        ]
                    }
                ]
            },

            // GitHub Stats
            github: {
                patterns: [
                    /github\s*stats?/i,
                    /git\s*hub/i,
                    /repositories/i,
                    /repos?/i,
                    /contributions?/i,
                    /^\/github$/i
                ],
                responses: [
                    {
                        type: 'github-stats',
                        text: "Fetching my GitHub statistics...",
                        suggestions: [
                            "Show me your projects",
                            "What are your skills?",
                            "How can I contact you?"
                        ]
                    }
                ]
            },

            // Contact
            contact: {
                patterns: [
                    /contact/i,
                    /email/i,
                    /reach\s*(out|you)/i,
                    /get\s*in\s*touch/i,
                    /hire/i,
                    /^\/contact$/i
                ],
                responses: [
                    {
                        type: 'contact',
                        text: "I'd love to hear from you! Here's how you can reach me:",
                        suggestions: [
                            "Show me your projects",
                            "What are your skills?",
                            "Download CV"
                        ]
                    }
                ]
            },

            // Help
            help: {
                patterns: [
                    /^help$/i,
                    /^\/help$/i,
                    /what\s*can\s*(you|i)/i,
                    /commands?/i
                ],
                responses: [
                    {
                        text: `# How to Use This Chatbot\n\nYou can ask me questions naturally or use these commands:\n\n**Commands:**\n• \`/about\` - Learn about me\n• \`/projects\` - View my projects\n• \`/skills\` - See my technical skills\n• \`/github\` - View GitHub statistics\n• \`/contact\` - Get contact information\n• \`/help\` - Show this help message\n\n**Try asking:**\n• "What projects have you built?"\n• "What technologies do you use?"\n• "Tell me about [project name]"\n• "How can I contact you?"`,
                        suggestions: [
                            "Show me your projects",
                            "What are your skills?",
                            "View GitHub stats"
                        ]
                    }
                ]
            },

            // Easter Eggs
            owl: {
                patterns: [/owl/i, /🦉/],
                responses: [
                    {
                        text: `🦉 Hoot hoot! You found the owl!\n\n     /\\_/\\\n    (o.o)\n     > ^ <\n\nNoctua means "owl" in Latin. It represents wisdom, night coding sessions, and my love for celestial themes! ✨`,
                        suggestions: [
                            "Show me your projects",
                            "What are your skills?"
                        ]
                    }
                ]
            },

            // Thanks
            thanks: {
                patterns: [/thank(s| you)/i, /appreciate/i],
                responses: [
                    {
                        text: "You're welcome! Feel free to ask me anything else about my work or experience. 😊",
                        suggestions: [
                            "Show me your projects",
                            "View GitHub stats",
                            "How can I contact you?"
                        ]
                    }
                ]
            }
        };
    }

    async generateResponse(userMessage) {
        const message = userMessage.trim();

        // Check all patterns
        for (const [key, pattern] of Object.entries(this.patterns)) {
            // Check if pattern has a custom handler
            if (pattern.handler) {
                for (const regex of pattern.patterns) {
                    const match = message.match(regex);
                    if (match) {
                        const result = await pattern.handler(match);
                        if (result) return result;
                    }
                }
            }
            // Check regular patterns
            else {
                for (const regex of pattern.patterns) {
                    if (regex.test(message)) {
                        const response = pattern.responses[
                            Math.floor(Math.random() * pattern.responses.length)
                        ];
                        return response;
                    }
                }
            }
        }

        // Default response
        return {
            text: `I'm not sure how to respond to that. Try asking me about:\n\n• My projects and work\n• Technical skills and technologies\n• GitHub statistics\n• How to contact me\n\nOr type \`/help\` to see all available commands.`,
            suggestions: [
                "Show me your projects",
                "What are your skills?",
                "View GitHub stats",
                "How can I contact you?"
            ]
        };
    }

    getRandomSuggestions(count = 3) {
        const shuffled = [...this.suggestions].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
}

// Initialize response system
const responseSystem = new ResponseSystem();

// Export for use in other scripts
window.responseSystem = responseSystem;
