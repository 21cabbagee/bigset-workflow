/* ── app.js — Bigset Workflow Interactive App ── */

/* ══════════════════════════════════════════
   NAVBAR SCROLL
══════════════════════════════════════════ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ══════════════════════════════════════════
   PARTICLE CANVAS
══════════════════════════════════════════ */
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');

  let W, H, particles = [], animId;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function Particle() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.r  = Math.random() * 1.8 + 0.4;
    this.alpha = Math.random() * 0.5 + 0.2;
    this.hue = Math.random() > 0.5 ? 220 : 270; // blue or violet
  }

  function init() {
    particles = Array.from({ length: 80 }, () => new Particle());
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `hsla(${particles[i].hue}, 80%, 70%, ${(1 - dist / 120) * 0.18})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw particles
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 80%, 72%, ${p.alpha})`;
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    }

    animId = requestAnimationFrame(draw);
  }

  resize();
  init();
  draw();
  window.addEventListener('resize', () => { resize(); }, { passive: true });
})();

/* ══════════════════════════════════════════
   INTERSECTION OBSERVER — ANIMATE ON SCROLL
══════════════════════════════════════════ */
const observerOptions = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };
const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      animObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('[data-animate]').forEach(el => animObserver.observe(el));

/* Workflow steps observe */
document.querySelectorAll('.workflow-step').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  animObserver.observe(el);
  el.setAttribute('data-animate', '');
});

/* ══════════════════════════════════════════
   TYPEWRITER — STEP 1
══════════════════════════════════════════ */
const PROMPT_TEXT = 'Startups that raised funding in the last 30 days, with what they do, funding stage, location, and careers page.';
const typewriterEl = document.getElementById('typewriterText');
const terminalOutput = document.getElementById('terminalOutput');

let twStarted = false;

function runTypewriter() {
  if (twStarted) return;
  twStarted = true;

  let i = 0;
  const speed = 38;

  function type() {
    if (i < PROMPT_TEXT.length) {
      typewriterEl.textContent += PROMPT_TEXT[i];
      i++;
      setTimeout(type, speed);
    } else {
      // Show output after typing is done
      setTimeout(() => {
        const lines = terminalOutput.querySelectorAll('.t-line');
        terminalOutput.classList.remove('hidden');
        lines.forEach((line, idx) => {
          line.style.animationDelay = `${idx * 0.1}s`;
        });
      }, 400);
    }
  }
  type();
}

// Start typewriter when step1 scrolls into view
const step1 = document.getElementById('step1');
if (step1) {
  const twObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      setTimeout(runTypewriter, 600);
      twObserver.disconnect();
    }
  }, { threshold: 0.3 });
  twObserver.observe(step1);
}

/* ══════════════════════════════════════════
   AGENT PENDING ANIMATION — STEP 2
══════════════════════════════════════════ */
(function agentAnimation() {
  const pendingEl = document.getElementById('agentPending');
  if (!pendingEl) return;

  const dots = ['...', '.. ', '.  ', '   ', '...'];
  let i = 0;
  setInterval(() => {
    pendingEl.textContent = dots[i % dots.length];
    i++;
  }, 400);

  // After some seconds, mark it done
  setTimeout(() => {
    pendingEl.textContent = '✓';
    pendingEl.classList.remove('pending');
    pendingEl.style.color = 'var(--accent-emerald)';
  }, 6000);
})();

