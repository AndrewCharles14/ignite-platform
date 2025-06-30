document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.section');

    function showSection(id) {
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === id) {
                section.classList.add('active');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            showSection(this.getAttribute('href').substring(1));
        });
    });

    // Quiz logic placeholder
    function answerQuestion(questionIndex, track) {
        document.getElementById('quiz-question').style.display = 'none';
        document.getElementById('quiz-result').style.display = 'block';
        const resultContent = document.getElementById('result-content');
        resultContent.textContent = "You seem to be interested in the " + track + " track!";
    }

    window.showSection = showSection;
    window.answerQuestion = answerQuestion;
    window.processChallenge = processChallenge;
    window.fillExample = fillExample;
});

// Function to fill example challenges
function fillExample(exampleText) {
    const challengeInput = document.getElementById('challenge-input');
    challengeInput.value = exampleText;
    challengeInput.focus();
}

// AI Challenge Processing Function
function processChallenge() {
    const challengeInput = document.getElementById('challenge-input');
    const aiResponse = document.getElementById('ai-response');
    const challengeText = challengeInput.value.trim();
    
    if (!challengeText) {
        alert('Please enter a challenge statement first!');
        return;
    }
    
    // Simulate AI processing (in a real app, this would call an AI API)
    aiResponse.innerHTML = '<div style="text-align: center; padding: 20px;">🤖 Processing your challenge...</div>';
    
    setTimeout(() => {
        const response = generateProjectOutline(challengeText);
        aiResponse.innerHTML = response;
    }, 1500);
}

