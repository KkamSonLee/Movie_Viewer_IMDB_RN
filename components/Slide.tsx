import React from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";
import { BlurView } from "expo-blur";
import Poster from "./Poster";

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const Column = styled.View`
  margin-left: 15px;
  width: 60%;
`;
const BgImg = styled.Image``;
const Title = styled.Text<{ isDark: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
`;
const Overview = styled.Text<{ isDark: boolean }>`
  margin-top: 10px;
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
`;
const Votes = styled(Overview)`
  font-size: 12px;
`;

interface SlideProps {
  backdrop_path: string;
  poster_path: string;
  original_title: string;
  vote_average: number;
  overview: string;
}

const Slide: React.FC<SlideProps> = ({
  backdrop_path,
  poster_path,
  original_title,
  vote_average,
  overview,
}) => {
  const isDark = useColorScheme() === "dark";

  return (
    <View style={{ flex: 1 }}>
      <BgImg
        style={StyleSheet.absoluteFill}
        source={{ uri: makeImgPath(backdrop_path) }}
      />
      <BlurView
        tint={isDark ? "dark" : "light"}
        intensity={120}
        style={StyleSheet.absoluteFill}
      >
        <Wrapper>
          <Poster path={poster_path} />
          <Column>
            <Title isDark={isDark}>{original_title}</Title>
            {vote_average > 0 ? (
              <Votes isDark={isDark}>⭐{vote_average}/10</Votes>
            ) : null}
            <Overview isDark={isDark}>{overview.slice(0, 90)}...</Overview>
          </Column>
        </Wrapper>
      </BlurView>
    </View>
  );
};
export default Slide;
