import Swiper, { Pagination } from 'swiper';
import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';
import device from 'current-device';

gsap.registerPlugin(ScrollTrigger, CustomEase);

const swiperGallery = new Swiper('.swiper-gallery', {
  modules: [Pagination],
  speed: 1000,
  spaceBetween: 8,
  slidesPerView: 1,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

const swiperAchievements = new Swiper('.swiper-achievements', {
  speed: 1000,
  slidesPerView: 1.1,
  spaceBetween: 8,
});

const swiperOther = new Swiper('.swiper-other', {
  speed: 1000,
  spaceBetween: 8,
  slidesPerView: 1.1,
});

const swiperMaterials = new Swiper('.swiper-materials-btns', {
  speed: 1000,
  slidesPerView: 'auto',
  spaceBetween: 8,
});

const floorData = {
  floor1: [
    {
      id: 'room1',
      name: 'Room 1',
      area: '17.71  м2',
      image: './assets/images/single-project/materials.jpg',
    },
    {
      id: 'room2',
      name: 'Room 2',
      area: '33.91 м2',
      image: './assets/images/single-project/description.jpg',
    },
  ],
  floor2: [
    {
      id: 'room3',
      name: 'Room 3',
      area: '6.31  м2',
      image: 'https://via.placeholder.com/400x300?text=Floor+2+Room+3',
    },
    {
      id: 'room4',
      name: 'Room 4',
      area: '17.71  м2',
      image: 'https://via.placeholder.com/400x300?text=Floor+2+Room+4',
    },
  ],
  floor3: [
    {
      id: 'room5',
      name: 'Room 3',
      area: '6.31  м2',
      image: 'https://via.placeholder.com/400x300?text=Floor+2+Room+3',
    },
    {
      id: 'room4',
      name: 'Room 4',
      area: '17.71  м2',
      image: 'https://via.placeholder.com/400x300?text=Floor+2+Room+4',
    },
  ],
};

const floorSelector = document.getElementById('floor-selector');
const roomSelector = document.getElementById('room-selector');
const roomImage = document.getElementById('room-image');
console.log(floorSelector, roomSelector, roomImage);
let currentFloor = null;

// Helper function to insert buttons
const insertButton = (text, area, id, container, callback) => {
  container.insertAdjacentHTML(
    'beforeend',
    `<div class="swiper-slide" data-id="${id}"> 
        <span>${text}</span>
        <p>${area}</p>
    </div>`,
  );
  const button = container.querySelector(`.swiper-slide[data-id="${id}"]`);
  button.addEventListener('click', callback);
};

// Render rooms based on the selected floor
const renderRooms = floor => {
  // roomSelector.innerHTML = '<h3>Select Room:</h3>';
  roomSelector.innerHTML = '';
  floorData[floor].forEach((room, index) => {
    insertButton(room.name, room.area, room.id, roomSelector, () => selectRoom(floor, room.id));

    if (index === 0) {
      selectRoom(floor, room.id); // Auto-select the first room
    }
    swiperMaterials.update();
  });
};

// Handle floor selection
const selectFloor = floor => {
  currentFloor = floor;
  Array.from(floorSelector.querySelectorAll('button')).forEach(button => {
    button.classList.toggle('active', button.dataset.floor === floor);
  });
  renderRooms(floor);
};

// Handle room selection
const selectRoom = (floor, roomId) => {
  const room = floorData[floor].find(r => r.id === roomId);
  Array.from(roomSelector.querySelectorAll('.swiper-slide')).forEach(button => {
    button.classList.toggle('active', button.dataset.id === roomId);
  });
  gsap
    .timeline()
    .to(roomImage, { autoAlpha: 0, duration: 0.25 })
    .add(() => {
      roomImage.src = room.image;
      roomImage.alt = room.name;
    })
    .to(roomImage, { autoAlpha: 1, duration: 0.25 });
};
const insertFloorButton = (floor, number, container, callback) => {
  container.insertAdjacentHTML(
    'beforeend',
    `<button class="sh-plannings__floors-btn" data-floor="${floor}"> 
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
              <path d="M12.263 1.5468L3.31169 6.99544C2.71341 7.35961 2.71341 8.22811 3.31169 8.59228L12.263 14.0409C12.5615 14.2226 12.9365 14.2226 13.235 14.0409L22.1864 8.59228C22.7846 8.22811 22.7846 7.35961 22.1864 6.99544L13.235 1.5468C12.9365 1.36509 12.5615 1.36509 12.263 1.5468Z" stroke="white" stroke-width="1.25"/>
              <path d="M18.1235 19.4778L22.1864 17.0047C22.7846 16.6406 22.7846 15.7721 22.1864 15.4079L20.544 14.4082M14.6685 21.5808L13.235 22.4534C12.9365 22.6351 12.5615 22.6351 12.263 22.4534L3.31169 17.0047C2.71341 16.6406 2.71341 15.7721 3.31169 15.4079L5.07115 14.3369" stroke="white" stroke-width="1.25" stroke-linecap="round"/>
              <path d="M5.83894 10.1306L3.31169 11.6689C2.71341 12.0331 2.71341 12.9016 3.31169 13.2658L12.263 18.7144C12.5615 18.8961 12.9365 18.8961 13.235 18.7144L22.1864 13.2658C22.7846 12.9016 22.7846 12.0331 22.1864 11.6689L19.6591 10.1306" stroke="white" stroke-width="1.25"/>
            </svg>
        <span> ${number} поверх </span>
    </button>`,
  );
  const button = container.querySelector(`.sh-plannings__floors-btn[data-floor="${floor}"]`);
  button.addEventListener('click', callback);
};
// Render floors
floorSelector.innerHTML = '';
Object.keys(floorData).forEach((floor, index) => {
  insertFloorButton(floor, index + 1, floorSelector, () => selectFloor(floor));
  if (index === 0) {
    selectFloor(floor); // Auto-select the first floor
  }
});
