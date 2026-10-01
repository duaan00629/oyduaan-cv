import {
  type DesignSystem,
  type Page,
  type SlideMeta,
  type SlideTransition,
  useSlidePageNumber,
} from '@open-slide/core';
import type { CSSProperties, ReactNode } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Design system — editorial-light (warm paper). Tweakable from the dev server's Design panel.
// ─────────────────────────────────────────────────────────────────────────────

export const design: DesignSystem = {
  palette: {
    bg: '#f7f5f0',
    text: '#14130f',
    accent: '#c2410c',
  },
  fonts: {
    display: '"Segoe UI", "Helvetica Neue", Helvetica, Arial, "PingFang TC", "Microsoft JhengHei", "Noto Sans TC", sans-serif',
    body: '"Segoe UI", "Helvetica Neue", Helvetica, Arial, "PingFang TC", "Microsoft JhengHei", "Noto Sans TC", sans-serif',
  },
  typeScale: {
    hero: 168,
    body: 36,
  },
  radius: 14,
};

// Colours outside the DesignSystem shape stay as plain consts.
const c = {
  muted: '#6b6a63',
  dim: '#8d8b83',
  rule: '#e0dcd3',
  panel: '#efece4',
};

const font = {
  display: 'var(--osd-font-display)',
  body: 'var(--osd-font-body)',
  mono: '"Cascadia Mono", "SF Mono", ui-monospace, Menlo, Consolas, monospace',
};

// ─────────────────────────────────────────────────────────────────────────────
// Motion — one DNA for the whole deck (RISE). Hold on exit, fade-and-rise on
// enter. 260 ms, 6 px. Nothing else.
// ─────────────────────────────────────────────────────────────────────────────

const EASE_OUT = 'cubic-bezier(0, 0, 0.2, 1)';
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';

export const transition: SlideTransition = {
  duration: 260,
  exit: { duration: 260, easing: EASE_IN, keyframes: [{ opacity: 1 }, { opacity: 1 }] },
  enter: {
    duration: 260,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(6px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Layout primitives
// ─────────────────────────────────────────────────────────────────────────────

const PAD = 120;

const fill: CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
  letterSpacing: '-0.01em',
  WebkitFontSmoothing: 'antialiased',
};

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        marginTop: 40,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        fontFamily: font.mono,
        fontSize: 22,
        letterSpacing: '0.1em',
        color: c.dim,
      }}
    >
      <span>DUAN OUYANG · 歐陽 端</span>
      <span>
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  );
};

const Sheet = ({ children, footer = true }: { children: ReactNode; footer?: boolean }) => (
  <section style={{ ...fill, padding: PAD, display: 'flex', flexDirection: 'column' }}>
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>{children}</div>
    {footer ? <Footer /> : null}
  </section>
);

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      fontFamily: font.mono,
      fontSize: 24,
      lineHeight: 1.4,
      letterSpacing: '0.28em',
      color: 'var(--osd-accent)',
    }}
  >
    {children}
  </div>
);

const Heading = ({ children, size = 78 }: { children: ReactNode; size?: number }) => (
  <h2
    style={{
      fontFamily: font.display,
      fontSize: size,
      fontWeight: 800,
      lineHeight: 1.15,
      letterSpacing: '-0.02em',
      margin: 0,
    }}
  >
    {children}
  </h2>
);

const Lead = ({ children }: { children: ReactNode }) => (
  <p style={{ fontSize: 30, lineHeight: 1.5, color: c.muted, margin: 0 }}>{children}</p>
);

const Rule = () => <div style={{ height: 1, background: c.rule, width: '100%' }} />;

const Spacer = () => <div style={{ flex: 1, minHeight: 0 }} />;

// ─────────────────────────────────────────────────────────────────────────────
// Page 1 — Cover
// ─────────────────────────────────────────────────────────────────────────────

