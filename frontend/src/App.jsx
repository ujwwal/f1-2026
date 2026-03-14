import { useEffect, useMemo, useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000';

function App() {
  const [datasets, setDatasets] = useState([]);
  const [selectedDataset, setSelectedDataset] = useState('');
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/datasets`);
        if (!response.ok) {
          throw new Error('Unable to load dataset list from backend API.');
        }
        const data = await response.json();
        const names = data.datasets ?? [];
        setDatasets(names);
        if (names.length > 0) {
          setSelectedDataset(names[0]);
        }
      } catch (fetchError) {
        setError(fetchError.message);
      }
    };

    fetchDatasets();
  }, []);

  useEffect(() => {
    if (!selectedDataset) return;

    const fetchRows = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`${API_BASE_URL}/datasets/${selectedDataset}?limit=100`);
        if (!response.ok) {
          throw new Error('Unable to load dataset rows from backend API.');
        }
        const data = await response.json();
        setRows(data.rows ?? []);
      } catch (fetchError) {
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRows();
  }, [selectedDataset]);

  const columns = useMemo(() => {
    if (!rows.length) return [];
    return Object.keys(rows[0]);
  }, [rows]);

  return (
    <div className="page">
      <header className="hero">
        <h1>F1 2026 Race Strategy Suite</h1>
        <p>
          Separate frontend for visualization. Backend remains the single source of truth for data,
          analytics, and future ML.
        </p>
      </header>

      <section className="panel">
        <h2>Session Data</h2>
        <label htmlFor="dataset-select">Processed dataset</label>
        <select
          id="dataset-select"
          value={selectedDataset}
          onChange={(event) => setSelectedDataset(event.target.value)}
          disabled={!datasets.length}
        >
          {datasets.length === 0 && <option value="">No datasets found</option>}
          {datasets.map((dataset) => (
            <option key={dataset} value={dataset}>
              {dataset}
            </option>
          ))}
        </select>

        {error && <p className="error">{error}</p>}
        {loading && <p>Loading rows...</p>}

        {!loading && rows.length > 0 && (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={`${row.driver ?? 'row'}-${index}`}>
                    {columns.map((column) => (
                      <td key={`${column}-${index}`}>{String(row[column] ?? '')}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="panel placeholder">
        <h2>Future Strategy Insights</h2>
        <p>
          This panel is reserved for pace trend summaries, tyre strategy insights, and 2026 concept
          simulation outputs.
        </p>
      </section>
    </div>
  );
}

export default App;
