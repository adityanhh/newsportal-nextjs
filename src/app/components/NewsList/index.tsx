import Image from "next/image";

export default function NewsList() {
    return (
        <div className="grid grid-cols-3 gap-4 h-32">
            <div className="bg-slate-600">
                <Image src="https://placehold.co/600x400/png" alt="..." width={300} height={200}/>
                <h3>News Tittle</h3>
            </div>
            <div className="bg-slate-600">
                <Image src="https://placehold.co/600x400/png" alt="..." width={300} height={200}/>
                <h3>News Tittle</h3>
            </div>
            <div className="bg-slate-600">
                <Image src="https://placehold.co/600x400/png" alt="..." width={300} height={200}/>
                <h3>News Tittle</h3>
            </div>
        </div>
    )
}