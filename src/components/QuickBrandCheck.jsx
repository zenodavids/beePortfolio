"use client";

import { useState } from "react";
import "../styles/QuickBrandCheck.scss";
import {
  FaHospital,
  FaTimes,
  FaChartLine,
  FaBullseye,
  FaGlobe,
  FaHashtag,
  FaMobile,
  FaSearch,
  FaDollarSign,
  FaRocket,
  FaCheckCircle,
  FaHandshake,
  FaShieldAlt,
  FaStar,
  FaExclamationTriangle,
  FaArrowRight,
  FaCheck,
  FaChartPie,
  FaUsers,
  FaBullhorn,
} from "react-icons/fa";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from "chart.js";
import { Bar, Radar, Doughnut, Line } from "react-chartjs-2";
import { generateBrandHealthAnalysis } from "../services/brand-health.service";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
);

const formatValue = (value, type = "number") => {
  if (type === "currency") {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(1)}B`;
    } else if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value}`;
  } else if (type === "percentage") {
    return `${value}%`;
  }
  return value.toLocaleString();
};

const DAILY_LIMIT = 30; // Number of free uses per day
const STORAGE_KEY = "brand_health_usage";

const checkUsageLimit = () => {
  const today = new Date().setHours(0, 0, 0, 0);
  const stored = localStorage.getItem(STORAGE_KEY);
  let usage = stored ? JSON.parse(stored) : { count: 0, lastReset: today };

  // Reset count if it's a new day
  if (usage.lastReset < today) {
    usage = { count: 0, lastReset: today };
  }

  // Update usage
  if (usage.count >= DAILY_LIMIT) {
    return false;
  }

  usage.count++;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(usage));
  return true;
};

const remainingChecks = () => {
  const today = new Date().setHours(0, 0, 0, 0);
  const stored = localStorage.getItem(STORAGE_KEY);
  const usage = stored ? JSON.parse(stored) : { count: 0, lastReset: today };

  // Reset count if it's a new day
  if (usage.lastReset < today) {
    return DAILY_LIMIT;
  }

  return DAILY_LIMIT - usage.count;
};

