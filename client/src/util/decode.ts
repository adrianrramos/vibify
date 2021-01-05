export default function unescape(string: string) {
  // @ts-ignore
  return new DOMParser()
    .parseFromString(string, "text/html")
    .querySelector("html").textContent;
}
