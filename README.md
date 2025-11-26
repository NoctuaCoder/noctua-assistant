# NoctuaCoder - Portfolio Chatbot 🌟

A premium, interactive portfolio chatbot showcasing projects and skills with live GitHub integration. Built with vanilla JavaScript, featuring a stunning celestial theme with glassmorphism effects, particle animations, and intelligent conversation system.

![Portfolio Chatbot](https://img.shields.io/badge/Status-Live-success)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![CSS3](https://img.shields.io/badge/CSS3-Glassmorphism-blue)
![GitHub API](https://img.shields.io/badge/GitHub-API-black)

## ✨ Features

### 🎨 Premium Design
- **Celestial Theme**: Purple/pink gradient color scheme with dark space background
- **Glassmorphism UI**: Modern glass-effect cards and panels with backdrop blur
- **Custom Cursor**: Interactive glowing cursor with particle trail
- **Particle Background**: Animated constellation particles that react to mouse movement
- **Smooth Animations**: Micro-animations for all interactions and transitions

### 💬 Intelligent Chatbot
- **Natural Language Processing**: Understands questions and commands naturally
- **Pattern Matching**: Smart keyword detection for relevant responses
- **Command System**: Special commands like `/projects`, `/skills`, `/github`, `/contact`
- **Suggestion Chips**: Dynamic suggestions based on conversation context
- **Voice Input**: Speech recognition support (Chrome/Edge)

### 🔗 GitHub Integration
- **Live Repository Data**: Fetches real-time data from GitHub API
- **Project Showcase**: Displays repositories with descriptions, technologies, and links
- **GitHub Statistics**: Shows repos, stars, followers, and top languages
- **Smart Caching**: Reduces API calls with intelligent caching system

### 📱 Responsive Design
- **Mobile-First**: Optimized for all screen sizes
- **Touch-Friendly**: Large tap targets and smooth interactions
- **Adaptive Layout**: Sidebar collapses on mobile devices
- **Cross-Browser**: Works on Chrome, Firefox, Safari, and Edge

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/NoctuaCoder/noctua-assistant.git
   cd noctua-assistant
   ```

2. **Start a local server**
   ```bash
   # Using Python 3
   python3 -m http.server 8080
   
   # Or using Node.js
   npx http-server -p 8080
   ```

3. **Open in browser**
   ```
   http://localhost:8080
   ```

### Customization

Edit `js/portfolio-data.js` to customize your portfolio information:

```javascript
const portfolioData = {
    name: "Your Name",
    role: "Your Role",
    bio: "Your bio...",
    projects: [
        // Your projects
    ],
    skills: {
        // Your skills
    },
    contact: {
        // Your contact info
    }
};
```

Update the GitHub username in `js/github-api.js`:

```javascript
const githubAPI = new GitHubAPI('YourGitHubUsername');
```

## 📁 Project Structure

```
noctua-assistant/
├── index.html              # Main HTML structure
├── css/
│   └── portfolio.css       # Premium celestial theme styles
├── js/
│   ├── chatbot.js         # Main chatbot logic
│   ├── github-api.js      # GitHub API integration
│   ├── responses.js       # Intelligent response system
│   ├── portfolio-data.js  # Your portfolio information
│   └── particles.js       # Particle background effects
└── README.md              # This file
```

## 🎯 Usage

### Quick Actions
Click on any quick action chip to instantly get information:
- **View Projects** - See all your projects
- **My Skills** - Display technical skills
- **GitHub Stats** - Show GitHub statistics
- **Contact Me** - Get contact information

### Commands
Type these commands for specific actions:
- `/about` - Learn about you
- `/projects` - View all projects
- `/skills` - See technical skills
- `/github` - Display GitHub stats
- `/contact` - Get contact information
- `/help` - Show help message

### Natural Questions
Ask questions naturally:
- "What projects have you built?"
- "What technologies do you use?"
- "Tell me about [project name]"
- "How can I contact you?"
- "Show me your GitHub stats"

### Easter Eggs
Try typing "owl" or "🦉" for a surprise! 🦉

## 🛠️ Technologies Used

- **HTML5** - Semantic structure
- **CSS3** - Glassmorphism, gradients, animations
- **JavaScript (ES6+)** - Modern vanilla JS
- **GitHub API** - Live repository data
- **Canvas API** - Particle animations
- **Web Speech API** - Voice input (optional)
- **Google Fonts** - Inter, Space Grotesk, Fira Code

## 🎨 Design System

### Colors
```css
--primary: #9333ea      /* Purple */
--secondary: #ec4899    /* Pink */
--accent: #3b82f6       /* Blue */
--bg-primary: #0a0a0f   /* Dark space */
--glass-bg: rgba(255, 255, 255, 0.05)
```

### Typography
- **Headings**: Space Grotesk (geometric, modern)
- **Body**: Inter (clean, readable)
- **Code**: Fira Code (monospace with ligatures)

## 📊 GitHub API

The chatbot uses GitHub's REST API to fetch:
- User profile information
- Public repositories
- Repository statistics (stars, forks)
- Programming languages
- Topics and tags

**Rate Limits**: 60 requests/hour (unauthenticated)  
**Caching**: 5-minute cache to reduce API calls

## 🌐 Browser Support

- ✅ Chrome/Edge (Chromium) - Full support
- ✅ Firefox - Full support
- ✅ Safari - Full support (no voice input)
- ⚠️ IE11 - Not supported

## 📝 License

MIT License - feel free to use this project for your own portfolio!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👤 Author

**NoctuaCoder**
- GitHub: [@NoctuaCoder](https://github.com/NoctuaCoder)
- Portfolio: [noctuacoder.github.io](https://noctuacoder.github.io/NoctuaCoder/portfolio.html)

## ⭐ Show Your Support

Give a ⭐️ if you like this project!

---

<div align="center">
  <p>Made with 💜 and ✨ by NoctuaCoder</p>
  <p><em>Converting starlight into source code</em></p>
</div>
