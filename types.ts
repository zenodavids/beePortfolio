/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
export interface CreateUserParams {
  clerkId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  photo: string;
}

export interface UpdateUserParams {
  firstName?: string;
  lastName?: string;
  username?: string;
  photo?: string;
}

export interface MarketAnalysisRequest {
  productName: string;
  productDescription: string;
  productType: string;
  pricePoint: number;
  problemSolving: string;
}

export interface GenderDistribution {
  male: number;
  female: number;
  nonBinary: number;
  genderqueer: number;
  genderFluid: number;
  transgender: number;
  other: number;
  preferNotToSay: number;
}

export interface AgeGroups {
  "18-24": number;
  "25-34": number;
  "35-44": number;
  "45-54": number;
  "55+": number;
}

export interface IncomeDistribution {
  lowIncome: number;
  middleIncome: number;
  highIncome: number;
}

export interface SpendPattern {
  digital: number;
  traditional: number;
  social: number;
}

export interface MarketAnalysisResponse {
  marketOverview: {
    explanations: {
      [x: string]: string;
      marketSize: string;
      growthRate: string;
      competitiveDensity: string;
      whiteSpaceScore: string;
      genderDistribution: string;
      ageGroups: string;
      incomeDistribution: string;
    };
    topCountries: Array<{
      name: string;
      marketSize: number;
      growthRate: number;
      competitiveDensity: number;
      whiteSpaceScore: number;
      genderDistribution: GenderDistribution;
      ageGroups: AgeGroups;
      incomeDistribution: IncomeDistribution;
      cities: Array<{ name: string; marketShare: number }>;
      roi: { predicted: number; confidence: number };
    }>;
  };
  competitiveLandscape?: {
    competitors: Array<{
      name: string;
      marketShare: number;
      spendPattern: SpendPattern;
      channels: string[];
      positioning: string;
    }>;
    shareOfVoice: Record<string, number>;
    marketTrends: Array<{
      trend: string;
      impact: "high" | "medium" | "low";
      timeframe: "short" | "medium" | "long";
    }>;
  };
  regulatoryCompliance?: {
    marketRegulations: Array<{
      country: string;
      requirements: string[];
      riskLevel: "low" | "medium" | "high";
    }>;
    brandSafetyScore: number;
    culturalConsiderations: Array<{
      market: string;
      considerations: string[];
      sensitivityLevel: "low" | "medium" | "high";
    }>;
    certificationRequirements: Array<{
      name: string;
      importance: "mandatory" | "recommended";
      timeToObtain: string;
      estimatedCost: number;
    }>;
  };
}

export interface MarketIntelligenceDashboardProps {
  data: MarketAnalysisResponse;
}

interface BuyingPattern {
  preferences: string[];
  priceElasticity: number;
  purchaseFrequency: "low" | "medium" | "high";
  valuePerception: string[];
  decisionFactors: string[];
  brandLoyalty: "low" | "medium" | "high";
  promotionResponse: "low" | "medium" | "high";
}

interface SeasonalFactors {
  peakSeasons: string[];
  lowSeasons: string[];
  seasonalityImpact: "low" | "medium" | "high";
}

interface CrossDeviceBehavior {
  pattern: "sequential" | "simultaneous" | "complementary";
  primaryDevice: "mobile" | "desktop" | "tablet";
  secondaryDevice: "mobile" | "desktop" | "tablet";
  switchingTriggers: string[];
}

interface JourneyInsights {
  commonBottlenecks: string[];
  accelerators: string[];
  retentionFactors: string[];
  loyaltyDrivers: string[];
}

export interface SegmentAnalysisResponse {
  segmentData: any;

