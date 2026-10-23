let currentIndex = 0; // Şu an gösterilen fotoğrafın numarası
let lastOpenedIndex = 0; // Pencereyi açan son küçük fotoğrafın numarası

// Fotoğrafların yolları
const imageData = [
  {
    src: "Bilder/bild1.jpg",
    title: "Witch before Full Moon",
    description: "A witch flies before the shining Halloween moon.",
  },
  {
    src: "Bilder/bild2.jpg",
    title: "Scary Cemetery",
    description: "Dark trees and tombstones on Halloween night.",
  },
  {
    src: "Bilder/bild3.jpg",
    title: "Halloween Pumpkin",
    description: "Shining pumpkin with witch on orange moon.",
  },
  {
    src: "Bilder/bild4.jpg",
    title: "Witch Moon",
    description: "Silhouette of a witch before the big full moon.",
  },
  {
    src: "Bilder/bild5.jpg",
    title: "October 31",
    description: "Pumpkin lantern with date October 31.",
  },
  {
    src: "Bilder/bild6.jpg",
    title: "Ghost House",
    description: "A cursed house surrounded by shining pumpkins.",
  },
  {
    src: "Bilder/bild7.jpg",
    title: "Castle in Fog",
    description: "Dark castle with full moon in background.",
  },
  {
    src: "Bilder/bild8.jpg",
    title: "Pumpkin Field",
    description: "A path full of pumpkins in golden autumn light.",
  },
  {
    src: "Bilder/bild9.jpg",
    title: "Halloween Night",
    description: "Crows and witch before shining Halloween sky.",
  },
  {
    src: "Bilder/bild10.jpg",
    title: "Pumpkins at Night",
    description: "Colorful pumpkins and lanterns in the dark night.",
  },
  {
    src: "Bilder/bild11.jpg",
    title: "Magic Night",
    description: "Magical Halloween scene with moon and pumpkins.",
  },
  {
    src: "Bilder/bild12.jpg",
    title: "Cemetery at Moon",
    description: "Silhouette of a person before the ghostly cemetery.",
  },
];

// HTML içindeki galeri ve fotoğraf penceresini buluyorum
const galleryContainer = document.getElementById("gallery");
const dialogRef = document.getElementById("fotoDialog");

// Küçük fotoğrafları galeriye ekliyorum
function renderGallery() {
  let markup = "";

  // Fotoğrafları sırayla HTML koduna ekliyorum
  for (let i = 0; i < imageData.length; i++) {
    markup += `
 <button type="button" class="thumbnail" data-index="${i}"
 aria-label="Open image ${i + 1} of ${imageData.length}: ${imageData[i].title}">
 <img src="${imageData[i].src}" alt="" width="150" height="150" loading="lazy">
 </button>`;
  }

  // Oluşturduğum HTML kodunu galeriye yerleştiriyorum
  galleryContainer.innerHTML = markup;
}

// Büyük fotoğraf penceresinin HTML yapısını oluşturdmm
function renderDialog() {
  dialogRef.innerHTML = `
 <div class="dialog-box">
 <div class="dialog-top-bar">
 <h3 id="dialogTitle" class="dialog-title"></h3>
 <button type="button" id="closeButton" class="dialog-close" aria-label="Close dialog">&times;</button>
 </div>
 <img id="dialogImage" class="dialog-image" alt="">
 <div class="dialog-bottom-bar">
 <button type="button" id="prevButton" aria-label="Previous image">
 <img src="Icons/Button.png" alt="">
 </button>
 <span id="dialogCounter" class="dialog-counter" role="status" aria-live="polite"></span>
 <button type="button" id="nextButton" aria-label="Next image">
 <img src="Icons/Button2.png" alt="">
 </button>
 </div>
 </div>`;
}

// Seçilen fotoğrafın başlığını, resmini ve numarasını güncel..
function showImage(index) {
  currentIndex = index;
  const photo = imageData[index];

  // Fotoğrafın başlığını değiştiriyorum
  document.getElementById("dialogTitle").textContent = photo.title;

  // Büyük fotoğrafın yolunu ve alternatif metnini ayarlıyorum
  const dialogImage = document.getElementById("dialogImage");
  dialogImage.src = photo.src;
  dialogImage.alt = photo.title + ". " + photo.description;

  // Kaçıncı fotoğrafın gösterildiğini yazıyorum
  document.getElementById("dialogCounter").textContent =
    index + 1 + "/" + imageData.length;
}

// Küçük fotoğrafa tıklayınca büyük fotoğraf penceresini açma
function openDialog(index) {
  lastOpenedIndex = index;
  renderDialog();
  showImage(index);

  // Pencere zaten açıksa tekrar açmıyorum
  if (!dialogRef.open) {
    dialogRef.showModal();

    // Pencere açıkken arka planın kaymasını engelliyorum
    document.documentElement.classList.add("no-scroll");
  }
}

// Büyük fotoğraf penceresini kapatıyorum
function closeDialog() {
  if (dialogRef.open) {
    dialogRef.close();
  }
}

// Sonraki fotoğrafı gösteriyorum
function nextImage() {
  showImage((currentIndex + 1) % imageData.length);
}

// Önceki fotoğrafı gösteriyorum
function previousImage() {
  showImage((currentIndex - 1 + imageData.length) % imageData.length);
}

// Galerideki fotoğraflara tıklanmasını dinliyorum
galleryContainer.addEventListener("click", function (event) {
  const thumbnail = event.target.closest("button[data-index]");

  // Tıklanan element bir fotoğraf butonuysa büyük fotoğrafı açıyorum
  if (thumbnail) {
    openDialog(Number(thumbnail.dataset.index));
  }
});

// Büyük fotoğraf penceresindeki butonları ve dış alanı kontrol ediyorum
dialogRef.addEventListener("click", function (event) {
  if (event.target.closest("#closeButton")) {
    closeDialog();
  } else if (event.target.closest("#nextButton")) {
    nextImage();
  } else if (event.target.closest("#prevButton")) {
    previousImage();
  } else if (!event.target.closest(".dialog-box")) {
    // Pencerenin dışındaki karanlık alana tıklanınca kapatıyorum
    closeDialog();
  }
});

// Klavyedeki sağ ve sol ok tuşlarıyla fotoğraflar arasında geçiş yapıyorum
dialogRef.addEventListener("keydown", function (event) {
  if (event.key === "ArrowRight") {
    nextImage();
  } else if (event.key === "ArrowLeft") {
    previousImage();
  }
});

// Pencere kapanınca arka plan kaydırmasını tekrar açıyorum
dialogRef.addEventListener("close", function () {
  document.documentElement.classList.remove("no-scroll");

  // Klavye odağını pencereyi açan küçük fotoğrafa geri getiriyorum
  const thumbnails = galleryContainer.querySelectorAll("button[data-index]");

  if (thumbnails[lastOpenedIndex]) {
    thumbnails[lastOpenedIndex].focus();
  }
});

// Sayfa açıldığında galeriyi oluşturuyorum
renderGallery();
