import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import OrderItem from "../components/OrderItem"; 

const OrdersHistoryScreen = () => {
  const orders = useSelector((state) => state.orders.history);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Історія замовлень</Text>

      {orders.length === 0 ? (
        <Text style={styles.noOrders}>Немає замовлень</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <OrderItem order={item} />}
        />
      )}
    </View>
  );
};

export default OrdersHistoryScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  noOrders: { color: "#999", fontStyle: "italic" },
});