  geographicIntelligence: {
    explanations: {
      cityPotential: string;
      consumerBehavior: string;
      distributionStrategy: string;
      competitiveAnalysis: string;
    };
    cityPotential: Array<{
      city: string;
      brandLoyalty: "low" | "medium" | "high";
      marketPotential: number;
      consumerBehavior: string[];
      distributionChannels: string[];
      competitorStrength: "low" | "medium" | "high";
      growthTrend: "declining" | "stable" | "growing" | "booming";
      marketMaturity: "emerging" | "growing" | "mature" | "saturated";
      entryBarriers: string[];
      localPreferences: string[];
      seasonalFactors: {
        peakSeasons: string[];
        lowSeasons: string[];
        seasonalityImpact: "low" | "medium" | "high";
      };
    }>;
  };
  demographicInsights: {
    explanations: {
      incomePatternsAnalysis: string;
      ageGroupStrategy: string;
      educationImpact: string;
    };
    ageGroupAffinity: Array<{
      group: string;
      affinityScore: number;
      preferences: string[];
      marketingChannels: string[];
    }>;
    educationCorrelation: Array<{
      adoptRate: any;
      level: string;
      adoptionRate: number;
    }>;
    incomeBuyingPatterns: {
      lowIncome: {
        priceElasticity: number;
        brandLoyalty: "low" | "medium" | "high";
        promotionResponse: "low" | "medium" | "high";
        purchaseFrequency: "low" | "medium" | "high";
        decisionFactors: string[];
      };
      middleIncome: {
        priceElasticity: number;
        brandLoyalty: "low" | "medium" | "high";
        promotionResponse: "low" | "medium" | "high";
        purchaseFrequency: "low" | "medium" | "high";
        decisionFactors: string[];
      };
      highIncome: {
        priceElasticity: number;
        brandLoyalty: "low" | "medium" | "high";
        promotionResponse: "low" | "medium" | "high";
        purchaseFrequency: "low" | "medium" | "high";
        decisionFactors: string[];
      };
    };
  };
  behavioralPatterns: {
    deviceUsage:
      | Record<string, number>
      | {
          mobile: number;
          desktop: number;
          tablet: number;
          other: number;
        };
    platformPreferences: Record<string, number>;
    contentConsumption: Array<{
      type: string;
      engagement: number;
    }>;
    purchaseJourney: {
      stages: Array<{
        name: string;
        duration: string | number;
        conversionRate: number;
        criticalMoments: string[];
      }>;
    };
  };
}

export interface SegmentDashboardProps {
  data: SegmentAnalysisResponse;
}

export interface SegmentAnalysisRequest {
  marketData: MarketAnalysisResponse;
  productFormData: MarketAnalysisRequest;
}

export interface CampaignAnalysisResponse {
  channelStrategy: {
    explanations: {
      channelMix: string;
      budgetAllocation: string;
      timing: string;
    };
    recommendations: {
      primaryChannels: Array<{
        channel: string;
        allocation: number;
        objective: string;
        targetAudience: string[];
        contentType: string[];
        bestTiming: {
          daysOfWeek: string[];
          timeOfDay: string;
          seasonality: string;
        };
      }>;
      budgetDistribution: {
        acquisition: number;
        retention: number;
        brandBuilding: number;
        engagement: number;
      };
      campaignCalendar: Array<{
        quarter: string;
        focus: string;
        channels: string[];
        estimatedReach: number;
        estimatedConversion: number;
      }>;
    };
  };
  creativeStrategy: {
    explanations: {
      messagingStrategy: string;
      visualDirection: string;
      contentStrategy: string;
    };
    recommendations: {
      keyMessages: string[];
      tonality: string[];
      visualThemes: string[];
      contentPillars: Array<{
        topic: string;
        formats: string[];
        channels: string[];
        frequency: string;
      }>;
    };
  };
  performanceMetrics: {
    explanations: {
      kpiStrategy: string;
      conversionGoals: string;
      roiTargets: string;
    };
    recommendations: {
      primaryKPIs: Array<{
        metric: string;
        target: string;
        timeframe: string;
        importance: "high" | "medium" | "low";
      }>;
      conversionFunnel: Array<{
        stage: string;
        targetRate: string;
        keyMetrics: string[];
      }>;
      budgetROI: {
        expected: number;
        timeToROI: number;
        riskLevel: "low" | "medium" | "high";
      };
    };
  };
  demographicTargeting: {
    explanations: {
      genderStrategy: string;
      ageGroupFocus: string;
      locationInsights: string;
    };
    recommendations: {
      genderDistribution: {
        male: number;
        female: number;
        other: number;
      };
      ageGroups: {
        "18-24": number;
        "25-34": number;
        "35-44": number;
        "45-54": number;
        "55+": number;
      };
      locationPriority: Array<{
        region: string;
        priority: "high" | "medium" | "low";
        reasoning: string;
      }>;
      incomeSegments: {
        high: number;
        medium: number;
        low: number;
      };
    };
  };
  contentCalendar: {
    explanations: {
      contentMix: string;
      postingFrequency: string;
      engagementStrategy: string;
    };
    recommendations: {
      weeklySchedule: Array<{
        day: string;
        posts: Array<{
          time: string;
          channel: string;
          contentType: string;
          objective: string;
        }>;
      }>;
      contentThemes: Array<{
        theme: string;
        frequency: "daily" | "weekly" | "monthly";
        channels: string[];
        formats: string[];
      }>;
    };
  };
}

