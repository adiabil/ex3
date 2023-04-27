const createTile = (transparency, width, height) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetter = () =>
    alphabet[Math.floor(Math.random() * alphabet.length)];
  const letter = randomLetter();
  let visible = false;
  let element = null;

  const toggleVisibility = (shouldBeVisible) => {
    visible = shouldBeVisible;
    const p = element.querySelector("p");
    p.style.opacity = visible ? transparency : 0;
  };

  const matchFound = () => {
    element.style.backgroundColor = "yellow";
  };

  const createElement = () => {
    const div = document.createElement("div");
    div.style.width = width;
    div.style.height = height;
    div.style.backgroundColor = "black";
    div.style.display = "flex";
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    div.style.marginRight = "132px";
    div.style.marginBottom = "230px";

    const p = document.createElement("p");
    p.innerText = letter;
    p.style.fontSize = "30px";
    p.style.color = "white";
    p.style.opacity = visible ? transparency : 0;

    div.appendChild(p);
    element = div;

    return div;
  };

  return {
    letter,visible,
    reveal: () => toggleVisibility(true),
    hide: () => toggleVisibility(false),
    element: createElement(),
    matchFound,
    isEqual: (otherTile) => letter === otherTile.letter,
  };
};

let firstTile = null;
let secondTile = null;
const boxContainer = document.querySelector(".boxes-layout3");
const blackButton = document.querySelector(".black-rectangle");

let initWidth = 80;
let initHeight = 80;
const incrementValue = 20;

blackButton.onclick = () => {
  for (let i = 0; i < 3; i++) {
    const tile = createTile(1, `${initWidth}px`, `${initHeight}px`);
    boxContainer.appendChild(tile.element);

    tile.element.addEventListener("click", () => {
      if (!tile.visible) {
        if (!firstTile) {
          firstTile = tile;
          tile.reveal();
        } else if (!secondTile && firstTile !== tile) {
          secondTile = tile;
          tile.reveal();

          if (tile.isEqual(firstTile)) {
            firstTile.matchFound();
            secondTile.matchFound();
            firstTile = null;
            secondTile = null;
          } else {
            setTimeout(() => {
              firstTile.hide();
              secondTile.hide();
              firstTile = null;
              secondTile = null;
            }, 1000);
          }
        }
      }
    });

    initWidth += incrementValue;
    initHeight += incrementValue;
  }
};
