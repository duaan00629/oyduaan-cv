---
name: Editorial Light
description: Warm paper canvas, mono eyebrows, one burnt-orange accent — the daylight counterpart to an editorial dark deck.
mode: light
---

# Editorial Light

## Palette

A single warm family: the paper and the ink share the same yellow-red bias, and exactly one accent carries every highlight. There is no second colour.

| Role    | Value     | Notes                                                    |
| ------- | --------- | -------------------------------------------------------- |
| bg      | `#f7f5f0` | warm paper canvas — never pure `#ffffff`                  |
| panel   | `#efece4` | inset card / quiet block                                  |
| text    | `#14130f` | warm near-black ink (17.3:1 on bg)                        |
| accent  | `#c2410c` | burnt orange — eyebrows, years, key numbers (4.9:1 on bg) |
| muted   | `#6b6a63` | secondary copy, lead paragraphs (5.0:1 on bg)             |
| dim     | `#8d8b83` | footer meta, captions, labels (3.2:1 — large text only)   |
| rule    | `#e0dcd3` | hairline dividers                                         |

The accent is deliberately darker than a screen-orange: `#ff6a3d` reads at only 2.6:1 on paper and fails as text. Keep the hue, drop the luminance.

## Typography

- Display font: `'Segoe UI', 'Helvetica Neue', Helvetica, Arial, 'PingFang TC', 'Microsoft JhengHei', 'Noto Sans TC', sans-serif` — weight 800 for the hero, 700 for sub-headings, 600 for statement paragraphs.
- Body font: same stack, weight 400 — the CJK fallbacks are the point; a Latin-only stack breaks mixed zh/en copy.
- Mono font: `'Cascadia Mono', 'SF Mono', ui-monospace, Menlo, Consolas, monospace` — eyebrows, labels, footer, years. Always letter-spaced.
- Webfont import: none. System stacks only, so the deck renders identically offline.
- Type scale:
  - Hero title: 168 px, line-height 1, letter-spacing -0.035em.
  - Page heading: 78 px, weight 800, line-height 1.15, letter-spacing -0.02em.
  - Statement: 58 px, weight 600, line-height 1.5.
  - Body: 36 px, line-height 1.5–1.6.
  - Eyebrow: 24 px mono, letter-spacing 0.28em.
  - Caption / footer / year: 22 px mono, letter-spacing 0.1em.
- If a slide declares `export const design`, these become `var(--osd-font-display)`, `var(--osd-size-hero)`, `var(--osd-size-body)`.

## Layout

- Content padding: 120 px from every canvas edge (1920 × 1080) → 840 px of usable height.
- Alignment: left-aligned, single column, `maxWidth` 1240–1580 px on prose so lines never run the full width.
- Rhythm: eyebrow → 52–56 px → heading → 32 px → lead → flexible spacer → hairline rule → 48 px → 3-column fact grid.
- Facts grid: `repeat(3, 1fr)` with a 64 px gap; label (22 mono, dim) / value (40, 700) / note (26, muted).
- Footer sits at the end of the flex column with `marginTop: 40`. On a centred cover, push it down with a `flex: 1` spacer.
- Radius: 14 px, used sparingly — this theme is flat and rule-based, not card-based.

## Fixed components

Paste-ready. Copy them verbatim into a slide that uses this theme.

```tsx
import type { ReactNode } from 'react';
import { useSlidePageNumber } from '@open-slide/core';
```

### Title

```tsx
const Title = ({ children }: { children: ReactNode }) => (
  <h1
    style={{
      fontFamily:
        "'Segoe UI', 'Helvetica Neue', Helvetica, Arial, 'PingFang TC', 'Microsoft JhengHei', 'Noto Sans TC', sans-serif",
      fontSize: 168,
      fontWeight: 800,
      lineHeight: 1,
      letterSpacing: '-0.035em',
      margin: 0,
      color: '#14130f',
    }}
  >
    {children}
  </h1>
);
```

### Footer

Pull the page number from `useSlidePageNumber()` — never hardcode `pageNum` / `total` props. The zero-padded `NN / NN` form is part of the theme.

```tsx
const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        marginTop: 40,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        fontFamily: "'Cascadia Mono', 'SF Mono', ui-monospace, Menlo, Consolas, monospace",
        fontSize: 22,
        letterSpacing: '0.1em',
        color: '#8d8b83',
      }}
    >
      <span>STUDIO · 2026</span>
      <span>
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  );
};
```

### Eyebrow

```tsx
const Eyebrow = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      fontFamily: "'Cascadia Mono', 'SF Mono', ui-monospace, Menlo, Consolas, monospace",
      fontSize: 24,
      lineHeight: 1.4,
      letterSpacing: '0.28em',
      color: '#c2410c',
    }}
  >
    {children}
  </div>
);
```

### Rule

```tsx
const Rule = () => <div style={{ height: 1, background: '#e0dcd3', width: '100%' }} />;
```

## Motion

- Philosophy: **subtle** — one 260 ms rise, no in-page animation, nothing that draws attention to itself.
- The whole transition is declared once and applies to every page:

```tsx
export const transition: SlideTransition = {
  duration: 260,
  exit: {
    duration: 260,
    easing: 'cubic-bezier(0.4, 0, 1, 1)',
    keyframes: [{ opacity: 1 }, { opacity: 1 }],
  },
  enter: {
    duration: 260,
    easing: 'cubic-bezier(0, 0, 0.2, 1)',
    keyframes: [
      { opacity: 0, transform: 'translateY(6px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};
```

- The outgoing page holds its opacity while the incoming page rises 6 px into place. That 6 px is the entire motion budget — do not increase it.
- If a slide needs an in-page entrance, reuse the same offset:

```css
@keyframes el-fadeUp {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

## Aesthetic

Daylight editorial: a printed catalogue on warm stock rather than a screen. The page is paper (`#f7f5f0`, never white), the ink is warm near-black, and a single burnt orange does all the pointing — eyebrows, years, one number per page. Chrome is typographic, not graphic: mono eyebrows spaced wide, hairline rules instead of boxes, a zero-padded page counter in the footer. Weight carries hierarchy (800 hero → 78 px heading → 36 px body), never colour. Avoid: pure `#ffffff`, drop shadows, gradients, glow, glassmorphism, rounded cards as containers, more than one accent hue, and any dark-mode inversion of these tokens — the dark deck is a sibling, not a state.

## Example usage

```tsx
import { type Page, useSlidePageNumber } from '@open-slide/core';
import type { ReactNode } from 'react';

const Cover: Page = () => (
  <section
    style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
      background: '#f7f5f0',
      color: '#14130f',
      padding: 120,
      display: 'flex',
      flexDirection: 'column',
      letterSpacing: '-0.01em',
    }}
  >
    <div style={{ flex: 1, minHeight: 0 }} />
    <Eyebrow>PORTFOLIO · 2026</Eyebrow>
    <Title>Paper Daylight</Title>
    <p style={{ fontSize: 34, lineHeight: 1.6, color: '#6b6a63', margin: '52px 0 0', maxWidth: 1240 }}>
      暖白紙張、單一橘色重點、等寬字眉標 — 深色作品集的日光對照版。
    </p>
    <div style={{ flex: 1, minHeight: 0 }} />
    <Footer />
  </section>
);
```
