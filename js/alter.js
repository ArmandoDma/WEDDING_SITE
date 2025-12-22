const form = document.getElementById("rsvpForm");
const envelope = document.getElementById("envelope");

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwMg20NWBBlIvnIpg5BMmgzT8OdBROhwIurvCOvu8AZKDpJM5kKoyWTmAuA1Zaef-OD/exec"; 

function insertQRIntoLetter(data) {
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
}

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
    const adultos = form.querySelector("[name='adultos']")?.value || "1";
    const tornaboda = form.querySelector("[name='tornaboda']")?.value || "Sí";

    const rsvpId = generateRSVPId(nombre);

    const payload = {
      rsvpId,
      nombre,
      adultos,
      tornaboda,
      evento: "Boda Priscila & Oscar",
      fecha: "31-01-2026"
    };

    const qrData = JSON.stringify(payload);

    // 🔥 ENVIAR A GOOGLE SHEETS
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

    // 🔥 INSERTAR QR
    insertQRIntoLetter(qrData);

    // 🔥 ABRIR SOBRE
    envelope.classList.remove("close");
    envelope.classList.add("open");
  });
}
