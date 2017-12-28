import p5 from 'p5'
import '../css/style.scss'

const sketch = p => {
  let canvas
  let logo
  let logoWidth = 250
  let logoHeight = 114
  const st_deviation = 100
  const layers = 80
  const backgrounds = [0,255]

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

  
  const createStretchedPentagon = (stretchFactor) => {
    let stretchedPentagon = [
        p.createVector(910  + p.randomGaussian(0, stretchFactor) , 320),
        p.createVector(830.9188309203678 + p.randomGaussian(0, stretchFactor), 510.9188309203678),
        p.createVector(640 + p.randomGaussian(0, stretchFactor), 590),
        p.createVector(449.0811690796322 + p.randomGaussian(0, stretchFactor), 510.91883092036784),
        p.createVector(370 + p.randomGaussian(0, stretchFactor),320.00000000000006),
        p.createVector(449.0811690796321 + p.randomGaussian(0, stretchFactor), 129.0811690796322),
        p.createVector(640 + p.randomGaussian(0, stretchFactor), 50),
        p.createVector(830.9188309203678 + p.randomGaussian(0, stretchFactor), 129.08116907963213)
    ]
    return stretchedPentagon
  }

  p.preload = () => {
    logo = p.loadImage("assets/p5js.svg")
  }

  p.setup = () => {
  }

  p.draw = () => {
    p.noStroke()
    canvas = p.createCanvas(p.windowWidth, p.windowHeight)
    p.background(backgrounds[Math.round(p.random(0,1))])
    drawCustomShape(createStretchedPentagon(200), [p.random(0,255), p.random(0,255), p.random(0,255), 10])
    drawCustomShape(createStretchedPentagon(150), [p.random(0,255), p.random(0,255), p.random(0,255), 10])
    p.frameRate(0.1)
  }

  const drawCustomShape = (shapeArchetype, color) => {
    for (let j = 0; j < layers; j += 1) {
      let shape = polygon(shapeArchetype, 1)
      p.fill(color)
      p.beginShape();
      for (let i of shape) {
        p.vertex(i.x, i.y)
      }
      p.endShape(p.CLOSE);
    }
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
