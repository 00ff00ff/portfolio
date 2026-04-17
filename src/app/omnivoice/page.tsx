"use client";

import React, { useState } from "react";
import { Mic, Play, Loader2, Settings2 } from "lucide-react";

export default function OmniVoicePage() {
  const [text, setText] = useState("");
  const [gender, setGender] = useState("male");
  const [pitch, setPitch] = useState("low pitch");
  const [accent, setAccent] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setAudioUrl(null);
    setError(null);

    const instructElements = [gender, pitch];
    if (accent) instructElements.push(accent);
    const instruct = instructElements.join(", ");

    try {
      const response = await fetch("/api/omnivoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, instruct }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Błąd podczas generowania audio");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/30 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/30 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 z-10 w-full">
        {/* Input section */}
        <div className="flex flex-col gap-6">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
            <h1 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Generator OmniVoice
            </h1>
            <p className="text-slate-400 mb-6 font-medium">
              Wpisz wiadomość i zamień ją na dźwięk.
            </p>

            <textarea
              className="w-full h-40 bg-black/40 border border-white/10 rounded-xl p-4 text-slate-200 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none mb-6"
              placeholder="Co mam powiedzieć?"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <button
              onClick={handleGenerate}
              disabled={loading || !text.trim()}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-3 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Generowanie...
                </>
              ) : (
                <>
                  <Mic size={20} />
                  Generuj Audio
                </>
              )}
            </button>
            {error && (
              <p className="text-red-400 mt-4 text-sm font-medium bg-red-400/10 p-3 rounded-lg border border-red-400/20">
                {error}
              </p>
            )}
          </div>
        </div>

        {/* Settings & Output section */}
        <div className="flex flex-col gap-6">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl h-full flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <Settings2 className="text-purple-400" size={24} />
              <h2 className="text-xl font-bold text-slate-200">Modulator Głosu</h2>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                  Płeć
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="bg-black/40 border border-white/10 rounded-lg p-3 text-slate-200 outline-none focus:border-purple-500/50"
                >
                  <option value="male">Mężczyzna</option>
                  <option value="female">Kobieta</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                  Ton Głosu
                </label>
                <select
                  value={pitch}
                  onChange={(e) => setPitch(e.target.value)}
                  className="bg-black/40 border border-white/10 rounded-lg p-3 text-slate-200 outline-none focus:border-purple-500/50"
                >
                  <option value="very low pitch">Bardzo Niski</option>
                  <option value="low pitch">Niski</option>
                  <option value="high pitch">Wysoki</option>
                  <option value="very high pitch">Bardzo Wysoki</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                  Styl
                </label>
                <select
                  value={accent}
                  onChange={(e) => setAccent(e.target.value)}
                  className="bg-black/40 border border-white/10 rounded-lg p-3 text-slate-200 outline-none focus:border-purple-500/50"
                >
                  <option value="">Domyślny (Naturalny)</option>
                  <option value="whisper">Szept</option>
                  <option value="child">Dziecko</option>
                  <option value="elderly">Osoba starsza</option>
                </select>
              </div>
            </div>

            <div className="mt-auto">
              {audioUrl ? (
                <div className="bg-black/40 border border-purple-500/30 rounded-xl p-4 transition-all animate-in fade-in zoom-in duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-purple-500/20 p-2 rounded-full">
                      <Play className="text-purple-400" size={16} />
                    </div>
                    <span className="text-sm font-medium text-slate-300">
                      Wygenerowane Audio
                    </span>
                  </div>
                  <audio controls className="w-full h-10 outline-none grayscale invert hue-rotate-180 opacity-90" src={audioUrl}>
                    Twoja przeglądarka nie obsługuje odtwarzacza audio.
                  </audio>
                </div>
              ) : (
                <div className="bg-black/20 border border-white/5 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-slate-500 text-center">
                  <Play className="mb-2 opacity-50" size={24} />
                  <span className="text-sm">Tutaj pojawi się odtwarzacz audio</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
