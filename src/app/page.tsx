import Search from '@/app/components/Search'
import NewsList from '@/app/components/NewsList'
import Navbar from '@/app/components/Navbar';


export default async function Home() {

  const response = await fetch (`https://api-berita-indonesia.vercel.app/cnn/terbaru/`)
  const news = await response.json()

  return (
    <div>
      
      {/* {news.data.map((data) =>{
        console.log(data.title)
      })} */}
      <NewsList/>
    </div>
  );
}
