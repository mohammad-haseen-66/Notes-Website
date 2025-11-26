// Quiz Answers
const quizAnswers = {
    // C/C++ Language Answers (shared topics)
    'intro': {
        'q1': 'b',  // Bjarne Stroustrup (C++) or Dennis Ritchie (C)
        'q2': 'b',  // 1979 (C++) or varies for C
        'q3': 'a',  // C with Classes (C++)
        'q4': 'b',  // <iostream> (C++) or <stdio.h> (C)
        'q5': 'b',  // Console Output
        'q6': 'b',  // << operator
        'q7': 'b',  // To avoid writing std:: prefix
        'q8': 'd',  // Multiple paradigms (C++)
        'q9': 'a',  // Standard Template Library
        'q10': 'c'  // Garbage Collection (not a C++ feature)
    },
    'variables': {
        'q1': 'b',  // 4 bytes
        'q2': 'b',  // char
        'q3': 'b',  // 8 bytes (double)
        'q4': 'b',  // const
        'q5': 'b',  // true and false
        'q6': 'a',  // double has more precision
        'q7': 'b',  // unsigned
        'q8': 'a',  // 1 byte
        'q9': 'c',  // int var_2;
        'q10': 'b'  // To force float type instead of double
    },
    'operators': {
        'q1': 'b',  // 1 (result of 10 % 3)
        'q2': 'b',  // ++a increments before use, a++ after use
        'q3': 'a',  // &&
        'q4': 'b',  // Adds and assigns
        'q5': 'b',  // a = 6, b = 5
        'q6': 'b',  // * (multiplication has higher precedence)
        'q7': 'b',  // 2 (integer division)
        'q8': 'b',  // ||
        'q9': 'b',  // Conditional expression
        'q10': 'b'  // false (!(5 > 3) = !true = false)
    },
    'control-flow': {
        'q1': 'c',
        'q2': 'b',
        'q3': 'a',
        'q4': 'b',
        'q5': 'b',
        'q6': 'b',
        'q7': 'a',
        'q8': 'b',
        'q9': 'a',
        'q10': 'b'
    },
    'functions': {
        'q1': 'b',
        'q2': 'b',
        'q3': 'b',
        'q4': 'b',
        'q5': 'c',
        'q6': 'b',
        'q7': 'b',
        'q8': 'b',
        'q9': 'b',
        'q10': 'a'
    },
    // C++ Specific Answers (overrides for C++ page)
    'oop': {
        'q1': 'b',
        'q2': 'b',
        'q3': 'b',
        'q4': 'b',
        'q5': 'b',
        'q6': 'b',
        'q7': 'a',
        'q8': 'b',
        'q9': 'b',
        'q10': 'a'
    },
    'templates': {
        'q1': 'b',
        'q2': 'a',
        'q3': 'd',
        'q4': 'b',
        'q5': 'b',
        'q6': 'a',
        'q7': 'b',
        'q8': 'b',
        'q9': 'b',
        'q10': 'b'
    },
    'stl': {
        'q1': 'a',
        'q2': 'b',
        'q3': 'b',
        'q4': 'b',
        'q5': 'a',
        'q6': 'c',
        'q7': 'b',
        'q8': 'b',
        'q9': 'c',
        'q10': 'a'
    },
    // Java Language Answers
    'java-intro': {
        'q1': 'b',  // James Gosling
        'q2': 'b',  // 1995
        'q3': 'b',  // Write Once, Run Anywhere
        'q4': 'a',  // Java Virtual Machine
        'q5': 'b',  // main() method
        'q6': 'b',  // Oracle
        'q7': 'b',  // .java
        'q8': 'b',  // Intermediate code executed by JVM
        'q9': 'a',  // Java Development Kit
        'q10': 'c'  // Both a and b
    },
    'java-variables': {
        'q1': 'b',  // 0
        'q2': 'b',  // char
        'q3': 'b',  // 64 bits
        'q4': 'b',  // int
        'q5': 'b',  // false
        'q6': 'b',  // -128 to 127
        'q7': 'c',  // Both L and l
        'q8': 'a',  // Converting one data type to another
        'q9': 'b',  // String
        'q10': 'b'  // 16 bits
    },
    'java-operators': {
        'q1': 'b',  // 1
        'q2': 'a',  // &&
        'q3': 'b',  // Adds and assigns
        'q4': 'b',  // a = 6, b = 5
        'q5': 'b',  // *
        'q6': 'b',  // 2
        'q7': 'b',  // ||
        'q8': 'b',  // Conditional expression
        'q9': 'b',  // false
        'q10': 'a'  // == compares references, equals() compares values
    },
    'java-control-flow': {
        'q1': 'c',  // do-while loop
        'q2': 'b',  // break
        'q3': 'a',  // 012
        'q4': 'b',  // Skips current iteration
        'q5': 'a',  // Yes (Java 7+)
        'q6': 'b',  // Executes when no case matches
        'q7': 'a',  // A loop inside another loop
        'q8': 'b',  // for loop
        'q9': 'a',  // for (type variable : array)
        'q10': 'b'  // Fall-through to next case
    },
    'java-methods': {
        'q1': 'b',  // void
        'q2': 'b',  // Methods with same name but different parameters
        'q3': 'a',  // Method belongs to the class
        'q4': 'c',  // Yes, using arrays or objects
        'q5': 'a',  // A method that calls itself
        'q6': 'b',  // public
        'q7': 'b',  // Passing copy of variable value
        'q8': 'b',  // No, parameters must differ
        'q9': 'a',  // Method name and parameters
        'q10': 'c'  // Both a and b
    },
    'java-oop': {
        'q1': 'b',  // A blueprint for objects
        'q2': 'b',  // extends
        'q3': 'a',  // Reference to current object
        'q4': 'b',  // Redefining method in subclass
        'q5': 'b',  // A special method that initializes objects
        'q6': 'c',  // Yes, through interfaces
        'q7': 'a',  // Bundling data and methods together
        'q8': 'b',  // Reference to parent class
        'q9': 'a',  // A class that cannot be instantiated
        'q10': 'a'  // Abstract class can have methods with body, interface cannot (Java 7)
    },
    'java-collections': {
        'q1': 'b',  // Set
        'q2': 'c',  // Map
        'q3': 'a',  // add()
        'q4': 'a',  // get()
        'q5': 'c',  // Both a and b
        'q6': 'c',  // LinkedHashSet
        'q7': 'b',  // 10
        'q8': 'a',  // List
        'q9': 'b',  // Hashtable is synchronized, HashMap is not
        'q10': 'b'  // TreeSet
    },
    'java-exceptions': {
        'q1': 'b',  // An event that disrupts normal program flow
        'q2': 'a',  // try-catch
        'q3': 'c',  // finally
        'q4': 'a',  // throw is used to throw exception, throws is used to declare exception
        'q5': 'b',  // ArithmeticException
        'q6': 'a',  // NullPointerException
        'q7': 'a',  // Exception checked at compile time
        'q8': 'b',  // Yes
        'q9': 'b',  // Throwable
        'q10': 'c'  // ArrayIndexOutOfBoundsException
    },
    // C Language specific topics
    'arrays': {
        'q1': 'b',
        'q2': 'b'
    },
    'pointers': {
        'q1': 'b',
        'q2': 'b'
    },
    'strings': {
        'q1': 'b',
        'q2': 'b'
    },
    'structures': {
        'q1': 'b',
        'q2': 'b'
    },
    'file-handling': {
        'q1': 'b',
        'q2': 'b'
    }
};

