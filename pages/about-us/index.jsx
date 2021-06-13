import { useRef, useContext, useState, useEffect } from 'react';
import ABOUT_US_QUERY from '../../apollo/queries/about/aboutUsQueries.gql';
import { client } from '../../apollo/client';
import TopNav from '../../components/TopNav';
import PlaceCard from '../../components/PlaceCard';
import { ColorContext } from '../../components/Theme';
import mapstyle from '../../assets/mapstyle';
import themeConfig from '../../components/Theme/colors';
import { Loader } from '@googlemaps/js-api-loader';

import styled from 'styled-components';

const STag = styled.div`
  background-color: ${({ theme, $t }) => theme.colors[$t]?.bg};
  color: ${({ theme, $t }) => theme.colors[$t]?.primary};
  height: 24px;
  width: 24px;
  border-radius: 999px;
  margin-right: 12px;
  transition: all 0.15s ease;
  box-shadow: 0px 0px 0 ${({ theme, $t }) => theme.colors[$t]?.primary};
  &:hover {
    height: 40px;
    width: 40px;
    box-shadow: 4px 4px 0 ${({ theme, $t }) => theme.colors[$t]?.primary};
  }
`;
const BgOpacity = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
`;

const AboutUs = ({ data }) => {
  const { categories, featuredList, mapLocals } = data;
  const headerRef = useRef(null);
  const { setColorTheme, colorTheme } = useContext(ColorContext);
  const googlemap = useRef(null);
  const [activePlace, setActivePlace] = useState();

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.GOOGLE_MAPS_KEY,
      version: 'weekly'
    });
    let map;

    loader.load().then(() => {
      const google = window.google;

      map = new google.maps.Map(googlemap.current, {
        center: { lat: 49.88497626, lng: -97.1345375 },
        zoom: 13,
        styles: mapstyle,
        scrollwheel: false,
        streetViewControl: false,
        mapTypeControl: false,
        zoomControl: true,
        fullscreenControl: false,
        scaleControl: true,
        gestureHandling: 'cooperative'
      });

      mapLocals.map((item, i) => {
        const icon = {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: themeConfig.colors[item.main_category?.theme].primary,
          fillOpacity: 1,
          strokeWeight: 0,
          rotation: 0,
          scale: 6
        };
        const marker = new google.maps.Marker({
          position: {
            lat: parseFloat(item.address?.latitude),
            lng: parseFloat(item.address?.longitude)
          },
          icon
        });
        marker.setMap(map);
        marker.addListener('click', () => setActivePlace(item));
      });
    });
  }, []);

  return (
    <div className="h-screen overflow-y-scroll">
      <TopNav reference={headerRef} hasBG showSearch />
      <div className="mx-auto max-w-max block my-16 px-3">
        <h1 className="text-6xl text-center font-medium mb-8 flex flex-wrap justify-center">
          <span className="mr-5">WHO</span>
          <span className="flex mr-5">
            <svg
              style={{ marginTop: '8px' }}
              width="56.141"
              height="44.501"
              viewBox="0 0 56.141 44.501"
            >
              <defs>
                <clipPath id="clip-path">
                  <rect
                    id="Rectangle_310"
                    data-name="Rectangle 310"
                    width="56.141"
                    height="44.501"
                    fill="none"
                  />
                </clipPath>
              </defs>
              <g id="Group_399" data-name="Group 399" transform="translate(-42 -31.278)">
                <g
                  id="Group_252"
                  data-name="Group 252"
                  transform="translate(98.141 75.779) rotate(180)"
                  clip-path="url(#clip-path)"
                >
                  <path
                    id="Path_409"
                    data-name="Path 409"
                    d="M7.929,0H13.88c1.244,0,2.132,1.452,1.954,2.9L12.1,27.5,9.883,42.3c-.444,2.723-3.464,2.723-3.909,0L3.754,27.5.023,2.9C-.155,1.452.733,0,1.977,0Z"
                    transform="translate(-0.023)"
                    fill="currentColor"
                  />
                  <path
                    id="Path_410"
                    data-name="Path 410"
                    d="M7.95,0H13.9c1.244,0,2.132,1.452,1.954,2.9L12.125,27.592,9.9,42.3C9.46,45.018,6.44,45.018,6,42.3l-2.221-14.7L.044,3A2.317,2.317,0,0,1,2,.091Z"
                    transform="translate(20.12 0.091)"
                    fill="currentColor"
                  />
                  <path
                    id="Path_411"
                    data-name="Path 411"
                    d="M7.861,0h5.952c1.244,0,2.132,1.452,1.954,2.9L12.036,27.592,9.815,42.3c-.444,2.723-3.464,2.723-3.909,0l-2.221-14.7L.044,3A2.317,2.317,0,0,1,2,.091Z"
                    transform="translate(40.374 0.182)"
                    fill="currentColor"
                  />
                </g>
              </g>
            </svg>
            E
          </span>
          ARE
        </h1>
        <div className="flex h-20 items-center mb-8 mx-auto max-w-max">
          {categories?.map(el => (
            <STag
              key={el.id}
              $t={el.theme}
              onMouseEnter={() => setColorTheme(el.theme)}
              onMouseLeave={() => setColorTheme('base')}
            />
          ))}
        </div>
        <p className="font-medium max-w-152 text-xl mb-6 md:text-center">
          Winnibooks <span className="font-bold">commitment</span> is to the Manitoba local
          businesses and their efforts to grow and expand their companies online presence. Our
          platform helps you showcase your business across the province to a targeted local market.
          We want to increase your business visibility online so your products and services can be
          easily found.
        </p>
      </div>

      <div className="mx-auto max-w-max block mb-16">
        <h1 className="text-5xl md:text-10xl outline-title">WINNIBOOK</h1>
        <div className="flex text-5xl md:text-10xl outline-title">
          <div className="transform rotate-180 md:mt-1.5">W</div>INNIBOOK
        </div>
      </div>

      <div
        className="flex flex-col md:flex-row gap-12 mx-3 md:mx-12 mb-12"
        style={{ maxWidth: '1200px' }}
      >
        <div>
          <h1 className="text-2xl md:text-4xl font-medium mb-8">SHOWCASE YOUR BUSINESS! 💡</h1>

          <p className="max-w-152 text-lg mb-6">
            Whether you are in retail, self-employed offering a service or an independent business,
            a listing with Winibooks will help your next customer find you. We help customers find
            businesses essential information like hours, locations, website, and social media.
          </p>
        </div>
        <BgOpacity className="p-6 rounded-20p min-h-60vh md:min-h-full grid grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-none md:auto-rows-auto-dense gap-2 md:gap-5">
          {featuredList[0].locals.map(p => (
            <a href={'place/' + p.localByLocal.id} key={p.localByLocal.id}>
              <PlaceCard
                name={p.localByLocal.name}
                categories={p.localByLocal.categories
                  .map(cat => cat.category)
                  .concat([p.localByLocal?.main_category])
                  .splice(0, 3)}
                theme={p.localByLocal.main_category.theme}
              />
            </a>
          ))}
        </BgOpacity>
      </div>

      <div
        className="flex flex-col-reverse md:flex-row gap-12 mx-3 md:mx-12 mb-12"
        style={{ maxWidth: '1200px' }}
      >
        <div className="flex min-w-50vw">
          <div
            id="map"
            className={`
          bg-yellow-200           
          min-h-50vh          
          md:min-h-70vh          
          rounded-3xl
          transition-all
          w-full
          mr-5
          
        `}
            ref={googlemap}
          />
        </div>
        <div>
          <h1 className="text-2xl md:text-4xl font-medium mb-8">HAND-REVIEWED LISTING</h1>
          <p className="max-w-152 text-lg mb-6">
            We offer a spam-free experience for users with a hand-reviewed listing. Stand from the
            crowd in today’s online marketplace with a strong online presence. As part of Winnibooks
            listing we also offer blog posts and advertising within the website to reach your
            targeted audience.
          </p>
          <div
            className={`              
              transition-all    
              h-44
              ${activePlace?.name ? 'w-44' : 'w-0'}`}
          >
            {activePlace?.name && (
              <a href={'/place/' + activePlace.id}>
                <PlaceCard
                  name={activePlace.name}
                  categories={[activePlace.main_category]}
                  theme={activePlace.main_category.theme}
                />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export async function getServerSideProps(context) {
  const { data } = await client.query({
    query: ABOUT_US_QUERY,
    variables: {
      featuredListId: '4ba99eca-ebb8-4e14-86b4-833772b8f74a'
    }
  });

  return {
    props: {
      data
    }
  };
}
export default AboutUs;
