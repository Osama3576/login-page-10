const pathName = window.location.pathname;
const barsContainer = document.querySelector('.bars-container');
const numberOfBars = `${pathName === '/login.html' ? 50 : 70}`; // Number of bars to complete the circle
const angleStep = 360 / numberOfBars;

// Create the bars dynamically
for (let i = 0; i < numberOfBars; i++) {
  const bar = document.createElement('div');
  bar.classList.add('bar');

  // Set the rotation for each bar
  bar.style.transform = `rotate(${i * angleStep}deg) translateY(${
    pathName === '/login.html' ? '-200px' : '-250px'
  })`;
  bar.dataset.index = i; // Store the index for color animation

  barsContainer.appendChild(bar);
}

// updateBarColors(); // Start the animation
function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255]; // Return array [r, g, b]
}

function lerpColor(c1, c2, t) {
  return c1.map((val, i) => Math.round(val + (c2[i] - val) * t)); // Interpolate for r, g, b
}

const startColor = hexToRgb('#FFA604');
const endColor = hexToRgb('#232D40');
let colorShift = 0;

function updateBarColors() {
  const bars = document.querySelectorAll('.bar');
  const numBars = bars.length;

  bars.forEach((bar, index) => {
    const t = (index + colorShift) / numBars; // Adjust interpolation with color shift
    const [r, g, b] = lerpColor(startColor, endColor, t % 1); // Wrap the t value to loop colors
    bar.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  });

  colorShift += 0.03; // Shift colors over time for animation effect
  requestAnimationFrame(updateBarColors); // Continuously update colors
}

updateBarColors();
