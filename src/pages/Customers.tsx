"use client";

import { useEffect, useState } from "react";
import type { Customer } from "../api/Model";
import { getCustomers, filterCustomers, type CustomerFilter } from "../api/CustomerApi";
import CustomerDetails from "../components/CustomerDetails";

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<CustomerFilter>({
    note: "",
    companyName: "",
    street: "",
    postalCode: "",
    region: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCustomers();
        setCustomers(data);
      } catch (error) {
        setError("Failed to load customers");
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilter = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Only send non-empty filters
      const activeFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v && v.trim() !== "")
      );
      const data = await filterCustomers(activeFilters);
      setCustomers(data);
    } catch (error) {
      setError("Failed to filter customers");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-3/5 pt-16">
      <div className="flex flex-col fixed w-3/5 bg-palette-light h-40 z-10">
        <h1 className="text-3xl font-bold text-center mb-8">Mine Kunder</h1>
        <h4 className="">
          Legg til filter:
        </h4>
        <form
          onSubmit={handleFilter}
          className="flex flex-row flex-wrap gap-2 justify-center items-center mb-2"
        >
          <input
            type="text"
            name="companyName"
            value={filters.companyName}
            onChange={handleInputChange}
            placeholder="Firmanavn"
            className="bg-gray-100 p-2 rounded shadow w-40"
          />
          <input
            type="text"
            name="note"
            value={filters.note}
            onChange={handleInputChange}
            placeholder="Notat"
            className="bg-gray-100 p-2 rounded shadow w-32"
          />
          <input
            type="text"
            name="street"
            value={filters.street}
            onChange={handleInputChange}
            placeholder="Addresse"
            className="bg-gray-100 p-2 rounded shadow w-32"
          />
          <input
            type="text"
            name="postalCode"
            value={filters.postalCode}
            onChange={handleInputChange}
            placeholder="Postnr"
            className="bg-gray-100 p-2 rounded shadow w-24"
          />
          <input
            type="text"
            name="region"
            value={filters.region}
            onChange={handleInputChange}
            placeholder="Poststed"
            className="bg-gray-100 p-2 rounded shadow w-24"
          />
          <button
            type="submit"
            className="bg-palette-dark text-white px-4 py-2 rounded shadow hover:bg-palette-green transition"
            disabled={loading}
          >
            {loading ? "Filtrerer..." : "Filtrer"}
          </button>
        </form>
      </div>
      <div className="mt-40 p-8 flex flex-col w-full">
        {customers.length === 0 ? (
          <p>No customers found.</p>
        ) : (
          <ul>
            {customers.map((customer, index) => (
              <li key={index}>
                <CustomerDetails customer={customer} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}