export default function Header() {
    return (
        <header style={{ marginBottom: 'var(--space-6)', textAlign: 'center' }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
                Closing Cost Estimator 2026
            </h1>
            <p style={{ color: 'var(--color-text-muted)' }}>
                Calculate estimated closing costs based on home price, loan type, location, and seller concessions.
            </p>
        </header>
    );
}
