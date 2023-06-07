import { supabase } from './utils/supabaseClient';

class ColorsService {
  async getColors() {
    const { data, error } = await supabase.from('colors').select('*');

    console.log('getColors', data);

    if (error) throw error;

    return data;
  }

  async createColor(color) {
    const { data, error } = await supabase.from('colors').insert(color);

    if (error) throw error;

    return data;
  }

  async deleteColor(colorId) {
    const { data, error } = await supabase.from('colors').delte().insert('id', colorId);

    if (error) throw error;

    return data;
  }
}

export default new ColorsService();
