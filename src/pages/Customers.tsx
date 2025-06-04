'use client';

import CustomerList from "../components/CustomerList";

export default function Customers() {

    return(
        <div className="w-3/5 pt-16">
            <div className="flex flex-col fixed w-3/5 bg-palette-light h-40">
                <h1 className="text-3xl font-bold text-center mb-8">Mine Kunder</h1>
                <CustomerList />
            </div>
            
        </div>
    );
}