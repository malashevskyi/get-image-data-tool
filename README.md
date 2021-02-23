## GET IMAGE DATA TOOL

[**Visit the website**](https://malashevskyi.pp.ua/get-image-data)

![Screenshot](screenshot.jpg)

You can get data from image and than iterate with loop that much faster than
 using ```context.getImageData();```

Perfect if you need to animate some icons, or small images (up to 3000-4000 particles); 

### Options:
- rgb - copy all data ```[[r, g, b], [r, g, b], ...]```, mostly for jpg.
- rgba - copy all data ```[[r, g, b, a], [r, g, b, a], ...]```, for png, svg with small transparent parts.
- xy rgb - copy selected data ```[[x, y, r, g, b], [x, y, r, g, b], ...]```, for png, svg with large transparent parts. (all coordinates with alpha < 1 excluded)
- xy rgba - copy selected data ```[[x, y, r, g, b, a], [x, y, r, g, b, a], ...]```, for png, svg with large transparent parts. 
- xy - copy only coordinates ```[[x, y], [x, y], ....]```, for icons, text, shapes without color.

