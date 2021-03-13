class Particle {
  constructor({ context, x, y, xTo, yTo }) {
    this.context = context;
    this.x = x;
    this.y = y;

    gsap.to(this, {
      x: xTo,
      y: yTo,
      duration: 5,
      ease: 'power1.inOut',
      repeatDelay: 1,
      repeat: -1,
      yoyo: true,
    });
  }

  draw() {
    this.context.beginPath();
    this.context.fillStyle = 'red';
    this.context.rect(this.x, this.y, 1, 1);
    this.context.fill();
  }
}

const particles = [];

window.addEventListener('DOMContentLoaded', (event) => {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  const image = {
    width: 100,
    height: 100
  }

  function getParticles() {
    for (let i = 0; i < data.length; i++) {
      const [x, y] = data[i];
      
      const dx = image.width / 2 - x;
      const dy = image.height / 2 - y;
      const theta = Math.atan2(dy, dx);

      particles.push(
        new Particle({
          context,
          x: x - Math.cos(theta) * (500 * Math.random()),
          y: y - Math.sin(theta) * (500 * Math.random()),
          xTo: x,
          yTo: y
        })
      );
    }
  }
  getParticles();
  
  function animate() {
    requestAnimationFrame(animate);
    if (particles.length === 0) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.save();
    context.translate(
      canvas.width / 2 - image.width / 2,
      canvas.height / 2 - image.height / 2
    );

    for (let i = 0; i < particles.length; i++) {
      particles[i].draw(context);
    }
    context.restore();
  }
  animate();
});
