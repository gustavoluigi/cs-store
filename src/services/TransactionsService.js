import { supabase } from './utils/supabaseClient';

class TransactionsService {
  async getTransactions() {
    const { data, error } = await supabase.from('transactions').select('*');

    if (error) throw error;

    return data;
  }

  async getTransaction(transactionId) {
    const { data, error } = await supabase.from('transactions').select('*').eq('id', transactionId);

    if (error) throw error;

    return data;
  }

  async createTransaction(transaction) {
    const { data, error } = await supabase.from('transactions').insert([{ type: transaction }]);

    if (error) throw error;

    return data;
  }

  async deleteTransaction(transactionId) {
    const { data, error } = await supabase.from('transactions').delete().eq('id', transactionId);

    if (error) throw error;

    return data;
  }
}

export default new TransactionsService();
