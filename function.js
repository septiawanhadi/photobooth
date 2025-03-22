const video = document.getElementById('video');
const captureBtn = document.getElementById('captureBtn');
const retakeBtn = document.getElementById('retakeBtn');
const numPhotosSelect = document.getElementById('numPhotos');
const autoTimerSelect = document.getElementById('autoTimer');
const collageContainer = document.getElementById('collageContainer');
const collageWrapper = document.getElementById('collageWrapper');
const downloadBtn = document.getElementById('downloadBtn');
const frameColorPicker = document.getElementById('frameColor');
const watermark = document.getElementById('watermark');
const countdownOverlay = document.getElementById('countdown');

let capturedPhotos = [];
let requiredCount = parseInt(numPhotosSelect.value);
let autoTimerDuration = parseInt(autoTimerSelect.value);
let countdownInterval;

// Fungsi untuk menentukan warna watermark berdasarkan warna frame (contrast)
function getContrastYIQ(hexColor) {
  hexColor = hexColor.replace('#', '');
  const r = parseInt(hexColor.substr(0, 2), 16);
  const g = parseInt(hexColor.substr(2, 2), 16);
  const b = parseInt(hexColor.substr(4, 2), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? '#000000' : '#ffffff';
}

// Atur kamera
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
      video.play();
    })
    .catch(err => {
      alert('Tidak dapat mengakses kamera: ' + err);
    });
}

// Update jumlah foto dan reset kolase ketika pilihan diubah
numPhotosSelect.addEventListener('change', () => {
  requiredCount = parseInt(numPhotosSelect.value);
  resetCollage();
});

// Update auto timer durasi
autoTimerSelect.addEventListener('change', () => {
  autoTimerDuration = parseInt(autoTimerSelect.value);
});

// Update warna frame, background, dan watermark
frameColorPicker.addEventListener('change', () => {
  const selectedColor = frameColorPicker.value;
  collageWrapper.style.borderColor = selectedColor;
  collageWrapper.style.backgroundColor = selectedColor;
  watermark.style.color = getContrastYIQ(selectedColor);
});

// Fungsi untuk melakukan countdown dan kemudian capture foto
function startAutoCapture() {
  let timeLeft = autoTimerDuration;
  countdownOverlay.textContent = timeLeft + '';
  countdownOverlay.style.opacity = 1;
  countdownInterval = setInterval(() => {
    timeLeft--;
    if (timeLeft > 0) {
      countdownOverlay.textContent = timeLeft + '';
    } else {
      clearInterval(countdownInterval);
      countdownOverlay.style.opacity = 0;
      capturePhoto();
      // Jika jumlah foto belum terpenuhi, mulai countdown lagi
      if (capturedPhotos.length < requiredCount) {
        startAutoCapture();
      }
    }
  }, 1000);
}

// Fungsi untuk mengambil foto dengan aspek rasio yang berbeda
function capturePhoto() {
  if (capturedPhotos.length >= requiredCount) return;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const videoWidth = video.videoWidth || 640;
  const videoHeight = video.videoHeight || 480;
  let newWidth, newHeight, sx, sy;

  if (requiredCount === 1) {
    // Rasio 4:3 untuk 1 foto
    newWidth = videoWidth;
    newHeight = newWidth * 3 / 4;
    if (newHeight > videoHeight) {
      newHeight = videoHeight;
      newWidth = newHeight * 4 / 3;
    }
    canvas.width = newWidth;
    canvas.height = newHeight;
    sx = (videoWidth - newWidth) / 2;
    sy = (videoHeight - newHeight) / 2;
  } else {
    // Rasio 16:9 untuk 3 dan 6 foto
    newWidth = videoWidth;
    newHeight = newWidth * 9 / 16;
    if (newHeight > videoHeight) {
      newHeight = videoHeight;
      newWidth = newHeight * 16 / 9;
    }
    canvas.width = newWidth;
    canvas.height = newHeight;
    sx = (videoWidth - newWidth) / 2;
    sy = (videoHeight - newHeight) / 2;
  }

  ctx.drawImage(video, sx, sy, newWidth, newHeight, 0, 0, newWidth, newHeight);
  const dataURL = canvas.toDataURL('image/png');
  capturedPhotos.push(dataURL);
  updateCollage();

  if (capturedPhotos.length === requiredCount) {
    downloadBtn.style.display = 'inline-block';
    retakeBtn.style.display = 'inline-block';
  }
}

// Fungsi untuk merender kolase foto
function updateCollage() {
  let layoutClass = 'one-photo';
  if (requiredCount === 3) layoutClass = 'three-photos';
  else if (requiredCount === 6) layoutClass = 'six-photos';
  collageContainer.className = layoutClass;
  collageContainer.innerHTML = "";
  capturedPhotos.forEach(photo => {
    const cell = document.createElement('div');
    cell.className = 'photo-cell';
    const img = document.createElement('img');
    img.src = photo;
    cell.appendChild(img);
    collageContainer.appendChild(cell);
  });
}

// Fungsi untuk mereset kolase dan capturedPhotos
function resetCollage() {
  capturedPhotos = [];
  updateCollage();
  downloadBtn.style.display = 'none';
  retakeBtn.style.display = 'none';
}

// Fungsi download kolase menggunakan html2canvas
downloadBtn.addEventListener('click', () => {
  html2canvas(collageWrapper).then(canvas => {
    const link = document.createElement('a');
    link.download = 'kolase-photo.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
});

// Tombol retake foto untuk reset pengambilan foto
retakeBtn.addEventListener('click', () => {
  resetCollage();
});

// Tombol capture memulai auto capture dengan countdown
captureBtn.addEventListener('click', () => {
  startAutoCapture();
});
  // Perbaikan carousel: menghitung lebar masing-masing item
  document.querySelectorAll('.carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const items = carousel.querySelectorAll('.carousel-item');
    let currentIndex = 0;
    const prevButton = carousel.querySelector('.carousel-button.prev');
    const nextButton = carousel.querySelector('.carousel-button.next');

    function updateCarousel() {
      // Ambil lebar dari carousel-item (dengan asumsi semua item memiliki lebar yang sama)
      const itemWidth = carousel.querySelector('.carousel-item').offsetWidth;
      track.style.transform = 'translateX(' + (-currentIndex * itemWidth) + 'px)';
    }

    prevButton.addEventListener('click', () => {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
      updateCarousel();
    });

    nextButton.addEventListener('click', () => {
      currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
      updateCarousel();
    });

    window.addEventListener('resize', updateCarousel);
  });
 // Toggle hamburger menu
   const hamburger = document.getElementById('hamburger');
   const menu = document.getElementById('menu');
   hamburger.addEventListener('click', function() {
     menu.classList.toggle('active');
   });
