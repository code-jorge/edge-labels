const OFFSET_WIDTH = 12;
const LETTER_WIDTH = 8;

export default (request) => {
  const url = new URL(request.url);
  const path = url.pathname;
  const [bg, fg, content] = path.substring(1).split("/", 3);
  const text = content.toUpperCase();
  const wordWidth = text.length * LETTER_WIDTH;
  const pathEnd = wordWidth + OFFSET_WIDTH;
  const totalWidth = pathEnd + OFFSET_WIDTH;
  const code = `<svg viewBox="0 0 ${totalWidth} 24" xmlns="http://www.w3.org/2000/svg"><title>${text}</title><path fill="${bg}" d="M12,2 L${pathEnd},2 A10, 10, 0, 0, 1, ${pathEnd}, 22 L12, 22 A10, 10, 0, 0, 1, 12, 2 Z"></path><text style="font-family:monospace;fill:${fg}" x="12" y="13" text-anchor="start" dominant-baseline="middle">${text}</text></svg>`;
  return new Response(code, {
    status: 200,
    headers: { "Content-Type": "image/svg+xml" },
  });
}

export const config = { path: "*" };