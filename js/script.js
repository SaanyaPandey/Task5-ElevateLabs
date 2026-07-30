/* ============================================
   AI DETECTIVE - Main JavaScript
   Vanilla JS - No Dependencies
   ============================================ */

(function () {
  'use strict';

  /* ---------- Loading Screen ---------- */
  function initLoader() {
    const loader = document.querySelector('.loader');
    if (!loader) return;
    window.addEventListener('load', function () {
      setTimeout(function () {
        loader.classList.add('hidden');
        document.body.classList.remove('no-scroll');
      }, 800);
    });
    setTimeout(function () {
      if (!loader.classList.contains('hidden')) {
        loader.classList.add('hidden');
        document.body.classList.remove('no-scroll');
      }
    }, 3000);
  }

  /* ---------- Particle Background ---------- */
  function initParticles() {
    const container = document.querySelector('.particles');
    if (!container) return;
    const count = 25;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 20 + 5;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + '%';
      p.style.animationDelay = Math.random() * 20 + 's';
      p.style.animationDuration = (15 + Math.random() * 20) + 's';
      p.style.opacity = (0.05 + Math.random() * 0.15).toString();
      container.appendChild(p);
    }
  }

  /* ---------- Custom Cursor ---------- */
  function initCursor() {
    if (window.innerWidth <= 768) return;
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animate() {
      cursorX += (mouseX - cursorX) * 0.5;
      cursorY += (mouseY - cursorY) * 0.5;
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
      requestAnimationFrame(animate);
    }
    animate();

    const hoverables = document.querySelectorAll('a, button, input, textarea, select, [data-hover]');
    hoverables.forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        cursor.classList.add('hover');
        follower.classList.add('hover');
      });
      el.addEventListener('mouseleave', function () {
        cursor.classList.remove('hover');
        follower.classList.remove('hover');
      });
    });
  }

  /* ---------- Theme Toggle ---------- */
  function initTheme() {
    const stored = localStorage.getItem('ai-detective-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = stored || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcons(theme);

    const toggle = document.querySelectorAll('[data-theme-toggle]');
    toggle.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('ai-detective-theme', next);
        updateThemeIcons(next);
      });
    });
  }

  function updateThemeIcons(theme) {
    const icons = document.querySelectorAll('[data-theme-icon]');
    icons.forEach(function (icon) {
      icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    });
  }

  /* ---------- Navbar Scroll Effect ---------- */
  function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    function updateNav() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();

    setActiveNavLink();
  }

  function setActiveNavLink() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-links a, .mobile-menu a');
    links.forEach(function (link) {
      const href = link.getAttribute('href');
      if (href === path || (path === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  /* ---------- Mobile Menu ---------- */
  function initMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.mobile-overlay');
    if (!toggle || !menu || !overlay) return;

    function open() {
      toggle.classList.add('active');
      menu.classList.add('active');
      overlay.classList.add('active');
      document.body.classList.add('no-scroll');
    }

    function close() {
      toggle.classList.remove('active');
      menu.classList.remove('active');
      overlay.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }

    toggle.addEventListener('click', function () {
      if (menu.classList.contains('active')) close();
      else open();
    });

    overlay.addEventListener('click', close);

    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', close);
    });
  }

  /* ---------- Typing Animation ---------- */
  function initTyping() {
    const el = document.querySelector('.typing-text');
    if (!el) return;
    const phrases = el.getAttribute('data-phrases') || 'Ultimate AI Detective,Mystery Solver,Crime Analyst,Master Sleuth';
    const words = phrases.split(',');
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {
      const current = words[wordIndex];
      if (deleting) {
        el.textContent = current.substring(0, charIndex - 1);
        charIndex--;
      } else {
        el.textContent = current.substring(0, charIndex + 1);
        charIndex++;
      }

      let delay = deleting ? 50 : 100;

      if (!deleting && charIndex === current.length) {
        delay = 2000;
        deleting = true;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 300;
      }

      setTimeout(type, delay);
    }
    setTimeout(type, 500);
  }

  /* ---------- Counter Animation ---------- */
  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (c) { observer.observe(c); });
  }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-counter'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(target * eased);
      el.textContent = current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString() + suffix;
    }
    requestAnimationFrame(step);
  }

  /* ---------- Scroll Animations (Reveal) ---------- */
  function initReveal() {
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if (!elements.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    elements.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- Back to Top ---------- */
  function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) btn.classList.add('visible');
      else btn.classList.remove('visible');
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- FAQ Accordion ---------- */
  function initFAQ() {
    const questions = document.querySelectorAll('.faq-question');
    questions.forEach(function (q) {
      q.addEventListener('click', function () {
        const answer = q.nextElementSibling;
        const isActive = q.classList.contains('active');

        questions.forEach(function (qq) {
          qq.classList.remove('active');
          const a = qq.nextElementSibling;
          if (a) {
            a.style.maxHeight = null;
            a.classList.remove('active');
          }
        });

        if (!isActive) {
          q.classList.add('active');
          answer.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 50 + 'px';
        }
      });
    });
  }

  /* ============================================
     CASES DATA
     ============================================ */
  const CASES = [
    {
      id: 'case-001',
      title: 'The Missing Diamond',
      icon: '💎',
      difficulty: 'easy',
      difficultyLabel: 'Easy',
      time: '15 min',
      desc: 'A priceless diamond has vanished from the locked museum vault. Uncover the thief among the staff before the night ends.',
      story: 'On a rainy Tuesday night, the famous Star of Alexandria diamond — valued at $50 million — was stolen from the city museum. The vault showed no signs of forced entry. The security system was disabled temporarily between 2:15 AM and 2:20 AM. Four people had access to the security codes that night.',
      culprit: 'Laura Bennett',
      evidence: [
        { id: 'e1', name: 'Security Logs', icon: '📋', hint: 'Shows system was disabled at 2:15 AM' },
        { id: 'e2', name: 'Fingerprint Kit', icon: '🔍', hint: 'Partial print found near the vault' },
        { id: 'e3', name: 'Broken Window', icon: '🪟', hint: 'Window in janitor closet is cracked' },
        { id: 'e4', name: 'Receipt', icon: '🧾', hint: 'Late-night purchase at downtown café' }
      ],
      suspects: [
        {
          id: 's1', name: 'Laura Bennett', role: 'Head of Security', icon: '👮‍♀️',
          questions: [
            { q: 'Where were you at 2:15 AM?', a: 'I was in my office reviewing reports. I stepped out for coffee around 2:30.', clue: 'Her office security badge log shows she left at 2:05 AM and returned at 2:25 AM — unaccounted 20 minutes.' },
            { q: 'Who else knew the codes?', a: 'Only Marcus, myself, and the director. We change them monthly.', clue: 'Laura insisted on updating the codes herself last week — without witnesses.' },
            { q: 'Any recent debts?', a: 'No, I\'m quite comfortable.', clue: 'Anonymous tip indicates she owes a six-figure gambling debt.' }
          ]
        },
        {
          id: 's2', name: 'Marcus Chen', role: 'Night Curator', icon: '🧑‍🎨',
          questions: [
            { q: 'What were you doing?', a: 'Making my hourly rounds through the exhibits. I check the vault each time.', clue: 'The vault sensor only registered one approach that night — at 1:00 AM during his scheduled round.' },
            { q: 'Notice anything strange?', a: 'The janitor, Tom, was mopping near the back wing around 2.', clue: 'Corroborates Tom was near the scene, but Marcus did not see Laura.', clueAdded: true },
            { q: 'Did you see Laura?', a: 'Not after 1 AM. She said she had paperwork.', clue: 'Laura claimed she was in her office the entire time.' }
          ]
        },
        {
          id: 's3', name: 'Tom Rivera', role: 'Janitor', icon: '🧹',
          questions: [
            { q: 'Where were you?', a: 'Mopping floors in the east wing like I do every night.', clue: 'Timecard confirms he clocked in and never left the premises.', clueAdded: true },
            { q: 'Hear anything?', a: 'Heard footsteps by the vault, but security is always walking around.', clue: 'Footsteps by the vault around 2:15 — Marcus was making rounds at 1, not 2.', clueAdded: true },
            { q: 'Broken window in your closet?', a: 'I reported that last week. A kid threw a rock from outside.', clue: 'Window was repaired 2 days ago. It was re-broken from the inside tonight.' }
          ]
        },
        {
          id: 's4', name: 'Dr. Elena Voss', role: 'Museum Director', icon: '👩‍⚖️',
          questions: [
            { q: 'Where were you?', a: 'At a gala downtown. Dozens of people can confirm.', clue: 'Event photos timestamped 2:00 AM show her clearly at the fundraiser.', clueAdded: true },
            { q: 'Any grudges?', a: 'Laura was passed over for my position last year, but she handled it well.', clue: 'Several staff noted Laura\'s resentment after the promotion was given to Elena.', clueAdded: true },
            { q: 'Insurance on the diamond?', a: 'Fully insured. But the sentimental value is irreplaceable.', clue: 'Policy was recently doubled — at Laura\'s recommendation.' }
          ]
        }
      ]
    },
    {
      id: 'case-002',
      title: 'Murder at the Manor',
      icon: '🏰',
      difficulty: 'medium',
      difficultyLabel: 'Medium',
      time: '25 min',
      desc: 'Lord Blackwood was found dead in his study during a thunderstorm. Question the guests and unmask the killer.',
      story: 'During the annual Blackwood gala, a scream pierced the thunder. Lord Reginald Blackwood, 68, was slumped over his mahogany desk — a letter opener in his chest. The study door was locked from the inside. The window stood open, rain blowing in. All seven guests were accounted for in the ballroom... or were they?',
      culprit: 'James Blackwood',
      evidence: [
        { id: 'e1', name: 'Will Draft', icon: '📜', hint: 'Dated 2 days ago, disinherits James' },
        { id: 'e2', name: 'Broken Key', icon: '🗝️', hint: 'Half a key in the outside lock' },
        { id: 'e3', name: 'Muddy Footprints', icon: '👣', hint: 'Size 11 prints by the garden window' },
        { id: 'e4', name: 'Threatening Note', icon: '✉️', hint: '"You\'ll regret this" — unsigned' },
        { id: 'e5', name: 'Wine Glass', icon: '🍷', hint: 'Two glasses on the desk; lipstick on one' }
      ],
      suspects: [
        {
          id: 's1', name: 'James Blackwood', role: 'Nephew & Heir', icon: '🧔',
          questions: [
            { q: 'When did you last see your uncle?', a: 'At dinner. We exchanged pleasantries.', clue: 'Butler saw him arguing with Lord Blackwood at 9:30 PM — 30 minutes before death.' },
            { q: 'What did you argue about?', a: 'Nothing important. Business matters.', clue: 'The new will disinherits James entirely due to gambling debts.', clueAdded: true },
            { q: 'Your shoe size?', a: 'Size 10. Why?', clue: 'The muddy footprints are size 11, but wet shoes in James\'s closet have paper stuffed inside to appear smaller.' },
            { q: 'Alibi during the murder?', a: 'In the ballroom the entire time. Ask anyone.', clue: 'Three guests admit they did not see him between 9:50 and 10:05 PM.' }
          ]
        },
        {
          id: 's2', name: 'Lady Victoria', role: 'Wife of Deceased', icon: '👸',
          questions: [
            { q: 'Relationship with Lord Blackwood?', a: 'Chilly, but amicable. Separate bedrooms.', clue: 'A private investigator was hired by Lady Victoria three weeks ago.', clueAdded: true },
            { q: 'Who inherits?', a: 'I believe James does. It\'s all in the will.', clue: 'Lady Victoria is well aware the will was rewritten — she had a copy sent to her solicitor yesterday.', clueAdded: true },
            { q: 'Your lipstick shade?', a: 'Ruby Royale. My signature color.', clue: 'The lipstick on the wine glass matches Ruby Royale exactly.' }
          ]
        },
        {
          id: 's3', name: 'Inspector Pike', role: 'Family Friend', icon: '🎩',
          questions: [
            { q: 'Why were you invited?', a: 'Old family friend. Reggie and I go back decades.', clue: 'Court records show Pike was suing Lord Blackwood over a disputed property.', clueAdded: true },
            { q: 'What\'s in your briefcase?', a: 'Legal documents regarding a property matter.', clue: 'The lawsuit was dropped two days ago — after Reginald offered a settlement.', clueAdded: true },
            { q: 'Did you see James tonight?', a: 'He looked flustered when I passed him in the hallway at 9:55.', clue: 'Places James away from the ballroom right before the murder.', clueAdded: true }
          ]
        },
        {
          id: 's4', name: 'Rebecca Hart', role: 'Personal Secretary', icon: '👩‍💼',
          questions: [
            { q: 'Your whereabouts at 10 PM?', a: 'In the library taking notes on next week\'s itinerary.', clue: 'The library log shows no entry for Rebecca tonight.', clueAdded: true },
            { q: 'Draft the new will?', a: 'Yes, under direct instruction from Lord Blackwood two days ago.', clue: 'Rebecca has the only other signed copy in her safe.', clueAdded: true },
            { q: 'Any romantic involvement?', a: 'That is wildly inappropriate!', clue: 'Anonymous letter to Lady Victoria claims a two-year affair with Lord Blackwood.', clueAdded: true }
          ]
        }
      ]
    },
    {
      id: 'case-003',
      title: 'The Cyber Espionage',
      icon: '💻',
      difficulty: 'hard',
      difficultyLabel: 'Hard',
      time: '35 min',
      desc: 'Top-secret AI research was exfiltrated from Veritas Corp. Trace the digital breadcrumbs to find the mole.',
      story: 'Veritas Corp\'s flagship AI project, codenamed ORACLE, was leaked to competitor Helix Systems overnight. The data transfer originated inside the R&D floor — accessible only to 6 employees with keycards. Server logs show the breach occurred at 3:47 AM. Someone plugged in an unauthorized USB device and uploaded 12 GB of encrypted files to an external server.',
      culprit: 'Dr. Raj Patel',
      evidence: [
        { id: 'e1', name: 'Server Logs', icon: '🖥️', hint: 'MAC address registered to an R&D laptop' },
        { id: 'e2', name: 'USB Registry', icon: '📡', hint: 'Device serial matches a corporate USB drive' },
        { id: 'e3', name: 'Keycard Access', icon: '🎫', hint: 'Raj, Sarah, and Ken were in the building' },
        { id: 'e4', name: 'Email Archive', icon: '📧', hint: 'Encrypted messages to Helix recruiter' },
        { id: 'e5', name: 'Financial Records', icon: '💰', hint: 'Recent $250K deposit to offshore account' },
        { id: 'e6', name: 'Surveillance Footage', icon: '📹', hint: 'Figure in hoodie at 3:30 AM, wearing red lanyard' }
      ],
      suspects: [
        {
          id: 's1', name: 'Dr. Raj Patel', role: 'Lead AI Researcher', icon: '👨‍🔬',
          questions: [
            { q: 'Why were you in the building at 3 AM?', a: 'I was running an overnight training experiment. It happens.', clue: 'R&D scheduler shows no experiments were scheduled that night — Raj booked a fake one.', clueAdded: true },
            { q: 'How did your USB get registered?', a: 'I lost that USB at the conference last week!', clue: 'Company security checked conference records — USB never left Raj\'s possession.', clueAdded: true },
            { q: 'What about the recruiter emails?', a: 'I rejected their offers months ago.', clue: 'Encrypted email chain dated 3 days ago: "Package ready as discussed."', clueAdded: true },
            { q: 'Red lanyard — is that yours?', a: 'We all have red lanyards. That proves nothing.', clue: 'Raj upgraded to a VIP red lanyard on Monday; Ken and Sarah use blue ones.', clueAdded: true },
            { q: 'The $250K deposit?', a: 'Family inheritance from my aunt in London.', clue: 'Death records show his aunt passed away 14 years ago. The deposit came from a Helix shell company.', clueAdded: true }
          ]
        },
        {
          id: 's2', name: 'Sarah Kim', role: 'Data Engineer', icon: '👩‍💻',
          questions: [
            { q: 'Why were you in the building?', a: 'Pulling an all-nighter fixing a pipeline bug for production.', clue: 'Git commit history confirms Sarah pushed fixes between 2:45 AM and 4:10 AM.', clueAdded: true },
            { q: 'Seen anything suspicious?', a: 'Raj\'s office light was on at 3:30. Thought nothing of it.', clue: 'Places Raj in the building at the exact time of the breach.', clueAdded: true },
            { q: 'Was your laptop used?', a: 'I locked it before using the restroom. Gone 5 minutes at 3:45.', clue: 'Server log shows Sarah\'s laptop was active at 3:47 — during those 5 minutes.', clueAdded: true }
          ]
        },
        {
          id: 's3', name: 'Kenji Watanabe', role: 'Security Engineer', icon: '👨‍💼',
          questions: [
            { q: 'Your role in the breach?', a: 'I run security. Why would I cause a breach?', clue: 'Ken holds admin access, but he also has the most to lose from a breach.', clueAdded: true },
            { q: 'Surveillance blind spots?', a: 'No blind spots on R&D floor.', clue: 'One camera was disabled at 3:42 AM — only Ken had permissions to do so.', clueAdded: true },
            { q: 'Why disable camera 7?', a: 'System maintenance. Scheduled and logged.', clue: 'Maintenance schedule confirms this, but timing is suspicious. Raj would have needed inside help.', clueAdded: true }
          ]
        },
        {
          id: 's4', name: 'Maya Chen', role: 'CEO\'s Assistant', icon: '👩‍🎓',
          questions: [
            { q: 'Were you in the building?', a: 'No, I was home with a migraine. I texted the CEO.', clue: 'Text message verified. CEO replied at 3:45 AM confirming.', clueAdded: true },
            { q: 'Could anyone have used your credentials?', a: 'I use MFA and my phone was with me.', clue: 'MFA logs show no authentication attempts from Maya\'s account last night.', clueAdded: true }
          ]
        }
      ]
    },
    {
      id: 'case-004',
      title: 'The Poisoned Artist',
      icon: '🎨',
      difficulty: 'medium',
      difficultyLabel: 'Medium',
      time: '25 min',
      desc: 'Famed painter Marco Vidal collapsed during his own exhibition. Find who poisoned his champagne.',
      story: 'Marco Vidal\'s highly anticipated gallery opening turned tragic when he took a sip from his champagne flute and collapsed. He is in critical condition but stable. Traces of digitalis, a rare toxin, were found in his glass. The champagne was poured by his assistant, but the flute was passed among at least four people before Marco took his drink.',
      culprit: 'Isabella Moreau',
      evidence: [
        { id: 'e1', name: 'Champagne Flute', icon: '🥂', hint: 'Fingerprints from 3 people; residue of digitalis on rim' },
        { id: 'e2', name: 'Waiter Statement', icon: '🗣️', hint: 'A woman in blue asked for the "special bottle" for Marco' },
        { id: 'e3', name: 'Garden Gate Log', icon: '🌿', hint: 'Someone entered through the private garden at 7:40 PM' },
        { id: 'e4', name: 'Digitalis Prescription', icon: '💊', hint: 'Registered to Isabella Moreau for her mother' }
      ],
      suspects: [
        {
          id: 's1', name: 'Isabella Moreau', role: 'Rival Painter', icon: '👩‍🎨',
          questions: [
            { q: 'Why were you at his exhibition?', a: 'We are rivals, yes, but professionals. I came to observe.', clue: 'Witnesses report her confronting Marco 15 minutes before the toast.', clueAdded: true },
            { q: 'Did you touch his glass?', a: 'I would never! Disgusting.', clue: 'Flute shows a woman\'s thumbprint matching Isabella\'s glove pattern.', clueAdded: true },
            { q: 'Your mother\'s medication?', a: 'She takes digitalis for a heart condition. Strictly managed.', clue: 'The last refill was last week, but only half the pills remain.', clueAdded: true },
            { q: 'Where were you at 7:40?', a: 'Inside the gallery with everyone else.', clue: 'Garden gate camera captures a figure in a blue velvet coat entering at 7:40 — Isabella\'s signature look.', clueAdded: true }
          ]
        },
        {
          id: 's2', name: 'Derek Voss', role: 'Art Critic', icon: '🕵️',
          questions: [
            { q: 'Your history with Marco?', a: 'Panned his last exhibition. Doesn\'t mean I poison people.', clue: 'Derek has a documented grudge but no history of violence.', clueAdded: true },
            { q: 'Did you handle the champagne?', a: 'Took a photo of it with my phone, then set it down.', clue: 'Fingerprints confirm. Phone records show photos at 7:55 — after the poisoning window.', clueAdded: true }
          ]
        },
        {
          id: 's3', name: 'Lina Park', role: 'Gallery Assistant', icon: '🧑‍🏫',
          questions: [
            { q: 'Did you pour the champagne?', a: 'Yes. The "special bottle" for Marco from the cellar.', clue: 'But she brought it to the serving station — she did not hand it to Marco.', clueAdded: true },
            { q: 'Who asked for the special bottle?', a: 'A woman with a French accent. Tall, dark hair, blue dress.', clue: 'Description matches Isabella perfectly.', clueAdded: true }
          ]
        }
      ]
    },
    {
      id: 'case-005',
      title: 'The Lost Formula',
      icon: '🧪',
      difficulty: 'easy',
      difficultyLabel: 'Easy',
      time: '15 min',
      desc: 'The recipe for the world\'s best-selling energy drink was stolen from a lab safe. Three suspects, one culprit.',
      story: 'NovaBev Corp reports that Formula X — their flagship energy drink recipe — was removed from its locked lab safe last night. The safe uses a combination lock known only to two executives. The lab window was jimmied open from the outside, but nothing else in the lab was disturbed.',
      culprit: 'Dr. Avery Stone',
      evidence: [
        { id: 'e1', name: 'Safe Combination', icon: '🔢', hint: 'Written on a scrap of paper in the trash' },
        { id: 'e2', name: 'Window Tool Marks', icon: '🔧', hint: 'Crowbar pry marks on window frame' },
        { id: 'e3', name: 'Lab Coat Pocket', icon: '🧥', hint: 'Gloves found in Avery\'s coat pocket' }
      ],
      suspects: [
        {
          id: 's1', name: 'Dr. Avery Stone', role: 'Senior Chemist', icon: '🧑‍🔬',
          questions: [
            { q: 'Your knowledge of the safe?', a: 'Only the CEO and CFO know the combination. Not me.', clue: 'Security cam footage from last week shows Avery glancing over the CEO\'s shoulder while the safe was opened.', clueAdded: true },
            { q: 'Why gloves in your coat?', a: 'Lab gloves! I\'m a chemist.', clue: 'These are heavy-duty leather gloves — the exact kind needed to handle a crowbar without prints.', clueAdded: true },
            { q: 'Any job offers?', a: 'Not that I can discuss.', clue: 'A rival company posted a "Senior Chemist - Energy Beverage" position 3 days ago with a $40K salary increase.', clueAdded: true }
          ]
        },
        {
          id: 's2', name: 'Carl Morales', role: 'Night Janitor', icon: '👷',
          questions: [
            { q: 'Any tools missing?', a: 'My crowbar went missing yesterday. Reported it to HR.', clue: 'Crowbar was found in a dumpster — wiped clean, but with janitorial cleaning residue.', clueAdded: true },
            { q: 'See anyone suspicious?', a: 'Dr. Stone left the building at 9:15 PM, 2 hours late.', clue: 'Places Avery at the scene during the estimated break-in window.', clueAdded: true }
          ]
        },
        {
          id: 's3', name: 'Tanya Reese', role: 'CFO', role2: 'CFO', icon: '👩‍💼',
          questions: [
            { q: 'Who has safe combinations?', a: 'Myself and the CEO. We change them quarterly.', clue: 'Combination was written on a slip of paper with her handwriting.', clueAdded: true },
            { q: 'Where were you last night?', a: 'At a dinner with investors. 8 PM to 11 PM.', clue: 'Restaurant receipt and photos from 8 people confirm the alibi.', clueAdded: true }
          ]
        }
      ]
    },
    {
      id: 'case-006',
      title: 'The Celebrity Scandal',
      icon: '🎬',
      difficulty: 'hard',
      difficultyLabel: 'Hard',
      time: '35 min',
      desc: 'A famous actress\' private photos were leaked. Investigate the hack and find who released them.',
      story: 'Oscar-nominated actress Sofia Rivera woke up to find 47 private photos from her encrypted cloud account published on a notorious gossip site. The site claims the leak came from a "trusted insider." The photos span three years and include her ex-husband, current partner, and private events. Sofia\'s password was 22 characters, but her iCloud backup was accessed via recovery question bypass.',
      culprit: 'Marcus Price',
      evidence: [
        { id: 'e1', name: 'IP Logs', icon: '🌐', hint: 'Bounce routed through 4 VPNs, final IP in LA' },
        { id: 'e2', name: 'Chat Leak Evidence', icon: '💬', hint: 'Dated March 14th: "Got them!"' },
        { id: 'e3', name: 'Recovery Question', icon: '❓', hint: '"First dog name" — answer: "Porthos"' },
        { id: 'e4', name: 'Site Payment Record', icon: '💸', hint: 'Bitcoin payment on March 15th to leaker wallet' },
        { id: 'e5', name: 'Deleted Calendar', icon: '📅', hint: 'March 12: "dinner at Nobu with 👑"' },
        { id: 'e6', name: 'Bitcoins Trace', icon: '₿', hint: 'Wallet ID linked to a talent agency assistant' }
      ],
      suspects: [
        {
          id: 's1', name: 'Marcus Price', role: 'Ex-Assistant', icon: '🧑‍💼',
          questions: [
            { q: 'When were you fired?', a: 'Last month. She claimed I overstepped. I didn\'t.', clue: 'Sofia fired him after discovering he leaked a set photo to a blogger.', clueAdded: true },
            { q: 'Know her first dog\'s name?', a: 'Porthos! Porthos Du Vallon. She dressed him up for premieres.', clue: 'Only 2-3 people in the world knew Porthos\' full name — Marcus was one of them.', clueAdded: true },
            { q: 'Your financial situation?', a: 'I\'m struggling. But I have integrity.', clue: 'His bank account received $18K in Bitcoin three days ago — traced to the gossip site\'s known wallet.', clueAdded: true },
            { q: 'Nobu dinner with "👑"?', a: 'That\'s not my calendar. I was working.', clue: 'Nobu waiter confirms Marcus ate there on March 12 with a male celebrity who Sofia dated in 2023.', clueAdded: true },
            { q: '"Got them!" text?', a: 'I don\'t recognize that.', clue: 'Metadata shows the chat was sent from Marcus\'s work laptop — which he kept after being fired.', clueAdded: true }
          ]
        },
        {
          id: 's2', name: 'Liam Cross', role: 'Ex-Husband', icon: '🤵',
          questions: [
            { q: 'Any recent contact?', a: 'Lawyers handle everything. Direct zero contact.', clue: 'Phone records show a 12-minute call from Liam to Sofia\'s main line 2 days before the leak.', clueAdded: true },
            { q: 'Financial motive?', a: 'Settlement was fair. No need.', clue: 'Liam\'s production company is in debt — $4.1M owed to investors.', clueAdded: true },
            { q: 'Bitcoin wallet?', a: 'I invest through a fund. Not directly.', clue: 'Fund manager confirms Liam holds no direct Bitcoin.', clueAdded: true }
          ]
        },
        {
          id: 's3', name: 'Jade Nakamura', role: 'Current Stylist', icon: '👘',
          questions: [
            { q: 'Your access to her life?', a: 'I\'m in her house daily. Know her routines, her phone code.', clue: 'Phone code is changed weekly. Jade was not told the new code 2 weeks ago.', clueAdded: true },
            { q: 'Porthos?', a: 'I\'ve never met Porthos. I joined the team 2 years ago.', clue: 'Porthos died 5 years ago. Jade cannot know his name from experience.', clueAdded: true }
          ]
        },
        {
          id: 's4', name: 'Bella Santos', role: 'Best Friend', icon: '👭',
          questions: [
            { q: 'Have you argued?', a: 'Once. She backed out of my birthday trip.', clue: 'The argument was 6 months ago; friendship recovered fully.', clueAdded: true },
            { q: 'Porthos?', a: 'He was my favorite! We got him when we were 22.', clue: 'Bella would know Porthos\'s name, but her finances are stable.', clueAdded: true },
            { q: 'Were you in LA on March 15th?', a: 'In Paris for Fashion Week. Check Instagram.', clue: 'Verified with 17 posts, flight records, and hotel check-in.', clueAdded: true }
          ]
        }
      ]
    }
  ];

  /* ============================================
     CASES PAGE FILTERING
     ============================================ */
  function initCasesPage() {
    const grid = document.querySelector('[data-cases-grid]');
    const filters = document.querySelectorAll('[data-filter]');
    if (!grid) return;

    renderCases(CASES, grid);

    filters.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const val = btn.getAttribute('data-filter');
        filters.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        const filtered = val === 'all' ? CASES : CASES.filter(function (c) { return c.difficulty === val; });
        renderCases(filtered, grid);
      });
    });
  }

  function renderCases(cases, container) {
    container.innerHTML = cases.map(function (c) {
      return '<div class="case-card glass">' +
        '<div class="case-image">' + c.icon + '</div>' +
        '<div class="case-body">' +
          '<div class="case-meta">' +
            '<span class="case-tag ' + c.difficulty + '">' + c.difficultyLabel + '</span>' +
            '<span class="case-tag time">⏱️ ' + c.time + '</span>' +
          '</div>' +
          '<h3 class="case-title">' + c.title + '</h3>' +
          '<p class="case-desc">' + c.desc + '</p>' +
          '<div class="case-footer">' +
            '<a class="case-btn" data-case-id="' + c.id + '" href="game.html?case=' + c.id + '">🚀 Start Investigation</a>' +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  /* ============================================
     GAME STATE & LOGIC
     ============================================ */
  let gameState = {
    caseId: null,
    caseData: null,
    discoveredEvidence: [],
    clues: [],
    notebook: [],
    askedQuestions: {},
    accusedSuspect: null,
    progress: 0,
    timer: 0,
    timerInterval: null,
    timerRunning: false,
    selectedSuspect: null
  };

  function initGamePage() {
    const params = new URLSearchParams(window.location.search);
    const caseId = params.get('case');
    const c = CASES.find(function (x) { return x.id === caseId; }) || CASES[0];

    gameState.caseId = c.id;
    gameState.caseData = c;
    gameState.discoveredEvidence = [];
    gameState.clues = [];
    gameState.notebook = [];
    gameState.askedQuestions = {};
    gameState.accusedSuspect = null;
    gameState.progress = 0;

    renderStory(c);
    renderEvidence(c);
    renderSuspects(c);
    renderClues();
    renderNotebook();
    updateProgress();

    startTimer();
    bindGameEvents();
  }

  function renderStory(c) {
    const el = document.querySelector('[data-game-story]');
    if (el) {
      el.innerHTML = '<p>' + c.story + '</p>';
    }
    const title = document.querySelector('[data-game-title]');
    if (title) title.textContent = c.title;
  }

  function renderEvidence(c) {
    const grid = document.querySelector('[data-evidence-grid]');
    if (!grid) return;
    grid.innerHTML = c.evidence.map(function (e) {
      const discovered = gameState.discoveredEvidence.includes(e.id);
      return '<div class="evidence-item glass glass-glow ' + (discovered ? 'discovered' : '') + '" data-evidence-id="' + e.id + '">' +
        '<div class="evidence-icon">' + e.icon + '</div>' +
        '<div class="evidence-name">' + e.name + '</div>' +
        '<div class="evidence-status">' + (discovered ? '✓ Discovered' : '🔒 Analyze') + '</div>' +
      '</div>';
    }).join('');
  }

  function renderSuspects(c) {
    const grid = document.querySelector('[data-suspects-grid]');
    if (!grid) return;
    grid.innerHTML = c.suspects.map(function (s) {
      const selected = gameState.selectedSuspect === s.id ? 'selected' : '';
      const accused = gameState.accusedSuspect === s.id ? 'accused' : '';
      const questionBtns = s.questions.map(function (q, idx) {
        const key = s.id + '-' + idx;
        const asked = gameState.askedQuestions[key] ? 'asked' : '';
        return '<button class="question-btn ' + asked + '" data-question="' + key + '" data-suspect="' + s.id + '" data-qidx="' + idx + '">' +
          (asked ? '✓ Asked' : '❓ ' + q.q) +
        '</button>';
      }).join('');
      return '<div class="suspect-card glass glass-glow ' + selected + ' ' + accused + '" data-suspect-card="' + s.id + '">' +
        '<div class="suspect-avatar">' + s.icon + '</div>' +
        '<div class="suspect-name">' + s.name + '</div>' +
        '<div class="suspect-role">' + s.role + '</div>' +
        '<div class="suspect-questions">' + questionBtns + '</div>' +
      '</div>';
    }).join('');
  }

  function renderClues() {
    const grid = document.querySelector('[data-clues-grid]');
    if (!grid) return;
    if (!gameState.clues.length) {
      grid.innerHTML = '<div class="clue-item empty glass">🔍 No clues collected yet. Question suspects and analyze evidence.</div>';
      return;
    }
    grid.innerHTML = gameState.clues.map(function (clue, i) {
      return '<div class="clue-item glass">' +
        '<div class="clue-label">CLUE #' + (i + 1) + '</div>' +
        '<div class="clue-text">' + clue + '</div>' +
      '</div>';
    }).join('');
  }

  function renderNotebook() {
    const list = document.querySelector('[data-notebook-list]');
    if (!list) return;
    if (!gameState.notebook.length) {
      list.innerHTML = '<li style="text-align:center; color: var(--text-secondary);">📒 No notes yet</li>';
      return;
    }
    list.innerHTML = gameState.notebook.map(function (n) {
      return '<li>' + n + '</li>';
    }).join('');
  }

  function updateProgress() {
    const c = gameState.caseData;
    if (!c) return;
    const totalEvidence = c.evidence.length;
    let totalQ = 0;
    c.suspects.forEach(function (s) { totalQ += s.questions.length; });
    const discovered = gameState.discoveredEvidence.length;
    const asked = Object.keys(gameState.askedQuestions).length;
    const total = totalEvidence + totalQ;
    const current = discovered + asked;
    const pct = Math.floor((current / total) * 100);
    gameState.progress = pct;

    const bar = document.querySelector('[data-progress-fill]');
    const label = document.querySelector('[data-progress-label]');
    if (bar) bar.style.width = pct + '%';
    if (label) label.textContent = pct + '%';
  }

  function addClue(text) {
    if (!gameState.clues.includes(text)) {
      gameState.clues.push(text);
      renderClues();
    }
  }

  function addNotebook(text) {
    if (!gameState.notebook.includes(text)) {
      gameState.notebook.push(text);
      renderNotebook();
    }
  }

  function bindGameEvents() {
    const evGrid = document.querySelector('[data-evidence-grid]');
    if (evGrid) {
      evGrid.addEventListener('click', function (e) {
        const item = e.target.closest('.evidence-item');
        if (!item) return;
        const id = item.getAttribute('data-evidence-id');
        analyzeEvidence(id);
      });
    }

    const sGrid = document.querySelector('[data-suspects-grid]');
    if (sGrid) {
      sGrid.addEventListener('click', function (e) {
        const qBtn = e.target.closest('.question-btn');
        if (qBtn) {
          const key = qBtn.getAttribute('data-question');
          const sid = qBtn.getAttribute('data-suspect');
          const idx = parseInt(qBtn.getAttribute('data-qidx'), 10);
          if (!gameState.askedQuestions[key]) {
            askQuestion(sid, idx);
          }
          return;
        }
        const card = e.target.closest('.suspect-card');
        if (card) {
          const sid = card.getAttribute('data-suspect-card');
          gameState.selectedSuspect = gameState.selectedSuspect === sid ? null : sid;
          renderSuspects(gameState.caseData);
        }
      });
    }

    const accuseBtn = document.querySelector('[data-accuse-btn]');
    if (accuseBtn) {
      accuseBtn.addEventListener('click', showAccusationModal);
    }

    const timerStart = document.querySelector('[data-timer-start]');
    const timerPause = document.querySelector('[data-timer-pause]');
    const timerReset = document.querySelector('[data-timer-reset]');
    if (timerStart) timerStart.addEventListener('click', startTimer);
    if (timerPause) timerPause.addEventListener('click', pauseTimer);
    if (timerReset) timerReset.addEventListener('click', resetTimer);
  }

  function analyzeEvidence(id) {
    if (gameState.discoveredEvidence.includes(id)) return;
    const ev = gameState.caseData.evidence.find(function (e) { return e.id === id; });
    if (!ev) return;
    gameState.discoveredEvidence.push(id);
    addClue('Evidence: ' + ev.name + ' — ' + ev.hint);
    addNotebook('🔎 ' + ev.name + ': ' + ev.hint);
    renderEvidence(gameState.caseData);
    updateProgress();
  }

  function askQuestion(suspectId, qIndex) {
    const suspect = gameState.caseData.suspects.find(function (s) { return s.id === suspectId; });
    if (!suspect) return;
    const q = suspect.questions[qIndex];
    const key = suspectId + '-' + qIndex;
    gameState.askedQuestions[key] = true;

    if (q.clue) {
      addClue(q.clue);
      addNotebook('💬 ' + suspect.name + ': ' + q.clue);
    }

    showResponseModal(suspect, q);
    renderSuspects(gameState.caseData);
    updateProgress();
  }

  function showResponseModal(suspect, q) {
    const overlay = document.querySelector('[data-modal="response"]');
    if (!overlay) return;
    overlay.querySelector('.response-avatar').textContent = suspect.icon;
    overlay.querySelector('.response-name').textContent = suspect.name;
    overlay.querySelector('.response-question').textContent = '❓ ' + q.q;
    overlay.querySelector('.response-answer').textContent = '💬 ' + q.a;
    openModal(overlay);
  }

  function showAccusationModal() {
    const overlay = document.querySelector('[data-modal="accuse"]');
    if (!overlay) return;
    const list = overlay.querySelector('.accuse-list');
    list.innerHTML = gameState.caseData.suspects.map(function (s) {
      return '<div class="accuse-option" data-accuse-id="' + s.id + '">' +
        '<div class="accuse-option-avatar">' + s.icon + '</div>' +
        '<div>' +
          '<div class="accuse-option-name">' + s.name + '</div>' +
          '<div class="accuse-option-role">' + s.role + '</div>' +
        '</div>' +
      '</div>';
    }).join('');

    let selected = null;
    list.querySelectorAll('.accuse-option').forEach(function (opt) {
      opt.addEventListener('click', function () {
        list.querySelectorAll('.accuse-option').forEach(function (o) { o.classList.remove('selected'); });
        opt.classList.add('selected');
        selected = opt.getAttribute('data-accuse-id');
      });
    });

    const confirmBtn = overlay.querySelector('[data-confirm-accuse]');
    confirmBtn.onclick = function () {
      if (!selected) {
        alert('Please select a suspect to accuse.');
        return;
      }
      closeModal(overlay);
      processAccusation(selected);
    };

    openModal(overlay);
  }

  function processAccusation(suspectId) {
    pauseTimer();
    const suspect = gameState.caseData.suspects.find(function (s) { return s.id === suspectId; });
    const correct = suspect.name === gameState.caseData.culprit;
    gameState.accusedSuspect = suspectId;
    renderSuspects(gameState.caseData);

    if (correct) {
      showVictory(suspect);
    } else {
      showFailure(suspect);
    }
  }

  function showVictory(suspect) {
    const time = formatTime(gameState.timer);
    const score = calculateScore();

    const overlay = document.querySelector('[data-modal="correct"]');
    if (overlay) {
      overlay.querySelector('.modal-stats').innerHTML =
        '<div><div class="modal-stat-num" data-counter="' + score + '" data-suffix="">' + score + '</div><div class="modal-stat-label">SCORE</div></div>' +
        '<div><div class="modal-stat-num">' + gameState.progress + '%</div><div class="modal-stat-label">PROGRESS</div></div>' +
        '<div><div class="modal-stat-num">' + time + '</div><div class="modal-stat-label">TIME</div></div>';
      overlay.querySelector('.modal-message').innerHTML = 'Excellent detective work! You correctly identified <strong>' + suspect.name + '</strong> as the culprit behind "' + gameState.caseData.title + '". The truth always comes to light.';
      openModal(overlay);
      initCounters();
    }
    triggerVictoryAnimation();
    saveScore(score, time);
  }

  function showFailure(suspect) {
    const overlay = document.querySelector('[data-modal="wrong"]');
    if (overlay) {
      overlay.querySelector('.modal-message').innerHTML =
        'You accused <strong>' + suspect.name + '</strong>, but the evidence points to <strong>' + gameState.caseData.culprit + '</strong>. Review the clues and try again.';
      openModal(overlay);
    }
  }

  function calculateScore() {
    const base = 1000;
    const progressBonus = Math.floor(gameState.progress * 5);
    const timePenalty = Math.min(500, Math.floor(gameState.timer / 3));
    return Math.max(100, base + progressBonus - timePenalty);
  }

  function triggerVictoryAnimation() {
    const glow = document.createElement('div');
    glow.className = 'victory-glow';
    document.body.appendChild(glow);
    setTimeout(function () { glow.remove(); }, 2500);

    const colors = ['#6366f1', '#ec4899', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];
    const count = 80;
    for (let i = 0; i < count; i++) {
      const c = document.createElement('div');
      c.className = 'confetti';
      c.style.left = Math.random() * 100 + 'vw';
      c.style.background = colors[Math.floor(Math.random() * colors.length)];
      c.style.animationDuration = (2 + Math.random() * 3) + 's';
      c.style.animationDelay = Math.random() * 1 + 's';
      c.style.width = (6 + Math.random() * 10) + 'px';
      c.style.height = (6 + Math.random() * 10) + 'px';
      c.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      c.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
      document.body.appendChild(c);
      setTimeout(function () { c.remove(); }, 5000);
    }
  }

  function saveScore(score, time) {
    try {
      const scores = JSON.parse(localStorage.getItem('ai-detective-scores') || '[]');
      scores.push({
        caseId: gameState.caseId,
        caseTitle: gameState.caseData.title,
        score: score,
        time: time,
        timestamp: Date.now()
      });
      localStorage.setItem('ai-detective-scores', JSON.stringify(scores));
    } catch (e) { /* ignore */ }
  }

  /* ---------- Timer ---------- */
  function startTimer() {
    if (gameState.timerRunning) return;
    gameState.timerRunning = true;
    updateTimerDisplay();
    gameState.timerInterval = setInterval(function () {
      gameState.timer++;
      updateTimerDisplay();
    }, 1000);
  }

  function pauseTimer() {
    gameState.timerRunning = false;
    if (gameState.timerInterval) {
      clearInterval(gameState.timerInterval);
      gameState.timerInterval = null;
    }
  }

  function resetTimer() {
    pauseTimer();
    gameState.timer = 0;
    updateTimerDisplay();
  }

  function updateTimerDisplay() {
    const display = document.querySelector('[data-timer-display]');
    if (display) display.textContent = formatTime(gameState.timer);
  }

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  }

  /* ---------- Modal System ---------- */
  function initModals() {
    const overlays = document.querySelectorAll('.modal-overlay');
    overlays.forEach(function (overlay) {
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay && !overlay.classList.contains('keep-open')) {
          closeModal(overlay);
        }
      });
      const closeBtns = overlay.querySelectorAll('[data-modal-close]');
      closeBtns.forEach(function (b) {
        b.addEventListener('click', function () { closeModal(overlay); });
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(function (o) {
          if (!o.classList.contains('keep-open')) closeModal(o);
        });
      }
    });
  }

  function openModal(overlay) {
    overlay.classList.add('active');
    document.body.classList.add('no-scroll');
  }

  function closeModal(overlay) {
    overlay.classList.remove('active');
    const active = document.querySelectorAll('.modal-overlay.active');
    if (!active.length) document.body.classList.remove('no-scroll');
  }

  /* ============================================
     LEADERBOARD
     ============================================ */
  const LEADERBOARD_DATA = [
    { rank: 1, name: 'Sherlock Holmes', cases: 247, score: 284950, badges: ['gold', 'master', 'speed', 'sharp'] },
    { rank: 2, name: 'Nancy Drew', cases: 198, score: 231400, badges: ['gold', 'master', 'sharp'] },
    { rank: 3, name: 'Hercule Poirot', cases: 176, score: 208900, badges: ['gold', 'master', 'speed'] },
    { rank: 4, name: 'Jessica Fletcher', cases: 154, score: 182300, badges: ['master', 'sharp'] },
    { rank: 5, name: 'Columbo', cases: 142, score: 168700, badges: ['gold', 'speed'] },
    { rank: 6, name: 'Veronica Mars', cases: 128, score: 151200, badges: ['sharp', 'speed'] },
    { rank: 7, name: 'Adrian Monk', cases: 115, score: 138900, badges: ['master'] },
    { rank: 8, name: 'Jane Marple', cases: 102, score: 124500, badges: ['sharp'] },
    { rank: 9, name: 'Ellery Queen', cases: 89, score: 108400, badges: ['speed'] },
    { rank: 10, name: 'Kojak', cases: 76, score: 93100, badges: ['gold'] },
    { rank: 11, name: 'Magnum P.I.', cases: 64, score: 78700, badges: ['speed'] },
    { rank: 12, name: 'Lucas Davenport', cases: 52, score: 64200, badges: ['sharp'] }
  ];

  function initLeaderboard() {
    const tbody = document.querySelector('[data-leaderboard-body]');
    if (!tbody) return;

    const badgeMap = {
      gold: { text: '🥇 Champion', class: 'badge-gold' },
      master: { text: '🧠 Master', class: 'badge-master' },
      speed: { text: '⚡ Speed', class: 'badge-speed' },
      sharp: { text: '🎯 Sharp Eye', class: 'badge-sharp' }
    };

    tbody.innerHTML = LEADERBOARD_DATA.map(function (row) {
      const rankClass = row.rank <= 3 ? 'rank-' + row.rank : 'rank-n';
      const initials = row.name.split(' ').map(function (s) { return s[0]; }).join('').substring(0, 2);
      const badges = (row.badges || []).map(function (b) {
        const info = badgeMap[b] || { text: b, class: '' };
        return '<span class="badge ' + info.class + '">' + info.text + '</span>';
      }).join('');

      return '<tr class="' + rankClass + '">' +
        '<td><div class="rank"><span class="rank-badge">' + row.rank + '</span></div></td>' +
        '<td><div class="player-info"><div class="player-avatar">' + initials + '</div><div class="player-name">' + row.name + '</div></div></td>' +
        '<td><span class="cases-solved">' + row.cases.toLocaleString() + '</span></td>' +
        '<td><span class="score">' + row.score.toLocaleString() + '</span></td>' +
        '<td><div class="badges">' + badges + '</div></td>' +
      '</tr>';
    }).join('');
  }

  /* ============================================
     CONTACT FORM
     ============================================ */
  function initContactForm() {
    const form = document.querySelector('[data-contact-form]');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        message: form.message.value.trim()
      };

      if (!data.name || !data.email || !data.message) {
        alert('Please fill in all fields.');
        return;
      }
      if (!isValidEmail(data.email)) {
        alert('Please enter a valid email address.');
        return;
      }

      try {
        const messages = JSON.parse(localStorage.getItem('ai-detective-messages') || '[]');
        messages.push(Object.assign({}, data, { timestamp: Date.now() }));
        localStorage.setItem('ai-detective-messages', JSON.stringify(messages));
      } catch (e) { /* ignore */ }

      const overlay = document.querySelector('[data-modal="contact-success"]');
      if (overlay) {
        overlay.querySelector('.modal-message').textContent =
          'Thank you, ' + data.name + '! We have received your message and will get back to you soon.';
        openModal(overlay);
      }
      form.reset();
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* ============================================
     INITIALIZATION
     ============================================ */
  function init() {
    initLoader();
    initParticles();
    initCursor();
    initTheme();
    initNavbar();
    initMobileMenu();
    initTyping();
    initCounters();
    initReveal();
    initBackToTop();
    initFAQ();
    initCasesPage();
    initModals();
    initLeaderboard();
    initContactForm();

    if (document.querySelector('[data-game-story]')) {
      initGamePage();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
