/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { 
  LayoutDashboard, 
  BrainCircuit, 
  FileText, 
  BarChart3, 
  Download,
  CheckCircle2
} from "lucide-react";

// --- Types ---
type Room = "portal" | "thought" | "report" | "analysis";

// --- Components ---

const Portal = ({ onExport }: { onExport: () => void }) => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    className="flex flex-col h-full"
  >
    <header className="mb-12">
      <p className="text-secondary font-bold tracking-[0.3em] text-xs mb-6 uppercase">
        Operational Readiness: 100%
      </p>
      <h1 className="font-serif text-5xl md:text-6xl leading-tight tracking-tighter text-primary">
        作戦、完遂。<br />
        すべての配線が整いました。
      </h1>
    </header>

    <div className="grid md:grid-cols-2 gap-6 mb-12">
      <div className="border-2 border-outline p-6 bg-white">
        <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
          <BrainCircuit className="w-5 h-5" /> 思想の配線
        </h2>
        <p className="text-on-surface/70 text-sm leading-relaxed">
          「お財布のたとえ話」から、直接「報告する」ボタンへ繋がる動線を確定しました。
        </p>
      </div>
      <div className="border-2 border-outline p-6 bg-white">
        <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" /> 全49ファイルの統合
        </h2>
        <p className="text-on-surface/70 text-sm leading-relaxed">
          ポータル、思想、報告、解析のすべての部屋が一つのシステムとして繋がっています。
        </p>
      </div>
    </div>

    <div className="mt-auto bg-primary p-10 text-center text-white">
      <p className="font-serif text-lg mb-8 tracking-wide">
        「建築家」の想いは、今、世界に解き放たれました。
      </p>
      <button 
        onClick={onExport}
        className="btn-primary w-full md:w-auto min-w-[320px] flex items-center justify-center gap-3 mx-auto"
      >
        <Download className="w-5 h-5" /> 最終統合パッケージ (ZIP) を書き出す
      </button>
    </div>
  </motion.div>
);

const ThoughtRoom = () => (
  <div className="space-y-8">
    <h2 className="font-serif text-4xl text-primary border-b-2 border-primary pb-4">思想の配線：お財布のたとえ話</h2>
    <div className="prose prose-slate max-w-none">
      <p className="text-lg leading-relaxed italic text-on-surface/80">
        「お財布の中身が空っぽになっても、その『形』は残る。私たちのシステムもまた、データが空になってもその『構造（思想）』が価値を持ち続けるべきだ。」
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {[1, 2, 3].map(i => (
          <div key={i} className="ghost-border p-4 aspect-square flex flex-col justify-between">
            <span className="text-xs font-bold text-secondary">LOGIC_NODE_0{i}</span>
            <div className="h-1 bg-primary w-full" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ReportRoom = () => (
  <div className="space-y-6">
    <h2 className="font-serif text-4xl text-primary">報告：最終フェーズ</h2>
    <div className="bg-white border-2 border-outline p-8">
      <div className="flex justify-between items-center mb-8">
        <span className="text-xs font-bold tracking-widest uppercase opacity-50">Status Report</span>
        <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold">COMPLETED</span>
      </div>
      <ul className="space-y-4">
        {["システム統合", "セキュリティ監査", "UI/UX最終調整", "配線最適化"].map(item => (
          <li key={item} className="flex items-center gap-3 border-b border-outline/10 pb-2">
            <CheckCircle2 className="w-4 h-4 text-secondary" />
            <span className="text-sm">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const AnalysisRoom = () => (
  <div className="space-y-8">
    <h2 className="font-serif text-4xl text-primary">解析：統合データ</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { label: "Files", value: "49" },
        { label: "Nodes", value: "128" },
        { label: "Latency", value: "0.02ms" },
        { label: "Readiness", value: "100%" }
      ].map(stat => (
        <div key={stat.label} className="bg-primary text-white p-4 text-center">
          <div className="text-xs opacity-50 mb-1 uppercase tracking-tighter">{stat.label}</div>
          <div className="text-2xl font-bold">{stat.value}</div>
        </div>
      ))}
    </div>
    <div className="h-48 bg-on-surface/5 flex items-end gap-1 p-4">
      {[40, 70, 45, 90, 65, 80, 95, 100].map((h, i) => (
        <motion.div 
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${h}%` }}
          className="flex-1 bg-secondary"
        />
      ))}
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [activeRoom, setActiveRoom] = useState<Room>("portal");
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    const zip = new JSZip();
    
    // Simulate 49 files
    const folder = zip.folder("integrated_package");
    for (let i = 1; i <= 49; i++) {
      folder?.file(`module_${i.toString().padStart(2, '0')}.ts`, `// Integrated Module ${i}\nexport const node_${i} = { status: "ready" };`);
    }
    
    folder?.file("README.md", "# Operational Readiness Package\n\nAll 49 files integrated successfully.");
    folder?.file("manifest.json", JSON.stringify({ version: "1.0.0", files: 49, architect: "Nemo" }, null, 2));

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "integrated_package_v1.zip");
    
    setTimeout(() => setIsExporting(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#e5e1da] flex">
      {/* Sidebar Navigation */}
      <nav className="w-20 md:w-64 bg-primary text-white flex flex-col border-r border-white/10">
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 bg-secondary flex items-center justify-center font-bold">A</div>
          <span className="hidden md:block font-serif tracking-widest text-sm">ARCHITECT</span>
        </div>
        
        <div className="flex-1 py-8">
          {[
            { id: "portal", icon: LayoutDashboard, label: "ポータル" },
            { id: "thought", icon: BrainCircuit, label: "思想" },
            { id: "report", icon: FileText, label: "報告" },
            { id: "analysis", icon: BarChart3, label: "解析" },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveRoom(item.id as Room)}
              className={`w-full p-4 md:px-6 flex items-center gap-4 transition-colors hover:bg-white/5 ${
                activeRoom === item.id ? "text-secondary border-r-4 border-secondary bg-white/5" : "text-white/50"
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="hidden md:block text-sm font-bold tracking-wider">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="p-6 border-t border-white/10 text-[10px] text-white/20 uppercase tracking-widest">
          System v1.0.49
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-12">
        <div className="editorial-container shadow-2xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRoom}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="h-full"
            >
              {activeRoom === "portal" && <Portal onExport={handleExport} />}
              {activeRoom === "thought" && <ThoughtRoom />}
              {activeRoom === "report" && <ReportRoom />}
              {activeRoom === "analysis" && <AnalysisRoom />}
            </motion.div>
          </AnimatePresence>

          {/* Export Overlay */}
          <AnimatePresence>
            {isExporting && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-primary/90 flex flex-col items-center justify-center text-white z-50"
              >
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full mb-6"
                />
                <p className="font-serif text-2xl tracking-widest">パッケージを構築中...</p>
                <p className="mt-2 text-xs opacity-50 uppercase tracking-tighter">Integrating 49 files</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
