Lottie Demo
===========

A minimal frontend repo demonstrating how to embed Lottie animations with `lottie-web`.

How to use
----------

1. Pick a free animation on LottieFiles: https://lottiefiles.com/featured-free-animations?type=free
2. Open the animation page, click **Share** → **JSON** or open the Raw JSON link and copy its URL.
3. Edit `main.js` and set `ANIMATION_URL` to that raw JSON URL.
4. Open `index.html` in your browser (double-click or serve with a static server).

Alternative: place a JSON file at `animations/animation.json` and change `main.js` to use `path: 'animations/animation.json'`.

Notes
-----
- Verify the specific asset license on LottieFiles before commercial use.
- This demo uses the `unpkg` CDN for `lottie-web` to avoid npm setup.

Want a React version or repo initialized with Git? Reply "react" or "git" and I’ll add it.
