document.addEventListener('DOMContentLoaded', function() {
  // Mobile Hamburger Toggle
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }
  
  // Header scrolled class addition
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Reference clients scroll grid filter control
  const scrollBadges = document.querySelectorAll('.reference-scroll-grid .carousel-item-badge');
  const indTabButtons = document.querySelectorAll('.ind-tab-btn');
  const gridWrapper = document.querySelector('.reference-grid-wrapper');

  if (indTabButtons.length > 0 && scrollBadges.length > 0) {
    indTabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filterValue = button.getAttribute('data-filter');

        // Set active class on tab buttons
        indTabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter badges
        scrollBadges.forEach(badge => {
          const industry = badge.getAttribute('data-industry');
          if (filterValue === 'all') {
            badge.style.display = 'flex';
          } else {
            if (industry === filterValue) {
              badge.style.display = 'flex';
            } else {
              badge.style.display = 'none';
            }
          }
        });

        // Reset scroll position on filter switch
        if (gridWrapper) {
          gridWrapper.scrollTop = 0;
        }
      });
    });
  }

  // Solutions top-level tab switching
  const solTabButtons = document.querySelectorAll('.solutions-top-tab-btn');
  const solSections = document.querySelectorAll('.solution-section');

  function activateSolTab(tabId) {
    if (!tabId) return;
    
    // Remove active class from all buttons and sections
    solTabButtons.forEach(btn => btn.classList.remove('active'));
    solSections.forEach(sec => sec.classList.remove('active'));

    // Find the button and target section
    const targetBtn = document.querySelector(`.solutions-top-tab-btn[data-sol-tab="${tabId}"]`);
    const targetSec = document.getElementById(tabId);

    if (targetBtn && targetSec) {
      targetBtn.classList.add('active');
      targetSec.classList.add('active');
      
      // Optional: Smooth scroll to the tab menu to center it
      const tabsSec = document.querySelector('.solutions-top-tabs-sec');
      if (tabsSec && window.location.hash) {
        tabsSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  if (solTabButtons.length > 0 && solSections.length > 0) {
    solTabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-sol-tab');
        activateSolTab(tabId);
        // Update hash in URL without jumping
        history.pushState(null, null, `#${tabId}`);
      });
    });

    // Deep Linking: Check URL hash on page load
    const initialHash = window.location.hash.substring(1);
    if (initialHash && ['dell', 'ablestack', 'mdr', 'everpure', 'veeam'].includes(initialHash)) {
      activateSolTab(initialHash);
    }
 
    // Handle hashchange event (back button or external click)
    window.addEventListener('hashchange', () => {
      const newHash = window.location.hash.substring(1);
      if (newHash && ['dell', 'ablestack', 'mdr', 'everpure', 'veeam'].includes(newHash)) {
        activateSolTab(newHash);
      }
    });
  }

  // Dell Technologies tab switching
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  if (tabButtons.length > 0 && tabPanes.length > 0) {
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        button.classList.add('active');
        const targetPane = document.getElementById(tabId);
        if (targetPane) {
          targetPane.classList.add('active');
        }
      });
    });
  }

  // Contact form submission validation & animation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const agreeCheckbox = document.getElementById('agreePrivacy');
      if (agreeCheckbox && !agreeCheckbox.checked) {
        alert("개인정보 처리방침에 동의해 주셔야 문의 접수가 가능합니다.");
        return;
      }

      // Show success popup panel
      const formSuccess = document.querySelector('.form-success');
      if (formSuccess) {
        formSuccess.classList.add('active');
        contactForm.reset();
        
        // Autoclose panel after 6s
        setTimeout(() => {
          formSuccess.classList.remove('active');
        }, 6000);
      }
    });
  }

  // Location Office Tab Switching (Seoul / Busan)
  const locTabButtons = document.querySelectorAll('.location-tab');
  const officeMaps = document.querySelectorAll('.office-map');
  const officeInfos = document.querySelectorAll('.office-info');

  if (locTabButtons.length > 0) {
    locTabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetOffice = button.getAttribute('data-office');

        // Set active class on buttons
        locTabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Toggle map visibility
        officeMaps.forEach(map => {
          if (map.classList.contains(targetOffice)) {
            map.style.display = 'block';
            setTimeout(() => map.classList.add('active'), 10);
          } else {
            map.style.display = 'none';
            map.classList.remove('active');
          }
        });

        // Toggle info panel visibility
        officeInfos.forEach(info => {
          if (info.classList.contains(targetOffice)) {
            info.style.display = 'flex';
            setTimeout(() => info.classList.add('active'), 10);
          } else {
            info.style.display = 'none';
            info.classList.remove('active');
          }
        });
      });
    });
  }
});