export interface CampaignAnalysisRequest {
  marketData: MarketAnalysisResponse;
  segmentData: SegmentAnalysisResponse;
  productFormData: MarketAnalysisRequest;
}
export interface StrategicIntelligenceResponse {
  hiddenMarketDynamics: {
    stealthStartups: Array<{
      codename: string;
      estimatedLaunch: string;
      disruptionPotential: number;
      targetedSegments: string[];
      technologicalAdvantage: string;
      fundingStatus: string;
      acquisitionPotential: {
        estimatedCost: string;
        strategicValue: number;
        timeWindow: string;
      };
    }>;
    emergingTechnologies: Array<{
      technology: string;
      applicationArea: string;
      timeToMarket: string;
      developmentCost: string;
      competitiveAdvantage: string;
      patentStrategy: string;
      disruptionLevel: number;
      adoptionBarriers: string[];
    }>;
    regulatoryShifts: Array<{
      jurisdiction: string;
      proposedChange: string;
      likelihood: number;
      impact: "low" | "medium" | "high";
      timeframe: string;
      exploitationStrategy: string;
    }>;
  };
  marketManipulation: {
    pricingPower: Array<{
      mechanism: string;
      leverage: string;
      impact: number;
      implementation: string[];
      risks: string[];
      legalConsiderations: string;
    }>;
    supplyChainControl: Array<{
      controlPoint: string;
      currentOwner: string;
      vulnerabilities: string[];
      acquisitionStrategy: string;
      estimatedCost: string;
      timeToControl: string;
    }>;
    networkEffects: Array<{
      platform: string;
      lockInMechanism: string;
      switchingCosts: string;
      moatStrength: number;
      scalingStrategy: string;
    }>;
  };
  competitiveBlindspots: {
    technicalWeaknesses: Array<{
      competitor: string;
      weakness: string;
      exploitabilityScore: number;
      timeToFix: string;
      mitigationCost: string;
      exploitationMethod: string;
    }>;
    organizationalRisks: Array<{
      competitor: string;
      riskArea: string;
      probability: number;
      impact: string;
      timeframe: string;
      exploitationStrategy: string;
    }>;
  };
  firstMoverAdvantages: {
    emergingTechnologies: Array<{
      technology: string;
      applicationArea: string;
      timeToMarket: string;
      developmentCost: string;
      competitiveAdvantage: string;
      patentStrategy: string;
    }>;
    businessModels: Array<{
      innovation: string;
      targetSegment: string;
      revenueModel: string;
      defensibility: string;
      scalingStrategy: string;
      firstMoverBenefit: string;
    }>;
  };
  riskArbitrage: {
    regulatoryGaps: Array<{
      jurisdiction: string;
      gap: string;
      exploitationMethod: string;
      timeWindow: string;
      potentialGain: string;
      mitigationStrategy: string;
    }>;
    marketSentiment: Array<{
      manipulationVector: string;
      target: string;
      method: string;
      expectedOutcome: string;
      contingencyPlan: string;
      legalConsiderations: string;
    }>;
  };
}

export interface StrategicIntelligenceDashboardProps {
  data: StrategicIntelligenceResponse;
  isLoading?: boolean;
}