// Check Quiz Function
function checkQuiz(quizId) {
    const quiz = document.querySelector(`[data-quiz="${quizId}"]`);
    const questions = quiz.querySelectorAll('.quiz-question');
    const resultDiv = quiz.querySelector('.quiz-result');
    let correctAnswers = 0;
    let totalQuestions = questions.length;
    const answers = quizAnswers[quizId];

    questions.forEach((question, index) => {
        const questionNum = `q${index + 1}`;
        const selectedAnswer = question.querySelector(`input[name="${questionNum}"]:checked`);
        const correctAnswer = answers[questionNum];
        const labels = question.querySelectorAll('label');

        if (selectedAnswer) {
            if (selectedAnswer.value === correctAnswer) {
                correctAnswers++;
                labels.forEach(label => {
                    const radio = label.querySelector('input');
                    if (radio.value === correctAnswer) {
                        label.style.background = '#d1fae5';
                        label.style.color = '#065f46';
                    }
                });
            } else {
                labels.forEach(label => {
                    const radio = label.querySelector('input');
                    if (radio.value === correctAnswer) {
                        label.style.background = '#d1fae5';
                        label.style.color = '#065f46';
                    }
                    if (radio === selectedAnswer) {
                        label.style.background = '#fee2e2';
                        label.style.color = '#991b1b';
                    }
                });
            }
        } else {
            labels.forEach(label => {
                const radio = label.querySelector('input');
                if (radio.value === correctAnswer) {
                    label.style.background = '#d1fae5';
                    label.style.color = '#065f46';
                }
            });
        }
    });

    const percentage = (correctAnswers / totalQuestions) * 100;
    resultDiv.className = 'quiz-result';
    
    if (percentage === 100) {
        resultDiv.classList.add('correct');
        resultDiv.textContent = `🎉 Perfect! You got ${correctAnswers}/${totalQuestions} correct (100%)`;
    } else if (percentage >= 50) {
        resultDiv.classList.add('correct');
        resultDiv.textContent = `Good job! You got ${correctAnswers}/${totalQuestions} correct (${percentage.toFixed(0)}%)`;
    } else {
        resultDiv.classList.add('incorrect');
        resultDiv.textContent = `Keep practicing! You got ${correctAnswers}/${totalQuestions} correct (${percentage.toFixed(0)}%). Try again!`;
    }
}

