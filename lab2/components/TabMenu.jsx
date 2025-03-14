import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useTheme } from "../config/ThemeContext";

const TabMenu = ({
  tabs = [],
  initialTab = tabs[0].id,
  tabContainerStyle,
  tabStyle,
  activeTabStyle,
  tabTextStyle,
  contentContainerStyle,
}) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState(initialTab);

  const renderTab = (item) => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.tab,
        tabStyle,
        activeTab === item.id && [styles.activeTab, activeTabStyle],
        {
          flex: 1,
          backgroundColor:
            activeTab === item.id ? theme.tabActive : theme.tabInactive,
        },
      ]}
      onPress={() => setActiveTab(item.id)}
    >
      <Text
        style={[
          styles.tabText,
          tabTextStyle,
          { color: theme.text2 },
          activeTab === item.id && [{ color: theme.text1 }],
        ]}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  const renderContent = () => {
    const activeTabConfig = tabs.find((tab) => tab.id === activeTab);
    return activeTabConfig ? activeTabConfig.component : null;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.tabContainer, tabContainerStyle, styles.tabList]}>
        <View style={styles.tabRow}>{tabs.map((item) => renderTab(item))}</View>
      </View>
      <View style={[styles.contentContainer, contentContainerStyle]}>
        {renderContent()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  tabContainer: {
    justifyContent: "space-between",
  },
  tabRow: {
    flexDirection: "row",
    width: "100%",
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  tabList: {
    borderRadius: 7,
    padding: 2,
    backgroundColor: "rgba(48, 54, 73, 1)",
  },
  contentContainer: {
    flex: 1,
  },
});

export default TabMenu;
