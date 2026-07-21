(() => {
  'use strict';

  const projectsData = {
    'safe-travel': {
      title: 'Safe Travel',
      context: 'Projet scolaire · En groupe · Terminé',
      problem: "Comment monitorer et sécuriser le transport d'œuvres d'art pour détecter chocs, variations de température ou d'humidité en temps réel ?",
      description: "Conception d'un système embarqué basé sur Arduino collectant des données de capteurs (chocs, température, humidité). Développement d'un site web PHP/SQL permettant le suivi en temps réel des colis avec un système d'alertes automatiques en cas d'anomalie détectée.",
      stack: ['Arduino (C)', 'Java', 'PHP', 'SQL', 'Python', 'Linux']
    },
    'n8n': {
      title: 'Automatisation n8n',
      context: 'Projet personnel · Solo · Continu',
      problem: "Certaines tâches répétitives et fastidieuses — recherche de prospects, scraping de données, envoi de mails — prennent un temps disproportionné et se prêtent parfaitement à l'automatisation.",
      description: "Mise en place de pipelines d'automatisation via n8n selon les besoins : scraping web, enrichissement de données, séquences d'envoi de mails automatisées. Projet vivant, activé et enrichi en fonction des besoins réels.",
      stack: ['n8n', 'Python']
    },
    'hilton': {
      title: 'Hilton Roleplay',
      context: 'Projet personnel · En groupe · Terminé',
      problem: 'Créer un serveur GTA RP stable, avec une expérience de jeu personnalisée et des données joueurs persistantes.',
      description: "Création et administration complète d'un serveur de jeu de rôle sur GTA V. Développement de scripts personnalisés, mise en place d'une base de données pour la persistance des données joueurs, maintenance et administration du serveur.",
      stack: ['Lua', 'SQL', 'Linux']
    },
    'orbita': {
      title: 'Orbita',
      context: 'Projet personnel · Solo',
      description: 'Bot Discord développé en Python — messages embed, attribution automatique de rôles, modération.',
      stack: ['Python']
    },
    'trajets': {
      title: 'Trajets',
      context: 'Projet scolaire',
      description: 'Application C++ de gestion de catalogue de trajets.',
      stack: ['C++']
    },
    'instruct-if': {
      title: 'Instruct-IF',
      context: 'Projet scolaire',
      description: 'Application Java mettant en relation élèves et professeurs particuliers.',
      stack: ['Java', 'Maven']
    }
  };

  /* ---------------------------------------------------------------------
     Menu mobile
     --------------------------------------------------------------------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');

  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const isOpen = navList.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navList.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navList.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------------------------------------------------------------------
     Reveal au scroll
     --------------------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------------------------------------------------------------------
     Modal projets
     --------------------------------------------------------------------- */
  const overlay = document.getElementById('modalOverlay');

  if (overlay) {
    const modal = overlay.querySelector('.modal');
    const closeBtn = overlay.querySelector('.modal-close');
    const imageEl = document.getElementById('modalImage');
    const badgeEl = document.getElementById('modalBadge');
    const titleEl = document.getElementById('modalTitle');
    const problemBlock = document.getElementById('modalProblemBlock');
    const problemEl = document.getElementById('modalProblem');
    const descriptionEl = document.getElementById('modalDescription');
    const stackEl = document.getElementById('modalStack');

    let lastFocused = null;

    function openModal(id) {
      const data = projectsData[id];
      if (!data) return;

      imageEl.src = `assets/projects/${id}.jpg`;
      imageEl.alt = `Aperçu du projet ${data.title}`;
      badgeEl.textContent = data.context;
      titleEl.textContent = data.title;
      descriptionEl.textContent = data.description;

      if (data.problem) {
        problemEl.textContent = data.problem;
        problemBlock.hidden = false;
      } else {
        problemBlock.hidden = true;
      }

      stackEl.innerHTML = '';
      data.stack.forEach((item) => {
        const li = document.createElement('li');
        li.className = 'tag';
        li.textContent = item;
        stackEl.appendChild(li);
      });

      lastFocused = document.activeElement;
      overlay.hidden = false;
      requestAnimationFrame(() => overlay.classList.add('is-open'));
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    }

    function closeModal() {
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
      window.setTimeout(() => {
        overlay.hidden = true;
      }, 250);
      if (lastFocused) lastFocused.focus();
    }

    document.querySelectorAll('[data-project]').forEach((card) => {
      card.addEventListener('click', () => openModal(card.dataset.project));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(card.dataset.project);
        }
      });
    });

    closeBtn.addEventListener('click', closeModal);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
        closeModal();
      }
    });
  }

  /* ---------------------------------------------------------------------
     Année du footer
     --------------------------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