// Smooth Scroll for Topic Links
document.addEventListener('DOMContentLoaded', function() {
    const topicLinks = document.querySelectorAll('.topic-link');
    const topicSections = document.querySelectorAll('.topic-section');

    topicLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                topicLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        topicSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        topicLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Load saved API key
    const savedApiKey = localStorage.getItem('judge0_api_key');
    if (savedApiKey) {
        document.getElementById('api-key').value = savedApiKey;
    }
});

// Save API Key
function saveApiKey() {
    const apiKey = document.getElementById('api-key').value.trim();
    if (apiKey) {
        localStorage.setItem('judge0_api_key', apiKey);
        alert('API key saved successfully!');
    } else {
        alert('Please enter a valid API key');
    }
}

// Run Code Function
async function runCode() {
    const code = document.getElementById('code-editor').value;
    const outputDiv = document.getElementById('output');
    const statusDiv = document.getElementById('status');
    const apiKey = localStorage.getItem('judge0_api_key') || document.getElementById('api-key').value.trim();

    if (!apiKey) {
        alert('Please enter your RapidAPI key first!');
        document.getElementById('api-key').focus();
        return;
    }

    if (!code.trim()) {
        alert('Please enter some code to run');
        return;
    }

    // Update status
    statusDiv.textContent = 'Running...';
    statusDiv.className = 'status-info loading';
    outputDiv.textContent = 'Compiling and running your code...\n';

    try {
        // Judge0 API endpoint (using RapidAPI)
        const response = await fetch('https://judge0-ce.p.rapidapi.com/submissions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
            },
            body: JSON.stringify({
                source_code: code,
                language_id: 50, // C language ID in Judge0
                stdin: '',
                cpu_time_limit: 5,
                memory_limit: 128000
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        const token = data.token;

        // Poll for results
        let result = null;
        let attempts = 0;
        const maxAttempts = 20;

        while (attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const resultResponse = await fetch(`https://judge0-ce.p.rapidapi.com/submissions/${token}`, {
                headers: {
                    'X-RapidAPI-Key': apiKey,
                    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
                }
            });

            if (!resultResponse.ok) {
                throw new Error(`Failed to get result: ${resultResponse.status}`);
            }

            result = await resultResponse.json();

            if (result.status.id > 2) { // Status 3 means finished
                break;
            }

            attempts++;
        }

        // Display results
        if (result.status.id === 3) {
            // Success
            statusDiv.textContent = 'Success';
            statusDiv.className = 'status-info success';
            
            let output = '';
            if (result.stdout) {
                output += result.stdout;
            }
            if (result.stderr) {
                output += '\n--- Errors/Warnings ---\n' + result.stderr;
            }
            if (result.compile_output) {
                output += '\n--- Compilation Output ---\n' + result.compile_output;
            }
            if (!output.trim()) {
                output = 'Program executed successfully (no output)';
            }
            outputDiv.textContent = output;
        } else if (result.status.id === 5) {
            // Time Limit Exceeded
            statusDiv.textContent = 'Time Limit Exceeded';
            statusDiv.className = 'status-info error';
            outputDiv.textContent = 'Your program took too long to execute.';
        } else if (result.status.id === 6) {
            // Compilation Error
            statusDiv.textContent = 'Compilation Error';
            statusDiv.className = 'status-info error';
            outputDiv.textContent = result.compile_output || 'Compilation failed.';
        } else if (result.status.id === 7) {
            // Runtime Error
            statusDiv.textContent = 'Runtime Error';
            statusDiv.className = 'status-info error';
            outputDiv.textContent = result.stderr || result.message || 'Runtime error occurred.';
        } else {
            statusDiv.textContent = `Status: ${result.status.description}`;
            statusDiv.className = 'status-info error';
            outputDiv.textContent = result.message || 'Unknown error occurred.';
        }
    } catch (error) {
        statusDiv.textContent = 'Error';
        statusDiv.className = 'status-info error';
        outputDiv.textContent = `Error: ${error.message}\n\nMake sure:\n1. Your API key is correct\n2. You have an active RapidAPI subscription\n3. Your code is valid C code`;
        console.error('Error running code:', error);
    }
}

// Clear Output
function clearOutput() {
    document.getElementById('output').textContent = '';
    document.getElementById('status').textContent = 'Ready';
    document.getElementById('status').className = 'status-info';
}

// Handle Enter key in API key input
document.addEventListener('DOMContentLoaded', function() {
    const apiKeyInput = document.getElementById('api-key');
    if (apiKeyInput) {
        apiKeyInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                saveApiKey();
            }
        });
    }

    // Initialize dark mode
    initDarkMode();
    
    // Initialize copy buttons for code blocks
    initCopyButtons();
});

