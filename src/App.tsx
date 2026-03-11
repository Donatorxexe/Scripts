import { useState } from 'react'

function App() {
  const [copied, setCopied] = useState<string | null>(null)

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const loadstringGH = `loadstring(game:HttpGet("https://raw.githubusercontent.com/SEU_USER/SEU_REPO/main/Medusa_v6.lua"))()`
  const loadstringPB = `loadstring(game:HttpGet("https://pastebin.com/raw/XXXXXXXX"))()`

  return (
    <div className="min-h-screen bg-[#0d0d14] text-white font-sans">
      {/* Top accent line */}
      <div className="h-[2px] bg-gradient-to-r from-purple-600 via-purple-400 to-purple-600" />

      {/* Header */}
      <header className="border-b border-[#28283a] bg-[#0a0a12]">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-4xl">🐍</span>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                <span className="text-purple-400">MEDUSA</span>
                <span className="text-[#555570] ml-2 text-lg font-normal">v6.0</span>
              </h1>
              <p className="text-[#555570] text-sm mt-1">
                Made by <span className="text-purple-400 font-semibold">.donatorexe.</span> • Premium Script
              </p>
            </div>
          </div>
          <p className="text-[#888] text-sm mt-3 max-w-2xl">
            300+ UI/GUI improvements • 10 Color Themes • Rectangular Flat Design • 
            Custom Keybinds • Silent Aim + Trigger Bot • Player List with Spectate/Fling/TP
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-6">

        {/* Download */}
        <section className="bg-[#17171b] border border-[#28283a] p-6">
          <h2 className="text-lg font-bold text-purple-400 mb-4 flex items-center gap-2">
            <span>📥</span> Download Script
          </h2>
          <p className="text-[#888] text-sm mb-4">
            Faz download do ficheiro .txt e faz upload para GitHub ou Pastebin. Depois usa o loadstring abaixo.
          </p>
          <a
            href="/Medusa_v6.txt"
            download="Medusa_v6.txt"
            className="inline-block px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-all"
          >
            ⬇ Download Medusa_v6.txt
          </a>
        </section>

        {/* Loadstring */}
        <section className="bg-[#17171b] border border-[#28283a] p-6">
          <h2 className="text-lg font-bold text-purple-400 mb-4 flex items-center gap-2">
            <span>🔗</span> Loadstring
          </h2>

          <div className="space-y-4">
            {/* GitHub */}
            <div>
              <p className="text-xs text-[#666] mb-2 font-semibold uppercase tracking-wider">GitHub Raw</p>
              <div className="flex gap-2">
                <code className="flex-1 bg-[#0d0d14] border border-[#28283a] px-3 py-2 text-xs text-purple-300 font-mono overflow-x-auto">
                  {loadstringGH}
                </code>
                <button
                  onClick={() => copyText(loadstringGH, 'gh')}
                  className="px-3 py-2 bg-[#28283a] hover:bg-purple-600 text-xs font-bold transition-all min-w-[70px]"
                >
                  {copied === 'gh' ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Pastebin */}
            <div>
              <p className="text-xs text-[#666] mb-2 font-semibold uppercase tracking-wider">Pastebin</p>
              <div className="flex gap-2">
                <code className="flex-1 bg-[#0d0d14] border border-[#28283a] px-3 py-2 text-xs text-purple-300 font-mono overflow-x-auto">
                  {loadstringPB}
                </code>
                <button
                  onClick={() => copyText(loadstringPB, 'pb')}
                  className="px-3 py-2 bg-[#28283a] hover:bg-purple-600 text-xs font-bold transition-all min-w-[70px]"
                >
                  {copied === 'pb' ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-[#17171b] border border-[#28283a] p-6">
          <h2 className="text-lg font-bold text-purple-400 mb-4 flex items-center gap-2">
            <span>⚡</span> Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { icon: "👁️", name: "ESP", desc: "Highlight + nametag + distance" },
              { icon: "🎯", name: "Aimbot", desc: "FOV, Smooth, Hit Part, Max Dist" },
              { icon: "🔇", name: "Silent Aim", desc: "Redirect shots without moving camera" },
              { icon: "🔫", name: "Trigger Bot", desc: "Auto-fire when crosshair on enemy" },
              { icon: "✈️", name: "Fly", desc: "WASD + Space/Ctrl, adjustable speed" },
              { icon: "📦", name: "Hitbox", desc: "Expand enemy hitboxes, adjustable" },
              { icon: "🚶", name: "Noclip", desc: "Walk through walls" },
              { icon: "👥", name: "Players", desc: "Spectate, Fling, Teleport to any player" },
              { icon: "🎮", name: "Custom Keybinds", desc: "Rebind every function in-game" },
              { icon: "🎨", name: "10 Themes", desc: "Medusa, Emerald, Ocean, Blood, etc." },
              { icon: "✅", name: "Team Check", desc: "Ignore teammates" },
              { icon: "👀", name: "Visible Check", desc: "Only aim at visible targets" },
              { icon: "❤️", name: "Health Check", desc: "Min HP threshold" },
              { icon: "📷", name: "Spectate", desc: "Watch any player's POV" },
              { icon: "💥", name: "Fling", desc: "Launch players into orbit" },
              { icon: "🏃", name: "Teleport", desc: "TP behind any player" },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-[#0d0d14] border border-[#28283a] hover:border-purple-600/50 transition-all">
                <span className="text-lg">{f.icon}</span>
                <div>
                  <p className="text-sm font-bold text-white">{f.name}</p>
                  <p className="text-xs text-[#666]">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Default Keybinds */}
        <section className="bg-[#17171b] border border-[#28283a] p-6">
          <h2 className="text-lg font-bold text-purple-400 mb-4 flex items-center gap-2">
            <span>⌨️</span> Default Keybinds
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
            {[
              { key: "T", fn: "ESP" },
              { key: "G", fn: "Aimbot" },
              { key: "F", fn: "Fly" },
              { key: "H", fn: "Hitbox" },
              { key: "U", fn: "Noclip" },
              { key: "J", fn: "Silent Aim" },
              { key: "K", fn: "Trigger Bot" },
              { key: "Y", fn: "Toggle GUI" },
              { key: "P", fn: "Eject" },
              { key: "RMB", fn: "Aim Lock" },
            ].map((k, i) => (
              <div key={i} className="text-center p-2 bg-[#0d0d14] border border-[#28283a]">
                <div className="text-purple-400 font-bold text-sm">{k.key}</div>
                <div className="text-[#666] text-xs mt-1">{k.fn}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#555] mt-3">
            Todas as keybinds podem ser reconfiguradas na aba 🎮 Binds dentro do script.
          </p>
        </section>

        {/* Executors */}
        <section className="bg-[#17171b] border border-[#28283a] p-6">
          <h2 className="text-lg font-bold text-purple-400 mb-4 flex items-center gap-2">
            <span>🖥️</span> Executores Compatíveis
          </h2>
          <div className="flex flex-wrap gap-2">
            {["Solara", "Fluxus", "Delta", "Arceus X", "Hydrogen", "Krnl", "Script-Ware", "Synapse X", "Wave"].map((e, i) => (
              <span key={i} className="px-3 py-1.5 bg-[#0d0d14] border border-[#28283a] text-xs text-[#888] font-semibold">
                {e}
              </span>
            ))}
          </div>
        </section>

        {/* UI Preview */}
        <section className="bg-[#17171b] border border-[#28283a] p-6">
          <h2 className="text-lg font-bold text-purple-400 mb-4 flex items-center gap-2">
            <span>🖼️</span> UI Design Preview
          </h2>
          <div className="bg-[#0d0d14] border border-[#28283a] p-4 max-w-sm">
            {/* Mini preview of the UI */}
            <div className="border border-[#28283a] bg-[#11111b]">
              {/* Top bar */}
              <div className="h-1 bg-purple-600" />
              <div className="bg-[#0a0a10] px-3 py-2 flex items-center justify-between border-b border-[#28283a]">
                <div className="flex items-center gap-2">
                  <span className="text-xs">🐍</span>
                  <span className="text-xs font-bold text-white">MEDUSA</span>
                  <span className="text-[8px] text-purple-400 border border-purple-400/50 px-1">v6.0</span>
                </div>
                <div className="flex gap-1">
                  <div className="w-3 h-3 border border-[#28283a] flex items-center justify-center text-[8px] text-[#666]">─</div>
                  <div className="w-3 h-3 border border-[#28283a] flex items-center justify-center text-[8px] text-[#666]">✕</div>
                </div>
              </div>
              {/* Body with sidebar */}
              <div className="flex">
                <div className="w-8 bg-[#0a0a10] border-r border-[#28283a] py-2 space-y-1">
                  {["📊", "⚙️", "🎯", "👥", "⚡", "🎮", "🎨"].map((icon, i) => (
                    <div key={i} className={`text-center text-[8px] py-1 ${i === 0 ? 'border-l-2 border-purple-500' : ''}`}>
                      {icon}
                    </div>
                  ))}
                </div>
                <div className="flex-1 p-2 space-y-1">
                  <div className="text-[8px] text-purple-400 font-bold">MODULE STATUS</div>
                  <div className="grid grid-cols-2 gap-1">
                    {["ESP ON", "Aim OFF", "Fly OFF", "Noclip OFF"].map((s, i) => (
                      <div key={i} className="bg-[#0a0a10] border border-[#28283a] px-1 py-0.5 text-[7px] text-[#666]">
                        <span className={`inline-block w-1 h-1 mr-1 ${i === 0 ? 'bg-green-500' : 'bg-gray-600'}`} />
                        {s}
                      </div>
                    ))}
                  </div>
                  <div className="text-[8px] text-purple-400 font-bold mt-2">TARGET LOCK</div>
                  <div className="bg-[#190f28] border border-[#28283a] p-1">
                    <div className="text-[8px] text-purple-400 font-bold flex items-center gap-1">
                      <span className="w-1 h-1 bg-purple-400 inline-block" /> No Target
                    </div>
                    <div className="text-[7px] text-[#555]">Hold RMB to lock</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#28283a] py-6 text-center">
          <p className="text-sm text-[#555]">
            🐍 <span className="text-purple-400 font-bold">Medusa v6.0</span> — Made by{' '}
            <span className="text-purple-400 font-semibold">.donatorexe.</span>
          </p>
          <p className="text-xs text-[#444] mt-2">
            300+ UI improvements • Rectangular flat design • All features functional
          </p>
        </footer>
      </main>
    </div>
  )
}

export default App