const Cover: Page = () => (
  <section
    style={{ ...fill, padding: PAD, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
  >
    <div
      style={{
        fontFamily: font.mono,
        fontSize: 24,
        lineHeight: 1.4,
        letterSpacing: '0.28em',
        color: 'var(--osd-accent)',
      }}
    >
      互動裝置 · 數位藝術 · 多媒體設計
    </div>
    <h1
      style={{
        fontFamily: font.display,
        fontSize: 'var(--osd-size-hero)',
        fontWeight: 800,
        lineHeight: 1,
        letterSpacing: '-0.035em',
        margin: '52px 0 0',
      }}
    >
      DUAN OUYANG
    </h1>
    <div
      style={{
        fontFamily: font.display,
        fontSize: 86,
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: '0.18em',
        color: c.muted,
        marginTop: 10,
      }}
    >
      歐陽 端
    </div>
    <p style={{ fontSize: 34, lineHeight: 1.6, color: c.muted, margin: '52px 0 0', maxWidth: 1240 }}>
      探索科技如何為人的感知、學習與文化體驗帶來新的可能。
    </p>
    <div
      style={{
        position: 'absolute',
        left: PAD,
        right: PAD,
        bottom: PAD,
        display: 'flex',
        justifyContent: 'space-between',
        fontFamily: font.mono,
        fontSize: 24,
        lineHeight: 1.4,
        color: c.dim,
      }}
    >
      <span>1993 年生於中國 · 現居深圳</span>
      <span>oyduaan.com</span>
    </div>
  </section>
);

// ─────────────────────────────────────────────────────────────────────────────
// Page 2 — 簡介
// ─────────────────────────────────────────────────────────────────────────────

const Fact = ({ label, value, note }: { label: string; value: string; note: string }) => (
  <div>
    <div style={{ fontFamily: font.mono, fontSize: 22, lineHeight: 1.4, letterSpacing: '0.2em', color: c.dim }}>
      {label}
    </div>
    <div style={{ fontSize: 40, fontWeight: 700, lineHeight: 1.25, marginTop: 18 }}>{value}</div>
    <div style={{ fontSize: 26, lineHeight: 1.5, color: c.muted, marginTop: 12 }}>{note}</div>
  </div>
);

const Statement: Page = () => (
  <Sheet>
    <Eyebrow>01 — 簡介</Eyebrow>
    <div
      style={{
        fontFamily: font.display,
        fontSize: 58,
        fontWeight: 600,
        lineHeight: 1.5,
        marginTop: 56,
        maxWidth: 1580,
      }}
    >
      數位藝術家與多媒體設計師，現居深圳。
      <br />
      創作橫跨互動裝置、VR 與 XR，以及 AI 生成藝術，
      <br />
      持續探索科技、文化與人之經驗的交會。
    </div>
    <Spacer />
    <Rule />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 64, marginTop: 48 }}>
      <Fact label="研究所" value="香港理工大學" note="創新多媒體娛樂理學碩士，2025" />
      <Fact label="創作基地" value="深圳 · 香港" note="公共藝術、機構委託與獨立創作" />
      <Fact label="近年展出" value="香港 · 倫敦 · 利雅得 · 上海" note="2021 — 2025" />
    </div>
  </Sheet>
);

// ─────────────────────────────────────────────────────────────────────────────
// Page 3 — 創作軌跡
// ─────────────────────────────────────────────────────────────────────────────

const Era = ({ years, title, note }: { years: string; title: string; note: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <div
      style={{
        fontFamily: font.mono,
        fontSize: 26,
        height: 26,
        lineHeight: 1,
        letterSpacing: '0.06em',
        color: 'var(--osd-accent)',
      }}
    >
      {years}
    </div>
    <div style={{ position: 'relative', height: 1, background: c.rule, margin: '30px 0 34px' }}>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: -5,
          width: 11,
          height: 11,
          borderRadius: 999,
          background: 'var(--osd-accent)',
        }}
      />
    </div>
    <div style={{ fontSize: 38, fontWeight: 700, lineHeight: 1.3 }}>{title}</div>
    <div style={{ fontSize: 26, lineHeight: 1.55, whiteSpace: 'pre-wrap', color: c.muted, marginTop: 14 }}>{note}</div>
  </div>
);

