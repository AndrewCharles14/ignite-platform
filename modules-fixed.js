// Clean JavaScript for Ignite Interactive Modules

console.log('Loading modules.js');

// Global functions for navigation
function showTrackModules(track) {
    console.log('Showing track:', track);
    
    // Hide all sections
    const allSections = document.querySelectorAll('section');
    allSections.forEach(section => section.classList.remove('active'));

    // Show the specific track modules section
    const trackSection = document.getElementById(track + '-modules');
    if (trackSection) {
        trackSection.classList.add('active');
        console.log('Successfully showed track:', track);
    } else {
        console.error('Track section not found:', track + '-modules');
    }
}

function showSection(sectionId) {
    console.log('Showing section:', sectionId);
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => section.classList.remove('active'));

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        console.log('Successfully showed section:', sectionId);
    } else {
        console.error('Section not found:', sectionId);
    }
}

function openModule(moduleId) {
    console.log('Opening module:', moduleId);
    alert('Module clicked: ' + moduleId + '. Full functionality coming soon!');
}

function backToModules() {
    console.log('Back to modules');
    showSection('module-selection');
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing modules page');
    showSection('module-selection');
});

console.log('modules.js loaded successfully');
