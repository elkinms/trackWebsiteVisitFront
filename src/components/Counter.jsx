import { useState } from "react";

export default function Counter({ apiBase, onUpdated }) {
    const [country, setCountry] = useState("");
    const [pending, setPending] = useState(false);
    const [error, setError] = useState("");

    const handleAdd = async () => {
        const code = country.trim().toLowerCase();
        if (!code) return;

        setPending(true);
        setError("");
        try {
            await fetch(`${apiBase}/${code}`, { method: "PATCH" });
            setCountry("");
            onUpdated?.();
        } catch (err) {
            console.error("Failed to update country", err);
            setError("Server is not responding. Please try again later.");
        } finally {
            setPending(false);
        }
    };

    return (
        <section style={{ marginBottom: 24 }}>
            <h2>Track website visit by country</h2>

            <input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="il, us, de..."
                style={{ padding: "4px 8px", marginRight: 8 }}
                disabled={pending}
            />

            <button
                onClick={handleAdd}
                disabled={pending}
                style={{ padding: "4px 12px", cursor: "pointer" }}
            >
                {pending ? "Saving..." : "Add"}
            </button>

            {error && (
                <p style={{ color: "red", marginTop: 8 }}>
                    {error}
                </p>
            )}
        </section>
    );
}
