import { useState } from "react";
import "./App.css"; 
import { GoogleGenerativeAI } from "@google/generative-ai";
// code written by sunny
const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

export default function App() {

  const [currentAgent, setCurrentAgent] =
    useState("commentary");

  const [input, setInput] =
    useState("");

  const [output, setOutput] =
    useState(
      "Koi bhi agent chunno aur question pucho — Gemini real-time analysis dega! 🤖"
    );

  const [loading, setLoading] =
    useState(false);

  const agents = {
    commentary:
      "You are an exciting IPL commentator in Hinglish.",

    predict:
      "You are an IPL prediction AI.",

    player:
      "You are a cricket player analyst.",

    strategy:
      "You are an IPL strategy advisor."
  };

  async function runAgent() {

    if (!input) return;

    setLoading(true);

    try {

      const model =
        genAI.getGenerativeModel({
          model: "gemini-2.5-flash",
        });

      const prompt = `
${agents[currentAgent]}

Current Match:
RCB 187/4
CSK 142/6

Question:
${input}
`;

      const result =
        await model.generateContent(prompt);

      const response =
        await result.response.text();

      setOutput(response);

    } catch (error) {

      console.log(error);

      setOutput(
        "❌ Error: " + error.message
      );
    }

    setLoading(false);
  }

  return (
    <div>

      <div className="topbar">

        <div className="brand">
          🏏 IPL AI Agent | Google Cloud APL 2026
        </div>

        <div className="live-badge">
          ● LIVE
        </div>

      </div>

      <div className="container">

        <div className="scoreboard">

          <div className="match-title">
            🏟️ IPL 2026 — LIVE MATCH
          </div>

          <div className="teams">

            <div className="team">
              <div className="team-name">
                RCB 🔴
              </div>

              <div className="team-score">
                187/4
              </div>

              <div className="team-overs">
                20.0 overs
              </div>
            </div>

            <div className="vs">VS</div>

            <div className="team">
              <div className="team-name">
                CSK 💛
              </div>

              <div className="team-score">
                142/6
              </div>

              <div className="team-overs">
                16.3 overs
              </div>
            </div>

          </div>

          <div className="match-status">
            ⚡ CSK needs 46 runs in 21 balls
          </div>

        </div>

        <div className="agent-row">

          <div
            className={`agent-card ${currentAgent === "commentary"
              ? "active"
              : ""
              }`}
            onClick={() =>
              setCurrentAgent("commentary")
            }
          >
            <div className="ai">🎙️</div>

            <div className="aname">
              Live Commentary
            </div>
          </div>

          <div
            className={`agent-card ${currentAgent === "predict"
              ? "active"
              : ""
              }`}
            onClick={() =>
              setCurrentAgent("predict")
            }
          >
            <div className="ai">🔮</div>

            <div className="aname">
              Match Predictor
            </div>
          </div>

          <div
            className={`agent-card ${currentAgent === "player"
              ? "active"
              : ""
              }`}
            onClick={() =>
              setCurrentAgent("player")
            }
          >
            <div className="ai">📊</div>

            <div className="aname">
              Player Analyst
            </div>
          </div>

          <div
            className={`agent-card ${currentAgent === "strategy"
              ? "active"
              : ""
              }`}
            onClick={() =>
              setCurrentAgent("strategy")
            }
          >
            <div className="ai">🧠</div>

            <div className="aname">
              Strategy Advisor
            </div>
          </div>

        </div>

        <div className="input-box">

          <textarea
            placeholder="Apna question pucho..."
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
          />

          <button
            className="run-btn"
            onClick={runAgent}
          >
            {
              loading
                ? "⏳ Gemini soch raha hai..."
                : "▶ Gemini Agent Run Karo"
            }
          </button>

        </div>

        <div className="output-box">
          {output}
        </div>

        <div className="footer">
          🏏 Built by Sunny • GDG Patna Core Team • Powered by Gemini 2.5 Flash
        </div>

      </div>

    </div>
  );
}