import React, { useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import ProductCard from "../components/ProductCard";
import { Ionicons } from "@expo/vector-icons";
import { fetchProducts } from "../store/slices/productsSlice";

const ProductListScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const isAdmin = useSelector((state) => state.user.isAdmin);
  const { list: products, loading } = useSelector((state) => state.products);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(fetchProducts());
    });

    return unsubscribe;
  }, [navigation, dispatch]);

  const handleAddProduct = () => {
    navigation.navigate("AddProduct");
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#007AFF"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductCard
              id={item.id}
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              isAdmin={isAdmin}
              description={item.description}
            />
          )}
        />
      )}

      {isAdmin && (
        <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
          <Ionicons name="add" size={32} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  addButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#007AFF",
    borderRadius: 50,
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
});

export default ProductListScreen;
