## GET IMAGE DATA TOOL

[Website](https://get-image-data-tool.vercel.app/)

You can get data from image instead of using `context.getImageData();`

## Contents

- [Why](#why)
- [RGBA Controls examples](#rgba-controls-examples)
- [Options](#options)
- [Particle example](#particle-example)
- [Iteration examples](#iteration-examples)

## Why

I made two examples with the same image - 6312 particles:

- [link](https://get-image-data.web.app/examples/context.getImageData/) (48 FPS on my computer) with context.getImageData
- [link](https://get-image-data.web.app/examples/imageDataTool/) (60 FPS on my computer) without context.getImageData, it is just an image array with coordinates which I obtained with this tool.

When I use `context.getImageData()` sometimes FPS sags even if I want to get `1px`. More problem if I need to get data from several images, or I use several canvases or use routing.

As far as I understood it very much depends on how much RAM you have.

I was very surprised that the situation changed a lot when I added another 8gb of memory (before was 16gb)

Then I tested a small image (44 particles) on my old very weak laptop with 4gb of memory:

- 38-40 FPS with context.getImageData(); (44 particles)
- 60 FPS just array with coordinates; (44 particles)

## RGBA Controls examples

| <img width=250/>Example | <img width=750/> Solution                                                                               |
| ----------------------- | ------------------------------------------------------------------------------------------------------- |
| remove black background | `black - (0, 0, 0)`, <br> to remove you need to set `r` or `g` or `b` more than `0`                     |
| remove white background | `white - (255, 255, 255)`, <br> to remove you need to set `r` or `g` or `b` less than `255`             |
| remove red background   | `red - (255, 0, 0)`, <br> to remove you need to set `r` less than `255` or set `g` or `b` more than `0` |

## Options:

| <img width=250/>Option | <img width=650/>Sample             | <img width=1000/>Description                                                                                                                                                                                                               |
| ---------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| r g b                  | `[[r, g, b], [...], ...]`          | get all coordinates `image.width * image.height`, you need to use jpg rather than png or svg; otherwise when you set:<br> `this.color = 'rgb(${r},${g},${b})'` <br> all transparent parts (if exist) will be black.                        |
| r g b a                | `[[r, g, b, a], [...], ...]`       | get all coordinates `image.width * image.height`, in case, if an image has small transparent parts then better copy all coordinates than add `x` and `y` to each particle, then when you iterate data you can create a particle if `a > 0` |
| x y r g b              | `[[x, y, r, g, b], [...], ...]`    | get only selected coordinates with `x`, `y` and color, then you can iterate `data.length` with one loop or randomly draw some particles, <br> ALL COORDINATES WITH `alpha < 1` EXCLUDED.                                                   |
| x y r g b a            | `[[x, y, r, g, b, a], [...], ...]` | the same as `xy rgb` but also include coordinates with `alpha < 1`, here you can control with A range which coordinates will be included.                                                                                                  |
| x y                    | `[[x, y], [...], ....]`            | the only position of every selected pixel without color, ok if you create some text or shapes animation with the same color.                                                                                                               |

## Particle example

```javascript
class Particle {
  constructor({ x, y, r, g, b, a, width, height, color }) {
    this.x = x
    this.y = y
    this.color = color ? color : `rgba(${r}, ${g}, ${b}, ${a})`
    this.width = width
    this.height = height
  }

  draw() {
    context.beginPath()
    context.fillStyle = this.color
    context.rect(this.x, this.y, this.width, this.height)
    context.fill()
  }
}
```

## Iteration examples

- #### Iterate `rgb` or `rgba` with two loops

  ```javascript
  import { data } from './data.js' // your copied data

  /* set real dimensions of your image */
  const image = {
    width: 100,
    height: 100,
  }

  /* multiply x and y if you want to make big image
  with visible pixels */
  const scale = 1

  let i = 0
  for (let y = 0; y < image.height; y++) {
    for (let x = 0; x < image.width; x++) {
      const [r, g, b, a] = data[i]

      particles.push(
        new Particle({
          x: x * scale,
          y: y * scale,
          r,
          g,
          b,
          /* rgba */
          a,
          /* rgb */
          a: 1,

          /* set width and height to scale, if you scale it*/
          width: scale,
          height: scale,
        })
      )

      i++
    }
  }
  ```

- #### Iterate `rgb` or `rgba` with one loop

  ```javascript
  import { data } from './data.js' // your copied data

  /* set a real width of your image */
  const image = {
    width: 300,
  }

  /* multiply x and y if you want to make big image
  with visible pixels */
  const scale = 1

  for (let i = 0; i < data.length; i++) {
    const [r, g, b, a] = data[i]

    particles.push(
      new Particle({
        x: (i % image.width) * scale,
        y: Math.floor(i / image.width) * scale,
        r,
        g,
        b,
        /* rgba */
        a,
        /* rgb */
        a: 1,

        /* set width and height to scale, if you scale it */
        width: scale,
        height: scale,
      })
    )
  }
  ```

- #### Iterate `xyrgb` or `xyrgba`

  ```javascript
  import { data } from './data.js' // your copied data

  /* multiply x and y if you want to make big image
  with visible pixels */
  const scale = 1

  for (let i = 0; i < data.length; i++) {
    const [x, y, r, g, b, a] = data[i]

    particles.push(
      new Particle({
        x: x * scale,
        y: y * scale,
        r,
        g,
        b,
        /* xy rgba */
        a,
        /* xy rgb */
        a: 1,

        /* set width and height to scale, if you scale it*/
        width: scale,
        height: scale,
      })
    )
  }
  ```

- #### Iterate `xy`

  ```javascript
  import { data } from './data.js' // your copied data

  /* multiply x and y if you want to make big image
  with visible pixels */
  const scale = 1

  for (let i = 0; i < data.length; i++) {
    const [x, y] = data[i]

    particles.push(
      new Particle({
        x: x * scale,
        y: y * scale,
        color: 'purple',
        /* set width and height to scale, if you scale it*/
        width: scale,
        height: scale,
      })
    )
  }
  ```
