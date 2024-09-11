export const getNewsTopHeadlines = async () => {
    const newsData = await fetch(`https://newsapi.org/v2/top-headlines?country=id&apiKey=${process.env.NEXT_PUBLIC_API_TOKEN_NEWS}`, {cache:"no-store"})
    return newsData.json()
}