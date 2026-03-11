import { useState } from 'react';

const features = [
  { icon: '🎯', name: 'Aimbot', desc: 'Mira automática com Team, Visible & Health Check', color: '#a855f7' },
  { icon: '🔇', name: 'Silent Aim', desc: 'Redireciona tiros sem mover a câmara', color: '#ffa500' },
  { icon: '🔫', name: 'Trigger Bot', desc: 'Dispara automático ao passar mira no inimigo', color: '#ff3264' },
  { icon: '👥', name: 'Players Tab', desc: 'Lista jogadores com Spectate, Fling e TP', color: '#64c8ff' },
  { icon: '👁️', name: 'ESP', desc: 'Wallhack com nome, distância e HP', color: '#22c55e' },
  { icon: '✈️', name: 'Fly', desc: 'Voar livremente com velocidade ajustável', color: '#3b82f6' },
  { icon: '📦', name: 'Hitbox Expander', desc: 'Aumenta hitboxes dos inimigos', color: '#f59e0b' },
  { icon: '🚶', name: 'Noclip', desc: 'Atravessa paredes e objetos', color: '#22c55e' },
];

const playerFeatures = [
  { icon: '📷', name: 'Spectate', desc: 'Vê o jogo pela perspetiva de outro jogador' },
  { icon: '📷', name: 'Unspectate', desc: 'Volta à tua própria câmara' },
  { icon: '💥', name: 'Fling', desc: 'Atira o jogador pelos ares com velocidade' },
  { icon: '🏃', name: 'Teleport (TP)', desc: 'Teleporta-te para a posição do jogador' },
];

const aimbotSettings = [
  { name: 'Team Check', desc: 'Ignora jogadores da mesma equipa' },
  { name: 'Visible Check', desc: 'Só mira em alvos visíveis (sem paredes)' },
  { name: 'Health Check', desc: 'Só mira em alvos com saúde mínima' },
  { name: 'Hit Part', desc: 'Head / Torso / Closest (parte mais perto do cursor)' },
  { name: 'Max Distance', desc: 'Distância máxima de atuação do aimbot' },
  { name: 'FOV Radius', desc: 'Raio do campo de visão para detetar alvos' },
  { name: 'Aim Smooth', desc: '0 = snap instantâneo, 100 = muito suave (legit)' },
  { name: 'Trigger Delay', desc: 'Delay entre cada disparo automático do Trigger Bot' },
];

const hotkeys = [
  { key: 'T', action: 'ESP' },
  { key: 'G', action: 'Aimbot' },
  { key: 'F', action: 'Fly' },
  { key: 'H', action: 'Hitbox' },
  { key: 'U', action: 'Noclip' },
  { key: 'J', action: 'Silent Aim' },
  { key: 'K', action: 'Trigger Bot' },
  { key: 'Y', action: 'Toggle GUI' },
  { key: 'P', action: 'Eject' },
  { key: 'RMB', action: 'Lock Target' },
];

const executors = ['Synapse X', 'Script-Ware', 'Fluxus', 'Hydrogen', 'Delta', 'Solara', 'Arceus X', 'Krnl'];

