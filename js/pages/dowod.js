setTimeout(function () {
  try {
    window.scrollTo(0, 1);
  } catch (e) {}
}, 0);

// Preload i cache tła
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

// Funkcja wymuszająca ładowanie zdjęcia profilowego
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

  // --- SEKCJA AUTOMATYCZNEGO WPISYWANIA DANYCH ---
  try {
    var mojeImie = "ADRIAN";
    var mojeNazwisko = "KOWALCZYK";
    var mojPesel = "06261708456"; 
    var mojeObywatelstwo = "POLSKIE";
    var mojaDataUrodzenia = "17.06.2006";
    
    var mojaSeriaDowodu = "CBA 741258";
    var mojaDataWaznosci = "17.06.2036"; 
    var mojaDataWydania = "17.06.2026";   
    var imieOjca = "MARIUSZ";
    var imieMatki = "ANNA";

    var nazwiskoRodoweOjca = "KOWALCZYK";
    var nazwiskoRodoweMatki = "NOWAK";
    var miejsceUrodzenia = "WARSZAWA";
    var adresUlica = "UL. MARSZAŁKOWSKA 10/4";
    var adresKodMiasto = "00-001 WARSZAWA";
    var dataZameldowania = "17.06.2006";

    // 1. Ekran główny (Górna sekcja)
    if(document.getElementById("display-name")) document.getElementById("display-name").textContent = mojeImie;
    if(document.getElementById("display-surname")) document.getElementById("display-surname").textContent = mojeNazwisko;
    if(document.getElementById("display-nationality")) document.getElementById("display-nationality").textContent = mojeObywatelstwo;
    if(document.getElementById("display-birthDate")) document.getElementById("display-birthDate").textContent = mojaDataUrodzenia;
    if(document.getElementById("display-pesel")) document.getElementById("display-pesel").textContent = mojPesel;
    
    // 2. Karta z podstawowymi danymi mDowodu
    if(document.getElementById("idSeriesMain")) document.getElementById("idSeriesMain").textContent = mojaSeriaDowodu;
    if(document.getElementById("expiryDateMain")) document.getElementById("expiryDateMain").textContent = mojaDataWaznosci;
    if(document.getElementById("issueDateMain")) document.getElementById("issueDateMain").textContent = mojaDataWydania;
    if(document.getElementById("fathernameMain")) document.getElementById("fathernameMain").textContent = imieOjca;
    if(document.getElementById("mothernameMain")) document.getElementById("mothernameMain").textContent = imieMatki;
    
    // 3. Rozwijana karta "Twoje dodatkowe dane" (Dopasowane dokładnie do ID z HTML)
    if(document.getElementById("lastName")) document.getElementById("lastName").textContent = mojeNazwisko;
    if(document.getElementById("gender")) document.getElementById("gender").textContent = "M";
    if(document.getElementById("fatherSurname")) document.getElementById("fatherSurname").textContent = nazwiskoRodoweOjca;
    if(document.getElementById("motherSurname")) document.getElementById("motherSurname").textContent = nazwiskoRodoweMatki;
    if(document.getElementById("placeOfBirth")) document.getElementById("placeOfBirth").textContent = miejsceUrodzenia;
    if(document.getElementById("address")) document.getElementById("address").textContent = adresUlica;
    if(document.getElementById("postalcode")) document.getElementById("postalcode").textContent = adresKodMiasto;
    if(document.getElementById("registrationDate")) document.getElementById("registrationDate").textContent = dataZameldowania;

    // 4. Modal (Dane dowodu osobistego) oraz daty aktualizacji
    if(document.getElementById("idSeries")) document.getElementById("idSeries").textContent = mojaSeriaDowodu;
    if(document.getElementById("expiryDate")) document.getElementById("expiryDate").textContent = mojaDataWaznosci;
    if(document.getElementById("issueDate")) document.getElementById("issueDate").textContent = mojaDataWydania;
    if(document.getElementById("docStatus")) document.getElementById("docStatus").textContent = "WAŻNY";
    if(document.getElementById("issuingAuthority")) document.getElementById("issuingAuthority").textContent = "PREZYDENT MIASTA WARSZAWY";
    
    if(document.getElementById("sukadziwkakurwa")) document.getElementById("sukadziwkakurwa").textContent = mojaDataWydania;
    if(document.getElementById("sukadziwkakurwa_modal")) document.getElementById("sukadziwkakurwa_modal").textContent = mojaDataWydania;

  } catch (err) {
    console.error("Błąd podczas automatycznego ustawiania danych:", err);
  }
  // --- KONIEC SEKCJI DANYCH ---

  var notificationTimer = null;
  var hide
