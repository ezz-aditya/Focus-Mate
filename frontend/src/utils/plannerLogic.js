export const generateStudyPlan = (dailyHours, subjects) => {
  const today = new Date();


  const difficultyWeight = {
    Easy: 1,
    Medium: 2,
    Hard: 3,
  };

  const subjectsWithPriority = subjects.map((sub) => {
    const exam = new Date(sub.examDate);
    const daysLeft = Math.max(
      Math.ceil((exam - today) / (1000 * 60 * 60 * 24)),
      1
    );

    let urgencyWeight = 1;
    if (daysLeft <= 3) urgencyWeight = 3;
    else if (daysLeft <= 7) urgencyWeight = 2;

    const diff = sub.difficulty || "Medium";

    return {
      subject: sub.name,
      daysLeft,
      priority: difficultyWeight[diff] + urgencyWeight,
    };
  });

  const totalPriority =
    subjectsWithPriority.reduce((sum, s) => sum + s.priority, 0) || 1;

  const dailyPlan = subjectsWithPriority.map((sub) => ({
    subject: sub.subject,
    daysLeft: sub.daysLeft,
    hours: Number(
      ((dailyHours * sub.priority) / totalPriority).toFixed(1)
    ),
  }));

  return {
    dailyPlan,
  };
};
