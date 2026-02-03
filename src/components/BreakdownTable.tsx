import { ClosingCostResult } from '../logic/closingCostCalculations';

interface BreakdownTableProps {
    result: ClosingCostResult;
}

export default function BreakdownTable({ result }: BreakdownTableProps) {
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };

    return (
        <div className="card">
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 'var(--space-4)' }}>
                Cost Breakdown
            </h2>
            <table>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Low Estimate</th>
                        <th>High Estimate</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Lender Fees</td>
                        <td>{formatCurrency(result.lenderFeesLow)}</td>
                        <td>{formatCurrency(result.lenderFeesHigh)}</td>
                    </tr>
                    <tr>
                        <td>Title & Escrow Fees</td>
                        <td>{formatCurrency(result.titleEscrowLow)}</td>
                        <td>{formatCurrency(result.titleEscrowHigh)}</td>
                    </tr>
                    <tr>
                        <td>Government / Recording Fees</td>
                        <td>{formatCurrency(result.governmentFeesLow)}</td>
                        <td>{formatCurrency(result.governmentFeesHigh)}</td>
                    </tr>
                    <tr>
                        <td>Prepaid Taxes & Insurance</td>
                        <td>{formatCurrency(result.prepaidLow)}</td>
                        <td>{formatCurrency(result.prepaidHigh)}</td>
                    </tr>
                    {(result.creditsLow > 0 || result.creditsHigh > 0) && (
                        <tr>
                            <td>Credits / Offsets</td>
                            <td>-{formatCurrency(result.creditsLow)}</td>
                            <td>-{formatCurrency(result.creditsHigh)}</td>
                        </tr>
                    )}
                    <tr style={{ fontWeight: 600 }}>
                        <td>Total Estimated Closing Costs</td>
                        <td>{formatCurrency(result.totalLow)}</td>
                        <td>{formatCurrency(result.totalHigh)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
