// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Initialize all interactive features
    initializeComplianceAssessment();
    initializeComplianceChecklist();
    initializeContactForm();
    initializeSmoothScrolling();
});

// Data Privacy Act Compliance Assessment
function initializeComplianceAssessment() {
    const assessmentForm = document.getElementById('dpaAssessment');
    const resultSection = document.getElementById('assessmentResult');
    const resultContent = document.getElementById('resultContent');
    
    if (assessmentForm) {
        assessmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(assessmentForm);
            const answers = {
                q1: formData.get('q1'), // Collects personal information
                q2: formData.get('q2'), // 20+ employees
                q3: formData.get('q3'), // Sensitive information
                q4: formData.get('q4')  // Online services
            };
            
            // Check if all questions are answered
            if (Object.values(answers).some(answer => !answer)) {
                alert('Please answer all questions to get your compliance assessment.');
                return;
            }
            
            const assessment = assessComplianceLevel(answers);
            displayAssessmentResult(assessment, resultSection, resultContent);
        });
    }
}

function assessComplianceLevel(answers) {
    let riskScore = 0;
    let requirements = [];
    let recommendations = [];
    
    // Score calculation based on answers
    if (answers.q1 === 'yes') {
        riskScore += 3;
        requirements.push('Data Privacy Act compliance is mandatory for your business');
    }
    
    if (answers.q2 === 'yes') {
        riskScore += 2;
        requirements.push('You must appoint a Data Protection Officer (DPO)');
        requirements.push('Employee training on data privacy is required');
    }
    
    if (answers.q3 === 'yes') {
        riskScore += 3;
        requirements.push('Enhanced security measures for sensitive data');
        requirements.push('Mandatory registration with National Privacy Commission');
        requirements.push('Regular privacy impact assessments');
    }
    
    if (answers.q4 === 'yes') {
        riskScore += 2;
        requirements.push('Privacy notice on website/app required');
        requirements.push('Cookie policy implementation');
        requirements.push('Secure data transmission protocols');
    }
    
    // Determine compliance level
    let level, levelClass, description;
    
    if (riskScore >= 8) {
        level = 'High Compliance Required';
        levelClass = 'high-compliance';
        description = 'Your business has significant data privacy obligations under the Data Privacy Act.';
        recommendations = [
            'Conduct immediate privacy audit',
            'Implement comprehensive data protection policies',
            'Register with National Privacy Commission within 30 days',
            'Appoint qualified Data Protection Officer',
            'Provide mandatory staff training',
            'Implement technical and organizational security measures'
        ];
    } else if (riskScore >= 5) {
        level = 'Medium Compliance Required';
        levelClass = 'medium-compliance';
        description = 'Your business needs to implement several data privacy measures.';
        recommendations = [
            'Develop privacy policies and procedures',
            'Implement basic security measures',
            'Consider appointing a Data Protection Officer',
            'Provide staff awareness training',
            'Review current data processing activities'
        ];
    } else if (riskScore >= 2) {
        level = 'Basic Compliance Required';
        levelClass = 'low-compliance';
        description = 'Your business has limited data privacy obligations but should still implement basic protections.';
        recommendations = [
            'Create basic privacy policy',
            'Implement data security measures',
            'Train staff on data handling',
            'Monitor changes in business activities'
        ];
    } else {
        level = 'Minimal Compliance Required';
        levelClass = 'low-compliance';
        description = 'Your business may have minimal data privacy obligations, but it\'s good practice to implement basic protections.';
        recommendations = [
            'Maintain awareness of data privacy best practices',
            'Monitor business growth and changes',
            'Consider basic security measures'
        ];
    }
    
    return {
        level,
        levelClass,
        description,
        requirements,
        recommendations,
        score: riskScore
    };
}

