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
| width      | The image width.                   | string   | _(optional)_    |
| height     | The image height.                  | string   | _(optional)_    |

### Examples

Here's how I generated the labels above:

- `/i?text=lael&height=20`
- `/i?text=generator&height=20&bg=ffd700&fg=000`
- `/i?text=using&height=20&bg=4682b4`
- `/i?text=svg&height=20&bg=9b673c`

### The math

Okay, so according to my calculations, each letter is about 8 units wide.

We are also leaving an offset of 12 units for the label rounding and stuff.

