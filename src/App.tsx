import { useState, useEffect, useRef } from 'react';
import scriptRaw from '../Medusa_v9.txt?raw';

/* ════════════════════════════════════════════════════════════
   MEDUSA v9.0 — Web Viewer & Downloader
   Made by .donatorexe.
   ════════════════════════════════════════════════════════════ */

const A = '#00d4aa';
const BG = '#08080e';
const CARD = '#0e0e18';
const BORDER = '#1a1a2a';
const TEXT = '#e4e4eb';
const DIM = '#71718a';

const LOADSTRING_GH = 'loadstring(game:HttpGet("https://raw.githubusercontent.com/USER/REPO/main/Medusa.lua"))()';
const LOADSTRING_PB = 'loadstring(game:HttpGet("https://pastebin.com/raw/XXXXXXXX"))()';

/* ─── Feature Data ───────────────────────────────────────── */
const features = [
  {
    cat: '🎯 Aimbot', col: '#a855f7', items: [
      'Aimbot Normal — Smooth 0-100, RMB lock, FOV circle',
      'Silent Aim — hookmetamethod redireciona mouse.Hit/Target',
      'Trigger Bot — Auto-fire + delay configurável',
      'Team Check, Visible Check, Health Check',
      'Hit Part: Head / Torso / Closest',
      'Max Distance slider 50-2000 studs',
    ]
  },
  {
    cat: '👁️ Visuals', col: '#3b82f6', items: [
      'ESP Highlights + Nomes + Distância + HP Bars',
      'ESP Distance Filter 50-5000 studs',
      'ESP Auto-Refresh com timer visual',
      'Crosshair — 4 estilos: Cross, Dot, Circle, T-Cross',
      'Target HUD — Nome + HP + Distância do alvo lockado',
      'Watermark — MEDUSA v9.0 | FPS | Ping',
      'Kill Feed — Últimas 8 kills com timestamp',
    ]
  },
  {
    cat: '⚡ Movement', col: '#f59e0b', items: [
      'Fly — WASD + Space/Ctrl, speed 50-300',
      'Noclip — Atravessa paredes',
      'Speed Hack — WalkSpeed 16-200',
      'Infinite Jump — Pula no ar ilimitadamente',
      'Click TP — Segura B + clica para teleportar',
      'TP to Cursor — RShift teleporta ao mouse',
      'No Fall Damage — Cancela dano de queda',
    ]
  },
  {
    cat: '🔧 Combat', col: '#ef4444', items: [
      'Hitbox Expander — 1x a 25x',
      'Hitbox Transparency ajustável',
      'Trigger FOV 5-100px',
      'Trigger Delay 0.01s-1s',
    ]
  },
  {
    cat: '🌍 World', col: '#22c55e', items: [
      'Fullbright — Remove fog e shadows',
      'Anti-AFK — VirtualUser impede kick',
      'Server Hop — Busca servidor via API',
    ]
  },
  {
    cat: '👥 Players', col: '#06b6d4', items: [
      'Lista com DisplayName, @Username, HP bar',
      'Spectate / Unspectate',
      'Fling — Velocity-based',
      'Teleport To — 3 studs atrás do alvo',
      'Auto-refresh cada 3s',
    ]
  },
  {
    cat: '🎨 GUI Customize', col: '#ec4899', items: [
      '12 Temas de cor + Rainbow Mode',
      'Panel Width/Height editáveis',
      'Sidebar, Topbar, Font Size editáveis',
      'Card Spacing, Border Thickness editáveis',
      'Panel Opacity 0-100%',
    ]
  },
  {
    cat: '🎮 Keybinds', col: '#8b5cf6', items: [
      '16 keybinds editáveis na UI',
      'Reset All to Default',
      'Panic Key (End) — desativa tudo',
      'Eject limpo com cleanup total',
    ]
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
  'Solara', 'Fluxus', 'Delta', 'Hydrogen', 'KRNL',
  'Arceus X', 'Codex', 'Synapse', 'Script-Ware', 'Wave',
];

/* ─── Copy Helper ────────────────────────────────────────── */
function useCopy() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2500);
  };
  return { copied, copy };
}