// Dark Mode functionality
function initDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (darkModeToggle) {
            darkModeToggle.textContent = '☀️';
            darkModeToggle.setAttribute('aria-label', 'Switch to light mode');
        }
    }
    
    // Toggle dark mode
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            darkModeToggle.textContent = isDark ? '☀️' : '🌙';
            darkModeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        });
    }
}

// Copy Code functionality
function initCopyButtons() {
    // Find all code blocks and add copy buttons
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach((codeBlock, index) => {
        const pre = codeBlock.parentElement;
        
        // Skip if already has a copy button
        if (pre.querySelector('.copy-code-btn')) {
            return;
        }
        
        // Create wrapper if it doesn't exist
        let wrapper = pre.parentElement;
        if (!wrapper.classList.contains('code-block-wrapper')) {
            wrapper = document.createElement('div');
            wrapper.className = 'code-block-wrapper';
            pre.parentNode.insertBefore(wrapper, pre);
            wrapper.appendChild(pre);
        }
        
        // Create copy button
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-code-btn';
        copyBtn.innerHTML = '📋 Copy';
        copyBtn.setAttribute('aria-label', 'Copy code to clipboard');
        
        // Add click event
        copyBtn.addEventListener('click', function() {
            const text = codeBlock.textContent;
            copyToClipboard(text, copyBtn);
        });
        
        wrapper.appendChild(copyBtn);
    });
}

// Copy to clipboard function
function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(function() {
        const originalText = button.innerHTML;
        button.innerHTML = '✓ Copied!';
        button.classList.add('copied');
        
        setTimeout(function() {
            button.innerHTML = originalText;
            button.classList.remove('copied');
        }, 2000);
    }).catch(function(err) {
        console.error('Failed to copy text: ', err);
        button.innerHTML = '✗ Failed';
        setTimeout(function() {
            button.innerHTML = '📋 Copy';
        }, 2000);
    });
}

