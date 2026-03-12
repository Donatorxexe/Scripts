import { useState } from 'react';
import scriptRaw from '../Medusa_v9.txt?raw';

const C = {
  accent: '#00d4aa',
  bg: '#06060c',
  card: '#0c0c16',
  border: '#18182a',
  text: '#e4e4eb',
  dim: '#66667a',
  hover: '#10101e',
};

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

const LOADSTRING_GH = 'loadstring(game:HttpGet("https://raw.githubusercontent.com/USER/REPO/main/Medusa.lua"))()';
const LOADSTRING_PB = 'loadstring(game:HttpGet("https://pastebin.com/raw/XXXXXXXX"))()';

const features = [
  { cat: 'Aimbot', icon: '🎯', color: '#a855f7', items: [
    'Aimbot Normal — Smooth 0-100, RMB lock, FOV circle',
    'Silent Aim — hookmetamethod redireciona mouse.Hit/Target e Raycasts',
    'Trigger Bot — Auto-fire com VIM + mouse1click fallback',
    'Team Check — ignora mesma equipa',
    'Visible Check — Raycast para verificar visibilidade',
    'Health Check — só mira em alvos com HP > mínimo',
    'Hit Part: Head / Torso / Closest',
    'Max Distance slider 50-2000 studs',
    'FOV Radius configurável 50-500',
    'Aim Smooth 0 (snap) a 100 (legit)',
  ]},
  { cat: 'Visuals', icon: '👁️', color: '#3b82f6', items: [
    'ESP Highlights com cores personalizáveis',
    'ESP Nomes + Distância em BillboardGui',
    'ESP HP Bars — barra de vida sobre cada jogador',
    'ESP Distance Filter 50-5000 studs',
    'ESP Auto-Refresh com timer visual',
    'Crosshair — 4 estilos: Cross, Dot, Circle, T-Cross',
    'Crosshair Size e Gap ajustáveis',
    'Target HUD — Nome + HP bar + Distância do alvo lockado',
    'Watermark — MEDUSA v10.0 | FPS | Ping',
    'Kill Feed — Últimas 8 kills com timestamp',
  ]},
  { cat: 'Movement', icon: '⚡', color: '#f59e0b', items: [
    'Fly — WASD + Space/Ctrl, speed 50-300',
    'Noclip — Atravessa paredes e objetos',
    'Speed Hack — WalkSpeed 16-200 com slider',
    'Infinite Jump — Pula ilimitadamente no ar',
    'Click TP — Segura B + clica para teleportar ao cursor',
    'TP to Cursor — RShift teleporta ao mouse instantaneamente',
    'No Fall Damage — Cancela ragdoll e dano de queda',
    'Re-apply automático no respawn (Fly, Speed, Noclip)',
  ]},
  { cat: 'Combat', icon: '🔧', color: '#ef4444', items: [
    'Hitbox Expander — 1x a 25x em todas as body parts',
    'Hitbox Transparency ajustável 0-100%',
    'Trigger FOV 5-100px — raio para trigger bot',
    'Trigger Delay 0.01s-1s entre disparos automáticos',
    'Hitbox refresh rate configurável',
  ]},
  { cat: 'World', icon: '🌍', color: '#22c55e', items: [
    'Fullbright — Remove fog, shadows, aumenta brightness',
    'Restaura lighting original no eject',
    'Anti-AFK — VirtualUser impede kick por inatividade',
    'Server Hop — Busca servidor via API e teleporta',
  ]},
  { cat: 'Players', icon: '👥', color: '#06b6d4', items: [
    'Lista completa com DisplayName e @Username',
    'HP bar colorida por jogador (verde/amarelo/vermelho)',
    'Spectate — vê pela câmara de outro jogador',
    'Unspectate — volta à tua câmara',
    'Fling — aplica velocity massiva ao alvo',
    'Teleport To — TP 3 studs atrás do jogador',
    'Auto-refresh da lista cada 3 segundos',
    'Auto-cleanup quando jogador sai',
  ]},
  { cat: 'GUI Editor', icon: '🎨', color: '#ec4899', items: [
    '12 Temas de cor + Rainbow Mode automático',
    'Panel Width editável em tempo real',
    'Panel Height editável em tempo real',
    'Sidebar Width ajustável',
    'Topbar Height ajustável',
    'Font Size global editável',
    'Title Size editável',
    'Card Spacing configurável',
    'Border Thickness ajustável',
    'Toggle Size / Slider Size / Button Height editáveis',
    'Panel Opacity 0-100%',
    'Temas: Medusa, Emerald, Ocean, Blood, Amber, Mint, Rose, Sky, Lime, Frost, Gold, Cyber',
  ]},
  { cat: 'Stream Proof', icon: '🔒', color: '#22d3ee', items: [
    'Stream Proof — Esconde GUI do OBS/Discord/ShareScreen',
    '4 métodos de fallback: gethui() → getgenv().gethui → protect_gui+CoreGui → cloneref',
    'Toggle ON/OFF com F2 ou switch na aba Extras',
    'Notificações também respeitam Stream Proof',
    'Watermark e Target HUD movidos junto com o painel',
    'Se executor não suporta, avisa automaticamente',
    'Desativa automaticamente com Panic Key',
  ]},
  { cat: 'Keybinds', icon: '🎮', color: '#8b5cf6', items: [
    '16 keybinds editáveis na UI do jogo',
    'Clica no botão e pressiona a nova tecla',
    'Reset All to Default com um clique',
    'Panic Key (End) — desativa TUDO de uma vez',
    'Eject (P) — cleanup total e remove script',
    'Toggle GUI (Y) — esconde/mostra painel',
  ]},
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
  ['F2', 'Stream Proof', '🔒'],
  ['End', 'Panic Key', '🚨'],
];

