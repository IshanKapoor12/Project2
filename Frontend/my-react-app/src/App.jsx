import React, { useState } from 'react';
import './App.css';

function App() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState([]);

    const handleSubmit = async () => {
        try {
            const jsonData = JSON.parse(input);
            const res = await fetch(`https://backend-s1to.onrender.com/bfhl`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonData)
            });
            const data = await res.json();
            setResponse(data);
            setError(null);
        } catch (err) {
            setError('Invalid JSON input');
            setResponse(null);
        }
    };

    const handleFilterChange = (event) => {
        const value = event.target.value;
        setFilters(filters.includes(value) ? filters.filter(f => f !== value) : [...filters, value]);
    };

    const filteredResponse = () => {
        if (!response) return null;
        const result = {};
        if (filters.includes('Alphabets')) result.alphabets = response.alphabets;
        if (filters.includes('Numbers')) result.numbers = response.numbers;
        if (filters.includes('Highest lowercase alphabet')) result.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
        return result;
    };

    return (
        <div className="App">
            <h1>Bajaj Finserv Health Challenge</h1>
            <textarea
                placeholder="Enter JSON"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {response && (
                <div>
                    <h2>Select what to display:</h2>
                    <select multiple onChange={handleFilterChange}>
                        <option value="Alphabets">Alphabets</option>
                        <option value="Numbers">Numbers</option>
                        <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
                    </select>
                    <h2>Response:</h2>
                    <pre>{JSON.stringify(filteredResponse(), null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default App;
