// Response System - Intelligent keyword matching
const responses = {
    greetings: {
        keywords: ['hi', 'hello', 'hey', 'oi', 'olá', 'ola'],
        responses: [
            "Hello! 👋 I'm NoctuaBot, Alana's portfolio assistant. How can I help you today?",
            "Hi there! ✨ I can tell you about Alana's projects, skills, and experience. What would you like to know?"
        ]
    },

    projects: {
        keywords: ['project', 'projects', 'work', 'portfolio', 'show', 'projeto', 'projetos'],
        action: 'showProjects'
    },

    skills: {
        keywords: ['skill', 'skills', 'tech', 'technology', 'know', 'habilidade'],
        action: 'showSkills'
    },

    contact: {
        keywords: ['contact', 'email', 'reach', 'hire', 'contato', 'contratar'],
        action: 'showContact'
    },

    github: {
        keywords: ['github', 'git', 'repo', 'repository', 'code'],
        action: 'showGitHub'
    },

    about: {
        keywords: ['who', 'about', 'you', 'quem', 'sobre'],
        responses: [
            `I'm representing <strong>Alana (NoctuaCoder)</strong>, a ${portfolioData.role} from ${portfolioData.location}.<br><br>${portfolioData.bio}<br><br>Want to see her projects? 🚀`
        ]
    },

    experience: {
        keywords: ['experience', 'experiência', 'background', 'career'],
        responses: [
            "Alana specializes in <strong>Frontend Development</strong> and <strong>UI/UX Design</strong>, with expertise in:<br>• React & Modern JavaScript<br>• Glassmorphism & Modern CSS<br>• Interactive UIs & Animations<br>• Canvas API & Web APIs<br><br>Check out her projects to see these skills in action! 💼"
        ]
    },

    availability: {
        keywords: ['available', 'hire', 'work', 'job', 'disponível', 'vaga'],
        responses: [
            `Yes! Alana is currently <strong>${portfolioData.availability}</strong>.<br><br>Interested in working together? Let's connect! 📧`
        ]
    },

    thanks: {
        keywords: ['thank', 'thanks', 'obrigad', 'valeu'],
        responses: [
            "You're welcome! 😊 Anything else you'd like to know?",
            "Happy to help! ✨ Feel free to ask more questions!"
        ]
    },

    help: {
        keywords: ['help', 'ajuda', 'command', 'what can'],
        responses: [
            "I can help you with:<br>• <strong>Projects</strong> - See Alana's work<br>• <strong>Skills</strong> - View technical expertise<br>• <strong>Contact</strong> - Get in touch<br>• <strong>GitHub</strong> - Check GitHub profile<br><br>🎮 <strong>Easter Eggs:</strong><br>• Type 'owl' or 'coruja'<br>• Type 'color [name]' to change theme<br>• Type 'time' or 'hora'<br>• Type 'joke' or 'quote'<br><br>Just ask me anything or use the quick action buttons! 💡"
        ]
    },

    joke: {
        keywords: ['joke', 'piada', 'funny'],
        responses: [
            "Why do programmers prefer dark mode? 🌙<br>Because light attracts bugs! 🐛😄",
            "How many programmers does it take to change a light bulb? 💡<br>None, that's a hardware problem! 😂",
            "Why do Java developers wear glasses? 👓<br>Because they can't C#! 🤓",
            "A SQL query walks into a bar, walks up to two tables and asks... 🍺<br>'Can I join you?' 😄"
        ]
    },

    quote: {
        keywords: ['quote', 'inspire', 'motivation', 'frase'],
        responses: [
            "💫 <em>\"Code is like humor. When you have to explain it, it's bad.\"</em><br>- Cory House",
            "✨ <em>\"First, solve the problem. Then, write the code.\"</em><br>- John Johnson",
            "🌟 <em>\"The best error message is the one that never shows up.\"</em><br>- Thomas Fuchs",
            "⭐ <em>\"Simplicity is the soul of efficiency.\"</em><br>- Austin Freeman",
            "💎 <em>\"Make it work, make it right, make it fast.\"</em><br>- Kent Beck"
        ]
    },

    default: {
        responses: [
            "Hmm, I'm not sure about that. Try asking about Alana's projects, skills, or experience! 🤔",
            "Interesting question! I'm best at talking about Alana's portfolio. Want to see her projects? 🚀",
            "I didn't quite understand that. Type 'help' to see what I can do! 💡"
        ]
    }
};

function findResponse(message) {
    const lowerMessage = message.toLowerCase();

    for (const [category, data] of Object.entries(responses)) {
        if (category === 'default') continue;

        if (data.keywords && data.keywords.some(keyword => lowerMessage.includes(keyword))) {
            if (data.action) {
                return { action: data.action };
            }
            if (data.responses) {
                return {
                    text: data.responses[Math.floor(Math.random() * data.responses.length)]
                };
            }
        }
    }

    return {
        text: responses.default.responses[Math.floor(Math.random() * responses.default.responses.length)]
    };
}
