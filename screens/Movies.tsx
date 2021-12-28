import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import styled from "styled-components/native";

const Btn = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
`; //2.14 Styled Components
const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
`;
const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({
  navigation: { navigate },
}) => (
  <Btn
    onPress={() => navigate("Stack", { screen: "One" })} // Root에 스택으로 연결해두면 Tabbar 이름이랑 이동할 스크린 이름만 적어주면 이동가능
  >
    <Title>Movies</Title>
  </Btn>
);

export default Movies;
