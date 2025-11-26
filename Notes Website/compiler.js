// Compiler Modal Functionality
// Constants
const DEFAULT_API_KEY = '2cb1e74a5amsh9f983a682930776p1105dcjsnb5f9af6baef6';

document.addEventListener('DOMContentLoaded', function() {
    initCompilerModal();
    loadSavedCompilerData();
});

// Initialize Compiler Modal
function initCompilerModal() {
    const compilerBtn = document.getElementById('compiler-btn');
    const compilerModal = document.getElementById('compiler-modal');
    const closeBtn = document.getElementById('close-compiler');

    if (compilerBtn && compilerModal) {
        compilerBtn.addEventListener('click', function() {
            compilerModal.classList.add('show');
            document.body.style.overflow = 'hidden';
            
            // Auto-save default API key if not already saved (hidden from user)
            if (!localStorage.getItem('judge0_api_key')) {
                localStorage.setItem('judge0_api_key', DEFAULT_API_KEY);
            }
        });
    }

    if (closeBtn && compilerModal) {
        closeBtn.addEventListener('click', function() {
            closeCompilerModal();
        });
    }

    // Close modal when clicking outside
    if (compilerModal) {
        compilerModal.addEventListener('click', function(e) {
            if (e.target === compilerModal) {
                closeCompilerModal();
            }
        });
    }

    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && compilerModal && compilerModal.classList.contains('show')) {
            closeCompilerModal();
        }
    });
}