export interface StrategicAnalysisResponse {
  hiddenMarketDynamics: {
    stealthStartups: Array<{
      name: string;
      technology: string;
      timeToMarket: string;
      disruptionLevel: number;
      competitiveAdvantage: string;
      patentability: string;
      adoptionBarriers: string[];
    }>;
    emergingTechnologies: Array<{
      technology: string;
      timeToMarket: string;
      disruptionLevel: number;
      competitiveAdvantage: string;
      patentability: string;
      adoptionBarriers: string[];
    }>;
  };
  marketManipulation: {
    pricingPower: Array<{
      factor: string;
      influence: "low" | "medium" | "high";
      mitigation: string;
    }>;
  };
}

export interface CustomerAvatarResponse {
  avatars: Array<{
    basicInfo: {
      occupation: string;
      location: string;
      age: number;
      gender: string;
      education: string;
      accomplishments: string[];
      geographicalContext: string;
    };
    currentSituation: {
      problem: string;
      painPoints: string[];
      desiredSituation: string;
      desiredSituationBenefits: string;
      desiredSituationPleasure: string;
      othersDescription: string;
      blockingFactors: string[];
      blockingDescription: string;
      frustrationLevel: "low" | "medium" | "high";
      painDescription: string;
    };
    beliefs: {
      currentBeliefs: string[];
      reasonsForBeliefs: string[];
      uniqueInterests: string[];
      interestDifferentiators: string[];
    };
    weeklyLife: {
      routine: string;
      outsideWork: string;
      newsSource: string[];
    };
    financial: {
      income: string;
      incomeContext: string;
      jobSatisfaction: string;
      concerns: string[];
    };
    personalHistory: {
      background: string;
      pastExperiences: string[];
      currentInterests: string[];
    };
    familyStatus: {
      status: string;
      children: boolean;
      productRelation: string;
      familyConcerns: string[];
      weeklyFamilyLife: string;
    };
    mediaConsumption: {
      preferredPlatforms: string[];
      deviceUsage: {
        mobile: number;
        desktop: number;
        tablet: number;
      };
      peakOnlineHours: string[];
      contentPreferences: string[];
      adResponseRate: "high" | "medium" | "low";
    };
    purchasingBehavior: {
      decisionMakingSpeed: "fast" | "moderate" | "careful";
      priceThreshold: string;
      comparesBrands: boolean;
      loyaltyPrograms: boolean;
      previousPurchases: string[];
      abandonmentTriggers: string[];
      finalStrawTrigger: string;
    };
    journeyMapping: {
      touchpoints: string[];
      conversionTriggers: string[];
      painPoints: string[];
      loyaltyDrivers: string[];
    };
    futurePredictions: {
      lifetimeValue: string;
      churnRiskFactors: string[];
      upsellOpportunities: string[];
      brandAdvocacyPotential: "low" | "medium" | "high";
    };
    psychographics: {
      values: string[];
      aspirations: string[];
      fearPoints: string[];
      influencers: string[];
      trustFactors: string[];
      decisionInfluences: string[];
    };
  }>;
}

export interface CorporateAvatarResponse {
  avatars: Array<{
    companyBasics: {
      industry: string;
      sector: string;
      size: {
        employees: number;
        revenue: string;
        offices: number;
      };
      maturityStage: string;
      headquarters: string;
      geographicPresence: string[];
    };
    marketPosition: {
      competitiveAdvantage: string[];
      marketShare: string;
      growthRate: string;
      brandReputation: string;
    };
    technologicalProfile: {
      techStack: string[];
      innovationLevel: "high" | "medium" | "low";
      digitalMaturity: string;
      techBudget: string;
    };
    decisionMakingUnit: {
      keyStakeholders: string[];
      approvalProcess: string;
      budgetAuthority: string;
      evaluationCriteria: string[];
    };
    businessChallenges: {
      currentPainPoints: string[];
      growthObstacles: string[];
      marketThreats: string[];
      internalChallenges: string[];
    };
    buyingBehavior: {
      purchaseCycle: string;
      decisionDrivers: string[];
      researchMethods: string[];
      preferredVendorTraits: string[];
    };
    organizationalCulture: {
      values: string[];
      communicationStyle: string;
      innovationStance: string;
      riskTolerance: string;
    };
    financialConsiderations: {
      budgetCycle: string;
      investmentPriorities: string[];
      riskAssessment: string;
      expectedROI: string;
    };
    digitalPresence: {
      websiteQuality: string;
      socialMediaPresence: string;
      onlineReputation: string;
      digitalMarketing: string[];
    };
    vendorRelationships: {
      currentVendors: string[];
      partnershipPreferences: string[];
      successMetrics: string[];
      communicationPreferences: string;
    };
    futureOutlook: {
      growthPlans: string[];
      strategicPriorities: string[];
      investmentPlans: string[];
      digitalTransformationPlans: string[];
    };
    complianceAndRisk: {
      regulatoryRequirements: string[];
      certifications: string[];
      dataPrivacyStandards: string[];
      securityProtocols: string[];
    };
  }>;
}

