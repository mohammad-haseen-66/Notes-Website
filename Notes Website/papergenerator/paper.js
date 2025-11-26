// Configuration
const GEMINI_API_KEY = "API KEY";
const GEMINI_API_URL = "API URL";

// State Management
let currentQuestionPaper = null;
let currentSolutions = null;
let questionCount = 0;

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeEventListeners();
    loadSavedData();
});

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('.theme-icon');
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Event Listeners
function initializeEventListeners() {
    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    // Form submission
    document.getElementById('questionForm').addEventListener('submit', handleQuestionPaperGeneration);
    
    // Solution generation
    document.getElementById('generateSolutionsBtn').addEventListener('click', handleSolutionGeneration);
    
    // Answer form
    document.getElementById('showAnswerFormBtn').addEventListener('click', showAnswerForm);
    document.getElementById('hideAnswerFormBtn').addEventListener('click', hideAnswerForm);
    document.getElementById('answerForm').addEventListener('submit', handleAnswerSubmission);
    
    // Navigation
    document.getElementById('backToFormBtn').addEventListener('click', backToForm);
    document.getElementById('hideSolutionsBtn').addEventListener('click', hideSolutions);
    document.getElementById('hideResultsBtn').addEventListener('click', hideResults);
}

// Toast Notifications
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    toast.innerHTML = `
        <span class="toast-icon">${icons[type] || icons.info}</span>
        <span>${message}</span>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

// Loading States
function showLoading(button = null) {
    document.getElementById('loadingOverlay').style.display = 'flex';
    if (button) {
        const btnText = button.querySelector('.btn-text');
        const btnLoader = button.querySelector('.btn-loader');
        if (btnText) btnText.style.display = 'none';
        if (btnLoader) btnLoader.style.display = 'inline-block';
        button.disabled = true;
    }
}

function hideLoading(button = null) {
    document.getElementById('loadingOverlay').style.display = 'none';
    if (button) {
        const btnText = button.querySelector('.btn-text');
        const btnLoader = button.querySelector('.btn-loader');
        if (btnText) btnText.style.display = 'inline';
        if (btnLoader) btnLoader.style.display = 'none';
        button.disabled = false;
    }
}

// Gemini API Integration
async function callGeminiAPI(prompt) {
    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'API request failed');
        }

        const data = await response.json();
        
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
            throw new Error('Invalid response from API');
        }

        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('Gemini API Error:', error);
        throw error;
    }
}

// Question Paper Generation
async function handleQuestionPaperGeneration(e) {
    e.preventDefault();
    
    const formData = {
        subject: document.getElementById('subject').value,
        totalMarks: document.getElementById('totalMarks').value,
        difficulty: document.getElementById('difficulty').value,
        pattern: document.getElementById('pattern').value,
        topics: document.getElementById('topics').value,
        instructions: document.getElementById('instructions').value
    };

    const generateBtn = document.getElementById('generateBtn');
    showLoading(generateBtn);

    try {
        const prompt = generateQuestionPaperPrompt(formData);
        const response = await callGeminiAPI(prompt);
        
        currentQuestionPaper = response;
        questionCount = extractQuestionCount(response);
        
        // Render question paper
        renderQuestionPaper(response);
        
        // Show paper section
        document.getElementById('formSection').style.display = 'none';
        document.getElementById('paperSection').style.display = 'block';
        
        // Save to localStorage
        saveQuestionPaper(response, formData);
        
        showToast('Question paper generated successfully!', 'success');
    } catch (error) {
        showToast(`Error generating question paper: ${error.message}`, 'error');
        console.error('Generation error:', error);
    } finally {
        hideLoading(generateBtn);
    }
}

function generateQuestionPaperPrompt(formData) {
    return `Generate a comprehensive question paper for ${formData.subject} programming language.

Requirements:
- Total Marks: ${formData.totalMarks}
- Difficulty Level: ${formData.difficulty}
- Question Paper Pattern: ${formData.pattern}
${formData.topics ? `- Focus Topics: ${formData.topics}` : ''}
${formData.instructions ? `- Additional Instructions: ${formData.instructions}` : ''}

