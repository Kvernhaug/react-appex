'use client';

import React, { use, useEffect, useState } from 'react';
import { getBrregDataByOrgNumber, searchBrregDataByName, type BrregData } from '../api/BrregApi';
import { AiOutlineSearch } from 'react-icons/ai';
import CompanyDetails from '../components/CompanyDetails';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<BrregData[] | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const data = new FormData(e.currentTarget);
    const formObject = Object.fromEntries(data);
    const searchTerm = formObject['brregSearch'] as string;

    console.log("Form data: ", formObject);

    // Check if the search term is a 9-digit number
    const isOrgNumber = /^[0-9]{9}$/.test(searchTerm);

    try {
      let response;
      if (isOrgNumber) {
        response = await getBrregDataByOrgNumber(searchTerm);
      } else {
        response = await searchBrregDataByName(searchTerm);
      }
      setResults(response);
    } catch (err) {
      setError('Failed to fetch data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-3/5 pt-16">
      <div className="flex flex-col fixed w-3/5 bg-palette-light h-40">
        <h1 className="text-3xl font-bold text-center mb-8">Legg til ny kunde</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-row justify-center items-center"
        >
          <div className="w-4/5 relative">
            <input
                type="text"
                name="brregSearch"
                id="brregSearch"
                placeholder="Søk på navn eller organisasjonsnummer"
                className="bg-gray-100 p-4 rounded-full w-full shadow focus:outline-none"
            >
            </input>
            <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-palette-dark text-white p-4 rounded-full shadow hover:bg-palette-green transition cursor-pointer"
            >
                <AiOutlineSearch color= "#DCD7C9" />
            </button>
          </div>
        </form>
      </div>
      

      

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {results && (
        <div className="mt-30 p-8 flex flex-col w-full">
          <ul>
            {results.map((item, index) => (
              <li key={index}>
                <CompanyDetails company={item} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