export interface ScenarioSimulationRequest {
  type:
    | "price_change"
    | "new_competitor"
    | "market_shift"
    | "technology_disruption"
    | "regulatory_change";
  parameters: {
    priceChange?: {
      percentage: number;
      direction: "increase" | "decrease";
    };
    newCompetitor?: {
      type: "startup" | "established" | "international";
      marketShare: number;
      pricePoint: "lower" | "similar" | "higher";
    };
    marketShift?: {
      type: "economic" | "demographic" | "behavioral";
      magnitude: "minor" | "moderate" | "major";
      direction: "positive" | "negative";
    };
    technologyDisruption?: {
      type: "incremental" | "breakthrough" | "radical";
      adoptionRate: "slow" | "moderate" | "rapid";
      impact: "low" | "medium" | "high";
    };
    regulatoryChange?: {
      scope: "local" | "national" | "international";
      type: "restriction" | "deregulation" | "new_requirement";
      compliance_period: number;
    };
  };
  timeframe: "3_months" | "6_months" | "1_year" | "2_years";
}

export interface ScenarioSimulationResponse {
  customerBehavior: any;
  scenarioOverview: {
    type: string;
    description: string;
    timeframe: string;
    confidenceScore: number;
    riskLevel: "low" | "medium" | "high";
  };
  marketImpact: {
    marketDynamics: any;
    marketShareProjections: {
      bestCase: {
        share: number;
        probability: number;
        conditions: string[];
      };
      worstCase: {
        share: number;
        probability: number;
        conditions: string[];
      };
      mostLikely: {
        share: number;
        probability: number;
        conditions: string[];
      };
    };
    competitorResponses: Array<{
      competitor: string;
      likelyResponse: string;
      timing: string;
      impact: "positive" | "neutral" | "negative";
      probability: number;
    }>;
    customerBehavior: {
      retentionRisk: number;
      acquisitionOpportunity: number;
      sentimentShift: "positive" | "neutral" | "negative";
      priceElasticity: number;
      switchingProbability: number;
    };
  };
  financialProjections: {
    profitability: any;
    revenue: {
      baseline: number;
      projected: number;
      bestCase: number;
      worstCase: number;
      mostLikely: number;
      confidenceInterval: number;
    };
    profitMargin: {
      current: number;
      projected: number;
      varianceFactors: string[];
    };
    cashFlow: {
      immediateImpact: number;
      sustainedEffect: number;
      recoveryPeriod: string;
    };
    investmentRequirements: {
      immediate: number;
      shortTerm: number;
      longTerm: number;
      roi: {
        expected: number;
        timeframe: string;
        risks: string[];
      };
    };
  };
  operationalConsiderations: {
    supplyChain: {
      impact: string;
      bottlenecks: string[];
      mitigationPlans: string[];
    };
    resourceRequirements: {
      personnel: string[];
      technology: string[];
      infrastructure: string[];
    };
    timelineEstimates: {
      preparation: string;
      implementation: string;
      stabilization: string;
    };
  };
  riskAssessment: {
    primaryRisks: Array<{
      type: string;
      probability: number;
      impact: number;
      mitigationStrategy: string;
    }>;
    secondaryEffects: Array<{
      effect: string;
      timeframe: string;
      severity: "low" | "medium" | "high";
    }>;
    contingencyPlans: Array<{
      trigger: string;
      action: string;
      resourcesNeeded: string[];
    }>;
  };
  recommendations: {
    immediate: {
      actions: string[];
      priority: "low" | "medium" | "high";
      expectedOutcome: string;
    };
    shortTerm: {
      actions: string[];
      timeline: string;
      dependencies: string[];
    };
    longTerm: {
      strategicShifts: string[];
      investmentNeeded: number;
      expectedBenefits: string[];
    };
  };
}

