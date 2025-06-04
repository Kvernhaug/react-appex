
export interface Address {
    country?: string;
    countryCode?: string;
    postalCode?: string;
    region?: string;
    street?: string[];
    municipality?: string;
    municipalityNumber?: string;
}

export interface OrganizationType {
    code?: string;
    description?: string;
}

export interface Company {
    name: string;
    orgNumber: string;
    homepage?: string;
    email?: string;
    address: Address;
    organizationType: OrganizationType;
}

export interface Customer {
    id?: string;
    note?: string;
    company: Company;
}