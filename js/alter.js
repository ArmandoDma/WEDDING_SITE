document.addEventListener('DOMContentLoaded', () => {
  const envelope = document.getElementById('envelope');
  const btnOpen = document.getElementById('open');
  const btnReset = document.getElementById('reset');

  function openEnvelope() {
    envelope.classList.add('open');
    envelope.classList.remove('close');
  }

  function closeEnvelope() {
    envelope.classList.add('close');
    envelope.classList.remove('open');
  }

  // click en el sobre
  envelope.addEventListener('click', openEnvelope);

  // botón abrir
  btnOpen.addEventListener('click', openEnvelope);

  // botón reset / cerrar
  btnReset.addEventListener('click', closeEnvelope);
});
