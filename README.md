# AZ-900 Smart Quiz Builder (unofficial)

Unofficial practice tool. Not affiliated with or endorsed by Microsoft.
All questions and explanations are original practice material.

## Run it
Open `index.html` in any browser. No install or build step.

## Files
- `index.html` : page structure
- `style.css`  : styling (light and dark mode)
- `app.js`     : quiz logic and the question bank (`TOPICS` array)

## Add questions
In `app.js`, add to a topic's `qs` array:
`["Question?", ["Right answer","Wrong 1","Wrong 2","Wrong 3"], 0, "Explanation"]`
The number is the index of the correct option.

## Note on AI explain buttons
The "Explain with an analogy / beginner / memory trick" buttons use Claude's
in-page capability, which only exists when the page is hosted as a Claude
artifact. When opened locally the buttons stay hidden and everything else works.

#live link: https://sithandekile.github.io/az-900/
