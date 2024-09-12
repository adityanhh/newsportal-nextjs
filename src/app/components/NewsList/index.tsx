'use client'

import axios from "axios";

import { useEffect, useState } from "react";

export default function NewsList() {
    const [newsList, setNewsList] = useState([]);
    useEffect(() => {
        const fetchData = async() => {
            const response = await axios.get (`https://api-berita-indonesia.vercel.app/cnn/terbaru/`)
            setNewsList(response.data.data.posts)
        }
        fetchData()
    },[])

    return (
        <div className="grid grid-cols-4 gap-4">
            {newsList && newsList.map((data: any)=>(
                <div className="bg-slate-200">
                <img src={`${data.thumbnail}`} alt="..."/>
                <h3>{data.title}</h3>
            </div>
            ))}
        </div>
    )
}