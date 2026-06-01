import React, { useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";

import Header from "../components/Header";
import QuickAccess from "../components/QuickAccess";
import ContinueLearning from "../components/ContinueLearning";
import Taskbar from "../components/Taskbar";
import { COLORS } from "../constants/colors";

export default function App() {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      
      <ScrollView style={{ flex: 1 }}>
        <Header />
        <QuickAccess />
        <ContinueLearning />
      </ScrollView>

      <Taskbar
        active={activeTab}
        onChange={setActiveTab}
      />

    </SafeAreaView>
  );
}