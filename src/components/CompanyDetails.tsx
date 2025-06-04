import React, { useState } from 'react';
import type { BrregData } from '../api/BrregApi';
import type { Customer } from '../api/Model';
import { createCustomer } from '../api/CustomerApi';


interface CompanyDetailsProps {
  company: BrregData;
}

const CompanyDetails: React.FC<CompanyDetailsProps> = ({ company }) => {
    const [showModal, setShowModal] = useState(false);
    const [note, setNote] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleSaveCustomer = async () => {
  const customer: Customer = {
    note: note,
    company: {
      name: company.navn,
      orgNumber: company.organisasjonsnummer,
      homepage: company.hjemmeside,
      email: company.epostadresse,
      address: {
        country: company.postadresse?.land,
        countryCode: company.postadresse?.landkode,
        postalCode: company.postadresse?.postnummer,
        region: company.postadresse?.poststed,
        street: company.postadresse?.adresse,
        municipality: company.postadresse?.kommune,
        municipalityNumber: company.postadresse?.kommunenummer,
      },
      organizationType: {
        code: company.organisasjonsform?.kode,
        description: company.organisasjonsform?.beskrivelse,
      },
    },
  };

  try {
    const created = await createCustomer(customer);
    console.log("Successfully created customer:", created);
    setShowModal(false);
    setNote("");
    setShowSuccessModal(true);
  } catch (error) {
    console.error("Failed to save customer", error);
  }
};

  return (
    <>
    <div className="flex flex-col bg-gray-100 w-full mt-8 p-4 border border-gray-300 rounded-xl shadow">
      <h3 className="text-2xl font-semibold">{company.navn}</h3>
      <p className="text-lg"><strong>Organisasjonsnummer:</strong> {company.organisasjonsnummer}</p>
      <hr color="#DCD7C9"></hr>
      <div className="flex flex-row">
        {company.organisasjonsform && (
            <div className="flex-1">
                <h4 className="font-semibold">Organisasjonsform</h4>
                <p>{company.organisasjonsform.beskrivelse}</p>
            </div>
        )}
        {company.postadresse && (
            <div className="flex-1">
                <h4 className="font-semibold">Forrentingsaddresse</h4>
                <p>{company.postadresse.postnummer} {company.postadresse.poststed}</p>
                {company.postadresse.adresse && (
                    <ul>
                    {company.postadresse.adresse.map((address, index) => (
                        <li key={index}>{address}</li>
                    ))}
                    </ul>
                )}
            </div>
        )}
      </div>
      <div className="flex flex-row justify-end">
        <button
            type="submit"
            onClick={() => setShowModal(true)}
            className="bg-palette-dark text-white p-2 rounded-full shadow hover:bg-palette-green transition text-palette-light cursor-pointer"
        >
            Lagre kunde
        </button>
      </div>
    </div>


      {showModal && (
        <div className="fixed inset-0 bg-palette-dark flex items-center justify-center z-50">
          <div className="bg-palette-light p-6 rounded-2xl w-3/5">

            <div className="flex flex-row">
                <div className="flex-1">
                    <h3 className="text-2xl font-semibold">{company.navn}</h3>
                    <p className="text-lg"><strong>Organisasjonsnummer:</strong> {company.organisasjonsnummer}</p>
                    {company.hjemmeside && (
                        <p><strong>Hjemmeside:</strong> {company.hjemmeside}</p>)}
                    {company.epostadresse && (
                        <p><strong>Epost:</strong> {company.epostadresse}</p>)}
                    {company.organisasjonsform && (
                        <p><strong>Organisasjonsform:</strong> {company.organisasjonsform.beskrivelse}</p>)}
                    {company.postadresse && (
                        <div className="flex-1">
                            <h4 className="font-semibold">Forrentingsaddresse</h4>
                            <p>{company.postadresse.postnummer} {company.postadresse.poststed}</p>
                            {company.postadresse.adresse && (
                                <ul>
                                {company.postadresse.adresse.map((address, index) => (
                                    <li key={index}>{address}</li>
                                ))}
                                </ul>
                            )}
                        </div>
                    )}
                </div>
                <div className="flex-1">
                    <p className="mb-2">Notat</p>
                    <textarea
                    className="w-full border rounded p-2 mb-4 bg-gray-100 focus:outline-none"
                    rows={4}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Legg til notat her..."
                    ></textarea>
                    <div className="flex justify-end gap-2">
                    <button
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition cursor-pointer"
                    >
                        Avbryt
                    </button>
                    <button
                        onClick={handleSaveCustomer}
                        className="px-4 py-2 rounded bg-palette-dark text-white hover:bg-palette-green transition cursor-pointer"
                    >
                        Lagre
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
            <h2 className="text-2xl font-bold mb-4 text-palette-green">Kunde lagret!</h2>
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

export default CompanyDetails;
