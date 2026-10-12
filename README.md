# react-ui-playground

A complete React component showcase with a responsive documentation interface, light/dark themes, typed APIs, copyable usage examples, and six independently implemented components. Built with Vite, React, strict TypeScript, Tailwind CSS, and lucide-react. No prebuilt component library.

## Setup

Requires Node.js 20.19+ or 22.12+ and npm.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite.

```sh
npm run typecheck  # Strict TypeScript check
npm run build      # Typecheck and production build in dist/
npm run preview    # Serve the production build locally
```

## Components

- **Modal** — Native modal dialog with focus containment, initial input focus, Escape/backdrop dismissal, focus restoration, and a validated project creation demo.
- **Dropdown Menu** — Outside-click dismissal, Arrow keys, Home/End, typeahead, Escape, and Tab handling. Includes local JSON export and notification actions.
- **Tabs** — ARIA tabs and panels with roving tab focus, Left/Right, Home/End, and automatic activation.
- **Accordion** — Semantic heading buttons, expanded state, associated panels, and optional multiple-panel expansion.
- **Toast** — Button-triggered queue, three visible notifications, automatic dismissal after five seconds, manual dismissal, polite announcement, and timer restart after hover/focus ends.
- **Tooltip** — Hover/focus/tap visibility, Escape dismissal, accessible trigger labels, and associated tooltip text. Demo icons explain actions; they do not perform those actions.

Each component lives in its own typed file under `src/components`. `App.tsx` supplies the documentation and demo wiring; `styles.css` contains the visual system and Tailwind integration. Theme preference is stored locally when storage is available. Clipboard failures show a manual-copy instruction; code remains selectable.

Demo state is local and resets on reload. There is no backend, publishing integration, Storybook, or test suite.

## Screenshots

<img width="1900" height="906" alt="image" src="https://github.com/user-attachments/assets/53ecb57f-d9cf-4b3a-8ec6-9a315b364ae2" />
<img width="1894" height="904" alt="image" src="https://github.com/user-attachments/assets/455ecaa8-2b35-46a8-9c2c-95b029cbd864" />


## Keyboard guide

Tab moves between controls. Enter/Space activates buttons. Escape dismisses the modal, dropdown, or focused tooltip. Modal focus stays inside the native dialog. Tabs use Left/Right; menu items use Up/Down. Both support Home/End.
