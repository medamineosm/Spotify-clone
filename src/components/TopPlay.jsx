import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch  } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

const TopChartCard = ( { song, i } ) => {
  <div className="w-fill flex flex-row items-center py-2 p-4 rounded-lg curosor-pointer mb-2 hover:bg-[#4c42e]">
    { song.title }
  </div>
}

const TopPlay = ( ) => { 
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector( ( state ) => state.player );
  const { data } = useGetTopChartsQuery();
  const divRef = useRef( null );
  
  useEffect( () => {
    divRef.current.scrollIntoView( { behaviour: 'smooth' } );
  }, [] );

  

  const topPlays = data?.slice( 0, 5 );

  const handlePauseClick = () => {
    dispatch( playPause( false ) );
  };

  const handlePlayClick = () => {
    dispatch( setActiveSong( { song, data, i } ) );
    dispatch( playPause( true ) );
  };

  return (
    <div ref={ divRef } className="xl:ml-6 ml-0 xl:-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col">
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">see more</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          { topPlays?.map( ( song, i ) => { <TopChartCard key={ song.key} song={ song } i={ i } />})}
        </div>
      </div>

      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top artists</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">see more</p>
          </Link>
        </div>
        <Swiper
          slidesPerView="auto"
          spaceBetween={ 15 }
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={ [ FreeMode ] }
          className="mt-4"
        >
          { 
            topPlays.map( ( song, i ) => (
              <SwiperSlide
                key={ song?.key }
                style={ { width: '25%', height: 'auto' } }
                className="shadow-lg rounded-full animate-slideright"
              >
                <Link to={ `/artists/${song?.artists[0].adamid}`}></Link>
              </SwiperSlide>
              )
            )
          }
        </Swiper>

      </div>
    </div>
  );
};

export default TopPlay;
