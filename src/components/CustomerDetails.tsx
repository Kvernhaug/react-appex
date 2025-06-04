import React, { useState } from 'react';
import type { Customer } from '../api/Model';

interface CustomerDetailsProps {
  customer: Customer;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ customer }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [note, setNote] = useState(customer.note || '');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleUpdateCustomer = async () => {
    try {
      // Here you could send an API call to update the customer
      // await updateCustomer({ ...customer, note });

      console.log('Updated customer note:', note);
      setShowEditModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Failed to update customer', error);
    }
  };

  const { company } = customer;

  return (
    <>
      <div className="flex flex-col bg-gray-100 w-full mt-8 p-4 border border-gray-300 rounded-xl shadow">
        <h3 className="text-2xl font-semibold">{company.name}</h3>
        <p className="text-lg"><strong>Organisasjonsnummer:</strong> {company.orgNumber}</p>
        <p className="mt-2"><strong>Notat:</strong> {note}</p>
        <hr className="my-2 border-t border-gray-300" />
        <div className="flex flex-row">
          {company.organizationType && (
            <div className="flex-1">
              <h4 className="font-semibold">Organisasjonsform</h4>
              <p>{company.organizationType.description}</p>
            </div>
          )}
          {company.address && (
            <div className="flex-1">
              <h4 className="font-semibold">Forretningsadresse</h4>
              <p>{company.address.postalCode} {company.address.region}</p>
              {company.address.street && (
                <ul>
                  {company.address.street.map((address, index) => (
                    <li key={index}>{address}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-row justify-end">
          <button
            type="button"
            onClick={() => setShowEditModal(true)}
            className="bg-palette-dark text-white p-2 rounded-full shadow hover:bg-palette-green transition text-palette-light cursor-pointer"
          >
            Rediger kunde
          </button>
        </div>
      </div>

      {showEditModal && (
        <div className="fixed inset-0 bg-palette-dark flex items-center justify-center z-50">
          <div className="bg-palette-light p-6 rounded-2xl w-3/5">
            <div className="flex flex-row">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold">{company.name}</h3>
                <p className="text-lg"><strong>Organisasjonsnummer:</strong> {company.orgNumber}</p>
                {company.homepage && <p><strong>Hjemmeside:</strong> {company.homepage}</p>}
                {company.email && <p><strong>Epost:</strong> {company.email}</p>}
                {company.organizationType && <p><strong>Organisasjonsform:</strong> {company.organizationType.description}</p>}
                {company.address && (
                  <>
                    <h4 className="font-semibold mt-2">Forretningsadresse</h4>
                    <p>{company.address.postalCode} {company.address.region}</p>
                    {company.address.street && (
                      <ul>
                        {company.address.street.map((address, index) => (
                          <li key={index}>{address}</li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </div>

              <div className="flex-1">
                <p className="mb-2">Rediger notat</p>
                <textarea
                  className="w-full border rounded p-2 mb-4 bg-gray-100 focus:outline-none"
                  rows={4}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Legg til eller endre notat..."
                ></textarea>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition cursor-pointer"
                  >
                    Avbryt
                  </button>
                  <button
                    onClick={handleUpdateCustomer}
                    className="px-4 py-2 rounded bg-palette-dark text-white hover:bg-palette-green transition cursor-pointer"
                  >
                    Lagre endringer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-palette-dark z-50">
          <div className="bg-palette-light p-6 rounded-2xl w-96 text-center">
            <h2 className="text-2xl font-bold mb-4 text-palette-green">Kunde oppdatert!</h2>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="bg-palette-dark text-white px-4 py-2 rounded-full hover:bg-palette-green transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerDetails;