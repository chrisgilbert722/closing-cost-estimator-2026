export interface ClosingCostInput {
    homePrice: number;
    loanType: 'conventional' | 'fha' | 'va' | 'usda' | 'cash';
    downPayment: number;
    location: 'low' | 'average' | 'high';
    buyerType: 'firstTime' | 'repeat';
    sellerConcessions: 'yes' | 'no';
}

export interface ClosingCostResult {
    lenderFeesLow: number;
    lenderFeesHigh: number;
    titleEscrowLow: number;
    titleEscrowHigh: number;
    governmentFeesLow: number;
    governmentFeesHigh: number;
    prepaidLow: number;
    prepaidHigh: number;
    creditsLow: number;
    creditsHigh: number;
    totalLow: number;
    totalHigh: number;
}

export const defaultValues: ClosingCostInput = {
    homePrice: 350000,
    loanType: 'conventional',
    downPayment: 20,
    location: 'average',
    buyerType: 'firstTime',
    sellerConcessions: 'no'
};

export function calculateClosingCosts(input: ClosingCostInput): ClosingCostResult {
    const { homePrice, loanType, location, buyerType, sellerConcessions } = input;

    // Base closing cost rates by loan type (percentage of home price)
    const baseRates: Record<string, { low: number; high: number }> = {
        conventional: { low: 0.02, high: 0.05 },
        fha: { low: 0.025, high: 0.06 },
        va: { low: 0.01, high: 0.03 },
        usda: { low: 0.02, high: 0.05 },
        cash: { low: 0.01, high: 0.03 }
    };

    // Location multiplier
    const locationMultiplier: Record<string, number> = {
        low: 0.85,
        average: 1.0,
        high: 1.25
    };

    // First-time buyer adjustment (percentage points)
    const buyerAdjustment = buyerType === 'firstTime' ? -0.0025 : 0;

    // Get base rates and apply adjustments
    const rates = baseRates[loanType];
    const locMult = locationMultiplier[location];

    const adjustedLowRate = Math.max(0.005, (rates.low + buyerAdjustment) * locMult);
    const adjustedHighRate = (rates.high + buyerAdjustment) * locMult;

    // Calculate total closing costs before credits
    const baseTotalLow = Math.round(homePrice * adjustedLowRate);
    const baseTotalHigh = Math.round(homePrice * adjustedHighRate);

    // Break down into categories (approximate distribution)
    // Lender fees: ~35-40% of closing costs
    const lenderFeesLow = Math.round(baseTotalLow * 0.35);
    const lenderFeesHigh = Math.round(baseTotalHigh * 0.40);

    // Title & escrow: ~25-30%
    const titleEscrowLow = Math.round(baseTotalLow * 0.25);
    const titleEscrowHigh = Math.round(baseTotalHigh * 0.30);

    // Government/recording fees: ~10-15%
    const governmentFeesLow = Math.round(baseTotalLow * 0.10);
    const governmentFeesHigh = Math.round(baseTotalHigh * 0.15);

    // Prepaid taxes & insurance: ~20-25%
    const prepaidLow = Math.round(baseTotalLow * 0.20);
    const prepaidHigh = Math.round(baseTotalHigh * 0.25);

    // Seller concessions credit
    let creditsLow = 0;
    let creditsHigh = 0;
    if (sellerConcessions === 'yes') {
        // Scale concessions with home price
        creditsLow = Math.min(2000, Math.round(homePrice * 0.01));
        creditsHigh = Math.min(6000, Math.round(homePrice * 0.02));
    }

    // Calculate final totals
    const totalLow = Math.max(0, lenderFeesLow + titleEscrowLow + governmentFeesLow + prepaidLow - creditsHigh);
    const totalHigh = Math.max(0, lenderFeesHigh + titleEscrowHigh + governmentFeesHigh + prepaidHigh - creditsLow);

    return {
        lenderFeesLow,
        lenderFeesHigh,
        titleEscrowLow,
        titleEscrowHigh,
        governmentFeesLow,
        governmentFeesHigh,
        prepaidLow,
        prepaidHigh,
        creditsLow,
        creditsHigh,
        totalLow,
        totalHigh
    };
}
