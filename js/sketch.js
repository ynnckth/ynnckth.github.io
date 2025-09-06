const MIN_FONT_SIZE = 50;
const MAX_FONT_SIZE = 100;
const particles = [];
let font;

function preload() {
  font = loadFont("js/AvenirNextLTPro-Demi.otf");
}

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight/3);
  canvas.parent("p5-canvas");
  const renderedText = "Hi, I'm Yannick"

  let fontSize = windowWidth / 12;
  if (fontSize > MAX_FONT_SIZE) { 
    fontSize = MAX_FONT_SIZE;
  }
  if (fontSize < MIN_FONT_SIZE) {
    fontSize = MIN_FONT_SIZE;
  }

  const points = font.textToPoints(renderedText, 0, 0, fontSize, {
    sampleFactor: 0.5,
  });

  textFont(font);
  textSize(fontSize);
  const w = textWidth(renderedText);
  const h = textAscent() - textDescent();

  for (let i = 0; i < points.length; i++) {
    const pt = points[i];
    const offsetX = width / 2;
    const offsetY = height / 2;
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