export interface AvatarFormData {
  productDescription: string;
  targetMarket: string;
  priceRange: string;
  problemSolving: string;
  customerAge: string;
  location: string;
  gender: string;
  income: string;
}

export interface CustomerAvatar {
  avatar: {
    basicInfo: {
      occupation: string;
      location: string;
      age: number;
      gender: string;
      education: string;
      accomplishments: string[];
      geographicalContext?: string;
    };
    currentSituation: {
      painPoints: string[];
      desiredSituation: string;
      blockingFactors: string[];
      problem?: string;
      frustrationLevel?: string;
      painDescription?: string;
    };
    weeklyLife: {
      routine: string;
      outsideWork: string;
      newsSource: string[];
      hobbies: string[];
      socialActivities: string[];
    };
    financial: {
      income: string;
      concerns: string[];
      spendingHabits: string[];
      purchaseDecisionFactors: string[];
    };
    mediaConsumption: {
      preferredPlatforms: string[];
      deviceUsage: {
        mobile: number;
        desktop: number;
        tablet: number;
      };
      contentPreferences: string[];
    };
  };
}

export interface AvatarResponse {
  avatar: {
    basicInfo: {
      occupation: string;
      location: string;
      age: number;
      gender: string;
      education: string;
      accomplishments: string[];
      geographicalContext?: string;
    };
    currentSituation: {
      painPoints: string[];
      desiredSituation: string;
      blockingFactors: string[];
      problem?: string;
      frustrationLevel?: string;
      painDescription?: string;
      blockingDescription?: string;
    };
    weeklyLife: {
      routine: string;
      outsideWork: string;
      newsSource: string[];
      hobbies: string[];
      socialActivities: string[];
    };
    financial: {
      income: string;
      concerns: string[];
      spendingHabits: string[];
      purchaseDecisionFactors: string[];
    };
    mediaConsumption: {
      preferredPlatforms: string[];
      deviceUsage: {
        mobile: number;
        desktop: number;
        tablet: number;
      };
      contentPreferences: string[];
      peakOnlineHours?: string[];
      adResponseRate?: string;
    };
    purchasingBehavior?: {
      loyaltyPrograms: boolean;
      previousPurchases: string[];
      abandonmentTriggers: string[];
      finalStrawTrigger?: string;
    };
    futurePredictions?: {
      lifetimeValue: string;
      churnRiskFactors: string[];
      upsellOpportunities: string[];
      brandAdvocacyPotential?: string;
    };
    psychographics?: {
      values: string[];
      aspirations: string[];
      fearPoints: string[];
      influencers: string[];
    };
  };
}

export interface MarketSizeFormData {
  industry: string;
  targetLocation: string;
  productCategory: string;
  pricePoint: string;
  targetAgeRange: string;
  businessType: "B2B" | "B2C";
  competitionLevel?: "low" | "medium" | "high";
}

export interface MarketSizeResponse {
  marketSize: {
    overview: {
      totalAddressableMarket: number;
      serviceableMarket: number;
      obtainableMarket: number;
      growthRate: number;
      marketMaturity: "emerging" | "growing" | "mature" | "declining";
    };
    demographics: {
      ageGroups: Record<string, number>;
      incomeDistribution: {
        lowIncome: number;
        middleIncome: number;
        highIncome: number;
      };
      geographicHotspots: Array<{
        location: string;
        marketShare: number;
        growthPotential: number;
      }>;
    };
    competition: {
      marketConcentration: number;
      competitorCount: number;
      marketShareDistribution: {
        leaders: number;
        midTier: number;
        smallPlayers: number;
      };
    };
    opportunities: {
      unservedSegments: string[];
      growthFactors: string[];
      entryBarriers: string[];
      recommendations: string[];
    };
  };
}