function closeCompilerModal() {
    const compilerModal = document.getElementById('compiler-modal');
    if (compilerModal) {
        compilerModal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Language names for OneCompiler API
const languageNames = {
    'c': 'c',
    'cpp': 'cpp',
    'java': 'java',
    'python': 'python',
    'javascript': 'nodejs'
};

// Current selected language (default: C)
let currentLanguage = 'c';

// Code Templates for different languages
const codeTemplates = {
    c: {
        hello: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
        calculator: `#include <stdio.h>

int main() {
    float num1, num2, result;
    char operator;
    
    printf("Enter first number: ");
    scanf("%f", &num1);
    
    printf("Enter operator (+, -, *, /): ");
    scanf(" %c", &operator);
    
    printf("Enter second number: ");
    scanf("%f", &num2);
    
    switch(operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if(num2 != 0) {
                result = num1 / num2;
            } else {
                printf("Error: Division by zero!\\n");
                return 1;
            }
            break;
        default:
            printf("Error: Invalid operator!\\n");
            return 1;
    }
    
    printf("Result: %.2f\\n", result);
    return 0;
}`,
        array: `#include <stdio.h>

int main() {
    int arr[5] = {10, 20, 30, 40, 50};
    int i, sum = 0;
    
    printf("Array elements: ");
    for(i = 0; i < 5; i++) {
        printf("%d ", arr[i]);
        sum += arr[i];
    }
    
    printf("\\nSum of array elements: %d\\n", sum);
    printf("Average: %.2f\\n", sum / 5.0);
    
    return 0;
}`,
        pointer: `#include <stdio.h>

int main() {
    int num = 10;
    int *ptr = &num;
    
    printf("Value of num: %d\\n", num);
    printf("Address of num: %p\\n", (void*)&num);
    printf("Value of ptr: %p\\n", (void*)ptr);
    printf("Value pointed by ptr: %d\\n", *ptr);
    
    *ptr = 20;
    printf("\\nAfter changing value through pointer:\\n");
    printf("Value of num: %d\\n", num);
    
    return 0;
}`
    },
    cpp: {
        hello: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
        calculator: `#include <iostream>
using namespace std;

int main() {
    float num1, num2, result;
    char operator;
    
    cout << "Enter first number: ";
    cin >> num1;
    
    cout << "Enter operator (+, -, *, /): ";
    cin >> operator;
    
    cout << "Enter second number: ";
    cin >> num2;
    
    switch(operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if(num2 != 0) {
                result = num1 / num2;
            } else {
                cout << "Error: Division by zero!" << endl;
                return 1;
            }
            break;
        default:
            cout << "Error: Invalid operator!" << endl;
            return 1;
    }
    
    cout << "Result: " << result << endl;
    return 0;
}`,
        oop: `#include <iostream>
using namespace std;

class Student {
private:
    string name;
    int age;
    
public:
    Student(string n, int a) {
        name = n;
        age = a;
    }
    
    void display() {
        cout << "Name: " << name << ", Age: " << age << endl;
    }
};

int main() {
    Student s1("John", 20);
    s1.display();
    return 0;
}`
    },
    java: {
        hello: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
        calculator: `import java.util.Scanner;

public class Calculator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter first number: ");
        double num1 = scanner.nextDouble();
        
        System.out.print("Enter operator (+, -, *, /): ");
        char operator = scanner.next().charAt(0);
        
        System.out.print("Enter second number: ");
        double num2 = scanner.nextDouble();
        
        double result = 0;
        switch(operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                if(num2 != 0) {
                    result = num1 / num2;
                } else {
                    System.out.println("Error: Division by zero!");
                    return;
                }
                break;
            default:
                System.out.println("Error: Invalid operator!");
                return;
        }
        
        System.out.println("Result: " + result);
    }
}`,
        oop: `class Student {
    private String name;
    private int age;
    
    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public void display() {
        System.out.println("Name: " + name + ", Age: " + age);
    }
}

public class Main {
    public static void main(String[] args) {
        Student s1 = new Student("John", 20);
        s1.display();
    }
}`
    },
    python: {
        hello: `print("Hello, World!")`,
        calculator: `num1 = float(input("Enter first number: "))
operator = input("Enter operator (+, -, *, /): ")
num2 = float(input("Enter second number: "))

if operator == '+':
    result = num1 + num2
elif operator == '-':
    result = num1 - num2
elif operator == '*':
    result = num1 * num2
elif operator == '/':
    if num2 != 0:
        result = num1 / num2
    else:
        print("Error: Division by zero!")
        exit()
else:
    print("Error: Invalid operator!")
    exit()

print(f"Result: {result}")`,
        list: `numbers = [10, 20, 30, 40, 50]
print("List elements:", numbers)
print("Sum:", sum(numbers))
print("Average:", sum(numbers) / len(numbers))`,
        oop: `class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def display(self):
        print(f"Name: {self.name}, Age: {self.age}")

s1 = Student("John", 20)
s1.display()`
    },
    javascript: {
        hello: `console.log("Hello, World!");`,
        calculator: `const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter first number: ', (num1) => {
    rl.question('Enter operator (+, -, *, /): ', (operator) => {
        rl.question('Enter second number: ', (num2) => {
            num1 = parseFloat(num1);
            num2 = parseFloat(num2);
            let result;
            
            switch(operator) {
                case '+':
                    result = num1 + num2;
                    break;
                case '-':
                    result = num1 - num2;
                    break;
                case '*':
                    result = num1 * num2;
                    break;
                case '/':
                    if(num2 !== 0) {
                        result = num1 / num2;
                    } else {
                        console.log("Error: Division by zero!");
                        rl.close();
                        return;
                    }
                    break;
                default:
                    console.log("Error: Invalid operator!");
                    rl.close();
                    return;
            }
            
            console.log("Result: " + result);
            rl.close();
        });
    });
});`,
        array: `const numbers = [10, 20, 30, 40, 50];
console.log("Array elements:", numbers);
const sum = numbers.reduce((a, b) => a + b, 0);
console.log("Sum:", sum);
console.log("Average:", sum / numbers.length);`,
        oop: `class Student {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    display() {
        console.log(\`Name: \${this.name}, Age: \${this.age}\`);
    }
}

const s1 = new Student("John", 20);
s1.display();`
    }
};

// Get file name for language
function getFileNameForLanguage(lang) {
    const fileNames = {
        'c': 'main.c',
        'cpp': 'main.cpp',
        'java': 'Main.java',
        'python': 'main.py',
        'javascript': 'index.js'
    };
    return fileNames[lang] || 'main.c';
}

// Set Language
function setCompilerLanguage(lang) {
    currentLanguage = lang;
    const langSelect = document.getElementById('compiler-language');
    if (langSelect) {
        langSelect.value = lang;
    }
    updateStatus('Language: ' + lang.toUpperCase(), 'ready');
}


// Load Code Template
function loadCodeTemplate(templateName) {
    const editor = document.getElementById('compiler-code-editor');
    if (editor && codeTemplates[currentLanguage] && codeTemplates[currentLanguage][templateName]) {
        editor.value = codeTemplates[currentLanguage][templateName];
        updateStatus('Template loaded: ' + templateName, 'ready');
    } else if (editor && codeTemplates['c'] && codeTemplates['c'][templateName]) {
        // Fallback to C templates
        editor.value = codeTemplates['c'][templateName];
        updateStatus('Template loaded: ' + templateName, 'ready');
    }
}

// Clear Compiler Code
function clearCompilerCode() {
    const editor = document.getElementById('compiler-code-editor');
    const input = document.getElementById('compiler-input');
    if (editor) {
        editor.value = '';
    }
    if (input) {
        input.value = '';
    }
    updateStatus('Code cleared', 'ready');
}

// Save Compiler Code
function saveCompilerCode() {
    const editor = document.getElementById('compiler-code-editor');
    if (editor) {
        const code = editor.value;
        localStorage.setItem('compiler_saved_code', code);
        updateStatus('Code saved successfully', 'success');
        
        // Show temporary message
        setTimeout(() => {
            updateStatus('Ready', 'ready');
        }, 2000);
    }
}

// Load Compiler Code
function loadCompilerCode() {
    const editor = document.getElementById('compiler-code-editor');
    const savedCode = localStorage.getItem('compiler_saved_code');
    if (editor && savedCode) {
        editor.value = savedCode;
        updateStatus('Code loaded successfully', 'success');
        setTimeout(() => {
            updateStatus('Ready', 'ready');
        }, 2000);
    } else {
        updateStatus('No saved code found', 'error');
        setTimeout(() => {
            updateStatus('Ready', 'ready');
        }, 2000);
    }
}

// Load Saved Compiler Data
function loadSavedCompilerData() {
    const editor = document.getElementById('compiler-code-editor');
    const savedCode = localStorage.getItem('compiler_saved_code');
    if (editor && savedCode) {
        editor.value = savedCode;
    }
}

// API key is now managed automatically (hidden from UI for security)
// The API key is stored securely in the background and auto-loaded

// Clear Compiler Output
function clearCompilerOutput() {
    const output = document.getElementById('compiler-output');
    if (output) {
        output.textContent = '';
    }
    updateStatus('Output cleared', 'ready');
    setTimeout(() => {
        updateStatus('Ready', 'ready');
    }, 1000);
}

// Download Compiler Output
function downloadCompilerOutput() {
    const output = document.getElementById('compiler-output');
    if (output && output.textContent.trim()) {
        const blob = new Blob([output.textContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'compiler_output.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        updateStatus('Output downloaded', 'success');
        setTimeout(() => {
            updateStatus('Ready', 'ready');
        }, 2000);
    } else {
        updateStatus('No output to download', 'error');
        setTimeout(() => {
            updateStatus('Ready', 'ready');
        }, 2000);
    }
}

// Update Status
function updateStatus(message, type) {
    const status = document.getElementById('compiler-status');
    if (status) {
        status.textContent = message;
        status.className = 'status-badge ' + type;
    }
}

// Run Compiler Code
async function runCompilerCode() {
    const editor = document.getElementById('compiler-code-editor');
    const input = document.getElementById('compiler-input');
    const output = document.getElementById('compiler-output');
    
    if (!editor || !output) {
        console.error('Compiler elements not found!');
        return;
    }
    
    const code = editor.value.trim();
    const stdin = input ? input.value : '';
    // API key is stored securely (hidden from UI)
    const apiKey = localStorage.getItem('judge0_api_key') || DEFAULT_API_KEY;
    
    // Debug logging
    console.log('=== Compiler Run Debug ===');
    console.log('Code length:', code.length);
    console.log('API Key found:', apiKey ? 'Yes (' + apiKey.length + ' chars)' : 'No');
    console.log('Language:', currentLanguage, 'Name:', languageNames[currentLanguage]);
    console.log('========================');

    if (!apiKey) {
        updateStatus('Error: API configuration issue', 'error');
        output.textContent = 'Error: API key not configured. Please contact administrator.';
        console.error('API key not found in storage');
        return;
    }

    if (!code) {
        updateStatus('Error: No code', 'error');
        output.textContent = 'Error: Please enter some code to run!';
        return;
    }

    // Update status
    updateStatus('Running...', 'running');
    output.textContent = 'Compiling and running your code...\nPlease wait...\n';

    try {
        // OneCompiler API endpoint (using RapidAPI)
        const languageName = languageNames[currentLanguage] || 'c';
        const fileName = getFileNameForLanguage(currentLanguage);
        
        const response = await fetch('https://onecompiler-apis.p.rapidapi.com/api/v1/run', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': 'onecompiler-apis.p.rapidapi.com'
            },
            body: JSON.stringify({
                language: languageName,
                stdin: stdin,
                files: [{
                    name: fileName,
                    content: code
                }]
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            let errorDetails = `API Error: ${response.status} - ${response.statusText}`;
            
            // Parse error response
            try {
                const errorJson = JSON.parse(errorText);
                if (errorJson.message) {
                    errorDetails += `\nMessage: ${errorJson.message}`;
                }
                if (errorJson.error) {
                    errorDetails += `\nError: ${errorJson.error}`;
                }
            } catch (e) {
                // If not JSON, use the text as is
                if (errorText) {
                    errorDetails += `\nDetails: ${errorText}`;
                }
            }
            
            // Show alert for critical errors
            if (response.status === 401 || response.status === 403) {
                alert(`❌ Authentication Failed!\n\nStatus: ${response.status}\n\nYour API key may be:\n- Invalid or expired\n- Not subscribed to OneCompiler API\n- Incorrect format\n\nPlease check your RapidAPI subscription at:\nhttps://rapidapi.com/onecompiler/api/onecompiler-apis`);
            } else if (response.status === 429) {
                alert(`⚠️ Rate Limit Exceeded!\n\nYou have used all your free API requests.\nPlease wait a few minutes or upgrade your RapidAPI plan.`);
            }
            
            throw new Error(errorDetails);
        }

        const data = await response.json();
        
        // OneCompiler API returns results directly (no polling needed)
        updateStatus('Success', 'success');
        
        // Reset output styling for success
        output.style.color = '';
        output.style.fontWeight = '';
        
        let outputText = '';
        
        // OneCompiler response structure
        if (data.stdout) {
            outputText += data.stdout;
        }
        if (data.stderr) {
            outputText += '\n--- Errors/Warnings ---\n' + data.stderr;
        }
        if (data.exception) {
            outputText += '\n--- Exception ---\n' + data.exception;
        }
        if (!outputText.trim()) {
            outputText = 'Program executed successfully (no output)';
        }
        
        // Add execution info if available
        if (data.executionTime) {
            outputText += `\n\n--- Execution Info ---\nTime: ${data.executionTime}ms\n`;
        }
        
        output.textContent = outputText;
    } catch (error) {
        updateStatus('❌ API Error', 'error');
        let errorMessage = `═══════════════════════════════════\n`;
        errorMessage += `❌ API ERROR OCCURRED\n`;
        errorMessage += `═══════════════════════════════════\n\n`;
        errorMessage += `Error Details:\n${error.message}\n\n`;
        
        // More detailed error information
        if (error.message.includes('401') || error.message.includes('403')) {
            errorMessage += `🔴 AUTHENTICATION FAILED\n`;
            errorMessage += `─────────────────────────────────\n`;
            errorMessage += `Possible causes:\n`;
            errorMessage += `• Your API key is invalid or expired\n`;
            errorMessage += `• You don't have an active RapidAPI subscription\n`;
            errorMessage += `• API key format is incorrect\n`;
            errorMessage += `• You haven't subscribed to Judge0 API\n\n`;
            errorMessage += `✅ SOLUTION:\n`;
            errorMessage += `1. Go to: https://rapidapi.com/onecompiler/api/onecompiler-apis\n`;
            errorMessage += `2. Subscribe to the API (Free tier available)\n`;
            errorMessage += `3. Copy your API key from RapidAPI dashboard\n`;
            errorMessage += `4. Paste it here and click "Save Key"\n`;
        } else if (error.message.includes('429')) {
            errorMessage += `⚠️ RATE LIMIT EXCEEDED\n`;
            errorMessage += `─────────────────────────────────\n`;
            errorMessage += `You have used all your free API requests.\n\n`;
            errorMessage += `✅ SOLUTION:\n`;
            errorMessage += `• Wait 5-10 minutes and try again\n`;
            errorMessage += `• Or upgrade your RapidAPI plan\n`;
        } else if (error.message.includes('Network') || error.message.includes('Failed to fetch')) {
            errorMessage += `🌐 NETWORK ERROR\n`;
            errorMessage += `─────────────────────────────────\n`;
            errorMessage += `Possible causes:\n`;
            errorMessage += `• No internet connection\n`;
            errorMessage += `• API service is temporarily down\n`;
            errorMessage += `• Firewall blocking the request\n\n`;
            errorMessage += `✅ SOLUTION:\n`;
            errorMessage += `• Check your internet connection\n`;
            errorMessage += `• Try again in a few minutes\n`;
        } else {
            errorMessage += `🔧 TROUBLESHOOTING STEPS:\n`;
            errorMessage += `─────────────────────────────────\n`;
            errorMessage += `1. Verify your RapidAPI key is correct\n`;
            errorMessage += `2. Ensure you're subscribed to OneCompiler API\n`;
            errorMessage += `3. Check your code syntax\n`;
            errorMessage += `4. Verify your internet connection\n`;
            errorMessage += `5. Try refreshing the page\n`;
            errorMessage += `6. Check browser console (F12) for details\n`;
        }
        
        errorMessage += `\n═══════════════════════════════════\n`;
        errorMessage += `DEBUG INFO:\n`;
        errorMessage += `─────────────────────────────────\n`;
        errorMessage += `API Key: ${apiKey ? '✅ Found (' + apiKey.length + ' chars)' : '❌ Not found'}\n`;
        errorMessage += `Language: ${currentLanguage.toUpperCase()} (${languageNames[currentLanguage] || 'unknown'})\n`;
        errorMessage += `Code Length: ${code.length} characters\n`;
        errorMessage += `═══════════════════════════════════\n`;
        
        output.textContent = errorMessage;
        output.style.color = '#ef4444'; // Red color for errors
        output.style.fontWeight = 'bold';
        
        console.error('═══════════════════════════════════');
        console.error('❌ COMPILER ERROR');
        console.error('═══════════════════════════════════');
        console.error('Error:', error);
        console.error('API Key:', apiKey ? apiKey.substring(0, 15) + '...' : 'Not found');
        console.error('API Key Length:', apiKey ? apiKey.length : 0);
        console.error('Language:', currentLanguage, 'Name:', languageNames[currentLanguage]);
        console.error('Code Length:', code.length);
        console.error('Full Error:', error.message);
        console.error('═══════════════════════════════════');
    }
}

