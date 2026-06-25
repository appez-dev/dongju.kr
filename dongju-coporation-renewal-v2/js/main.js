document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile navigation toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // Mobile submenu toggle
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    const dropdown = item.querySelector('.nav-dropdown');
    
    if (dropdown && link) {
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          item.classList.toggle('active');
        }
      });
    }
  });

  // 3. Highlight Active Nav Link
  const currentPath = window.location.pathname;
  const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1);
  const navLinks = document.querySelectorAll('.nav-link, .dropdown-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
      
      // If it's a dropdown link, also highlight the parent nav-link
      const parentNavItem = link.closest('.nav-item');
      if (parentNavItem) {
        const parentNavLink = parentNavItem.querySelector('.nav-link');
        if (parentNavLink) parentNavLink.classList.add('active');
      }
    }
  });

  // 4. Solutions Tab switcher
  const tabButtons = document.querySelectorAll('.sol-tab-btn');
  const tabContents = document.querySelectorAll('.solution-content');
  
  if (tabButtons.length > 0 && tabContents.length > 0) {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        
        tabButtons.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        btn.classList.add('active');
        const activeContent = document.getElementById(target);
        if (activeContent) {
          activeContent.classList.add('active');
        }
      });
    });
  }

  // 5. Reference Filter & Search Logic
  const refSearch = document.getElementById('refSearch');
  const filterBtns = document.querySelectorAll('.filter-tag-btn');
  const refRows = document.querySelectorAll('.ref-row');
  const resultCount = document.getElementById('resultCount');
  const noResults = document.getElementById('noResults');
  
  if (refRows.length > 0) {
    let currentFilter = 'all';
    let searchQuery = '';
    
    function filterReferences() {
      let visibleCount = 0;
      
      refRows.forEach(row => {
        const client = row.dataset.client.toLowerCase();
        const category = row.dataset.category;
        const products = row.dataset.products.toLowerCase();
        
        const matchesFilter = (currentFilter === 'all' || category === currentFilter);
        const matchesSearch = (client.includes(searchQuery) || products.includes(searchQuery));
        
        if (matchesFilter && matchesSearch) {
          row.style.display = '';
          visibleCount++;
        } else {
          row.style.display = 'none';
        }
      });
      
      if (resultCount) {
        resultCount.textContent = visibleCount;
      }
      
      if (noResults) {
        noResults.style.display = (visibleCount === 0) ? 'block' : 'none';
      }
    }
    
    if (refSearch) {
      refSearch.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        filterReferences();
      });
    }
    
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        filterReferences();
      });
    });
  }

  // 6. Contact Form Validation and Submit
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const tel = document.getElementById('tel').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      const agree = document.getElementById('agree').checked;
      
      if (!name || !tel || !email || !message) {
        alert('모든 필수 입력 항목을 채워주세요.');
        return;
      }
      
      if (!agree) {
        alert('개인정보처리방침에 동의해 주세요.');
        return;
      }
      
      // Formspree or general submission success simulation
      alert('감사합니다, 문의사항이 성공적으로 접수되었습니다. 담당자가 확인 후 신속하게 연락드리겠습니다.');
      contactForm.reset();
    });
  }
});