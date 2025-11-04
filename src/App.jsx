import { useEffect, useState, useCallback } from "react";
import Counter from "./components/Counter.jsx";
import Statistics from "./components/Statistics.jsx";

const API_BASE = "http://localhost:8080/stats"; // поменяй, если у тебя 3000

function App() {
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(false);

    const loadStats = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch(API_BASE);
            const data = await res.json();
            setStats(data);
        } catch (e) {
            console.error("Failed to fetch stats", e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadStats();
    }, [loadStats]);

    return (
        <div style={{maxWidth: 700, margin: "10px auto", fontFamily: "sans-serif"}}>
            <Counter apiBase={API_BASE} onUpdated={loadStats}/>
            <Statistics stats={stats} loading={loading}/>
        </div>
    );
}

export default App;
