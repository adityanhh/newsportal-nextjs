import Link from "next/link";

export default function Navbar () {
    return (
        <header className="bg-stone-900">
            <div className="flex justify-between p-4">
                <Link href="/" className="font-bold text-white">Wyn.com</Link>
                <input placeholder="Search news" className=""/>
            </div>
        </header>
    )
}