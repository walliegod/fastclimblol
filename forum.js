

document.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem('fc_auth') !== 'true') {
    window.location.replace('index.html');
    return;
  }


  const container = document.getElementById('forum-content');
  if (container) {
    container.innerHTML = `
      <div class="forum-content">
        <div class="section-title">LATEST DISCUSSIONS</div>
        <div class="threads">
          <div class="thread" data-id="1">
            <div class="thread-title">Speed climbing training plan for beginners</div>
            <div class="thread-meta">by @vertigo • 8 replies • 4h ago</div>
          </div>
          <div class="thread" data-id="2">
            <div class="thread-title">Just hit 5.13a on lead in under 3min</div>
            <div class="thread-meta">by @flash • 31 replies • 1d ago</div>
          </div>
          <div class="thread" data-id="3">
            <div class="thread-title">Best shoes for fast bouldering sends?</div>
            <div class="thread-meta">by @crimpqueen • 14 replies • 2d ago</div>
          </div>
          <div class="thread" data-id="4">
            <div class="thread-title">Local comp this weekend — who's in?</div>
            <div class="thread-meta">by @gymrat • 22 replies • 3d ago</div>
          </div>
        </div>

        <div class="compose">
          <div class="section-title" style="margin-bottom:0.6rem;">START A NEW THREAD</div>
          <input type="text" id="new-title" placeholder="Thread title">
          <textarea id="new-body" placeholder="Share beta, questions or training tips..."></textarea>
          <button id="post-btn">POST THREAD</button>
        </div>
      </div>
    `;
  }


  const forumShell = document.getElementById('forum');
  if (forumShell) forumShell.style.display = 'block';


  initForumInteractions();
  setupLogout();
  setupModal();
});

function initForumInteractions() {

  document.querySelectorAll('.thread').forEach(thread => {
    thread.addEventListener('click', () => {
      const titleEl = thread.querySelector('.thread-title');
      if (titleEl) openThreadModal(titleEl.textContent.trim());
    });
  });

  const postBtn = document.getElementById('post-btn');
  const titleInput = document.getElementById('new-title');
  const bodyInput = document.getElementById('new-body');

  if (postBtn && titleInput && bodyInput) {
    postBtn.addEventListener('click', () => {
      const title = titleInput.value.trim();
      if (!title) {
        titleInput.style.borderColor = '#ef4444';
        setTimeout(() => titleInput.style.borderColor = '#242424', 900);
        return;
      }

      const threadsContainer = document.querySelector('.threads');
      if (!threadsContainer) return;

      const newThread = document.createElement('div');
      newThread.className = 'thread';
      newThread.innerHTML = `
        <div class="thread-title">${escapeHtml(title)}</div>
        <div class="thread-meta">by @you • just now • 0 replies</div>
      `;
      threadsContainer.prepend(newThread);

      newThread.addEventListener('click', () => openThreadModal(title));

      titleInput.value = '';
      bodyInput.value = '';

      const orig = postBtn.textContent;
      postBtn.textContent = 'POSTED';
      postBtn.style.background = '#22c55e';
      setTimeout(() => {
        postBtn.textContent = orig;
        postBtn.style.background = '#3b82f6';
      }, 1250);
    });

    titleInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        bodyInput.focus();
      }
    });
  }
}

function setupLogout() {
  const btn = document.getElementById('logout-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      sessionStorage.removeItem('fc_auth');
      window.location.href = 'index.html';
    });
  }
}

function openThreadModal(title) {
  const modal = document.getElementById('modal');
  if (!modal) return;

  modal.innerHTML = `
    <div class="modal-content">
      <button class="modal-close" id="modal-close">&times;</button>
      <h3 id="modal-title">${escapeHtml(title)}</h3>
      <div class="modal-body">
        <p>This thread is part of the fastclimb community forum.</p>
        <p><strong>${escapeHtml(title)}</strong> — feel free to share your beta, training advice, questions, or send stories.</p>
        <p style="color:#666; font-size:0.82rem; margin-top:1.4rem;">
          Full commenting, reactions, and real-time updates coming soon.<br>
          Thanks for being an early member.
        </p>
      </div>
      <div class="modal-footer">
        <button class="btn-secondary" id="modal-close-btn">CLOSE</button>
      </div>
    </div>
  `;
  modal.classList.add('show');

  const close = () => {
    modal.classList.remove('show');
    modal.innerHTML = '';
  };

  modal.querySelector('#modal-close')?.addEventListener('click', close, { once: true });
  modal.querySelector('#modal-close-btn')?.addEventListener('click', close, { once: true });
  modal.addEventListener('click', e => { if (e.target === modal) close(); }, { once: true });

  document.addEventListener('keydown', function esc(e) {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      close();
      document.removeEventListener('keydown', esc);
    }
  }, { once: true });
}

function setupModal() {

}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
            .replace(/"/g,'&quot;').replace(/'/g,'&#039;');
}
