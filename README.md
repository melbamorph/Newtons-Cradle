# Newtons Cradle

This project is a **Newton's Cradle** interactive simulation built with HTML5, CSS, and JavaScript (using the Matter.js physics engine). The simulation features realistic physics with nearly elastic collisions, audible *click* sounds when balls collide, and a control panel to adjust the initial conditions.

## Demo

Open the `index.html` file in a web browser to run the Newton's Cradle simulation. You can also host these files on a web server or upload them to GitHub Pages for an online demo. The project is self-contained with no external build tools required.

## Features

- **Realistic Physics:** Uses Matter.js to simulate pendulums and collisions, demonstrating conservation of momentum and energy.
- **Crisp Collision Sound:** Each time balls collide, a short *click* sound is played for a realistic effect.
- **Interactive Control Panel:** Adjust the scenario using the dropdown and control buttons:
  - Select how many balls to pull back on the left and/or right side (e.g., one ball, two balls, etc.).
  - Start the simulation with the *Play* button.
  - Reset the simulation to its resting state with the *Reset* button.
- **Mouse Interaction:** You can also drag and release individual balls with the mouse to experiment with custom motions.

## How to Run

1. **Open Locally:** Simply double-click `index.html` (or open it in your browser). Ensure all files (`index.html`, `style.css`, `script.js`) are in the same directory. No internet connection is required since the project uses local resources (the Matter.js library is loaded via CDN when online, but a local copy can be used if needed).
2. **GitHub Pages:** Upload the entire project folder to a GitHub repository and enable GitHub Pages in the repository settings. You can then access the simulation via the GitHub Pages URL.

No additional installation or build steps are necessary.

## Files

- **index.html:** Main HTML file that sets up the page structure, includes the control panel and canvas, and links the CSS/JS.
- **style.css:** Contains styling for the page layout and controls.
- **script.js:** Contains the physics simulation code and logic for the interactive controls (using Matter.js).
 - **assets/collision.wav:** Sound file played when balls collide. Place your `collision.wav` in this folder.
