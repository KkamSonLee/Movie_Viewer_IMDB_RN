import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList } from "react-native";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import HMedia from "../components/HMedia";
import VMedia from "../components/VMedia";
import { moviesApi } from "../api";

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;
const TrendingScroll = styled.FlatList`
  margin-top: 20px;
`;
const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ComingSoonTItle = styled(ListTitle)`
  margin-bottom: 20px;
`;
const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { isLoading: nowPlayingLoading, data: nowPlayingData } = useQuery(
    "nowPlaying",
    moviesApi.nowPlaying
  );
  const { isLoading: upcomingLoading, data: upcomingData } = useQuery(
    "upcoming",
    moviesApi.upcoming
  );
  const { isLoading: trendingLoading, data: trendingData } = useQuery(
    "trending",
    moviesApi.trending
  );

  const loading = nowPlayingLoading || trendingLoading || upcomingLoading;
  const renderVMedia = ({ item }) => (
    <VMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      voteAverage={item.vote_average}
    />
  );
  const renderHMedia = ({ item }) => (
    <HMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      overview={item.overview}
      releaseDate={item.release_date}
    />
  );
  const VSeperator = styled.View`
    width: 20px;
  `;
  const HSeperator = styled.View`
    height: 20px;
  `;
  const onRefresh = async () => {};
  const movieKeyExtractor = (item) => item.id + "";
  return loading ? (
    <Loader>
      <ActivityIndicator color={"white"} />
    </Loader>
  ) : (
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
          <Swiper
            horizontal
            loop
            autoplay
            autoplayTimeout={3.5}
            showsButtons={false}
            showsPagination={false}
            containerStyle={{
              marginBottom: 30,
              width: "100%",
              height: SCREEN_HEIGHT / 4,
            }}
          >
            {nowPlayingData.results.map((movie) => (
              <Slide
                key={movie.id}
                backdrop_path={movie.backdrop_path}
                poster_path={movie.poster_path}
                original_title={movie.original_title}
                vote_average={movie.vote_average}
                overview={movie.overview}
              />
            ))}
          </Swiper>
          <ListContainer>
            <ListTitle>Trending Movies</ListTitle>
            <TrendingScroll
              horizontal
              data={trendingData.results}
              keyExtractor={movieKeyExtractor}
              ItemSeparatorComponent={VSeperator}
              contentContainerStyle={{ paddingHorizontal: 30 }}
              showsHorizontalScrollIndicator={false}
              renderItem={renderVMedia}
            />
          </ListContainer>
          <ComingSoonTItle>Coming soon</ComingSoonTItle>
        </>
      }
      data={upcomingData.results}
      keyExtractor={movieKeyExtractor}
      ItemSeparatorComponent={HSeperator}
      renderItem={renderHMedia}
    />
  );
};

export default Movies;
