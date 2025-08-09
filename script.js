/* Newton's Cradle interactive simulation using Matter.js */
const canvasWidth = Math.min(window.innerWidth - 20, 1000);
const canvasHeight = Math.floor(window.innerHeight * 0.7);

// Matter.js module aliases
const Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Body = Matter.Body,
      Constraint = Matter.Constraint,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint,
      Events = Matter.Events;

// Create a Matter.js engine
const engine = Engine.create();
const world = engine.world;
world.gravity.y = 1;  // normal gravity

// Set up renderer
const render = Render.create({
    element: document.getElementById('scene'),
    engine: engine,
    options: {
        width: canvasWidth,
        height: canvasHeight,
        wireframes: false,
        background: '#ffffff'
    }
});
Render.run(render);

// Create runner (controls the engine step)
const runner = Matter.Runner.create();

// Cradle parameters
const ballCount = 5;
const ballRadius = 20;
const startX = canvasWidth / 2 - (ballCount - 1) * ballRadius;
const anchorY = canvasHeight * 0.2;
const ropeLength = canvasHeight * 0.5;

// Arrays for balls and ropes
const balls = [];
const ropes = [];

// Top support bar (visual only, no collisions)
const support = Bodies.rectangle(canvasWidth / 2, anchorY, (ballCount - 1) * 2 * ballRadius + 40, 10, {
    isStatic: true,
    render: { fillStyle: 'slategrey' }
});
support.collisionFilter.mask = 0;  // do not collide with balls
World.add(world, support);

// Create pendulum balls and ropes
for (let i = 0; i < ballCount; i++) {
    const anchorX = startX + i * 2 * ballRadius;
    // Ball
    const ball = Bodies.circle(anchorX, anchorY + ropeLength, ballRadius, {
        restitution: 1.0,
        frictionAir: 0.0,
        friction: 0.0,
        slop: 0.001,
        render: { fillStyle: 'darkslategrey' }
    });
    ball.label = 'ball';
    balls.push(ball);
    // Rope (constraint) from anchor point to ball
    const rope = Constraint.create({
        pointA: { x: anchorX, y: anchorY },
        bodyB: ball,
        pointB: { x: 0, y: 0 },
        length: ropeLength,
        stiffness: 0.9
    });
    ropes.push(rope);
    World.add(world, [ball, rope]);
}

// Mouse drag control for interactivity
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: { stiffness: 0.2, render: { visible: false } }
});
World.add(world, mouseConstraint);
render.mouse = mouse;

// Collision sound event
const clickSound = document.getElementById('clickSound');
Events.on(engine, 'collisionStart', function(event) {
    for (let pair of event.pairs) {
        const bodyA = pair.bodyA;
        const bodyB = pair.bodyB;
        if (bodyA.label === 'ball' && bodyB.label === 'ball') {
            if (clickSound) {
                clickSound.currentTime = 0;
                clickSound.play();  // play click sound on ball-ball collision
            }
        }
    }
});

// Helper: reset balls to vertical rest
function resetBalls() {
    Matter.Runner.stop(runner);
    for (let i = 0; i < balls.length; i++) {
        const ball = balls[i];
        const anchorX = startX + i * 2 * ballRadius;
        Body.setPosition(ball, { x: anchorX, y: anchorY + ropeLength });
        Body.setVelocity(ball, { x: 0, y: 0 });
        Body.setAngularVelocity(ball, 0);
    }
    // Advance engine one tick to settle
    Engine.update(engine, 1000 / 60);
}

// Apply initial displacement for a scenario
function setupScenario(name) {
    resetBalls();
    let liftLeft = 0, liftRight = 0;
    switch (name) {
        case '1-left': liftLeft = 1; break;
        case '2-left': liftLeft = 2; break;
        case '3-left': liftLeft = 3; break;
        case '1-right': liftRight = 1; break;
        case '2-right': liftRight = 2; break;
        case '3-right': liftRight = 3; break;
        case '1-both': liftLeft = 1; liftRight = 1; break;
        case '2-both': liftLeft = 2; liftRight = 2; break;
    }
    const angle = Math.PI / 4;  // 45 degrees
    // Lift balls on the left side
    for (let i = 0; i < liftLeft; i++) {
        const ball = balls[i];
        const ax = startX + i * 2 * ballRadius;
        const newX = ax - ropeLength * Math.sin(angle);
        const newY = anchorY + ropeLength * Math.cos(angle);
        Body.setPosition(ball, { x: newX, y: newY });
        Body.setVelocity(ball, { x: 0, y: 0 });
    }
    // Lift balls on the right side
    for (let j = 0; j < liftRight; j++) {
        const i = ballCount - 1 - j;
        const ball = balls[i];
        const ax = startX + i * 2 * ballRadius;
        const newX = ax + ropeLength * Math.sin(angle);
        const newY = anchorY + ropeLength * Math.cos(angle);
        Body.setPosition(ball, { x: newX, y: newY });
        Body.setVelocity(ball, { x: 0, y: 0 });
    }
}

// Control panel event handlers
const scenarioSelect = document.getElementById('scenarioSelect');
const playButton = document.getElementById('playBtn');
const resetButton = document.getElementById('resetBtn');
let running = false;

playButton.addEventListener('click', () => {
    if (running) return;
    const scenario = scenarioSelect.value;
    setupScenario(scenario);
    Matter.Runner.run(runner, engine);
    running = true;
});

resetButton.addEventListener('click', () => {
    running = false;
    resetBalls();
    Matter.Runner.stop(runner);
});