export default function QuickBrandCheck() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState({
    brandName: "",
    industry: "",
    marketingChannels: "",
    currentChallenges: "",
  });
  const [remainingChecks, setRemainingChecks] = useState(3); // or whatever your default limit is
  const [analysisData, setAnalysisData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!checkUsageLimit()) {
      alert(
        "You have reached your daily limit for free brand health checks. Please sign up to continue using this feature."
      );
      return;
    }

    setLoading(true);
    try {
      const data = await generateBrandHealthAnalysis(formData);
      setResult(data);
      setAnalysisData(data);
      setRemainingChecks((prev) => prev - 1);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to analyze brand health. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Money Return Guess Chart
  // How much money you might get back
  const ROIProjectionChart = ({ data }) => (
    <div className="quick-brand-check__chart-container">
      <div className="quick-brand-check__chart-container-header">
        <FaChartLine className="icon" />
        <div className="quick-brand-check__chart-container-header-content">
          <h3>Money Return Guess</h3>
          <p>How much money you might get back</p>
        </div>
      </div>
      <div className="quick-brand-check__chart-container-content">
        <div className="quick-brand-check__chart-container-content-grid">
          <div className="quick-brand-check__chart-container-content-grid-item">
            <Bar
              data={{
                labels: ["3 Months", "6 Months", "12 Months"],
                datasets: [
                  {
                    label: "Guessed Money Return",
                    data: [
                      data.financialProjections.roi.threeMonths,
                      data.financialProjections.roi.sixMonths,
                      data.financialProjections.roi.twelveMonths,
                    ],
                    backgroundColor: [
                      "rgba(147, 51, 234, 0.5)",
                      "rgba(139, 92, 246, 0.5)",
                      "rgba(124, 58, 237, 0.5)",
                    ],
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: (value) =>
                        formatValue(Number(value), "percentage"),
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );

  // Market Share Possibility Chart
  // How much of the market you might get
  const MarketShareChart = ({ data }) => (
    <div className="quick-brand-check__chart-container">
      <div className="quick-brand-check__chart-container-header">
        <FaRocket className="icon" />
        <div className="quick-brand-check__chart-container-header-content">
          <h3>Market Share Possibility</h3>
          <p>How much of the market you might get</p>
        </div>
      </div>
      <div className="quick-brand-check__chart-container-content">
        <div className="quick-brand-check__chart-container-content-grid">
          <div className="quick-brand-check__chart-container-content-grid-item">
            <Doughnut
              data={{
                labels: ["Current Share", "Possible Gain", "Remaining Market"],
                datasets: [
                  {
                    data: [
                      data.marketMetrics.marketSize,
                      data.marketMetrics.marketShareGainPotential.percentage,
                      100 -
                        (data.marketMetrics.marketSize +
                          data.marketMetrics.marketShareGainPotential
                            .percentage),
                    ],
                    backgroundColor: [
                      "rgba(59, 130, 246, 0.5)", // Blue for current
                      "rgba(16, 185, 129, 0.5)", // Green for potential
                      "rgba(229, 231, 235, 0.5)", // Gray for remaining
                    ],
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                cutout: "60%",
                plugins: {
                  legend: {
                    position: "top",
                    labels: {
                      padding: 20,
                      usePointStyle: true,
                    },
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        const value = context.raw;
                        return `${value.toFixed(1)}%`;
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );

  // How You Compare to Others
  // Where you stand in the market
  const CompetitiveAnalysis = ({ data }) => (
    <div className="quick-brand-check__metrics-competitive-position">
      <div className="quick-brand-check__metrics-competitive-position-header">
        <FaHashtag className="icon" />
        <div className="quick-brand-check__metrics-competitive-position-content">
          <h3>How You Compare to Others</h3>
          <p>Where you stand in the market</p>
        </div>
      </div>
      <div className="quick-brand-check__metrics-competitive-position-grid">
        {Object.entries(data.competitiveAnalysis.currentPosition).map(
          ([key, values]) => (
            <div
              key={key}
              className="quick-brand-check__metrics-competitive-position-grid-item"
            >
              <h4 className="quick-brand-check__metrics-competitive-position-grid-item-header">
                {key}
              </h4>
              <ul className="quick-brand-check__metrics-competitive-position-grid-item-list">
                {values.map((item, index) => (
                  <li
                    key={index}
                    className="quick-brand-check__metrics-competitive-position-grid-item-list-item"
                  >
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          )
        )}
      </div>
    </div>
  );

  // New Components
  // Catching Up to the Best
  // How to become as good as the top company
  const MarketLeaderGapChart = ({ data }) => (
    <div className="quick-brand-check__metrics-gap-analysis">
      <div className="quick-brand-check__metrics-gap-analysis-item">
        <div className="quick-brand-check__metrics-gap-analysis-item-header">
          <FaChartLine className="icon" />
          <div className="quick-brand-check__metrics-gap-analysis-item-content">
            <h3>Catching Up to the Best</h3>
            <p>How to become as good as the top company</p>
          </div>
        </div>
        <div className="quick-brand-check__metrics-gap-analysis-item-grid">
          {data.competitiveAnalysis.marketLeaderGap.map((gap, index) => (
            <div
              key={index}
              className="quick-brand-check__metrics-gap-analysis-item-grid-item"
            >
              <div className="quick-brand-check__metrics-gap-analysis-item-header">
                <div className="quick-brand-check__metrics-gap-analysis-item-metric">
                  {gap.metric}
                </div>
                <div className="quick-brand-check__metrics-gap-analysis-item-timeframe">
                  {gap.closureTimeframe}
                </div>
              </div>
              <div className="quick-brand-check__metrics-gap-analysis-item-progress">
                <div
                  className="quick-brand-check__metrics-gap-analysis-item-progress-bar"
                  style={{ width: `${100 - gap.currentGap}%` }}
                ></div>
              </div>
              <ul className="quick-brand-check__metrics-gap-analysis-item-actions">
                {gap.requiredActions.map((action, actionIndex) => (
                  <li
                    key={actionIndex}
                    className="quick-brand-check__metrics-gap-analysis-item-actions-item"
                  >
                    • {action}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Action Plan
  // What to do and when to do it
  const RecommendationsTimeline = ({ data }) => (
    <div className="quick-brand-check__metrics-action-timeline">
      <div className="quick-brand-check__metrics-action-timeline-header">
        <FaRocket className="icon" />
        <div className="quick-brand-check__metrics-action-timeline-content">
          <h3>Action Plan</h3>
          <p>What to do and when to do it</p>
        </div>
      </div>
      <div className="quick-brand-check__metrics-action-timeline-grid">
        {Object.entries(data.recommendations).map(([timeframe, details]) => (
          <div
            key={timeframe}
            className="quick-brand-check__metrics-action-timeline-grid-item"
          >
            <h4 className="quick-brand-check__metrics-action-timeline-grid-item-header">
              {timeframe}
            </h4>
            <div className="quick-brand-check__metrics-action-timeline-grid-item-grid">
              {details.actions.map((action, index) => (
                <div
                  key={index}
                  className="quick-brand-check__metrics-action-timeline-grid-item-grid-item"
                >
                  <p className="quick-brand-check__metrics-action-timeline-grid-item-grid-item-text">
                    {action}
                  </p>
                  <div className="quick-brand-check__metrics-action-timeline-grid-item-grid-item-impact">
                    <span className="quick-brand-check__metrics-action-timeline-grid-item-grid-item-impact-label">
                      Effect: {details.impact}%
                    </span>
                    <span className="quick-brand-check__metrics-action-timeline-grid-item-grid-item-impact-value">
                      Cost: {formatValue(details.cost, "currency")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Chance Check
  // Looking at your business opportunities
  const OpportunityAssessment = ({ data }) => (
    <div className="quick-brand-check__section">
      <div className="quick-brand-check__section-header">
        <FaBullseye className="icon" />
        <div className="quick-brand-check__section-header-content">
          <h3>Growth Check</h3>
          <p>Find out how much money you might be leaving on the table</p>
        </div>
      </div>

      <div className="quick-brand-check__opportunity-grid">
        {/* Problems Card */}
        <div className="quick-brand-check__opportunity-card">
          <div className="quick-brand-check__opportunity-header">
            <div className="quick-brand-check__opportunity-icon-wrapper warning">
              <FaExclamationTriangle className="icon" />
            </div>
            <h4>Challenges Costing You Money</h4>
          </div>
          <ul className="quick-brand-check__challenges-list">
            {data.opportunityAssessment.painPoints.currentChallenges.map(
              (challenge, i) => (
                <li key={i} className="challenge-item">
                  <div className="challenge-marker"></div>
                  <span>{challenge}</span>
                </li>
              )
            )}
          </ul>
          <div className="quick-brand-check__impact-metric">
            <div className="impact-icon-wrapper">
              <FaDollarSign className="icon" />
            </div>
            <div className="impact-content">
              <span>Possible Money Impact</span>
              <strong>
                {formatValue(
                  data.opportunityAssessment.painPoints.revenueImpact,
                  "currency"
                )}
              </strong>
            </div>
          </div>
        </div>

        {/* Why You're Good Card */}
        <div className="quick-brand-check__opportunity-card">
          <div className="quick-brand-check__opportunity-header">
            <div className="quick-brand-check__opportunity-icon-wrapper success">
              <FaStar className="icon" />
            </div>
            <h4>What You Could Get</h4>
          </div>
          <div className="quick-brand-check__metrics-container">
            <div className="metric-card">
              <div className="metric-icon-wrapper primary">
                <FaUsers className="icon" />
              </div>
              <div className="metric-content">
                <span>New Customers</span>
                <strong>
                  {formatValue(
                    data.opportunityAssessment.valueProposition
                      .projectedOutcomes.pipelineGrowth,
                    "currency"
                  )}
                </strong>
              </div>
            </div>
            <div className="metric-card">
              <div className="metric-icon-wrapper info">
                <FaHandshake className="icon" />
              </div>
              <div className="metric-content">
                <span>Expected Talks</span>
                <strong>
                  {
                    data.opportunityAssessment.valueProposition
                      .projectedOutcomes.meetingsBooked
                  }
                </strong>
              </div>
            </div>
            <div className="metric-card">
              <div className="metric-icon-wrapper success">
                <FaChartLine className="icon" />
              </div>
              <div className="metric-content">
                <span>Sales Success Rate</span>
                <strong>
                  {formatValue(
                    data.opportunityAssessment.valueProposition
                      .projectedOutcomes.conversionRate,
                    "percentage"
                  )}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Plan for Success
  // Steps to make your business better
  const SuccessBlueprint = ({ data }) => (
    <div className="quick-brand-check__section">
      <div className="quick-brand-check__section-header">
        <FaRocket className="icon" />
        <div className="quick-brand-check__section-header-content">
          <h3>What You'll Get Working With Me</h3>
          <p>No more wasted time chasing the wrong customers</p>
        </div>
      </div>

      <div className="quick-brand-check__blueprint">
        {Object.entries(data.successBlueprint.implementationPlan).map(
          ([phase, details], index) => (
            <div key={phase} className="quick-brand-check__blueprint-phase">
              <div className="quick-brand-check__blueprint-phase-header">
                <div className="quick-brand-check__blueprint-phase-number">
                  {index + 1}
                </div>
                <div className="quick-brand-check__blueprint-phase-info">
                  <h4>Phase {index + 1}</h4>
                  <span>{details.timeline}</span>
                </div>
              </div>

              <div className="quick-brand-check__blueprint-content">
                <div className="quick-brand-check__blueprint-actions">
                  {details.actions.map((action, i) => (
                    <div
                      key={i}
                      className="quick-brand-check__blueprint-action"
                    >
                      <FaCheckCircle className="icon icon--success" />
                      <span>{action}</span>
                    </div>
                  ))}
                </div>

                <div className="quick-brand-check__blueprint-outcomes">
                  <h5>Expected Outcomes</h5>
                  <div className="quick-brand-check__blueprint-outcomes-list">
                    {details.expectedOutcomes.map((outcome, i) => (
                      <div
                        key={i}
                        className="quick-brand-check__blueprint-outcome"
                      >
                        <FaArrowRight className="icon icon--info" />
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );

  // Case Studies Section
  const CaseStudies = ({ data }) => {
    if (!data?.successBlueprint?.provenResults?.caseStudies) {
      return null;
    }

    return (
      <div className="quick-brand-check__section">
        <div className="quick-brand-check__section-header">
          <FaCheckCircle className="icon" />
          <div className="quick-brand-check__section-header-content">
            <h3>Proven Results</h3>
            <p>Success stories from similar partnerships</p>
          </div>
        </div>

        <div className="quick-brand-check__case-studies">
          {data.successBlueprint.provenResults.caseStudies.map(
            (study, index) => (
              <div key={index} className="quick-brand-check__case-study">
                <div className="quick-brand-check__case-study-header">
                  <div className="quick-brand-check__case-study-info">
                    <h4>{study.industry}</h4>
                    <span className="quick-brand-check__case-study-timeline">
                      {study.timeframe}
                    </span>
                  </div>
                  <div className="quick-brand-check__case-study-badge">
                    Success Story
                  </div>
                </div>

                <div className="quick-brand-check__case-study-content">
                  <div className="quick-brand-check__case-study-section">
                    <h5>Challenge</h5>
                    <p>{study.challenge}</p>
                  </div>
                  <div className="quick-brand-check__case-study-section">
                    <h5>Our Solution</h5>
                    <p>{study.solution}</p>
                  </div>
                </div>

                <div className="quick-brand-check__case-study-results">
                  <div className="quick-brand-check__case-study-metric">
                    <FaChartLine className="icon icon--success" />
                    <div>
                      <span>Pipeline Generated</span>
                      <strong>
                        {formatValue(
                          study.results.pipelineGenerated,
                          "currency"
                        )}
                      </strong>
                    </div>
                  </div>
                  <div className="quick-brand-check__case-study-metric">
                    <FaHandshake className="icon icon--primary" />
                    <div>
                      <span>Meetings Booked</span>
                      <strong>{study.results.meetingsBooked}</strong>
                    </div>
                  </div>
                  <div className="quick-brand-check__case-study-metric">
                    <FaRocket className="icon icon--info" />
                    <div>
                      <span>Conversion Rate</span>
                      <strong>
                        {formatValue(
                          study.results.conversionRate,
                          "percentage"
                        )}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    );
  };

  // Collaboration Framework Component
  const CollaborationFramework = ({ data }) => (
    <div className="quick-brand-check__section">
      <div className="quick-brand-check__section-header">
        <FaHandshake className="icon" />
        <div className="quick-brand-check__section-header-content">
          <h3>Working Together</h3>
          <p>How we can solve your challenges together</p>
        </div>
      </div>

      <div className="quick-brand-check__collaboration">
        <div className="quick-brand-check__collaboration-grid">
          <div className="quick-brand-check__collaboration-card">
            <div className="quick-brand-check__collaboration-header">
              <div className="quick-brand-check__collaboration-icon-wrapper primary">
                <FaBullseye className="icon" />
              </div>
              <h4>What You'll Get</h4>
            </div>
            <ul className="quick-brand-check__benefits-list">
              <li className="benefit-card">
                <div className="benefit-icon">
                  <FaCheck className="icon" />
                </div>
                <div>
                  <strong>More Quality Meetings</strong>
                  <p>
                    Connect with decision-makers who actually need your solution
                  </p>
                </div>
              </li>
              <li className="benefit-card">
                <div className="benefit-icon">
                  <FaCheck className="icon" />
                </div>
                <div>
                  <strong>Save Time and Resources</strong>
                  <p>
                    Focus on closing deals while I handle the prospecting work
                  </p>
                </div>
              </li>
              <li className="benefit-card">
                <div className="benefit-icon">
                  <FaCheck className="icon" />
                </div>
                <div>
                  <strong>Know Exactly What Customers Want</strong>
                  <p>Stop guessing what makes customers say yes</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="quick-brand-check__collaboration-card">
            <div className="quick-brand-check__collaboration-header">
              <div className="quick-brand-check__collaboration-icon-wrapper success">
                <FaRocket className="icon" />
              </div>
              <h4>How We'll Work</h4>
            </div>
            <ul className="quick-brand-check__steps-list">
              <li>
                <span className="step">1</span>
                <div>
                  <strong>Understanding Your Goals</strong>
                  <p>
                    We'll start by clearly defining what success looks like for
                    you
                  </p>
                </div>
              </li>
              <li>
                <span className="step">2</span>
                <div>
                  <strong>Finding Your Best Customers</strong>
                  <p>
                    I'll identify and reach out to companies that match your
                    ideal customer profile
                  </p>
                </div>
              </li>
              <li>
                <span className="step">3</span>
                <div>
                  <strong>Building Relationships</strong>
                  <p>
                    Create meaningful connections that lead to long-term
                    partnerships
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="quick-brand-check__collaboration-card results">
          <div className="quick-brand-check__collaboration-header">
            <div className="quick-brand-check__collaboration-icon-wrapper info">
              <FaChartLine className="icon" />
            </div>
            <h4>Expected Results</h4>
          </div>
          <div className="quick-brand-check__roi-timeline">
            {Object.entries(
              data.collaborationFramework.investmentAndReturns.projectedROI
            ).map(([period, value]) => (
              <div key={period} className="quick-brand-check__roi-milestone">
                <div className="quick-brand-check__roi-period">
                  <strong>{period.replace(/([A-Z])/g, " $1").trim()}</strong>
                  <span>Expected Growth</span>
                </div>
                <div className="quick-brand-check__roi-value">
                  {formatValue(value, "percentage")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Risk Mitigation Component
  const RiskMitigation = ({ data }) => (
    <div className="quick-brand-check__section">
      <div className="quick-brand-check__section-header">
        <FaShieldAlt className="icon" />
        <h3>Risk Management</h3>
      </div>

      <div className="quick-brand-check__risk-grid">
        {/* Challenges */}
        <div className="quick-brand-check__card">
          <h4>Potential Challenges</h4>
          <ul className="quick-brand-check__risk-list">
            {data.riskMitigation.potentialChallenges.map((challenge, i) => (
              <li key={i}>{challenge}</li>
            ))}
          </ul>
        </div>

        {/* Mitigation Strategies */}
        <div className="quick-brand-check__card">
          <h4>Mitigation Strategies</h4>
          <ul className="quick-brand-check__risk-list">
            {data.riskMitigation.mitigationStrategies.map((strategy, i) => (
              <li key={i}>{strategy}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  // Market Intelligence Dashboard
  const MarketIntelligence = ({ data }) => {
    if (!data) {
      return null;
    }

    const metrics = [
      {
        label: "Market Share",
        value: data.marketSharePercentage || 0,
        icon: <FaChartPie className="icon icon--primary" />,
        description: "Current market position",
      },
      {
        label: "Industry Growth",
        value: data.industryGrowthRate || 0,
        icon: <FaChartLine className="icon icon--success" />,
        description: "Annual growth rate",
      },
      {
        label: "Brand Reputation",
        value: data.brandReputationScore || 0,
        icon: <FaStar className="icon icon--warning" />,
        description: "Market perception score",
      },
      {
        label: "Digital Presence",
        value: data.digitalPresenceScore || 0,
        icon: <FaGlobe className="icon icon--info" />,
        description: "Online visibility score",
      },
    ];

    return (
      <div className="quick-brand-check__section">
        <div className="quick-brand-check__section-header">
          <FaChartPie className="icon" />
          <div className="quick-brand-check__section-header-content">
            <h3>Market Intelligence</h3>
            <p>Your position in the market landscape</p>
          </div>
        </div>

        <div className="quick-brand-check__market-metrics">
          {metrics.map((metric, index) => (
            <div key={index} className="quick-brand-check__market-metric">
              <div className="quick-brand-check__market-metric-header">
                {metric.icon}
                <div>
                  <h4>{metric.label}</h4>
                  <span>{metric.description}</span>
                </div>
                <strong>{formatValue(metric.value, "percentage")}</strong>
              </div>
              <div className="quick-brand-check__market-metric-progress">
                <div
                  className="quick-brand-check__market-metric-progress-bar"
                  style={{ width: `${metric.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Financial Metrics Component
  const FinancialMetrics = ({ data }) => {
    const costData = {
      labels: ["Q1", "Q2", "Q3", "Q4"],
      datasets: [
        {
          label: "Customer Acquisition Cost Trend",
          data: [
            data.customerAcquisitionCost * 0.85,
            data.customerAcquisitionCost * 0.9,
            data.customerAcquisitionCost * 0.95,
            data.customerAcquisitionCost,
          ],
          backgroundColor: "rgba(99, 102, 241, 0.2)",
          borderColor: "rgba(99, 102, 241, 1)",
          borderWidth: 2,
          tension: 0.4,
        },
      ],
    };

    return (
      <div className="quick-brand-check__section">
        <div className="quick-brand-check__section-header">
          <FaDollarSign className="icon" />
          <div className="quick-brand-check__section-header-content">
            <h3>Financial Overview</h3>
            <p>Key metrics and performance indicators</p>
          </div>
        </div>

        <div className="quick-brand-check__financial">
          <div className="quick-brand-check__financial-metrics">
            <div className="quick-brand-check__financial-card">
              <div className="quick-brand-check__financial-card-header">
                <FaChartLine className="icon icon--success" />
                <h4>Customer Lifetime Value</h4>
              </div>
              <div className="quick-brand-check__financial-value">
                <strong>
                  {formatValue(data.customerLifetimeValue, "currency")}
                </strong>
                <span>Per Customer Average</span>
              </div>
            </div>

            <div className="quick-brand-check__financial-card">
              <div className="quick-brand-check__financial-card-header">
                <FaBullseye className="icon icon--primary" />
                <h4>Marketing Budget</h4>
              </div>
              <div className="quick-brand-check__financial-value">
                <strong>{formatValue(data.marketingBudget, "currency")}</strong>
                <span>Quarterly Allocation</span>
              </div>
            </div>

            <div className="quick-brand-check__financial-card">
              <div className="quick-brand-check__financial-card-header">
                <FaRocket className="icon icon--info" />
                <h4>Revenue Target</h4>
              </div>
              <div className="quick-brand-check__financial-value">
                <strong>{formatValue(data.revenueTarget, "currency")}</strong>
                <span>Annual Goal</span>
              </div>
            </div>
          </div>

          <div className="quick-brand-check__financial-chart">
            <div className="quick-brand-check__financial-chart-header">
              <h4>Customer Acquisition Cost Trend</h4>
              <span>Quarterly Projection</span>
            </div>
            <div className="quick-brand-check__financial-chart-container">
              <Bar
                data={costData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        display: true,
                        color: "rgba(0, 0, 0, 0.05)",
                      },
                      ticks: {
                        callback: (value) =>
                          formatValue(Number(value), "currency"),
                      },
                    },
                    x: {
                      grid: {
                        display: false,
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Market Trends & Predictions
  const MarketTrends = ({ data }) => (
    <div className="quick-brand-check__section">
      <div className="quick-brand-check__section-header">
        <FaGlobe className="icon" />
        <h3>Market Trends & Predictions</h3>
      </div>

      <div className="quick-brand-check__trends-grid">
        <div className="quick-brand-check__trends-list">
          <h4>Industry Trends</h4>
          <ul>
            {data.industryTrends.map((trend, i) => (
              <li key={i}>{trend}</li>
            ))}
          </ul>
        </div>

        <div className="quick-brand-check__predictions">
          <div className="quick-brand-check__prediction">
            <span>Short Term</span>
            <p>{data.shortTermPrediction}</p>
          </div>
          <div className="quick-brand-check__prediction">
            <span>Medium Term</span>
            <p>{data.mediumTermPrediction}</p>
          </div>
          <div className="quick-brand-check__prediction">
            <span>Long Term</span>
            <p>{data.longTermPrediction}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const MarketOverview = ({ data }) => (
    <div className="quick-brand-check__section">
      <div className="quick-brand-check__section-header">
        <FaSearch className="icon" />
        <div className="quick-brand-check__section-header-content">
          <h3>Your Market Position</h3>
          <p>Let's see where you stand and what opportunities you're missing</p>
        </div>
      </div>

      <div className="quick-brand-check__market-overview">
        {/* Key Metrics */}
        <div className="quick-brand-check__metrics-grid">
          <div className="quick-brand-check__metric-card">
            <span>Sales Cycle</span>
            <strong>{data.salesCycleDuration}</strong>
          </div>
          <div className="quick-brand-check__metric-card">
            <span>Competitors</span>
            <strong>{data.competitorCount}</strong>
          </div>
          <div className="quick-brand-check__metric-card">
            <span>Market Size</span>
            <strong>{formatValue(data.marketSize, "currency")}</strong>
          </div>
          <div className="quick-brand-check__metric-card">
            <span>Market Share</span>
            <strong>{formatValue(data.marketPenetration, "percentage")}</strong>
          </div>
        </div>

        {/* Target Groups */}
        <div className="quick-brand-check__groups">
          <div className="quick-brand-check__group">
            <h4>Target Demographics</h4>
            <div className="quick-brand-check__tags">
              {data.targetDemographics.map((demo, i) => (
                <span key={i} className="quick-brand-check__tag">
                  {demo}
                </span>
              ))}
            </div>
          </div>

          <div className="quick-brand-check__group">
            <h4>Key Decision Makers</h4>
            <div className="quick-brand-check__tags">
              {data.decisionMakers.map((maker, i) => (
                <span key={i} className="quick-brand-check__tag">
                  {maker}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Analysis Sections */}
        <div className="quick-brand-check__analysis">
          <div className="quick-brand-check__analysis-section">
            <h4>
              <FaStar className="icon icon--small" />
              Competitive Advantages
            </h4>
            <div className="quick-brand-check__list">
              {data.competitiveAdvantages.map((advantage, i) => (
                <div key={i} className="quick-brand-check__list-item">
                  <FaCheck className="icon icon--success" />
                  <span>{advantage}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="quick-brand-check__analysis-section">
            <h4>
              <FaShieldAlt className="icon icon--small" />
              Market Entry Barriers
            </h4>
            <div className="quick-brand-check__list">
              {data.marketEntryBarriers.map((barrier, i) => (
                <div key={i} className="quick-brand-check__list-item">
                  <FaExclamationTriangle className="icon icon--warning" />
                  <span>{barrier}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="quick-brand-check__analysis-section">
            <h4>
              <FaRocket className="icon icon--small" />
              Growth Opportunities
            </h4>
            <div className="quick-brand-check__list">
              {data.growthOpportunities.map((opportunity, i) => (
                <div key={i} className="quick-brand-check__list-item">
                  <FaArrowRight className="icon icon--info" />
                  <span>{opportunity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="quick-brand-check__button"
        >
          <FaBullseye className="icon" />
          <span style={{ color: "white" }}>Quick Brand Check</span>
        </button>
      )}

      {isOpen && (
        <div className="quick-brand-check__modal">
          <div className="quick-brand-check__modal-container">
            <div className="quick-brand-check__modal-content">
              <button
                onClick={() => setIsOpen(false)}
                className="quick-brand-check__modal-close"
              >
                <FaTimes />
              </button>

              <h2 className="quick-brand-check__title">
                Brand Health Analysis
              </h2>

              {!result ? (
                <form
                  onSubmit={handleSubmit}
                  className="quick-brand-check__form"
                >
                  <div className="quick-brand-check__form-limit">
                    {`${remainingChecks} free checks remaining today`}
                  </div>

                  <div className="quick-brand-check__form-fields">
                    <div className="quick-brand-check__form-group">
                      <label htmlFor="brandName">Company Name</label>
                      <input
                        id="brandName"
                        type="text"
                        required
                        value={formData.brandName}
                        placeholder="For example: Acme Corp"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            brandName: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="quick-brand-check__form-group">
                      <label htmlFor="industry">Industry</label>
                      <input
                        id="industry"
                        type="text"
                        required
                        value={formData.industry}
                        placeholder="For example: SaaS / Technology"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            industry: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="quick-brand-check__form-group">
                      <label htmlFor="companySize">Company Size</label>
                      <select
                        id="companySize"
                        required
                        value={formData.companySize}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            companySize: e.target.value,
                          })
                        }
                      >
                        <option value="">Select company size</option>
                        <option value="1-50">1-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201-500">201-500 employees</option>
                        <option value="501+">501+ employees</option>
                      </select>
                    </div>

                    <div className="quick-brand-check__form-group">
                      <label htmlFor="targetMarket">Target Market</label>
                      <input
                        id="targetMarket"
                        type="text"
                        required
                        value={formData.targetMarket}
                        placeholder="For example: Enterprise B2B Companies"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            targetMarket: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="quick-brand-check__form-group full-width">
                      <label htmlFor="marketingChannels">
                        Current Marketing Channels
                      </label>
                      <input
                        id="marketingChannels"
                        type="text"
                        required
                        value={formData.marketingChannels}
                        placeholder="For example: LinkedIn, Email, Events, Direct Sales"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            marketingChannels: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="quick-brand-check__form-group full-width">
                      <label htmlFor="currentChallenges">
                        Current Challenges
                      </label>
                      <textarea
                        id="currentChallenges"
                        required
                        value={formData.currentChallenges}
                        placeholder="Describe your main business challenges and goals..."
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            currentChallenges: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="quick-brand-check__submit"
                  >
                    {loading ? (
                      <span className="quick-brand-check__loading">
                        <span
                          style={{ color: "white" }}
                          className="quick-brand-check__loading-spinner"
                        ></span>
                        Analyzing...
                      </span>
                    ) : (
                      "Analyze Opportunity"
                    )}
                  </button>
                </form>
              ) : (
                <div className="quick-brand-check__results">
                  <MarketOverview data={result} />
                  {analysisData && (
                    <>
                      <MarketIntelligence data={analysisData} />
                      <CaseStudies data={analysisData} />
                      <CollaborationFramework data={analysisData} />
                      <RiskMitigation data={analysisData} />
                    </>
                  )}
                  <OpportunityAssessment data={result} />
                  <MarketTrends data={result} />
                  <SuccessBlueprint data={result} />
                  <FinancialMetrics data={result} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
