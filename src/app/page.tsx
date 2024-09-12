import Search from '@/app/components/Search';
import NewsList from '@/app/components/NewsList';
import Navbar from '@/app/components/Navbar/Navigation';
import ImageSlider from '@/app/components/ImageSlider';
import Ads from '@/app/components/Ads'; // Import Ads component

const Home = () => {
  return (
    <div>
      <div>
        <ImageSlider />
      </div>

      <div className="flex space-x-4 p-4">
        <div className="flex-1">
          <NewsList />
        </div>

        <div className="flex-none">
          <Ads />
        </div>
      </div>
    </div>
  );
};

export default Home;
