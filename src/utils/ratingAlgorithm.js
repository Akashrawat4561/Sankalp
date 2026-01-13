// src/utils/ratingAlgorithm.js
// AI-based rating algorithm for project and contractor evaluation

/**
 * Calculate project rating based on multiple weighted factors
 * Rating Scale: 0-10 (10 being the best)
 * 
 * Factors:
 * - Budget Efficiency (25%): How well the project stayed within budget
 * - Timeline Adherence (25%): Delays as percentage of planned duration
 * - Progress Rate (20%): Current completion vs expected completion
 * - Bidding Transparency (15%): Bid discount and process transparency
 * - Contractor Track Record (15%): Based on contractor's past performance
 */
export const calculateProjectRating = (project, contractor = null) => {
  const weights = {
    budgetEfficiency: 0.25,
    timelineAdherence: 0.25,
    progressRate: 0.20,
    biddingTransparency: 0.15,
    contractorTrackRecord: 0.15
  };

  // 1. Budget Efficiency Score (0-10)
  // Projects under budget get higher scores
  const budgetRatio = project.budget.actual / project.budget.estimated;
  let budgetScore;
  if (budgetRatio <= 0.8) budgetScore = 10; // 20%+ under budget
  else if (budgetRatio <= 0.9) budgetScore = 9; // 10-20% under budget
  else if (budgetRatio <= 0.95) budgetScore = 8; // 5-10% under budget
  else if (budgetRatio <= 1.0) budgetScore = 7; // On budget
  else if (budgetRatio <= 1.05) budgetScore = 6; // 0-5% over budget
  else if (budgetRatio <= 1.10) budgetScore = 5; // 5-10% over budget
  else if (budgetRatio <= 1.15) budgetScore = 4; // 10-15% over budget
  else if (budgetRatio <= 1.20) budgetScore = 3; // 15-20% over budget
  else if (budgetRatio <= 1.30) budgetScore = 2; // 20-30% over budget
  else budgetScore = 1; // >30% over budget

  // 2. Timeline Adherence Score (0-10)
  // Less delay = higher score
  const delayPercentage = (project.timeline.currentDelay / project.timeline.plannedDuration) * 100;
  let timelineScore;
  if (delayPercentage === 0) timelineScore = 10; // No delay
  else if (delayPercentage <= 5) timelineScore = 9; // 0-5% delay
  else if (delayPercentage <= 10) timelineScore = 8; // 5-10% delay
  else if (delayPercentage <= 15) timelineScore = 7; // 10-15% delay
  else if (delayPercentage <= 20) timelineScore = 6; // 15-20% delay
  else if (delayPercentage <= 25) timelineScore = 5; // 20-25% delay
  else if (delayPercentage <= 30) timelineScore = 4; // 25-30% delay
  else if (delayPercentage <= 40) timelineScore = 3; // 30-40% delay
  else if (delayPercentage <= 50) timelineScore = 2; // 40-50% delay
  else timelineScore = 1; // >50% delay

  // 3. Progress Rate Score (0-10)
  // Compare actual progress to expected progress based on time elapsed
  const startDate = new Date(project.timeline.startDate);
  const expectedEndDate = new Date(project.timeline.expectedEnd);
  const today = new Date();
  
  const totalDuration = expectedEndDate - startDate;
  const elapsed = Math.min(today - startDate, totalDuration);
  const expectedProgress = Math.max(0, Math.min(100, (elapsed / totalDuration) * 100));
  
  const progressDifference = project.progress - expectedProgress;
  let progressScore;
  if (progressDifference >= 10) progressScore = 10; // 10%+ ahead
  else if (progressDifference >= 5) progressScore = 9; // 5-10% ahead
  else if (progressDifference >= 0) progressScore = 8; // On track
  else if (progressDifference >= -5) progressScore = 7; // 0-5% behind
  else if (progressDifference >= -10) progressScore = 6; // 5-10% behind
  else if (progressDifference >= -15) progressScore = 5; // 10-15% behind
  else if (progressDifference >= -20) progressScore = 4; // 15-20% behind
  else if (progressDifference >= -30) progressScore = 3; // 20-30% behind
  else if (progressDifference >= -40) progressScore = 2; // 30-40% behind
  else progressScore = 1; // >40% behind

  // For completed projects, progress score is based on final timeline
  if (project.status === "Completed") {
    progressScore = project.timeline.currentDelay === 0 ? 10 : Math.max(5, 10 - project.timeline.currentDelay);
  }

  // 4. Bidding Transparency Score (0-10)
  // Based on bid discount and process type
  const bidDiscount = ((project.budget.estimated - project.budget.awarded) / project.budget.estimated) * 100;
  let biddingScore;
  
  // Healthy discount (5-15%) is ideal, too high might indicate quality issues
  if (bidDiscount >= 5 && bidDiscount <= 15) biddingScore = 10;
  else if (bidDiscount >= 3 && bidDiscount < 5) biddingScore = 8;
  else if (bidDiscount >= 15 && bidDiscount <= 25) biddingScore = 8;
  else if (bidDiscount >= 0 && bidDiscount < 3) biddingScore = 7;
  else if (bidDiscount > 25 && bidDiscount <= 30) biddingScore = 6;
  else if (bidDiscount < 0) biddingScore = 5; // Over estimated
  else biddingScore = 4; // >30% discount (suspicious)

  // Bonus for transparent bidding process
  if (project.biddingProcess.includes("Open E-Tender")) {
    biddingScore = Math.min(10, biddingScore + 1);
  }
  if (project.biddingProcess.includes("Item Rate")) {
    biddingScore = Math.min(10, biddingScore + 0.5); // Good for heritage projects
  }

  // 5. Contractor Track Record Score (0-10)
  let contractorScore = 7; // Default if no contractor data
  if (contractor && contractor.stats) {
    const onTimeRate = (contractor.stats.completedOnTime / contractor.stats.totalProjects) * 100;
    const budgetAdherence = contractor.stats.avgBudgetAdherence;
    const qualityScore = contractor.stats.avgQualityScore;

    // Weighted combination of contractor metrics
    contractorScore = (
      (onTimeRate / 10) * 0.4 +
      (Math.min(budgetAdherence, 100) / 10) * 0.3 +
      qualityScore * 0.3
    );
    contractorScore = Math.min(10, Math.max(1, contractorScore));
  }

  // Calculate final weighted rating
  const finalRating = 
    budgetScore * weights.budgetEfficiency +
    timelineScore * weights.timelineAdherence +
    progressScore * weights.progressRate +
    biddingScore * weights.biddingTransparency +
    contractorScore * weights.contractorTrackRecord;

  return {
    overall: parseFloat(finalRating.toFixed(1)),
    breakdown: {
      budgetEfficiency: { score: budgetScore, weight: weights.budgetEfficiency * 100, description: getBudgetDescription(budgetRatio) },
      timelineAdherence: { score: timelineScore, weight: weights.timelineAdherence * 100, description: getTimelineDescription(delayPercentage) },
      progressRate: { score: progressScore, weight: weights.progressRate * 100, description: getProgressDescription(progressDifference, project.status) },
      biddingTransparency: { score: Math.min(10, biddingScore), weight: weights.biddingTransparency * 100, description: getBiddingDescription(bidDiscount, project.biddingProcess) },
      contractorTrackRecord: { score: parseFloat(contractorScore.toFixed(1)), weight: weights.contractorTrackRecord * 100, description: getContractorDescription(contractor) }
    }
  };
};

