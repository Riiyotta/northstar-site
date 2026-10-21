// Illustration registry for the goAgents pages: slot id -> component.
import {
  ConnectorsStrip,
  CtaBandBg,
  FinalCtaBg,
  GoHeroLoop,
  GoRowInlineEdits,
  GoRowMeetingBrief,
  GoRowRooms,
  GoRowShortcut,
  HelperBand1,
  HelperBand2,
  HelperBand3,
  HelperBand4,
  HelperIconBuilder,
  HelperIconCitation,
  HelperIconMemo,
  HelperIconSorter,
  HelperIconStore,
  HelperIconWordsmith,
} from './go-art'
import {
  AgentIconAgenda,
  AgentIconClearCut,
  AgentIconContractLens,
  AgentIconDataPuller,
  AgentIconNudger,
  AgentIconScheduler,
  AgentIconSummarizer,
  AgentIconTranslator,
  AgentsBuilder,
  AsideAiTools,
  AsideDesktop,
  BentoAssistant,
  BentoMail,
  BentoWeb,
  TrustIconAudit,
  TrustIconLog,
  TrustIconRules,
} from './agents-art'
import { LogoAldergrove, LogoCorvid, LogoHalcyon, LogoNorthbayHealth, LogoPinecrest, LogoTessellate } from './brand'

export const goAgentsArt = {
  // /go hero: looping stand-in for the demo video. NOTE: Go.jsx passes
  // art: 'hero-video-2' and MediaSlot resolves `art ?? id`, so this only
  // shows once that `art` is dropped (or MediaSlot prefers `id`).
  'go-hero-video': GoHeroLoop,

  // /go feature rows (VideoSlot, looping, pausable)
  'go-row-3-video': GoRowMeetingBrief,
  'go-row-5-video': GoRowInlineEdits,
  'go-row-7-video': GoRowShortcut,
  'go-row-8-video': GoRowRooms,

  // /go helper cards
  'helper-band-1': HelperBand1,
  'helper-band-2': HelperBand2,
  'helper-band-3': HelperBand3,
  'helper-band-4': HelperBand4,
  'helper-icon-1': HelperIconWordsmith,
  'helper-icon-2': HelperIconSorter,
  'helper-icon-3': HelperIconCitation,
  'helper-icon-4': HelperIconMemo,
  'helper-icon-5': HelperIconBuilder,
  'helper-icon-6': HelperIconStore,

  // /go bands + connectors
  'cta-band-bg': CtaBandBg,
  'connectors-strip': ConnectorsStrip,
  'final-cta-bg': FinalCtaBg,

  // /agents
  'agents-builder-art': AgentsBuilder,
  'agent-icon-1': AgentIconClearCut,
  'agent-icon-2': AgentIconAgenda,
  'agent-icon-3': AgentIconTranslator,
  'agent-icon-4': AgentIconSummarizer,
  'agent-icon-5': AgentIconNudger,
  'agent-icon-6': AgentIconScheduler,
  'agent-icon-7': AgentIconDataPuller,
  'agent-icon-8': AgentIconContractLens,
  'bento-assistant-art': BentoAssistant,
  'bento-mail-art': BentoMail,
  'bento-web-art': BentoWeb,
  'aside-desktop-art': AsideDesktop,
  'aside-ai-tools-art': AsideAiTools,
  'trust-icon-1': TrustIconLog,
  'trust-icon-2': TrustIconAudit,
  'trust-icon-3': TrustIconRules,

  // /agents logo strip: existing invented wordmarks (213-232:80 canvases fit
  // the 214-215:80 cells); the rotation-pool set so /agents differs from home.
  'logo-a1': LogoPinecrest,
  'logo-a2': LogoNorthbayHealth,
  'logo-a3': LogoCorvid,
  'logo-a4': LogoAldergrove,
  'logo-a5': LogoTessellate,
  'logo-a6': LogoHalcyon,
}
