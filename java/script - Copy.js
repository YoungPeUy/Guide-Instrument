// ช่องค้นหาเครื่องตรวจ
document.getElementById('searchInput').addEventListener('keyup', function () {
  const filter = this.value.toLowerCase();
  const buttons = document.querySelectorAll('#instrumentList button');

  buttons.forEach(button => {
    const text = button.textContent.toLowerCase();
    button.style.display = text.includes(filter) ? 'block' : 'none';
  });
});

// JavaScript สำหรับแสดงรูปภาพแบบ fullscreen แยก gallery
document.querySelectorAll('.img-clickable').forEach((img) => {
  img.addEventListener('click', () => {
    const galleryName = img.dataset.gallery;
    const index = parseInt(img.dataset.index, 10);
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      // Mobile view
      const fullscreenDiv = document.createElement('div');
      fullscreenDiv.className = 'mobile-fullscreen-image';

      const imgElement = document.createElement('img');
      imgElement.src = img.src;
      imgElement.alt = img.alt;

      const closeBtn = document.createElement('button');
      closeBtn.className = 'mobile-close-btn';
      closeBtn.innerHTML = '&times;';
      closeBtn.addEventListener('click', () => {
        document.body.removeChild(fullscreenDiv);
      });

      fullscreenDiv.appendChild(imgElement);
      fullscreenDiv.appendChild(closeBtn);
      document.body.appendChild(fullscreenDiv);

      fullscreenDiv.addEventListener('click', (e) => {
        if (e.target === fullscreenDiv) {
          document.body.removeChild(fullscreenDiv);
        }
      });
    } else {
      // Desktop view: Bootstrap carousel
      const carouselInner = document.querySelector('#carouselGallery .carousel-inner');
      carouselInner.innerHTML = '';

      // เลือกเฉพาะรูปภาพใน gallery เดียวกัน
      const galleryImages = document.querySelectorAll(`.img-clickable[data-gallery="${galleryName}"]`);

      galleryImages.forEach((imgEl, i) => {
        const activeClass = i === index ? 'active' : '';
        carouselInner.innerHTML += `
          <div class="carousel-item ${activeClass}">
            <img src="${imgEl.src}" class="d-block w-100" alt="${imgEl.alt}">
          </div>
        `;
      });

      const galleryModal = new bootstrap.Modal(document.getElementById('imgGalleryModal'));
      galleryModal.show();
    }
  });
});


