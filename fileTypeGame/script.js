// Define file types with corresponding extensions.
const fileTypes = {
  "Document Files": [
    ".doc", ".docx", ".pdf", ".txt", ".rtf", ".xls", ".xlsx", ".ppt", ".pptx", ".csv"
  ],
  "Image Files": [
    ".jpg", ".jpeg", ".png", ".gif", ".svg", ".bmp", ".tiff", ".webp", ".ico", ".eps"
  ],
  "Audio Files": [
    ".mp3", ".wav", ".flac"
  ],
  "Video Files": [
    ".mp4", ".avi", ".mov", ".mkv", ".webm"
  ],
  "Source Code Files": [
    ".js", ".py", ".html", ".css", ".java", ".c", ".cpp", ".php", ".json", ".xml"
  ]
};


const fileStack = document.getElementById('file-stack');
const categories = document.querySelectorAll('.category');
const correctCountEl = document.getElementById('correct-count');
const incorrectCountEl = document.getElementById('incorrect-count');
const accuracyEl = document.getElementById('accuracy');

let correctCount = 0;
let incorrectCount = 0;
let dragging = false;
let offsetX, offsetY;

// Start a new round by centering the card and choosing a new file type.
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

// Center the draggable card in the game container.
function centerElement() {
  const container = document.getElementById('game-container');
  const containerRect = container.getBoundingClientRect();
  const fsRect = fileStack.getBoundingClientRect();
  const centerX = containerRect.width / 2 - fsRect.width / 2;
  const centerY = containerRect.height / 2 - fsRect.height / 2;
  fileStack.style.left = centerX + 'px';
  fileStack.style.top = centerY + 'px';
  fileStack.style.transform = 'none';
}

// Update the score display.
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

fileStack.addEventListener('mousedown', function(e) {
  dragging = true;
  const rect = fileStack.getBoundingClientRect();
  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;
  fileStack.style.transition = 'none';
});

document.addEventListener('mousemove', function(e) {
  if (!dragging) return;
  fileStack.style.left = (e.clientX - offsetX) + 'px';
  fileStack.style.top = (e.clientY - offsetY) + 'px';
});

document.addEventListener('mouseup', function(e) {
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
  // Disable transition so the new card immediately starts in the center.
  fileStack.style.transition = 'none';
  newRound();
});

    } else {
      // Incorrect drop: add error and shake classes and keep red during shake.
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
    // Not dropped on any category: return to center.
    centerElement();
  }
});

window.addEventListener('resize', centerElement);
document.addEventListener('DOMContentLoaded', newRound);
