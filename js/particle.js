class Particle {
    constructor(x, y) {
      this.home = createVector(random(width), random(height));
      this.pos = this.home.copy();
      this.target = createVector(x, y);
      this.vel = p5.Vector.random2D();
      this.acc = createVector();
      this.r = 4;
      this.maxspeed = 10;
      this.maxforce = 1;
    }
  
    behaviors() {
      const arrive = this.arrive(this.target);
      arrive.mult(1);
      this.applyForce(arrive);
  
      const mouse = createVector(mouseX, mouseY);
      const flee = this.flee(mouse);
  
      const d = p5.Vector.dist(mouse, this.pos);
      let weight = map(d, 0, width/2, 2, 0);
      weight = constrain(weight, 0, 1);
      flee.mult(weight);
      this.applyForce(flee);
    }
  
    applyForce(f) {
      this.acc.add(f);
    }
  
    update() {
      this.pos.add(this.vel);
      this.vel.add(this.acc);
      this.acc.mult(0);
    }
  
    show() {
      stroke(255);
      strokeWeight(this.r);
      point(this.pos.x, this.pos.y);
    }
  
    arrive(target) {
      const desired = p5.Vector.sub(target, this.pos);
      const d = desired.mag();
      let speed = this.maxspeed;
      if (d < 100) {
        speed = map(d, 0, 100, 0, this.maxspeed);
      }
      desired.setMag(speed);
      const steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxforce);
      return steer;
    }
  
    flee(target) {
      const desired = p5.Vector.sub(target, this.pos);
      const d = desired.mag();
      if (d < width) {
        desired.setMag(this.maxspeed);
        desired.mult(-1);
        const steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxforce);
        return steer;
      } else {
        return createVector(0, 0);
      }
    }
  }
  