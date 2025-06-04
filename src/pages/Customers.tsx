"use client";

import { useEffect, useState } from "react";
import type { Customer } from "../api/Model";
import { getCustomers } from "../api/CustomerApi";
import CustomerDetails from "../components/CustomerDetails";

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [error, setError] = useState<string | null>(null);

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
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-3/5 pt-16">
      <div className="flex flex-col fixed w-3/5 bg-palette-light h-40">
        <h1 className="text-3xl font-bold text-center mb-8">Mine Kunder</h1>
      </div>
      <div className="mt-30 p-8 flex flex-col w-full">
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
