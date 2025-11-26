/* ========================================
   PARTICLE BACKGROUND - CELESTIAL THEME
   ======================================== */

function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 80;
    let mouse = { x: null, y: null, radius: 150 };

    // Resize canvas
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    }

    // Initialize particles
    function init() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                color: Math.random() > 0.5 ?
                    `rgba(147, 51, 234, ${Math.random() * 0.5 + 0.3})` : // Purple
                    `rgba(236, 72, 153, ${Math.random() * 0.5 + 0.3})`   // Pink
            });
        }
    }

    // Draw particles
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw particles
        particles.forEach(particle => {
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();

            // Glow effect
            ctx.shadowBlur = 10;
            ctx.shadowColor = particle.color;
            ctx.fill();
            ctx.shadowBlur = 0;
        });

        // Connect nearby particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    const opacity = (1 - distance / 120) * 0.3;
                    ctx.strokeStyle = `rgba(147, 51, 234, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        // Mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
            particles.forEach(particle => {
                const dx = mouse.x - particle.x;
                const dy = mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    const opacity = (1 - distance / mouse.radius) * 0.5;
                    ctx.strokeStyle = `rgba(236, 72, 153, ${opacity})`;
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            });
        }
    }

    // Update particle positions
    function update() {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off edges
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

            // Mouse repulsion
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - particle.x;
                const dy = mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    particle.vx -= Math.cos(angle) * force * 0.1;
                    particle.vy -= Math.sin(angle) * force * 0.1;
                }
            }

            // Damping
            particle.vx *= 0.99;
            particle.vy *= 0.99;
        });
    }

    // Animation loop
    function animate() {
        draw();
        update();
        requestAnimationFrame(animate);
    }

    // Mouse move event
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    // Mouse leave event
    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Resize event
    window.addEventListener('resize', resize);

    // Initialize
    resize();
    animate();
}

// Auto-initialize if canvas exists
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initParticles);
} else {
    initParticles();
}

