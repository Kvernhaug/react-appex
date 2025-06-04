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