export interface BrandHealthFormData {
  brandName: string;
  industry: string;
  marketingChannels: string;
  currentChallenges: string;
  revenue?: string;
  competitors?: string;
  targetMarket?: string;
  marketingBudget?: string;
}

export interface BrandHealthResponse {
  // Core metrics with impact analysis
  coreMetrics: {
    brandScore: number;
    digitalScore: number;
    loyaltyScore: number;
    visualScore: number;
    voiceScore: number;
    potentialGrowth: number;
    revenueImpact: {
      current: number;
      projected6Months: number;
      projected12Months: number;
      confidence: number;
    };
  };

  // Market position and competitive analysis
  marketMetrics: {
    marketSize: number;
    marketGrowthRate: number;
    competitionLevel: number;
    marketOpportunityScore: number;
    brandSafetyScore: number;
    marketShareGainPotential: {
      percentage: number;
      timeframe: string;
      requiredInvestment: number;
    };
  };

  // Digital presence and performance
  digitalMetrics: {
    socialMediaReach: number;
    websiteTraffic: number;
    mobileEngagement: number;
    searchVisibility: number;
    conversionRate: number;
    improvementPotential: {
      metric: string;
      currentValue: number;
      potentialValue: number;
      investmentNeeded: number;
      timeToAchieve: string;
    }[];
  };

  // Financial impact projections
  financialProjections: {
    currentState: {
      revenue: number;
      marketingCosts: number;
      customerAcquisitionCost: number;
      customerLifetimeValue: number;
    };
    projectedState: {
      revenue: number;
      marketingCosts: number;
      customerAcquisitionCost: number;
      customerLifetimeValue: number;
      timeToAchieve: string;
    };
    roi: {
      threeMonths: number;
      sixMonths: number;
      twelveMonths: number;
      confidence: number;
    };
  };

  // Competitive advantage analysis
  competitiveAnalysis: {
    currentPosition: {
      strengths: string[];
      weaknesses: string[];
      opportunities: string[];
      threats: string[];
    };
    marketLeaderGap: {
      metric: string;
      currentGap: number;
      closureTimeframe: string;
      requiredActions: string[];
    }[];
    competitorBenchmark: {
      competitor: string;
      leadingMetrics: string[];
      gainingMetrics: string[];
      lagingMetrics: string[];
    }[];
  };

  // Action plan and recommendations
  recommendations: {
    immediate: {
      actions: string[];
      impact: number;
      cost: number;
      timeframe: string;
    };
    shortTerm: {
      actions: string[];
      impact: number;
      cost: number;
      timeframe: string;
    };
    longTerm: {
      actions: string[];
      impact: number;
      cost: number;
      timeframe: string;
    };
  };
}

// PDF Download Types
export type AnalysisType =
  | "market"
  | "segment"
  | "campaign"
  | "news"
  | "avatar"
  | "corporate"
  | "scenario"
  | "strategic"
  | "wargaming";

export interface PDFDownloadButtonProps {
  data: any;
  type: AnalysisType;
  filename: string;
}

export interface BlobProviderParams {
  document: React.ReactElement;
  children: (params: {
    blob: Blob | null;
    url: string | null;
    loading: boolean;
    error: Error | null;
  }) => React.ReactNode;
}

export interface NewsImpactRequest {
  productName: string;
  productDescription: string;
  industry: string;
  competitors: string[];
  targetMarket: string;
}

export interface NewsImpactResponse {
  // Latest Market News
  newsHeadline: string;
  newsDate: string;
  newsSource: string;
  impactSummary: string;
  actionSteps: string[];
  opportunityTimeframe: string;
  riskLevel: "low" | "medium" | "high";

  // Competitor Activity
  competitorName: string;
  competitorAction: string;
  userImpact: string;
  suggestedResponse: string[];
  timeToRespond: string;
  potentialGains: string;
  requiredResources: string[];

