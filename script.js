let currentIndex = 0;
let lastOpenedIndex = 0;

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
    title: "Haunted Pumpkin Village",
    description:
      "A glowing jack-o'-lantern stands before a spooky village under a full moon.",
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

const galleryContainer = document.getElementById("gallery");
const dialogRef = document.getElementById("fotoDialog");

const dialogMarkup = `
<div class="dialog-box">
    <div class="dialog-top-bar">
        <h3 id="dialogTitle" class="dialog-title"></h3>
        <button type="button" class="dialog-close" aria-label="Close dialog" onclick="closeDialog()">&times;</button>
    </div>
    <img id="dialogImage" class="dialog-image" alt="">
    <div class="dialog-bottom-bar">
        <button type="button" aria-label="Previous photo" onclick="previousImage()">
            <img src="Icons/Button.png" alt="" width="60" height="60">
        </button>
        <span id="dialogCounter" class="dialog-counter" role="status" aria-live="polite"></span>
          <button type="button" aria-label="Next photo" onclick="nextImage()">
            <img src="Icons/Button2.png" alt="" width="60" height="60">
        </button>
    </div>
</div>`;

/** Özgün fotoğraflarla galeriyi oluşturur. */
function renderGallery() {
  let markup = "";
  for (let i = 0; i < imageData.length; i++) {
    markup += `<button id="thumbnail-${i}" type="button" class="thumbnail" onclick="openDialog(${i})" aria-label="Open photo ${i + 1} of ${imageData.length}: ${imageData[i].title}">
 <img src="${imageData[i].src}" alt="" width="150" height="150" loading="lazy">
 </button>`;
  }
  galleryContainer.innerHTML = markup;
}

/** Yerel HTML dialog içeriğini oluşturur. */
function renderDialog() {
  dialogRef.innerHTML = dialogMarkup;
}

/** Seçilen fotoğrafı, başlığı, açıklamayı ve sayacı günceller. */
function showImage(index) {
  currentIndex = index;
  const photo = imageData[currentIndex];
  document.getElementById("dialogTitle").textContent = photo.title;
  const dialogImage = document.getElementById("dialogImage");
  dialogImage.src = photo.src;
  dialogImage.alt = photo.title + ". " + photo.description;
  document.getElementById("dialogCounter").textContent =
    index + 1 + "/" + imageData.length;
}

/** Seçilen fotoğrafı dialog penceresinde açar. */
function openDialog(index) {
  lastOpenedIndex = index;
  showImage(index);
  if (!dialogRef.open) {
    dialogRef.showModal();
    document.documentElement.classList.add("no-scroll");
  }
}

/** Açıksa dialog penceresini kapatır. */
function closeDialog() {
  if (dialogRef.open) {
    dialogRef.close();
  }
}

/** Sonraki fotoğrafı gösterir; son fotoğraftan sonra ilk fotoğrafa döner. */
function nextImage() {
  if (currentIndex === imageData.length - 1) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }
  showImage(currentIndex);
}

/** Önceki fotoğrafı gösterir; ilk fotoğraftan önce son fotoğrafa döner. */
function previousImage() {
  if (currentIndex === 0) {
    currentIndex = imageData.length - 1;
  } else {
    currentIndex--;
  }
  showImage(currentIndex);
}

/** Koyu arka plana tıklandığında dialog penceresini kapatır. */
function closeDialogOnBackground(event) {
  if (event.target === dialogRef) {
    closeDialog();
  }
}

/** Sağ ve sol ok tuşlarıyla fotoğraflar arasında geçiş yapar. */
function handleDialogKeydown(event) {
  if (event.key === "ArrowRight") {
    event.preventDefault();
    nextImage();
  } else if (event.key === "ArrowLeft") {
    event.preventDefault();
    previousImage();
  }
}

/** Kapatıldıktan sonra sayfa kaydırmasını ve klavye odağını geri yükler. */
function handleDialogClose() {
  document.documentElement.classList.remove("no-scroll");
  const thumbnail = document.getElementById("thumbnail-" + lastOpenedIndex);
  if (thumbnail) {
    thumbnail.focus();
  }
}
function init() {
  renderGallery();
  renderDialog();
}
