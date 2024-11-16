## Label Generator

### How it works

Simply query `/<background>/<text-color>/<text>` and you will get an SVG with the label.

Where:

| Parameter  | Description                        |
|------------|------------------------------------|
| background | The background color of the label. |
| foreground | The text color of the label.       |
| text       | The text to display.               |

### The math

Okay, so according to my terrible math, each letter is about 8 units wide.
We are also leaving an offset of 12 units for the label rounding and stuff.

### Non-minified version

The actual code that powers this in a non-minified way is

```
<svg viewBox="0 0 ${totalWidth} 24" xmlns="http://www.w3.org/2000/svg">
  <title>${text}</title>
  <path 
    fill="${bg}" 
    d="
      M12,2
      L${pathEnd},2
      A10, 10, 0, 0, 1, ${pathEnd}, 22
      L12, 22
      A10, 10, 0, 0, 1, 12, 2
      Z
    "
  ></path>
  <text 
    style="font-family:monospace;fill:${fg}" 
    x="12" y="13" 
    text-anchor="start"
    dominant-baseline="middle"
  >
    ${text}
  </text>
</svg>
```