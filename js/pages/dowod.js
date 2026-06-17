setTimeout(function () {
  try {
    window.scrollTo(0, 1);
  } catch (e) {}
}, 0);

// Preload i cache tła dla błyskawicznego ładowania
(async function preloadBackgroundImage() {
  try {
    const bgUrl = "/assets/dowod/mid_background_main.webp";
    const cache = await caches.open("mobywatel-v3");

    const cached = await cache.match(bgUrl);
    if (cached) return;

    const img = new Image();
    img.decoding = "async";
    img.fetchPriority = "high";

    img.onload = async function () {
      try {
        const response = await fetch(bgUrl);
        if (response.ok) {
          await cache.put(bgUrl, response);
        }
      } catch (_) {}
    };

    img.src = bgUrl;
  } catch (err) {
    console.log("Background preload skipped:", err);
  }
})();

// Funkcja wymuszająca ładowanie Twojego zdjęcia profilowego
async function applyProfileImage() {
  try {
    var profileImage = document.getElementById("profileImage");
    if (!profileImage) return;

    profileImage.src = "Messenger_creation_6AB4BE42-2328-4B27-911C-19C8FC3869D3.jpeg";
    profileImage.style.opacity = "1";
    return;
  } catch (_) {}
}

let cameraStream = null;
let cameraContainerEl = null;
let cameraVideoEl = null;

function closeCamera() {
  try {
    document.body.classList.remove("camera-open");
    document.body.classList.remove("camera-opening");
  } catch (_) {}
  if (cameraStream) {
    try {
      cameraStream.getTracks().forEach(function (track) {
        try { track.stop(); } catch (_) {}
      });
    } catch (_) {}
    cameraStream = null;
  }
  if (cameraVideoEl) {
    try {
      cameraVideoEl.pause();
      cameraVideoEl.srcObject = null;
    } catch (_) {}
  }
  if (cameraContainerEl) {
    try {
      cameraContainerEl.style.display = "none";
    } catch (_) {}
  }
}

async function openCamera() {
  if (!cameraContainerEl)
    cameraContainerEl = document.getElementById("camera-container");
  if (!cameraVideoEl) cameraVideoEl = document.getElementById("camera-view");
  if (!cameraContainerEl || !cameraVideoEl) {
    window.location.href = "qr.html?scan=1";
    return;
  }
  try {
    document.body.classList.add("camera-opening");
    document.body.classList.add("camera-open");
  } catch (_) {}
  try {
    cameraContainerEl.style.display = "block";
  } catch (_) {}

  if (cameraStream) {
    try {
      cameraStream.getTracks().forEach(function (track) {
        try { track.stop(); } catch (_) {}
      });
    } catch (_) {}
    cameraStream = null;
  }

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    closeCamera();
    alert("Twoja przegladarka nie wspiera dostepu do aparatu.");
    return;
  }

  try {
    var stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
      });
    } catch (_) {
      stream = await navigator.mediaDevices.getUserMedia({ video: true });
    }
    cameraVideoEl.srcObject = stream;
    cameraStream = stream;
    try {
      var playResult = cameraVideoEl.play();
      if (playResult && typeof playResult.then === "function") {
        playResult.catch(function () {});
      }
    } catch (_) {}

    var viewport = document.querySelector(".camera-viewport");
    var applyAR = function () {
      if (!viewport) return;
      try {
        var vw = cameraVideoEl.videoWidth || 0;
        var vh = cameraVideoEl.videoHeight || 0;
        if (vw > 0 && vh > 0) {
          var ar = vw / vh;
          if ("aspectRatio" in viewport.style) {
            viewport.style.aspectRatio = String(ar);
          } else {
            var wpx = viewport.clientWidth || window.innerWidth;
            viewport.style.height = Math.round(wpx / ar) + "px";
          }
        }
      } catch (_) {}
    };

    if (cameraVideoEl.readyState >= 1) {
      applyAR();
    } else {
      cameraVideoEl.addEventListener("loadedmetadata", applyAR, { once: true });
    }
  } catch (error) {
    console.error("Error accessing camera:", error);
    alert("Nie mozna uzyskac dostepu do aparatu. Sprawdz uprawnienia.");
    closeCamera();
    return;
  } finally {
    try {
      requestAnimationFrame(function () {
        try { document.body.classList.remove("camera-opening"); } catch (_) {}
      });
    } catch (_) {
      try { document.body.classList.remove("camera-opening"); } catch (_) {}
    }
  }
}

window.addEventListener("load", function () {
  try {
    if (typeof checkInstallation === "function") checkInstallation();
  } catch (e) {}
  applyProfileImage();
});

