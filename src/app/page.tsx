import Search from '@/app/components/Search'
import NewsList from '@/app/components/NewsList'
import Navbar from '@/app/components/Navbar/Navigation';
import ImageSlider from './components/ImageSlider';
import { news } from '@/types';
import axios from 'axios';



const Home = () => {
  return (
    <div>
      <ImageSlider/>

      <NewsList/>
    </div>
  );
}

export default Home

