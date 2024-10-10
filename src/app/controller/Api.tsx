import axios from 'axios';

export interface Slide {
  thumbnail: string;
  title: string;
}

export const fetchNewsSlides = async (): Promise<Slide[]> => {
  try {
    const response = await axios.get('https://api-berita-indonesia.vercel.app/cnn/nasional/');
    return response.data.data.posts.slice(0, 4).map((post: any) => ({
      thumbnail: post.thumbnail,
      title: post.title
    }));
  } catch (error) {
    console.error('Error fetching images and titles from API:', error);
    throw error;
  }
};