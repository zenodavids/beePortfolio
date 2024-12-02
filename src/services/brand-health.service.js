import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

export async function generateBrandHealthAnalysis(formData) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      maxOutputTokens: 8192,
      temperature: 0.7,
      topP: 0.8,
      topK: 40,
    },
  });

  // Using your exact prompt without any modifications
  const prompt = `Analyze this potential business opportunity and create a compelling case for collaboration. Based on the following inputs, generate a strategic partnership proposal that demonstrates the value I can bring as an SDR/Business Development professional:

  Brand: ${formData.brandName}
Industry: ${formData.industry}
Company Size: ${formData.companySize}
Target Market: ${formData.targetMarket}
Marketing Channels: ${formData.marketingChannels}
Challenges: ${formData.currentChallenges}

Important:
1. All numerical values must be realistic for the industry
2. All monetary values in USD
3. All timeframes must be specific (e.g., "30 days", "90 days")
4. Focus on achievable, measurable outcomes
5. Include specific success metrics past experience


Return a valid JSON object with the following structure. DO NOT include any explanatory text outside the JSON:


{
  "opportunityAssessment": {
    "painPoints": {
      "currentChallenges": string[],
      "missedOpportunities": string[],
      "revenueImpact": number,
      "marketPositionImpact": string
    },
    "valueProposition": {
      "immediateGains": string[],
      "projectedOutcomes": {
        "pipelineGrowth": number,
        "meetingsBooked": number,
        "conversionRate": number,
        "timeframe": string
      },
      "uniqueAdvantages": string[]
    }
  },
  "successBlueprint": {
    "implementationPlan": {
      "phase1": {
        "actions": string[],
        "timeline": string,
        "expectedOutcomes": string[]
      },
      "phase2": {
        "actions": string[],
        "timeline": string,
        "expectedOutcomes": string[]
      },
      "phase3": {
        "actions": string[],
        "timeline": string,
        "expectedOutcomes": string[]
      }
    },
    "provenResults": {
      "caseStudies": [
        {
          "industry": string,
          "challenge": string,
          "solution": string,
          "results": {
            "pipelineGenerated": number,
            "meetingsBooked": number,
            "conversionRate": number,
            "timeframe": string
          }
        }
      ]
    }
  },
  "collaborationFramework": {
    "engagementModel": {
      "approach": string,
      "communicationStructure": string[],
      "toolsAndTechnology": string[],
      "reportingMetrics": string[]
    },
    "investmentAndReturns": {
      "projectedROI": {
        "threeMonths": number,
        "sixMonths": number,
        "twelveMonths": number
      },
      "successMetrics": {
        "kpis": string[],
        "benchmarks": {
          "baseline": number,
          "target": number,
          "timeline": string
        }
      }
    }
  },
  "riskMitigation": {
    "potentialChallenges": string[],
    "mitigationStrategies": string[],
    "contingencyPlans": string[]
  },
  "marketSharePercentage": number,
  "industryGrowthRate": number,
  "brandReputationScore": number,
  "websiteTrafficMonthly": number,
  "socialMediaFollowers": number,
  "averageEngagementRate": number,
  "customerAcquisitionCost": number,
  "customerLifetimeValue": number,
  "salesCycleDuration": string,
  "competitorCount": number,
  "marketSize": number,
  "marketPenetration": number,
  "techStackMaturity": "low" | "medium" | "high",
  "digitalPresenceScore": number,
  "brandAwarenessScore": number,
  "leadQualityScore": number,
  "marketingBudget": number,
  "revenueTarget": number,
  "primaryCompetitors": string[],
  "industryTrends": string[],
  "targetDemographics": string[],
  "decisionMakers": string[],
  "purchaseDrivers": string[],
  "marketingEffectiveness": number,
  "contentEngagement": number,
  "channelPerformance": Record<string, number>,
  "upcomingEvents": string[],
  "regulatoryRequirements": string[],
  "shortTermPrediction": string,
  "mediumTermPrediction": string,
  "longTermPrediction": string,
  "estimatedMarketReach": number,
  "brandSentiment": "positive" | "neutral" | "negative",
  "competitiveAdvantages": string[],
  "marketEntryBarriers": string[],
  "growthOpportunities": string[]
}

Return ONLY valid JSON.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    const cleanText = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanText);
  } catch (error) {
    console.error("Brand health analysis error:", error);
    throw error;
  }
}
