/* eslint-disable max-len */
import { supabase } from './utils/supabaseClient';

class CustomersService {
  async listCustomers(searchTerm = '') {
    const { data: customers, error } = await supabase
      .from('customers')
      .select('*')
      .ilike('name', `%${searchTerm || ''}%`)
      .order('name', { ascending: true });

    if (error) throw error;

    const customersList = customers.map((item) => ({
      id: item.id,
      name: item.name,
      phone: item.phone,
      address: item.address,
      zipcode: item.zipcode,
    }));

    return customersList;
  }

  async getCustomer(customerId) {
    const { data: customer, error } = await supabase
      .from('customers')
      .select('*')
      .eq('id', customerId)
      .single();

    if (error) return error;

    return customer;
  }

  async getCustomerWithOrders(customerId) {
    const { data: orders, error } = await supabase
      .from('orders')
      .select(`*,
      customers (
        *
      )
    `);

    if (error) throw error;

    return orders;
  }

  async createCustomer(customer) {
    const { data, error } = await supabase.from('customers').insert([customer]);
    if (error) throw error;
    return data[0];
  }

  async editCustomer(customer) {
    const { data, error } = await supabase
      .from('customers')
      .update(customer)
      .eq('id', customer.id)
      .single();
    if (error) throw error;
    return data;
  }

  async deleteCustomer(customerId) {
    const { data: customer, error } = await supabase
      .from('customers')
      .delete()
      .eq('id', customerId);

    if (error) return error;

    return customer;
  }
}

export default new CustomersService();
