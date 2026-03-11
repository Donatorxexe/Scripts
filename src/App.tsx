import { useState } from 'react';

const features = [
  { cat: "🎯 Aimbot", items: ["Aimbot Normal (Smooth 0-100)", "Silent Aim (hookmetamethod)", "Trigger Bot (Auto-fire + delay)", "Team Check toggle", "Visible Check (Raycast)", "Health Check (Min HP% funcional)", "Hit Part (Head/Torso/Closest)", "Max Distance (50-2000)", "FOV Circle animado"] },
  { cat: "👁️ Visuals", items: ["ESP Highlights + Names + Distance", "ESP Health Bars", "ESP Distance Filter", "Crosshair (Cross/Dot/Circle/T-Cross)", "Target HUD (nome+HP+dist)", "Watermark (FPS/Ping)", "Kill Feed (últimas 8)"] },
  { cat: "⚡ Movement", items: ["Fly (WASD + Space/Ctrl)", "Noclip", "Speed Hack (16-200)", "Infinite Jump", "TP to Cursor (RShift)", "Click TP (B+click)"] },
  { cat: "🔧 Combat", items: ["Hitbox Expander (1-25x)", "Hitbox Transparency", "Trigger FOV + Delay ajustáveis"] },
  { cat: "🌍 World", items: ["Fullbright (restaura original)", "Anti-AFK (VirtualUser)", "No Fall Damage", "Server Hop"] },
  { cat: "👥 Players", items: ["Player List + HP Bars", "Spectate / Unspectate", "Fling (velocity-based)", "Teleport To (3 studs atrás)", "Auto-cleanup on leave"] },
  { cat: "🎨 Customize", items: ["12 Color Themes + Rainbow Mode", "Panel Width/Height editável", "Panel Opacity slider", "16 Rebindable Keybinds + Reset", "Auto re-apply on respawn"] },
  { cat: "🛡️ Safety", items: ["Panic Key (End) — desativa tudo", "Eject limpo (restaura lighting)", "Auto-cleanup de BodyVelocity/Gyro", "Original lighting saved/restored"] },
];

const binds = [
  ["T", "ESP"], ["G", "Aimbot"], ["J", "Silent Aim"], ["K", "Trigger Bot"],
  ["F", "Fly"], ["H", "Hitbox"], ["U", "Noclip"], ["M", "Speed"],
  ["N", "Inf Jump"], ["L", "Fullbright"], ["B", "Click TP"], ["V", "No Fall Dmg"],
  ["RShift", "TP to Cursor"], ["Y", "Toggle GUI"], ["P", "Eject"],
  ["End", "Panic Key"], ["RMB", "Aim Lock"],
];

