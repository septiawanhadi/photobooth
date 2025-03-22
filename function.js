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
      const r = parseInt(hexColor.substr(0,2), 16);
      const g = parseInt(hexColor.substr(2,2), 16);
      const b = parseInt(hexColor.substr(4,2), 16);
      const yiq = ((r*299)+(g*587)+(b*114))/1000;
      return (yiq >= 128) ? '#000000' : '#ffffff';
    }

    // Atur kamera (tanpa mirror, dengan aspek rasio 1:1)
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

    // Update requiredCount dan reset kolase jika pilihan diubah
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
      countdownOverlay.textContent = timeLeft;
      countdownOverlay.style.opacity = 1;
      countdownInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft > 0) {
          countdownOverlay.textContent = timeLeft;
        } else {
          clearInterval(countdownInterval);
          countdownOverlay.style.opacity = 0;
          capturePhoto();
          // Jika belum mencapai jumlah foto, mulai countdown lagi
          if (capturedPhotos.length < requiredCount) {
            startAutoCapture();
          }
        }
      }, 1000);
    }

    // Fungsi mengambil foto dari video dengan aspek 1:1
    function capturePhoto() {
      if (capturedPhotos.length >= requiredCount) return;
      const canvas = document.createElement('canvas');
      // Gunakan ukuran terkecil dari video sebagai ukuran square
      const size = video.videoWidth ? Math.min(video.videoWidth, video.videoHeight) : 640;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, size, size);
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

    // Fungsi reset kolase dan capturedPhotos
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
