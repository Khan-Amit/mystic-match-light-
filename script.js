// ===== APP STATE =====
let forecastCount = parseInt(localStorage.getItem('forecastCount')) || 0;
let matchCount = parseInt(localStorage.getItem('matchCount')) || 0;
let energyLevels = ['Low', 'Medium', 'High'];
let currentEnergy = energyLevels[Math.floor(Math.random() * 3)];

// ===== NUMEROLOGY DATA =====
const numerologyData = {
    numbers: {
        1: { element: "Wood", traits: "Creative, growing, ambitious" },
        2: { element: "Earth", traits: "Stable, nurturing, patient" },
        3: { element: "Fire", traits: "Passionate, energetic, charismatic" },
        4: { element: "Wood", traits: "Strong, rooted, reliable" },
        5: { element: "Earth", traits: "Adventurous, free, versatile" },
        6: { element: "Metal", traits: "Organized, precise, responsible" },
        7: { element: "Metal", traits: "Mystical, deep, analytical" },
        8: { element: "Earth", traits: "Prosperous, powerful, successful" },
        9: { element: "Fire", traits: "Humanitarian, wise, compassionate" }
    },
    
    dailyForecasts: [
        "Today is perfect for starting new projects!",
        "Focus on communication - express your ideas clearly.",
        "Unexpected opportunities may come your way.",
        "Take time for self-reflection and meditation.",
        "Your creativity is at its peak - use it!",
        "Be open to learning from others today.",
        "Balance work and rest for optimal energy.",
        "Financial matters may require attention.",
        "Help someone in need - good karma returns.",
        "Trust your intuition today."
    ],
    
    elements: {
        "Wood": { color: "#4CAF50", emoji: "🌳" },
        "Fire": { color: "#FF5722", emoji: "🔥" },
        "Earth": { color: "#795548", emoji: "🪨" },
        "Metal": { color: "#9E9E9E", emoji: "⚙️" }
    }
};

// ===== DOM ELEMENTS =====
const elements = {
    dailyNumber: document.getElementById('dailyNumber'),
    dailyElement: document.getElementById('dailyElement'),
    dailyForecastText: document.getElementById('dailyForecastText'),
    currentDate: document.getElementById('currentDate'),
    forecastCount: document.getElementById('forecastCount'),
    matchCount: document.getElementById('matchCount'),
    energyLevel: document.getElementById('energyLevel'),
    refreshDailyBtn: document.getElementById('refreshDailyBtn'),
    calculateNumberBtn: document.getElementById('calculateNumberBtn'),
    matchBtn: document.getElementById('matchBtn'),
    shareAppBtn: document.getElementById('shareAppBtn'),
    aboutBtn: document.getElementById('aboutBtn'),
    resetBtn: document.getElementById('resetBtn'),
    toast: document.getElementById('toast')
};

// ===== UTILITY FUNCTIONS =====
function showToast(message) {
    elements.toast.textContent = message;
    elements.toast.classList.add('show');
    setTimeout(() => {
        elements.toast.classList.remove('show');
    }, 3000);
}

function getRandomNumber() {
    return Math.floor(Math.random() * 9) + 1;
}

function updateDailyForecast() {
    // Generate random number for today
    const todayNumber = getRandomNumber();
    const numberData = numerologyData.numbers[todayNumber];
    
    // Update display
    elements.dailyNumber.textContent = todayNumber;
    elements.dailyElement.textContent = numberData.element;
    elements.dailyElement.style.color = numerologyData.elements[numberData.element]?.color || "#FF9E00";
    
    // Random forecast
    const randomForecast = numerologyData.dailyForecasts[Math.floor(Math.random() * numerologyData.dailyForecasts.length)];
    elements.dailyForecastText.textContent = `Number ${todayNumber} (${numberData.element}): ${randomForecast}`;
    
    // Update date
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    elements.currentDate.textContent = now.toLocaleDateString('en-US', options);
    
    // Update counter
    forecastCount++;
    elements.forecastCount.textContent = forecastCount;
    localStorage.setItem('forecastCount', forecastCount);
    
    // Random energy
    currentEnergy = energyLevels[Math.floor(Math.random() * 3)];
    elements.energyLevel.textContent = currentEnergy;
}

function calculatePersonalNumber(name) {
    if (!name || name.trim() === '') return getRandomNumber();
    
    // Simple algorithm: sum of character codes modulo 9, then +1
    let sum = 0;
    for (let i = 0; i < name.length; i++) {
        sum += name.charCodeAt(i);
    }
    return (sum % 9) + 1;
}