/* ─── Download Helper ────────────────────────────────────── */
function downloadScript() {
  const blob = new Blob([scriptRaw], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Medusa_v9.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ═════════════════════════════════════════════════════════════
   MAIN APP
   ═════════════════════════════════════════════════════════════ */
export default function App() {
  const [tab, setTab] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const { copied, copy } = useCopy();
  const totalFeatures = useRef(features.reduce((s, f) => s + f.items.length, 0));

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  const tabs = ['⚡ Features', '🎮 Keybinds', '📖 Como Usar', '✅ Compatibilidade'];

  return (
    <div style={{
      minHeight: '100vh',
      background: BG,
      color: TEXT,
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* ═══════ HERO ═══════ */}
      <header style={{
        borderBottom: `1px solid ${BORDER}`,
        padding: '48px 0 40px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Glow bg */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(ellipse at 50% -20%, ${A}20 0%, transparent 60%)`,
        }} />

        <div style={{
          maxWidth: 900, margin: '0 auto', padding: '0 24px',
          position: 'relative',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'none' : 'translateY(16px)',
          transition: 'all 0.6s ease-out',
        }}>
          {/* Logo + Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14 }}>
            <div className="glow-box" style={{
              width: 56, height: 56,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 30, border: `2px solid ${A}44`, background: `${A}11`,
            }}>🐍</div>
            <div>
              <h1 style={{ fontSize: 38, fontWeight: 900, color: A, letterSpacing: -2, lineHeight: 1 }}>
                MEDUSA
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
                <span style={{
                  padding: '2px 10px', fontSize: 11, fontWeight: 700,
                  background: `${A}15`, color: A, border: `1px solid ${A}33`,
                  fontFamily: 'Consolas, monospace',
                }}>v9.0 FINAL</span>
                <span style={{ fontSize: 12, color: DIM }}>Made by</span>
                <span style={{ fontSize: 12, color: A, fontWeight: 700 }}>.donatorexe.</span>
              </div>
            </div>
          </div>

          <p style={{ fontSize: 14, color: '#888', lineHeight: 1.7, maxWidth: 580, margin: '12px 0 20px' }}>
            Script Roblox completo — Aimbot, Silent Aim, Trigger Bot, ESP, Fly, Speed,
            Player List, 12 temas, 16 keybinds, GUI ultra-personalizável. Tudo auditado e funcional.
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
            {[
              [totalFeatures.current, 'Features'],
              [16, 'Keybinds'],
              [12, 'Temas'],
              [8, 'Abas'],
              ['~2K', 'Linhas'],
            ].map(([v, l]) => (
              <div key={String(l)} style={{
                padding: '8px 16px', background: CARD, border: `1px solid ${BORDER}`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                minWidth: 68,
              }}>
                <span style={{ fontSize: 18, fontWeight: 800, color: A }}>{String(v)}</span>
                <span style={{ fontSize: 9, color: DIM, textTransform: 'uppercase', letterSpacing: 1 }}>{String(l)}</span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button onClick={() => copy(LOADSTRING_GH, 'ls')} style={{
              padding: '11px 22px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
              background: A, color: '#000', border: 'none', fontFamily: 'inherit',
              transition: 'opacity 0.2s',
            }}>
              {copied === 'ls' ? '✅ Copiado!' : '📋 Copiar Loadstring'}
            </button>
            <button onClick={downloadScript} style={{
              padding: '11px 22px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
              background: '#22c55e', color: '#000', border: 'none', fontFamily: 'inherit',
              transition: 'opacity 0.2s',
            }}>
              ⬇️ Download .txt
            </button>
            <button onClick={() => setTab(2)} style={{
              padding: '11px 22px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
              background: 'transparent', color: A, border: `1px solid ${A}44`,
              fontFamily: 'inherit', transition: 'all 0.2s',
            }}>
              📖 Como Usar
            </button>
          </div>
        </div>
      </header>

      {/* ═══════ CONTENT ═══════ */}
      <main style={{
        flex: 1,
        maxWidth: 900, width: '100%',
        margin: '0 auto',
        padding: '0 24px',
      }}>
        {/* Tabs */}
        <div style={{
          display: 'flex', gap: 0, marginTop: 24,
          borderBottom: `1px solid ${BORDER}`,
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
        }}>
          {tabs.map((t, i) => (
            <button key={t} onClick={() => setTab(i)} style={{
              padding: '12px 18px', fontSize: 13, fontWeight: 600,
              cursor: 'pointer', fontFamily: 'inherit',
              background: tab === i ? `${A}0a` : 'transparent',
              color: tab === i ? A : DIM,
              border: 'none',
              borderBottom: `2px solid ${tab === i ? A : 'transparent'}`,
              whiteSpace: 'nowrap',
              transition: 'all 0.15s',
            }}>{t}</button>
          ))}
        </div>

        {/* ─── TAB 0: Features ─── */}
        {tab === 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 12, padding: '20px 0 48px',
          }}>
            {features.map((f, i) => (
              <FeatureCard key={f.cat} cat={f.cat} col={f.col} items={f.items} delay={i * 60} />
            ))}
          </div>
        )}

        {/* ─── TAB 1: Keybinds ─── */}
        {tab === 1 && (
          <div style={{ padding: '20px 0 48px' }}>
            <p style={{ fontSize: 13, color: DIM, marginBottom: 4 }}>
              Todas editáveis no jogo na aba <span style={{ color: A, fontWeight: 600 }}>Binds</span>.
              Clica no botão e pressiona a nova tecla.
            </p>
            <p style={{ fontSize: 12, color: '#555', marginBottom: 18 }}>
              RMB (botão direito) ativa o aim lock quando o Aimbot está ligado.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 4,
            }}>
              {binds.map(([key, action, icon], i) => (
                <div key={action} className="fade-up" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 14px',
                  background: CARD, border: `1px solid ${BORDER}`,
                  animationDelay: `${i * 30}ms`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 14, width: 20, textAlign: 'center' }}>{icon}</span>
                    <span style={{ fontSize: 12, color: '#aaa' }}>{action}</span>
                  </div>
                  <span style={{
                    padding: '2px 10px', fontSize: 11, fontWeight: 700,
                    background: `${A}12`, color: A, border: `1px solid ${A}33`,
                    fontFamily: 'Consolas, monospace',
                  }}>{key}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── TAB 2: How To ─── */}
        {tab === 2 && (
          <div style={{ padding: '20px 0 48px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Option 1 */}
            <div className="fade-up" style={{ background: CARD, border: `1px solid ${BORDER}`, padding: 20 }}>
              <h3 style={{ color: A, fontSize: 14, fontWeight: 700, marginBottom: 12 }}>
                Opção 1: Loadstring via GitHub (recomendado)
              </h3>
              <ol style={{ fontSize: 12, color: '#999', lineHeight: 2, paddingLeft: 18, margin: 0 }}>
                <li>Cria um repositório no GitHub</li>
                <li>Faz upload do script como <code style={{ color: A }}>Medusa.lua</code></li>
                <li>Abre o ficheiro e clica em "Raw" para obter o URL</li>
                <li>Cola no executor:</li>
              </ol>
              <div style={{
                marginTop: 10, padding: 12, background: '#0a0a12',
                border: `1px solid ${BORDER}`, position: 'relative',
                fontFamily: 'Consolas, monospace', fontSize: 12, color: A,
                wordBreak: 'break-all', lineHeight: 1.6,
              }}>
                <code>{LOADSTRING_GH}</code>
                <button onClick={() => copy(LOADSTRING_GH, 'gh')} style={{
                  position: 'absolute', top: 8, right: 8,
                  padding: '3px 10px', fontSize: 10, cursor: 'pointer',
                  background: copied === 'gh' ? `${A}22` : '#ffffff08',
                  color: copied === 'gh' ? A : DIM,
                  border: `1px solid ${copied === 'gh' ? A : BORDER}`,
                  fontFamily: 'inherit', fontWeight: 600,
                }}>{copied === 'gh' ? '✅' : 'Copiar'}</button>
              </div>
            </div>

            {/* Option 2 */}
            <div className="fade-up" style={{
              background: CARD, border: `1px solid ${BORDER}`, padding: 20,
              animationDelay: '80ms',
            }}>
              <h3 style={{ color: A, fontSize: 14, fontWeight: 700, marginBottom: 12 }}>
                Opção 2: Loadstring via Pastebin
              </h3>
              <ol style={{ fontSize: 12, color: '#999', lineHeight: 2, paddingLeft: 18, margin: 0 }}>
                <li>Vai a <span style={{ color: A }}>pastebin.com</span> e cria um novo paste</li>
                <li>Cola o conteúdo completo do script</li>
                <li>Copia o ID do paste (ex: AbCdEfGh)</li>
                <li>Cola no executor:</li>
              </ol>
              <div style={{
                marginTop: 10, padding: 12, background: '#0a0a12',
                border: `1px solid ${BORDER}`, position: 'relative',
                fontFamily: 'Consolas, monospace', fontSize: 12, color: A,
                wordBreak: 'break-all', lineHeight: 1.6,
              }}>
                <code>{LOADSTRING_PB}</code>
                <button onClick={() => copy(LOADSTRING_PB, 'pb')} style={{
                  position: 'absolute', top: 8, right: 8,
                  padding: '3px 10px', fontSize: 10, cursor: 'pointer',
                  background: copied === 'pb' ? `${A}22` : '#ffffff08',
                  color: copied === 'pb' ? A : DIM,
                  border: `1px solid ${copied === 'pb' ? A : BORDER}`,
                  fontFamily: 'inherit', fontWeight: 600,
                }}>{copied === 'pb' ? '✅' : 'Copiar'}</button>
              </div>
            </div>

            {/* Option 3 */}
            <div className="fade-up" style={{
              background: CARD, border: `1px solid ${BORDER}`, padding: 20,
              animationDelay: '160ms',
            }}>
              <h3 style={{ color: A, fontSize: 14, fontWeight: 700, marginBottom: 12 }}>
                Opção 3: Execução direta
              </h3>
              <p style={{ fontSize: 12, color: '#999', lineHeight: 1.7 }}>
                Abre o ficheiro, copia tudo (<code style={{ color: A }}>Ctrl+A → Ctrl+C</code>) e
                cola diretamente na caixa do executor. Carrega Execute.
              </p>
            </div>

            {/* Notes */}
            <div className="fade-up" style={{
              background: CARD, border: `1px solid #f59e0b33`, padding: 20,
              animationDelay: '240ms',
            }}>
              <h3 style={{ color: '#f59e0b', fontSize: 14, fontWeight: 700, marginBottom: 10 }}>
                ⚠️ Notas Importantes
              </h3>
              <ul style={{ fontSize: 12, color: '#999', lineHeight: 2, listStyle: 'none', padding: 0 }}>
                <li>▸ <b style={{ color: TEXT }}>Silent Aim</b> requer <code style={{ color: A }}>hookmetamethod</code></li>
                <li>▸ <b style={{ color: TEXT }}>Trigger Bot</b> usa <code style={{ color: A }}>VirtualInputManager</code> + fallback</li>
                <li>▸ <b style={{ color: TEXT }}>Fullbright</b> guarda lighting original e restaura no eject</li>
                <li>▸ <b style={{ color: TEXT }}>Panic Key (End)</b> desativa TUDO de uma vez</li>
                <li>▸ O script limpa-se sozinho no eject (BodyVelocity, BodyGyro, ESP, etc.)</li>
              </ul>
            </div>
          </div>
        )}

        {/* ─── TAB 3: Compatibility ─── */}
        {tab === 3 && (
          <div style={{ padding: '20px 0 48px' }}>
            <p style={{ fontSize: 13, color: DIM, marginBottom: 18 }}>
              Compatível com os executores mais populares. Silent Aim requer <code style={{ color: A }}>hookmetamethod</code>.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: 6,
            }}>
              {executors.map((name, i) => (
                <div key={name} className="fade-up" style={{
                  padding: '12px 14px',
                  background: CARD, border: `1px solid ${BORDER}`,
                  display: 'flex', alignItems: 'center', gap: 10,
                  animationDelay: `${i * 40}ms`,
                }}>
                  <span style={{
                    width: 8, height: 8, background: '#22c55e', borderRadius: '50%',
                    flexShrink: 0,
                  }} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#ccc' }}>{name}</span>
                  <span style={{ marginLeft: 'auto', fontSize: 10, color: '#22c55e', fontWeight: 600 }}>✓</span>
                </div>
              ))}
            </div>

            {/* Compat table */}
            <div className="fade-up" style={{
              background: CARD, border: `1px solid ${BORDER}`, padding: 20,
              marginTop: 18, animationDelay: '400ms',
            }}>
              <h3 style={{ color: A, fontSize: 14, fontWeight: 700, marginBottom: 12 }}>
                Funcionalidades por Executor
              </h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ color: DIM, borderBottom: `1px solid ${BORDER}` }}>
                      <th style={{ textAlign: 'left', padding: '8px 6px', fontWeight: 600 }}>Feature</th>
                      <th style={{ textAlign: 'center', padding: '8px 6px', fontWeight: 600 }}>Básico</th>
                      <th style={{ textAlign: 'center', padding: '8px 6px', fontWeight: 600 }}>hookmetamethod</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['ESP / Fly / Noclip / Speed', '✅', '—'],
                      ['Aimbot Normal', '✅', '—'],
                      ['Silent Aim', '❌', '✅'],
                      ['Trigger Bot', '⚠️ mouse1click', '✅ VIM'],
                      ['Hitbox Expander', '✅', '—'],
                      ['Player List + Actions', '✅', '—'],
                      ['Crosshair / Watermark', '⚠️ Drawing lib', '✅'],
                      ['Anti-AFK', '✅', '—'],
                    ].map(([feat, basic, hook], i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${BORDER}22`, color: '#999' }}>
                        <td style={{ padding: '7px 6px' }}>{feat}</td>
                        <td style={{ padding: '7px 6px', textAlign: 'center' }}>{basic}</td>
                        <td style={{ padding: '7px 6px', textAlign: 'center' }}>{hook}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ═══════ FOOTER ═══════ */}
      <footer style={{
        textAlign: 'center', padding: '28px 20px',
        borderTop: `1px solid ${BORDER}`,
        marginTop: 'auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <span style={{ fontSize: 15 }}>🐍</span>
          <span style={{ fontSize: 12, color: '#444', fontWeight: 700 }}>MEDUSA v9.0 FINAL</span>
          <span style={{ fontSize: 11, color: '#333' }}>—</span>
          <span style={{ fontSize: 11, color: '#555' }}>Made by .donatorexe.</span>
        </div>
        <p style={{ fontSize: 10, color: '#333', marginTop: 6 }}>
          Apenas para fins educacionais.
        </p>
      </footer>
    </div>
  );
}

/* ═════════════════════════════════════════════════════════════
   FEATURE CARD
   ═════════════════════════════════════════════════════════════ */
function FeatureCard({ cat, col, items, delay }: {
  cat: string; col: string; items: string[]; delay: number;
}) {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="fade-up"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? '#111120' : CARD,
        border: `1px solid ${hover ? col + '55' : BORDER}`,
        padding: 18,
        animationDelay: `${delay}ms`,
        transition: 'all 0.2s',
        cursor: 'default',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <div style={{ width: 3, height: 16, background: col, flexShrink: 0 }} />
        <h3 style={{ color: col, fontSize: 13, fontWeight: 700, flex: 1 }}>{cat}</h3>
        <span style={{
          fontSize: 10, color: DIM, padding: '1px 8px',
          border: `1px solid ${col}33`, background: `${col}08`,
        }}>{items.length}</span>
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {items.map((item, i) => (
          <li key={i} style={{ display: 'flex', gap: 7, fontSize: 12, color: '#999', lineHeight: 1.5 }}>
            <span style={{ color: col, flexShrink: 0, fontSize: 10, marginTop: 2 }}>▸</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
