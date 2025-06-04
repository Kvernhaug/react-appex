'use client';

import React, { use, useEffect, useState } from 'react';
import { getBreegDataByOrgNumber, searchBreegDataByName, type BreegData } from '../api/BrregApi';

export default function Home() {
  const [company, setCompany] = useState<BreegData | null>(null);
  const [results, setResults] = useState<BreegData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isOrgNumber = (val: string) => /^\d{9}$/.test(val.trim());
  const query = 'BSI';

  const handleSearch = async () => {
    setCompany(null);
    setResults([]);
    setError(null);
    setLoading(true);

    try {
      if (isOrgNumber(query)) {
        const data = await getBreegDataByOrgNumber(query.trim());
        setCompany(data);
      } else {
        const data = await searchBreegDataByName(query.trim());
        setResults(data);
      }
    } catch (err: any) {
      setError(err.message || 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {handleSearch()}, []);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Brønnøysund Company Search</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      <form
        onSubmit={(e) =>{
            e.preventDefault()
            const data = new FormData(e.currentTarget)
            const formObject = Object.fromEntries(data)
            console.log("Form data: ", formObject);
            
        }}
      >
        <input
            type="text"
            name="searchInput"
            id="searchInput"
        >
        </input>
        <button
            type="submit"
        >
            Submit
        </button>
      </form>

      {company && (
        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-xl font-semibold">{company.navn}</h2>
          <p><strong>Org nr:</strong> {company.organisasjonsnummer}</p>
          {company.postadresse && (
            <>
              <p><strong>Adresse:</strong> {company.postadresse.adresse?.join(', ')}</p>
              <p>{company.postadresse.postnummer} {company.postadresse.poststed}</p>
            </>
          )}
          {company.hjemmeside && (
            <p>
              <strong>Nettside:</strong>{' '}
              <a href={company.hjemmeside} target="_blank" rel="noopener noreferrer">
                {company.hjemmeside}
              </a>
            </p>
          )}
          {company.epostadresse && <p><strong>E-post:</strong> {company.epostadresse}</p>}
          {company.organisasjonsform && (
            <p><strong>Organisasjonsform:</strong> {company.organisasjonsform.beskrivelse}</p>
          )}
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-2">Search Results</h2>
          {results.map((comp) => (
            <div key={comp.organisasjonsnummer} className="border p-3 rounded shadow-sm bg-white">
              <p className="font-medium">{comp.navn}</p>
              <p>Org nr: {comp.organisasjonsnummer}</p>
              {comp.postadresse && (
                <p>
                  {comp.postadresse.adresse?.join(', ')}, {comp.postadresse.postnummer} {comp.postadresse.poststed}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
