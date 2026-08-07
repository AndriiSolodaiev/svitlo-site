import mapStyle from './singleProjectMapStyle';

// Restrict this key by HTTP referrer (svitlo-* domains) in Google Cloud Console.
const API_KEY = 'AIzaSyBE3YmG1oTpmQwZnCk9WmPWGbapbm7FAKY';
const PROJECT_COORDS = { lat: 50.5309969, lng: 30.2696907 };

let scriptPromise = null;

function loadGoogleMapsScript() {
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise(resolve => {
    if (window.google && window.google.maps) {
      resolve();
      return;
    }
    window.__initSingleProjectMap = resolve;
    const lang = document.documentElement.getAttribute('lang') || 'uk';
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=__initSingleProjectMap&language=${lang}`;
    script.async = true;
    document.head.appendChild(script);
  });
  return scriptPromise;
}

function createMap(mapEl) {
  const map = new google.maps.Map(mapEl, {
    center: PROJECT_COORDS,
    zoom: 14,
    scrollwheel: false,
    gestureHandling: 'cooperative',
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    styles: mapStyle,
  });

  new google.maps.Marker({
    position: PROJECT_COORDS,
    map,
  });
}

export default function initSingleProjectMap() {
  const mapEl = document.querySelector('.sp-map .map-canvas');
  if (!mapEl) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      loadGoogleMapsScript().then(() => createMap(mapEl));
    });
  }, { rootMargin: '200px' });

  observer.observe(mapEl);
}
