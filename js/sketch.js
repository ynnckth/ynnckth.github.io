let font;
let particles = [];

function preload() {
  font = loadFont("js/AvenirNextLTPro-Demi.otf");
}

function setup() {
  const canvas = createCanvas(windowWidth, 400);
  canvas.parent("p5-canvas");
  const renderedText = "Hi, I'm Yannick"

  const points = font.textToPoints(renderedText, 0, 0, 100, {
    sampleFactor: 0.3,
  });

  textFont(font);
  textSize(100);
  const w = textWidth(renderedText);
  const h = textAscent() - textDescent();

  for (let i = 0; i < points.length; i++) {
    const pt = points[i];
    const offsetX = width / 2;
    const offsetY = height / 2 - h / 2;
    const particle = new Particle(pt.x + offsetX - w / 2, pt.y + offsetY + h / 2);
    particles.push(particle);
  }
}

function draw() {
  background("#151B23");
  for (let i = 0; i < particles.length; i++) {
    let particle = particles[i];
    particle.behaviors();
    particle.update();
    particle.show();
  }
}
