// Portfolio Data
const portfolioData = {
    name: "NoctuaCoder",
    fullName: "Alana (NoctuaCoder)",
    role: "Full-Stack Developer & Creative Coder",
    tagline: "Converting starlight into source code ✨",
    bio: "Passionate about creating beautiful, functional web experiences with modern aesthetics. Specialized in glassmorphism design, interactive UI/UX, and celestial-themed applications. I love building projects that combine technical excellence with stunning visual design.",
    location: "Brazil 🇧🇷",

    about: [
        "Hi! I'm NoctuaCoder, a developer who believes that code should be both functional and beautiful.",
        "I specialize in creating premium web applications with modern design trends like glassmorphism, gradient animations, and interactive particle effects.",
        "My projects range from productivity dashboards to interactive terminals, all unified by a celestial aesthetic and attention to detail.",
        "When I'm not coding, I'm exploring new design trends, contributing to open source, or perfecting my dotfiles configuration."
    ],

    featuredProjects: [
        "stellar-task-manager",
        "noctua-command-center",
        "noctua-assistant",
        "matrix-owl",
        "stellar-dots"
    ],

    projects: [
        {
            name: "Stellar Task Manager",
            description: "Beautiful task manager built with React Hooks, featuring glassmorphism UI and localStorage persistence",
            tech: ["React", "JavaScript", "LocalStorage", "CSS"],
            demo: "https://noctuacoder.github.io/stellar-task-manager/",
            github: "https://github.com/NoctuaCoder/stellar-task-manager",
            highlights: ["React Hooks", "Glassmorphism UI", "Local Storage", "Responsive Design"]
        },
        {
            name: "Noctua Command Center",
            description: "Premium productivity dashboard with real-time APIs (Weather, Crypto) and Canvas animations",
            tech: ["JavaScript", "Canvas API", "APIs", "Glassmorphism"],
            demo: "https://noctuacoder.github.io/noctua-command-center/",
            github: "https://github.com/NoctuaCoder/noctua-command-center",
            highlights: ["Real-time Weather", "Crypto Prices", "Pomodoro Timer", "Snake Game"]
        },
        {
            name: "NoctuaBot Assistant",
            description: "Interactive AI portfolio chatbot with easter eggs, sound effects, and day/night themes",
            tech: ["JavaScript", "Web Audio API", "LocalStorage", "CSS"],
            demo: "https://noctuacoder.github.io/noctua-assistant/",
            github: "https://github.com/NoctuaCoder/noctua-assistant",
            highlights: ["Interactive Chat", "Sound Effects", "Theme Switching", "Easter Eggs"]
        },
        {
            name: "Matrix Owl Terminal",
            description: "Interactive cyberpunk terminal with command system, particle effects, and system monitor HUD",
            tech: ["JavaScript", "Canvas", "Web Audio", "CSS"],
            demo: "https://noctuacoder.github.io/matrix-owl/",
            github: "https://github.com/NoctuaCoder/matrix-owl",
            highlights: ["Command System", "Matrix Rain", "ASCII Art", "System Monitor"]
        },
        {
            name: "Stellar Dots",
            description: "Premium Hyprland dotfiles with glassmorphism theme and automated installer",
            tech: ["Shell", "Hyprland", "Linux", "CSS"],
            demo: null,
            github: "https://github.com/NoctuaCoder/stellar-dots",
            highlights: ["Hyprland Config", "Waybar Customization", "Auto Installer", "Celestial Theme"]
        }
    ],

    skills: {
        frontend: {
            "React": 80,
            "JavaScript": 90,
            "HTML/CSS": 95,
            "TypeScript": 70
        },
        design: {
            "UI/UX Design": 85,
            "Glassmorphism": 90,
            "Responsive Design": 90,
            "Animation": 80
        },
        tools: {
            "Git": 80,
            "Canvas API": 75,
            "Web Audio API": 70,
            "REST APIs": 75
        },
        other: {
            "Linux": 85,
            "Shell Scripting": 75,
            "Hyprland": 80
        }
    },

    contact: {
        email: "noctuacoder@proton.me",
        github: "https://github.com/NoctuaCoder",
        portfolio: "https://noctuacoder.github.io/NoctuaCoder/portfolio.html"
    },

    availability: "Open to Frontend positions and UI/UX projects",

    interests: [
        "Modern Web Design",
        "Glassmorphism & Neumorphism",
        "Interactive Animations",
        "Linux Customization",
        "Open Source Contribution"
    ]
};

// Export for use in other scripts
window.portfolioData = portfolioData;