const Arc: Page = () => (
  <Sheet>
    <Eyebrow>02 — 創作軌跡</Eyebrow>
    <Heading>從手繪走向空間</Heading>
    <div style={{ marginTop: 36 }}>
      <Lead>十年之間，創作從紙上的插畫，走向程式生成、公共空間與延展實境。</Lead>
    </div>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: 40,
        marginTop: 84,
      }}
    >
      <Era years="2013–2015" title="學院訓練" note={'廣州美術學院\n照明藝術設計工作室'} />
      <Era years="2016–2018" title="暗色插畫" note="自由插畫創作，環繞人體與原始情感" />
      <Era years="2019–2021" title="參數化生成" note="V Studio，沉浸式裝置與程式生成藝術" />
      <Era years="2022–2023" title="公共與機構" note="機場導引系統、美術館互動裝置" />
      <Era years="2024–2025" title="XR 與 AI" note="理大—NVIDIA 認知訓練研究、元宇宙競賽" />
    </div>
  </Sheet>
);

// ─────────────────────────────────────────────────────────────────────────────
// Page 4 — 學歷
// ─────────────────────────────────────────────────────────────────────────────

const Degree = ({
  years,
  degree,
  school,
  place,
}: {
  years: string;
  degree: string;
  school: string;
  place: string;
}) => (
  <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 48, alignItems: 'start' }}>
    <div
      style={{
        fontFamily: font.mono,
        fontSize: 28,
        lineHeight: 1.4,
        color: 'var(--osd-accent)',
        paddingTop: 14,
      }}
    >
      {years}
    </div>
    <div>
      <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.25, letterSpacing: '-0.02em' }}>{degree}</div>
      <div style={{ fontSize: 30, lineHeight: 1.5, color: c.muted, marginTop: 18 }}>{school}</div>
      <div style={{ fontSize: 26, lineHeight: 1.5, color: c.dim, marginTop: 8 }}>{place}</div>
    </div>
  </div>
);

const Education: Page = () => (
  <Sheet>
    <Eyebrow>03 — 學歷</Eyebrow>
    <Heading>學院與訓練</Heading>
    <div style={{ marginTop: 64 }}>
      <Degree
        years="2024–2025"
        degree="創新多媒體娛樂理學碩士"
        school="香港理工大學設計學院"
        place="香港"
      />
    </div>
    <div style={{ margin: '48px 0' }}>
      <Rule />
    </div>
    <Degree
      years="2011–2015"
      degree="藝術設計學士"
      school="廣州美術學院創新學院 · 燈光藝術設計工作室"
      place="中國廣州"
    />
  </Sheet>
);

// ─────────────────────────────────────────────────────────────────────────────
// Page 5 — 專業經歷
// ─────────────────────────────────────────────────────────────────────────────

const Tag = ({ label, value }: { label: string; value: string }) => (
  <div style={{ display: 'flex', gap: 20, alignItems: 'baseline' }}>
    <span
      style={{
        fontFamily: font.mono,
        fontSize: 22,
        lineHeight: 1.5,
        letterSpacing: '0.14em',
        color: c.dim,
        minWidth: 150,
      }}
    >
      {label}
    </span>
    <span style={{ fontSize: 26, lineHeight: 1.5, color: c.muted }}>{value}</span>
  </div>
);

const Experience: Page = () => (
  <Sheet>
    <Eyebrow>04 — 專業經歷</Eyebrow>
    <Heading>工作室與研究</Heading>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '280px 1fr',
        gap: 48,
        alignItems: 'start',
        marginTop: 64,
      }}
    >
      <div
        style={{
          fontFamily: font.mono,
          fontSize: 26,
          lineHeight: 1.4,
          color: 'var(--osd-accent)',
          paddingTop: 12,
        }}
      >
        2019–2021
      </div>
      <div>
        <div style={{ fontSize: 46, fontWeight: 700, lineHeight: 1.25, letterSpacing: '-0.02em' }}>
          V Studio 設計師
        </div>
        <div style={{ fontSize: 30, lineHeight: 1.5, color: c.muted, marginTop: 14 }}>
          沉浸式裝置之參數化設計與程式生成藝術
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 26 }}>
          <Tag label="合作藝術家" value="Cyril Lancelin · Julius Horsthuis" />
          <Tag label="合作專案" value="《三體》· teamLab" />
        </div>
      </div>
    </div>
    <div style={{ margin: '44px 0' }}>
      <Rule />
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 48, alignItems: 'start' }}>
      <div style={{ fontFamily: font.mono, fontSize: 26, lineHeight: 1.4, color: 'var(--osd-accent)' }}>
        2016–2018
      </div>
      <div>
        <div style={{ fontSize: 40, fontWeight: 700, lineHeight: 1.25 }}>自由插畫師</div>
        <div style={{ fontSize: 28, lineHeight: 1.5, color: c.muted, marginTop: 12 }}>
          獨立插畫創作與合作委託，環繞人體、抽象形體與原始情感的暗色風格
        </div>
      </div>
    </div>
    <Spacer />
    <Rule />
    <div style={{ fontSize: 28, lineHeight: 1.5, color: c.dim, marginTop: 32 }}>
      2025 年於香港理工大學—NVIDIA 聯合研究中心擔任 STEM 實習生，投入 VR 認知訓練計畫。
    </div>
  </Sheet>
);

