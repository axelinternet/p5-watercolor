import p5 from 'p5'
import '../css/style.scss'

const sketch = p => {
  let canvas
  let logo
  let logoWidth = 250
  let logoHeight = 114
  const st_deviation = 100
  const layers = 50

  let pentagon = [
      p.createVector(910, 320),
      p.createVector(830.9188309203678, 510.9188309203678),
      p.createVector(640, 590),
      p.createVector(449.0811690796322, 510.91883092036784),
      p.createVector(370 ,320.00000000000006),
      p.createVector(449.0811690796321, 129.0811690796322),
      p.createVector(640, 50),
      p.createVector(830.9188309203678, 129.08116907963213)
  ]

  p.preload = () => {
    logo = p.loadImage("assets/p5js.svg")
  }

  p.setup = () => {
    p.noStroke()
    canvas = p.createCanvas(p.windowWidth, p.windowHeight)
    p.background(255)
    for (let j = 0; j < layers; j += 1) {
      let shape = polygon(pentagon, 1)
      p.fill(255, 0,0, 10)
      p.beginShape();
      for (let i of shape) {
        p.vertex(i.x, i.y)
      }
      p.endShape(p.CLOSE);
      
    }
  }

  p.draw = () => {
    p.frameRate(0)
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight)
    p.image(logo, p.windowWidth/2 - logoWidth/2, p.windowHeight/2 - logoHeight/2)
  }


  function polygon(currentShape, dep) {
    if (dep >= 7) {
      return currentShape
    } else {
      const nextShape = []
      for (let i in currentShape) {
        nextShape.push(currentShape[i])
        let next = p.int(i) + 1
        try {
          const midVector = p.createVector( (currentShape[next].x + currentShape[i].x) / 2
            , (currentShape[next].y + currentShape[i].y) / 2)
          const dx = p.randomGaussian(0, st_deviation)
          const dy = p.randomGaussian(0, st_deviation)
          midVector.add(dx, dy)
          nextShape.push(midVector)
        } catch(e) {
          // Handle end of array
          const midVector = p.createVector( (currentShape[0].x + currentShape[i].x) / 2
            , (currentShape[0].y + currentShape[i].y) / 2)
          const dx = p.randomGaussian(0, st_deviation)
          const dy = p.randomGaussian(0, st_deviation)
          midVector.add(dx, dy)
          nextShape.push(midVector)
        }
      }
      return polygon(nextShape, dep + 1)

    }
  }

}

new p5(sketch)
