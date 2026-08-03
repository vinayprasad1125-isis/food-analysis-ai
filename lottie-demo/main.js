// Lottie demo loader
// Replace the value below with a raw JSON URL from LottieFiles (Share → JSON or right-click Raw JSON link)
const ANIMATION_URL = 'REPLACE_WITH_LOTTIE_JSON_URL';

const container = document.getElementById('anim');
let anim = null;

function load(url){
  if (anim) anim.destroy();
  anim = lottie.loadAnimation({
    container,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: url,
  });
}

document.getElementById('play').addEventListener('click', ()=> anim && anim.play());
document.getElementById('pause').addEventListener('click', ()=> anim && anim.pause());
document.getElementById('stop').addEventListener('click', ()=> anim && anim.stop());

// If user left the placeholder, show helpful message in console
if (ANIMATION_URL === 'REPLACE_WITH_LOTTIE_JSON_URL'){
  console.warn('No Lottie JSON URL set. Edit main.js and set ANIMATION_URL to a Lottie JSON URL from LottieFiles.');
} else {
  load(ANIMATION_URL);
}