  // Market Changes
  economicIndicator: string;
  indicatorTrend: "up" | "down" | "stable";
  businessImpact: string;
  opportunityDescription: string;
  actionableSteps: string[];
  estimatedCost: number;
  potentialReturn: number;

  // Industry Events
  upcomingEvent: string;
  eventDate: string;
  eventLocation: string;
  relevanceScore: number;
  attendanceCost: number;
  businessBenefits: string[];
  networkingOpportunities: string[];

  // Supply Chain
  supplyUpdate: string;
  priceChange: number;
  availabilityStatus: string;
  alternativeSources: string[];
  costSavingTips: string[];

  // Market Trends
  trendDescription: string;
  trendPopularity: number;
  customerDemand: string;
  adaptationSteps: string[];
  implementationTime: string;
  expectedResults: string;

  // Regulatory Updates
  regulationTitle: string;
  effectiveDate: string;
  complianceSteps: string[];
  businessOpportunities: string[];
  estimatedCosts: number;
  timeToComply: string;

  // Future Predictions
  shortTermPrediction: string;
  mediumTermPrediction: string;
  longTermPrediction: string;
  actionPlan: string[];
  investmentNeeded: number;
  expectedOutcome: string;
}

export interface WarGamingRequest {
  triggerAction: {
    type:
      | "price_change"
      | "new_feature"
      | "marketing_campaign"
      | "market_expansion"
      | "partnership"
      | "acquisition"
      | "product_launch";
    details: {
      description: string;
      scale: "small" | "medium" | "large";
      timing: "immediate" | "planned";
      investment: number;
      targetMarket?: string;
      expectedImpact?: string;
    };
    constraints: {
      budget: number;
      timeline: string;
      resources: string[];
    };
  };
  competitorContext: {
    mainCompetitors: string[];
    theirStrengths: string[];
    recentActions?: string[];
    marketShare?: number;
  };
  ourPosition: {
    currentMarketShare: number;
    strengths: string[];
    weaknesses: string[];
    uniqueAdvantages: string[];
  };
}

export interface WarGamingResponse {
  riskLevel: "low" | "medium" | "high";
  successProbability: number;
  marketImpact: {
    shareChange: number;
    revenueImpact: string;
    customerResponse: string;
  };
  resources: {
    budgetRequired: number;
    implementationTime: string;
    requiredResources: string[];
  };
  recommendations: {
    immediate: string[];
    preparation: string[];
    contingencyPlans: string[];
  };
  competitorResponses: Array<{
    competitor: string;
    likelyAction: string;
    probability: number;
    timeline: string;
  }>;
  competitorName: string;
  likelyResponse: string;
  responseProbability: number;
  responseTimeframe: "immediate" | "short-term" | "long-term";
  responseImpact: "low" | "medium" | "high";

  defensiveStrategy: string;
  defensiveEffectiveness: number;
  defensiveResources: string[];
  defensiveTimeline: string;
  defensiveRisks: string[];

  offensiveStrategy: string;
  offensiveEffectiveness: number;
  offensiveResources: string[];
  offensiveTimeline: string;
  offensiveOpportunities: string[];

  shortTermAction: string;
  shortTermImpact: string;
  shortTermResources: string[];
  shortTermCost: number;

  mediumTermStrategy: string;
  mediumTermOutcome: string;
  mediumTermResources: string[];
  mediumTermBudget: number;

  longTermGoal: string;
  longTermAdvantage: string;
  longTermInvestment: number;
  timeToAchieve: string;

  competitorPosition: string;
  competitorStrength: number;
  competitorWeaknesses: string[];
  marketOpportunities: string[];
  marketThreats: string[];

  priceWarScenario: string;
  marketShareEffect: number;
  revenueEffect: number;
  competitorReactions: string[];
  sustainabilityPeriod: string;

  requiredCapabilities: string[];
  developmentTimeline: string;
  innovationCost: number;
  expectedResponses: string[];
  competitiveAdvantage: string;

  crisisScenario: string;
  crisisProbability: number;
  crisisImpact: "low" | "medium" | "high";
  responseSteps: string[];
  recoveryTime: string;
  preventiveMeasures: string[];
}
