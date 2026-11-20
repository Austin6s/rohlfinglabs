# Homepage project slideshow

## Research — November 17, 2026

Reviewed the live homepages in Chromium at 1440 × 1000, in addition to reading their public page content.

- [Metalab](https://www.metalab.com/): oversized typography and a prominent interactive visual with project navigation. Takeaway: treat the work as a primary visual, rather than decorating a generic service diagram.
- [Instrument](https://www.instrument.com/): a large showreel and clearly identified recent projects. Takeaway: keep imagery prominent and project names legible.
- [AREA 17](https://area17.com/): generous spacing, a direct positioning statement, and large work imagery. Takeaway: simplify the hierarchy and give one visual room to breathe.

The resulting design is an adaptation for this small engineering practice, not a reproduction of any reference: retain the gold/turquoise branding and concise introduction, remove overlapping browser cards, and show one real project screenshot with its name, category, and short summary. All images and copy come from the existing verified portfolio. No reference site's media or code is included.

## Behavior

Four published projects rotate every 6.5 seconds with a short fade. The image and caption share one link to the matching localized portfolio entry. Previous/next buttons, four project selectors, and pause/play remain visible outside the image. The homepage loads `project-reel.js` to enable the controls and rotation.

Following the [W3C carousel pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) and [animation guidance](https://www.w3.org/WAI/tutorials/carousels/animations/):

- Keyboard focus stops rotation until the visitor explicitly restarts it. Arrow keys navigate while a slideshow button has focus. The project link retains focus when a visitor presses an arrow key on the link.
- Hover temporarily pauses rotation; explicit play is supported while interacting with the controls.
- Offscreen and background-tab timers stop. Reduced motion disables initial autoplay and the fade, and enabling reduced motion stops playback.
- Automatic changes are not announced as live updates; manual browsing uses a polite live region. Hidden slides and links are removed from navigation.
- Without JavaScript, the first project remains visible and linked; inactive slideshow controls stay hidden. The complete portfolio remains available below and on the Work page.

No runtime calls, external scripts, tracking, or new packages were added.