Please generate a well-structured question paper with:
1. Clear question numbering
2. Appropriate mark distribution
3. Questions suitable for ${formData.difficulty} difficulty level
4. Format suitable for ${formData.pattern} pattern

Format the output in Markdown with proper headings, sections, and formatting. Include:
- A title/header
- Instructions for students
- All questions with their respective marks
- Clear structure and organization

Make sure the total marks add up to ${formData.totalMarks}.`;
}

function extractQuestionCount(markdown) {
    const questionMatches = markdown.match(/(?:Question|Q)\s*\d+/gi);
    return questionMatches ? questionMatches.length : 0;
}

function renderQuestionPaper(markdown) {
    const paperContent = document.getElementById('paperContent');
    const html = marked.parse(markdown);
    paperContent.innerHTML = html;
}

// Solution Generation
async function handleSolutionGeneration() {
    if (!currentQuestionPaper) {
        showToast('Please generate a question paper first!', 'warning');
        return;
    }

    const generateSolutionsBtn = document.getElementById('generateSolutionsBtn');
    showLoading(generateSolutionsBtn);

    try {
        const prompt = generateSolutionPrompt(currentQuestionPaper);
        const response = await callGeminiAPI(prompt);
        
        currentSolutions = response;
        renderSolutions(response);
        
        document.getElementById('solutionsSection').style.display = 'block';
        showToast('Solutions generated successfully!', 'success');
        
        // Save solutions
        saveSolutions(response);
    } catch (error) {
        showToast(`Error generating solutions: ${error.message}`, 'error');
        console.error('Solution generation error:', error);
    } finally {
        hideLoading(generateSolutionsBtn);
    }
}

function generateSolutionPrompt(questionPaper) {
    return `Based on the following question paper, provide detailed step-by-step solutions for all questions.

Question Paper:
${questionPaper}

Please provide:
1. Complete solutions for each question
2. Step-by-step explanations where applicable
3. Code examples with proper formatting if needed
4. Clear and concise answers
5. Proper markdown formatting

Format the solutions clearly with proper headings and structure.`;
}

function renderSolutions(markdown) {
    const solutionsContent = document.getElementById('solutionsContent');
    const html = marked.parse(markdown);
    solutionsContent.innerHTML = html;
}

// Answer Form Management
let actualQuestionCount = 0;

function showAnswerForm() {
    if (!currentQuestionPaper) {
        showToast('Please generate a question paper first!', 'warning');
        return;
    }

    const answerInputs = document.getElementById('answerInputs');
    answerInputs.innerHTML = '';

    // Extract questions from markdown
    const questions = extractQuestions(currentQuestionPaper);
    actualQuestionCount = questions.length; // Store the actual number of questions
    
    questions.forEach((question, index) => {
        const answerItem = document.createElement('div');
        answerItem.className = 'answer-item';
        answerItem.innerHTML = `
            <h3>Question ${index + 1}</h3>
            <div class="question-preview">${marked.parse(question.questionText)}</div>
            <label for="answer-${index}">Your Answer:</label>
            <textarea id="answer-${index}" name="answer-${index}" required placeholder="Enter your answer here..."></textarea>
        `;
        answerInputs.appendChild(answerItem);
    });

    document.getElementById('answerSection').style.display = 'block';
    document.getElementById('paperSection').style.scrollIntoView({ behavior: 'smooth' });
}

function extractQuestions(markdown) {
    const questions = [];
    // Split by question markers
    const questionPattern = /(?:Question|Q)\s*\d+[.:]?\s*(.*?)(?=(?:Question|Q)\s*\d+|$)/gis;
    let match;
    
    while ((match = questionPattern.exec(markdown)) !== null) {
        questions.push({
            questionText: match[1].trim()
        });
    }
    
    // Fallback: if no questions found, create one input
    if (questions.length === 0) {
        questions.push({
            questionText: 'Please provide your answers for all questions.'
        });
    }
    
    return questions;
}

function hideAnswerForm() {
    document.getElementById('answerSection').style.display = 'none';
}

// Answer Evaluation
async function handleAnswerSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const answers = [];
    
    // Collect all answers from the DOM (more reliable than using questionCount)
    const answerInputs = document.querySelectorAll('#answerInputs textarea[id^="answer-"]');
    
    answerInputs.forEach((input, index) => {
        const answerText = input.value.trim();
        if (answerText) { // Only include non-empty answers
            // Extract question number from the input's ID or use index + 1
            const questionNum = parseInt(input.id.replace('answer-', '')) + 1;
            answers.push({
                questionNumber: questionNum,
                answer: answerText
            });
        }
    });

    // Check if at least one answer is provided
    if (answers.length === 0) {
        showToast('Please fill at least one answer!', 'warning');
        return;
    }

    const submitAnswersBtn = document.getElementById('submitAnswersBtn');
    showLoading(submitAnswersBtn);

    try {
        const prompt = generateEvaluationPrompt(currentQuestionPaper, answers, currentSolutions);
        const response = await callGeminiAPI(prompt);
        
        const evaluation = parseEvaluationResponse(response);
        renderResults(evaluation, answers);
        
        document.getElementById('resultsSection').style.display = 'block';
        document.getElementById('answerSection').style.display = 'none';
        
        // Scroll to results
        document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });
        
        showToast('Answers evaluated successfully!', 'success');
        
        // Save results
        saveResults(evaluation);
    } catch (error) {
        showToast(`Error evaluating answers: ${error.message}`, 'error');
        console.error('Evaluation error:', error);
    } finally {
        hideLoading(submitAnswersBtn);
    }
}

function generateEvaluationPrompt(questionPaper, answers, solutions) {
    let prompt = `Evaluate the following student answers against the question paper and provide detailed feedback.

