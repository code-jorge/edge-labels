const OFFSET_WIDTH = 12;
const LETTER_WIDTH = 8;

const getDetails = (path) => {
  try {
    const [bg, fg, content] = path.substring(1).split("/", 3);
    if (!bg || !fg || !content) throw new Error("MISSING PARAMS");
    // Check bg - Should be a valid hex color
    if (!/^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(bg)) throw new Error("INVALID BG COLOR");
    // Check fg - Should be a valid hex color
    if (!/^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(fg)) throw new Error("INVALID FG COLOR");
    // Check text - Should be letters, numbers and spacebars, also special spanish letters
    const raw_text = decodeURIComponent(content);
    if (!/^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñÜü ]+$/.test(raw_text)) throw new Error("INVALID TEXT");
    const text = raw_text.toUpperCase();
    return [`#${bg}`, `#${fg}`, text];
  } catch (e) {
    return ['red', 'white', e.message || 'BAD REQUEST'];
  }
}

export default (request) => {
  const url = new URL(request.url);
  const path = url.pathname;
  if (path === "/") return;
  const [bg, fg, text] = getDetails(path);
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