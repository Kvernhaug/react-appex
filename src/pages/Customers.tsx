'use client';

import CustomerList from "../components/CustomerList";

export default function Customers() {

    const customers = CustomerList();

    return(
        <div>
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
        </div>
    );
}