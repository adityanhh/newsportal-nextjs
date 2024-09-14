import NewsList from '@/app/components/NewsList';
import ImageSlider from '@/app/components/ImageSlider';
import Ads from '@/app/components/Ads';
import RandomNews from './components/RandomNews';
import Navigation from './components/Navigation';

const Home = () => {
  return (
    <div className="relative bg-background">
      {/* ImageSlider */}
      <Navigation/>
      <div>
        <ImageSlider />
      </div>

      {/* Main content */}
      <div className="flex flex-col sm:flex-row p-4">
        <div className="flex-1 sm:mr-4">
          <RandomNews />
          <NewsList/>
        </div>

        <div className="hidden sm:flex sm:flex-none">
          <Ads />
        </div>
      </div>

      {/* Ads component on mobile */}
      <div className="fixed bottom-0 left-0 w-full sm:hidden z-50">
        <div className="relative w-full">
          <Ads />
        </div>
      </div>
    </div>
  );
};

export default Home;
