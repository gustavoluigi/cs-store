/* eslint-disable max-len */
/* eslint-disable no-sequences */
import {
  Document, Page, Text, View, StyleSheet, PDFViewer, Image, PDFDownloadLink,
} from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatDate, formatPrice } from '../../utils';
import csLogo from '../../assets/images/cs-logo.png';
import { useGetOrdersandCustomer } from '../../hooks/useOrders';
import { unformatPrice } from '../../utils/unformatPrice';

// Create styles
const styles = StyleSheet.create({
  page: {
    // flexDirection: 'row',
    backgroundColor: '#fff',
  },

  pageTitle: {
    fontWeight: 'bold',
    marginBottom: '20px',
  },

  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  tableHead: {
    display: 'flex',
    flexDirection: 'row',
    height: 30,
    alignItems: 'center',
  },
  tableRows: {
    display: 'flex',
    flexDirection: 'row',
    // height: 30,
    // alignItems: 'center',
  },
  th: {
    fontSize: '9px',
    flex: '1',
    padding: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    height: '100%',
    backgroundColor: 'rgb(243, 244, 246)',
  },
  thId: {
    fontSize: '9px',
    flex: '0 0 20px',
    padding: 5,
    paddingVertical: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: 'rgb(243, 244, 246)',
  },
  td: {
    fontSize: '9px',
    flex: '1',
    padding: 5,
    paddingVertical: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  tdId: {
    flex: '0 0 20px',
    fontSize: '9px',
    padding: 5,
    paddingVertical: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});

// export function MonthStatsPDF({ month, year }) {
function MonthStatsPDF() {
  const [renderPDF, setRenderPDF] = useState(false);
  const { month, year } = useParams();
  const [orders, setOrders] = useState();
  const [stats, setStats] = useState({
    monthStats: {
      month,
      year,
    },
    totalValue: 90,
  });
  const tableHeads = ['Data', 'Qt. Produtos', 'Subtotal', 'Desconto', 'Total', 'Pagamento', 'Cliente'];

  const ordersFetch = useGetOrdersandCustomer(null, year, month);

  const loadStats = async () => {
    if (ordersFetch.isFetched) {
      const totalValue = +ordersFetch.orders.reduce((acc, obj) => acc + unformatPrice(obj.total), 0);
      const filteredOrdersList = ordersFetch.orders.map((i) => ({
        date: formatDate(i.date),
        qt_products: i.qt_products,
        subtotal: i.subtotal,
        discount: `${i.discount}%`,
        total: i.total,
        transaction: i.transaction,
        name: i.customer,
      }));
      setOrders(filteredOrdersList);
      setStats((prevState) => ({
        ...prevState,
        totalValue,
      }));
      setRenderPDF(true);
    }
  };

  useEffect(() => {
    loadStats();
  }, [ordersFetch.isFetched]);
  return (
    <>
      {!renderPDF && !ordersFetch.isFetched && <p>Gerando pdf...</p>}
      {renderPDF && ordersFetch.isFetched && (
        <PDFViewer style={{ width: '100vw', height: '100vh' }}>
          <Document>
            <Page size="A4" style={styles.page}>
              <Image src={csLogo} style={{ width: '70px', marginHorizontal: 'auto', paddingTop: 20 }} />
              <View style={styles.section}>
                <Text
                  fixed
                  style={[
                    styles.pageTitle,
                    {
                      textAlign: 'center',
                      paddingVertical: 10,
                      backgroundColor: '#000',
                      color: '#fff',
                    },
                  ]}
                >
                  {new Date(stats.monthStats.month).toLocaleString('default', { month: 'long' }).toLocaleUpperCase()}
                </Text>
                <View style={{ display: 'flex', flexDirection: 'row', marginTop: 20 }}>
                  <Text style={[styles.pageTitle, { fontSize: '15px', flex: 1, textAlign: 'center' }]}>
                    Total vendido: {formatPrice(stats.totalValue)}
                  </Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', marginTop: 20 }}>
                  <Text style={[styles.pageTitle, { fontSize: '12px', textAlign: 'center', flex: 1 }]}>
                    Total de vendas: {orders?.length ? orders.length : 0}
                  </Text>
                  <Text style={[styles.pageTitle, { fontSize: '12px', textAlign: 'center', flex: 1 }]}>
                    Total de produtos vendidos: {orders?.reduce((acc, obj) => acc + obj.qt_products, 0)}
                  </Text>
                </View>
                <View style={[styles.tableHead, { marginTop: 20 }]}>
                  {tableHeads
                    && tableHeads.map((item) => (
                      <Text style={item === 'ID' ? styles.thId : styles.th} key={item}>
                        {item}
                      </Text>
                    ))}
                </View>

                {orders
                  && orders.map((item) => (
                    <View key={item.id} style={styles.tableRows}>
                      {Object.entries(item).map(([key, value]) => (
                        <Text key={`${key}-${value}`} style={key === 'id' ? styles.tdId : styles.td}>
                          {value}
                        </Text>
                      ))}
                    </View>
                  ))}
              </View>
            </Page>
          </Document>
        </PDFViewer>
      )}
    </>
  );
}

export default MonthStatsPDF;
