import React, { useState } from "react";
import type { Customer } from "../api/Model";
import { deleteCustomer, updateCustomer } from "../api/CustomerApi";

interface CustomerDetailsProps {
  customer: Customer;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ customer }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [editableCustomer, setEditableCustomer] = useState<Customer>({
    ...customer,
  });

  const handleInputChange = (field: string, value: any) => {
    setEditableCustomer((prev) => ({
      ...prev,
      company: {
        ...prev.company,
        [field]: value,
      },
    }));
  };

  const handleAddressChange = (field: string, value: any) => {
    setEditableCustomer((prev) => ({
      ...prev,
      company: {
        ...prev.company,
        address: {
          ...prev.company.address,
          [field]: value,
        },
      },
    }));
  };

  const handleOrgTypeChange = (field: string, value: any) => {
    setEditableCustomer((prev) => ({
      ...prev,
      company: {
        ...prev.company,
        organizationType: {
          ...prev.company.organizationType,
          [field]: value,
        },
      },
    }));
  };

  const handleNoteChange = (value: string) => {
    setEditableCustomer((prev) => ({ ...prev, note: value }));
  };

  const handleUpdateCustomer = async () => {
    try {
      const updated = await updateCustomer(editableCustomer);
      console.log("Updated customer:", updated);
      setShowEditModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Failed to update customer", error);
      alert("Oppdatering feilet. Vennligst prøv igjen.");
    }
  };

  const handleDeleteCustomer = async () => {
    if (confirm("Er du sikker på at du vil slette denne kunden?")) {
      try {
        if (editableCustomer.id) {
          await deleteCustomer(editableCustomer.id);
          setShowEditModal(false);
          alert("Kunde slettet.");
        } else {
          alert("Kunde-ID mangler. Kan ikke slette kunde.");
        }
      } catch (error) {
        console.error("Failed to delete customer", error);
        alert("Sletting feilet. Vennligst prøv igjen.");
      }
    }
  };

  const { company, note } = customer;

  return (
    <>
      <div className="flex flex-col bg-gray-100 w-full mt-8 p-4 border border-gray-300 rounded-xl shadow">
        <h3 className="text-2xl font-semibold">{company.name}</h3>
        <p className="text-lg">
          <strong>Organisasjonsnummer:</strong> {company.orgNumber}
        </p>
        <p className="mt-2">
          <strong>Notat:</strong> {note}
        </p>
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
              <p>
                {company.address.postalCode} {company.address.region}
              </p>
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
        <div className="fixed inset-0 bg-palette-dark flex items-center justify-center z-50 overflow-auto">
          <div className="bg-palette-light p-6 rounded-2xl w-3/5">
            <h3 className="text-2xl font-semibold mb-4">Rediger kunde</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label>Navn</label>
                <input
                  className="w-full border rounded p-2 bg-gray-100 mb-2"
                  value={editableCustomer.company.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />

                <label>Organisasjonsnummer</label>
                <input
                  className="w-full border rounded p-2 bg-gray-100 mb-2"
                  value={editableCustomer.company.orgNumber}
                  onChange={(e) =>
                    handleInputChange("orgNumber", e.target.value)
                  }
                />

                <label>Hjemmeside</label>
                <input
                  className="w-full border rounded p-2 bg-gray-100 mb-2"
                  value={editableCustomer.company.homepage || ""}
                  onChange={(e) =>
                    handleInputChange("homepage", e.target.value)
                  }
                />

                <label>E-post</label>
                <input
                  className="w-full border rounded p-2 bg-gray-100 mb-2"
                  value={editableCustomer.company.email || ""}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>

              <div>
                <label>Organisasjonsform</label>
                <input
                  className="w-full border rounded p-2 bg-gray-100 mb-2"
                  value={
                    editableCustomer.company.organizationType?.description || ""
                  }
                  onChange={(e) =>
                    handleOrgTypeChange("description", e.target.value)
                  }
                />

                <label>Postnummer</label>
                <input
                  className="w-full border rounded p-2 bg-gray-100 mb-2"
                  value={editableCustomer.company.address?.postalCode || ""}
                  onChange={(e) =>
                    handleAddressChange("postalCode", e.target.value)
                  }
                />

                <label>Poststed</label>
                <input
                  className="w-full border rounded p-2 bg-gray-100 mb-2"
                  value={editableCustomer.company.address?.region || ""}
                  onChange={(e) =>
                    handleAddressChange("region", e.target.value)
                  }
                />

                <label>Gateadresse</label>
                <input
                  className="w-full border rounded p-2 bg-gray-100 mb-2"
                  value={editableCustomer.company.address?.street?.[0] || ""}
                  onChange={(e) =>
                    handleAddressChange("street", [e.target.value])
                  }
                />
              </div>
            </div>

            <label className="block mt-4">Notat</label>
            <textarea
              className="w-full border rounded p-2 bg-gray-100"
              rows={3}
              value={editableCustomer.note || ""}
              onChange={(e) => handleNoteChange(e.target.value)}
              placeholder="Legg til eller endre notat..."
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={handleDeleteCustomer}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition cursor-pointer"
              >
                Slett
              </button>
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
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-palette-dark z-50">
          <div className="bg-palette-light p-6 rounded-2xl w-96 text-center">
            <h2 className="text-2xl font-bold mb-4 text-palette-green">
              Kunde oppdatert!
            </h2>
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
