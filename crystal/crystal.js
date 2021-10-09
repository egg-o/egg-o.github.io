// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Events = Matter.Events,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World;

// create an engine
var engine = Engine.create(),
    world = engine.world;

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: 2,
        background: "#e0b1cbff",
        wireframes: false,
      }
});

// create bounds
var ground = Bodies.rectangle(
    (window.innerWidth / 2) + 160, window.innerHeight - 50, window.innerWidth + 320, 160,{render: { fillStyle: '#9f86c0ff'}, isStatic: true });
  var wallLeft = Bodies.rectangle( -80, window.innerHeight / 2, 160,   window.innerHeight, { isStatic: true });
  var wallRight = Bodies.rectangle(window.innerWidth + 80, window.innerHeight / 2, 160, 1200, { isStatic: true })
  var roof = Bodies.rectangle(
    (window.innerWidth / 2) + 160, -80, window.innerWidth + 320, 160, { isStatic: true })
  
// create two boxes and a ground
var fills = [  "#97f9f9ff", "#a4def9ff", "#c1e0f7ff", "#cfbae1ff", "#c59fc9ff" ]
var boxA = Bodies.polygon(100, 50, 7, 40, {restitution : 0.8, render: { fillStyle: "#231942ff"}});
var boxB = Bodies.polygon(200, 50, 7, 40, {restitution : 0.8, render: { fillStyle: "#72babaff"}});
var boxC = Bodies.polygon(450, 0, 5, 40, {restitution : 0.5, render: { fillStyle: "#97f9f9ff"}});

//generating bodies
var poly;
var bodies = [];
for (let i = 0; i < 6; i++) {
    poly = Bodies.polygon(300 + (10 * i), 50, 7, 40, {restitution : 0.8, render: { fillStyle: "#231942ff"}});
    bodies[i] = poly;
}
bodies = bodies.concat([boxA, boxB, boxC, ground, wallLeft, wallRight, roof]);

// add all of the bodies to the world
Composite.add(world, bodies);

// add mouse control
var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });

World.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

// Allow page scrolling in matter.js window
mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

// Detect clicks vs. drags
let click = false;

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);