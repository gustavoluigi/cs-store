/* eslint-disable max-len */
import { supabase } from './utils/supabaseClient';

class ProductsService {
  async listProducts(searchTerm = null) {
    const { data: products, error } = await supabase
      .from('products')
      .select(
        `*,
      brands(
        name
      )`,
      )
      .ilike('name', `%${searchTerm || ''}%`)
      .order('name', { ascending: true });

    const formatedProducts = products.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      desc: product.desc,
      brand: product.brands.name,
    }));

    if (error) throw error;

    return formatedProducts;
  }

  async getProduct(productId) {
    const { data: product, error } = await supabase
      .from('products')
      .select(
        `*,
      brands(
        name
        )`,
      )
      .eq('id', productId)
      .single();

    if (error) throw error;

    return product;
  }

  async listVariations(searchTerm = null) {
    const { data: variations, error } = await supabase
      .from('product_variations')
      .select(
        `*,
      colors(
        name
      ),
      sizes(
        name
      ),
      products(
        name,
        price,
        brands (
          name
        )
        )`,
      )
      .order('name', { foreignTable: 'products', ascending: false });

    if (error) throw error;

    const filteredVariations = variations.filter((variation) => variation.products.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const formatedVariations = filteredVariations.map((variation) => ({
      id: variation.id,
      name: variation.products.name,
      price: variation.products.price,
      size: variation.sizes.name,
      color: variation.colors.name,
      brand: variation.products.brands.name ?? '-',
      // desc: variation.products.desc,
      storage: variation.storage,
      ref: variation.ref,
      sku: variation.sku,
    }));

    return formatedVariations;
  }

  async getVariations(productId) {
    const { data: variations, error } = await supabase
      .from('product_variations')
      .select(
        `*,
      colors(
        name
      ),
      sizes(
        name
      )`,
      )
      .eq('product_id', productId);

    if (error) throw error;

    const formatedVariations = variations.map((variation) => ({
      id: variation.id,
      size: variation.sizes.name,
      color: variation.colors.name,
      storage: variation.storage,
      ref: variation.ref,
      sku: variation.sku,
    }));

    return formatedVariations;
  }

  async getVariation(productId) {
    const { data: productvariation, error } = await supabase
      .from('product_variations')
      .select(
        `*,
      colors(
        name
      ),
      sizes(
        name
      ),
      products(
        name
        )`,
      )
      .eq('id', productId);

    if (error) throw error;

    const formatedVariation = productvariation.map((variation) => ({
      id: variation.id,
      size: {
        value: variation.size_id,
        label: variation.sizes.name,
      },
      color: {
        value: variation.color_id,
        label: variation.colors.name,
      },
      storage: variation.storage,
      ref: variation.ref,
      sku: variation.sku,
      name: variation.products.name,
    }));

    return formatedVariation[0];
  }

  async createProduct(product) {
    const newProduct = {
      name: product.name,
      price: product.price,
      desc: product.desc,
      brand_id: product.brand_id,
    };

    const { data: productCreated, error: errorProduct } = await supabase.from('products').insert(newProduct);

    if (errorProduct) throw errorProduct;

    return productCreated[0];
  }

  async createVariation(productVariation) {
    const { data, error } = await supabase.from('product_variations').insert(productVariation);

    if (error) throw error;

    return data;
  }

  async editProduct(product) {
    const { data, error } = await supabase
      .from('products')
      .update(product)
      .select(
        `*,
      brands(
        name
        )`,
      )
      .eq('id', product.id)
      .single();

    if (error) throw error;

    return data;
  }

  async editVariation(product) {
    const { data: productvariation, error } = await supabase
      .from('product_variations')
      .update(product)
      .select(
        `*,
      colors(
        name
      ),
      sizes(
        name
      ),
      products(
        name
        )`,
      )
      .eq('id', product.id);

    if (error) throw error;

    const formatedVariation = productvariation.map((variation) => ({
      id: variation.id,
      size: {
        value: variation.size_id,
        label: variation.sizes.name,
      },
      color: {
        value: variation.color_id,
        label: variation.colors.name,
      },
      storage: variation.storage,
      ref: variation.ref,
      sku: variation.sku,
      name: variation.products.name,
    }));

    return formatedVariation[0];
  }

  async deleteProduct({ productId, variations }) {
    const variationsIds = variations.map((variation) => variation.id);

    const { error: errorVariations } = await supabase.from('product_variations').delete().in('id', variationsIds);

    if (errorVariations) throw errorVariations;

    const { error } = await supabase.from('products').delete().eq('id', productId);

    if (error) throw error;
  }

  async deleteVariation(variationId) {
    const { data: variation, error } = await supabase.from('product_variations').delete().eq('id', variationId);

    if (error) throw error;

    return variation;
  }
}

export default new ProductsService();
