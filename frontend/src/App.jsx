import { useState } from "react";
import StudyForm from "./components/StudyForm";
import PlanResult from "./components/PlanResult";
import { generateStudyPlan } from "./utils/plannerLogic";
import logo from "./assets/logo.png";

function App() {
  const [plan, setPlan] = useState(null);

  const handleGenerate = (data) => {
    const result = generateStudyPlan(
      data.dailyHours,
      data.subjects
    );
    setPlan(result);
  };

  return (
    <div className="min-h-screen bg-[#0b1220] text-slate-100">
      <div className="max-w-3xl mx-auto p-6 space-y-6">

        <div className="flex items-center justify-center gap-3 sm:gap-4 py-3 sm:py-4">
          <img
            src={logo}
            alt="FocusMate logo"
            className="w-[72px] h-[72px] sm:w-[90px] sm:h-[90px] md:w-[120px] md:h-[120px] object-contain"
          />

          <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-400 leading-none"
          >
            FocusMate
          </h1>
        </div>


        <StudyForm onGenerate={handleGenerate} />

        {plan && <PlanResult plan={plan} />}

      </div>
    </div>
  );
}

export default App;
