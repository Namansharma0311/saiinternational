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
            setTimeout(finishLoading, 8000);
        }

    });

}


// Initialize EmailJS
emailjs.init("fymXGA5Oa_267lIbQ");

// Get the form
const form = document.getElementById("quote-form");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const captchaResponse = grecaptcha.getResponse();

        if (!captchaResponse) {
            alert("Please complete the reCAPTCHA.");
            return;
        }

        emailjs.send("service_skskdzd", "template_xuonzij", {
    name: document.getElementById("name").value,
    company: document.getElementById("company").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    product: document.getElementById("product").value,
    message: document.getElementById("message").value,

    "g-recaptcha-response": captchaResponse
          
        })
        .then(() => {
            alert("✅ Email sent successfully!");
            form.reset();
            grecaptcha.reset();
        })
        .catch((err) => {
            console.error("❌ Failed to send email", err);
            alert(JSON.stringify(err));
        });
    });
}