function showNameInputModal() {
    const name = prompt("Enter your name (or any name) to calculate its Chinese Numerology number:");
    if (name) {
        const number = calculatePersonalNumber(name);
        const numberData = numerologyData.numbers[number];
        
        showToast(`${name}: Number ${number} (${numberData.element}) - ${numberData.traits}`);
        
        // Update display temporarily
        elements.dailyNumber.textContent = number;
        elements.dailyElement.textContent = numberData.element;
        elements.dailyElement.style.color = numerologyData.elements[numberData.element]?.color || "#FF9E00";
        elements.dailyForecastText.textContent = `${name} is a ${numberData.element} person: ${numberData.traits}`;
    }
}

function showMatchModal() {
    const name1 = prompt("Enter first name (e.g., Shiva):");
    if (!name1) return;
    
    const name2 = prompt("Enter second name (e.g., Parvati):");
    if (!name2) return;
    
    // Calculate numbers
    const num1 = calculatePersonalNumber(name1);
    const num2 = calculatePersonalNumber(name2);
    
    // Calculate compatibility (simple percentage)
    const difference = Math.abs(num1 - num2);
    const compatibility = Math.max(30, 100 - (difference * 10));
    
    // Get elements
    const element1 = numerologyData.numbers[num1].element;
    const element2 = numerologyData.numbers[num2].element;
    
    // Fun compatibility messages
    const messages = [
        "A cosmic connection! ✨",
        "Good harmony with some challenges 🌓",
        "Creative tension can lead to growth 🌱",
        "Different energies that complement ⚖️",
        "A mystical bond beyond numbers 🔮"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // Update counter
    matchCount++;
    elements.matchCount.textContent = matchCount;
    localStorage.setItem('matchCount', matchCount);
    
    // Show result
    const result = `
🎭 Match Result: ${name1} & ${name2}

${name1}: Number ${num1} (${element1}) ${numerologyData.elements[element1]?.emoji || ""}
${name2}: Number ${num2} (${element2}) ${numerologyData.elements[element2]?.emoji || ""}

💖 Compatibility: ${compatibility}%
${randomMessage}

${compatibility > 80 ? "🌟 Excellent match!" : 
  compatibility > 60 ? "👍 Good potential!" : 
  "💫 Interesting dynamics!"}
    `.trim();
    
    alert(result);
    showToast("Match calculated! Check the alert.");
}

function shareApp() {
    if (navigator.share) {
        navigator.share({
            title: 'Mystic Match - Numerology Fun',
            text: 'Check out this fun Chinese Numerology app!',
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(window.location.href);
        showToast('Link copied to clipboard! 📋');
    }
}

function showAbout() {
    alert(`Mystic Match - Chinese Numerology Fun

A light-hearted app based on Chinese Numerology principles.

• Daily number forecasts
• Name number calculations
• Hypothetical match compatibility
• Just for fun entertainment!

This is a simplified version of Shiva Netra's full numerology system.

Made with mystical energy ✨`);
}

function resetApp() {
    if (confirm('Reset all counters and data?')) {
        forecastCount = 0;
        matchCount = 0;
        localStorage.clear();
        elements.forecastCount.textContent = forecastCount;
        elements.matchCount.textContent = matchCount;
        updateDailyForecast();
        showToast('App reset! 🔄');
    }
}

// ===== EVENT LISTENERS =====
elements.refreshDailyBtn.addEventListener('click', updateDailyForecast);

elements.calculateNumberBtn.addEventListener('click', showNameInputModal);

elements.matchBtn.addEventListener('click', showMatchModal);

elements.shareAppBtn.addEventListener('click', shareApp);

elements.aboutBtn.addEventListener('click', showAbout);

elements.resetBtn.addEventListener('click', resetApp);

// ===== INITIALIZE APP =====
function init() {
    // Load counters
    elements.forecastCount.textContent = forecastCount;
    elements.matchCount.textContent = matchCount;
    elements.energyLevel.textContent = currentEnergy;
    
    // Set initial forecast
    updateDailyForecast();
    
    // Welcome message
    setTimeout(() => {
        showToast('Welcome to Mystic Match! ✨');
    }, 1000);
}

// Start the app
document.addEventListener('DOMContentLoaded', init);