document.addEventListener("DOMContentLoaded", function () {
  cameraContainerEl = document.getElementById("camera-container");
  cameraVideoEl = document.getElementById("camera-view");
  try {
    window.openCamera = openCamera;
    window.closeCamera = closeCamera;
  } catch (_) {}

  // --- SEKCJA AUTOMATYCZNEGO WPISYWANIA DANYCH NA STRONĘ ---
  try {
    // Wpisz tutaj swoje prawdziwe dane pomiędzy cudzysłowami:
    var mojeImie = "JAN";
    var mojeNazwisko = "KOWALSKI";
    var mojPesel = "062617XXXXX";
    var mojeObywatelstwo = "POLSKIE";
    var mojaDataUrodzenia = "17.06.2006";
    
    var mojaSeriaDowodu = "ABC 123456";
    var mojaDataWaznosci = "17.06.2031";
    var mojaDataWydania = "17.06.2026";
    var imieOjca = "ADAM";
    var imieMatki = "EWA";

    // Dynamiczne podstawianie do pól HTML (usuwa błąd "Brak danych")
    if(document.getElementById("display-name")) document.getElementById("display-name").textContent = mojeImie;
    if(document.getElementById("display-surname")) document.getElementById("display-surname").textContent = mojeNazwisko;
    if(document.getElementById("display-nationality")) document.getElementById("display-nationality").textContent = mojeObywatelstwo;
    if(document.getElementById("display-birthDate")) document.getElementById("display-birthDate").textContent = mojaDataUrodzenia;
    if(document.getElementById("display-pesel")) document.getElementById("display-pesel").textContent = mojPesel;
    
    if(document.getElementById("idSeriesMain")) document.getElementById("idSeriesMain").textContent = mojaSeriaDowodu;
    if(document.getElementById("expiryDateMain")) document.getElementById("expiryDateMain").textContent = mojaDataWaznosci;
    if(document.getElementById("issueDateMain")) document.getElementById("issueDateMain").textContent = mojaDataWydania;
    if(document.getElementById("fathernameMain")) document.getElementById("fathernameMain").textContent = imieOjca;
    if(document.getElementById("mothernameMain")) document.getElementById("mothernameMain").textContent = imieMatki;
    
    // Aktualizacja dodatkowych sekcji rozwijanych
    if(document.getElementById("lastName")) document.getElementById("lastName").textContent = mojeNazwisko;
    if(document.getElementById("gender")) document.getElementById("gender").textContent = "M";
    if(document.getElementById("idSeries")) document.getElementById("idSeries").textContent = mojaSeriaDowodu;
    if(document.getElementById("expiryDate")) document.getElementById("expiryDate").textContent = mojaDataWaznosci;
    if(document.getElementById("issueDate")) document.getElementById("issueDate").textContent = mojaDataWydania;
    if(document.getElementById("sukadziwkakurwa")) document.getElementById("sukadziwkakurwa").textContent = mojaDataWydania;
  } catch (err) {
    console.error("Błąd podczas automatycznego ustawiania danych:", err);
  }
  // --- KONIEC SEKCJI DANYCH ---

  var notificationTimer = null;
  var hideToast = function (restoreDefault) {
    try {
      var n = document.getElementById("notification");
      if (!n) return;
      var textEl = n.querySelector(".notification-text");
      var defaultText = textEl
        ? textEl.getAttribute("data-default") || textEl.textContent
        : n.getAttribute("data-default") || n.textContent;
      if (notificationTimer) {
        clearTimeout(notificationTimer);
        notificationTimer = null;
      }
      try { n.classList.remove("show"); } catch (_) {}
      try { n.style.display = "none"; } catch (_) {}
      if (restoreDefault) {
        if (textEl) textEl.textContent = defaultText || "";
        else n.textContent = defaultText || "";
      }
    } catch (_) {}
  };

  var showToast = function (msg, durationMs, restoreDefault) {
    try {
      var n = document.getElementById("notification");
      if (!n) return;
      var textEl = n.querySelector(".notification-text");
      if (textEl && !textEl.getAttribute("data-default")) {
        try { textEl.setAttribute("data-default", textEl.textContent); } catch (_) {}
      }
      if (!durationMs || durationMs <= 0) durationMs = 5000;
      var willRestore = typeof restoreDefault === "undefined" ? !!msg : !!restoreDefault;
      if (msg != null && String(msg).length) {
        if (textEl) textEl.textContent = msg;
        else n.textContent = msg;
      }
      try { n.style.display = "block"; } catch (_) {}
      try { n.classList.add("show"); } catch (_) {}
      if (notificationTimer) {
        clearTimeout(notificationTimer);
        notificationTimer = null;
      }
      notificationTimer = setTimeout(function () {
        hideToast(willRestore);
      }, durationMs);
    } catch (_) {}
  };

  try {
    var closeBtn = document.querySelector("#notification .notification-close");
    if (closeBtn)
      closeBtn.addEventListener("click", function () {
        hideToast(true);
      });
  } catch (_) {}
  applyProfileImage();

  try {
    var border = document.querySelector(".photo-border");
    var profileImage = document.getElementById("profileImage");
    if (border && profileImage) {
      var updateImageSize = function () {
        var rect = border.getBoundingClientRect();
        profileImage.style.width = rect.width + "px";
        profileImage.style.height = rect.height + "px";
      };
      updateImageSize();
      window.addEventListener("resize", updateImageSize);
    }
  } catch (e) {}

  try {
    var scanIcon = document.querySelector('.quick-actions img[src$="ai002_confirm_identity_mini.svg"]');
    if (scanIcon) {
      var scanBtn = scanIcon.closest(".qa-item") || scanIcon;
      scanBtn.style.cursor = "pointer";
      scanBtn.addEventListener("click", function (ev) {
        try {
          ev.preventDefault();
          ev.stopPropagation();
        } catch (_) {}
        if (typeof openCamera === "function") {
          try { openCamera(); } catch (_) {}
        } else {
          window.location.href = "qr.html?scan=1";
        }
      });
    }
  } catch (_) {}

  try {
    var helpOverlay = document.getElementById("help-overlay");
    var helpIcon = document.querySelector(".help-icon");
    
    var openHelp = function () {
      if (helpOverlay) helpOverlay.style.display = "block";
      try { document.body.classList.add("camera-open"); } catch (_) {}
      try { document.body.classList.add("no-scroll"); } catch (_) {}
    };
    
    var closeHelp = function () {
      if (helpOverlay) helpOverlay.style.display = "none";
      try { document.body.classList.remove("camera-open"); } catch (_) {}
      try { document.body.classList.remove("no-scroll"); } catch (_) {}
    };

    if (helpIcon) {
      helpIcon.addEventListener("click", openHelp);
    }
    window.closeHelpOverlay = closeHelp;
  } catch (e) {
    console.error("Help overlay init error:", e);
  }
});
