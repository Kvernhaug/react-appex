import { useEffect, useState } from 'react';
import { getCustomers } from '../api/CustomerApi';
import { type Customer } from '../api/Model';  // Make sure to import the Customer type
import CustomerDetails from './CustomerDetails';

export default function CustomerList() {
  // Typing the state to hold Customer[] (an array of Customer objects)
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [error, setError] = useState<string | null>(null);  // Optional: error state to display messages if fetching fails

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCustomers();
        setCustomers(data);  // Update the state with the fetched data
      } catch (error) {
        setError('Failed to load customers');  // Handle error (optional)
        console.error(error);
      }
    };

    fetchData();  // Call the fetch function when the component mounts
  }, []);  // Empty dependency array means this runs once when the component mounts

  if (error) {
    return <div>{error}</div>;  // Optionally display an error message
  }

  // If customers are loaded, map through and display them
  return (
    <div>
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
  );
}