/**
 * Calculate contractor rating based on portfolio performance
 */
export const calculateContractorRating = (contractor) => {
  if (!contractor || !contractor.stats) return { overall: 7.0, breakdown: {} };

  const weights = {
    onTimeDelivery: 0.30,
    budgetAdherence: 0.25,
    qualityScore: 0.25,
    publicRating: 0.20
  };

  // On-time delivery rate
  const onTimeRate = (contractor.stats.completedOnTime / contractor.stats.totalProjects) * 100;
  const onTimeScore = Math.min(10, onTimeRate / 10);

  // Budget adherence (100% = 10, below is better, above is worse)
  const budgetScore = Math.max(1, 10 - Math.abs(100 - contractor.stats.avgBudgetAdherence) / 2);

  // Quality score (direct from data)
  const qualityScore = contractor.stats.avgQualityScore;

  // Public rating (direct from data)
  const publicScore = contractor.publicRating;

  // Calculate final weighted rating
  const finalRating = 
    onTimeScore * weights.onTimeDelivery +
    budgetScore * weights.budgetAdherence +
    qualityScore * weights.qualityScore +
    publicScore * weights.publicRating;

  return {
    overall: parseFloat(finalRating.toFixed(1)),
    breakdown: {
      onTimeDelivery: { score: parseFloat(onTimeScore.toFixed(1)), weight: weights.onTimeDelivery * 100, value: `${onTimeRate.toFixed(0)}%` },
      budgetAdherence: { score: parseFloat(budgetScore.toFixed(1)), weight: weights.budgetAdherence * 100, value: `${contractor.stats.avgBudgetAdherence}%` },
      qualityScore: { score: qualityScore, weight: weights.qualityScore * 100, value: `${qualityScore}/10` },
      publicRating: { score: publicScore, weight: weights.publicRating * 100, value: `${publicScore}/10 (${contractor.totalReviews} reviews)` }
    }
  };
};

