/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { formatDate, formatPrice } from '../utils';
import { supabase } from './utils/supabaseClient';

class OrdersService {
  async getOrders() {
    const { data: orders, error } = await supabase.from('orders').select('*');

    if (error) throw error;

    const orderList = orders.map((item) => ({
      id: item.id,
      date: item.date,
      qt_products: item.qt_products,
      subtotal: item.subtotal,
      discount: item.discount,
      total: item.total,
      obs: item.obs || '-',
    }));

    return orderList;
  }

  async getOrdersByDate(year, month) {
    const dateInit = new Date(year, month - 1).toISOString().split('T')[0];
    const dateEnd = new Date(year, month, 0).toISOString().split('T')[0];

    const { data: orders, error } = await supabase
      .from('orders')
      .select('*')
      .gte('date', dateInit)
      .lte('date', dateEnd);

    if (error) throw error;

    const orderList = orders.map((item) => ({
      id: item.id,
      date: item.date,
      qt_products: item.qt_products,
      subtotal: item.subtotal,
      discount: item.discount,
      total: item.total,
      obs: item.obs || '-',
    }));

    return orderList;
  }

  async getOrdersForReport() {
    const { data: orders, error } = await supabase.from('orders').select('*');

    console.log('data', orders);

    if (error) throw error;

    const orderList = orders.map((item) => ({
      id: item.id,
      date: item.date,
      qt_products: item.qt_products,
      subtotal: item.subtotal,
      discount: item.discount,
      total: item.total,
      obs: item.obs || '-',
    }));

    return orderList;
  }

  async getOrdersandCustomer(searchTerm = null, year = null, month = null) {
    function filterOrders(ordersData) {
      return ordersData.map((item) => ({
        id: item.id,
        date: formatDate(item.date),
        customer: item.customers.name,
        qt_products: item.qt_products,
        subtotal: formatPrice(+item.subtotal),
        discount: item.discount,
        total: formatPrice(item.total),
        obs: item.obs || '-',
        transaction: item.transactions.type,
      }));
    }
    const { data: orders, error } = await supabase
      .from('orders')
      .select(
        `*,
          transactions (type),
          customers (name)
        `,
      )
      // .ilike('customers.name', `%${searchTerm || ''}%`)
      .order('date', { ascending: true });

    if (error) throw error;

    if (searchTerm) {
      const ordersFiltered = orders.filter((item) => item.customers.name.toLowerCase().includes(searchTerm.toLowerCase()));

      return filterOrders(ordersFiltered);
    }

    if (month && year) {
      const ordersFiltered = orders.filter((item) => {
        const date = new Date(item.date);
        return date.getMonth() + 1 === +month && date.getFullYear() === +year;
      });

      const final = filterOrders(ordersFiltered);

      console.log('final', final);
      return final;
    }

    return filterOrders(orders);
  }

  async getOrderWithProductsAndCustomer(orderId) {
    // const { data: response } = await HttpClient.get(`/orders/${orderId}?_embed=order_products&_expand=customer`).then(
    //   (res) => res,
    // );
    // const { data: productsOrder } = await HttpClient.get(`order_products?_expand=product&orderId=${orderId}`).then(
    //   (res) => res,
    // );
    // const newProductsOrderList = response.order_products.map((item, index) => {
    //   const { product } = productsOrder[index];
    //   return Object.assign(item, product);
    // });
    // response.order_products = newProductsOrderList;
    // return response;
  }

  async getOrderProductsAndCustomer(orderId) {
    const { data: order, errorOrder } = await supabase
      .from('orders')
      .select(
        `*,
      transactions (type),
      customers (name)
    `,
      )
      .eq('id', orderId);

    if (errorOrder) throw errorOrder;

    const filteredOrder = order.map((item) => ({
      id: item.id,
      date: formatDate(item.date),
      customer: item.customers.name,
      qt_products: item.qt_products,
      subtotal: formatPrice(+item.subtotal),
      discount: item.discount,
      total: formatPrice(item.total),
      obs: item.obs || '-',
      transaction: item.transactions.type,
    }));

    const { data: orderProducts, error } = await supabase
      .from('order_products')
      .select(
        `*,
        product_variations (*,
          colors (name),
          sizes (name),
          products (
            name,
            price,
            brands (
              name
            )
          ))
      `,
      )
      .eq('order_id', orderId);
    if (error) throw error;

    const filteredProducts = orderProducts.map((item) => ({
      id: item.id,
      name: item.product_variations.products.name,
      price: formatPrice(item.product_variations.products.price),
      qt: item.qt,
      color: item.product_variations.colors.name,
      size: item.product_variations.sizes.name,
      brand: item.product_variations.products.brands.name,
      subtotal: formatPrice(item.total),
    }));

    return { order: filteredOrder[0], orderProducts: filteredProducts };
  }

