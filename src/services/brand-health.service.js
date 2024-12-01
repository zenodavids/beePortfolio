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
  const prompt = `Analyze this brand and return a comprehensive JSON health assessment. Consider market intelligence, competitive position, and future readiness based on the following data:
:

  Brand: ${formData.brandName}
Industry: ${formData.industry}
Marketing Channels: ${formData.marketingChannels}
Challenges: ${formData.currentChallenges}

Important:
1. All numerical values must be realistic
2. All arrays must contain at least 2 items
3. All percentage values must be between 0-100
4. All timeframes must be specific (e.g., "3 months", "6 months")
5. All monetary values must be in USD


Return a valid JSON object with the following structure. DO NOT include any explanatory text outside the JSON:


{
  "coreMetrics": {
    "brandScore": number,
    "digitalScore": number,
    "loyaltyScore": number,
    "visualScore": number,
    "voiceScore": number,
    "potentialGrowth": number,
    "revenueImpact": {
      "current": number,
      "projected6Months": number,
      "projected12Months": number,
      "confidence": number
    }
  },
  "marketMetrics": {
    "marketSize": number,
    "marketGrowthRate": number,
    "competitionLevel": number,
    "marketOpportunityScore": number,
    "brandSafetyScore": number,
    "marketShareGainPotential": {
      "percentage": number,
      "timeframe": string,
      "requiredInvestment": number
    }
  },
  "digitalMetrics": {
    "socialMediaReach": number,
    "websiteTraffic": number,
    "mobileEngagement": number,
    "searchVisibility": number,
    "conversionRate": number,
    "improvementPotential": [
      {
        "metric": string,
        "currentValue": number,
        "potentialValue": number,
        "investmentNeeded": number,
        "timeToAchieve": string
      }
    ]
  },
  "financialProjections": {
    "currentState": {
      "revenue": number,
      "marketingCosts": number,
      "customerAcquisitionCost": number,
      "customerLifetimeValue": number
    },
    "projectedState": {
      "revenue": number,
      "marketingCosts": number,
      "customerAcquisitionCost": number,
      "customerLifetimeValue": number,
      "timeToAchieve": string
    },
    "roi": {
      "threeMonths": number,
      "sixMonths": number,
      "twelveMonths": number,
      "confidence": number
    }
  },
  "competitiveAnalysis": {
    "currentPosition": {
      "strengths": string[],
      "weaknesses": string[],
      "opportunities": string[],
      "threats": string[]
    },
    "marketLeaderGap": [
      {
        "metric": string,
        "currentGap": number,
        "closureTimeframe": string,
        "requiredActions": string[]
      }
    ],
    "competitorBenchmark": [
      {
        "competitor": string,
        "leadingMetrics": string[],
        "gainingMetrics": string[],
        "lagingMetrics": string[]
      }
    ]
  },
  "recommendations": {
    "immediate": {
      "actions": string[],
      "impact": number,
      "cost": number,
      "timeframe": string
    },
    "shortTerm": {
      "actions": string[],
      "impact": number,
      "cost": number,
      "timeframe": string
    },
    "longTerm": {
      "actions": string[],
      "impact": number,
      "cost": number,
      "timeframe": string
    }
  }
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
