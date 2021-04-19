export function randomRGBA() {
  return `rgba(${Math.floor(Math.random() * 255)},${Math.floor(
    Math.random() * 255,
  )},${Math.floor(Math.random() * 255)},0.5)`;
}