function displayAssessmentResult(assessment, resultSection, resultContent) {
    // Create result HTML
    const resultHTML = `
        <div class="compliance-level ${assessment.levelClass}">
            <strong>${assessment.level}</strong>
        </div>
        <p>${assessment.description}</p>
        
        ${assessment.requirements.length > 0 ? `
            <div class="requirements-section">
                <h5><i class="fas fa-exclamation-triangle"></i> Legal Requirements:</h5>
                <ul>
                    ${assessment.requirements.map(req => `<li>${req}</li>`).join('')}
                </ul>
            </div>
        ` : ''}
        
        <div class="recommendations-section">
            <h5><i class="fas fa-lightbulb"></i> Recommended Actions:</h5>
            <ul>
                ${assessment.recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
        </div>
        
        <div class="next-steps">
            <h5><i class="fas fa-arrow-right"></i> Next Steps:</h5>
            <p>Use the compliance checklist below to track your progress in implementing these requirements.</p>
            <button onclick="scrollToChecklist()" class="btn btn-primary">View Compliance Checklist</button>
        </div>
        
        <div class="disclaimer">
            <p><em><i class="fas fa-info-circle"></i> This assessment is for informational purposes only. Consult with legal professionals for specific compliance advice tailored to your business.</em></p>
        </div>
    `;
    
    resultContent.innerHTML = resultHTML;
    resultSection.style.display = 'block';
    
    // Scroll to result
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Compliance Checklist Functionality
function initializeComplianceChecklist() {
    const checklistItems = document.querySelectorAll('.checklist-item input[type="checkbox"]');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    if (checklistItems.length > 0) {
        // Load saved progress from localStorage
        loadChecklistProgress();
        
        checklistItems.forEach(item => {
            item.addEventListener('change', function() {
                updateChecklistProgress();
                saveChecklistProgress();
                
                // Add visual feedback
                const listItem = this.closest('.checklist-item');
                if (this.checked) {
                    listItem.classList.add('completed');
                    // Add celebration animation
                    listItem.style.animation = 'fadeInUp 0.5s ease-out';
                } else {
                    listItem.classList.remove('completed');
                    listItem.style.animation = '';
                }
            });
        });
        
        // Initial progress calculation
        updateChecklistProgress();
    }
}

function updateChecklistProgress() {
    const checklistItems = document.querySelectorAll('.checklist-item input[type="checkbox"]');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    const totalItems = checklistItems.length;
    const completedItems = document.querySelectorAll('.checklist-item input[type="checkbox"]:checked').length;
    const percentage = Math.round((completedItems / totalItems) * 100);
    
    if (progressFill && progressText) {
        progressFill.style.width = percentage + '%';
        progressText.textContent = percentage + '% Complete';
        
        // Change color based on progress
        if (percentage === 100) {
            progressFill.style.background = 'linear-gradient(90deg, #4caf50, #8bc34a)';
            progressText.style.color = '#2e7d32';
            
            // Show completion message
            showCompletionMessage();
        } else if (percentage >= 75) {
            progressFill.style.background = 'linear-gradient(90deg, #2196f3, #64b5f6)';
        } else if (percentage >= 50) {
            progressFill.style.background = 'linear-gradient(90deg, #ff9800, #ffb74d)';
        } else {
            progressFill.style.background = 'linear-gradient(90deg, #f44336, #ef5350)';
        }
    }
}

function saveChecklistProgress() {
    const checklistItems = document.querySelectorAll('.checklist-item input[type="checkbox"]');
    const progress = {};
    
    checklistItems.forEach(item => {
        progress[item.id] = item.checked;
    });
    
    localStorage.setItem('complianceProgress', JSON.stringify(progress));
}

function loadChecklistProgress() {
    const savedProgress = localStorage.getItem('complianceProgress');
    
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        
        Object.keys(progress).forEach(itemId => {
            const item = document.getElementById(itemId);
            if (item) {
                item.checked = progress[itemId];
                const listItem = item.closest('.checklist-item');
                if (progress[itemId]) {
                    listItem.classList.add('completed');
                }
            }
        });
    }
}

function showCompletionMessage() {
    // Check if message already shown
    if (document.querySelector('.completion-message')) return;
    
    const checklistSection = document.querySelector('.checklist-section');
    const completionMessage = document.createElement('div');
    completionMessage.className = 'completion-message';
    completionMessage.innerHTML = `
        <div style="background: #e8f5e8; border: 2px solid #4caf50; border-radius: 10px; padding: 2rem; margin-top: 2rem; text-align: center;">
            <i class="fas fa-trophy" style="font-size: 3rem; color: #4caf50; margin-bottom: 1rem;"></i>
            <h4 style="color: #2e7d32; margin-bottom: 1rem;">Congratulations!</h4>
            <p style="color: #2e7d32;">You've completed all compliance checklist items. Your business is on track for Data Privacy Act compliance!</p>
            <p style="color: #666; font-size: 0.9rem; margin-top: 1rem;"><em>Remember to regularly review and update your compliance measures.</em></p>
        </div>
    `;
    
    checklistSection.appendChild(completionMessage);
}

// Contact Form Functionality
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name') || contactForm.querySelector('input[type="text"]').value;
            const email = formData.get('email') || contactForm.querySelector('input[type="email"]').value;
            const company = formData.get('company') || contactForm.querySelectorAll('input[type="text"]')[1]?.value || '';
            const message = formData.get('message') || contactForm.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission
            submitContactForm(name, email, company, message);
        });
    }
}

function submitContactForm(name, email, company, message) {
    // Show loading state
    const submitButton = document.querySelector('.contact-form button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        showFormSuccessMessage();
        
        // Reset form
        document.querySelector('.contact-form').reset();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

function showFormSuccessMessage() {
    const contactForm = document.querySelector('.contact-form');
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success-message';
    successMessage.innerHTML = `
        <div style="background: #e8f5e8; border: 2px solid #4caf50; border-radius: 10px; padding: 1.5rem; margin-bottom: 2rem; text-align: center;">
            <i class="fas fa-check-circle" style="font-size: 2rem; color: #4caf50; margin-bottom: 1rem;"></i>
            <h4 style="color: #2e7d32; margin-bottom: 0.5rem;">Message Sent Successfully!</h4>
            <p style="color: #2e7d32; margin: 0;">We'll get back to you within 24 hours.</p>
        </div>
    `;
    
    contactForm.parentNode.insertBefore(successMessage, contactForm);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

// Smooth Scrolling for Navigation Links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility Functions
function scrollToChecklist() {
    const checklist = document.querySelector('.checklist-section');
    if (checklist) {
        const offsetTop = checklist.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#fff';
        navbar.style.backdropFilter = 'none';
    }
});

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.law-card, .resource-card, .tool-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    animateOnScroll();
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        assessComplianceLevel,
        updateChecklistProgress
    };
} 