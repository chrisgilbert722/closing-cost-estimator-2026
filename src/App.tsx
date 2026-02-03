import { useState } from 'react';
import { ClosingCostInput, defaultValues, calculateClosingCosts } from './logic/closingCostCalculations';
import Header from './components/Header';
import InputCard from './components/InputCard';
import ResultsPanel from './components/ResultsPanel';
import AdContainer from './components/AdContainer';
import BreakdownTable from './components/BreakdownTable';
import SEOText from './components/SEOText';
import Footer from './components/Footer';

export default function App() {
    const [values, setValues] = useState<ClosingCostInput>(defaultValues);
    const result = calculateClosingCosts(values);

    return (
        <div className="container">
            <Header />
            <InputCard values={values} onChange={setValues} />
            <ResultsPanel result={result} />
            <AdContainer slot="native-mid" format="horizontal" />
            <BreakdownTable result={result} />
            <SEOText />
            <Footer />
            <AdContainer slot="sticky-footer" format="horizontal" sticky />
        </div>
    );
}
