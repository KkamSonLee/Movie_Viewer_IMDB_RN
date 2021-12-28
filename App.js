import React, { useState } from "react";
import { View, Text, Image, useColorScheme } from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { useFonts } from "expo-font";
import { Asset, useAssets } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import Tabs from "./navigation/Tabs";
import Stack from "./navigation/Stack";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import Root from "./navigation/Root";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styled";

export default function App() {
  const [assets] = useAssets([require("./leeminho.jpg")]);
  const [loaded] = useFonts(Ionicons.font);
  const isDark = useColorScheme() === "dark";
  if (!assets || !loaded) {
    return <AppLoading />;
  }
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </ThemeProvider>
  );
}
