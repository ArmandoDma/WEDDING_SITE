const form = document.getElementById("rsvpForm");
const envelope = document.getElementById("envelope");

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxj-NuY1Z4SqgT9PEKG7J_hG6gLMlUAZnGfxfFIHrqdraShQpya58bx6dkqKr_PSAEt/exec";

function showRSVPSuccess() {
  const msg = document.getElementById("rsvpSuccess");
  if (!msg) return;

  msg.classList.add("show");

  setTimeout(() => {
    msg.classList.remove("show");
  }, 3500); 
}


/*function insertQRIntoLetter(data) {
  const letter = document.querySelector(".letter");
  if (!letter) return;

  letter.innerHTML = "";

  const qr = document.createElement("img");
  qr.src =
    "https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=" +
    encodeURIComponent(data);

  qr.style.display = "block";
  qr.style.margin = "20px auto 0";
  qr.style.width = "120px";
  qr.style.height = "120px";

  letter.appendChild(qr);
}*/

function generateRSVPId(nombre) {
  const initials = nombre
    ? nombre
      .split(" ")
      .map(w => w[0])
      .join("")
      .toUpperCase()
    : "INV";

  const time = Date.now().toString(36);
  const rand = Math.random().toString(36).substring(2, 7);

  return `RSVP-${initials}-${time}-${rand}`;
}

if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const nombre = form.querySelector("[name='nombre']")?.value || "Invitado";
    const email = form.querySelector("[name='email']")?.value || "";
    const asistencia = form.querySelector("[name='asistencia']")?.value || "";
    const adultos = form.querySelector("[name='adultos']")?.value || "1";
    const tornaboda = form.querySelector("[name='tornaboda']")?.value || "Sí";

    const rsvpId = generateRSVPId(nombre);

    const payload = {
      id_qr: rsvpId,
      nombre,
      email,
      asistencia,
      adultos,
      tornaboda,
      fecha: new Date().getDate()
    };

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.error("Error enviando a Apps Script", err);
    }
    showRSVPSuccess()
  });
}
