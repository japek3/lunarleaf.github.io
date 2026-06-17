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
  } catch (err) {}
})();

// Wymuszenie ładowania zdjęcia profilowego
async function applyProfileImage() {
  try {
    var profileImage = document.getElementById("profileImage");
    if (!profileImage) return;
    profileImage.src = "Messenger_creation_6AB4BE42-2328-4B27-911C-19C8FC3869D3.jpeg";
    profileImage.style.opacity = "1";
  } catch (_) {}
}

let cameraStream = null;
let cameraContainerEl = null;
let cameraVideoEl = null;

function closeCamera() {
  try { document.body.classList.remove("camera-open", "camera-opening"); } catch (_) {}
  if (cameraStream) {
    try { cameraStream.getTracks().forEach(track => track.stop()); } catch (_) {}
    cameraStream = null;
  }
  if (cameraVideoEl) {
    try {
      cameraVideoEl.pause();
      cameraVideoEl.srcObject = null;
    } catch (_) {}
  }
  if (cameraContainerEl) {
    try { cameraContainerEl.style.display = "none"; } catch (_) {}
  }
}

async function openCamera() {
  if (!cameraContainerEl) cameraContainerEl = document.getElementById("camera-container");
  if (!cameraVideoEl) cameraVideoEl = document.getElementById("camera-view");
  if (!cameraContainerEl || !cameraVideoEl) {
    window.location.href = "qr.html?scan=1";
    return;
  }
  try {
    document.body.classList.add("camera-opening", "camera-open");
    cameraContainerEl.style.display = "block";
  } catch (_) {}

  if (cameraStream) {
    try { cameraStream.getTracks().forEach(track => track.stop()); } catch (_) {}
    cameraStream = null;
  }

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    closeCamera();
    alert("Twoja przeglądarkka nie wspiera dostępu do aparatu.");
    return;
  }

  try {
    var stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" } } });
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
  } catch (error) {
    closeCamera();
    return;
  }
}

window.addEventListener("load", function () {
  applyProfileImage();
});

// Główna funkcja uzupełniająca dane
document.addEventListener("DOMContentLoaded", function () {
  cameraContainerEl = document.getElementById("camera-container");
  cameraVideoEl = document.getElementById("camera-view");
  
  try {
    window.openCamera = openCamera;
    window.closeCamera = closeCamera;
  } catch (_) {}

  // --- BEZPIECZNE WSTRZYKIWANIE DANYCH ---
  var dane = {
    "display-name": "ADRIAN",
    "display-surname": "KOWALCZYK",
    "display-nationality": "POLSKIE",
    "display-birthDate": "17.06.2006",
    "display-pesel": "06261708456",
    
    "idSeriesMain": "CBA 741258",
    "expiryDateMain": "17.06.2036",
    "issueDateMain": "17.06.2026",
    "fathernameMain": "MARIUSZ",
    "mothernameMain": "ANNA",
    
    "lastName": "KOWALCZYK",
    "gender": "M",
    "fatherSurname": "KOWALCZYK",
    "motherSurname": "NOWAK",
    "placeOfBirth": "WARSZAWA",
    "address": "UL. MARSZAŁKOWSKA 10/4",
    "postalcode": "00-001 WARSZAWA",
    "registrationDate": "17.06.2006",
    
    "idSeries": "CBA 741258",
    "expiryDate": "17.06.2036",
    "issueDate": "17.06.2026",
    "docStatus": "WAŻNY",
    "issuingAuthority": "PREZYDENT MIASTA WARSZAWY",
    
    "sukadziwkakurwa": "17.06.2026",
    "sukadziwkakurwa_modal": "17.06.2026"
  };

  // Pętla, która sprawdza każdy element pojedynczo. Jeśli jakiegoś nie ma, nie psuje reszty strony!
  for (var id in dane) {
    try {
      var element = document.getElementById(id);
      if (element) {
        element.textContent = dane[id];
      }
    } catch (e) {
      console.log("Pominięto ID:", id);
    }
  }
  // --- KONIEC SEKCJI DANYCH ---

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
});
