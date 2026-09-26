// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display =
            navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Quiz functionality
function startQuiz(quizType) {
    const quizzes = {
        general: {
            title: 'General Knowledge Quiz',
            questions: [
                {
                    question: 'What is the capital of France?',
                    options: ['London', 'Paris', 'Berlin', 'Madrid'],
                    correct: 1
                },
                {
                    question: 'Who wrote Romeo and Juliet?',
                    options: [
                        'Charles Dickens',
                        'William Shakespeare',
                        'Jane Austen',
                        'Mark Twain'
                    ],
                    correct: 1
                },
                {
                    question: 'What is the largest planet in our solar system?',
                    options: ['Saturn', 'Neptune', 'Jupiter', 'Earth'],
                    correct: 2
                }
            ]
        },

        coding: {
            title: 'Coding Challenge',
            questions: [
                {
                    question: 'What does HTML stand for?',
                    options: [
                        'Hyper Text Markup Language',
                        'High Tech Modern Language',
                        'Home Tool Markup Language',
                        'Hyperlinks and Text Markup Language'
                    ],
                    correct: 0
                },
                {
                    question: 'Which of these is NOT a programming language?',
                    options: [
                        'Python',
                        'JavaScript',
                        'CSS',
                        'HTML (it is markup language)'
                    ],
                    correct: 3
                }
            ]
        },

        leadership: {
            title: 'Leadership Assessment',
            questions: [
                {
                    question: 'When faced with a difficult decision, do you:',
                    options: [
                        'Ask for advice from everyone',
                        'Make a decision quickly',
                        'Research and analyze options',
                        'Avoid making the decision'
                    ],
                    correct: 2
                }
            ]
        },

        money: {
            title: 'Financial Literacy Quiz',
            questions: [
                {
                    question: 'What is compound interest?',
                    options: [
                        'Interest on interest earned',
                        'Double your money',
                        'No interest at all',
                        'High interest rates'
                    ],
                    correct: 0
                },
                {
                    question: 'What should you include in a budget?',
                    options: [
                        'Income and expenses',
                        'Only expenses',
                        'Only income',
                        'Random amounts'
                    ],
                    correct: 0
                }
            ]
        }
    };

    const quiz = quizzes[quizType];

    if (!quiz) {
        alert('Quiz not found!');
        return;
    }

    let currentQuestion = 0;
    let score = 0;

    function showQuestion() {
        if (currentQuestion < quiz.questions.length) {
            const question = quiz.questions[currentQuestion];

            const options = question.options
                .map(
                    (option, index) =>
                        `<button onclick="selectAnswer(${index})" style="display: block; width: 100%; margin: 10px 0; padding: 10px; text-align: left; background: #f0f0f0; border: 1px solid #ccc; border-radius: 5px; cursor: pointer;">
                            ${option}
                        </button>`
                )
                .join('');

            alert(
                `Question ${currentQuestion + 1}: ${question.question}\n\nSelect an answer from the buttons below.`
            );

            // Note: alert() is used here for simplicity.
            // In production, you'd use a proper modal.
        } else {
            showResults();
        }
    }

    function selectAnswer(index) {
        const question = quiz.questions[currentQuestion];

        if (index === question.correct) {
            score++;
        }

        currentQuestion++;
        showQuestion();
    }

    function showResults() {
        const percentage = Math.round(
            (score / quiz.questions.length) * 100
        );

        alert(
            `Quiz Complete!\n\nYour Score: ${score}/${quiz.questions.length}\nPercentage: ${percentage}%\n\nGreat job! Keep learning!`
        );
    }

    // Make selectAnswer accessible to the inline buttons
    window.selectAnswer = selectAnswer;

    showQuestion();
}

// Event registration
function registerEvent(eventType) {
    const events = {
        web: 'Web Development Workshop',
        leadership: 'Youth Leadership Conference',
        bootcamp: 'Entrepreneurship Bootcamp',
        arts: 'Creative Arts Festival'
    };

    const eventName = events[eventType];

    alert(
        `✅ Thank you for registering for ${eventName}!\n\nWe'll send you a confirmation email with details soon.\n\nCheck your inbox and spam folder.`
    );
}

// Privacy modal functionality
function openPrivacyModal() {
    const modal = document.getElementById('privacyModal');

    if (modal) {
        modal.style.display = 'block';
    }
}

function closePrivacyModal() {
    const modal = document.getElementById('privacyModal');

    if (modal) {
        modal.style.display = 'none';
    }
}

// Click privacy link in footer
document.addEventListener('DOMContentLoaded', () => {
    const privacyLink = document.getElementById('privacy');

    if (privacyLink) {
        privacyLink.addEventListener('click', (e) => {
            e.preventDefault();
            openPrivacyModal();
        });
    }
});

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    const modal = document.getElementById('privacyModal');

    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

// Newsletter subscription
document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.querySelector('.email-input');

    const subscribeBtn = Array.from(
        document.querySelectorAll('.btn-small')
    ).find(btn => btn.textContent.includes('Subscribe'));

    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', () => {
            const email = emailInput.value.trim();

            if (email && email.includes('@')) {
                alert(
                    `✅ Thanks for subscribing, ${email}!\n\nWe'll send you weekly tips and opportunities.`
                );

                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    document
        .querySelectorAll('.card, .skill-card, .event-card')
        .forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition =
                'opacity 0.5s ease, transform 0.5s ease';

            observer.observe(el);
        });
});
