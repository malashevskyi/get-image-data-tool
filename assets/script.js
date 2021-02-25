document.addEventListener('DOMContentLoaded', () => {
  const errorBlock = document.querySelector('.error');
  const imageChooseOverlay = document.querySelector('.image-choose--overlay');
  const imageChoose = document.querySelector('.image-choose');
  const body = document.querySelector('body');
  
  const fileInput1 = document.getElementById('file-input1');
  const fileInput2 = document.getElementById('file-input2');
  const imageDataWidth = document.querySelector('.image-data--width span');
  const imageDataHeight = document.querySelector('.image-data--height span');
  const imageDataParticles = document.querySelector('.image-data--particles .length');
  const imageSize = document.querySelector('.image-data--particles .size');
  
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  
  const canvasChoose = document.getElementById('canvas-image-choose');
  const contextChoose = canvasChoose.getContext('2d');
  
  const copyTp = document.getElementById('copyTp');
  const modalSuccess = document.querySelector('.modal-success');
  
  const sampleDisplay = document.querySelector('.sample code');
  const samples = document.querySelectorAll('.samples--input');
  const canvasContainer = document.querySelector('.canvas-wrap');
  const copyDataButton = document.querySelector('.copy-data');
  const controlItems = document.querySelectorAll('.controls--item');

  const copyCodeButtons = document.querySelectorAll('.copy-code--button');

  const particles = [];
  const rgbaControls = { r: [0, 255], g: [0, 255], b: [0, 255], a: [0, 1] };
  const controlInputsWraps = document.querySelectorAll('.controls--item');
  const samplesValues = {
    rgb: `<em>Sample (r, g, b)</em><br>
    <span><span class="b1">[</span><span class="b2">[</span><span class="n">123</span>, <span class="n">111</span>, <span class="n">153</span><span class="b2">]</span>, <span class="b2">[</span>...<span class="b2">]</span>, ...<span class="b1">]</span></span><br>
    <em>Get all coordinates, you need to use jpg rather than png or svg, otherwise when you set: <span class="n">this.color = <span class="g">\`rgb(<span class="b2">\${</span><span class="r">r</span><span class="b2">}</span>,<span class="b2">\${</span><span class="r">g</span><span class="b2">}</span>,<span class="b2">\${</span><span class="r">b</span><span class="b2">}</span>)\`</span></span>all transparent parts (if exist) will be black.</em>`,
    rgba: `<em>Sample (r, g, b, a)</em><br>
    <span><span class="b1">[</span><span class="b2">[</span><span class="n">123</span>, <span class="n">111</span>, <span class="n">153</span>, <span class="n">0.89</span><span class="b2">]</span>, <span class="b2">[</span>...<span class="b2">]</span>, ...<span class="b1">]</span></span><br><em>Get all coordinates (e.g. png with small transparent parts).</em>`,
    xyrgb: `<em>Sample (x, y, r, g, b)</em><br>
    <span><span class="b1">[</span><span class="b2">[</span><span class="n">34</span>, <span class="n">20</span>, <span class="n">123</span>, <span class="n">111</span>, <span class="n">153</span><span class="b2">]</span>, <span class="b2">[</span>...<span class="b2">]</span>, ...<span class="b1">]</span></span><br><em>Selected coordinates with color. <br>All coordinates with alpha < 1 excluded. <br> (e.g. png or svg with large transparent parts)</em>`,
    xyrgba: `<em>Sample (x, y, r, g, b, a)</em><br>
    <span><span class="b1">[</span><span class="b2">[</span><span class="n">34</span>, <span class="n">20</span>, <span class="n">123</span>, <span class="n">111</span>, <span class="n">153</span>, <span class="n">0.89</span><span class="b2">]</span>, <span class="b2">[</span>...<span class="b2">]</span>, ...<span class="b1">]</span></span><br><em>Selected coordinates with color (e.g. png or svg with large transparent parts).</em>`,
    xy: `<em>Sample (x, y)</em><br>
    <span><span class="b1">[</span><span class="b2">[</span><span class="n">34</span>, <span class="n">20</span><span class="b2">]</span>, <span class="b2">[</span>...<span class="b2">]</span>, ...<span class="b1">]</span></span><br><em>Only selected coordinates without color, <br> if you don't need an image colors (e.g. text, icons or shapes)</em>`,
  }
  let iCHeight = imageChoose.offsetHeight;
  let iCWidth = imageChoose.offsetWidth;
  let copyData = '';
  let firstInput = true;
  let imageData = null;
  let imageUrl = null;
  let image = {};
  let errorTimeout = null;
  let dataType = 'xyrgb';
  let offsetTick = 0;
  let grd; 
  
  function createGradient() {
    grd = context.createLinearGradient(0, 0, iCWidth, iCHeight);
    grd.addColorStop(0,   `hsl(0, 50%, 50%)`);
    grd.addColorStop(0.1, `hsl(30, 50%, 50%)`);
    grd.addColorStop(0.2, `hsl(60, 50%, 50%)`);
    grd.addColorStop(0.3, `hsl(90, 50%, 50%)`);
    grd.addColorStop(0.4, `hsl(120, 50%, 50%)`);
    grd.addColorStop(0.5, `hsl(150, 50%, 50%)`);
    grd.addColorStop(0.6, `hsl(180, 50%, 50%)`);
    grd.addColorStop(0.7, `hsl(210, 50%, 50%)`);
    grd.addColorStop(0.8, `hsl(240, 50%, 50%)`);
    grd.addColorStop(0.9, `hsl(270, 50%, 50%)`);
    grd.addColorStop(1,   `hsl(300, 50%, 50%)`);
  }
  createGradient();

  // remove drop overlay when it dropped inside "imageChoose" block
  // check position through mousemove
  window.addEventListener('mousemove', (event) => {
    removeOverlay(false, event.clientX, event.clientY);
  })
  // disable drop image in document (it opens image in new tab)
  document.addEventListener('drop', (event) => {
    event.preventDefault();
    event.stopPropagation();
  });
  // remove drop overlay when it is dragging outside "imageChoose" block
  // check position through dragover
  document.addEventListener('dragover', (event) => {
    event.preventDefault();
    event.stopPropagation();

    removeOverlay(false, event.clientX, event.clientY);
  });

  // activate drop overlay if it is dragging inside "imageChoose" block
  imageChoose.addEventListener('dragover', (event) => {
    event.preventDefault();
    event.stopPropagation();

    imageChooseOverlay.classList.add('is-active');
  });

  // on click choose a file button handler

  fileInput1.addEventListener('change', fileInputChnageHandler);
  fileInput2.addEventListener('change', fileInputChnageHandler);
  
  function fileInputChnageHandler() {
    if (firstInput) {
      document.querySelector('.image-choose--start').classList.remove('is-active');
      document.querySelectorAll('.inactive').forEach(el => el.classList.remove('inactive'));
      body.classList.remove('first');
      firstInput = false;
    }

    if (this.files && this.files[0]) {
      const file = this.files[0];
  
      if (checkFile(file)) {
        setImage(file);
      } else {
        errorFile(file);
      }
    }
  }

  // drop file handler
  imageChoose.addEventListener('drop', (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (firstInput) {
      document.querySelector('.image-choose--start').classList.remove('is-active');
      firstInput = false;
    }
    
    const file = event.dataTransfer.files[0];
    
    if (checkFile(file)) {
      setImage(file);
    } else {
      errorFile(file);
    }

    removeOverlay(true);
  });

  // rgb controls input handler
  document.querySelectorAll('.controls--input').forEach((input) => {
    input.addEventListener('input', rgbControlChangeHandler);
  })

  // change samples (rgb, rgba, xyrgb, xyrgba, xy)
  samples.forEach(sample => {
    sample.addEventListener('change', function ()  {
      dataType = this.getAttribute('tp');

      switch (dataType) {
        case 'rgb':
          controlItems.forEach((item) => {
            item.classList.add('disabled');
          })
          setSample(samplesValues.rgb);
          break;
        case 'rgba':
          controlItems.forEach((item) => {
            item.classList.add('disabled');
          })
          setSample(samplesValues.rgba);
          break;
        case 'xyrgb':
          controlItems.forEach((item, i) => {
            if (i !== 3) {
              item.classList.remove('disabled');
            } else {
              item.classList.add('disabled');
            }
          })
          setSample(samplesValues.xyrgb);
          break;
        case 'xyrgba':
          controlItems.forEach((item) => {
            item.classList.remove('disabled');
          })
          setSample(samplesValues.xyrgba);
          break;
        case 'xy':
          controlItems.forEach((item) => {
            item.classList.remove('disabled');
          })
          setSample(samplesValues.xy);
          break;
      }

      // reset particles
      particles.length = 0;
    });
  });

  // copy data
  copyDataButton.addEventListener('click', (e) => {
    copyToClipboard(`[${copyData}]`);
    
    showSuccessModal('Data');
  });
  
  let modalSuccessTimeout;
  function showSuccessModal(type) {
    copyTp.textContent = type;
    
    // remove prev modal
    modalSuccess.classList.remove('is-active');
    clearTimeout(modalSuccessTimeout);

    setTimeout(() => {
      modalSuccess.classList.add('is-active');

      modalSuccessTimeout = setTimeout(() => {
        modalSuccess.classList.remove('is-active');
      }, 10000);
    }, 350);
  }

  function copyToClipboard(text) {
    const dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  }

  const copyCodeData = {
    particle() {
      return `class Particle {
  constructor({ x, y, r, g, b, a, width, height, color }) {
    this.x = x;
    this.y = y;
    this.color = color ? color : \`rgba(\${r}\${r}\${b})\`;
    // this.color = color ? color : \`rgba(\${r}\${r}\${b}\${a})\`;
    this.width = width;
    this.height = height;
  }

  draw() {
    context.beginPath();
    context.fillStyle = this.color;
    context.rect(this.x, this.y, this.width, this.height);
    context.fill();
  }
}`
    },
    rgb() {
      return `// import { imageData } from './imageData';

const image = {
  width: ${image.width},
}

function getParticles() {
  /* multiply x and y if you want to make big image
  with visible pixels */
  const scale = 1;

  for (let i = 0; i < data.length; i++) {
    particles.push(new Particle({
      x: i % (image.width) * scale,
      y: Math.floor(i / image.width) * scale,
      r: imageData[i][0],
      g: imageData[i][1],
      b: imageData[i][2],
      /* rgba */
      a: imageData[i][3],
      /* rgb */
      a: 1,

      /* set width and height to scale, if you scale it */
      width: scale,
      height: scale,
    }));
  }
}
getParticles();`
    },
    xyrgb() {
      return `// import { imageData } from './imageData';

function getParticles() {
  /* multiply x and y if you want to make big image
  with visible pixels */
  const scale = 1;
  
  for (let i = 0; i < data.length; i++) {
    particles.push(new Particle({
      x: imageData[i][0] * scale,
      y: imageData[i][1] * scale,
      r: imageData[i][2],
      g: imageData[i][3],
      b: imageData[i][4],
      /* xy rgba */
      a: imageData[i][5],
      /* xy rgb */
      a: 1,
  
      /* set width and height to scale, if you scale it*/
      width: scale,
      height: scale,
    }));
  }
}
getParticles();`
    },
    xy() {
      return `// import { imageData } from './imageData';

function getParticles() {
  /* multiply x and y if you want to make big image
  with visible pixels */
  const scale = 1;
  
  for (let i = 0; i < data.length; i++) {
    particles.push(new Particle({
      x: imageData[i][0] * scale,
      y: imageData[i][1] * scale,
      color: 'purple',
      /* set width and height to scale, if you scale it*/
      width: scale,
      height: scale,
    }));
  }
}
getParticles();`
    }
  }

  // copy code buttons
  copyCodeButtons.forEach(button => {
    button.addEventListener("click", function () {
      const type = this.getAttribute('tp');

      copyToClipboard(copyCodeData[type]());

      showSuccessModal('code of ' + type + ((type === 'particle') ? '' : ' loop'));
    }); 
  });

  // thumbs hover
  const thumbs = document.querySelectorAll('.controls--input');
  thumbs[0].addEventListener('mouseenter', function (e) {
    this.classList.add('hovered')
  })

  // thumbs hover
  document.querySelectorAll('.controls--input').forEach((input) => {
    const spans = input.closest('.controls--inputs').querySelectorAll('.controls--thumbs span');
    const left = input.classList.contains('left'); 

    let activeSpan;
    if (left) {
      activeSpan = spans[0];
    } else {
      activeSpan = spans[1];
    }
    
    input.addEventListener('mouseenter', function() {
      activeSpan.classList.add('hovered');
    });
    input.addEventListener('mouseout', function() {
      activeSpan.classList.remove('hovered');
    });
  })

  // get new width and height for canvas dash animation
  window.addEventListener('resize', () => {
    iCWidth = imageChoose.offsetWidth;
    iCHeight = imageChoose.offsetHeight;

    createGradient();
  })

  // set sample
  function setSample(text) {
    sampleDisplay.innerHTML = text
        .replace(/(\[)/g, "<span>$1</span>")
        .replace(/(\])/g, "<span>$1</span>")
        .replace(/(\/\/\s.+)/, "<em>$1</em>");
  }
  setSample(samplesValues.xyrgb);

  function displayImageData() {
    if (!image) return;

    imageDataWidth.textContent = image.width + ' px';
    imageDataHeight.textContent = image.height + ' px';

    imageDataParticles.textContent = particles.length;

    let size = copyData.length / 1024;
    if (size) size += 4;
    imageSize.textContent = Math.round(size) +' KB';
  }
  
  function removeOverlay(force, x, y) {
    if (force) {
      imageChooseOverlay.classList.remove('is-active');
    } else {
      const position = document.elementFromPoint(x, y);
      if (position && position !== imageChoose && !position.closest('image-choose')) {
        imageChooseOverlay.classList.remove('is-active');
      }
    }
  }
  
  function errorFile(file) {
    errorBlock.classList.remove('is-active');
    errorBlock.querySelector('.file').textContent = file.name;
    errorBlock.classList.add('is-active');
    
    clearTimeout(errorTimeout);
    errorTimeout = setTimeout(() => {
      errorBlock.classList.remove('is-active');
    }, 10000);
  }
  
  function setImage(file) {
    // remove previous image
    image = null;
    // add url of new image
    imageUrl = URL.createObjectURL(file);
    // remove image data when new one set
    imageData = null;
  }

  function checkFile(file) {
    return file.type === 'image/svg+xml'
        || file.type === 'image/png'
        || file.type === 'image/jpeg' 
        || file.type === 'image/jpg'
  }

  function debounceSetRGBA() {
    let timeout;

    return () => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        controlInputsWraps.forEach((item, i) => {
          const inputs = item.querySelectorAll('.controls--input');
          const min = Math.round(inputs[0].value * 255);
          const max = Math.round(inputs[1].value * 255);
    
          switch (i) {
            case 0:
              rgbaControls.r[0] = min;
              rgbaControls.r[1] = max;
            case 1:
              rgbaControls.g[0] = min;
              rgbaControls.g[1] = max;
            case 2:
              rgbaControls.b[0] = min;
              rgbaControls.b[1] = max;
            case 3:
              rgbaControls.a[0] = inputs[0].value;
              rgbaControls.a[1] = inputs[1].value;
          }
        });
        
        // reset particles
        particles.length = 0;
        // reset copy data
        copyData.length = 0;
        displayImageData();
      }, 500);
    }
  }

  const setRGBA = debounceSetRGBA();

  function rgbControlChangeHandler({ fix }) {

    const item = this.closest('.controls--item');
    const maxValue = item.getAttribute('max');
    // check left of right
    const left = this.classList.contains('left');
    // const track = item.querySelector('.controls--track');
    // two inputs of value
    const inputs = item.querySelectorAll('.controls--input')
    // containers display values
    const val1 = item.querySelector('.controls--value-left');
    const val2 = item.querySelector('.controls--value-right');

    // thumbs borders
    const thumbs1 = item.querySelectorAll('.controls--thumbs span')[0];
    const thumbs2 = item.querySelectorAll('.controls--thumbs span')[1];
    const thumbs3 = item.querySelectorAll('.controls--thumbs span')[2];
    const thumbs4 = item.querySelectorAll('.controls--thumbs span')[3];
    
    const inputWidth = this.offsetWidth;
    const thumbWidth = 30;
    
    const inp1V = inputs[0].value;
    const inp2V = inputs[1].value;

    // set the same value to both inputs if difference between equals to zero
    if (inp2V - inp1V < 0) {
      inputs[0].value = this.value;
      inputs[1].value = this.value;
      val1.textContent = maxValue > 1 ? Math.ceil(this.value * maxValue) : this.value;
      val2.textContent = maxValue > 1 ? Math.ceil(this.value * maxValue) : this.value;
    } else {
      // each input goes from 0 to 1,
      // than multiply by maxValue
      if (left) {
        val1.textContent = maxValue > 1 ? Math.ceil(inp1V * maxValue) : inp1V;
      } else {
        val2.textContent = maxValue > 1 ? Math.ceil(inp2V * maxValue) : inp2V;
      }
    }

    const rv = (1 - inp2V) * inputWidth - thumbWidth * (1 - inp2V);
    const lv = inp1V * inputWidth - thumbWidth * inp1V;

    thumbs1.style.left = lv  + 'px';
    thumbs2.style.right = rv + 'px';
    thumbs3.style.left = lv  + 'px';
    thumbs4.style.right = rv + 'px';

    val2.style.right = rv - 1 + 'px';
    val1.style.left = lv - 1 + 'px';

    setRGBA();
    
    // fix bugs when thumbs overlap caused by a very rapid input value change
    if (!fix) {
      setTimeout(() => {
        rgbControlChangeHandler.call(this, { fix: true });
      }, 50);
    }
  }
  
  function animate() {

    function imageChooseAnimate() {
      const context = contextChoose;
      context.clearRect(0, 0, iCWidth, iCHeight);
  
      canvasChoose.width = iCWidth;
      canvasChoose.height = iCHeight;

      if (offsetTick >= 14) offsetTick = 0;
      offsetTick += 0.5;



      context.beginPath();
      context.rect(0, 0, iCWidth, iCHeight);
      context.lineWidth = 4;
      context.strokeStyle = grd;
      context.setLineDash([7, 7]);
      context.lineDashOffset = offsetTick;

      context.stroke();
      context.closePath();
    }
    imageChooseAnimate();


    if (!imageUrl) {
      requestAnimationFrame(animate)
      return;
    };

    if (!image) {
      image = new Image();
      image.src = imageUrl;
      image.onload = () => {
        displayImageData();
      }
    } else {

      canvas.width = image.width;
      canvas.height = image.height;
      canvasContainer.style.width = image.width + 'px';
      
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      if (!imageData) {
        canvasContainer.classList.add('set');
        context.fillStyle = 'rgba(255, 0, 0, 0)';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        imageData = context.getImageData(0, 0, image.width, image.height).data;

        context.clearRect(0, 0, canvas.width, canvas.height);

        // reset particles;
        particles.length = 0;

        context.clearRect(0, 0, canvas.width, canvas.height);

        displayImageData();

      }
      
      
      if (particles.length === 0) {
        // clear copy data
        copyData = '';

        for (let i = 0; i < imageData.length; i += 4) {
          const x = (i % (image.width * 4)) / 4;
          const y = Math.floor(i / (image.width * 4));

          const r = imageData[i];
          const g = imageData[i + 1];
          const b = imageData[i + 2];
          const a = Math.floor(((imageData[i + 3] / 255)) * 100) / 100;
          switch (dataType) {
            case 'rgb':
              particles.push(new Particle({ x, y, r, g, b }));
              break;
            case 'rgba':
              particles.push(new Particle({ x, y, r, g, b, a }));
              break;
            case 'xyrgb':
              if (a < 1) break;

              if (
                (r >= rgbaControls.r[0] && r <= rgbaControls.r[1]) &&
                (g >= rgbaControls.g[0] && g <= rgbaControls.g[1]) &&
                (b >= rgbaControls.b[0] && b <= rgbaControls.b[1])) {
                  particles.push(new Particle({ x, y, r, g, b }));
                }
              break;
            case 'xyrgba':
              if (a === 0) break;

              if (
                (r >= rgbaControls.r[0] && r <= rgbaControls.r[1]) &&
                (g >= rgbaControls.g[0] && g <= rgbaControls.g[1]) &&
                (b >= rgbaControls.b[0] && b <= rgbaControls.b[1]) &&
                (a >= rgbaControls.a[0] && a <= rgbaControls.a[1])) {
                  particles.push(new Particle({ x, y, r, g, b, a }));
                }
              break;
            case 'xy':
              if (a === 0) break;
              if (
                (r >= rgbaControls.r[0] && r <= rgbaControls.r[1]) &&
                (g >= rgbaControls.g[0] && g <= rgbaControls.g[1]) &&
                (b >= rgbaControls.b[0] && b <= rgbaControls.b[1]) &&
                (a >= rgbaControls.a[0] && a <= rgbaControls.a[1])) {
                  particles.push(new Particle({ x, y, r, g, b, a }));
                }
              break;
            default:
              break;
          }
          
          copyDataButton.disabled = false;

        }

        displayImageData();
      }

      particles.forEach(particle => {
        particle.draw();
      });

    }
    requestAnimationFrame(animate)
  }
  animate();

  function addStrToCopyData(x, y, r, g, b, a) {
    let d;
    switch (dataType) {
      case 'rgb':
        d = `[${r},${g},${b}]`;
        break;
      case 'rgba':
        d = `[${r},${g},${b},${a}]`;
        break;
      case 'xyrgb':
        d = `[${x},${y},${r},${g},${b}]`;
        break;
      case 'xyrgba':
        d = `[${x},${y},${r},${g},${b},${a}]`;
        break;
      case 'xy':
        d = `[${x},${y}]`;
        break;
    }
    if (copyData.length !== 0) {
      copyData += `,${d}`;
    } else {
      copyData += `${d}`;
    }
  }

  class Particle {
    constructor({ x, y, r, b, g, a }) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a;
      addStrToCopyData(x, y, r, g, b, a);
      
      this.color = this.a !== undefined ? `rgba(${r},${g},${b},${a})` :`rgb(${r},${g},${b})`;
    }

    draw() {
      context.beginPath();
      context.fillStyle = this.color;
      context.fillRect(this.x, this.y, 1, 1);
      context.closePath();
    }
  }
});