function App() {
  const [copied, setCopied] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'aimbot' | 'players' | 'loadstring'>('overview');

  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const loadstringGithub = `loadstring(game:HttpGet("https://raw.githubusercontent.com/SEU_USER/SEU_REPO/main/Utilities_v5.txt"))()`;
  const loadstringPastebin = `loadstring(game:HttpGet("https://pastebin.com/raw/XXXXXXXX"))()`;

  return (
    <div className="min-h-screen bg-[#0a0a10] text-white overflow-x-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-400 to-purple-500 flex items-center justify-center text-2xl shadow-lg shadow-teal-500/20">
              ⚡
            </div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-teal-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              UTILITIES v5.0
            </h1>
          </div>
          <p className="text-gray-400 text-lg mb-2">v5.0 — Rectangular UI + Keybind Selector</p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold">SILENT AIM</span>
            <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold">TRIGGER BOT</span>
            <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold">PLAYERS TAB</span>
            <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold">7 TABS</span>
            <span className="px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-bold">8 THEMES</span>
            <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold">KEYBIND SELECTOR</span>
          </div>
        </header>

        {/* Tab navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white/5 backdrop-blur-sm rounded-2xl p-1.5 border border-white/10">
            {(['overview', 'aimbot', 'players', 'loadstring'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-teal-500/20 text-teal-400 shadow-lg shadow-teal-500/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab === 'overview' && '📊 Overview'}
                {tab === 'aimbot' && '🎯 Aimbot'}
                {tab === 'players' && '👥 Players'}
                {tab === 'loadstring' && '📥 Loadstring'}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            {/* Features grid */}
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="text-teal-400">✨</span> Todas as Funcionalidades
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((f, i) => (
                  <div
                    key={i}
                    className="group p-5 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] hover:border-white/15 transition-all duration-300 hover:bg-white/[0.06] hover:scale-[1.02] hover:shadow-lg"
                    style={{ '--glow-color': f.color } as React.CSSProperties}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">{f.icon}</span>
                      <div>
                        <h3 className="font-bold text-lg" style={{ color: f.color }}>{f.name}</h3>
                        <p className="text-gray-400 text-sm mt-1">{f.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Hotkeys */}
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="text-purple-400">⌨️</span> Hotkeys
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {hotkeys.map((h, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center hover:bg-white/[0.06] transition-all">
                    <kbd className="inline-block px-3 py-1.5 rounded-lg bg-white/10 font-mono font-bold text-teal-400 text-sm mb-1">
                      {h.key}
                    </kbd>
                    <p className="text-gray-400 text-xs">{h.action}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* UI Features */}
            <section className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/5 to-teal-500/5 border border-white/[0.06]">
              <h2 className="text-xl font-bold mb-4 text-purple-400">🎨 Design & UI</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-300">
                {[
                  'Glassmorphism Soft UI Design',
                  'Animações tween em todos os elementos',
                  'Sliders super suaves com glow',
                  'Toggles switch animados (spring)',
                  'Efeito ripple em todos os botões',
                  '6 abas organizadas com indicador',
                  'Notificações com progress bar',
                  'Arraste suave interpolado',
                  'Janela redimensionável',
                  'Brilho dinâmico pulsante na borda',
                  'Indicador visual de target lock',
                  '8 temas de cor',
                  'Fade in no arranque',
                  'Slider de opacidade do painel',
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-teal-400">✅</span> {f}
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Aimbot Tab */}
        {activeTab === 'aimbot' && (
          <div className="space-y-8 animate-fade-in">
            <section>
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <span className="text-purple-400">🎯</span> Sistema de Aimbot Completo
              </h2>
              <p className="text-gray-400 mb-6">3 modos de mira + checks avançados + ajustes detalhados</p>

              {/* 3 Modes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="p-5 rounded-2xl bg-purple-500/5 border border-purple-500/15 hover:bg-purple-500/10 transition-all">
                  <h3 className="font-bold text-purple-400 text-lg mb-2">🎯 Aimbot Normal</h3>
                  <p className="text-gray-400 text-sm">Move a câmara para o alvo. Suporta smooth ajustável (0=snap, 100=legit). Segura RMB para ativar.</p>
                </div>
                <div className="p-5 rounded-2xl bg-orange-500/5 border border-orange-500/15 hover:bg-orange-500/10 transition-all">
                  <h3 className="font-bold text-orange-400 text-lg mb-2">🔇 Silent Aim</h3>
                  <p className="text-gray-400 text-sm">Redireciona os tiros para o alvo sem mover a câmara. Usa hookmetamethod para interceptar raycasts e mouse.Hit.</p>
                </div>
                <div className="p-5 rounded-2xl bg-red-500/5 border border-red-500/15 hover:bg-red-500/10 transition-all">
                  <h3 className="font-bold text-red-400 text-lg mb-2">🔫 Trigger Bot</h3>
                  <p className="text-gray-400 text-sm">Dispara automaticamente quando a mira passa por cima de um inimigo. Delay configurável para parecer natural.</p>
                </div>
              </div>

              {/* Settings table */}
              <h3 className="text-lg font-bold mb-4 text-teal-400">⚙️ Todos os Ajustes</h3>
              <div className="space-y-3">
                {aimbotSettings.map((s, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 font-bold text-xs flex-shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{s.name}</h4>
                      <p className="text-gray-400 text-sm">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Players Tab */}
        {activeTab === 'players' && (
          <div className="space-y-8 animate-fade-in">
            <section>
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <span className="text-blue-400">👥</span> Aba Players — Nova!
              </h2>
              <p className="text-gray-400 mb-6">Lista todos os jogadores no servidor com ações disponíveis</p>

              {/* Player card preview */}
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] mb-8">
                <h3 className="text-lg font-bold text-blue-400 mb-4">Preview de um Player Card:</h3>
                <div className="p-4 rounded-xl bg-[#191923] border border-white/[0.08]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white">xXProPlayer123Xx</p>
                      <p className="text-gray-500 text-xs">ProPlayer</p>
                      <div className="w-32 h-1.5 bg-gray-800 rounded-full mt-2 overflow-hidden">
                        <div className="w-3/4 h-full bg-green-500 rounded-full" />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 rounded-lg bg-blue-500/15 border border-blue-500/30 text-blue-400 text-xs font-bold hover:bg-blue-500/25 transition-all">
                        Spec
                      </button>
                      <button className="px-3 py-1.5 rounded-lg bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-bold hover:bg-red-500/25 transition-all">
                        Fling
                      </button>
                      <button className="px-3 py-1.5 rounded-lg bg-green-500/15 border border-green-500/30 text-green-400 text-xs font-bold hover:bg-green-500/25 transition-all">
                        TP
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {playerFeatures.map((f, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-all">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{f.icon}</span>
                      <div>
                        <h4 className="font-bold text-white">{f.name}</h4>
                        <p className="text-gray-400 text-sm mt-1">{f.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* How it works */}
              <div className="mt-8 p-6 rounded-2xl bg-blue-500/5 border border-blue-500/15">
                <h3 className="text-lg font-bold text-blue-400 mb-3">Como funciona:</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start gap-2"><span className="text-blue-400">•</span> A lista de jogadores atualiza-se automaticamente a cada 2 segundos</li>
                  <li className="flex items-start gap-2"><span className="text-blue-400">•</span> A barra de HP muda de cor: verde {'>'} amarelo {'>'} vermelho</li>
                  <li className="flex items-start gap-2"><span className="text-blue-400">•</span> Spectate troca a câmara para o Humanoid do alvo. Clica "Unspec" para voltar</li>
                  <li className="flex items-start gap-2"><span className="text-blue-400">•</span> Fling move-te com velocidade alta + rotação angular para o alvo</li>
                  <li className="flex items-start gap-2"><span className="text-blue-400">•</span> TP teleporta-te para 3 studs atrás do jogador</li>
                  <li className="flex items-start gap-2"><span className="text-blue-400">•</span> Se um jogador sair enquanto estás em spectate, volta automaticamente</li>
                </ul>
              </div>
            </section>
          </div>
        )}

        {/* Loadstring Tab */}
        {activeTab === 'loadstring' && (
          <div className="space-y-8 animate-fade-in">
            {/* Download section */}
            <section className="text-center">
              <h2 className="text-2xl font-bold mb-6 flex items-center justify-center gap-2">
                <span className="text-teal-400">📥</span> Download & Loadstring
              </h2>

              <a
                href="/Utilities_v4_Complete.txt"
                download="Utilities_v4_Complete.txt"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-500 to-purple-500 text-white font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-teal-500/20 mb-8"
              >
                📥 Download Utilities_v4_Complete.txt
              </a>
            </section>

            {/* Loadstring examples */}
            <section>
              <h3 className="text-xl font-bold mb-4 text-purple-400">Opção 1: GitHub</h3>
              <div className="relative group">
                <pre className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-gray-300 overflow-x-auto font-mono">
                  {loadstringGithub}
                </pre>
                <button
                  onClick={() => copyText(loadstringGithub, 'github')}
                  className="absolute top-2 right-2 px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-400 text-xs font-bold hover:bg-purple-500/30 transition-all"
                >
                  {copied === 'github' ? '✅ Copiado!' : '📋 Copiar'}
                </button>
              </div>
              <p className="text-gray-500 text-xs mt-2">1. Faz upload do .txt para um repo GitHub → 2. Copia o URL raw → 3. Substitui no loadstring</p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-4 text-blue-400">Opção 2: Pastebin</h3>
              <div className="relative group">
                <pre className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-gray-300 overflow-x-auto font-mono">
                  {loadstringPastebin}
                </pre>
                <button
                  onClick={() => copyText(loadstringPastebin, 'pastebin')}
                  className="absolute top-2 right-2 px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-400 text-xs font-bold hover:bg-blue-500/30 transition-all"
                >
                  {copied === 'pastebin' ? '✅ Copiado!' : '📋 Copiar'}
                </button>
              </div>
              <p className="text-gray-500 text-xs mt-2">1. Cola o script no pastebin.com → 2. Copia o ID → 3. Substitui XXXXXXXX</p>
            </section>

            {/* Executors */}
            <section>
              <h3 className="text-xl font-bold mb-4 text-teal-400">Executores Compatíveis</h3>
              <div className="flex flex-wrap gap-2">
                {executors.map((e, i) => (
                  <span key={i} className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-gray-300 text-sm font-medium hover:bg-white/[0.06] transition-all">
                    {e}
                  </span>
                ))}
              </div>
            </section>

            {/* Steps */}
            <section className="p-6 rounded-2xl bg-teal-500/5 border border-teal-500/15">
              <h3 className="text-lg font-bold text-teal-400 mb-4">📝 Passo a Passo:</h3>
              <ol className="space-y-3 text-gray-300 text-sm">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 font-bold text-xs flex-shrink-0">1</span>
                  <span>Faz download do ficheiro <strong>.txt</strong> acima</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 font-bold text-xs flex-shrink-0">2</span>
                  <span>Faz upload para <strong>GitHub</strong> (cria um repo) ou <strong>Pastebin</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 font-bold text-xs flex-shrink-0">3</span>
                  <span>Copia o URL <strong>raw</strong> do ficheiro</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 font-bold text-xs flex-shrink-0">4</span>
                  <span>Abre o teu executor (Fluxus, Solara, Delta, etc.)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 font-bold text-xs flex-shrink-0">5</span>
                  <span>Cola o loadstring e executa. A GUI aparece no jogo! 🎉</span>
                </li>
              </ol>
            </section>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-16 pb-8 text-gray-600 text-sm">
          <p>Utilities v5.0 — Rectangular UI + Keybind Selector</p>
          <p className="mt-1">Silent Aim • Trigger Bot • Players Tab • 7 Tabs • 8 Themes • Custom Keybinds</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
