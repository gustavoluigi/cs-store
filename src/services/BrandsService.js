import { supabase } from './utils/supabaseClient';

class BrandsService {
  async getBrands() {
    const { data, error } = await supabase.from('brands').select('*');

    if (error) throw error;

    return data;
  }

  async createBrand(brand) {
    const { data, error } = await supabase.from('brands').insert(brand);

    if (error) throw error;

    return data;
  }

  async deleteBrand(brandId) {
    const { data, error } = await supabase.from('brands').delte().insert('id', brandId);

    if (error) throw error;

    return data;
  }
}

export default new BrandsService();
