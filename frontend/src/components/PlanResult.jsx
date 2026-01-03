const PlanResult = ({ plan }) => {
  if (!plan) return null;

  return (
    <div className="bg-[#111827] border border-[#1e293b] p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-blue-400 mb-3">
        📅 Generated Study Plan
      </h2>

      <ul className="space-y-3">
        {plan.dailyPlan.map((item, i) => (
          <li
            key={i}
            className="flex flex-col gap-1 bg-[#0b1220] border border-[#1e293b] rounded-lg px-4 py-3"
          >
            {/* Subject + Hours */}
            <div className="flex justify-between items-center">
              <span className="font-medium text-slate-100">
                {item.subject}
              </span>

              <span className="text-blue-400 font-semibold">
                {item.hours} hrs/day
              </span>
            </div>

            {/* Days Left */}
            <span className="text-xs text-slate-400">
              ⏳ {item.daysLeft} day{item.daysLeft > 1 ? "s" : ""} left
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xs text-slate-500">
        ⓘ Time allocation is based on ML-predicted difficulty and
        individual exam urgency.
      </p>
    </div>
  );
};

export default PlanResult;