// ─────────────────────────────────────────────────────────────────────────────
// Page 6 — 研究 · 獎項 · 駐地
// ─────────────────────────────────────────────────────────────────────────────

const Entry = ({ year, title, note }: { year: string; title: string; note: string }) => (
  <div>
    <div style={{ fontFamily: font.mono, fontSize: 24, lineHeight: 1.4, color: 'var(--osd-accent)' }}>{year}</div>
    <div style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.3, marginTop: 16 }}>{title}</div>
    <div style={{ fontSize: 26, lineHeight: 1.5, color: c.muted, marginTop: 14 }}>{note}</div>
  </div>
);

const Recognition: Page = () => (
  <Sheet>
    <Eyebrow>05 — 研究 · 獎項 · 駐地</Eyebrow>
    <Heading size={72}>研究、獎項與駐地</Heading>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        columnGap: 80,
        rowGap: 56,
        marginTop: 64,
      }}
    >
      <Entry
        year="2025"
        title="VR 認知訓練計畫"
        note="香港理工大學—NVIDIA 聯合研究中心 · STEM 實習生 · 實驗研究"
      />
      <Entry
        year="2025"
        title="元宇宙競賽 2024/25 亞軍"
        note="香港理工大學包玉剛圖書館 i-Space，香港"
      />
      <Entry
        year="2024"
        title="Masaha 藝術駐村 · 第七期"
        note="Misk 藝術學院 · Prince Faisal bin Fahd 藝術中心，利雅得"
      />
      <Entry
        year="2025"
        title="《The AI-Powered Legacy》"
        note="參與 · 48 小時 AI 電影競賽 · 香港理工大學，香港"
      />
    </div>
  </Sheet>
);

// ─────────────────────────────────────────────────────────────────────────────
// Page 7 — 精選計畫
// ─────────────────────────────────────────────────────────────────────────────

const Project = ({
  year,
  title,
  medium,
  place,
}: {
  year: string;
  title: string;
  medium: string;
  place: string;
}) => (
  <div
    style={{
      background: c.panel,
      border: `1px solid ${c.rule}`,
      borderRadius: 'var(--osd-radius)',
      padding: 40,
      minHeight: 360,
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <div style={{ fontFamily: font.mono, fontSize: 24, lineHeight: 1.4, color: 'var(--osd-accent)' }}>{year}</div>
    <div style={{ fontSize: 44, fontWeight: 700, lineHeight: 1.3, marginTop: 26, letterSpacing: '-0.02em' }}>
      {title}
    </div>
    <div style={{ fontSize: 28, lineHeight: 1.5, color: c.muted, marginTop: 18 }}>{medium}</div>
    <div style={{ fontSize: 24, lineHeight: 1.5, color: c.dim, marginTop: 'auto', paddingTop: 28 }}>{place}</div>
  </div>
);

const Projects: Page = () => (
  <Sheet>
    <Eyebrow>06 — 精選計畫</Eyebrow>
    <Heading>公共與機構委託</Heading>
    <div style={{ marginTop: 36 }}>
      <Lead>從國家級場館的互動裝置，到機場航站樓的商業導引系統。</Lead>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40, marginTop: 64 }}>
      <Project
        year="2021"
        title="《Tree of Life》生命之樹"
        medium="互動裝置"
        place="中國科學技術館，北京"
      />
      <Project
        year="2022"
        title="深圳機場航站樓商業導引系統"
        medium="公共藝術裝置"
        place="中國深圳"
      />
      <Project
        year="2025"
        title="VR 認知訓練計畫"
        medium="實驗研究 · VR"
        place="香港理工大學—NVIDIA 聯合研究中心"
      />
    </div>
  </Sheet>
);

