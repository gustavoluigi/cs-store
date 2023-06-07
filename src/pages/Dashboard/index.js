import { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { formatPrice } from '../../utils';
import { Block, BlockWrapper } from './styles';
import { useGetOrdersByDate } from '../../hooks/useOrders';

function Dashboard() {
  const [ordersCount, setOrdersCount] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  const { orders } = useGetOrdersByDate(new Date().getFullYear(), new Date().getMonth() + 1);

  const loadStats = async () => {
    const totalValueReq = orders?.reduce((acc, obj) => acc + obj.total, 0);

    if (orders) setOrdersCount(orders?.length);
    if (orders) setTotalValue(totalValueReq);
  };

  useEffect(() => {
    loadStats();
  }, [orders]);
  return (
    <>
      <PageTitle>Dashboard</PageTitle>
      <BlockWrapper>
        <Block>
          <h2>{ordersCount}</h2>
          <p>Total de vendas no mês até o momento</p>
        </Block>
        <Block>
          <h2>{formatPrice(totalValue)}</h2>
          <p>Valor total de vendas no mês até o momento</p>
        </Block>
      </BlockWrapper>
    </>
  );
}

export default Dashboard;