// Generate project outline based on challenge (simulated AI response)
function generateProjectOutline(challenge) {
    // Simple keyword detection to determine challenge type
    const lowerChallenge = challenge.toLowerCase();
    let projectType = 'general';
    let track = 'stem'; // default
    
    if (lowerChallenge.includes('app') || lowerChallenge.includes('code') || lowerChallenge.includes('robot') || lowerChallenge.includes('tech')) {
        projectType = 'tech';
        track = 'stem';
    } else if (lowerChallenge.includes('video') || lowerChallenge.includes('design') || lowerChallenge.includes('art') || lowerChallenge.includes('creative')) {
        projectType = 'creative';
        track = 'arts';
    } else if (lowerChallenge.includes('community') || lowerChallenge.includes('social') || lowerChallenge.includes('policy') || lowerChallenge.includes('help')) {
        projectType = 'social';
        track = 'leadership';
    }
    
    const outlines = {
        tech: {
            steps: [
                'Research the problem and identify target users',
                'Brainstorm and sketch initial solution concepts',
                'Choose your technology stack and development tools',
                'Create wireframes or prototypes of your solution',
                'Develop a minimum viable product (MVP)',
                'Test your solution with real users and gather feedback',
                'Iterate and improve based on feedback',
                'Document your process and prepare presentation'
            ],
            modules: [
                { icon: '💻', title: 'Intro to Coding', desc: 'Learn basic programming fundamentals' },
                { icon: '🎨', title: 'UI/UX Design', desc: 'Design user-friendly interfaces' },
                { icon: '🧪', title: 'User Testing', desc: 'Learn how to test and validate your ideas' },
                { icon: '📊', title: 'Data Analysis', desc: 'Understand user behavior through data' }
            ]
        },
        creative: {
            steps: [
                'Define your message and target audience',
                'Research similar projects and creative approaches',
                'Develop a creative concept and storyboard',
                'Plan your production timeline and resources',
                'Create your content (video, design, audio, etc.)',
                'Edit and refine your creative work',
                'Share with test audience and gather feedback',
                'Finalize and prepare for presentation/distribution'
            ],
            modules: [
                { icon: '🎬', title: 'Video Production', desc: 'Learn filming and editing techniques' },
                { icon: '🎙️', title: 'Podcasting 101', desc: 'Create engaging audio content' },
                { icon: '✏️', title: 'Graphic Design', desc: 'Design compelling visual content' },
                { icon: '📝', title: 'Storytelling', desc: 'Craft narratives that engage audiences' }
            ]
        },
        social: {
            steps: [
                'Identify the specific community problem or need',
                'Research existing solutions and stakeholders',
                'Engage with community members to understand perspectives',
                'Develop an action plan with clear goals and metrics',
                'Build partnerships with local organizations',
                'Implement your solution on a small scale',
                'Measure impact and gather community feedback',
                'Scale your solution and advocate for broader change'
            ],
            modules: [
                { icon: '🤝', title: 'Community Organizing', desc: 'Learn to mobilize people for change' },
                { icon: '📝', title: 'Policy Writing', desc: 'Draft effective policy proposals' },
                { icon: '🗳️', title: 'Civic Engagement', desc: 'Understand how government and advocacy work' },
                { icon: '📊', title: 'Impact Measurement', desc: 'Track and evaluate social change' }
            ]
        },
        general: {
            steps: [
                'Clearly define the problem you want to solve',
                'Research the challenge and existing solutions',
                'Brainstorm multiple approaches to the problem',
                'Choose the most promising solution to develop',
                'Create a detailed project plan with timeline',
                'Build or implement your solution step by step',
                'Test and refine your approach',
                'Present your solution and reflect on learnings'
            ],
            modules: [
                { icon: '🧠', title: 'Critical Thinking', desc: 'Develop problem-solving skills' },
                { icon: '📋', title: 'Project Management', desc: 'Learn to plan and execute projects' },
                { icon: '🔍', title: 'Research Methods', desc: 'Gather and analyze information effectively' },
                { icon: '🎯', title: 'Presentation Skills', desc: 'Communicate your ideas clearly' }
            ]
        }
    };
    
    const outline = outlines[projectType];
    
    return `
        <div class="response-section">
            <h3>📋 Step-by-Step Project Outline</h3>
            <p>Based on your challenge statement, here's a recommended approach:</p>
            <ul class="step-list">
                ${outline.steps.map(step => `<li>${step}</li>`).join('')}
            </ul>
        </div>
        
        <div class="response-section">
            <h3>🎓 Recommended Learning Modules</h3>
            <p>These modules will help you build the skills needed for your project:</p>
            <div class="module-recommendations">
                ${outline.modules.map(module => `
                    <div class="module-recommendation">
                        <div class="module-icon">${module.icon}</div>
                        <h4>${module.title}</h4>
                        <p>${module.desc}</p>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="response-section">
            <h3>🚀 Ready to Start?</h3>
            <p>Your project aligns well with our <strong>${track.charAt(0).toUpperCase() + track.slice(1)}</strong> track. Check out the modules above and start with Step 1!</p>
            <button class="cta-button" onclick="showSection('modules')">Explore ${track.charAt(0).toUpperCase() + track.slice(1)} Track →</button>
        </div>
    `;
}

// Digital Hub Functions
function openAvatarCustomizer() {
    document.getElementById('avatar-modal').style.display = 'flex';
}

function closeAvatarCustomizer() {
    document.getElementById('avatar-modal').style.display = 'none';
}

function setAvatar(emoji) {
    document.getElementById('student-avatar').textContent = emoji;
    closeAvatarCustomizer();
    showNotification('Avatar updated! ✨', 'success');
}

// Interactive Animations and Effects
function addInteractiveElements() {
    // Add floating action button
    const fab = document.createElement('button');
    fab.className = 'floating-action-btn';
    fab.innerHTML = '🚀';
    fab.onclick = () => showSection('ai-assistant');
    fab.title = 'Quick AI Assistant';
    document.body.appendChild(fab);
    
    // Add count-up animation to stat numbers
    animateCounters();
    
    // Add parallax effect to hero section
    addParallaxEffect();
    
    // Add interactive card effects
    addCardInteractions();
    
    // Add typing animation to hero title
    addTypingAnimation();
}

// Count-up animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
        const increment = target / 60; // Animation duration
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (counter.textContent.includes('+')) {
                    counter.textContent = Math.ceil(current) + '+';
                } else if (counter.textContent.includes('/')) {
                    counter.textContent = Math.ceil(current) + '/7';
                } else {
                    counter.textContent = Math.ceil(current);
                }
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = counter.textContent.includes('+') ? target + '+' : 
                                   counter.textContent.includes('/') ? target + '/7' : target;
            }
        };
        
        updateCounter();
    };
    
    // Use Intersection Observer to trigger animation when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

// Parallax effect for hero section
function addParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-visual, .section::before');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Enhanced card interactions
function addCardInteractions() {
    const cards = document.querySelectorAll('.track-card, .mentor-card, .phase-item, .stat-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        card.addEventListener('click', function() {
            this.style.transform = 'translateY(-4px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            }, 150);
        });
    });
}

// Typing animation for hero title
function addTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid #667eea';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        // Start typing animation when hero section is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeWriter, 500);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(heroTitle);
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `game-notification ${type}`;
    notification.innerHTML = `
        <span class="notification-message">${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Quiz progress animation
function updateQuizProgress(current, total) {
    const progressFill = document.getElementById('quiz-progress-fill');
    const progressText = document.getElementById('current-question-num');
    
    if (progressFill && progressText) {
        const percentage = (current / total) * 100;
        progressFill.style.width = percentage + '%';
        progressText.textContent = current;
        
        // Add pulsing animation for milestone questions
        if (current % 5 === 0) {
            progressFill.style.animation = 'pulseProgress 0.6s ease-in-out';
            setTimeout(() => {
                progressFill.style.animation = '';
            }, 600);
        }
    }
}

// Progress bar pulsing animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulseProgress {
        0%, 100% {
            background: linear-gradient(135deg, #667eea, #764ba2);
        }
        50% {
            background: linear-gradient(135deg, #4caf50, #2e7d32);
            box-shadow: 0 0 20px rgba(76, 175, 80, 0.6);
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll to sections
function smoothScrollTo(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Interactive button click effects
function addButtonEffects() {
    const buttons = document.querySelectorAll('button, .hero-button, .cta-button, .section-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Initialize all interactive elements when page loads
document.addEventListener('DOMContentLoaded', function() {
    addInteractiveElements();
    addButtonEffects();
    
    // Add some delay for better visual effect
    setTimeout(() => {
        showNotification('Welcome to Ignite Platform! 🎉', 'success');
    }, 1000);
});

// Ripple effect CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: rippleAnimation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes rippleAnimation {
        0% {
            transform: scale(0);
            opacity: 0.6;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

function openChatBot(type) {
    const modal = document.getElementById('chatbot-modal');
    const title = document.getElementById('chat-title');
    const messages = document.getElementById('chat-messages');
    
    if (type === 'tutor') {
        title.textContent = '📚 Study Buddy';
        messages.innerHTML = `
            <div class="chat-message">
                <div class="message-avatar">📚</div>
                <div class="message-content">
                    Hi! I'm your Study Buddy. I can help you with:
                    <br>• Research and homework questions
                    <br>• Module explanations
                    <br>• Project planning
                    <br>• Study strategies
                    <br><br>What would you like help with today?
                </div>
            </div>
        `;
    } else if (type === 'therapist') {
        title.textContent = '💚 Wellness Coach';
        messages.innerHTML = `
            <div class="chat-message">
                <div class="message-avatar">💚</div>
                <div class="message-content">
                    Hello! I'm your Wellness Coach. I'm here to support your mental health and well-being.
                    <br>• Stress management
                    <br>• Mindfulness exercises
                    <br>• Emotional support
                    <br>• Self-care tips
                    <br><br>How are you feeling today? What's on your mind?
                </div>
            </div>
        `;
    }
    
    modal.style.display = 'flex';
}

function closeChatBot() {
    document.getElementById('chatbot-modal').style.display = 'none';
}

function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const messages = document.getElementById('chat-messages');
    const messageText = input.value.trim();
    
    if (!messageText) return;
    
    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'chat-message user';
    userMessage.innerHTML = `
        <div class="message-avatar">👤</div>
        <div class="message-content">${messageText}</div>
    `;
    messages.appendChild(userMessage);
    
    // Clear input
    input.value = '';
    
    // Simulate AI response
    setTimeout(() => {
        const aiMessage = document.createElement('div');
        aiMessage.className = 'chat-message';
        const isWellness = document.getElementById('chat-title').textContent.includes('Wellness');
        const avatar = isWellness ? '💚' : '📚';
        const response = generateChatResponse(messageText, isWellness);
        
        aiMessage.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-content">${response}</div>
        `;
        messages.appendChild(aiMessage);
        
        // Scroll to bottom
        messages.scrollTop = messages.scrollHeight;
    }, 1000);
    
    // Scroll to bottom
    messages.scrollTop = messages.scrollHeight;
}

function generateChatResponse(message, isWellness) {
    const lowerMessage = message.toLowerCase();
    
    if (isWellness) {
        if (lowerMessage.includes('stress') || lowerMessage.includes('anxious')) {
            return "I understand you're feeling stressed. Try this quick breathing exercise: Breathe in for 4 counts, hold for 4, breathe out for 6. Repeat 3 times. Remember, it's okay to feel overwhelmed sometimes. What specific situation is causing you stress?";
        } else if (lowerMessage.includes('sad') || lowerMessage.includes('down')) {
            return "I'm sorry you're feeling down. Your feelings are valid. Sometimes talking helps - would you like to share what's been on your mind? Also, consider doing something small that usually brings you joy today.";
        } else if (lowerMessage.includes('tired') || lowerMessage.includes('exhausted')) {
            return "Feeling tired can really impact everything. Are you getting enough sleep? Consider setting a consistent bedtime routine. Also, make sure you're taking breaks during study sessions. Your well-being matters!";
        } else {
            return "Thanks for sharing with me. I'm here to listen and support you. Whether you need stress management techniques, someone to talk through challenges, or just a check-in, I'm here 24/7. How else can I help you today?";
        }
    } else {
        if (lowerMessage.includes('project') || lowerMessage.includes('assignment')) {
            return "I'd love to help with your project! Can you tell me more about what you're working on? Is it for a specific track (STEM, Arts, or Leadership)? I can help you break it down into manageable steps and suggest resources.";
        } else if (lowerMessage.includes('code') || lowerMessage.includes('programming')) {
            return "Great! Programming questions are my specialty. What language are you working with, or what specific coding concept do you need help with? I can explain concepts, help debug, or suggest learning resources.";
        } else if (lowerMessage.includes('research') || lowerMessage.includes('sources')) {
            return "Research is a crucial skill! I can help you find reliable sources, organize your research, or develop research questions. What topic are you researching, and what type of sources do you need?";
        } else {
            return "I'm here to help with all your academic needs! Whether it's understanding module content, working on projects, research assistance, or study strategies, just let me know what you're working on and I'll guide you through it.";
        }
    }
}

function handleChatEnter(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

function openForums() {
    alert('Discussion Forums feature coming soon! This would open a moderated space for students to discuss projects and share ideas.');
}

function openMessaging() {
    alert('Private Messaging feature coming soon! This would allow secure communication between students in the program.');
}

function openCollabSpace() {
    alert('Project Collaboration feature coming soon! This would provide shared workspaces for team projects.');
}

// Career Quiz Functionality
const CAREER_CATEGORIES = {
    "Analytical": ["analyze", "data", "solve", "logic", "research", "numbers", "patterns"],
    "Creative": ["design", "art", "music", "write", "create", "visuals", "storytelling"],
    "Social": ["help", "teach", "guide", "support", "community", "communicate", "team"],
    "Technical": ["build", "code", "engineer", "technology", "operate", "fix", "systems"],
    "Nature": ["animals", "plants", "environment", "outdoors", "conserve", "explore"],
    "Business": ["lead", "organize", "sell", "manage", "finance", "market", "persuade"]
};

const QUIZ_QUESTIONS = [
    // Analytical (16 questions)
    "I enjoy solving complex puzzles.",
    "I like finding patterns in data or numbers.",
    "I prefer tasks that require logical reasoning.",
    "I am curious about how things work.",
    "I enjoy conducting research to find answers.",
    "I like organizing information into spreadsheets.",
    "I am good at spotting inconsistencies or errors.",
    "I enjoy strategy games like chess or Sudoku.",
    "I like reading scientific articles or studies.",
    "I would enjoy forecasting future trends based on data.",
    "I am interested in how statistics are used.",
    "I like to break down big problems into smaller parts.",
    "I enjoy debating and forming strong arguments.",
    "I'm interested in economics and financial markets.",
    "I like to experiment to see what happens.",
    "I like to analyze historical events to understand their causes.",
    
    // Creative (17 questions)
    "I enjoy drawing, painting, or sculpting.",
    "I like to write stories, poems, or articles.",
    "I am passionate about music and sound.",
    "I enjoy photography and creating visual content.",
    "I would like to design websites or apps.",
    "I have a good sense of style and aesthetics.",
    "I enjoy drama, acting, or public speaking.",
    "I like coming up with new ideas and inventions.",
    "I would enjoy creating marketing campaigns.",
    "I like to express myself through artistic means.",
    "I enjoy designing clothes or fashion items.",
    "I would like to direct or produce a movie.",
    "I enjoy interior design and arranging spaces.",
    "I like creating animations or digital art.",
    "I enjoy making crafts or DIY projects.",
    "I am interested in culinary arts and creating new recipes.",
    "I enjoy composing or arranging music.",
    
    // Social (17 questions)
    "I enjoy helping others solve their problems.",
    "I am a good listener and people often confide in me.",
    "I enjoy working in a team towards a common goal.",
    "I like teaching or mentoring others.",
    "I am passionate about social justice and community issues.",
    "I enjoy volunteering my time for a good cause.",
    "I am good at understanding different perspectives.",
    "I like public speaking and presenting to groups.",
    "I enjoy organizing events or activities for others.",
    "I feel energized after social interactions.",
    "I would enjoy a career in counseling or therapy.",
    "I like taking care of people who are sick or in need.",
    "I am good at mediating conflicts between people.",
    "I enjoy learning about different cultures.",
    "I like leading and motivating a group.",
    "I want to work to improve society.",
    "I'm good at making people feel welcome and included.",
    
    // Technical (16 questions)
    "I am fascinated by new technology.",
    "I enjoy building things with my hands or with tools.",
    "I like to understand how machines and electronics work.",
    "I enjoy computer programming or coding.",
    "I am good at troubleshooting and fixing problems.",
    "I would enjoy designing and building robots.",
    "I am interested in cybersecurity and protecting data.",
    "I like working with software and computer applications.",
    "I would enjoy developing video games.",
    "I like the idea of working in a lab with technical equipment.",
    "I'm interested in engineering (civil, mechanical, electrical).",
    "I enjoy working with circuits and electronics.",
    "I would like to design and build structures like bridges or buildings.",
    "I am interested in how computer networks operate.",
    "I like learning new programming languages.",
    "I am interested in artificial intelligence and machine learning.",
    
    // Nature (16 questions)
    "I enjoy spending time outdoors (hiking, camping, etc.).",
    "I am passionate about protecting the environment.",
    "I enjoy gardening or working with plants.",
    "I am fascinated by animals and wildlife.",
    "I would enjoy a career working with animals (e.g., veterinarian).",
    "I am interested in geology and earth science.",
    "I enjoy studying maps and geography.",
    "I would like to work in conservation or forestry.",
    "I am interested in marine biology and ocean life.",
    "I enjoy learning about weather patterns and climate.",
    "I like to identify different types of plants and animals.",
    "I would enjoy conducting fieldwork outdoors.",
    "I am interested in sustainable agriculture and food systems.",
    "I care deeply about renewable energy.",
    "I would enjoy being a park ranger.",
    "I enjoy learning about different ecosystems.",
    
    // Business (18 questions)
    "I enjoy leading a team or project.",
    "I am interested in how businesses make money.",
    "I enjoy persuading others to my point of view.",
    "I am good at organizing projects and managing time.",
    "I like the idea of starting my own company.",
    "I enjoy negotiating to get a good deal.",
    "I am interested in marketing and advertising.",
    "I enjoy public speaking and making presentations.",
    "I am comfortable with taking calculated risks.",
    "I like tracking my money and making budgets.",
    "I enjoy networking and meeting new people.",
    "I am interested in the stock market and investing.",
    "I like setting goals and working to achieve them.",
    "I am good at selling products or ideas.",
    "I would enjoy managing a store or a company.",
    "I am interested in law and contracts.",
    "I like understanding legal systems.",
    "I like preparing presentations."
];

const CAREER_OPTIONS = {
    "Data Scientist": { primary: "Analytical", secondary: "Technical" },
    "Graphic Designer": { primary: "Creative", secondary: "Technical" },
    "Social Worker": { primary: "Social", secondary: "Analytical" },
    "Software Engineer": { primary: "Technical", secondary: "Analytical" },
    "Environmental Scientist": { primary: "Nature", secondary: "Analytical" },
    "Marketing Manager": { primary: "Business", secondary: "Creative" },
    "Financial Analyst": { primary: "Analytical", secondary: "Business" },
    "Architect": { primary: "Creative", secondary: "Technical" },
    "Teacher": { primary: "Social", secondary: "Creative" },
    "Mechanical Engineer": { primary: "Technical", secondary: "Analytical" },
    "Veterinarian": { primary: "Nature", secondary: "Social" },
    "Entrepreneur": { primary: "Business", secondary: "Creative" },
    "Writer/Author": { primary: "Creative", secondary: "Analytical" },
    "Psychologist": { primary: "Social", secondary: "Analytical" },
    "Robotics Engineer": { primary: "Technical", secondary: "Creative" },
    "Conservation Officer": { primary: "Nature", secondary: "Social" },
    "Lawyer": { primary: "Analytical", secondary: "Social" },
    "Product Manager": { primary: "Business", secondary: "Technical" },
    "Urban Planner": { primary: "Analytical", secondary: "Social" },
    "Video Game Designer": { primary: "Creative", secondary: "Technical" },
    "Doctor/Physician": { primary: "Social", secondary: "Analytical" },
    "Geologist": { primary: "Nature", secondary: "Analytical" },
    "Accountant": { primary: "Business", secondary: "Analytical" }
};

const CAREER_CHALLENGES = {
    "Data Scientist": "A city wants to reduce traffic congestion. You are given a dataset of traffic patterns, public transport schedules, and weather conditions. Your challenge: Analyze the data to identify the top 3 factors causing traffic jams and propose a data-driven solution to the city council.",
    "Graphic Designer": "A new eco-friendly coffee shop is launching. They need a complete brand identity. Your challenge: Design a logo, a color palette, and a mockup for a reusable coffee cup that communicates their commitment to sustainability and great coffee.",
    "Social Worker": "A local high school has seen an increase in student stress and anxiety. Your challenge: Develop a 3-part workshop series for students that teaches practical coping strategies, provides resources for mental health support, and creates a safe space for discussion.",
    "Software Engineer": "Many people in your community want to volunteer, but they don't know where to start. Your challenge: Outline the key features for a mobile app that connects volunteers with local non-profits based on their skills and availability.",
    "Environmental Scientist": "A nearby river has shown signs of pollution, affecting local wildlife. Your challenge: Propose a 3-step action plan to identify the source, recommend immediate measures, and suggest long-term solutions.",
    "Marketing Manager": "A local bookstore is struggling to compete with online retailers. Your challenge: Create a 3-month marketing plan to increase foot traffic by 20% through community events, digital campaigns, and local partnerships.",
    "Financial Analyst": "Your friend has saved $1,000 and wants to start investing for the long term. Your challenge: Explain stocks vs bonds in simple terms and create a sample 'starter portfolio' of 3 investments that balances risk and potential growth.",
    "Architect": "A small town wants to build a new community library that is accessible, environmentally friendly, and serves all ages. Your challenge: Sketch a basic floor plan with children's area, quiet study zone, computer lab, and meeting room using natural light and sustainable materials.",
    "Teacher": "You need to teach a 9th-grade history class about an important historical event in an engaging way. Your challenge: Choose an event and design a 45-minute lesson plan with an interactive activity instead of just a lecture.",
    "Mechanical Engineer": "A company wants to create a new, affordable prosthetic hand for children that is both functional and cool. Your challenge: Brainstorm 5 key features, sketch a simple design, and explain materials for lightweight durability.",
    "Veterinarian": "A person brings in their dog, which has been lethargic and hasn't eaten for two days. Your challenge: What are the first 5 questions you'd ask the owner and the first 3 physical checks you'd perform?",
    "Entrepreneur": "You have an idea for a subscription box for hobbyists (knitting, painting, model rockets). Your challenge: Identify your target customer, create a list for the first month's box, and determine a fair price.",
    "Writer/Author": "You're tasked with writing a short story for young adults with the theme 'courage.' Your challenge: Write an opening paragraph (150 words) that introduces the main character and hints at their central conflict.",
    "Psychologist": "A client struggles with social anxiety and finds large gatherings difficult. Your challenge: Describe three practical, step-by-step techniques or 'homework' assignments to gradually build their confidence in social situations.",
    "Robotics Engineer": "Design a small robot to help elderly people living alone. Your challenge: What are the top 3 most important tasks this robot should perform? Sketch a diagram and list needed sensors for safe home navigation.",
    "Conservation Officer": "You discover evidence of illegal poaching in a protected wildlife area. Your challenge: Outline your action plan - first three steps, evidence collection methods, and coordination partners.",
    "Lawyer": "Your client is a small business owner being sued by a customer who claims they slipped and fell in the store. Your challenge: What are the first 5 pieces of evidence you'd gather to build a defense?",
    "Product Manager": "Your team developed a new fitness-tracking app. Your challenge: Plan the official launch by identifying three key features to highlight in marketing materials that differentiate from competitors like Strava or Fitbit.",
    "Urban Planner": "A city neighborhood lacks green space. The city acquired a small empty lot for a park. Your challenge: Create a design concept serving young children, teenagers, and seniors - how would you balance their different needs in limited space?",
    "Video Game Designer": "You have an idea for a new puzzle-platformer game. Your challenge: Describe the game's core 'mechanic' (main repeated action), then design the first level on paper showing how to teach this mechanic without words.",
    "Doctor/Physician": "A patient comes with persistent cough and fatigue. Your challenge: What's your differential diagnosis process? List 4 possible causes from most to least common and initial tests you'd order.",
    "Geologist": "You're leading a school trip to a local geological site. Your challenge: Prepare a brief, exciting introduction explaining how you'd demonstrate erosion and rock layers using available site features.",
    "Accountant": "A small coffee shop owner is unsure if they're making profit. Your challenge: Explain the difference between revenue, expenses, and profit, then create a simple one-month sample budget with 5 expense categories."
};

// Quiz State
let quizState = {
    currentQuestion: 0,
    totalQuestions: 20,
    answers: [],
    selectedQuestions: [],
    questionCategoryMap: {}
};

// Initialize Quiz
function initializeQuiz() {
    // Assign categories to questions
    assignQuestionCategories();
    
    // Select random subset of questions
    selectQuizQuestions();
    
    // Set up event listeners
    document.getElementById('start-career-quiz-btn').addEventListener('click', startCareerQuiz);
    document.getElementById('prev-question').addEventListener('click', previousQuestion);
    document.getElementById('next-question').addEventListener('click', nextQuestion);
    document.getElementById('submit-quiz').addEventListener('click', (e) => {
        e.preventDefault();
        submitQuiz();
    });
    document.getElementById('restart-quiz').addEventListener('click', restartQuiz);
    
    // Also add form submit handler
    document.getElementById('career-quiz-form').addEventListener('submit', (e) => {
        e.preventDefault();
        submitQuiz();
    });
}

function assignQuestionCategories() {
    QUIZ_QUESTIONS.forEach((question, index) => {
        let bestCategory = "Analytical"; // Default
        let maxScore = 0;
        
        for (const [category, keywords] of Object.entries(CAREER_CATEGORIES)) {
            const score = keywords.reduce((acc, keyword) => 
                acc + (question.toLowerCase().includes(keyword) ? 1 : 0), 0);
            if (score > maxScore) {
                maxScore = score;
                bestCategory = category;
            }
        }
        
        quizState.questionCategoryMap[index] = bestCategory;
    });
}

function selectQuizQuestions() {
    // Shuffle all question indices
    const allIndices = Array.from(Array(QUIZ_QUESTIONS.length).keys());
    shuffleArray(allIndices);
    
    // Take first 20 questions
    quizState.selectedQuestions = allIndices.slice(0, quizState.totalQuestions);
    quizState.answers = new Array(quizState.totalQuestions).fill(3); // Default to neutral
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startCareerQuiz() {
    document.getElementById('career-quiz-welcome').classList.add('hidden');
    document.getElementById('career-quiz-form-container').classList.remove('hidden');
    
    generateQuizQuestions();
    showQuestion(0);
}

function generateQuizQuestions() {
    const container = document.getElementById('quiz-questions-container');
    container.innerHTML = '';
    
    quizState.selectedQuestions.forEach((questionIndex, i) => {
        const question = QUIZ_QUESTIONS[questionIndex];
        const questionCard = document.createElement('div');
        questionCard.className = 'quiz-question-card';
        questionCard.id = `question-${i}`;
        questionCard.style.display = 'none';
        
        questionCard.innerHTML = `
            <div class="quiz-question-label">${i + 1}. ${question}</div>
            <input type="range" id="slider-${i}" class="quiz-slider" min="1" max="5" value="3">
            <div class="slider-labels">
                <span>Strongly Disagree</span>
                <span>Neutral</span>
                <span>Strongly Agree</span>
            </div>
        `;
        
        container.appendChild(questionCard);
        
        // Add event listener for slider
        document.getElementById(`slider-${i}`).addEventListener('input', (e) => {
            quizState.answers[i] = parseInt(e.target.value);
        });
    });
}

function showQuestion(questionNum) {
    // Hide all questions
    quizState.selectedQuestions.forEach((_, i) => {
        const questionCard = document.getElementById(`question-${i}`);
        questionCard.style.display = 'none';
        questionCard.classList.remove('current');
    });
    
    // Show current question
    const currentCard = document.getElementById(`question-${questionNum}`);
    currentCard.style.display = 'block';
    currentCard.classList.add('current');
    
    // Update progress
    updateProgress();
    
    // Update navigation buttons
    updateNavigation();
    
    quizState.currentQuestion = questionNum;
}

function updateProgress() {
    const progress = ((quizState.currentQuestion + 1) / quizState.totalQuestions) * 100;
    document.getElementById('quiz-progress-fill').style.width = `${progress}%`;
    document.getElementById('current-question-num').textContent = quizState.currentQuestion + 1;
    document.getElementById('total-questions-num').textContent = quizState.totalQuestions;
}

function updateNavigation() {
    const prevBtn = document.getElementById('prev-question');
    const nextBtn = document.getElementById('next-question');
    const submitBtn = document.getElementById('submit-quiz');
    
    // Disable previous button on first question
    prevBtn.disabled = quizState.currentQuestion === 0;
    
    // Show submit button on last question (question 20, index 19)
    if (quizState.currentQuestion === quizState.totalQuestions - 1) {
        nextBtn.classList.add('hidden');
        submitBtn.classList.remove('hidden');
    } else {
        nextBtn.classList.remove('hidden');
        submitBtn.classList.add('hidden');
    }
    
    console.log('Current question:', quizState.currentQuestion + 1, 'of', quizState.totalQuestions);
}

function previousQuestion() {
    if (quizState.currentQuestion > 0) {
        showQuestion(quizState.currentQuestion - 1);
    }
}

function nextQuestion() {
    if (quizState.currentQuestion < quizState.totalQuestions - 1) {
        showQuestion(quizState.currentQuestion + 1);
    }
}

function submitQuiz() {
    // Calculate category scores
    const categoryScores = {};
    const categoryCounts = {};
    
    Object.keys(CAREER_CATEGORIES).forEach(category => {
        categoryScores[category] = 0;
        categoryCounts[category] = 0;
    });
    
    quizState.selectedQuestions.forEach((questionIndex, i) => {
        const category = quizState.questionCategoryMap[questionIndex];
        const answer = quizState.answers[i];
        
        categoryScores[category] += answer;
        categoryCounts[category] += 1;
    });
    
    // Normalize scores
    const normalizedScores = {};
    Object.keys(categoryScores).forEach(category => {
        if (categoryCounts[category] > 0) {
            normalizedScores[category] = categoryScores[category] / categoryCounts[category];
        } else {
            normalizedScores[category] = 0;
        }
    });
    
    // Find top careers
    const topCareers = findTopCareers(normalizedScores);
    
    // Show results
    showQuizResults(topCareers);
}

function findTopCareers(categoryScores) {
    const sortedCategories = Object.entries(categoryScores)
        .sort(([,a], [,b]) => b - a);
    
    const topCategory = sortedCategories[0][0];
    const secondCategory = sortedCategories[1][0];
    
    let suggestedCareers = [];
    
    // First priority: exact primary and secondary match
    Object.entries(CAREER_OPTIONS).forEach(([career, categories]) => {
        if (categories.primary === topCategory && categories.secondary === secondCategory) {
            suggestedCareers.push(career);
        }
    });
    
    // Second priority: primary category match
    if (suggestedCareers.length < 3) {
        Object.entries(CAREER_OPTIONS).forEach(([career, categories]) => {
            if (categories.primary === topCategory && !suggestedCareers.includes(career)) {
                suggestedCareers.push(career);
            }
        });
    }
    
    // Third priority: secondary category as primary
    if (suggestedCareers.length < 3) {
        Object.entries(CAREER_OPTIONS).forEach(([career, categories]) => {
            if (categories.primary === secondCategory && !suggestedCareers.includes(career)) {
                suggestedCareers.push(career);
            }
        });
    }
    
    // Fill remaining slots with any remaining careers
    if (suggestedCareers.length < 3) {
        const remainingCareers = Object.keys(CAREER_OPTIONS)
            .filter(career => !suggestedCareers.includes(career));
        shuffleArray(remainingCareers);
        suggestedCareers.push(...remainingCareers.slice(0, 3 - suggestedCareers.length));
    }
    
    return suggestedCareers.slice(0, 3);
}

function showQuizResults(careers) {
    document.getElementById('career-quiz-form-container').classList.add('hidden');
    document.getElementById('career-quiz-results').classList.remove('hidden');
    
    const resultsContainer = document.getElementById('quiz-results-cards');
    resultsContainer.innerHTML = '';
    
    careers.forEach((career, index) => {
        const careerInfo = CAREER_OPTIONS[career];
        const challenge = CAREER_CHALLENGES[career] || "Explore this exciting career path and discover the challenges that await!";
        
        const careerCard = document.createElement('div');
        careerCard.className = 'career-result-card';
        careerCard.innerHTML = `
            <div class="career-title">${career}</div>
            <div class="career-categories">${careerInfo.primary} • ${careerInfo.secondary}</div>
            <div class="career-challenge">
                <h5>💡 Real-World Challenge:</h5>
                <p>"${challenge}"</p>
            </div>
        `;
        
        resultsContainer.appendChild(careerCard);
        
        // Animate card appearance
        setTimeout(() => {
            careerCard.style.opacity = '0';
            careerCard.style.transform = 'translateY(20px)';
            careerCard.style.transition = 'all 0.6s ease';
            
            requestAnimationFrame(() => {
                careerCard.style.opacity = '1';
                careerCard.style.transform = 'translateY(0)';
            });
        }, index * 200);
    });
    
    // Scroll to results
    document.getElementById('career-quiz-results').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

function restartQuiz() {
    // Reset quiz state
    quizState.currentQuestion = 0;
    quizState.answers = new Array(quizState.totalQuestions).fill(3);
    
    // Select new random questions
    selectQuizQuestions();
    
    // Hide results and show welcome
    document.getElementById('career-quiz-results').classList.add('hidden');
    document.getElementById('career-quiz-welcome').classList.remove('hidden');
    
    // Scroll to top of quiz
    document.getElementById('career-quiz-welcome').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeQuiz();
    initializeGamifiedModules();
});

// Gamified Modules System
let gameState = {
    coins: 1250,
    modules: {
        'robotics': { progress: 75, completed: 3, total: 4, reward: 50, unlocked: true },
        'video': { progress: 40, completed: 2, total: 5, reward: 75, unlocked: true },
        'change': { progress: 100, completed: 4, total: 4, reward: 100, unlocked: true }
    },
    achievements: []
};

function initializeGamifiedModules() {
    // Add click handlers to module cards
    document.querySelectorAll('.game-module').forEach(module => {
        module.addEventListener('click', handleModuleClick);
        module.style.cursor = 'pointer';
    });
    
    // Update display
    updateCoinDisplay();
    updateModuleDisplays();
}

function handleModuleClick(event) {
    const moduleCard = event.currentTarget;
    const moduleTitle = moduleCard.querySelector('h4').textContent;
    
    let moduleKey = '';
    if (moduleTitle.includes('Robotics')) moduleKey = 'robotics';
    else if (moduleTitle.includes('Video')) moduleKey = 'video';
    else if (moduleTitle.includes('Change')) moduleKey = 'change';
    
    const module = gameState.modules[moduleKey];
    
    if (!module || !module.unlocked) {
        showNotification('🔒 This module is locked! Complete previous modules to unlock.', 'warning');
        return;
    }
    
    if (module.progress >= 100) {
        showNotification('✅ Module already completed! Great job!', 'success');
        return;
    }
    
    // Show module challenge
    showModuleChallenge(moduleKey, moduleTitle);
}

function showModuleChallenge(moduleKey, moduleTitle) {
    const module = gameState.modules[moduleKey];
    
    const challenges = {
        'robotics': {
            title: '🤖 Robotics Quest Challenge',
            description: 'Design a robot that can help students in your school!',
            task: 'Your challenge: Sketch a robot design and explain how it would help students with one specific task (like carrying books, finding classrooms, or organizing lockers). Include 3 key features your robot must have.',
            points: 50
        },
        'video': {
            title: '🎬 Video Creator Challenge',
            description: 'Create a short video about something you\'re passionate about!',
            task: 'Your challenge: Plan a 2-minute video on a topic you care about. Write a brief script outline with: opening hook, main message, and call to action. Bonus: Film and edit it!',
            points: 75
        },
        'change': {
            title: '🌍 Change Maker Challenge',
            description: 'Identify a problem in your community and propose a solution!',
            task: 'Your challenge: Choose a local issue (environment, education, community). Research it and create a 5-step action plan to make a positive impact.',
            points: 100
        }
    };
    
    const challenge = challenges[moduleKey];
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal module-challenge-modal';
    modal.innerHTML = `
        <div class="modal-content challenge-modal-content">
            <span class="close" onclick="closeModuleChallenge()">&times;</span>
            <div class="challenge-header">
                <h2>${challenge.title}</h2>
                <p class="challenge-description">${challenge.description}</p>
            </div>
            
            <div class="challenge-content">
                <div class="challenge-task">
                    <h3>📝 Your Mission:</h3>
                    <p>${challenge.task}</p>
                </div>
                
                <div class="challenge-rewards">
                    <h3>🎁 Rewards:</h3>
                    <div class="reward-items">
                        <div class="reward-item">
                            <span class="reward-icon">🪙</span>
                            <span class="reward-text">+${challenge.points} Ignite Coins</span>
                        </div>
                        <div class="reward-item">
                            <span class="reward-icon">📈</span>
                            <span class="reward-text">Module Progress +25%</span>
                        </div>
                        <div class="reward-item">
                            <span class="reward-icon">🏆</span>
                            <span class="reward-text">Achievement Badge</span>
                        </div>
                    </div>
                </div>
                
                <div class="challenge-actions">
                    <button class="challenge-btn secondary" onclick="closeModuleChallenge()">Maybe Later</button>
                    <button class="challenge-btn primary" onclick="completeChallenge('${moduleKey}')">Complete Challenge! 🚀</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'flex';
}

function closeModuleChallenge() {
    const modal = document.querySelector('.module-challenge-modal');
    if (modal) {
        modal.remove();
    }
}

function completeChallenge(moduleKey) {
    const module = gameState.modules[moduleKey];
    
    // Increase progress
    module.progress = Math.min(100, module.progress + 25);
    module.completed = Math.min(module.total, module.completed + 1);
    
    // Award coins
    const coinsEarned = Math.floor(module.reward / 4); // 25% of total reward per challenge
    gameState.coins += coinsEarned;
    
    // Close modal
    closeModuleChallenge();
    
    // Show success notification
    showNotification(`🎉 Challenge completed! +${coinsEarned} coins earned!`, 'success');
    
    // Update displays
    updateCoinDisplay();
    updateModuleDisplays();
    
    // Check for module completion
    if (module.progress >= 100) {
        setTimeout(() => {
            showNotification(`🏆 Module completed! You've mastered this skill!`, 'success');
            // Award completion bonus
            gameState.coins += 50;
            updateCoinDisplay();
        }, 1500);
    }
}

function updateCoinDisplay() {
    const coinDisplay = document.querySelector('.coin-count');
    if (coinDisplay) {
        // Animate coin change
        coinDisplay.style.transform = 'scale(1.1)';
        coinDisplay.style.color = '#f39c12';
        
        setTimeout(() => {
            coinDisplay.textContent = gameState.coins.toLocaleString();
            coinDisplay.style.transform = 'scale(1)';
        }, 200);
    }
}

function updateModuleDisplays() {
    const modules = document.querySelectorAll('.game-module');
    
    modules.forEach((moduleEl, index) => {
        const moduleKeys = ['robotics', 'video', 'change'];
        const moduleKey = moduleKeys[index];
        const module = gameState.modules[moduleKey];
        
        if (!module) return;
        
        // Update progress bar
        const progressBar = moduleEl.querySelector('.progress-fill-small');
        if (progressBar) {
            progressBar.style.width = `${module.progress}%`;
        }
        
        // Update progress text
        const progressText = moduleEl.querySelector('.module-progress span');
        if (progressText) {
            if (module.progress >= 100) {
                progressText.textContent = 'Completed! ✅';
                progressText.style.color = '#4caf50';
                progressText.style.fontWeight = 'bold';
            } else {
                progressText.textContent = `${module.completed}/${module.total} challenges`;
            }
        }
        
        // Update reward text
        const rewardText = moduleEl.querySelector('.module-reward');
        if (rewardText && module.progress >= 100) {
            rewardText.textContent = `🪙 +${module.reward} coins earned`;
            rewardText.style.color = '#4caf50';
        }
        
        // Add completion styling
        if (module.progress >= 100) {
            moduleEl.classList.add('completed');
        }
    });
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.game-notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `game-notification ${type}`;
    notification.innerHTML = `
        <span class="notification-message">${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 4000);
}

// Coin spending system
function openCoinShop() {
    const modal = document.createElement('div');
    modal.className = 'modal coin-shop-modal';
    modal.innerHTML = `
        <div class="modal-content shop-modal-content">
            <span class="close" onclick="closeCoinShop()">&times;</span>
            <div class="shop-header">
                <h2>🏪 Ignite Coin Shop</h2>
                <p>Your coins: <span class="shop-coin-display">${gameState.coins}</span> 🪙</p>
            </div>
            
            <div class="shop-items">
                <div class="shop-item">
                    <div class="item-icon">🎨</div>
                    <div class="item-info">
                        <h3>Avatar Upgrade Pack</h3>
                        <p>Unlock 5 new avatar styles</p>
                        <span class="item-price">250 🪙</span>
                    </div>
                    <button class="shop-btn" onclick="purchaseItem('avatar', 250)">Buy</button>
                </div>
                
                <div class="shop-item">
                    <div class="item-icon">📚</div>
                    <div class="item-info">
                        <h3>Study Boost</h3>
                        <p>Get hints for next 3 challenges</p>
                        <span class="item-price">150 🪙</span>
                    </div>
                    <button class="shop-btn" onclick="purchaseItem('boost', 150)">Buy</button>
                </div>
                
                <div class="shop-item">
                    <div class="item-icon">🌟</div>
                    <div class="item-info">
                        <h3>Premium Badge</h3>
                        <p>Show off your achievements</p>
                        <span class="item-price">500 🪙</span>
                    </div>
                    <button class="shop-btn" onclick="purchaseItem('badge', 500)">Buy</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'flex';
}

function closeCoinShop() {
    const modal = document.querySelector('.coin-shop-modal');
    if (modal) modal.remove();
}

function purchaseItem(item, price) {
    if (gameState.coins >= price) {
        gameState.coins -= price;
        updateCoinDisplay();
        
        const items = {
            'avatar': 'Avatar Upgrade Pack',
            'boost': 'Study Boost',
            'badge': 'Premium Badge'
        };
        
        showNotification(`🎉 You purchased ${items[item]}! Enjoy your new item!`, 'success');
        
        // Update shop display
        const shopCoinDisplay = document.querySelector('.shop-coin-display');
        if (shopCoinDisplay) {
            shopCoinDisplay.textContent = gameState.coins;
        }
    } else {
        showNotification('💰 Not enough coins! Complete more challenges to earn coins.', 'warning');
    }
}

// Add click handler to coin display
document.addEventListener('DOMContentLoaded', () => {
    const coinDisplay = document.querySelector('.coin-display');
    if (coinDisplay) {
        coinDisplay.addEventListener('click', openCoinShop);
        coinDisplay.style.cursor = 'pointer';
        coinDisplay.title = 'Click to open Coin Shop!';
    }
});

