import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL
const confidenceEmoji = (value) => {
  if (value <= 1) return "😟";
  if (value === 2) return "🙁";
  if (value === 3) return "😐";
  if (value === 4) return "🙂";
  return "😄";
};


const fetchDifficulty = async (confidence, score) => {
  try {
    const res = await fetch(`${API_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        confidence,
        score: score === "" ? 50 : Number(score),
      }),
    });

    const data = await res.json();
    return data.difficulty;
  } catch {
    if (confidence <= 2) return "Hard";
    if (confidence === 3) return "Medium";
    return "Easy";
  }
};

const StudyForm = ({ onGenerate }) => {
  const [dailyHours, setDailyHours] = useState("");
  const [loadingIndex, setLoadingIndex] = useState(null);

  const [subjects, setSubjects] = useState([
    {
      name: "",
      examDate: "",
      confidence: 3,
      score: "",
      difficulty: "Easy",
      aiDifficulty: "",
    },
  ]);

  const addSubject = () => {
    setSubjects([
      ...subjects,
      {
        name: "",
        examDate: "",
        confidence: 3,
        score: "",
        difficulty: "Easy",
        aiDifficulty: "",
      },
    ]);
  };

  const updateSubject = async (index, field, value) => {
    const updated = [...subjects];
    updated[index][field] = value;
    setSubjects(updated);

    if (field === "confidence" || field === "score") {
      setLoadingIndex(index);

      const ai = await fetchDifficulty(
        updated[index].confidence,
        updated[index].score
      );

      updated[index].aiDifficulty = ai;
      updated[index].difficulty = ai;

      setSubjects([...updated]);
      setLoadingIndex(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate({
      dailyHours: Number(dailyHours),
      subjects,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#111827] border border-[#1e293b] p-6 rounded-xl shadow-lg space-y-5"
    >
      <h2 className="text-xl font-bold text-blue-400 text-center">
        Study Details
      </h2>

     
      <input
        type="number"
        placeholder="Daily Study Hours"
        className="w-full bg-[#0b1220] border border-[#1e293b] rounded px-3 py-2 text-slate-100"
        value={dailyHours}
        onChange={(e) => setDailyHours(e.target.value)}
        required
      />

      {subjects.map((sub, i) => (
        <div
          key={i}
          className="bg-[#0b1220] border border-[#1e293b] rounded-lg p-4 space-y-4"
        >
          <input
            type="text"
            placeholder="Subject Name"
            className="w-full bg-[#0b1220] border border-[#1e293b] rounded px-3 py-2 text-slate-100"
            value={sub.name}
            onChange={(e) =>
              updateSubject(i, "name", e.target.value)
            }
            required
          />

          
          <input
            type="date"
            className="w-full bg-[#0b1220] border border-[#1e293b] rounded px-3 py-2 text-slate-100"
            value={sub.examDate}
            onChange={(e) =>
              updateSubject(i, "examDate", e.target.value)
            }
            required
          />

         
          <div className="space-y-2">
            <label className="text-sm text-slate-300 flex items-center gap-3">
              Confidence: <b>{sub.confidence}</b>
              <span className="text-2xl">
                {confidenceEmoji(sub.confidence)}
              </span>
            </label>

            <input
              type="range"
              min="1"
              max="5"
              value={sub.confidence}
              onChange={(e) =>
                updateSubject(
                  i,
                  "confidence",
                  Number(e.target.value)
                )
              }
              className="w-full accent-blue-500"
            />
          </div>

          
          <input
            type="number"
            placeholder="Past Score % (optional)"
            className="w-full bg-[#0b1220] border border-[#1e293b] rounded px-3 py-2 text-slate-100"
            value={sub.score}
            onChange={(e) =>
              updateSubject(i, "score", e.target.value)
            }
          />

    
          <p className="text-sm">
            🤖 AI Difficulty:{" "}
            {loadingIndex === i ? (
              <span className="italic text-slate-400">
                thinking...
              </span>
            ) : (
              <span className="font-semibold text-blue-400">
                {sub.aiDifficulty || "—"}
              </span>
            )}
          </p>
        </div>
      ))}

      <button
        type="button"
        onClick={addSubject}
        className="w-full bg-[#1e293b] hover:bg-[#334155] py-2 rounded"
      >
        + Add Subject
      </button>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold"
      >
        Generate Study Plan
      </button>
    </form>
  );
};

export default StudyForm;
