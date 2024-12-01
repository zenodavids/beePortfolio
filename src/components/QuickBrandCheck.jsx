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

// Revenue Impact Chart Component
const RevenueImpactChart = ({ data }) => {
  const chartData = {
    labels: ["Current", "6 Months", "12 Months"],
    datasets: [
      {
        label: "Revenue Projection",
        data: [
          data.financialProjections.currentState.revenue,
          data.financialProjections.projectedState.revenue * 0.5,
          data.financialProjections.projectedState.revenue,
        ],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
      },
    ],
  };

  return (
    <div className="quick-brand-check__chart-container">
      <div className="quick-brand-check__chart-container-header">
        <FaDollarSign className="icon icon--green" />
        <div className="quick-brand-check__chart-container-header-content">
          <h3>Revenue Impact</h3>
          <p>How your revenue is expected to grow over time</p>
        </div>
      </div>
      <div style={{ height: "300px" }}>
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: (value) => formatValue(Number(value), "currency"),
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

// Digital Performance Radar Chart
const DigitalPerformanceChart = ({ data }) => {
  const chartData = {
    labels: [
      "Social Media",
      "Website Traffic",
      "Mobile Engagement",
      "Search Visibility",
      "Conversion Rate",
    ],
    datasets: [
      {
        label: "Current Performance",
        data: [
          data.digitalMetrics.socialMediaReach,
          data.digitalMetrics.websiteTraffic,
          data.digitalMetrics.mobileEngagement,
          data.digitalMetrics.searchVisibility,
          data.digitalMetrics.conversionRate,
        ],
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        borderColor: "rgb(99, 102, 241)",
        pointBackgroundColor: "rgb(99, 102, 241)",
      },
    ],
  };

  return (
    <div className="quick-brand-check__chart-container">
      <div className="quick-brand-check__chart-container-header">
        <FaGlobe className="icon icon--indigo" />
        <div className="quick-brand-check__chart-container-header-content">
          <h3>Digital Performance</h3>
          <p>How well you are doing online across different channels</p>
        </div>
      </div>
      <div style={{ height: "400px" }}>
        <Radar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              r: {
                beginAtZero: true,
                max: 100,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

// Core Metrics Display Component
const CoreMetricsDisplay = ({ data }) => (
  <div className="quick-brand-check__chart-container">
    <div className="quick-brand-check__metrics-core-header">
      <FaChartLine className="icon" />
      <div>
        <h3>Core Brand Metrics</h3>
        <p>Important numbers for your brand</p>
      </div>
    </div>
    <div className="quick-brand-check__metrics-core-grid">
      {Object.entries(data.coreMetrics).map(
        ([key, value]) =>
          key !== "revenueImpact" && (
            <div
              key={key}
              className="quick-brand-check__metrics-core-grid-item"
            >
              <p className="quick-brand-check__metrics-core-grid-item-label">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </p>
              <p className="quick-brand-check__metrics-core-grid-item-value">
                {typeof value === "number"
                  ? formatValue(value, "percentage")
                  : String(value)}
              </p>
            </div>
          )
      )}
    </div>
  </div>
);

// Market Metrics Chart Component
const MarketMetricsChart = ({ data }) => {
  const { marketMetrics } = data;
  return (
    <div className="quick-brand-check__metrics-market-container">
      <div className="quick-brand-check__metrics-market-header">
        <FaGlobe className="icon" />
        <div className="quick-brand-check__metrics-market-content">
          <h3>Market Performance</h3>
          <p>How you are doing in the market</p>
        </div>
      </div>
      <div className="quick-brand-check__metrics-market-grid">
        <div className="quick-brand-check__metrics-market-item">
          {Object.entries(marketMetrics)
            .filter(([key]) => key !== "marketShareGainPotential")
            .map(([key, value]) => (
              <div
                key={key}
                className="quick-brand-check__metrics-market-item-grid"
              >
                <p className="quick-brand-check__metrics-market-item-key">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </p>
                <p className="quick-brand-check__metrics-market-item-value">
                  {typeof value === "number"
                    ? formatValue(
                        value,
                        key === "revenue" ? "currency" : "percentage"
                      )
                    : String(value)}
                </p>
              </div>
            ))}
        </div>
        <div className="quick-brand-check__metrics-market-item">
          <h4 className="quick-brand-check__metrics-market-item-header">
            Market Share Gain Potential
          </h4>
          <p className="quick-brand-check__metrics-market-item-value">
            {marketMetrics.marketShareGainPotential.percentage}%
          </p>
          <p className="quick-brand-check__metrics-market-item-subtext">
            Timeline: {marketMetrics.marketShareGainPotential.timeframe}
          </p>
          <p className="quick-brand-check__metrics-market-item-subtext">
            Investment:
            {formatValue(
              marketMetrics.marketShareGainPotential.requiredInvestment,
              "currency"
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
// Digital Improvement Potential Component
const DigitalImprovementChart = ({ data }) => (
  <div className="quick-brand-check__metrics-gap-analysis">
    <div className="quick-brand-check__metrics-gap-analysis-item">
      <div className="quick-brand-check__metrics-gap-analysis-item-header">
        <FaMobile className="icon" />
        <div className="quick-brand-check__metrics-gap-analysis-item-content">
          <h3>Digital Improvement Opportunities</h3>
          <p>Areas where you can grow online</p>
        </div>
      </div>
      <div className="quick-brand-check__metrics-gap-analysis-item-grid">
        {data.digitalMetrics.improvementPotential.map((item, index) => (
          <div
            key={index}
            className="quick-brand-check__metrics-gap-analysis-item-grid-item"
          >
            <div className="quick-brand-check__metrics-gap-analysis-item-header">
              <div className="quick-brand-check__metrics-gap-analysis-item-metric">
                {item.metric}
              </div>
              <div className="quick-brand-check__metrics-gap-analysis-item-timeframe">
                {item.timeToAchieve}
              </div>
            </div>
            <div className="quick-brand-check__metrics-gap-analysis-item-progress">
              <div
                className="quick-brand-check__metrics-gap-analysis-item-progress-bar"
                style={{ width: `${item.currentValue}%` }}
              ></div>
              <div
                className="quick-brand-check__metrics-gap-analysis-item-progress-bar"
                style={{ width: `${item.potentialValue - item.currentValue}%` }}
              ></div>
            </div>
            <p className="quick-brand-check__metrics-gap-analysis-item-subtext">
              Investment needed:{" "}
              {formatValue(item.investmentNeeded, "currency")}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Financial State Comparison Component
const FinancialStateComparison = ({ data }) => (
  <div className="quick-brand-check__metrics-gap-analysis">
    <div className="quick-brand-check__metrics-gap-analysis-item">
      <div className="quick-brand-check__metrics-gap-analysis-item-header">
        <FaDollarSign className="icon" />
        <div className="quick-brand-check__metrics-gap-analysis-item-content">
          <h3>Financial State Comparison</h3>
          <p>Current vs Projected Performance</p>
        </div>
      </div>
      <div className="quick-brand-check__metrics-gap-analysis-item-grid">
        <div className="quick-brand-check__metrics-gap-analysis-item-grid-item">
          <h4 className="quick-brand-check__metrics-gap-analysis-item-header">
            Current State
          </h4>
          {Object.entries(data.financialProjections.currentState).map(
            ([key, value]) => (
              <div
                key={key}
                className="quick-brand-check__metrics-gap-analysis-item-grid-item-grid"
              >
                <p className="quick-brand-check__metrics-gap-analysis-item-grid-item-key">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </p>
                <p className="quick-brand-check__metrics-gap-analysis-item-grid-item-value">
                  {typeof value === "number"
                    ? formatValue(value, "currency")
                    : String(value)}
                </p>
              </div>
            )
          )}
        </div>
        <div className="quick-brand-check__metrics-gap-analysis-item-grid-item">
          <h4 className="quick-brand-check__metrics-gap-analysis-item-header">
            Projected State (
            {data.financialProjections.projectedState.timeToAchieve})
          </h4>
          {Object.entries(data.financialProjections.projectedState)
            .filter(([key]) => key !== "timeToAchieve")
            .map(([key, value]) => (
              <div
                key={key}
                className="quick-brand-check__metrics-gap-analysis-item-grid-item-grid"
              >
                <p className="quick-brand-check__metrics-gap-analysis-item-grid-item-key">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </p>
                <p className="quick-brand-check__metrics-gap-analysis-item-grid-item-value">
                  {typeof value === "number"
                    ? formatValue(value, "currency")
                    : String(value)}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  </div>
);

// Competitor Benchmark Component
const CompetitorBenchmark = ({ data }) => (
  <div className="quick-brand-check__chart-container">
    <div className="quick-brand-check__chart-container-header">
      <FaChartLine className="icon" />
      <div className="quick-brand-check__chart-container-header-content">
        <h3>Competitor Benchmark</h3>
        <p>See how you compare to your competitors</p>
      </div>
    </div>
    <div className="quick-brand-check__competitor-grid">
      {data.competitiveAnalysis.competitorBenchmark.map((competitor, index) => (
        <div key={index} className="quick-brand-check__competitor-card">
          <h4>{competitor.competitor}</h4>
          <div className="quick-brand-check__metric-groups">
            <div className="metric-group leading">
              <span className="label">Leading In</span>
              {competitor.leadingMetrics.map((metric, idx) => (
                <div key={idx} className="metric-item">
                  <span className="bullet leading">●</span>
                  {metric}
                </div>
              ))}
            </div>
            <div className="metric-group gaining">
              <span className="label">Gaining Ground</span>
              {competitor.gainingMetrics.map((metric, idx) => (
                <div key={idx} className="metric-item">
                  <span className="bullet gaining">●</span>
                  {metric}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

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
      setRemainingChecks((prev) => prev - 1);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to analyze brand health. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ROI Projection Chart
  const ROIProjectionChart = ({ data }) => (
    <div className="quick-brand-check__chart-container">
      <div className="quick-brand-check__chart-container-header">
        <FaChartLine className="icon" />
        <div className="quick-brand-check__chart-container-header-content">
          <h3>ROI Projections</h3>
          <p>Expected return on investment</p>
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
                    label: "Projected ROI",
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

  // Market Share Potential Chart
  const MarketShareChart = ({ data }) => (
    <div className="quick-brand-check__chart-container">
      <div className="quick-brand-check__chart-container-header">
        <FaRocket className="icon" />
        <div className="quick-brand-check__chart-container-header-content">
          <h3>Market Share Potential</h3>
          <p>How much of the market you can capture</p>
        </div>
      </div>
      <div className="quick-brand-check__chart-container-content">
        <div className="quick-brand-check__chart-container-content-grid">
          <div className="quick-brand-check__chart-container-content-grid-item">
            <Doughnut
              data={{
                labels: ["Current Share", "Potential Gain", "Remaining Market"],
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

  // Competitive Analysis Section
  const CompetitiveAnalysis = ({ data }) => (
    <div className="quick-brand-check__metrics-competitive-position">
      <div className="quick-brand-check__metrics-competitive-position-header">
        <FaHashtag className="icon" />
        <div className="quick-brand-check__metrics-competitive-position-content">
          <h3>Competitive Position</h3>
          <p>Where you stand compared to others</p>
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
  const MarketLeaderGapChart = ({ data }) => (
    <div className="quick-brand-check__metrics-gap-analysis">
      <div className="quick-brand-check__metrics-gap-analysis-item">
        <div className="quick-brand-check__metrics-gap-analysis-item-header">
          <FaChartLine className="icon" />
          <div className="quick-brand-check__metrics-gap-analysis-item-content">
            <h3>Market Leader Gap Analysis</h3>
            <p>How far you are from being the market leader</p>
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

  const RecommendationsTimeline = ({ data }) => (
    <div className="quick-brand-check__metrics-action-timeline">
      <div className="quick-brand-check__metrics-action-timeline-header">
        <FaRocket className="icon" />
        <div className="quick-brand-check__metrics-action-timeline-content">
          <h3>Action Timeline</h3>
          <p>Steps you should take and when</p>
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
                      Impact: {details.impact}%
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

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="quick-brand-check__button"
        >
          <FaBullseye className="icon" />
          <span>Quick Brand Check</span>
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
                      <label>Brand Name</label>
                      <input
                        type="text"
                        required
                        value={formData.brandName}
                        placeholder="For example: Tesla"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            brandName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="quick-brand-check__form-group">
                      <label>Industry</label>
                      <input
                        type="text"
                        required
                        value={formData.industry}
                        placeholder="For example: Automotive & Clean Energy"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            industry: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="quick-brand-check__form-group">
                      <label>Marketing Channels</label>
                      <input
                        type="text"
                        required
                        value={formData.marketingChannels}
                        placeholder="For example: Social Media (X/Twitter), Website Direct Sales, Showrooms, PR Events"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            marketingChannels: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="quick-brand-check__form-group">
                      <label>Current Challenges</label>
                      <textarea
                        required
                        value={formData.currentChallenges}
                        placeholder="For example: Increasing competition in EV market, production scalability, pricing pressure from competitors, regulatory challenges in different markets"
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
                    {loading ? "Analyzing..." : "Analyze Brand"}
                  </button>
                </form>
              ) : (
                <div className="quick-brand-check__results">
                  <div className="quick-brand-check__charts">
                    <CoreMetricsDisplay data={result} />
                    <MarketMetricsChart data={result} />
                    <RevenueImpactChart data={result} />
                    <DigitalPerformanceChart data={result} />
                    <DigitalImprovementChart data={result} />
                    <ROIProjectionChart data={result} />
                    <FinancialStateComparison data={result} />
                    <CompetitiveAnalysis data={result} />
                    <CompetitorBenchmark data={result} />
                    <MarketLeaderGapChart data={result} />
                    <MarketShareChart data={result} />
                  </div>
                  <RecommendationsTimeline data={result} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
