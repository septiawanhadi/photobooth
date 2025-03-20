    const video = document.getElementById('video');
    const captureBtn = document.getElementById('captureBtn');
    const numPhotosSelect = document.getElementById('numPhotos');
    const collageContainer = document.getElementById('collageContainer');
    const downloadBtn = document.getElementById('downloadBtn');
    const frameColorPicker = document.getElementById('frameColor');
    const collageWrapper = document.getElementById('collageWrapper');
    const watermark = document.getElementById('watermark');
    
    let capturedPhotos = [];
    let requiredCount = parseInt(numPhotosSelect.value);

    // Fungsi untuk menentukan warna watermark berdasarkan warna frame (Contrast)
    function getContrastYIQ(hexColor) {
      hexColor = hexColor.replace('#', '');
      const r = parseInt(hexColor.substr(0,2), 16);
      const g = parseInt(hexColor.substr(2,2), 16);
      const b = parseInt(hexColor.substr(4,2), 16);
      const yiq = ((r*299)+(g*587)+(b*114))/1000;
      return (yiq >= 128) ? '#000000' : '#ffffff';
    }

    // Atur kamera (tanpa mirror)
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

    // Update jumlah foto jika pilihan berubah dan reset kolase
    numPhotosSelect.addEventListener('change', () => {
      requiredCount = parseInt(numPhotosSelect.value);
      capturedPhotos = [];
      updateCollage();
      downloadBtn.style.display = 'none';
    });

    // Fungsi untuk mengambil foto dari video (tanpa mirror)
    captureBtn.addEventListener('click', () => {
      if (capturedPhotos.length >= requiredCount) {
        alert(`Anda sudah mengambil ${requiredCount} foto.`);
        return;
      }
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 640; // pastikan square sesuai live kamera 1:1
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataURL = canvas.toDataURL('image/png');
      capturedPhotos.push(dataURL);
      updateCollage();
      if (capturedPhotos.length === requiredCount) {
        downloadBtn.style.display = 'inline-block';
      }
    });

    // Fungsi merender kolase berdasarkan jumlah foto yang dipilih
    function updateCollage() {
      let layoutClass = 'one-photo';
      if (requiredCount === 3) {
        layoutClass = 'three-photos';
      } else if (requiredCount === 6) {
        layoutClass = 'six-photos';
      }
      collageContainer.className = layoutClass;
      collageContainer.innerHTML = "";
      for (let i = 0; i < requiredCount; i++) {
        const cell = document.createElement('div');
        cell.className = 'photo-cell';
        const img = document.createElement('img');
        img.src = capturedPhotos[i] || "";
        cell.appendChild(img);
        collageContainer.appendChild(cell);
      }
    }

    // Update warna frame & background serta warna watermark berdasarkan pilihan
    frameColorPicker.addEventListener('change', () => {
      const selectedColor = frameColorPicker.value;
      collageWrapper.style.borderColor = selectedColor;
      collageWrapper.style.backgroundColor = selectedColor;
      // Update watermark agar kontras dengan warna frame
      watermark.style.color = getContrastYIQ(selectedColor);
    });

    // Fungsi download kolase menggunakan html2canvas
    downloadBtn.addEventListener('click', () => {
      html2canvas(collageWrapper).then(canvas => {
        const link = document.createElement('a');
        link.download = 'kolase-photo.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    });