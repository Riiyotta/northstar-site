/** @type {import('tailwindcss').Config} */
// Design tokens from CLONE_SPEC.md section 0. Semantic colours resolve through
// CSS custom properties (src/index.css) so `.ctx-dark` flips them per section.

// Letter-spacing compensation for Hanken Grotesk vs the original font (spec 0.5).
const ls = (token) => (token ? `calc(${token} + var(--ls-comp))` : 'var(--ls-comp)')

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    // 0.1 Breakpoints (min-width). The site has no "md" tier.
    screens: {
      sm: '640.02px',
      lg: '1080.02px',
      xl: '1280.02px',
      '2xl': '1440.02px',
    },
    // 0.4 Colours (raw palette + semantic context tokens)
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      neutral: {
        0: '#fcfaf7',
        5: '#f7f5f2',
        10: '#f2f0eb',
        20: '#dedbd5',
        30: '#bfbcb6',
        40: '#8d8a86',
        60: '#73716d',
        80: '#474543',
        90: '#292827',
        95: '#1f1e1d',
        100: '#141413',
      },
      purple: {
        0: '#f7f5ff',
        10: '#e8e0ff',
        20: '#d4c7ff',
        30: '#bea1f5',
        40: '#9e7be0',
        50: '#8861ca',
        60: '#714cb6',
        80: '#533192',
        90: '#3f256f',
        100: '#281647',
      },
      green: { 0: '#f4fdfa', 90: '#0c4243', 100: '#17261f' },
      mulberry: { 100: '#421d24', black: '#241013' },
      focus: '#005fcc',
      // plans.md "New tokens"
      blue: { 90: '#0a476d' },
      // mail.md 0.3 text-highlight (sky-60 light / sky-40 dark)
      sky: { 40: '#62abff', 60: '#3b96ff' },
      highlight: 'var(--highlight)',
      black: '#000000', // UA default button colour (accordion caret)
      'line-base': '#8d8a86', // border-base (neutral-40)
      'icon-product': '#421d24', // mulberry-100
      'icon-soft': 'rgba(41, 40, 39, 0.5)',
      'accent-subdued': '#f7f5ff', // bg-accent-subdued (purple-0)
      // semantic (light/dark via CSS vars)
      fg: 'var(--fg)',
      'fg-sub': 'var(--fg-sub)',
      'fg-soft': 'var(--fg-soft)',
      'line-sub': 'var(--line-sub)',
      'line-soft': 'var(--line-soft)',
      'hover-tint': 'var(--hover-tint)',
      action: 'var(--action)',
      'action-hover': 'var(--action-hover)',
      'action-active': 'var(--action-active)',
      'action-secondary': 'var(--action-secondary)',
      'action-secondary-hover': 'var(--action-secondary-hover)',
      'on-action': 'var(--on-action)',
    },
    fontFamily: {
      sans: [
        '"Hanken Grotesk"',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        'Oxygen',
        'Ubuntu',
        'Cantarell',
        '"Fira Sans"',
        '"Droid Sans"',
        '"Helvetica Neue"',
        'sans-serif',
      ],
      // plans.md: "Super Serif VF" substitute (testimonial quotes / roles)
      serif: ['"Source Serif 4"', 'Georgia', 'Times', 'serif'],
      // go.md 0.1: "Super Sans Mono VF" substitute (chapter eyebrows)
      mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
    },
    fontWeight: {
      regular: '460',
      medium: '540',
      semibold: '600',
      bold: '700',
    },
    // 0.5 Type roles
    fontSize: {
      // plans.md / enterprise.md new type roles
      'display-sm': ['clamp(36px, 16px + 3.125vw, 61px)', { lineHeight: '1.1', letterSpacing: ls('-0.0275em'), fontWeight: '460' }],
      'heading-sm': ['clamp(24px, 18.4px + 0.875vw, 31px)', { lineHeight: '1.2', letterSpacing: ls('-0.0275em'), fontWeight: '460' }],
      'heading-lg': ['clamp(32px, 18.4px + 2.125vw, 49px)', { lineHeight: '1.2', letterSpacing: ls('-0.0275em'), fontWeight: '460' }],
      'heading-md': ['clamp(28px, 19.2px + 1.375vw, 39px)', { lineHeight: '1.2', letterSpacing: ls('-0.0275em'), fontWeight: '460' }],
      'heading-xs': ['clamp(20px, 16px + 0.625vw, 25px)', { lineHeight: '1.2', letterSpacing: ls('-0.0275em'), fontWeight: '460' }],
      large: ['clamp(18px, 16.4px + 0.25vw, 20px)', { lineHeight: '1.5', letterSpacing: ls('-0.0075em'), fontWeight: '540' }],
      medium: ['18px', { lineHeight: '1.5', letterSpacing: ls('-0.0075em'), fontWeight: '540' }],
      small: ['16px', { lineHeight: '1.5', letterSpacing: ls('-0.0075em'), fontWeight: '540' }],
      xsmall: ['14px', { lineHeight: '1.2', letterSpacing: ls(), fontWeight: '540' }],
      body: ['16px', { lineHeight: '1.2', letterSpacing: ls(), fontWeight: '460' }],
      nav: ['16px', { lineHeight: '24px', letterSpacing: ls(), fontWeight: '460' }],
      button: ['16px', { lineHeight: '16px', letterSpacing: ls(), fontWeight: '600' }],
      'button-compact': ['14px', { lineHeight: '18px', letterSpacing: ls(), fontWeight: '600' }],
      'menu-title': ['16px', { lineHeight: '24px', letterSpacing: ls(), fontWeight: '700' }],
      'menu-desc': ['14px', { lineHeight: '16.8px', letterSpacing: ls(), fontWeight: '540' }],
      banner: ['16px', { lineHeight: '1.2', letterSpacing: ls(), fontWeight: '460' }],
      'banner-sm': ['14px', { lineHeight: '1.2', letterSpacing: ls(), fontWeight: '460' }],
      'footer-brand': ['28px', { lineHeight: '32px', letterSpacing: ls('-0.63px'), fontWeight: '540' }],
      'footer-brand-sm': ['18px', { lineHeight: '20px', letterSpacing: ls(), fontWeight: '540' }],
      'footer-title': ['18.72px', { lineHeight: '28.08px', letterSpacing: ls(), fontWeight: '700' }],
      'footer-link': ['16px', { lineHeight: '24px', letterSpacing: ls(), fontWeight: '460' }],
      // /plans page roles (plans.md 1-3)
      'trusted-heading': ['20px', { lineHeight: '24px', letterSpacing: ls(), fontWeight: '460' }],
      'plan-name': ['36px', { lineHeight: '40px', letterSpacing: ls('-0.99px'), fontWeight: '600' }],
      'plan-name-md': ['24px', { lineHeight: '40px', letterSpacing: ls('-0.66px'), fontWeight: '600' }],
      'plan-desc': ['18px', { lineHeight: '26px', letterSpacing: ls('-0.135px'), fontWeight: '540' }],
      'plan-desc-sm': ['16px', { lineHeight: '26px', letterSpacing: ls('-0.12px'), fontWeight: '540' }],
      'plan-price': ['32px', { lineHeight: '48px', letterSpacing: ls('-0.88px'), fontWeight: '600' }],
      'plan-price-md': ['18px', { lineHeight: '48px', letterSpacing: ls('-0.495px'), fontWeight: '600' }],
      caption: ['14px', { lineHeight: '22px', letterSpacing: ls(), fontWeight: '540' }],
      micro: ['12px', { lineHeight: '18px', letterSpacing: ls('-0.09px'), fontWeight: '540' }],
      'product-name': ['14px', { lineHeight: '20px', letterSpacing: ls('-0.385px'), fontWeight: '540' }],
      includes: ['16px', { lineHeight: '28px', letterSpacing: ls(), fontWeight: '600' }],
      'table-head': ['18px', { lineHeight: '27px', letterSpacing: ls(), fontWeight: '700' }],
      'group-title': ['32px', { lineHeight: '40px', letterSpacing: ls('-0.24px'), fontWeight: '540' }],
      'section-title': ['16px', { lineHeight: '24px', letterSpacing: ls(), fontWeight: '700' }],
      tag: ['12px', { lineHeight: '14.4px', letterSpacing: ls('-0.12px'), fontWeight: '600' }],
      tooltip: ['12px', { lineHeight: '18px', letterSpacing: ls(), fontWeight: '400' }],
      'float-name': ['20px', { lineHeight: '30px', letterSpacing: ls(), fontWeight: '700' }],
      'button-mid': ['14px', { lineHeight: '16px', letterSpacing: ls(), fontWeight: '600' }],
      // serif (Source Serif 4, no Hanken compensation)
      'serif-quote': ['18px', { lineHeight: '27px', letterSpacing: '-0.135px', fontWeight: '460' }],
      'serif-small': ['16px', { lineHeight: '24px', fontWeight: '460' }],
      // go.md 0.1 chapter eyebrow: 16/24/540, letter-spacing 0 (0.6em advance = 9.6px/char)
      eyebrow: ['16px', { lineHeight: '24px', letterSpacing: '0', fontWeight: '540' }],
      // Placeholder wordmark only (no spec value: original is an SVG)
      wordmark: ['22px', { lineHeight: '24px', letterSpacing: '-0.02em', fontWeight: '700' }],
      lockup: ['18px', { lineHeight: '25px', letterSpacing: '-0.01em', fontWeight: '700' }],
    },
    // 0.6 Radii
    borderRadius: {
      none: '0',
      4: '4px',
      6: '6px',
      8: '8px',
      12: '12px',
      14: '14px',
      16: '16px',
      20: '20px',
      24: '24px',
      32: '32px',
      full: '999px',
    },
    extend: {
      // 0.2 / 0.3 layout tokens
      spacing: {
        vp: 'var(--vp)',
        section: 'var(--section-pad)',
      },
      maxWidth: {
        content: 'var(--content-max)',
        text: 'min(90vw, 900px)',
      },
      // 0.7 Shadows
      boxShadow: {
        xsmall:
          '0 0 0 1px rgb(71 69 67 / 4%), 0 4px 8px -2px rgb(71 69 67 / 6%), 0 2px 4px 0 rgb(71 69 67 / 4%), 0 1px 2px 0 rgb(71 69 67 / 4%), 0 0 0 1px rgb(222 219 213 / 20%)',
        medium:
          '0 0 0 1px rgb(71 69 67 / 4%), 0 1px 1px .5px rgb(71 69 67 / 4%), 0 3px 3px -1.5px rgb(71 69 67 / 2%), 0 6px 6px -3px rgb(71 69 67 / 4%), 0 12px 12px -6px rgb(71 69 67 / 4%), 0 24px 24px -12px rgb(71 69 67 / 4%), 0 48px 48px -24px rgb(71 69 67 / 4%), 0 0 0 1px rgb(222 219 213 / 20%)',
        'elevation-large':
          '0 0 0 1px rgb(71 69 67 / 4%), 0 1px 1px .5px rgb(71 69 67 / 4%), 0 3px 3px -1.5px rgb(71 69 67 / 2%), 0 6px 6px -3px rgb(71 69 67 / 4%), 0 12px 12px -6px rgb(71 69 67 / 4%), 0 24px 24px -12px rgb(71 69 67 / 4%), 0 48px 48px -24px rgb(71 69 67 / 4%), 0 96px 96px -32px rgb(71 69 67 / 6%), 0 0 0 1px rgb(222 219 213 / 20%)',
        'elevation-small':
          '0 0 0 1px rgb(71 69 67 / 4%), 0 16px 8px -8px rgb(71 69 67 / 1%), 0 12px 6px -6px rgb(71 69 67 / 2%), 0 5px 5px -2.5px rgb(71 69 67 / 8%), 0 1px 3px -1.5px rgb(71 69 67 / 16%), 0 0 0 1px rgb(222 219 213 / 20%)',
        drawer: '0 -4px 8px .5px rgb(71 69 67 / 16%)',
        'ring-1': 'inset 0 0 0 1px currentColor',
        'ring-2': 'inset 0 0 0 2px currentColor',
        // Sign-in button ring (--_button-border-color: border-sub)
        'ring-sub-1': 'inset 0 0 0 1px var(--line-sub)',
        'ring-sub-2': 'inset 0 0 0 2px var(--line-sub)',
      },
      backgroundImage: {
        // plans.md 1: gradient wrapper (white 70% -> neutral-20 at 153%)
        'plans-top': 'linear-gradient(0deg, #ffffff 70%, #dedbd5 153%)',
        'hero-row':
          'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.06) 10%, rgba(255,255,255,.06) 100%)',
      },
      // 0.8 Motion
      transitionDuration: {
        fast: '100ms',
        base: '200ms',
        slow: '300ms',
        emphasis: '400ms',
        crossfade: '500ms',
        slide: '10000ms',
      },
      transitionTimingFunction: {
        // Original hovers: background-color / box-shadow use the CSS `ease-in-out`
        // keyword (Tailwind's default `in-out` is cubic-bezier(.4,0,.2,1));
        // colour-only hovers use `ease` (ease-ease).
        'in-out': 'cubic-bezier(0.42, 0, 0.58, 1)',
        ease: 'ease',
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        progress: 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
      zIndex: {
        header: '201',
        'floating-header': '300',
        tooltip: '301',
        dropdown: '100',
      },
    },
  },
  plugins: [],
}
