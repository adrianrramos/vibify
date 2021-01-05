export default function shuffle(array: string[], id?: string): string[] {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  let shuffledQueue = array.filter(trackId => trackId !== id);

  return id ? [id, ...shuffledQueue] : [...shuffledQueue];
}
