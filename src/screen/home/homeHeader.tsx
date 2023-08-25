import { useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import {
  fetchTopRatedMovieList,
  fetchTrendingList,
} from "../../actions/movieListActions";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { fetchTopRatedTVList } from "../../actions/tvListsActions";
import { CarouselCustomNavigation } from "./carousel";

const HomeHeaderContainer = styled.div`
  min-height: 720px;
  ${tw`
		w-full
		h-full
    overflow-hidden
    whitespace-nowrap
	`}
  z-index: 0;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  overflow: auto;
`;

export default function HomeHeader() {
  const trendingList = useAppSelector(
    (state) => state.movieList.allTrendingList
  );
  const dispatch = useAppDispatch();
  const allData = trendingList.results
    .slice()
    .sort((a, b) => b.vote_average - a.vote_average)
    .slice(0, 10);

  useEffect(() => {
    // dispatch(fetchTopRatedMovieList());
    // dispatch(fetchTopRatedTVList());
    dispatch(fetchTrendingList("all"));
  }, [dispatch]);

  return (
    <HomeHeaderContainer>
      <CarouselCustomNavigation data={allData} />
    </HomeHeaderContainer>
  );
}