/* ══════════════════════════════════════════
   EXPORT PANEL INTERACTIONS
══════════════════════════════════════════ */
window.selectFormat = function(format, btn) {
  document.querySelectorAll('.format-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const exportBtnText = document.getElementById('exportBtnText');
  const ext = format === 'csv' ? 'csv' : 'xlsx';
  exportBtnText.textContent = `⬇ Export leads_funded.${ext}`;
};

window.selectCadence = function(btn) {
  document.querySelectorAll('.cadence-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
};

window.triggerExport = function() {
  const btn = document.getElementById('exportBtn');
  const btnText = document.getElementById('exportBtnText');
  if (btn.classList.contains('loading')) return;

  btn.classList.add('loading');
  btnText.textContent = '⏳ Generating export...';

  setTimeout(() => {
    btn.classList.remove('loading');
    btn.classList.add('done');
    btnText.textContent = '✓ Export ready! Download started';
    showToast('Dataset exported successfully ✓');
    setTimeout(() => {
      btn.classList.remove('done');
      const activeFormat = document.querySelector('.format-btn.active span:last-child').textContent.toLowerCase();
      btnText.textContent = `⬇ Export leads_funded.${activeFormat}`;
    }, 3000);
  }, 1800);
};

/* ══════════════════════════════════════════
   PROMPT CARDS — COPY
══════════════════════════════════════════ */
window.copyPrompt = function(card) {
  const prompt = card.getAttribute('data-prompt');
  navigator.clipboard.writeText(prompt).then(() => {
    card.classList.add('copied');
    showToast('Prompt copied to clipboard ✓');
    setTimeout(() => card.classList.remove('copied'), 3000);
  }).catch(() => {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = prompt;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    card.classList.add('copied');
    showToast('Prompt copied to clipboard ✓');
    setTimeout(() => card.classList.remove('copied'), 3000);
  });
};

/* ══════════════════════════════════════════
   CUSTOM PROMPT — SCHEMA GENERATOR
══════════════════════════════════════════ */
const SCHEMA_PRESETS = {
  startup: ['company_name', 'description', 'funding_stage', 'location', 'funding_amount', 'careers_url'],
  hiring:  ['company_name', 'open_roles', 'tech_stack', 'location', 'funding_stage', 'apply_url'],
  saas:    ['tool_name', 'category', 'free_tier_summary', 'pricing_url', 'monthly_users'],
  ai:      ['startup_name', 'role_title', 'required_skills', 'tech_stack', 'location', 'apply_url'],
  default: ['name', 'description', 'url', 'category', 'date_found'],
};

const COL_TYPES = {
  name: 'string', company_name: 'string', startup_name: 'string', tool_name: 'string',
  description: 'text', free_tier_summary: 'text', open_roles: 'integer', monthly_users: 'integer',
  funding_stage: 'string', location: 'string', funding_amount: 'string', category: 'string',
  tech_stack: 'string[]', required_skills: 'string[]', role_title: 'string',
  careers_url: 'url', apply_url: 'url', pricing_url: 'url', url: 'url',
  date_found: 'date',
};

function detectSchema(text) {
  const lower = text.toLowerCase();
  if (lower.includes('fund') || lower.includes('startup') || lower.includes('raise'))
    return SCHEMA_PRESETS.startup;
  if (lower.includes('hire') || lower.includes('hiring') || lower.includes('job') || lower.includes('engineer'))
    return lower.includes('ai') ? SCHEMA_PRESETS.ai : SCHEMA_PRESETS.hiring;
  if (lower.includes('saas') || lower.includes('tool') || lower.includes('b2b') || lower.includes('free tier'))
    return SCHEMA_PRESETS.saas;
  return SCHEMA_PRESETS.default;
}

window.addCustomPrompt = function() {
  const input = document.getElementById('customPromptInput');
  const schemaPreview = document.getElementById('schemaPreview');
  const schemaCols = document.getElementById('schemaCols');
  const text = input.value.trim();

  if (!text) {
    input.focus();
    input.style.borderColor = 'var(--accent-violet)';
    setTimeout(() => input.style.borderColor = '', 1500);
    return;
  }

  const cols = detectSchema(text);
  schemaCols.innerHTML = '';

  cols.forEach((col, i) => {
    const type = COL_TYPES[col] || 'string';
    const el = document.createElement('div');
    el.className = 'schema-col';
    el.style.animationDelay = `${i * 0.05}s`;
    el.innerHTML = `<span class="schema-col-name">${col}</span><span class="schema-col-type">${type}</span>`;
    schemaCols.appendChild(el);
  });

  schemaPreview.classList.remove('hidden');
  showToast('Schema inferred — ' + cols.length + ' columns detected ✓');
};

document.getElementById('customPromptInput').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') window.addCustomPrompt();
});

/* ══════════════════════════════════════════
   TOAST
══════════════════════════════════════════ */
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

/* ══════════════════════════════════════════
   SMOOTH HERO BUTTON
══════════════════════════════════════════ */
document.getElementById('heroStartBtn').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('workflow').scrollIntoView({ behavior: 'smooth' });
});
