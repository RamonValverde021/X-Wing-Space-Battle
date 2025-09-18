🔹 Bluetooth só com front-end (navegador)

Existe a Web Bluetooth API, que permite a um site se conectar a dispositivos Bluetooth Low Energy (BLE).
👉 Só que ela não funciona com joysticks padrão (que geralmente usam Bluetooth clássico / HID).

Funciona bem para: sensores, microcontroladores (ESP32, Arduino BLE, pulseiras, etc).

Não funciona direito para: gamepads Bluetooth tradicionais (tipo controle de PS4, Xbox, etc).

🔹 Para controles (joysticks) no navegador

Para gamepads, os navegadores já têm a Gamepad API.

Ela detecta qualquer controle reconhecido pelo sistema operacional (USB ou Bluetooth).

Exemplo simples:

window.addEventListener("gamepadconnected", (e) => {
  console.log("Controle conectado:", e.gamepad);

  // loop para ler entradas
  function update() {
    const gp = navigator.getGamepads()[e.gamepad.index];
    if (gp) {
      if (gp.buttons[0].pressed) console.log("Botão A pressionado");
      if (gp.axes[0] < -0.5) console.log("Esquerda");
    }
    requestAnimationFrame(update);
  }
  update();
});


Assim, se o jogador parear o controle Bluetooth com o sistema operacional (Windows, Android, etc), o navegador consegue ler os botões e analógicos via Gamepad API, sem precisar da Web Bluetooth.

🔹 Então resumindo:

Só front-end é possível sim ✅

Mas você deve usar a Gamepad API para joysticks, não a Web Bluetooth.

A Web Bluetooth API é mais para projetos IoT/sensores.