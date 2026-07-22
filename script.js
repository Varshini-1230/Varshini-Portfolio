/**
 * Anumalla Varshini Portfolio - Dynamic Interactivity Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle Functionality
  const themeToggleBtn = document.getElementById('themeToggle');
  const currentTheme = localStorage.getItem('theme') || 'dark';
  
  if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    updateThemeIcon('light');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      let theme = document.documentElement.getAttribute('data-theme');
      let newTheme = theme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    if (theme === 'light') {
      themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
      themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
    } else {
      themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
      themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
    }
  }

  // Header Scroll Effect & Active Section Highlighting
  const header = document.querySelector('.header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // ScrollSpy
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinksMenu = document.getElementById('navLinks');

  if (mobileMenuBtn && navLinksMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinksMenu.classList.toggle('active');
      const isOpen = navLinksMenu.classList.contains('active');
      mobileMenuBtn.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinksMenu.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }

  // Typed Text Effect in Hero
  const typedSpan = document.getElementById('typedRoles');
  if (typedSpan) {
    const roles = [
      'Full-Stack Developer',
      'AI & Machine Learning Engineer',
      'Python & FastAPI Developer',
      'Data Science Enthusiast'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        typedSpan.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typedSpan.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }

      let typeSpeed = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000; // Pause at end of word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
      }

      setTimeout(type, typeSpeed);
    }
    type();
  }

  // Skills Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Project Modals
  const projectDetailsMap = {
    'emotion-ai': {
      title: 'Adaptive Learning with Emotional Insights',
      subtitle: 'Real-Time Student Emotion Recognition System',
      accuracy: '92% Model Accuracy',
      tech: ['Python', 'ResNet', 'TensorFlow/Keras', 'OpenCV', 'Flask', 'MediaPipe'],
      overview: 'Built a state-of-the-art real-time student emotion recognition system designed to assist educators in adaptive virtual and classroom learning environments.',
      features: [
        'Integrated OpenCV & MediaPipe facial landmark detection for high-precision face tracking in varying lighting conditions.',
        'Fine-tuned deep convolutional neural network (ResNet architecture) using TensorFlow/Keras to achieve 92% classification accuracy across 7 core facial emotions.',
        'Developed a high-throughput Flask web server delivering live video frame emotion prediction with low latency.',
        'Designed a live teacher dashboard rendering real-time engagement metrics, mood distributions, and attention heatmaps.'
      ]
    },
    'lead-ai': {
      title: 'AI-Driven Lead Prioritization & CRM Automation',
      subtitle: 'Automated Lead Scoring and Urgency Prediction with n8n',
      accuracy: 'Automated Workflow',
      tech: ['Python', 'Machine Learning', 'NLP', 'TF-IDF', 'Logistic Regression', 'Flask', 'REST API', 'n8n', 'HubSpot CRM'],
      overview: 'An intelligent lead processing framework that automatically prioritizes incoming sales and customer leads based on urgency and sentiment analysis.',
      features: [
        'Trained TF-IDF and Logistic Regression NLP models to extract sentiment, urgency, and customer buying intent from inbound communications.',
        'Built a Flask REST API microservice serving real-time predictions for incoming inquiries.',
        'Engineered automated n8n workflow pipelines integrating real-time prediction output directly into HubSpot CRM.',
        'Automated lead routing and instant Slack/Email alerts for high-priority sales leads.'
      ]
    },
    'educare-ai': {
      title: 'EDUCARE AI: Personalized Learning & Law Mentor',
      subtitle: 'AI Platform for Legal Guidance, Career Support & Scholarships',
      accuracy: 'Gemini API Powered',
      tech: ['React.js', 'FastAPI', 'Python', 'Supabase', 'Google Gemini API', 'BeautifulSoup', 'APScheduler'],
      overview: 'A full-stack AI platform designed to empower students and individuals with tailored legal advice, academic career direction, and real-time scholarship opportunities.',
      features: [
        'Utilized Google Gemini API for intelligent, contextual conversation tailored for legal education and career mentorship.',
        'Built a robust FastAPI backend backed by Supabase for user authentication, encrypted chat logs, and user profile management.',
        'Automated web scraping pipelines with BeautifulSoup and APScheduler to aggregate and update verified scholarship listings daily.'
      ]
    }
  };

  const modalOverlay = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalBody = document.getElementById('modalBody');

  document.querySelectorAll('.open-project-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const data = projectDetailsMap[projectId];

      if (data && modalOverlay) {
        modalTitle.textContent = data.title;
        modalSubtitle.textContent = data.subtitle;

        let techBadges = data.tech.map(t => `<span class="tech-tag">${t}</span>`).join(' ');
        let featureList = data.features.map(f => `<li>${f}</li>`).join('');

        modalBody.innerHTML = `
          <p style="margin-bottom: 1.25rem; color: var(--text-secondary); line-height: 1.7;">${data.overview}</p>
          <h4 style="margin-bottom: 0.75rem; font-size: 1.1rem; color: var(--text-primary);">Key Architectural Highlights</h4>
          <ul class="project-bullets" style="margin-bottom: 1.5rem;">${featureList}</ul>
          <h4 style="margin-bottom: 0.75rem; font-size: 1.1rem; color: var(--text-primary);">Tech Stack & Tools</h4>
          <div class="tech-stack-list" style="border-top: none; padding-top: 0;">${techBadges}</div>
        `;

        modalOverlay.classList.add('active');
      }
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }

  // Interactive AI Simulation Tabs
  const demoTabs = document.querySelectorAll('.demo-tab-btn');
  const demoPanels = document.querySelectorAll('.demo-panel');

  demoTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      demoTabs.forEach(t => t.classList.remove('active'));
      demoPanels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const target = tab.getAttribute('data-demo');
      document.getElementById(target).classList.add('active');
    });
  });

  // Simulator 1: Emotion AI Classifier Simulator
  const testEmotionBtn = document.getElementById('testEmotionBtn');
  const emotionSelect = document.getElementById('emotionSelect');
  const emotionOutput = document.getElementById('emotionOutput');

  if (testEmotionBtn && emotionSelect && emotionOutput) {
    testEmotionBtn.addEventListener('click', () => {
      const selected = emotionSelect.value;
      let result = {};
      if (selected === 'focused') {
        result = { emotion: 'Focused / Engaged', confidence: '95.4%', recommendation: 'Optimal learning state detected. Continue lesson flow.' };
      } else if (selected === 'confused') {
        result = { emotion: 'Confused / Puzzled', confidence: '91.8%', recommendation: 'Trigger adaptive explanation pop-up or simplify code example.' };
      } else if (selected === 'distracted') {
        result = { emotion: 'Distracted / Bored', confidence: '89.2%', recommendation: 'Prompt teacher for interactive check-in quiz.' };
      }
      
      emotionOutput.innerHTML = `
        <div style="color: var(--accent-secondary); margin-bottom: 0.5rem;">[ResNet Model Inference Output]</div>
        <div>Predicted Emotion: <strong>${result.emotion}</strong></div>
        <div>Confidence Level: <span style="color: var(--success);">${result.confidence}</span></div>
        <div style="margin-top: 0.5rem; color: var(--text-secondary);">Adaptive System Action: ${result.recommendation}</div>
      `;
    });
  }

  // Simulator 2: Lead Prioritization Simulator
  const testLeadBtn = document.getElementById('testLeadBtn');
  const leadInput = document.getElementById('leadInput');
  const leadOutput = document.getElementById('leadOutput');

  if (testLeadBtn && leadInput && leadOutput) {
    testLeadBtn.addEventListener('click', () => {
      const text = leadInput.value.toLowerCase();
      let urgency = 'Medium Priority';
      let score = '72/100';
      let route = 'Standard Sales Queue';
      let badgeColor = 'var(--warning)';

      if (text.includes('urgent') || text.includes('pricing') || text.includes('asap') || text.includes('contract') || text.includes('enterprise')) {
        urgency = 'HIGH PRIORITY (Hot Lead)';
        score = '96/100';
        route = 'Instant n8n Slack Alert + Immediate Sales Officer Assignment';
        badgeColor = 'var(--success)';
      } else if (text.includes('curious') || text.includes('info') || text.includes('question')) {
        urgency = 'Low Priority (Informational)';
        score = '45/100';
        route = 'Automated Email Nurture Sequence';
        badgeColor = 'var(--text-muted)';
      }

      leadOutput.innerHTML = `
        <div style="color: var(--accent-secondary); margin-bottom: 0.5rem;">[TF-IDF + Logistic Regression Analysis]</div>
        <div>Priority Classification: <strong style="color: ${badgeColor};">${urgency}</strong></div>
        <div>Lead Score: <strong>${score}</strong></div>
        <div style="margin-top: 0.5rem; color: var(--text-secondary);">n8n Workflow Action: ${route}</div>
      `;
    });
  }

  // Simulator 3: EDUCARE AI Chatbot Simulator
  const sendChatBtn = document.getElementById('sendChatBtn');
  const chatInput = document.getElementById('chatInput');
  const chatDisplay = document.getElementById('chatDisplay');

  if (sendChatBtn && chatInput && chatDisplay) {
    sendChatBtn.addEventListener('click', () => {
      const message = chatInput.value.trim();
      if (!message) return;

      chatDisplay.innerHTML += `
        <div style="text-align: right; margin-bottom: 0.75rem;">
          <span style="background: var(--accent-primary); color: #fff; padding: 0.5rem 1rem; border-radius: 12px; display: inline-block; max-width: 80%;">${message}</span>
        </div>
      `;

      chatInput.value = '';

      setTimeout(() => {
        let aiReply = "Thank you for reaching out to EDUCARE AI. As your AI mentor, I can assist you with Computer Science career paths, scholarship recommendations, or legal guidance!";
        
        const msgLower = message.toLowerCase();
        if (msgLower.includes('scholarship') || msgLower.includes('fund')) {
          aiReply = "Found 3 relevant tech scholarships for CSE B.Tech students! Top pick: Code Unnati Innovation Grant 2026 ($2,500). Would you like the application link?";
        } else if (msgLower.includes('career') || msgLower.includes('job') || msgLower.includes('python')) {
          aiReply = "For Python & AI/ML careers, focus on building end-to-end FastAPI/Flask APIs with deployed ML models (like your ResNet and TF-IDF projects!).";
        }

        chatDisplay.innerHTML += `
          <div style="text-align: left; margin-bottom: 0.75rem;">
            <span style="background: var(--bg-tertiary); border: 1px solid var(--glass-border); color: var(--text-primary); padding: 0.5rem 1rem; border-radius: 12px; display: inline-block; max-width: 80%;">
              🤖 <strong>EDUCARE AI:</strong> ${aiReply}
            </span>
          </div>
        `;
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
      }, 700);
    });
  }

  // Copy Contact Info & Toast Notifications
  const toast = document.getElementById('toast');
  function showToast(msg) {
    if (!toast) return;
    toast.innerHTML = `<i class="fas fa-check-circle" style="color: var(--success);"></i> ${msg}`;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  document.querySelectorAll('.copy-trigger').forEach(item => {
    item.addEventListener('click', () => {
      const textToCopy = item.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`);
        });
      }
    });
  });

  // Contact Form Submission Handler
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you! Your message has been sent successfully.');
      contactForm.reset();
    });
  }


});
