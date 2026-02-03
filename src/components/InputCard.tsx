import { ClosingCostInput } from '../logic/closingCostCalculations';

interface InputCardProps {
    values: ClosingCostInput;
    onChange: (values: ClosingCostInput) => void;
}

export default function InputCard({ values, onChange }: InputCardProps) {
    const updateField = (field: keyof ClosingCostInput, value: string | number) => {
        onChange({ ...values, [field]: value });
    };

    return (
        <div className="card">
            <div className="form-group">
                <label htmlFor="homePrice">Home Price ($)</label>
                <input
                    id="homePrice"
                    type="number"
                    min="50000"
                    max="10000000"
                    step="5000"
                    value={values.homePrice}
                    onChange={(e) => updateField('homePrice', Number(e.target.value))}
                />
            </div>

            <div className="form-group">
                <label htmlFor="loanType">Loan Type</label>
                <select
                    id="loanType"
                    value={values.loanType}
                    onChange={(e) => updateField('loanType', e.target.value)}
                >
                    <option value="conventional">Conventional</option>
                    <option value="fha">FHA</option>
                    <option value="va">VA</option>
                    <option value="usda">USDA</option>
                    <option value="cash">Cash Purchase</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="downPayment">Down Payment (%)</label>
                <input
                    id="downPayment"
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    value={values.downPayment}
                    onChange={(e) => updateField('downPayment', Number(e.target.value))}
                />
            </div>

            <div className="form-group">
                <label htmlFor="location">Property Location</label>
                <select
                    id="location"
                    value={values.location}
                    onChange={(e) => updateField('location', e.target.value)}
                >
                    <option value="low">Low-Cost State</option>
                    <option value="average">Average Cost State</option>
                    <option value="high">High-Cost State (CA, NY, etc.)</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="buyerType">Buyer Type</label>
                <select
                    id="buyerType"
                    value={values.buyerType}
                    onChange={(e) => updateField('buyerType', e.target.value)}
                >
                    <option value="firstTime">First-Time Buyer</option>
                    <option value="repeat">Repeat Buyer</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="sellerConcessions">Seller Concessions</label>
                <select
                    id="sellerConcessions"
                    value={values.sellerConcessions}
                    onChange={(e) => updateField('sellerConcessions', e.target.value)}
                >
                    <option value="no">No</option>
                    <option value="yes">Yes (seller pays some closing costs)</option>
                </select>
            </div>
        </div>
    );
}
