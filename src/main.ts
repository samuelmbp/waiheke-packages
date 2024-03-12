import "./style.scss";
import confetti, { Options } from "canvas-confetti";
import ColorThief from "colorthief";

// TYPES

type Color = [number, number, number];

type ColorThief = {
  getColor: (img: HTMLImageElement, quality?: number) => Color;
  getPalette: (img: HTMLImageElement, colorCount?: number, quality?: number) => Color[];
};

// CREATE COLORTHIEF OBJECT

const colorThief: ColorThief = new ColorThief();

// GET & VALIDATE ELEMENTS

const confettiButton = document.querySelector<HTMLButtonElement>("#confetti-button");
const dogImage = document.querySelector<HTMLImageElement>("#dog-image");
const imageUrlInput = document.querySelector("#image-url-input");

if (!confettiButton || !dogImage || !imageUrlInput) {
  throw new Error("Issue with selectors");
}

// HELPERS

const getRGBString = (colors: Color) => {
  return `rgb(${colors[0]},${colors[1]},${colors[2]})`;
};

const getRandomNumberInRange = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

const fireConfetti = (colorPalette?: string[]) => {
  const defaultConfetti = ["#ee2fbe", "#abe2de", "#65ae3c"];

  const confettiOptions: Options = {
    particleCount: getRandomNumberInRange(50, 100),
    angle: getRandomNumberInRange(55, 125),
    spread: getRandomNumberInRange(50, 70),
    origin: { y: 0.6 },
    colors: colorPalette || defaultConfetti,
  };

  confetti(confettiOptions);
};

// HANDLERS

const handleButtonClick = () => {
  fireConfetti();
};

const onImageLoad = () => {
  const color = colorThief.getColor(dogImage);

  document.body.style.backgroundColor = getRGBString(color);

  const colorPalette = colorThief.getPalette(dogImage).map(getRGBString);

  fireConfetti(colorPalette);
};

const handleUrlInput = (event: Event) => {
  dogImage.src = (event.currentTarget as HTMLInputElement).value;
};

// EVENT LISTENERS

confettiButton.addEventListener("click", handleButtonClick);
imageUrlInput.addEventListener("input", handleUrlInput);
dogImage.addEventListener("load", onImageLoad);

if (dogImage.complete) {
  onImageLoad();
}
