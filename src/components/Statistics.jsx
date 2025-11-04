function Statistics({ stats, loading }) {
    if (loading) {
        return <p>Loading…</p>;
    }

    const entries = Object.entries(stats);

    if (entries.length === 0) {
        return (
            <div>
                <h2>Statistics</h2>
                <p>No data yet</p>
            </div>
        );
    }

    return (
        <div>
            <h2>Statistics</h2>
            <table className="stats-table">
                <thead>
                <tr>
                    <th>Country</th>
                    <th>Number of visits</th>
                </tr>
                </thead>
                <tbody>
                {entries.map(([code, count]) => (
                    <tr key={code}>
                        <td>{code}</td>
                        <td>{count}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Statistics;
