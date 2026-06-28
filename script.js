

import {
  presets,
  queueWrite
} from "https://esm.sh/glitched-writer@2.0.29";

const CORRECT_CODE = "MzI4M0Y3Q0MEVDQ0ZCNDVF";

document.addEventListener('DOMContentLoaded', () => {

  const phrases = [
    "Hi,",
    "welcome to",
    "fastclimb.lol"
  ];

  queueWrite(
    phrases,
    ".text",
    {
      ...presets.neo,
      letterize: true
    },
    800,
    true
  );


  const input = document.getElementById('passcode-input');
  const status = document.getElementById('status');
  const accessGate = document.querySelector('.access-gate');

  if (input && status && accessGate) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handlePasscodeSubmit(input, status, accessGate);
      }
    });

    input.addEventListener('input', () => {
      if (status.textContent) status.textContent = '';
    });
  }
});


function handlePasscodeSubmit(input, statusEl, gateEl) {
  const value = input.value.trim();

  if (!value) {
    statusEl.textContent = 'KEYCODE REQUIRED';
    statusEl.style.color = '#ef4444';
    setTimeout(() => {
      if (statusEl.textContent === 'KEYCODE REQUIRED') statusEl.textContent = '';
    }, 1400);
    return;
  }

  if (value === CORRECT_CODE) {

    statusEl.textContent = 'ACCESS GRANTED';
    statusEl.style.color = '#22c55e';
    input.disabled = true;
    input.style.color = '#22c55e';

    const keyIcon = document.querySelector('.key-icon');
    if (keyIcon) {
      keyIcon.style.color = '#22c55e';
      keyIcon.style.transform = 'scale(1.05)';
    }

    setTimeout(() => {
      gateEl.style.transition = 'opacity 420ms ease, transform 420ms ease';
      gateEl.style.opacity = '0';
      gateEl.style.transform = 'translateY(-22px)';

      setTimeout(() => {
        sessionStorage.setItem('fc_auth', 'true');
        window.location.href = 'forum.html';
      }, 420);
    }, 850);
  } else {

    statusEl.textContent = 'INVALID KEYCODE';
    statusEl.style.color = '#ef4444';
    input.classList.add('shake');

    setTimeout(() => {
      input.classList.remove('shake');
      setTimeout(() => {
        if (statusEl.textContent === 'INVALID KEYCODE') {
          statusEl.textContent = '';
          statusEl.style.color = '#888888';
        }
      }, 600);
    }, 480);
  }
}
