import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import api from "../services/api";
import PostItem from "../components/PostItem";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

const PostsScreen = () => {
  const { logout } = useContext(AuthContext);
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const fetchPosts = async () => {
        setLoading(true);
        try {
          const res = await api.get("/posts.json");
          if (res.data) {
            const loadedPosts = Object.keys(res.data)
              .map((key) => ({
                id: key,
                ...res.data[key],
              }))
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            setPosts(loadedPosts);
          } else {
            setPosts([]);
          }
        } catch (err) {
          console.error("Failed to load posts", err);
        } finally {
          setLoading(false);
        }
      };

      fetchPosts();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate("CreatePost")}
          activeOpacity={0.7}
        >
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>

        <View style={styles.centered}>
          <Text style={styles.noPostsText}>Пости відсутні.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostItem title={item.title} body={item.body} />
        )}
        contentContainerStyle={{ paddingVertical: 10 }}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("CreatePost")}
        activeOpacity={0.7}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f7",
    position: "relative",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f7",
  },
  noPostsText: {
    fontSize: 18,
    color: "#999",
    marginBottom: 20,
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#6200ee",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
    zIndex: 10,
  },
  fabIcon: {
    fontSize: 32,
    color: "white",
    fontWeight: "bold",
  },
});
