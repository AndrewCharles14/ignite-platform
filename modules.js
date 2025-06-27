// JavaScript for Ignite Interactive Modules

// Make functions globally available immediately
function showTrackModules(track) {
    console.log('Showing track:', track);
    // Hide all sections first
    const allSections = document.querySelectorAll('section');
    allSections.forEach(section => section.classList.remove('active'));

    // Show the specific track modules section
    const trackSection = document.getElementById(`${track}-modules`);
    if (trackSection) {
        trackSection.classList.add('active');
        console.log('Track section found and shown:', track);
    } else {
        console.log('Track section not found:', track);
    }
}

function showSection(sectionId) {
    console.log('Showing section:', sectionId);
    const sections = document.querySelectorAll('section');
    sections.forEach(section => section.classList.remove('active'));

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        console.log('Section shown:', sectionId);
    } else {
        console.log('Section not found:', sectionId);
    }
}

function openModule(moduleId) {
    console.log('Opening module:', moduleId);
    const moduleData = getModuleData(moduleId);

    if (!moduleData) {
        alert('Module data not found for: ' + moduleId);
        return;
    }

    document.getElementById('current-module-title').textContent = moduleData.title;
    document.getElementById('current-module-description').textContent = moduleData.description;
    document.getElementById('module-coins-reward').textContent = `+${moduleData.coins} 🪙`;

    const lessonListEl = document.getElementById('lesson-list');
    lessonListEl.innerHTML = '';
    moduleData.lessons.forEach((lesson, index) => {
        const lessonItem = document.createElement('li');
        const lessonLink = document.createElement('a');
        lessonLink.textContent = lesson.title;
        lessonLink.href = '#';
        lessonLink.addEventListener('click', function(event) {
            event.preventDefault();
            loadLesson(moduleId, index);
        });
        if (lesson.completed) {
            lessonLink.classList.add('completed');
        }
        lessonItem.appendChild(lessonLink);
        lessonListEl.appendChild(lessonItem);
    });

    loadLesson(moduleId, 0);  // Load the first lesson by default
    showSection('module-content');
}

function backToModules() {
    showSection('module-selection');
}

// Set up when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Modules page loaded');
    // Show initial track selection
    showSection('module-selection');
});

function showTrackModules(track) {
    // Hide all sections first
    const allSections = document.querySelectorAll('section');
    allSections.forEach(section => section.classList.remove('active'));

    // Show the specific track modules section
    const trackSection = document.getElementById(`${track}-modules`);
    if (trackSection) {
        trackSection.classList.add('active');
    }
}

function openModule(moduleId) {
    const moduleData = getModuleData(moduleId);

    if (!moduleData) {
        alert('Module data not found!');
        return;
    }

    document.getElementById('current-module-title').textContent = moduleData.title;
    document.getElementById('current-module-description').textContent = moduleData.description;
    document.getElementById('module-coins-reward').textContent = `+${moduleData.coins} 🪙`;

    const lessonListEl = document.getElementById('lesson-list');
    lessonListEl.innerHTML = '';
    moduleData.lessons.forEach((lesson, index) => {
        const lessonItem = document.createElement('li');
        const lessonLink = document.createElement('a');
        lessonLink.textContent = lesson.title;
        lessonLink.href = '#';
        lessonLink.addEventListener('click', function(event) {
            event.preventDefault();
            loadLesson(moduleId, index);
        });
        if (lesson.completed) {
            lessonLink.classList.add('completed');
        }
        lessonItem.appendChild(lessonLink);
        lessonListEl.appendChild(lessonItem);
    });

    loadLesson(moduleId, 0);  // Load the first lesson by default
    showSection('module-content');
}

function loadLesson(moduleId, lessonIndex) {
    const moduleData = getModuleData(moduleId);
    const lessonData = moduleData.lessons[lessonIndex];

    if (!lessonData) {
        alert('Lesson data not found!');
        return;
    }

    const lessonArea = document.getElementById('lesson-area');
    lessonArea.innerHTML = `<div class="lesson-content-block">
        <h3>${lessonData.title}</h3>
        ${lessonData.content}
    </div>`;

    const prevButton = document.getElementById('prev-lesson');
    const nextButton = document.getElementById('next-lesson');
    const completeButton = document.getElementById('complete-lesson');

    if (lessonIndex > 0) {
        prevButton.disabled = false;
        prevButton.onclick = () => loadLesson(moduleId, lessonIndex - 1);
    } else {
        prevButton.disabled = true;
    }

    if (lessonIndex < moduleData.lessons.length - 1) {
        nextButton.style.display = 'inline';
        completeButton.style.display = 'none';
        nextButton.onclick = () => loadLesson(moduleId, lessonIndex + 1);
    } else {
        nextButton.style.display = 'none';
        completeButton.style.display = 'inline';
        completeButton.onclick = () => completeModuleLesson(moduleId, lessonIndex);
    }
}

function completeModuleLesson(moduleId, lessonIndex) {
    const moduleData = getModuleData(moduleId);
    moduleData.lessons[lessonIndex].completed = true;

    alert('Congratulations on completing this lesson!');
    loadLesson(moduleId, lessonIndex);
}

