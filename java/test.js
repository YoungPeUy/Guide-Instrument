document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.searchInput').forEach(input => {
      input.addEventListener('input', function () {
        const keyword = this.value.toLowerCase();
        const parentModal = this.closest('.modal');
        const buttons = parentModal.querySelectorAll('.instrumentList button');
  
        buttons.forEach(btn => {
          const text = btn.textContent.toLowerCase();
          btn.style.display = text.includes(keyword) ? '' : 'none';
        });
      });
    });
  });

// แสดงรูป fullscreen เมื่อคลิกที่ .img-clickable (รองรับรูปภาพที่ถูกโหลดทีหลัง)
document.addEventListener('click', function (e) {
    const img = e.target.closest('.img-clickable');
    if (!img) return;
  
    const galleryName = img.dataset.gallery;
    const index = parseInt(img.dataset.index, 10);
    const isMobile = window.innerWidth <= 768;
  
    if (isMobile) {
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
      const carouselInner = document.querySelector('#carouselGallery .carousel-inner');
      carouselInner.innerHTML = '';
  
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
  