Question Paper:
${questionPaper}

${solutions ? `Reference Solutions:\n${solutions}\n\n` : ''}

Student Answers:
${answers.map(a => `Question ${a.questionNumber}:\n${a.answer}`).join('\n\n')}

Please provide:
1. For each question:
   - Correctness status (Correct/Incorrect/Partially Correct)
   - Marks awarded (out of total marks for that question)
   - Detailed explanation or correction
   - Feedback on what was done well and what needs improvement

2. Overall Performance Summary:
   - Total Score (sum of all marks)
   - Percentage (based on total marks)
   - Grade (A: 90-100%, B: 80-89%, C: 70-79%, D: 60-69%, F: Below 60%)
   - Overall remarks and feedback

Format the response in Markdown with clear sections. Use the following structure:

## Performance Summary
- Total Score: [X]/[Total Marks]
- Percentage: [X]%
- Grade: [Grade]
- Remarks: [Feedback]

## Question-wise Evaluation

### Question 1
- Status: [Correct/Incorrect/Partially Correct]
- Marks: [X]/[Total]
- Explanation: [Detailed feedback]`;
    
    return prompt;
}

function parseEvaluationResponse(response) {
    // Try to extract structured data from markdown response
    const evaluation = {
        summary: {
            totalScore: 0,
            totalMarks: 0,
            percentage: 0,
            grade: 'N/A',
            remarks: ''
        },
        questions: []
    };

    // Extract summary
    const summaryMatch = response.match(/##\s*Performance Summary([\s\S]*?)(?=##|$)/i);
    if (summaryMatch) {
        const summaryText = summaryMatch[1];
        const scoreMatch = summaryText.match(/Total Score:\s*(\d+)\/(\d+)/i);
        const percentageMatch = summaryText.match(/Percentage:\s*(\d+(?:\.\d+)?)%/i);
        const gradeMatch = summaryText.match(/Grade:\s*([A-F])/i);
        const remarksMatch = summaryText.match(/Remarks:\s*(.+?)(?=\n|$)/i);

        if (scoreMatch) {
            evaluation.summary.totalScore = parseInt(scoreMatch[1]);
            evaluation.summary.totalMarks = parseInt(scoreMatch[2]);
        }
        if (percentageMatch) {
            evaluation.summary.percentage = parseFloat(percentageMatch[1]);
        }
        if (gradeMatch) {
            evaluation.summary.grade = gradeMatch[1];
        }
        if (remarksMatch) {
            evaluation.summary.remarks = remarksMatch[1].trim();
        }
    }

    // Extract question evaluations
    const questionPattern = /###\s*Question\s*(\d+)([\s\S]*?)(?=###|$)/gi;
    let match;
    while ((match = questionPattern.exec(response)) !== null) {
        const questionNum = parseInt(match[1]);
        const questionText = match[2];
        
        const statusMatch = questionText.match(/Status:\s*(Correct|Incorrect|Partially Correct)/i);
        const marksMatch = questionText.match(/Marks:\s*(\d+)\/(\d+)/i);
        const explanationMatch = questionText.match(/Explanation:\s*([\s\S]+?)(?=\n\n|$)/i);

        evaluation.questions.push({
            questionNumber: questionNum,
            status: statusMatch ? statusMatch[1] : 'Unknown',
            marks: marksMatch ? parseInt(marksMatch[1]) : 0,
            totalMarks: marksMatch ? parseInt(marksMatch[2]) : 0,
            explanation: explanationMatch ? explanationMatch[1].trim() : questionText.trim()
        });
    }

    // If parsing failed, create a fallback evaluation
    if (evaluation.questions.length === 0) {
        evaluation.summary.remarks = response;
        evaluation.questions.push({
            questionNumber: 1,
            status: 'Unknown',
            marks: 0,
            totalMarks: 0,
            explanation: response
        });
    }

    return evaluation;
}

function renderResults(evaluation, answers) {
    const resultsContent = document.getElementById('resultsContent');
    
    let html = `
        <div class="performance-summary">
            <h2>Performance Summary</h2>
            <div class="score-display">${evaluation.summary.totalScore}/${evaluation.summary.totalMarks}</div>
            <div class="grade-display">Grade: ${evaluation.summary.grade}</div>
            <div class="percentage-display">${evaluation.summary.percentage}%</div>
            <div class="remarks-display">${evaluation.summary.remarks || 'Keep practicing!'}</div>
        </div>
    `;

    // Question-wise results
    if (evaluation.questions.length > 0) {
        html += '<h2>Question-wise Evaluation</h2>';
        evaluation.questions.forEach((q, index) => {
            const statusClass = q.status.toLowerCase().replace(' ', '-');
            html += `
                <div class="question-result ${statusClass}">
                    <div class="result-header">
                        <h3>Question ${q.questionNumber}</h3>
                        <span class="result-status ${statusClass}">${q.status}</span>
                    </div>
                    <div class="result-marks">Marks: ${q.marks}/${q.totalMarks}</div>
                    <div class="result-explanation">${marked.parse(q.explanation)}</div>
                </div>
            `;
        });
    } else {
        // Fallback: show full response
        html += `<div class="result-explanation">${marked.parse(evaluation.summary.remarks || 'Evaluation completed.')}</div>`;
    }

    resultsContent.innerHTML = html;
}

// Navigation Functions
function backToForm() {
    document.getElementById('formSection').style.display = 'block';
    document.getElementById('paperSection').style.display = 'none';
    document.getElementById('solutionsSection').style.display = 'none';
    document.getElementById('answerSection').style.display = 'none';
    document.getElementById('resultsSection').style.display = 'none';
    document.getElementById('formSection').scrollIntoView({ behavior: 'smooth' });
}

function hideSolutions() {
    document.getElementById('solutionsSection').style.display = 'none';
}

function hideResults() {
    document.getElementById('resultsSection').style.display = 'none';
}

// LocalStorage Management
function saveQuestionPaper(paper, formData) {
    const data = {
        paper,
        formData,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('lastQuestionPaper', JSON.stringify(data));
}

function saveSolutions(solutions) {
    const data = localStorage.getItem('lastQuestionPaper');
    if (data) {
        const parsed = JSON.parse(data);
        parsed.solutions = solutions;
        localStorage.setItem('lastQuestionPaper', JSON.stringify(parsed));
    }
}

function saveResults(results) {
    const data = localStorage.getItem('lastQuestionPaper');
    if (data) {
        const parsed = JSON.parse(data);
        parsed.results = results;
        localStorage.setItem('lastQuestionPaper', JSON.stringify(parsed));
    }
}

function loadSavedData() {
    const saved = localStorage.getItem('lastQuestionPaper');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            // Optionally restore last session
            // This can be enhanced to show a "Continue last session" option
        } catch (e) {
            console.error('Error loading saved data:', e);
        }
    }
}


