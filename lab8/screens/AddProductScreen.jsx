import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useDispatch } from "react-redux";
import { addProductAsync } from "../store/slices/productsSlice";

const AddProductScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Доступ заборонено", "Дозвольте доступ до галереї");
      }
    })();
  }, []);

  // Функція копіювання фото у локальне сховище застосунку
  const saveImageLocally = async (uri) => {
    try {
      // Отримаємо назву файлу
      const filename = uri.split("/").pop();

      // Новий шлях у папці застосунку
      const newPath = FileSystem.documentDirectory + filename;

      // Копіюємо файл
      await FileSystem.copyAsync({
        from: uri,
        to: newPath,
      });

      return newPath;
    } catch (error) {
      console.log("Помилка копіювання файлу:", error);
      return uri; 
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.7,
      });

      if (!result.canceled) {
        const localUri = await saveImageLocally(result.assets[0].uri);
        setImageUrl(localUri);
      }
    } catch (error) {
      console.log("Помилка вибору зображення:", error);
    }
  };

  const handleSubmit = async () => {
    if (
      !title.trim() ||
      !price.trim() ||
      !imageUrl.trim() ||
      !description.trim()
    ) {
      Alert.alert("Помилка", "Заповніть всі поля!");
      return;
    }

    const product = {
      title,
      price: parseFloat(price),
      imageUrl,
      description,
    };

    try {
      await dispatch(addProductAsync(product)).unwrap();
      Alert.alert("Успішно", "Товар додано!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Помилка", "Не вдалося додати товар.");
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Назва товару</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Наприклад, Ноутбук"
      />

      <Text style={styles.label}>Ціна (грн)</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        placeholder="Наприклад, 25000"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Короткий опис</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        value={description}
        onChangeText={setDescription}
        placeholder="Наприклад, Потужний і легкий ноутбук"
        multiline
      />

      <Text style={styles.label}>Зображення</Text>
      <Button title="Обрати зображення з галереї" onPress={pickImage} />
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.imagePreview} />
      ) : null}

      <View style={styles.buttonContainer}>
        <Button title="Додати товар" onPress={handleSubmit} color="#007AFF" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginTop: 10,
    borderRadius: 8,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default AddProductScreen;
