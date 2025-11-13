// script.js - Lógica de la "broma"
(function(){
  const logEl = document.getElementById('log');
  const bar = document.getElementById('bar');
  const percentEl = document.getElementById('percent');
  const finalWrap = document.getElementById('final');
  const finalText = document.getElementById('finalText');
  const resetBtn = document.getElementById('resetBtn');

  // Mensajes falsos que parecerán "escaneos"
  const fakeSteps = [
    "Conectando a dispositivo remoto...",
    "Estableciendo handshake criptográfico...",
    "Extrayendo datos de aplicaciones...",
    "Analizando historial de navegación...",
    "Buscando contraseñas guardadas...",
    "Comprobando backups en la nube...",
    "Escaneando mensajes multimedia...",
    "Obteniendo permisos temporales...",
    "Descifrando tokens...",
    "Preparando informe final..."
  ];

  let percent = 0;
  let stepIndex = 0;

  function appendLog(text){
    const line = document.createElement('div');
    line.textContent = text;
    logEl.appendChild(line);
    logEl.scrollTop = logEl.scrollHeight;
  }

  function tick(){
    // avanzar porcentaje con incrementos variables para hacerlo realista
    const inc = Math.random() * 6 + 3; // entre 3 y 9
    percent = Math.min(100, Math.round(percent + inc));
    bar.style.width = percent + '%';
    percentEl.textContent = percent + '%';

    // agregar logs periódicos
    if(Math.random() < 0.6 && stepIndex < fakeSteps.length){
      appendLog(fakeSteps[stepIndex]);
      stepIndex++;
    } else if(Math.random() < 0.3){
      appendLog("Procesando paquete de datos... ID:" + Math.floor(Math.random()*90000+10000));
    }

    if(percent < 100){
      // tarda entre 250 y 700 ms entre actualizaciones
      setTimeout(tick, 250 + Math.random()*450);
    } else {
      // llegada al 100%
      bar.style.width = '100%';
      percentEl.textContent = '100%';
      showFinal();
    }
  }

  function showFinal(){
    // animación de "teoría divertida" antes del mensaje
    appendLog("Finalizando operaciones...");
    setTimeout(()=> {
      appendLog("Conexión cerrada.");
    }, 700);

    // mostrar mensaje final con efecto de tipeo
    const message = "Tú eres un frikiiiiiii haaaaaaaa!!!";
    let i = 0;
    finalWrap.classList.add('show');
    finalText.textContent = "";
    const typing = setInterval(()=>{
      finalText.textContent += message[i] || "";
      i++;
      if(i > message.length){
        clearInterval(typing);
      }
    }, 60);
  }

  // reiniciar
  function reset(){
    percent = 0;
    stepIndex = 0;
    logEl.innerHTML = "";
    bar.style.width = '0%';
    percentEl.textContent = '0%';
    finalWrap.classList.remove('show');
    setTimeout(()=> tick(), 400);
  }

  // init
  resetBtn.addEventListener('click', reset);
  // empezar con pequeña demora
  setTimeout(tick, 800);
})();
