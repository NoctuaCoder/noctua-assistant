// Noctua Assistant Widget - Embed anywhere!
(function () {
    'use strict';

    // Widget configuration
    const config = {
        position: 'bottom-right', // bottom-right, bottom-left, top-right, top-left
        primaryColor: '#00FFFF',
        theme: 'dark' // dark or light
    };

    // Create widget container
    const widgetContainer = document.createElement('div');
    widgetContainer.id = 'noctua-widget';
    widgetContainer.innerHTML = `
        <style>
            #noctua-widget {
                position: fixed;
                ${config.position.includes('bottom') ? 'bottom: 20px;' : 'top: 20px;'}
                ${config.position.includes('right') ? 'right: 20px;' : 'left: 20px;'}
                z-index: 999999;
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            }
            
            #noctua-toggle-btn {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: linear-gradient(135deg, #00FFFF, #BD00FF);
                border: none;
                cursor: pointer;
                box-shadow: 0 4px 20px rgba(0, 255, 255, 0.4);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 28px;
                transition: all 0.3s ease;
                animation: pulse 2s ease-in-out infinite;
            }
            
            #noctua-toggle-btn:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 30px rgba(0, 255, 255, 0.6);
            }
            
            @keyframes pulse {
                0%, 100% {
                    transform: scale(1);
                    box-shadow: 0 4px 20px rgba(0, 255, 255, 0.4);
                }
                50% {
                    transform: scale(1.05);
                    box-shadow: 0 6px 30px rgba(0, 255, 255, 0.6);
                }
            }
            
            #noctua-iframe-container {
                display: none;
                position: fixed;
                ${config.position.includes('bottom') ? 'bottom: 90px;' : 'top: 90px;'}
                ${config.position.includes('right') ? 'right: 20px;' : 'left: 20px;'}
                width: 400px;
                height: 600px;
                max-width: calc(100vw - 40px);
                max-height: calc(100vh - 120px);
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0 8px 40px rgba(0, 0, 0, 0.3);
                animation: slideUp 0.3s ease;
            }
            
            #noctua-iframe-container.open {
                display: block;
            }
            
            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            #noctua-iframe {
                width: 100%;
                height: 100%;
                border: none;
                border-radius: 16px;
            }
            
            .noctua-notification {
                position: absolute;
                top: -5px;
                right: -5px;
                width: 20px;
                height: 20px;
                background: #FF0000;
                border-radius: 50%;
                color: white;
                font-size: 11px;
                font-weight: bold;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: bounce 1s ease-in-out infinite;
            }
            
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-5px); }
            }
            
            @media (max-width: 768px) {
                #noctua-iframe-container {
                    width: calc(100vw - 40px);
                    height: calc(100vh - 120px);
                }
            }
        </style>
        
        <button id="noctua-toggle-btn" aria-label="Open Noctua Assistant">
            🤖
            <span class="noctua-notification">1</span>
        </button>
        
        <div id="noctua-iframe-container">
            <iframe 
                id="noctua-iframe" 
                src="https://noctuacoder.github.io/noctua-assistant/"
                title="Noctua Assistant"
                loading="lazy"
            ></iframe>
        </div>
    `;

    // Add to page
    document.body.appendChild(widgetContainer);

    // Toggle functionality
    const toggleBtn = document.getElementById('noctua-toggle-btn');
    const iframeContainer = document.getElementById('noctua-iframe-container');
    const notification = document.querySelector('.noctua-notification');

    toggleBtn.addEventListener('click', function () {
        const isOpen = iframeContainer.classList.toggle('open');
        toggleBtn.textContent = isOpen ? '✕' : '🤖';

        // Remove notification on first open
        if (isOpen && notification) {
            notification.remove();
        }
    });

    // Close on ESC key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && iframeContainer.classList.contains('open')) {
            iframeContainer.classList.remove('open');
            toggleBtn.textContent = '🤖';
        }
    });
})();