// ─────────────────────────────────────────────────────────────────────────────
// Page 8 — 展覽選粹
// ─────────────────────────────────────────────────────────────────────────────

const Show = ({ year, title, venue }: { year: string; title: string; venue: string }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '96px 1fr', gap: 24, alignItems: 'baseline' }}>
    <div style={{ fontFamily: font.mono, fontSize: 24, lineHeight: 1.5, color: 'var(--osd-accent)' }}>{year}</div>
    <div>
      <div style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.35 }}>{title}</div>
      <div style={{ fontSize: 24, lineHeight: 1.5, color: c.muted, marginTop: 8 }}>{venue}</div>
    </div>
  </div>
);

const Exhibitions: Page = () => (
  <Sheet>
    <Eyebrow>07 — 展覽選粹</Eyebrow>
    <Heading>展出經歷</Heading>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        columnGap: 80,
        rowGap: 40,
        marginTop: 64,
      }}
    >
      <Show year="2025" title="PolyVerse — 文化與藝術科技展" venue="香港理工大學，香港" />
      <Show year="2024" title="Masaha 駐村成果展" venue="Prince Faisal bin Fahd 藝術中心，利雅得" />
      <Show year="2023" title="《FUTURE CAVE》聯展" venue="Metre Squared 藝術中心，英國倫敦" />
      <Show year="2022" title="《Beyond Gravity》沉浸式科幻體驗" venue="AI PLAZA，中國上海徐匯" />
      <Show year="2021" title="Glow Shenzhen 燈光節" venue="中國深圳 · 以 V Studio 成員身分" />
      <Show year="2017" title="Singularity Plan 奇點計畫" venue="1200bookshop 西倉店，中國廣州" />
      <Show year="2015" title="《Cantonese Breakfast》廣式早餐" venue="廣東省大學生工業設計大賽獲獎作品展" />
      <Show year="2013" title="《Run, Write, Shake!》" venue="廣州 Live 4 國際行為藝術節" />
    </div>
  </Sheet>
);

// ─────────────────────────────────────────────────────────────────────────────
// Page 9 — 創作媒材
// ─────────────────────────────────────────────────────────────────────────────

const Medium = ({ name, count, example }: { name: string; count: string; example: string }) => (
  <div style={{ borderTop: '2px solid var(--osd-accent)', paddingTop: 22 }}>
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
      <div style={{ fontSize: 34, fontWeight: 700, lineHeight: 1.3 }}>{name}</div>
      <div style={{ fontFamily: font.mono, fontSize: 22, lineHeight: 1.4, color: c.dim }}>{count}</div>
    </div>
    <div style={{ fontSize: 22, lineHeight: 1.5, color: c.muted, marginTop: 14 }}>{example}</div>
  </div>
);

const Media: Page = () => (
  <Sheet>
    <Eyebrow>08 — 創作媒材</Eyebrow>
    <Heading>十種媒材，一個問題</Heading>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', columnGap: 32, rowGap: 56, marginTop: 72 }}>
      <Medium name="裝置" count="05" example="Gate of Colors 色彩之門" />
      <Medium name="影像" count="05" example="Chakra 035 脈輪 035" />
      <Medium name="平面" count="04" example="Dismantle the Sun 解構太陽" />
      <Medium name="數位地景" count="03" example="Cheung Chau Fantasia 長洲幻境" />
      <Medium name="公共藝術" count="02" example="A day in Longgang 龍崗一日" />
      <Medium name="繪畫" count="02" example="Portrait Study 肖像習作" />
      <Medium name="行為" count="01" example="Run, Write, Shake" />
      <Medium name="工作坊" count="01" example="Art of Decryption 解密之術" />
      <Medium name="數位雕塑" count="01" example="Authentic Yunnan Tile Cat 雲南瓦貓" />
      <Medium name="獨立刊物" count="01" example="醒就搞哩D #02" />
    </div>
  </Sheet>
);

