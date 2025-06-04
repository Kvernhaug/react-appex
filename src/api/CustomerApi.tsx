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