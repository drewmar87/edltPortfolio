// Define file types with corresponding extensions.
const fileTypes = {
  "Document Files": [
    ".doc", ".docx", ".pdf", ".txt", ".rtf", ".odt", ".xls", ".xlsx", ".ppt", ".pptx", ".csv"
  ],
  "Image Files": [
    ".jpg", ".jpeg", ".png", ".gif", ".svg", ".bmp", ".tiff", ".webp"
  ],
  "Audio Files": [
    ".mp3", ".wav", ".flac", ".aac"
  ],
  "Video Files": [
    ".mp4", ".avi", ".mov", ".mkv", ".wmv", ".flv", ".webm", ".mpeg"
  ],
  "Source Code Files": [
    ".js", ".py", ".html", ".css", ".java", ".c", ".cpp", ".cs", 
    ".php", ".rb", ".swift", ".ts", ".go", ".rs", ".sql", 
    ".xml", ".json", ".yml", ".yaml"
  ],
  "Compressed Files": [
    ".zip", ".rar", ".7z", ".tar", ".gz", ".bz2", ".iso"
  ],
  "Executable Files": [
    ".exe", ".msi", ".bat", ".sh", ".apk", ".app"
  ],
  "Font Files": [
    ".ttf", ".otf", ".woff", ".woff2"
  ],
  "3D Model Files": [
    ".obj", ".stl", ".fbx", ".dae", ".glb", ".gltf"
  ]
};

// Grab necessary elements.
const fileStack = document.getElementById('file-stack');
const categories = document.querySelectorAll('.category');
const correctCountEl = document.getElementById('correct-count');
const incorrectCountEl = document.getElementById('incorrect-count');
const accuracyEl = document.getElementById('accuracy');

let correctCount = 0;
let incorrectCount = 0;
let dragging = false;
let offsetX, offsetY;

/**
 * Center the file stack within its container (#file-stack-container).
 * Since the container and file stack are the same size (120px by 120px),
 * this will typically set left and top to 0. However, this function is useful
 * if you later adjust sizes.
 */
function centerElement() {
  const container = document.getElementById('file-stack-container');
  const centerX = (container.clientWidth - fileStack.offsetWidth) / 2;
  const centerY = (container.clientHeight - fileStack.offsetHeight) / 2;
  fileStack.style.left = centerX + 'px';
  fileStack.style.top = centerY + 'px';
  fileStack.style.transform = 'none';
}

/**
 * Start a new round: center the file stack and randomly select a new file extension.
 */
function newRound() {
  // Immediately recenter the card.
  centerElement();
  const categoriesArray = Object.keys(fileTypes);
  const randomCategory = categoriesArray[Math.floor(Math.random() * categoriesArray.length)];
  const extensions = fileTypes[randomCategory];
  const randomExtension = extensions[Math.floor(Math.random() * extensions.length)];

  // Save the correct category on the card.
  fileStack.dataset.category = randomCategory;
  document.getElementById('file-layer-1').textContent = randomExtension;
  document.getElementById('file-layer-2').textContent = randomExtension;
  document.getElementById('file-layer-3').textContent = randomExtension;

  // Remove any temporary animation classes.
  fileStack.classList.remove('correct-animate', 'error', 'shake');
  fileStack.style.opacity = '1';
  fileStack.style.transform = 'none';
}

/**
 * Update the score display.
 */
function updateScore(isCorrect) {
  if (isCorrect) {
    correctCount++;
  } else {
    incorrectCount++;
  }
  correctCountEl.textContent = correctCount;
  incorrectCountEl.textContent = incorrectCount;
  const total = correctCount + incorrectCount;
  const accuracy = total ? Math.round((correctCount / total) * 100) : 0;
  accuracyEl.textContent = accuracy + '%';
}

// ----- Custom Drag-and-Drop Implementation -----

/**
 * Start dragging from the given coordinates.
 */
function startDrag(clientX, clientY) {
  dragging = true;
  const rect = fileStack.getBoundingClientRect();
  // Calculate offset from the pointer to the top-left of fileStack.
  offsetX = clientX - rect.left;
  offsetY = clientY - rect.top;
  fileStack.style.transition = 'none';
}

/**
 * Move the file stack to the given coordinates.
 */
function moveDrag(clientX, clientY) {
  if (!dragging) return;
  const container = document.getElementById('file-stack-container');
  const containerRect = container.getBoundingClientRect();
  // Calculate new position relative to the container's top-left.
  const newLeft = clientX - offsetX - containerRect.left;
  const newTop = clientY - offsetY - containerRect.top;
  fileStack.style.left = newLeft + 'px';
  fileStack.style.top = newTop + 'px';
}

/**
 * Finish dragging and check if dropped on a category.
 */
function endDrag() {
  if (!dragging) return;
  dragging = false;
  fileStack.style.transition = 'left 0.3s, top 0.3s';

  // Determine if the card overlaps a category.
  let droppedCategory = null;
  const fsRect = fileStack.getBoundingClientRect();
  categories.forEach(function(cat) {
    const catRect = cat.getBoundingClientRect();
    if (
      fsRect.left < catRect.right &&
      fsRect.right > catRect.left &&
      fsRect.top < catRect.bottom &&
      fsRect.bottom > catRect.top
    ) {
      droppedCategory = cat;
    }
  });

  if (droppedCategory) {
    const targetCategory = droppedCategory.dataset.category;
    const fileCategory = fileStack.dataset.category;
    if (targetCategory === fileCategory) {
      // Correct drop: animate the card "popping" into the target.
      updateScore(true);
      const fsRect = fileStack.getBoundingClientRect();
      const catRect = droppedCategory.getBoundingClientRect();
      const moveX = (catRect.left + catRect.width / 2) - (fsRect.left + fsRect.width / 2);
      const moveY = (catRect.top + catRect.height / 2) - (fsRect.top + fsRect.height / 2);
      fileStack.style.setProperty('--move-x', moveX + 'px');
      fileStack.style.setProperty('--move-y', moveY + 'px');
      fileStack.classList.add('correct-animate');
      fileStack.addEventListener('animationend', function handler() {
        fileStack.classList.remove('correct-animate');
        fileStack.removeEventListener('animationend', handler);
        // Temporarily disable transitions to reset the position instantly.
        fileStack.style.transition = 'none';
        newRound();
      });
    } else {
      // Incorrect drop: animate error and shake, then recenter.
      updateScore(false);
      fileStack.classList.add('error');
      fileStack.classList.add('shake');
      setTimeout(() => {
        fileStack.classList.remove('shake');
        fileStack.classList.remove('error');
        centerElement();
      }, 300);
    }
  } else {
    // If not dropped on any category, return to the center.
    centerElement();
  }
}

// Mouse events
fileStack.addEventListener('mousedown', function(e) {
  startDrag(e.clientX, e.clientY);
});

document.addEventListener('mousemove', function(e) {
  moveDrag(e.clientX, e.clientY);
});

document.addEventListener('mouseup', function() {
  endDrag();
});

// Touch events
fileStack.addEventListener('touchstart', function(e) {
  if (e.touches.length > 0) {
    const touch = e.touches[0];
    startDrag(touch.clientX, touch.clientY);
    e.preventDefault();
  }
});

document.addEventListener('touchmove', function(e) {
  if (!dragging || e.touches.length === 0) return;
  const touch = e.touches[0];
  moveDrag(touch.clientX, touch.clientY);
  e.preventDefault();
});

document.addEventListener('touchend', function(e) {
  if (!dragging) return;
  endDrag();
  e.preventDefault();
});

window.addEventListener('resize', centerElement);
document.addEventListener('DOMContentLoaded', newRound);
