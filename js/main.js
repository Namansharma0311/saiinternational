// Mark active nav link
(function(){
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path) a.classList.add('active');
  });
})();

// Inject header/footer partials if present
async function inject(id, url){
  const el = document.getElementById(id);
  if(!el) return;
  try{
    const res = await fetch(url);
    el.innerHTML = await res.text();
  }catch(e){}
}

// Contact form handling
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('quote-form');
  if(form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const wrap = document.getElementById('form-wrap-inner');
      wrap.innerHTML = `
        <div class="form-success">
          <p class="tag">Inquiry Transmitted</p>
          <p>Thank you. Our team will reach out within 1 business day.</p>
        </div>`;
    });
  }
});
const track = document.querySelector(".stats-track");

if (track) {

  // duplicate enough times to remove gaps
  while (track.scrollWidth < window.innerWidth * 3) {
    track.innerHTML += track.innerHTML;
  }

  let x = 0;
  const speed = 1;

  function animate() {

    x -= speed;

    const resetPoint =
      track.scrollWidth / 2;

    if (-x >= resetPoint) {
      x += resetPoint;
    }

    track.style.transform =
      `translateX(${x}px)`;

    requestAnimationFrame(animate);
  }

  animate();
}
const loader = document.getElementById("loader");
const video = document.getElementById("loaderVideo");

// Only run if the loader exists
if (loader && video) {

    document.body.classList.add("loading");

    function finishLoading() {

        loader.classList.add("hide");

        document.body.classList.remove("loading");

        setTimeout(() => {
            loader.remove();
        }, 800);
    }

    window.addEventListener("load", () => {

        if (video.ended) {
            finishLoading();
        } else {
            video.addEventListener("ended", finishLoading, { once: true });

            // Safety: if the video fails to load or hangs,
            // remove the loader after 6 seconds.
            setTimeout(finishLoading, 6000);
        }

    });

}
