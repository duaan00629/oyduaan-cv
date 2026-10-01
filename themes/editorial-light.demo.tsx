import { type DesignSystem, type Page, useSlidePageNumber } from '@open-slide/core';
import type { CSSProperties, ReactNode } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// editorial-light — self-contained demo. Mirrors themes/editorial-light.md.
// Preview-only: this file is not a slide and never appears in the slides list.
// ─────────────────────────────────────────────────────────────────────────────

const DISPLAY =
  "'Segoe UI', 'Helvetica Neue', Helvetica, Arial, 'PingFang TC', 'Microsoft JhengHei', 'Noto Sans TC', sans-serif";
const MONO = "'Cascadia Mono', 'SF Mono', ui-monospace, Menlo, Consolas, monospace";

const c = {
  bg: '#f7f5f0',
  panel: '#efece4',
  text: '#14130f',
  accent: '#c2410c',
  muted: '#6b6a63',
  dim: '#8d8b83',
  rule: '#e0dcd3',
};

export const design: DesignSystem = {
  palette: { bg: c.bg, text: c.text, accent: c.accent },
  fonts: { display: DISPLAY, body: DISPLAY },
  typeScale: { hero: 168, body: 36 },
  radius: 14,
};

const fill: CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  background: c.bg,
  color: c.text,
  fontFamily: DISPLAY,
  letterSpacing: '-0.01em',
  WebkitFontSmoothing: 'antialiased',
};

// ── Fixed components — verbatim from themes/editorial-light.md ───────────────

const Title = ({ children }: { children: ReactNode }) => (
  <h1
    style={{
      fontFamily: DISPLAY,
      fontSize: 168,
      fontWeight: 800,
      lineHeight: 1,
      letterSpacing: '-0.035em',
      margin: 0,
      color: c.text,
    }}
  >
    {children}
  </h1>
);

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        marginTop: 40,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        fontFamily: MONO,
        fontSize: 22,
        letterSpacing: '0.1em',
        color: c.dim,
      }}
    >
      <span>STUDIO · 2026</span>
      <span>
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  );
};

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      fontFamily: MONO,
      fontSize: 24,
      lineHeight: 1.4,
      letterSpacing: '0.28em',
      color: c.accent,
    }}
  >
    {children}
  </div>
);

const Rule = () => <div style={{ height: 1, background: c.rule, width: '100%' }} />;

const Spacer = () => <div style={{ flex: 1, minHeight: 0 }} />;

const Sheet = ({ children }: { children: ReactNode }) => (
  <section style={{ ...fill, padding: 120, display: 'flex', flexDirection: 'column' }}>
    {children}
  </section>
);

// ── Page 1 — Cover ───────────────────────────────────────────────────────────

const Cover: Page = () => (
  <Sheet>
    <Spacer />
    <Eyebrow>PORTFOLIO · 2026</Eyebrow>
    <Title>Paper Daylight</Title>
    <p style={{ fontSize: 34, lineHeight: 1.6, color: c.muted, margin: '52px 0 0', maxWidth: 1240 }}>
      暖白紙張、單一橘色重點、等寬字眉標 — 深色作品集的日光對照版。
    </p>
    <Spacer />
    <Footer />
  </Sheet>
);

// ── Page 2 — Content ─────────────────────────────────────────────────────────

const Fact = ({ label, value, note }: { label: string; value: string; note: string }) => (
  <div>
    <div style={{ fontFamily: MONO, fontSize: 22, lineHeight: 1.4, letterSpacing: '0.2em', color: c.dim }}>
      {label}
    </div>
    <div style={{ fontSize: 40, fontWeight: 700, lineHeight: 1.25, marginTop: 18 }}>{value}</div>
    <div style={{ fontSize: 26, lineHeight: 1.5, color: c.muted, marginTop: 12 }}>{note}</div>
  </div>
);

const Content: Page = () => (
  <Sheet>
    <Eyebrow>01 — 版面</Eyebrow>
    <h2
      style={{
        fontFamily: DISPLAY,
        fontSize: 78,
        fontWeight: 800,
        lineHeight: 1.15,
        letterSpacing: '-0.02em',
        margin: '56px 0 0',
      }}
    >
      暖白紙張上的編輯節奏
    </h2>
    <p style={{ fontSize: 30, lineHeight: 1.5, color: c.muted, margin: '32px 0 0', maxWidth: 1400 }}>
      階層由字重決定，顏色只負責指路：橘色只用於眉標、年份與每頁一個關鍵數字。
    </p>
    <Spacer />
    <Rule />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 64, marginTop: 48 }}>
      <Fact label="底色" value="#f7f5f0" note="暖白紙張，不用純白" />
      <Fact label="重點色" value="#c2410c" note="單一橘色，4.9:1 對比" />
      <Fact label="節奏" value="120 px" note="四邊留白，840 px 可用高度" />
    </div>
    <Footer />
  </Sheet>
);

// ── Page 3 — Closer ──────────────────────────────────────────────────────────

const Closer: Page = () => (
  <Sheet>
    <Spacer />
    <Eyebrow>02 — 結語</Eyebrow>
    <div
      style={{
        fontFamily: DISPLAY,
        fontSize: 58,
        fontWeight: 600,
        lineHeight: 1.5,
        marginTop: 56,
        maxWidth: 1580,
      }}
    >
      淺色不是把深色反轉，
      <br />
      而是同一套編輯邏輯換到日光下閱讀。
    </div>
    <div
      style={{
        display: 'flex',
        gap: 12,
        marginTop: 48,
        fontFamily: MONO,
        fontSize: 24,
        lineHeight: 1.4,
        letterSpacing: '0.1em',
        color: c.muted,
      }}
    >
      <span style={{ color: c.accent }}>→</span>
      <span>editorial-light</span>
    </div>
    <Spacer />
    <Footer />
  </Sheet>
);

export default [Cover, Content, Closer];