const executors = [
  { name: 'Solara', level: 'full' },
  { name: 'Fluxus', level: 'full' },
  { name: 'Delta', level: 'full' },
  { name: 'Hydrogen', level: 'full' },
  { name: 'KRNL', level: 'full' },
  { name: 'Arceus X', level: 'partial' },
  { name: 'Codex', level: 'full' },
  { name: 'Synapse', level: 'full' },
  { name: 'Script-Ware', level: 'full' },
  { name: 'Wave', level: 'full' },
];

export default function App() {
  const [tab, setTab] = useState(0);
  const [copied, setCopied] = useState('');

  const doCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(''), 2000);
    });
  };

  const tabs = ['Features', 'Keybinds', 'Como Usar', 'Compatibilidade'];
  const totalFeatures = features.reduce((s, f) => s + f.items.length, 0);

  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.text }}>

      {/* ══════════════════ HERO ══════════════════ */}
      <div style={{
        borderBottom: `1px solid ${C.border}`,
        padding: '40px 20px 36px',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 200, pointerEvents: 'none',
          background: `radial-gradient(ellipse at 50% 0%, ${C.accent}15 0%, transparent 70%)`,
        }} />

        <div style={{ maxWidth: 960, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
            <div style={{
              width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28, border: `1px solid ${C.accent}33`, background: `${C.accent}0a`,
            }}>🐍</div>
            <div>
              <h1 style={{ fontSize: 36, fontWeight: 900, color: C.accent, letterSpacing: -2, lineHeight: 1 }}>MEDUSA</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 5, flexWrap: 'wrap' }}>
                <span className="mono" style={{
                  padding: '2px 8px', fontSize: 10, fontWeight: 700,
                  background: `${C.accent}12`, color: C.accent, border: `1px solid ${C.accent}33`,
                }}>v10.0 FINAL</span>
                <span style={{ fontSize: 11, color: C.dim }}>Made by</span>
                <span style={{ fontSize: 11, color: C.accent, fontWeight: 700 }}>.donatorexe.</span>
              </div>
            </div>
          </div>

          <p style={{ fontSize: 13, color: '#777', lineHeight: 1.7, maxWidth: 600, margin: '8px 0 18px' }}>
            Script Roblox completo — Aimbot, Silent Aim, Trigger Bot, ESP, Fly, Speed,
            Player List, Hitbox, Crosshair, 12 temas, 16 keybinds editáveis, GUI ultra-personalizável.
          </p>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
            {[
              [totalFeatures, 'Features'],
              [16, 'Keybinds'],
              [12, 'Temas'],
              [8, 'Abas'],
              ['~2K', 'Linhas'],
            ].map(([v, l]) => (
              <div key={String(l)} style={{
                padding: '7px 14px', background: C.card, border: `1px solid ${C.border}`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1,
              }}>
                <span style={{ fontSize: 16, fontWeight: 800, color: C.accent }}>{String(v)}</span>
                <span style={{ fontSize: 8, color: C.dim, textTransform: 'uppercase', letterSpacing: 1 }}>{String(l)}</span>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button
              onClick={() => doCopy(LOADSTRING_GH, 'main')}
              style={{
                padding: '10px 20px', fontSize: 12, fontWeight: 700, cursor: 'pointer',
                background: C.accent, color: '#000', border: 'none', fontFamily: 'inherit',
              }}
            >
              {copied === 'main' ? '✅ Copiado!' : '📋 Copiar Loadstring'}
            </button>
            <button
              onClick={downloadScript}
              style={{
                padding: '10px 20px', fontSize: 12, fontWeight: 700, cursor: 'pointer',
                background: '#22c55e', color: '#000', border: 'none', fontFamily: 'inherit',
              }}
            >
              ⬇️ Download .txt
            </button>
            <button
              onClick={() => setTab(2)}
              style={{
                padding: '10px 20px', fontSize: 12, fontWeight: 700, cursor: 'pointer',
                background: 'transparent', color: C.accent, border: `1px solid ${C.accent}44`,
                fontFamily: 'inherit',
              }}
            >
              📖 Como Usar
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════ TABS ══════════════════ */}
      <div style={{
        maxWidth: 960, margin: '0 auto', padding: '0 20px',
      }}>
        <div style={{
          display: 'flex', borderBottom: `1px solid ${C.border}`, marginTop: 20,
          overflowX: 'auto',
        }}>
          {tabs.map((t, i) => (
            <button key={t} onClick={() => setTab(i)} style={{
              padding: '11px 18px', fontSize: 12, fontWeight: 600,
              cursor: 'pointer', fontFamily: 'inherit',
              background: tab === i ? `${C.accent}08` : 'transparent',
              color: tab === i ? C.accent : C.dim,
              border: 'none',
              borderBottom: tab === i ? `2px solid ${C.accent}` : '2px solid transparent',
              whiteSpace: 'nowrap',
            }}>{t}</button>
          ))}
        </div>
      </div>

      {/* ══════════════════ CONTENT ══════════════════ */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '20px 20px 60px' }}>

        {/* ─── Features ─── */}
        {tab === 0 && (
          <div>
            <p style={{ fontSize: 12, color: C.dim, marginBottom: 16 }}>
              {totalFeatures} funcionalidades auditadas e 100% funcionais.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {features.map((f) => (
                <div key={f.cat} style={{
                  background: C.card, border: `1px solid ${C.border}`, padding: '16px 18px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                    <span style={{ fontSize: 16 }}>{f.icon}</span>
                    <span style={{ color: f.color, fontSize: 13, fontWeight: 700, flex: 1 }}>{f.cat}</span>
                    <span className="mono" style={{
                      fontSize: 10, color: C.dim, padding: '1px 6px',
                      border: `1px solid ${f.color}33`, background: `${f.color}08`,
                    }}>{f.items.length}</span>
                  </div>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
                    gap: '4px 20px',
                  }}>
                    {f.items.map((item, j) => (
                      <div key={j} style={{
                        display: 'flex', gap: 6, fontSize: 11, color: '#888', lineHeight: 1.5,
                        padding: '3px 0',
                      }}>
                        <span style={{ color: f.color, flexShrink: 0, fontSize: 8, marginTop: 3 }}>●</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── Keybinds ─── */}
        {tab === 1 && (
          <div>
            <p style={{ fontSize: 12, color: C.dim, marginBottom: 4 }}>
              Todas editáveis na aba <span style={{ color: C.accent, fontWeight: 600 }}>Binds</span> do jogo.
              Clica no botão e pressiona a nova tecla.
            </p>
            <p style={{ fontSize: 11, color: '#444', marginBottom: 16 }}>
              RMB (botão direito do rato) ativa o aim lock quando o Aimbot está ON.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
              gap: 4,
            }}>
              {binds.map(([key, action, icon]) => (
                <div key={action} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '9px 14px', background: C.card, border: `1px solid ${C.border}`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 13, width: 18, textAlign: 'center' }}>{icon}</span>
                    <span style={{ fontSize: 12, color: '#aaa' }}>{action}</span>
                  </div>
                  <span className="mono" style={{
                    padding: '2px 10px', fontSize: 11, fontWeight: 700,
                    background: `${C.accent}10`, color: C.accent, border: `1px solid ${C.accent}33`,
                  }}>{key}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── Como Usar ─── */}
        {tab === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

            {/* GitHub */}
            <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: '18px 18px' }}>
              <h3 style={{ color: C.accent, fontSize: 13, fontWeight: 700, marginBottom: 10 }}>
                Opção 1: GitHub (recomendado)
              </h3>
              <ol style={{ fontSize: 11, color: '#888', lineHeight: 2.2, paddingLeft: 16, margin: 0 }}>
                <li>Cria um repositório no GitHub</li>
                <li>Faz upload do script como <code className="mono" style={{ color: C.accent }}>Medusa.lua</code></li>
                <li>Abre o ficheiro e clica em <b style={{ color: C.text }}>"Raw"</b> para obter o URL</li>
                <li>Cola no executor:</li>
              </ol>
              <div style={{
                marginTop: 8, padding: '10px 12px', background: '#08080e',
                border: `1px solid ${C.border}`, position: 'relative',
                wordBreak: 'break-all',
              }}>
                <code className="mono" style={{ fontSize: 11, color: C.accent, lineHeight: 1.5 }}>{LOADSTRING_GH}</code>
                <button onClick={() => doCopy(LOADSTRING_GH, 'gh')} style={{
                  position: 'absolute', top: 6, right: 6,
                  padding: '3px 10px', fontSize: 10, cursor: 'pointer',
                  background: copied === 'gh' ? `${C.accent}20` : '#ffffff06',
                  color: copied === 'gh' ? C.accent : C.dim,
                  border: `1px solid ${copied === 'gh' ? C.accent : C.border}`,
                  fontFamily: 'inherit', fontWeight: 600,
                }}>{copied === 'gh' ? '✅' : 'Copiar'}</button>
              </div>
            </div>

            {/* Pastebin */}
            <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: '18px 18px' }}>
              <h3 style={{ color: C.accent, fontSize: 13, fontWeight: 700, marginBottom: 10 }}>
                Opção 2: Pastebin
              </h3>
              <ol style={{ fontSize: 11, color: '#888', lineHeight: 2.2, paddingLeft: 16, margin: 0 }}>
                <li>Vai a <span style={{ color: C.accent }}>pastebin.com</span> e cria um novo paste</li>
                <li>Cola todo o conteúdo do script</li>
                <li>Copia o ID do paste (ex: AbCdEfGh)</li>
                <li>Cola no executor:</li>
              </ol>
              <div style={{
                marginTop: 8, padding: '10px 12px', background: '#08080e',
                border: `1px solid ${C.border}`, position: 'relative',
                wordBreak: 'break-all',
              }}>
                <code className="mono" style={{ fontSize: 11, color: C.accent, lineHeight: 1.5 }}>{LOADSTRING_PB}</code>
                <button onClick={() => doCopy(LOADSTRING_PB, 'pb')} style={{
                  position: 'absolute', top: 6, right: 6,
                  padding: '3px 10px', fontSize: 10, cursor: 'pointer',
                  background: copied === 'pb' ? `${C.accent}20` : '#ffffff06',
                  color: copied === 'pb' ? C.accent : C.dim,
                  border: `1px solid ${copied === 'pb' ? C.accent : C.border}`,
                  fontFamily: 'inherit', fontWeight: 600,
                }}>{copied === 'pb' ? '✅' : 'Copiar'}</button>
              </div>
            </div>

            {/* Direto */}
            <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: '18px 18px' }}>
              <h3 style={{ color: C.accent, fontSize: 13, fontWeight: 700, marginBottom: 10 }}>
                Opção 3: Colar direto
              </h3>
              <p style={{ fontSize: 11, color: '#888', lineHeight: 1.8 }}>
                Abre o ficheiro <code className="mono" style={{ color: C.accent }}>Medusa_v9.txt</code>, seleciona
                tudo (<code className="mono" style={{ color: C.accent }}>Ctrl+A</code> → <code className="mono" style={{ color: C.accent }}>Ctrl+C</code>)
                e cola na caixa de texto do teu executor. Carrega <b style={{ color: C.text }}>Execute</b>.
              </p>
            </div>

            {/* Notas */}
            <div style={{ background: C.card, border: `1px solid #f59e0b33`, padding: '18px 18px' }}>
              <h3 style={{ color: '#f59e0b', fontSize: 13, fontWeight: 700, marginBottom: 10 }}>
                ⚠️ Notas Importantes
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  ['Silent Aim', 'requer hookmetamethod (Synapse, Script-Ware, etc.)'],
                  ['Trigger Bot', 'usa VirtualInputManager + mouse1click() como fallback'],
                  ['Fullbright', 'guarda lighting original e restaura no eject'],
                  ['Panic Key (End)', 'desativa TODAS as funções de uma vez'],
                  ['Eject', 'limpa BodyVelocity, BodyGyro, ESP, GUI — tudo'],
                  ['Health Check', 'verifica (Health/MaxHealth)*100 > mínimo definido'],
                ].map(([feat, desc]) => (
                  <div key={feat} style={{ display: 'flex', gap: 6, fontSize: 11, color: '#888' }}>
                    <span style={{ color: '#f59e0b', flexShrink: 0 }}>▸</span>
                    <span><b style={{ color: C.text }}>{feat}</b> — {desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── Compatibilidade ─── */}
        {tab === 3 && (
          <div>
            <p style={{ fontSize: 12, color: C.dim, marginBottom: 16 }}>
              Testado nos executores mais populares. Silent Aim requer <code className="mono" style={{ color: C.accent }}>hookmetamethod</code>.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))',
              gap: 4, marginBottom: 18,
            }}>
              {executors.map((ex) => (
                <div key={ex.name} style={{
                  padding: '10px 14px', background: C.card, border: `1px solid ${C.border}`,
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <span style={{
                    width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
                    background: ex.level === 'full' ? '#22c55e' : '#f59e0b',
                  }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#bbb', flex: 1 }}>{ex.name}</span>
                  <span style={{
                    fontSize: 9, fontWeight: 600,
                    color: ex.level === 'full' ? '#22c55e' : '#f59e0b',
                  }}>{ex.level === 'full' ? 'FULL' : 'PARCIAL'}</span>
                </div>
              ))}
            </div>

            {/* Tabela de compatibilidade */}
            <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: '16px 18px' }}>
              <h3 style={{ color: C.accent, fontSize: 13, fontWeight: 700, marginBottom: 12 }}>
                Funcionalidades por nível de executor
              </h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', fontSize: 11, borderCollapse: 'collapse', minWidth: 400 }}>
                  <thead>
                    <tr style={{ color: C.dim, borderBottom: `1px solid ${C.border}` }}>
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
                      ['Crosshair / Watermark', '⚠️ Drawing', '✅'],
                      ['Anti-AFK', '✅', '—'],
                      ['Infinite Jump / No Fall', '✅', '—'],
                      ['Click TP / TP to Cursor', '✅', '—'],
                      ['Server Hop', '✅', '—'],
                      ['Stream Proof', '⚠️ gethui', '✅'],
                      ['GUI Editor / Keybinds', '✅', '—'],
                    ].map(([feat, basic, hook], i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${C.border}22`, color: '#888' }}>
                        <td style={{ padding: '6px', fontSize: 11 }}>{feat}</td>
                        <td style={{ padding: '6px', textAlign: 'center', fontSize: 11 }}>{basic}</td>
                        <td style={{ padding: '6px', textAlign: 'center', fontSize: 11 }}>{hook}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ══════════════════ FOOTER ══════════════════ */}
      <div style={{
        textAlign: 'center', padding: '24px 20px',
        borderTop: `1px solid ${C.border}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <span style={{ fontSize: 14 }}>🐍</span>
          <span style={{ fontSize: 11, color: '#333', fontWeight: 700 }}>MEDUSA v10.0</span>
          <span style={{ fontSize: 10, color: '#282828' }}>—</span>
          <span style={{ fontSize: 10, color: '#444' }}>Made by .donatorexe.</span>
        </div>
        <p style={{ fontSize: 9, color: '#282828', marginTop: 4 }}>
          Apenas para fins educacionais.
        </p>
      </div>
    </div>
  );
}
