import React from "react";
import { View, FlatList, StyleSheet, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, changeQuantity } from "../store/slices/cartSlice";
import { useNavigation } from "@react-navigation/native";

import CartItem from "../components/CartItem";
import CartFooter from "../components/CartFooter";
import EmptyCartMessage from "../components/EmptyCartMessage";

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const items = useSelector((state) => state.cart.items);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, qty) => {
    const quantity = parseInt(qty, 10);
    if (isNaN(quantity) || quantity <= 0) {
      Alert.alert("Помилка", "Кількість має бути числом більше 0");
      return;
    }
    dispatch(changeQuantity({ id, quantity }));
  };

  const handleCheckout = () => {
    navigation.navigate("Checkout");
  };

  const renderItem = ({ item }) => (
    <CartItem
      item={item}
      onQuantityChange={handleQuantityChange}
      onRemove={handleRemove}
    />
  );

  return (
    <View style={styles.container}>
      {items.length === 0 ? (
        <EmptyCartMessage />
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
          <CartFooter total={total} onCheckout={handleCheckout} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
});

export default CartScreen;
