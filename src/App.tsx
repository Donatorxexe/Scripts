import { useState, useEffect, useCallback, useRef, CSSProperties } from 'react';

// ═══════════════════════════════════════════════════════════
//  MEDUSA SCRIPT CONTENT (embedded for download)
// ═══════════════════════════════════════════════════════════
const SCRIPT_URL_GH = 'loadstring(game:HttpGet("https://raw.githubusercontent.com/USER/REPO/main/Medusa.lua"))()';
const SCRIPT_URL_PB = 'loadstring(game:HttpGet("https://pastebin.com/raw/XXXXXXXX"))()';

function downloadScript() {
  const scriptContent = `-- Para obter o script completo do MEDUSA v9.0:
-- 1. Visita o repositorio GitHub do projeto
-- 2. Ou usa o loadstring abaixo no teu executor:
--
-- loadstring(game:HttpGet("https://raw.githubusercontent.com/USER/REPO/main/Medusa.lua"))()
--
-- O script completo tem ~1500 linhas com:
-- Aimbot, Silent Aim, Trigger Bot, ESP, Fly, Speed,
-- Noclip, Hitbox, Crosshair, Player List, 12 temas,
-- 16 keybinds editaveis, e muito mais.
--
-- Made by .donatorexe.
-- MEDUSA v9.0 — Ultimate Edition
`;
  const blob = new Blob([scriptContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Medusa_v9.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

const ACCENT = '#00d4aa';
const ACCENT_DIM = '#00d4aa22';
const ACCENT_MED = '#00d4aa44';
const BG = '#08080e';
const BG_CARD = '#0f0f18';
const BG_DARK = '#0a0a12';
const BORDER = '#1a1a28';
const TEXT = '#e4e4eb';
const MUTED = '#666680';

// ═══════════════════════════════════════════════════════════
//  DATA
// ═══════════════════════════════════════════════════════════
const features = [
  {
    cat: '🎯 Aimbot',
    color: '#a855f7',
    items: [
      'Aimbot Normal — Smooth 0 (snap) a 100 (legit), RMB para lock',
      'Silent Aim — hookmetamethod redireciona mouse.Hit/Target sem mover câmara',
      'Trigger Bot — Auto-fire quando mira está dentro do Trigger FOV',
      'Team Check — Ignora jogadores da mesma equipa',
      'Visible Check — Raycast verifica se alvo está visível',
      'Health Check — Só mira em alvos com HP > mínimo definido',
      'Hit Part — Head / Torso / Closest (parte mais perto do cursor)',
      'Max Distance — Slider 50-2000 studs',
      'FOV Circle — Círculo visual no ecrã centrado no cursor',
      'Aim Smooth — Interpolação lerp para movimento natural',
    ],
  },
  {
    cat: '👁️ Visuals',
    color: '#3b82f6',
    items: [
      'ESP Highlights com cor accent',
      'ESP Nomes (BillboardGui acima da cabeça)',
      'ESP Distância em metros (atualiza em tempo real)',
      'ESP HP Bars coloridas (verde/amarelo/vermelho)',
      'ESP Distance Filter — Slider 50-5000 studs',
      'ESP Auto-Refresh configurável (timer visual)',
      'Crosshair — 4 estilos: Cross, Dot, Circle, T-Cross',
      'Crosshair Size, Gap e Thickness ajustáveis',
      'Target HUD — Barra flutuante com nome + HP + distância',
      'Watermark — MEDUSA v9.0 | FPS | Ping (canto superior)',
      'Kill Feed — Log das últimas 8 kills com timestamp',
    ],
  },
  {
    cat: '⚡ Movement',
    color: '#f59e0b',
    items: [
      'Fly — WASD + Space/Ctrl, velocidade 50-300',
      'Noclip — Atravessa paredes (CanCollide = false)',
      'Speed Hack — Slider 16-200 WalkSpeed',
      'Infinite Jump — Pula ilimitadamente no ar',
      'TP to Cursor — Teleporta ao mouse.Hit (RShift)',
      'Click TP — Segura bind + clica para teleportar',
      'No Fall Damage — Cancela dano de queda',
      'Auto Re-Apply — Fly/Speed/Noclip re-aplicam no respawn',
    ],
  },
  {
    cat: '🔧 Combat',
    color: '#ef4444',
    items: [
      'Hitbox Expander — Slider 1x a 25x tamanho das partes',
      'Hitbox Transparency — 0% a 100% transparência',
      'Hitbox auto-reset quando desativado',
      'Trigger FOV — Slider 5-100px (raio de ativação)',
      'Trigger Delay — Slider 0.01s a 1s entre disparos',
    ],
  },
  {
    cat: '🌍 World',
    color: '#22c55e',
    items: [
      'Fullbright — Remove fog, shadows, brightness=2',
      'Fullbright guarda e restaura lighting original no eject',
      'Anti-AFK — VirtualUser impede kick por idle',
      'Server Hop — Busca servidor via API e teleporta',
    ],
  },
  {
    cat: '👥 Players',
    color: '#06b6d4',
    items: [
      'Lista de jogadores com DisplayName e @Username',
      'HP Bars coloridas por jogador (verde/amarelo/vermelho)',
      'Spectate — Vê pela câmara de outro jogador',
      'Unspectate — Volta à tua câmara',
      'Fling — Velocity-based, teleporta e aplica força',
      'Teleport To — Teleporta 3 studs atrás do alvo',
      'Auto-refresh da lista a cada 3 segundos',
      'Auto-cleanup quando jogador sai durante spectate',
    ],
  },
  {
    cat: '🎨 GUI Customize',
    color: '#ec4899',
    items: [
      '12 Temas — Medusa, Emerald, Ocean, Blood, Amber, Mint, Rose, Sky, Lime, Frost, Gold, Cyber',
      'Rainbow Mode — Accent color cicla automaticamente em HSV',
      'Panel Width e Height editáveis em tempo real',
      'Sidebar Width, Topbar Height editáveis',
      'Font Size e Title Size editáveis',
      'Card Spacing e Padding editáveis',
      'Border Thickness editável',
      'Toggle Size, Slider Height, Button Height editáveis',
      'Panel Opacity — Transparência do fundo 0-100%',
    ],
  },
  {
    cat: '🎮 Keybinds & Safety',
    color: '#8b5cf6',
    items: [
      '16 Keybinds editáveis — clica e pressiona nova tecla',
      'Reset All to Default — repõe todas as binds',
      'Panic Key (End) — Desativa TUDO de uma vez',
      'Eject limpo — Restaura lighting, camera, walkspeed, CanCollide',
      'Auto-cleanup de BodyVelocity/BodyGyro no eject',
      'GUI toggle (Y) — Esconde/mostra sem desativar funções',
      'Minimizar janela (botão — no topbar)',
    ],
  },
];

const binds: [string, string, string][] = [
  ['T', 'ESP', '👁️'],
  ['G', 'Aimbot', '🎯'],
  ['J', 'Silent Aim', '🔇'],
  ['K', 'Trigger Bot', '🔫'],
  ['F', 'Fly', '✈️'],
  ['H', 'Hitbox', '📦'],
  ['U', 'Noclip', '🚶'],
  ['M', 'Speed', '🏃'],
  ['N', 'Infinite Jump', '🦘'],
  ['L', 'Fullbright', '💡'],
  ['B', 'Click TP', '🖱️'],
  ['V', 'No Fall Damage', '🛡️'],
  ['RShift', 'TP to Cursor', '📏'],
  ['Y', 'Toggle GUI', '👁️'],
  ['P', 'Eject', '🚫'],
  ['End', 'Panic Key', '🚨'],
];

const executors = [
  { name: 'Solara', status: 'full' },
  { name: 'Fluxus', status: 'full' },
  { name: 'Delta', status: 'full' },
  { name: 'Hydrogen', status: 'full' },
  { name: 'KRNL', status: 'full' },
  { name: 'Arceus X', status: 'full' },
  { name: 'Codex', status: 'full' },
  { name: 'Synapse', status: 'full' },
  { name: 'Script-Ware', status: 'full' },
  { name: 'Wave', status: 'full' },
];

const tabs = [
  { id: 'features', label: 'Features', icon: '⚡' },
  { id: 'binds', label: 'Keybinds', icon: '🎮' },
  { id: 'howto', label: 'Como Usar', icon: '📖' },
  { id: 'compat', label: 'Compatibilidade', icon: '✅' },
] as const;

type TabId = (typeof tabs)[number]['id'];

// ═══════════════════════════════════════════════════════════
//  STYLES
// ═══════════════════════════════════════════════════════════
const styles = {
  page: {
    minHeight: '100vh',
    background: BG,
    color: TEXT,
  } as CSSProperties,

  container: {
    maxWidth: '960px',
    margin: '0 auto',
    padding: '0 20px',
  } as CSSProperties,

  hero: {
    position: 'relative' as const,
    overflow: 'hidden',
    borderBottom: `1px solid ${BORDER}`,
    padding: '56px 0 44px',
  } as CSSProperties,

  heroGlow: {
    position: 'absolute' as const,
    inset: 0,
    opacity: 0.12,
    background: `radial-gradient(ellipse at 50% -30%, ${ACCENT}44 0%, transparent 65%)`,
    pointerEvents: 'none' as const,
  } as CSSProperties,

  heroGrid: {
    position: 'absolute' as const,
    inset: 0,
    opacity: 0.025,
    backgroundImage: `linear-gradient(${MUTED}33 1px, transparent 1px), linear-gradient(90deg, ${MUTED}33 1px, transparent 1px)`,
    backgroundSize: '36px 36px',
    pointerEvents: 'none' as const,
  } as CSSProperties,

  card: {
    background: BG_CARD,
    border: `1px solid ${BORDER}`,
    padding: '20px',
    transition: 'border-color 0.2s, background 0.2s',
  } as CSSProperties,

  cardHover: {
    borderColor: ACCENT_MED,
    background: '#111120',
  } as CSSProperties,

  btn: {
    padding: '12px 24px',
    fontWeight: 700,
    fontSize: '13px',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.2s',
    fontFamily: 'inherit',
  } as CSSProperties,

  tag: {
    display: 'inline-block',
    padding: '3px 10px',
    fontSize: '11px',
    fontFamily: 'Consolas, monospace',
    fontWeight: 700,
    background: `${ACCENT}12`,
    color: ACCENT,
    border: `1px solid ${ACCENT}33`,
  } as CSSProperties,

  codeBlock: {
    padding: '14px',
    background: BG_DARK,
    border: `1px solid ${BORDER}`,
    position: 'relative' as const,
    fontFamily: 'Consolas, monospace',
    fontSize: '12px',
    color: ACCENT,
    wordBreak: 'break-all' as const,
    lineHeight: 1.6,
  } as CSSProperties,
};

// ═══════════════════════════════════════════════════════════
//  COMPONENTS
// ═══════════════════════════════════════════════════════════

function FeatureCard({ cat, color, items, delay }: {
  cat: string; color: string; items: string[]; delay: number;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="anim-fade"
      style={{
        ...styles.card,
        ...(hovered ? { borderColor: `${color}55`, background: '#111120' } : {}),
        animationDelay: `${delay}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
        <div style={{ width: '3px', height: '18px', background: color, flexShrink: 0 }} />
        <h3 style={{ color, fontSize: '14px', fontWeight: 700, flex: 1 }}>{cat}</h3>
        <span style={{
          fontSize: '10px', color: MUTED, padding: '2px 8px',
          border: `1px solid ${color}33`, background: `${color}08`,
        }}>
          {items.length}
        </span>
      </div>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '5px', listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((item, i) => (
          <li key={i} style={{
            display: 'flex', alignItems: 'flex-start', gap: '8px',
            fontSize: '12px', color: '#999', lineHeight: 1.5,
          }}>
            <span style={{ color, flexShrink: 0, marginTop: '1px', fontSize: '10px' }}>▸</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [text]);

  return (
    <button
      onClick={copy}
      style={{
        padding: '4px 12px', fontSize: '10px', cursor: 'pointer',
        background: copied ? '#00d4aa22' : '#ffffff08',
        color: copied ? ACCENT : MUTED,
        border: `1px solid ${copied ? ACCENT : BORDER}`,
        transition: 'all 0.2s', fontFamily: 'inherit', fontWeight: 600,
      }}
    >
      {copied ? '✅ Copiado!' : label}
    </button>
  );
}

function StatBox({ value, label }: { value: string; label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        padding: '10px 16px', border: `1px solid ${hovered ? ACCENT_MED : BORDER}`,
        background: hovered ? '#111120' : BG_CARD,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px',
        transition: 'all 0.2s', cursor: 'default', minWidth: '72px',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={{ fontSize: '20px', fontWeight: 800, color: ACCENT }}>{value}</span>
      <span style={{ fontSize: '9px', color: MUTED, textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  MAIN APP
// ═══════════════════════════════════════════════════════════
export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('features');
  const [heroVisible, setHeroVisible] = useState(false);
  const totalFeatures = useRef(features.reduce((a, f) => a + f.items.length, 0));

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={styles.page}>
      {/* ══════ HERO ══════ */}
      <section style={styles.hero}>
        <div style={styles.heroGlow} />
        <div style={styles.heroGrid} />

        <div style={{
          ...styles.container, position: 'relative',
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s ease-out',
        }}>
          {/* Title Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <div
              className="anim-glow"
              style={{
                width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '34px', border: `2px solid ${ACCENT_MED}`, background: ACCENT_DIM,
              }}
            >
              🐍
            </div>
            <div>
              <h1 style={{ fontSize: '40px', fontWeight: 900, letterSpacing: '-2px', color: ACCENT, lineHeight: 1 }}>
                MEDUSA
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px', flexWrap: 'wrap' }}>
                <span style={styles.tag}>v9.0 FINAL</span>
                <span style={{ fontSize: '12px', color: MUTED }}>Made by</span>
                <span style={{ fontSize: '12px', color: ACCENT, fontWeight: 700 }}>.donatorexe.</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p style={{ fontSize: '14px', color: '#888', lineHeight: 1.7, maxWidth: '600px', marginTop: '12px' }}>
            Script Roblox completo — Aimbot, Silent Aim, Trigger Bot, ESP, Fly, Speed,
            Player List, 12 temas, 16 keybinds configuráveis, GUI retangular ultra-personalizável.
            Tudo auditado e 100% funcional.
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
            <StatBox value={totalFeatures.current.toString()} label="Features" />
            <StatBox value="16" label="Keybinds" />
            <StatBox value="12" label="Temas" />
            <StatBox value="8" label="Abas" />
            <StatBox value="~1500" label="Linhas" />
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '24px', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                navigator.clipboard.writeText(SCRIPT_URL_GH);
              }}
              style={{
                ...styles.btn,
                background: ACCENT, color: '#000',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 8px 24px ${ACCENT_MED}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              📋 Copiar Loadstring
            </button>
            <button
              onClick={downloadScript}
              style={{
                ...styles.btn,
                background: '#22c55e', color: '#000',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px #22c55e44';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              ⬇️ Download Script (.txt)
            </button>
            <button
              onClick={() => setActiveTab('howto')}
              style={{
                ...styles.btn,
                background: 'transparent', color: ACCENT,
                border: `1px solid ${ACCENT_MED}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = ACCENT_DIM;
                e.currentTarget.style.borderColor = ACCENT;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = ACCENT_MED;
              }}
            >
              📖 Como Usar
            </button>
          </div>
        </div>
      </section>

      {/* ══════ TABS ══════ */}
      <div style={styles.container}>
        <div style={{
          display: 'flex', gap: 0, marginTop: '28px',
          borderBottom: `1px solid ${BORDER}`, overflowX: 'auto',
        }}>
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '12px 18px', fontSize: '13px', fontWeight: 600,
                  cursor: 'pointer', background: active ? `${ACCENT}08` : 'transparent',
                  color: active ? ACCENT : MUTED, border: 'none',
                  borderBottom: `2px solid ${active ? ACCENT : 'transparent'}`,
                  transition: 'all 0.2s', whiteSpace: 'nowrap', fontFamily: 'inherit',
                }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = '#999'; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = MUTED; }}
              >
                {tab.icon} {tab.label}
              </button>
            );
          })}
        </div>

        {/* ══════ FEATURES TAB ══════ */}
        {activeTab === 'features' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 380px), 1fr))',
            gap: '12px', padding: '24px 0 48px',
          }}>
            {features.map((f, i) => (
              <FeatureCard key={f.cat} cat={f.cat} color={f.color} items={f.items} delay={i * 50} />
            ))}
          </div>
        )}

        {/* ══════ BINDS TAB ══════ */}
        {activeTab === 'binds' && (
          <div style={{ padding: '24px 0 48px' }}>
            <p className="anim-fade" style={{ fontSize: '13px', color: MUTED, marginBottom: '6px' }}>
              Todas as keybinds são editáveis dentro do script na aba <span style={{ color: ACCENT, fontWeight: 600 }}>"Binds"</span>.
            </p>
            <p className="anim-fade" style={{
              fontSize: '12px', color: '#555', marginBottom: '20px',
              animationDelay: '50ms',
            }}>
              Clica no botão da keybind dentro do jogo e pressiona a nova tecla. RMB (botão direito do rato) serve para ativar o aim lock.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
              gap: '4px',
            }}>
              {binds.map(([key, action, icon], i) => (
                <BindRow key={action} keyName={key} action={action} icon={icon} delay={i * 25} />
              ))}
            </div>
          </div>
        )}

        {/* ══════ HOW-TO TAB ══════ */}
        {activeTab === 'howto' && (
          <div style={{ padding: '24px 0 48px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <HowToCard
              title="Opção 1: Loadstring via GitHub (recomendado)"
              delay={0}
              steps={[
                'Cria um repositório no GitHub',
                <>Faz upload do script como <code style={{ color: ACCENT }}>Medusa.lua</code></>,
                'Abre o ficheiro e clica em "Raw" para obter o URL direto',
                'Cola este código no executor:',
              ]}
              code={SCRIPT_URL_GH}
            />
            <HowToCard
              title="Opção 2: Loadstring via Pastebin"
              delay={80}
              steps={[
                <>Vai a <span style={{ color: ACCENT }}>pastebin.com</span> e cria um novo paste</>,
                'Cola todo o conteúdo do script',
                'Copia o ID do paste (ex: AbCdEfGh)',
                'Cola no executor:',
              ]}
              code={SCRIPT_URL_PB}
            />
            <div
              className="anim-fade"
              style={{ ...styles.card, animationDelay: '160ms' }}
            >
              <h3 style={{ color: ACCENT, fontSize: '14px', fontWeight: 700, marginBottom: '10px' }}>
                Opção 3: Execução direta
              </h3>
              <p style={{ fontSize: '12px', color: '#999', lineHeight: 1.6 }}>
                Abre o ficheiro do script, copia todo o conteúdo (<code style={{ color: ACCENT }}>Ctrl+A</code> → <code style={{ color: ACCENT }}>Ctrl+C</code>)
                e cola diretamente na caixa de texto do executor. Carrega em Execute/Run.
              </p>
            </div>
            <div
              className="anim-fade"
              style={{ ...styles.card, animationDelay: '240ms' }}
            >
              <h3 style={{ color: '#f59e0b', fontSize: '14px', fontWeight: 700, marginBottom: '10px' }}>
                ⚠️ Notas Importantes
              </h3>
              <ul style={{ fontSize: '12px', color: '#999', lineHeight: 1.8, listStyle: 'none', padding: 0 }}>
                <li>▸ <strong style={{ color: TEXT }}>Silent Aim</strong> requer executor com suporte a <code style={{ color: ACCENT }}>hookmetamethod</code></li>
                <li>▸ <strong style={{ color: TEXT }}>Trigger Bot</strong> usa <code style={{ color: ACCENT }}>VirtualInputManager</code> + fallback <code style={{ color: ACCENT }}>mouse1click()</code></li>
                <li>▸ <strong style={{ color: TEXT }}>Fullbright</strong> guarda a lighting original e restaura-a no eject</li>
                <li>▸ <strong style={{ color: TEXT }}>Panic Key (End)</strong> desativa TUDO de uma vez — use em emergências</li>
                <li>▸ O script limpa-se sozinho no eject (BodyVelocity, BodyGyro, ESP, Hitboxes, etc.)</li>
              </ul>
            </div>
          </div>
        )}

        {/* ══════ COMPAT TAB ══════ */}
        {activeTab === 'compat' && (
          <div style={{ padding: '24px 0 48px' }}>
            <p className="anim-fade" style={{ fontSize: '13px', color: MUTED, marginBottom: '20px' }}>
              Testado e compatível com os executores mais populares. Silent Aim requer suporte a <code style={{ color: ACCENT }}>hookmetamethod</code>.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))',
              gap: '8px',
            }}>
              {executors.map((exec, i) => (
                <ExecutorCard key={exec.name} name={exec.name} delay={i * 40} />
              ))}
            </div>
            <div
              className="anim-fade"
              style={{ ...styles.card, marginTop: '20px', animationDelay: '400ms' }}
            >
              <h3 style={{ color: ACCENT, fontSize: '14px', fontWeight: 700, marginBottom: '10px' }}>
                Funcionalidades por Executor
              </h3>
              <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ color: MUTED, borderBottom: `1px solid ${BORDER}` }}>
                    <th style={{ textAlign: 'left', padding: '8px 4px', fontWeight: 600 }}>Feature</th>
                    <th style={{ textAlign: 'center', padding: '8px 4px', fontWeight: 600 }}>Básico</th>
                    <th style={{ textAlign: 'center', padding: '8px 4px', fontWeight: 600 }}>hookmetamethod</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['ESP / Fly / Noclip / Speed', '✅', '—'],
                    ['Aimbot Normal', '✅', '—'],
                    ['Silent Aim', '❌', '✅'],
                    ['Trigger Bot', '⚠️ mouse1click', '✅ VIM'],
                    ['Hitbox Expander', '✅', '—'],
                    ['Player List', '✅', '—'],
                  ].map(([feat, basic, hook], i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${BORDER}11`, color: '#999' }}>
                      <td style={{ padding: '6px 4px' }}>{feat}</td>
                      <td style={{ padding: '6px 4px', textAlign: 'center' }}>{basic}</td>
                      <td style={{ padding: '6px 4px', textAlign: 'center' }}>{hook}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ══════ FOOTER ══════ */}
      <footer style={{
        textAlign: 'center', padding: '32px 20px',
        borderTop: `1px solid ${BORDER}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <span style={{ fontSize: '16px' }}>🐍</span>
          <span style={{ fontSize: '12px', color: '#444', fontWeight: 700 }}>MEDUSA v9.0 FINAL</span>
          <span style={{ fontSize: '11px', color: '#333' }}>—</span>
          <span style={{ fontSize: '11px', color: '#555' }}>Made by .donatorexe.</span>
        </div>
        <p style={{ fontSize: '10px', color: '#333', marginTop: '8px' }}>
          Apenas para fins educacionais. Use por sua conta e risco.
        </p>
      </footer>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  SUB-COMPONENTS
// ═══════════════════════════════════════════════════════════

function BindRow({ keyName, action, icon, delay }: {
  keyName: string; action: string; icon: string; delay: number;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="anim-fade"
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 14px',
        background: hovered ? '#111120' : BG_CARD,
        border: `1px solid ${hovered ? ACCENT_MED : BORDER}`,
        animationDelay: `${delay}ms`,
        transition: 'all 0.15s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '14px', width: '20px', textAlign: 'center' }}>{icon}</span>
        <span style={{ fontSize: '12px', color: hovered ? TEXT : '#aaa' }}>{action}</span>
      </div>
      <span style={styles.tag}>{keyName}</span>
    </div>
  );
}

function HowToCard({ title, delay, steps, code }: {
  title: string; delay: number;
  steps: React.ReactNode[]; code: string;
}) {
  return (
    <div
      className="anim-fade"
      style={{ ...styles.card, animationDelay: `${delay}ms` }}
    >
      <h3 style={{ color: ACCENT, fontSize: '14px', fontWeight: 700, marginBottom: '12px' }}>
        {title}
      </h3>
      <ol style={{
        display: 'flex', flexDirection: 'column', gap: '6px',
        fontSize: '12px', color: '#999', listStyle: 'none', padding: 0, margin: 0,
      }}>
        {steps.map((step, i) => (
          <li key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <span style={{ color: ACCENT, fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
      <div style={{ ...styles.codeBlock, marginTop: '12px' }}>
        <code>{code}</code>
        <div style={{ position: 'absolute', top: '8px', right: '8px' }}>
          <CopyButton text={code} label="Copiar" />
        </div>
      </div>
    </div>
  );
}

function ExecutorCard({ name, delay }: { name: string; delay: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="anim-fade"
      style={{
        padding: '14px 16px',
        background: hovered ? '#111120' : BG_CARD,
        border: `1px solid ${hovered ? '#22c55e55' : BORDER}`,
        display: 'flex', alignItems: 'center', gap: '10px',
        animationDelay: `${delay}ms`,
        transition: 'all 0.15s', cursor: 'default',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={{
        width: '8px', height: '8px', background: '#22c55e',
        borderRadius: '50%', flexShrink: 0,
        boxShadow: hovered ? '0 0 8px #22c55e66' : 'none',
        transition: 'box-shadow 0.2s',
      }} />
      <span style={{ fontSize: '13px', fontWeight: 600, color: hovered ? TEXT : '#ccc' }}>{name}</span>
      <span style={{ marginLeft: 'auto', fontSize: '10px', color: '#22c55e', fontWeight: 600 }}>✓</span>
    </div>
  );
}
