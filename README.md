# Newton's Cradle

An interactive **Newton's Cradle** simulation originally coded with the assistance of OpenAI GPT-5, implemented in HTML, CSS, and JavaScript. This browser-based version captures the feel of the classic desk toy with realistic physics and  sound effects, though not fully realistic, still providing audible feedback.

## Features

* Realistic momentum and energy transfer between balls.
* Start, stop, resume, reset, adjust gravity, damping, and restitution.
* Mute/unmute and volume adjustment.
* Runs in any modern browser without extra dependencies.

## Controls

* **Start** – Click any ball to begin motion. You can also move your mouse over the strings while they're in motion to alter the swing.
* **Stop** – Halts all movement immediately.
* **Resume** – Continues motion from its paused state without resetting positions.
* **Reset** – Returns all balls to their resting position.
* **Gravity/Damping/Restitution** – Sliders to fine-tune physics settings.
* **Normalize** – Restores ball motion to match the exact pattern from the original reference clip used in development, including its timing, swing rhythm, and energy transfer.
* **Mute/Volume** – Adjust or disable sound playback.

## How to Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/melbamorph/Newtons-Cradle.git
   ```
2. Open `newtons_cradle_v_8.html` in your browser.

## Live Demo

Experience the simulation here:
[https://melbamorph.github.io/Newtons-Cradle/](https://melbamorph.github.io/Newtons-Cradle/)

## Notes

* Clicking or hovering affects motion in real time.
* **Normalize** is especially useful if the cradle’s motion becomes irregular and you want to restore the original smooth, realistic pattern.
* The sound is tuned to be low, deep, and soothing for a true desk-toy feel.
