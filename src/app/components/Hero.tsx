'use client';
import { useState, useEffect } from 'react';
import { storage } from '../../../firebase';
import { getDownloadURL, ref } from 'firebase/storage';
import Link from 'next/link';
import { FaInstagram, FaSpotify, FaTiktok, FaYoutube } from 'react-icons/fa';

export const Hero = () => {
    const [backgroundImages, setBackgroundImages] = useState<string[]>([]);
    const [logoUrl, setLogoUrl] = useState<string | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const imageNames = ['studio1.png', 'studio2.jpg', 'studio3.jpg'];
        const loadImages = async () => {
            const urls = await Promise.all(
                imageNames.map(name => getDownloadURL(ref(storage, name)))
            );
            setBackgroundImages(urls);
        };

        const loadLogo = async () => {
            const logoRef = ref(storage, 'WT-logotipo-white.png');
            const logoUrl = await getDownloadURL(logoRef);
            setLogoUrl(logoUrl);
        };

        loadImages();
        loadLogo();
    }, []);

    useEffect(() => {
        if (backgroundImages.length > 0) {
            const interval = setInterval(() => {
                setCurrentImageIndex(prevIndex => (prevIndex + 1) % backgroundImages.length);
            }, 5000); // Cambia de imagen cada 5 segundos

            return () => clearInterval(interval);
        }
    }, [backgroundImages]);

    return (
        <section className="relative w-full h-screen overflow-hidden">
            {/* Background Image Carousel */}
            <div className="absolute inset-0">
                {backgroundImages.length > 0 && (
                    <div className="relative w-full h-full">
                        <img
                            src={backgroundImages[currentImageIndex]}
                            alt={`studio ${currentImageIndex + 1}`}
                            className="absolute w-full h-full object-cover"
                        />
                    </div>
                )}
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-4">
                {logoUrl && <img src={logoUrl} alt="Willow Tree Logo" className="h-48 mb-8" />} {/* Logo 2x más grande */}
                <h1 className="text-3xl md:text-5xl font-bold">¡Bienvenidos a Willow Tree Music!</h1>
                <h2 className="text-xl md:text-3xl font-semibold mt-4">Descubre nuestros servicios de producción musical</h2>
                <h3 className="text-lg md:text-xl mt-4 text-gray-300">Conoce al equipo y explora nuestras instalaciones</h3>

                <div className="flex mt-8 space-x-4">
                    <Link href="https://spotify.com/artist" className="px-6 py-3 bg-white text-black rounded-full text-lg hover:bg-gray-300 hover:text-white transition-transform transform hover:scale-105">
                        Escucha en Spotify
                    </Link>
                    <Link href="/servicios" className="px-6 py-3 bg-black text-white rounded-full text-lg hover:bg-gray-800 transition-transform transform hover:scale-105">
                        Nuestros Servicios
                    </Link>
                </div>
            </div>


        </section>
    );
};
