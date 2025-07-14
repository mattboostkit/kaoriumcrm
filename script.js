// Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            navMenu.classList.remove('active');
        }
    });
});

// Active Navigation Link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ROI Calculator
const numClientsSlider = document.getElementById('numClients');
const avgRevenueSlider = document.getElementById('avgRevenue');
const numClientsValue = document.getElementById('numClientsValue');
const avgRevenueValue = document.getElementById('avgRevenueValue');

// Update display values
numClientsSlider.addEventListener('input', updateCalculator);
avgRevenueSlider.addEventListener('input', updateCalculator);

function updateCalculator() {
    const numClients = parseInt(numClientsSlider.value);
    const avgRevenue = parseInt(avgRevenueSlider.value);
    
    // Update display values
    numClientsValue.textContent = numClients;
    avgRevenueValue.textContent = avgRevenue.toLocaleString();
    
    // Calculate costs based on scale
    let ghlMonthlyCost = 1416; // Base cost
    let customMonthlyCost;
    
    // Custom solution scaling
    if (numClients <= 10) {
        customMonthlyCost = 56;
    } else if (numClients <= 50) {
        customMonthlyCost = 150;
    } else if (numClients <= 100) {
        customMonthlyCost = 250;
    } else if (numClients <= 300) {
        customMonthlyCost = 500;
    } else {
        customMonthlyCost = 800;
    }
    
    // GHL scales with users (estimate)
    ghlMonthlyCost += Math.floor(numClients / 10) * 40;
    
    // Update monthly costs
    document.getElementById('ghlMonthlyCost').textContent = `£${ghlMonthlyCost.toLocaleString()}`;
    document.getElementById('customMonthlyCost').textContent = `£${customMonthlyCost.toLocaleString()}`;
    
    // Cost per partner
    const ghlCostPerPartner = (ghlMonthlyCost / numClients).toFixed(2);
    const customCostPerPartner = (customMonthlyCost / numClients).toFixed(2);
    
    document.getElementById('ghlCostPerPartner').textContent = `£${ghlCostPerPartner}`;
    document.getElementById('customCostPerPartner').textContent = `£${customCostPerPartner}`;
    
    // 3-Year totals
    const ghlSetup = 5000;
    const customSetup = 40000;
    
    const ghl3Year = ghlSetup + (ghlMonthlyCost * 36);
    const custom3Year = customSetup + (customMonthlyCost * 36) + 15000; // Including maintenance
    
    document.getElementById('ghlTotal').textContent = `£${ghl3Year.toLocaleString()}`;
    document.getElementById('customTotal').textContent = `£${custom3Year.toLocaleString()}`;
    
    // Savings calculation
    const monthlySavings = ghlMonthlyCost - customMonthlyCost;
    const totalSavings = ghl3Year - custom3Year;
    
    document.getElementById('monthlySavings').textContent = `£${monthlySavings.toLocaleString()}`;
    document.getElementById('totalSavings').textContent = `£${Math.abs(totalSavings).toLocaleString()}`;
    
    // Break-even calculation
    const setupDifference = customSetup - ghlSetup;
    const monthlyOperationalSavings = ghlMonthlyCost - customMonthlyCost;
    const breakeven = monthlyOperationalSavings > 0 ? Math.ceil(setupDifference / monthlyOperationalSavings) : 'N/A';
    
    document.getElementById('breakeven').textContent = breakeven !== 'N/A' ? `${breakeven} months` : breakeven;
    
    // Color code savings
    const savingsElement = document.getElementById('totalSavings');
    if (totalSavings > 0) {
        savingsElement.style.color = '#10b981';
        savingsElement.textContent = `£${totalSavings.toLocaleString()}`;
    } else {
        savingsElement.style.color = '#ef4444';
        savingsElement.textContent = `-£${Math.abs(totalSavings).toLocaleString()}`;
    }
}

// Initialize calculator
updateCalculator();

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// CTA Buttons
document.getElementById('scheduleCall').addEventListener('click', () => {
    alert('Thank you for your interest! Please email us at sales@crmconsultancy.com to schedule a consultation.');
});

document.getElementById('downloadPDF').addEventListener('click', () => {
    alert('PDF download functionality would be implemented here. For now, you can print this page to PDF using your browser\'s print function.');
});

// Add hover effects to option cards
document.querySelectorAll('.option-card').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        const option = e.currentTarget.dataset.option;
        if (option === 'custom') {
            e.currentTarget.style.borderColor = '#6366f1';
        } else {
            e.currentTarget.style.borderColor = '#e5e7eb';
        }
    });
    
    card.addEventListener('mouseleave', (e) => {
        const option = e.currentTarget.dataset.option;
        if (option === 'custom') {
            e.currentTarget.style.borderColor = '#6366f1';
        } else {
            e.currentTarget.style.borderColor = '#e5e7eb';
        }
    });
});

// Print styling
window.addEventListener('beforeprint', () => {
    document.body.classList.add('print-mode');
});

window.addEventListener('afterprint', () => {
    document.body.classList.remove('print-mode');
});