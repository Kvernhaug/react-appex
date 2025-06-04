import { customerApi } from "./Axios";
import type { Customer } from "./Model";


export async function getCustomers(): Promise<Customer[]> {
  try {
    const response = await customerApi.get('customer/all');
    const customers: Customer[] = response.data;
    //console.log('Customers: ', JSON.stringify(customers, null, 2));
    return customers;
  } catch (error) {
    console.error('Error fetching customers: ', error);
    throw error;
  }
}

export async function getCustomerById(id: string): Promise<Customer> {
  try {
    const response = await customerApi.get(`customer/${id}`);
    const customer: Customer = response.data;
    //console.log('Customer: ', JSON.stringify(customer, null, 2));
    return customer;
  } catch (error) {
    console.error('Error fetching customer by ID: ', error);
    throw error;
  }
}

export async function createCustomer(customer: Customer): Promise<Customer> {
  try {
    const response = await customerApi.post('customer/add', customer);
    const newCustomer: Customer = response.data;
    //console.log('Created Customer: ', JSON.stringify(newCustomer, null, 2));
    return newCustomer;
  } catch (error) {
    console.error('Error creating customer: ', error);
    throw error;
  }
}

export async function updateCustomer(customer: Customer): Promise<Customer> {
  try {
    console.log('Updating Customer: ', JSON.stringify(customer, null, 2));
    const response = await customerApi.put(`customer/update`, customer);
    const updatedCustomer: Customer = response.data;
    //console.log('Updated Customer: ', JSON.stringify(updatedCustomer, null, 2));
    return updatedCustomer;
  } catch (error) {
    console.error('Error updating customer: ', error);
    throw error;
  }
}

export async function deleteCustomer(id: string): Promise<void> {
  try {
    await customerApi.delete(`customer/delete/${id}`);
    console.log(`Customer with ID ${id} deleted successfully.`);
  } catch (error) {
    console.error('Error deleting customer: ', error);
    throw error;
  }
}

export interface CustomerFilter {
  note?: string;
  companyName?: string;
  street?: string;
  postalCode?: string;
  region?: string;
}

export async function filterCustomers(filter: CustomerFilter): Promise<Customer[]> {
  try {
    const params = new URLSearchParams();
    if (filter.note) params.append('note', filter.note);
    if (filter.companyName) params.append('companyName', filter.companyName);
    if (filter.street) params.append('street', filter.street);
    if (filter.postalCode) params.append('postalCode', filter.postalCode);
    if (filter.region) params.append('region', filter.region);

    const response = await customerApi.get(`customer/filter?${params.toString()}`);
    const customers: Customer[] = response.data;
    return customers;
  } catch (error) {
    console.error('Error filtering customers: ', error);
    throw error;
  }
}