export default function App() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'features' | 'binds' | 'howto'>('features');

  const loadstringExample = `loadstring(game:HttpGet("https://raw.githubusercontent.com/USER/REPO/main/Medusa_v8_Final.txt"))()`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen" style={{ background: '#0a0a10' }}>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ borderBottom: '1px solid #1a1a2e' }}>
        <div className="absolute inset-0 opacity-20" style={{
          background: 'radial-gradient(ellipse at 50% 0%, #00d4aa22 0%, transparent 60%)'
        }} />
        <div className="max-w-4xl mx-auto px-6 py-16 relative">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">🐍</span>
            <div>
              <h1 className="text-4xl font-black tracking-tight" style={{ color: '#00d4aa' }}>
                MEDUSA
              </h1>
              <div className="flex items-center gap-3 mt-1">
                <span className="px-2 py-0.5 text-xs font-bold" style={{
                  background: '#00d4aa22', color: '#00d4aa', border: '1px solid #00d4aa44'
                }}>v9.0</span>
                <span className="text-sm" style={{ color: '#666' }}>Made by .donatorexe.</span>
              </div>
            </div>
          </div>
          <p className="text-lg mt-4" style={{ color: '#888' }}>
            Script Roblox completo — Aimbot, Silent Aim, Trigger Bot, ESP, Fly, Speed, Click TP,
            No Fall Damage, Player List, 12 temas, 16 keybinds configuráveis. Tudo auditado e funcional.
          </p>
          <div className="flex gap-3 mt-6 flex-wrap">
            <button onClick={() => copyToClipboard(loadstringExample)}
              className="px-6 py-3 font-bold text-sm transition-all hover:brightness-110 cursor-pointer"
              style={{ background: '#00d4aa', color: '#000' }}>
              {copied ? '✅ Copiado!' : '📋 Copiar Loadstring'}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex gap-0 mt-8" style={{ borderBottom: '1px solid #1a1a2e' }}>
          {(['features', 'binds', 'howto'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className="px-5 py-3 text-sm font-bold transition-all cursor-pointer"
              style={{
                color: activeTab === tab ? '#00d4aa' : '#555',
                borderBottom: activeTab === tab ? '2px solid #00d4aa' : '2px solid transparent',
                background: activeTab === tab ? '#00d4aa08' : 'transparent',
              }}>
              {tab === 'features' ? '⚡ Features' : tab === 'binds' ? '🎮 Keybinds' : '📖 Como Usar'}
            </button>
          ))}
        </div>

        {/* Features Tab */}
        {activeTab === 'features' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-8">
            {features.map(f => (
              <div key={f.cat} className="p-4" style={{ background: '#12121a', border: '1px solid #1a1a2e' }}>
                <h3 className="font-bold text-sm mb-3" style={{ color: '#00d4aa' }}>{f.cat}</h3>
                <ul className="space-y-1.5">
                  {f.items.map(item => (
                    <li key={item} className="text-xs flex items-start gap-2" style={{ color: '#999' }}>
                      <span style={{ color: '#00d4aa' }}>▸</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Binds Tab */}
        {activeTab === 'binds' && (
          <div className="py-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {binds.map(([key, action]) => (
                <div key={action} className="flex items-center justify-between p-3"
                  style={{ background: '#12121a', border: '1px solid #1a1a2e' }}>
                  <span className="text-xs" style={{ color: '#999' }}>{action}</span>
                  <span className="px-2 py-1 text-xs font-mono font-bold"
                    style={{ background: '#00d4aa15', color: '#00d4aa', border: '1px solid #00d4aa33' }}>
                    {key}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs mt-4" style={{ color: '#555' }}>
              Todas as 16 keybinds são editáveis na aba "Binds" dentro do script. Clica no botão da bind e carrega na nova tecla.
            </p>
          </div>
        )}

        {/* How to Tab */}
        {activeTab === 'howto' && (
          <div className="py-8 space-y-6">
            <div className="p-4" style={{ background: '#12121a', border: '1px solid #1a1a2e' }}>
              <h3 className="font-bold text-sm mb-3" style={{ color: '#00d4aa' }}>Opção 1: Loadstring (recomendado)</h3>
              <ol className="space-y-2 text-xs" style={{ color: '#999' }}>
                <li>1. Faz upload do ficheiro .txt para GitHub ou Pastebin</li>
                <li>2. Copia o URL RAW do ficheiro</li>
                <li>3. Cola no executor:</li>
              </ol>
              <div className="mt-3 p-3 font-mono text-xs relative group" style={{ background: '#0a0a12', border: '1px solid #1a1a2e' }}>
                <code style={{ color: '#00d4aa' }}>{loadstringExample}</code>
                <button onClick={() => copyToClipboard(loadstringExample)}
                  className="absolute top-2 right-2 px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  style={{ background: '#00d4aa22', color: '#00d4aa' }}>
                  Copiar
                </button>
              </div>
            </div>
            <div className="p-4" style={{ background: '#12121a', border: '1px solid #1a1a2e' }}>
              <h3 className="font-bold text-sm mb-3" style={{ color: '#00d4aa' }}>Opção 2: Direto</h3>
              <p className="text-xs" style={{ color: '#999' }}>
                Faz download do ficheiro .txt, abre-o, copia todo o conteúdo e cola directamente no executor.
              </p>
            </div>
            <div className="p-4" style={{ background: '#12121a', border: '1px solid #1a1a2e' }}>
              <h3 className="font-bold text-sm mb-3" style={{ color: '#00d4aa' }}>Executores compatíveis</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {["Solara", "Fluxus", "Delta", "Hydrogen", "KRNL", "Arceus X", "Codex", "Synapse", "Script-Ware", "Wave"].map(e => (
                  <span key={e} className="px-2 py-1 text-xs" style={{ background: '#00d4aa10', color: '#00d4aa', border: '1px solid #00d4aa22' }}>{e}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center py-12 mt-8" style={{ borderTop: '1px solid #1a1a2e' }}>
        <p className="text-xs" style={{ color: '#333' }}>
          🐍 MEDUSA v9.0 — Made by .donatorexe.
        </p>
      </div>
    </div>
  );
}
