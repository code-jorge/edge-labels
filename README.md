## Label Generator

![Label](https://edge-labels.netlify.app/i?text=label&height=20)
![Generator](https://edge-labels.netlify.app/i?text=generator&height=20&bg=ffd700&fg=000)
![Using](https://edge-labels.netlify.app/i?text=using&height=20&bg=4682b4)
![SVGs](https://edge-labels.netlify.app/i?text=svg&height=20&bg=9b673c)

### How it works

Simply query `/i` and you will get an SVG with the label.

You must specify the query parameters as follows:


| Parameter  | Description                        | Type     | Default / Type  |
|------------|------------------------------------|----------|-----------------|
| bg         | The background color of the label. | hex code | 000             |
| fg         | The text color of the label.       | hex code | fff             |
| text       | The text to display.               | sring    | *_Required_     |
| width      | The image width. (Optional)        | string   | _(optional)_    |
| height     | The text to display.               | string   | _(optional)_    |

### The math

Okay, so according to my terrible math, each letter is about 8 units wide.
We are also leaving an offset of 12 units for the label rounding and stuff.

### Non-minified version

The actual code that powers this in a non-minified way is

```
<svg 
  viewBox="0 0 ${totalWidth} 24" 
  xmlns="http://www.w3.org/2000/svg"
  ${width ? `width="${width}px"` : ''} 
  ${height ? `height="${height}px"` : ''}
>
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