/**
 * Get risk level based on rating
 */
export const getRiskLevel = (rating) => {
  if (rating >= 8) return { level: "Low Risk", color: "green", bgColor: "bg-green-100", textColor: "text-green-800" };
  if (rating >= 6) return { level: "Medium Risk", color: "yellow", bgColor: "bg-yellow-100", textColor: "text-yellow-800" };
  if (rating >= 4) return { level: "High Risk", color: "orange", bgColor: "bg-orange-100", textColor: "text-orange-800" };
  return { level: "Critical", color: "red", bgColor: "bg-red-100", textColor: "text-red-800" };
};

/**
 * Get rating color for visual representation
 */
export const getRatingColor = (rating) => {
  if (rating >= 8) return { bg: "bg-green-500", text: "text-green-500", gradient: "from-green-400 to-green-600" };
  if (rating >= 6) return { bg: "bg-yellow-500", text: "text-yellow-500", gradient: "from-yellow-400 to-yellow-600" };
  if (rating >= 4) return { bg: "bg-orange-500", text: "text-orange-500", gradient: "from-orange-400 to-orange-600" };
  return { bg: "bg-red-500", text: "text-red-500", gradient: "from-red-400 to-red-600" };
};

// Helper functions for descriptions
function getBudgetDescription(ratio) {
  if (ratio <= 0.8) return "Excellent - 20%+ under budget";
  if (ratio <= 0.9) return "Very Good - 10-20% under budget";
  if (ratio <= 0.95) return "Good - 5-10% under budget";
  if (ratio <= 1.0) return "On Budget";
  if (ratio <= 1.10) return "Slightly Over Budget";
  return "Significantly Over Budget";
}

function getTimelineDescription(delayPercentage) {
  if (delayPercentage === 0) return "On Schedule - No delays";
  if (delayPercentage <= 10) return "Minor Delay - Within acceptable limits";
  if (delayPercentage <= 20) return "Moderate Delay - Needs attention";
  return "Significant Delay - Requires intervention";
}

function getProgressDescription(difference, status) {
  if (status === "Completed") return "Project Completed";
  if (difference >= 5) return "Ahead of Schedule";
  if (difference >= 0) return "On Track";
  if (difference >= -10) return "Slightly Behind";
  return "Significantly Behind Schedule";
}

function getBiddingDescription(discount, process) {
  let desc = process;
  if (discount > 0) desc += ` (${discount.toFixed(1)}% below estimate)`;
  return desc;
}

function getContractorDescription(contractor) {
  if (!contractor) return "Contractor data not available";
  return `${contractor.name} - ${contractor.stats?.totalProjects || 0} projects completed`;
}

export default { calculateProjectRating, calculateContractorRating, getRiskLevel, getRatingColor };