// ─────────────────────────────────────────────────────────────────────────────
// Page 10 — 精選作品
// ─────────────────────────────────────────────────────────────────────────────

const Work = ({ title, meta }: { title: string; meta: string }) => (
  <div
    style={{
      background: c.panel,
      borderRadius: 'var(--osd-radius)',
      padding: 36,
      minHeight: 210,
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <div style={{ fontSize: 34, fontWeight: 700, lineHeight: 1.35, letterSpacing: '-0.02em' }}>{title}</div>
    <div style={{ fontSize: 23, lineHeight: 1.5, color: c.muted, marginTop: 'auto', paddingTop: 22 }}>{meta}</div>
  </div>
);

const Works: Page = () => (
  <Sheet>
    <Eyebrow>09 — 精選作品</Eyebrow>
    <Heading>作品選</Heading>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, marginTop: 64 }}>
      <Work title="Gate of Colors 色彩之門" meta="裝置 · 互動影像內容" />
      <Work title="curr3nt 3nt3r1ng th3 5ea" meta="裝置 · 聲音 · AR" />
      <Work title="A day in Longgang 龍崗一日" meta="建築立面燈光秀 · 公共藝術" />
      <Work title="Being a poet soundlessly 無聲地做一個詩人" meta="雷射秀 · 公共藝術" />
      <Work title="Extra-restrial 域外" meta="數位雕塑 · 圖像" />
      <Work title="Authentic Yunnan Tile Cat 雲南瓦貓" meta="數位雕塑 · 圖像 · 民俗" />
    </div>
  </Sheet>
);

// ─────────────────────────────────────────────────────────────────────────────
// Page 11 — 聯絡
// ─────────────────────────────────────────────────────────────────────────────

const Channel = ({ label, value }: { label: string; value: string }) => (
  <div>
    <div style={{ fontFamily: font.mono, fontSize: 22, lineHeight: 1.4, letterSpacing: '0.18em', color: c.dim }}>
      {label}
    </div>
    <div style={{ fontSize: 30, lineHeight: 1.5, marginTop: 12 }}>{value}</div>
  </div>
);

const Contact: Page = () => (
  <Sheet>
    <Eyebrow>10 — 聯絡</Eyebrow>
    <Heading>合作與委託</Heading>
    <div style={{ marginTop: 36 }}>
      <Lead>歡迎展覽、公共藝術、研究合作與教學邀約。</Lead>
    </div>
    <Spacer />
    <Rule />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, marginTop: 52 }}>
      <div>
        <div style={{ fontFamily: font.mono, fontSize: 22, lineHeight: 1.4, letterSpacing: '0.18em', color: c.dim }}>
          EMAIL
        </div>
        <div style={{ fontSize: 58, fontWeight: 700, lineHeight: 1.25, marginTop: 16, letterSpacing: '-0.02em' }}>
          duanerdoris@gmail.com
        </div>
      </div>
      <div>
        <div style={{ fontFamily: font.mono, fontSize: 22, lineHeight: 1.4, letterSpacing: '0.18em', color: c.dim }}>
          WEBSITE
        </div>
        <div
          style={{
            fontSize: 58,
            fontWeight: 700,
            lineHeight: 1.25,
            marginTop: 16,
            letterSpacing: '-0.02em',
            color: 'var(--osd-accent)',
          }}
        >
          oyduaan.com
        </div>
      </div>
    </div>
    <div style={{ margin: '56px 0 40px' }}>
      <Rule />
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40 }}>
      <Channel label="INSTAGRAM" value="instagram.com/doris_awy" />
      <Channel label="VIMEO" value="vimeo.com/oyduaan" />
      <Channel label="LINKEDIN" value="linkedin.com/in/oyduaan" />
      <Channel label="YOUTUBE" value="youtube.com/channel/UCTKmByxo" />
    </div>
  </Sheet>
);

// ─────────────────────────────────────────────────────────────────────────────

export const meta: SlideMeta = {
  title: '歐陽 端 · 創作作品集',
  theme: 'editorial-light',
  createdAt: '2026-10-01T15:36:20.117Z',
};

export default [
  Cover,
  Statement,
  Arc,
  Education,
  Experience,
  Recognition,
  Projects,
  Exhibitions,
  Media,
  Works,
  Contact,
] satisfies Page[];