  async listOrdersWithProducts() {
    // const { data: response } = await HttpClient.get('/orders?_embed=order_products').then((res) => res);
    // response.map((item) => {
    //   delete item.customerId;
    //   return item;
    // });
    // return response;
  }

  async listOrdersWithProductsAndCustomer() {
    // const { data: response } = await HttpClient.get('/orders?_embed=order_products&_expand=customer').then(
    //   (res) => res,
    // );
    // response.map((item) => {
    //   delete item.customerId;
    //   return item;
    // });
    // return response;
  }

  async listOrdersFromCustomer(customerId) {
    const { data: orders, error } = await supabase
      .from('orders')
      .select('*, transactions (type)')
      .eq('customer_id', customerId)
      .order('date', { ascending: true });

    if (error) throw error;

    const orderList = orders.map((item) => ({
      id: item.id,
      date: item.date,
      qt_products: item.qt_products,
      subtotal: item.subtotal,
      discount: item.discount,
      total: item.total,
      obs: item.obs,
      transaction: item.transactions.type,
    }));

    return orderList;
  }

  async getOrder(orderId) {
    // const { data: response } = await HttpClient.get(`/orders/${orderId}`).then((res) => res);
    // return response;
  }

  async getOrderWithCustomer(orderId) {
    // const { data: response } = await HttpClient.get(`/orders/${orderId}?_expand=customer`).then((res) => res);
    // return response;
  }

  async getOrderWithProducts(orderId) {
    // const { data: response } = await HttpClient.get(`/orders/${orderId}?_embed=order_products`).then((res) => res);
    // return response;
  }

  async createOrder({ order, products }) {
    if (!order.customer_id) throw new Error('Cliente não informado');
    if (!order.date) throw new Error('Data não informada');
    if (!order.transaction_id) {
      throw new Error('Forma de pagamento não informado');
    }
    if (!order.qt_products) throw new Error('Nenhum produto selecionado');

    const { data: dataOrder, error: errorOrder } = await supabase
      .from('orders')
      .insert([order]);
    if (errorOrder) throw errorOrder;
    console.log('dataOrder', dataOrder);

    const teste = await products.map(async (e) => {
      const { data: dataProductVariation, error: errorProductVariation } = await supabase
        .from('product_variations')
        .select('*')
        .eq('id', e.product_variation_id);
      if (errorProductVariation) throw errorProductVariation;
      const {
        data: dataUpdateProductVariation,
        error: errorUpdateProductVariation,
      } = await supabase
        .from('product_variations')
        .update({ storage: dataProductVariation[0].storage - e.qt })
        .eq('id', e.product_variation_id);
      if (errorUpdateProductVariation) throw errorUpdateProductVariation;
      return dataUpdateProductVariation;
    });
    console.log(teste);
    const orderProducts = products.map((e) => ({
      order_id: dataOrder[0].id,
      ...e,
    }));
    const { dataOrderProducts, errorOrderProducts } = await supabase
      .from('order_products')
      .insert(orderProducts);
    if (errorOrderProducts) throw errorOrderProducts;

    return dataOrder[0];

    // console.log(dataOrder);
    // console.log(dataOrderProducts);
    // const { data: response } = await HttpClient.post('/orders', order).then((res) => res);
    // const orderProducts = products.map((e) => ({ orderId: response.id, ...e }));
    // orderProducts.map(async (e) => {
    //   await HttpClient.post('/order_products', e).then(async (res) => {
    //     await ProductsService.decreaseProductQt(res.data.productId, res.data.quantity);
    //   });
    // });
    // return response;
  }

  async deleteOrder(orderId) {
    // const response = await HttpClient.delete('/orders', orderId).then((res) => res);
    // return response;
  }
}

export default new OrdersService();
