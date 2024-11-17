const OFFSET_WIDTH = 12;
const LETTER_WIDTH = 8;

const getDetails = (search) => {
  try {
    const bg = search.get("bg") || "000";
    const fg = search.get("fg") || "fff";
    const width = search.get("width") || "";
    const height = search.get("height") || "";
    const content = search.get("text") || "";
    if (!content) throw new Error();
    // Check fg/bg - Should be a valid hex color
    if (!/^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(bg)) throw new Error("Invalid bg");
    if (!/^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(fg)) throw new Error("Invalid fg");
    // Check width/height - Should be a decimal number > 0, is optional
    if (width && !/^\d+(\.\d+)?$/.test(width)) throw new Error("Invalid width");
    if (height && !/^\d+(\.\d+)?$/.test(height)) throw new Error("Invalid height");
    // Check text - Should be letters, numbers and spacebars, also special Spanish letters 🇪🇸
    const raw_text = decodeURIComponent(content);
    if (!/^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñÜü ]+$/.test(raw_text)) throw new Error("Invalid text");
    const text = raw_text.toUpperCase();
    // Return the details
    return {
      backgroundColor: `#${bg}`, 
      textColor: `#${fg}`, 
      text,
      width: width || 0,
      height: height || 0
    }
  } catch (e) {
    return null;
  }
}

export default (request) => {
  const url = new URL(request.url);
  const search = url.searchParams;
  const path = url.pathname;
  if (path !== "/i") return;
  const details = getDetails(search);
  if (details === null) return new Response("Invalid request", { status: 400 });
  const { backgroundColor, textColor, text, width, height } = details;
  const wordWidth = text.length * LETTER_WIDTH;
  const pathEnd = wordWidth + OFFSET_WIDTH;
  const totalWidth = pathEnd + OFFSET_WIDTH;
  const code = `<svg viewBox="0 0 ${totalWidth} 24" ${width ? `width="${width}px"` : ""} ${height ? `height="${height}px"` : ""} xmlns="http://www.w3.org/2000/svg"><title>${text}</title><path fill="${backgroundColor}" d="M12,2 L${pathEnd},2 A10, 10, 0, 0, 1, ${pathEnd}, 22 L12, 22 A10, 10, 0, 0, 1, 12, 2 Z"></path><text style="font-family:monospace;fill:${textColor}" x="12" y="13" text-anchor="start" dominant-baseline="middle">${text}</text></svg>`;
  return new Response(code, {
    status: 200,
    headers: { "Content-Type": "image/svg+xml" },
  });
}

export const config = { path: "*" };