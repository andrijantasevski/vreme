import Link from "next/link"
import Image from "next/image"

export default function Footer() {
    return (
        <footer className="flex justify-center items-center gap-x-4 py-4">
            <a href="https://www.github.com/andrijantasevski/"><Image src="/icons/footer/github.svg" width="30" height="30" /></a>
            <a href="https://www.instagram.com/andrijantasevski/"><Image src="/icons/footer/instagram.svg" width="30" height="30" /></a>
            <a href="https://www.linkedin.com/in/andrijan-tasevski-502903225/"><Image src="/icons/footer/linkedin.svg" width="30" height="30" /></a>
        </footer>
    )
}