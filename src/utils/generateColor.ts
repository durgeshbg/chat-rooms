const hexCharacters = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];

export default function generateColor() {
  let color = '';
  for (let i = 0; i < 6; i++) {
    color += hexCharacters[Math.floor(Math.random() * hexCharacters.length)];
  }
  return color;
}
