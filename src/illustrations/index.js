// Northstar illustration registry: asset-manifest.json id -> component.
// Every component fills its parent (100% x 100%); size the parent with the
// slot's aspect ratio / radius / overflow as described in CLONE_SPEC.md.
// `bg-cta` renders an absolutely positioned layer: put it in a
// `position: relative` parent. See README.md in this folder.
import { mailDocsArt } from './registry-mailDocs'
import { goAgentsArt } from './registry-goAgents'
import { HeroAgent, HeroInbox, HeroPages } from './hero'
import { AgentContextChat, AgentHub, AgentInlineSuggest } from './agent'
import { InboxAvailability, InboxDrafts, InboxSplit } from './inbox'
import { PagesAiSummary, PagesConnect, PagesEditor } from './pages'
import { EnterpriseConsole } from './enterprise'
import {
  CtaBackground,
  HeroNavIconAgent,
  HeroNavIconInbox,
  HeroNavIconPages,
  LockupAgent,
  LockupInbox,
  LockupPages,
  LogoAldergrove,
  LogoBrightfield,
  LogoCorvid,
  LogoFooter,
  LogoHalcyon,
  LogoHeader,
  LogoKestrel,
  LogoMarlow,
  LogoNorthbayHealth,
  LogoOdessaLabs,
  LogoPinecrest,
  LogoTessellate,
  LogoVoltline,
  SigninTileAgent,
  SigninTileInbox,
  SigninTilePages,
  TabCardBg,
  WordmarkFooter,
} from './brand'
import { TAB_ICONS } from './tiles'
import {
  EntHero,
  EntReport,
  EntResourceCaseStudy,
  EntResourceChecklist,
  EntResourceGuide,
  EntResourceWebinar,
  SecurityAdmin,
  SecurityAudit,
  SecurityEncryption,
  SecurityRetention,
  SecurityRoles,
  SecuritySso,
} from './enterprise-art'
import {
  GlyphAgents,
  GlyphAssistant,
  GlyphInbox,
  GlyphPages,
  LogoBrightway,
  LogoHalcyo,
  LogoKite,
  LogoLarkin,
  TestimonialPortrait1,
  TestimonialPortrait2,
  TestimonialPortrait3,
} from './plans-art'
import * as badges from './badges'

export const illustrations = {
  // header / footer brand
  'logo-header': LogoHeader,
  'logo-footer': LogoFooter,
  'wordmark-footer': WordmarkFooter,

  // 3 hero (7s CSS loops replacing the slide videos)
  'hero-video-1': HeroInbox,
  'hero-video-2': HeroAgent,
  'hero-video-3': HeroPages,
  'hero-nav-icon-1': HeroNavIconInbox,
  'hero-nav-icon-2': HeroNavIconAgent,
  'hero-nav-icon-3': HeroNavIconPages,

  // 4 customer logo strip (fictional companies)
  'logo-1': LogoHalcyon,
  'logo-2': LogoBrightfield,
  'logo-3': LogoOdessaLabs,
  'logo-4': LogoKestrel,
  'logo-5': LogoMarlow,
  'logo-6': LogoVoltline,
  // rotation pool (the original cycles 11 logos through the 6 cells)
  'logo-7': LogoPinecrest,
  'logo-8': LogoNorthbayHealth,
  'logo-9': LogoCorvid,
  'logo-10': LogoAldergrove,
  'logo-11': LogoTessellate,

  // section intro lockups
  'lockup-agent': LockupAgent,
  'lockup-inbox': LockupInbox,
  'lockup-pages': LockupPages,

  // 5 Agent
  'media-agent-wide': AgentInlineSuggest,
  'media-agent-chat': AgentContextChat,
  'media-agent-app': AgentHub,
  'tab-card-bg': TabCardBg,
  ...Object.fromEntries(TAB_ICONS.map((C, i) => [`tab-icon-${i + 1}`, C])),

  // 7 Inbox bento
  'media-inbox-drafts': InboxDrafts,
  'media-inbox-availability': InboxAvailability,
  'media-inbox-split': InboxSplit,

  // 8 Pages
  'media-pages-wide': PagesEditor,
  'media-pages-ai': PagesAiSummary,
  'media-pages-connect': PagesConnect,

  // 9 Enterprise
  'media-enterprise': EnterpriseConsole,

  // 10 Final CTA
  'bg-cta': CtaBackground,

  // sign-in menu
  'signin-tile-1': SigninTileInbox,
  'signin-tile-2': SigninTileAgent,
  'signin-tile-3': SigninTilePages,

  // /plans (plans-art.jsx)
  'glyph-inbox': GlyphInbox,
  'glyph-agents': GlyphAgents,
  'glyph-pages': GlyphPages,
  'glyph-assistant': GlyphAssistant,
  'testimonial-portrait-1': TestimonialPortrait1,
  'testimonial-portrait-2': TestimonialPortrait2,
  'testimonial-portrait-3': TestimonialPortrait3,
  'testimonial-company-1': LogoBrightway,
  'testimonial-company-2': LogoLarkin,
  'testimonial-company-3': LogoHalcyo,

  // /enterprise (enterprise-art.jsx, badges.jsx)
  'ent-hero': EntHero,
  'ent-report': EntReport,
  'ent-resource-1': EntResourceGuide,
  'ent-resource-2': EntResourceWebinar,
  'ent-resource-3': EntResourceCaseStudy,
  'ent-resource-4': EntResourceChecklist,
  'ent-security-1': SecurityEncryption,
  'ent-security-2': SecurityAudit,
  'ent-security-3': SecurityAdmin,
  'ent-security-4': SecuritySso,
  'ent-security-5': SecurityRoles,
  'ent-security-6': SecurityRetention,
  ...Object.fromEntries(Array.from({ length: 12 }, (_, i) => [`ent-badge-${i + 1}`, badges[`Badge${i + 1}`]])),
  'ent-quote-logo-1': LogoLarkin,
  'ent-quote-logo-2': LogoKite,

  // wave 1 pages (separate registries so parallel work doesn't collide)
  ...mailDocsArt,
  ...goAgentsArt,
}

export {
  HeroInbox,
  HeroAgent,
  HeroPages,
  AgentInlineSuggest,
  AgentContextChat,
  AgentHub,
  InboxDrafts,
  InboxAvailability,
  InboxSplit,
  PagesEditor,
  PagesAiSummary,
  PagesConnect,
  EnterpriseConsole,
  CtaBackground,
  TabCardBg,
  TAB_ICONS,
}

export default illustrations
