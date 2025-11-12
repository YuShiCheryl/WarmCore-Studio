// Hero 粒子系统
class HeroParticleSystem {
    constructor() {
        this.container = document.getElementById('hero-particles');
        this.particles = [];
        this.init();
    }

    init() {
        this.createParticles();
        this.animate();
    }

    createParticles() {
        const particleCount = 50;
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                size: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.4 + 0.1,
                color: this.getRandomColor(),
                life: Math.random() * 100 + 50,
                maxLife: Math.random() * 100 + 50
            });
        }
    }

    getRandomColor() {
        const colors = ['rgba(107, 115, 255, ', 'rgba(155, 89, 182, ', 'rgba(255, 159, 243, ', 'rgba(116, 185, 255, '];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    animate() {
        this.particles.forEach((particle, index) => {
            // 更新位置
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // 边界检测
            if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -0.8;
            if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -0.8;
            
            // 生命周期
            particle.life--;
            if (particle.life <= 0) {
                particle.x = Math.random() * window.innerWidth;
                particle.y = Math.random() * window.innerHeight;
                particle.life = particle.maxLife;
                particle.color = this.getRandomColor();
            }
            
            // 创建粒子元素
            const particleElement = document.createElement('div');
            particleElement.style.position = 'absolute';
            particleElement.style.left = particle.x + 'px';
            particleElement.style.top = particle.y + 'px';
            particleElement.style.width = particle.size + 'px';
            particleElement.style.height = particle.size + 'px';
            particleElement.style.background = particle.color + (particle.life / particle.maxLife) + ')';
            particleElement.style.borderRadius = '50%';
            particleElement.style.pointerEvents = 'none';
            particleElement.style.transition = 'all 0.1s ease';
            
            this.container.appendChild(particleElement);
            
            // 移除粒子元素
            setTimeout(() => {
                if (particleElement.parentNode) {
                    particleElement.remove();
                }
            }, 100);
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// 梦幻动效系统
class DreamyEffects {
    constructor() {
        this.init();
    }

    init() {
        this.bindScrollEffects();
        this.createMoonAnimation();
        this.bindHoverEffects();
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(${107 + Math.random() * 50}, ${115 + Math.random() * 50}, ${255 + Math.random() * 50}, 0.3)`;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100%';
        particle.style.animation = 'particleFloat 15s linear forwards';
        
        container.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 15000);
    }

    createMoonAnimation() {
        const moon = document.querySelector('.moon');
        if (moon) {
            // 添加鼠标跟随效果
            document.addEventListener('mousemove', (e) => {
                const rect = moon.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const deltaX = (e.clientX - centerX) * 0.02;
                const deltaY = (e.clientY - centerY) * 0.02;
                
                moon.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            });
        }
    }

    bindScrollEffects() {
        window.addEventListener('scroll', () => {
            this.animateOnScroll();
        });
    }

    animateOnScroll() {
        const elements = document.querySelectorAll('.feature, .benefit, .contact-item');
        
        elements.forEach((element, index) => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && !element.classList.contains('animate-in')) {
                element.classList.add('animate-in');
                element.style.animationDelay = `${index * 0.1}s`;
            }
        });
    }

    bindHoverEffects() {
        // 为设备添加悬停效果
        const device = document.querySelector('.sleep-device');
        if (device) {
            device.addEventListener('mouseenter', () => {
                device.style.transform = 'translateY(-15px) scale(1.02)';
                device.style.boxShadow = '0 30px 80px rgba(107, 115, 255, 0.2)';
            });

            device.addEventListener('mouseleave', () => {
                device.style.transform = 'translateY(0) scale(1)';
                device.style.boxShadow = '0 20px 60px rgba(107, 115, 255, 0.1)';
            });
        }

        // 为按钮添加涟漪效果
        const buttons = document.querySelectorAll('.btn-primary');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRippleEffect(e, button);
            });
        });
    }

    createRippleEffect(event, button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.position = 'absolute';
        ripple.style.width = size + 'px';
        ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// 平滑滚动
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// 导航栏滚动效果
class NavbarScroll {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
    }

    handleScroll() {
        if (window.scrollY > 100) {
            this.navbar.style.background = 'rgba(0, 0, 0, 0.98)';
            this.navbar.style.boxShadow = '0 2px 20px rgba(65, 105, 225, 0.15)';
        } else {
            this.navbar.style.background = 'rgba(0, 0, 0, 0.98)';
            this.navbar.style.boxShadow = 'none';
        }
    }
}

// 睡眠数据模拟
class SleepDataSimulation {
    constructor() {
        this.indicators = document.querySelectorAll('.indicator');
        this.init();
    }

    init() {
        if (this.indicators.length > 0) {
            this.startSimulation();
        }
    }

    startSimulation() {
        setInterval(() => {
            this.indicators.forEach((indicator, index) => {
                // 随机改变指示器状态
                if (Math.random() > 0.7) {
                    indicator.style.background = `rgba(${107 + Math.random() * 100}, ${115 + Math.random() * 100}, ${255 + Math.random() * 100}, 0.8)`;
                }
            });
        }, 2000);
    }
}

// 页面加载动画
class PageLoadAnimation {
    constructor() {
        this.init();
    }

    init() {
        // 页面加载时的淡入效果
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 1s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    }
}

// 初始化所有系统
document.addEventListener('DOMContentLoaded', () => {
    // 启动Hero粒子系统
    new HeroParticleSystem();
    
    // 启动梦幻动效系统
    new DreamyEffects();
    
    // 启动平滑滚动
    new SmoothScroll();
    
    // 启动导航栏滚动效果
    new NavbarScroll();
    
    // 启动睡眠数据模拟
    new SleepDataSimulation();
    
    // 启动页面加载动画
    new PageLoadAnimation();
    
    // 启动Dyson滚动动效
    const dysonElements = document.querySelectorAll('.dyson-text-top, .dyson-text-left, .dyson-left, .dyson-right');
    const dysonObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    dysonElements.forEach(element => {
        dysonObserver.observe(element);
    });
    
    // 添加CSS动画
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: slideInUp 0.8s ease forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes particleFloat {
            from {
                transform: translateY(0) rotate(0deg);
                opacity: 0.3;
            }
            to {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .feature {
            opacity: 0;
            transform: translateY(30px);
        }
        
        .benefit {
            opacity: 0;
            transform: translateX(-30px);
        }
        
        .contact-item {
            opacity: 0;
            transform: translateY(30px);
        }
    `;
    document.head.appendChild(style);
});