function getModuleData(moduleId) {
    const modules = {
        // STEM Track Modules
        'robotics-basics': {
            title: 'Robotics Basics',
            description: 'Learn fundamental robotics concepts and build your first robot',
            coins: 100,
            lessons: [
                { title: 'Introduction to Robotics', content: '<div class="lesson-content-block"><h4>What is Robotics?</h4><p>Robotics is an interdisciplinary branch of engineering that combines mechanical engineering, electrical engineering, computer science, and more. In this lesson, you\'ll learn the fundamentals of robotics and explore real-world applications.</p><ul><li>Understanding robot components</li><li>Types of robots</li><li>Applications in daily life</li></ul></div>', completed: true },
                { title: 'Building Your First Robot', content: '<div class="lesson-content-block"><h4>Hands-On Robot Building</h4><p>Time to get your hands dirty! In this lesson, you\'ll build a simple robot using basic components and learn about sensors, actuators, and programming.</p><div class="interactive-element"><h4>🛠️ Try This!</h4><p>Follow the step-by-step guide to assemble your robot kit and write your first robot program.</p></div></div>', completed: true }
            ]
        },
        'intro-coding': {
            title: 'Intro to Coding',
            description: 'Start your programming journey with Python basics',
            coins: 150,
            lessons: [
                { title: 'Getting Started with Python', content: '<div class="lesson-content-block"><h4>Welcome to Programming!</h4><p>Python is one of the most beginner-friendly programming languages. It\'s used everywhere from web development to artificial intelligence.</p><div class="code-block">print("Hello, World!")<br/>print("Welcome to Ignite!")</div><p>Try running this code in your Python environment!</p></div>', completed: false },
                { title: 'Variables and Data Types', content: '<div class="lesson-content-block"><h4>Storing Information</h4><p>Variables are like containers that store data. Python has several data types:</p><div class="code-block"># Numbers<br/>age = 16<br/>height = 5.8<br/><br/># Text (Strings)<br/>name = "Alex"<br/>school = "Ignite High"<br/><br/># Boolean (True/False)<br/>is_student = True</div></div>', completed: false },
                { title: 'Control Flow', content: '<div class="lesson-content-block"><h4>Making Decisions</h4><p>Control flow lets your program make decisions and repeat actions.</p><div class="code-block">grade = 85<br/><br/>if grade >= 90:<br/>    print("A - Excellent!")<br/>elif grade >= 80:<br/>    print("B - Good job!")<br/>else:<br/>    print("Keep trying!")</div></div>', completed: false },
                { title: 'Functions and Loops', content: '<div class="lesson-content-block"><h4>Organizing Your Code</h4><p>Functions help organize code into reusable blocks, and loops let you repeat actions.</p><div class="code-block">def greet_student(name):<br/>    return f"Hello, {name}! Welcome to Ignite!"<br/><br/>students = ["Alex", "Maya", "Jordan"]<br/>for student in students:<br/>    print(greet_student(student))</div></div>', completed: false },
                { title: 'Final Project', content: '<div class="lesson-content-block"><h4>🚀 Build Your First Program</h4><p>Apply everything you\'ve learned to create a simple calculator program!</p><div class="interactive-element"><h4>Project Challenge</h4><p>Create a calculator that can add, subtract, multiply, and divide two numbers. Use functions, variables, and control flow!</p></div></div>', completed: false }
            ]
        },
        // Arts Track Modules
        'graphic-design': {
            title: 'Graphic Design Basics',
            description: 'Learn design principles and create stunning visuals',
            coins: 120,
            lessons: [
                { title: 'Design Principles', content: '<div class="lesson-content-block"><h4>The Foundation of Good Design</h4><p>Every great design follows basic principles that make it effective and appealing.</p><ul><li><strong>Balance:</strong> Visual weight distribution</li><li><strong>Contrast:</strong> Making elements stand out</li><li><strong>Hierarchy:</strong> Guiding the viewer\'s eye</li><li><strong>Alignment:</strong> Creating order and organization</li></ul></div>', completed: false },
                { title: 'Color Theory', content: '<div class="lesson-content-block"><h4>The Psychology of Color</h4><p>Colors evoke emotions and convey messages. Learn how to use them effectively!</p><div class="interactive-element"><h4>🎨 Color Exercise</h4><p>Create a mood board using colors that represent different emotions: happiness, trust, excitement, and calm.</p></div></div>', completed: false },
                { title: 'Typography Basics', content: '<div class="lesson-content-block"><h4>The Art of Text</h4><p>Typography is more than just choosing fonts - it\'s about communication and mood.</p><ul><li>Serif vs Sans-serif fonts</li><li>Font pairing techniques</li><li>Readability and accessibility</li><li>Creating visual hierarchy with text</li></ul></div>', completed: false }
            ]
        },
        'video-production': {
            title: 'Video Production',
            description: 'Film, edit, and produce professional videos',
            coins: 150,
            lessons: [
                { title: 'Pre-Production Planning', content: '<div class="lesson-content-block"><h4>Planning Your Video</h4><p>Great videos start with great planning. Learn the essential pre-production steps.</p><ul><li>Scriptwriting and storyboarding</li><li>Equipment planning</li><li>Location scouting</li><li>Shot planning</li></ul></div>', completed: false },
                { title: 'Camera Techniques', content: '<div class="lesson-content-block"><h4>Filming Like a Pro</h4><p>Master the basics of camera work and shot composition.</p><div class="interactive-element"><h4>📹 Practice Exercise</h4><p>Film a 30-second video using these shot types: wide shot, medium shot, close-up, and extreme close-up.</p></div></div>', completed: false },
                { title: 'Editing Fundamentals', content: '<div class="lesson-content-block"><h4>Bringing It All Together</h4><p>Learn video editing techniques to create compelling stories.</p><ul><li>Basic cuts and transitions</li><li>Audio synchronization</li><li>Color correction</li><li>Adding music and effects</li></ul></div>', completed: false }
            ]
        },
        // Leadership Track Modules
        'community-organizing': {
            title: 'Community Organizing',
            description: 'Learn to mobilize people for positive change',
            coins: 140,
            lessons: [
                { title: 'Understanding Your Community', content: '<div class="lesson-content-block"><h4>Know Your Audience</h4><p>Effective organizing starts with understanding the people you want to help.</p><ul><li>Community mapping exercises</li><li>Identifying stakeholders</li><li>Understanding local issues</li><li>Building relationships</li></ul></div>', completed: false },
                { title: 'Building Coalitions', content: '<div class="lesson-content-block"><h4>Strength in Numbers</h4><p>Learn how to bring different groups together for a common cause.</p><div class="interactive-element"><h4>🤝 Challenge</h4><p>Identify three different groups in your community that might work together on a shared issue. Plan how you would approach each group.</p></div></div>', completed: false },
                { title: 'Campaign Strategy', content: '<div class="lesson-content-block"><h4>Planning for Success</h4><p>Develop strategic campaigns that create lasting change.</p><ul><li>Setting clear goals</li><li>Timeline development</li><li>Resource planning</li><li>Measuring success</li></ul></div>', completed: false }
            ]
        },
        // Additional locked modules (basic data)
        'data-science': {
            title: 'Data Science Fundamentals',
            description: 'Analyze data and create visualizations',
            coins: 200,
            lessons: [
                { title: 'Introduction to Data Science', content: '<div class="lesson-content-block"><h4>🔒 Module Locked</h4><p>Complete "Intro to Coding" to unlock this module and start learning about data analysis, statistics, and visualization.</p></div>', completed: false }
            ]
        },
        'podcasting': {
            title: 'Podcasting 101',
            description: 'Create engaging audio content and storytelling',
            coins: 130,
            lessons: [
                { title: 'Audio Storytelling', content: '<div class="lesson-content-block"><h4>The Power of Audio</h4><p>Learn how to tell compelling stories through audio content.</p><ul><li>Understanding your audience</li><li>Crafting engaging narratives</li><li>Using sound effects and music</li><li>Recording techniques</li></ul></div>', completed: false },
                { title: 'Recording Setup', content: '<div class="lesson-content-block"><h4>Setting Up Your Studio</h4><p>Create a professional recording environment on any budget.</p><div class="interactive-element"><h4>🎙️ Practice</h4><p>Record a 2-minute practice episode introducing yourself and your interests.</p></div></div>', completed: false }
            ]
        },
        'policy-writing': {
            title: 'Policy Writing',
            description: 'Draft effective policies that create change',
            coins: 180,
            lessons: [
                { title: 'Understanding Policy', content: '<div class="lesson-content-block"><h4>What is Policy?</h4><p>Policies are rules and guidelines that govern how organizations and governments operate.</p><ul><li>Types of policies</li><li>Policy impact on communities</li><li>The policy-making process</li><li>Stakeholder involvement</li></ul></div>', completed: false },
                { title: 'Research and Analysis', content: '<div class="lesson-content-block"><h4>Evidence-Based Policy</h4><p>Learn to research and analyze information to support policy recommendations.</p><div class="interactive-element"><h4>📊 Research Task</h4><p>Choose a local issue and research existing policies, their effectiveness, and potential improvements.</p></div></div>', completed: false }
            ]
        },
        'civic-engagement': {
            title: 'Civic Engagement',
            description: 'Understand government and democratic participation',
            coins: 130,
            lessons: [
                { title: 'How Government Works', content: '<div class="lesson-content-block"><h4>Understanding the System</h4><p>Learn about different levels of government and how they affect your daily life.</p><ul><li>Local government</li><li>State government</li><li>Federal government</li><li>How laws are made</li></ul></div>', completed: false },
                { title: 'Your Voice Matters', content: '<div class="lesson-content-block"><h4>Ways to Get Involved</h4><p>Discover how you can participate in democracy, even before you can vote.</p><div class="interactive-element"><h4>🗳️ Action Plan</h4><p>Create a plan for getting involved in a local issue you care about.</p></div></div>', completed: false }
            ]
        }
    };

    return modules[moduleId];
}

function backToModules() {
    showSection('module-selection');
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => section.classList.remove('active'));

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

