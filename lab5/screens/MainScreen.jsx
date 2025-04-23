import React, { useEffect, useState } from "react";
import {
  Alert,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from "react-native";
import * as FileSystem from "expo-file-system";

function MainScreen() {
  const [freeSpace, setFreeSpace] = useState(null);
  const [usedSpace, setUsedSpace] = useState(null);
  const [totalSpace, setTotalSpace] = useState(null);
  const [loading, setLoading] = useState(true);
  const progressAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    async function getStorageInfo() {
      try {
        const freeBytes = await FileSystem.getFreeDiskStorageAsync();
        const totalBytes = await FileSystem.getTotalDiskCapacityAsync();
        const usedBytes = totalBytes - freeBytes;

        setFreeSpace(freeBytes);
        setUsedSpace(usedBytes);
        setTotalSpace(totalBytes);
        setLoading(false);

        const progress = usedBytes / totalBytes;
        Animated.timing(progressAnim, {
          toValue: progress,
          duration: 1000,
          useNativeDriver: false,
        }).start();
      } catch (error) {
        console.error("Error getting storage info:", error);
        Alert.alert(
          "Помилка",
          "Не вдалося отримати інформацію про памʼять. Спробуйте пізніше."
        );
      }
    }

    getStorageInfo();
  }, []);

  const formatGB = (bytes) => (bytes / 1024 / 1024 / 1024).toFixed(2) + " GB";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💽 Інформація про диск</Text>

      {loading ? (
        <ActivityIndicator size="large" color="red" />
      ) : (
        <View style={styles.card}>
          <Text style={styles.label}>
            Загальний обсяг: {formatGB(totalSpace)}
          </Text>
          <Text style={styles.label}>Використано: {formatGB(usedSpace)}</Text>
          <Text style={styles.label}>Вільно: {formatGB(freeSpace)}</Text>

          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <Animated.View
                style={[
                  styles.progressFill,
                  {
                    width: progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0%", "100%"],
                    }),
                  },
                ]}
              />
            </View>
            <Text style={styles.percentage}>
              {((usedSpace / totalSpace) * 100).toFixed(1)}% використано
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#333",
  },
  card: {
    width: "100%",
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  label: {
    fontSize: 18,
    marginVertical: 4,
    color: "#444",
  },
  progressContainer: {
    marginTop: 20,
  },
  progressBar: {
    height: 12,
    backgroundColor: "#ddd",
    borderRadius: 6,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "tomato",
    borderRadius: 6,
  },
  percentage: {
    marginTop: 6,
    fontSize: 14,
    color: "#666",
    textAlign: "right",
  },
});

export default MainScreen;
