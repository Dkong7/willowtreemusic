'use client'
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { storage } from '../../../firebase';
import { getDownloadURL, ref } from 'firebase/storage';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);
    const [logoUrl, setLogoUrl] = useState("");
    const servicesMenuRef = useRef<HTMLDivElement>(null); // Especificar el tipo aquí

    useEffect(() => {
        const logoRef = ref(storage, 'WT-type-white.png'); // Ajusta la ruta según tu almacenamiento

        getDownloadURL(logoRef)
            .then((url) => {
                setLogoUrl(url);
            })
            .catch((error) => {
                console.error("Error al obtener la URL de la imagen:", error);
            });
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) { // Definir el tipo del evento
            if (servicesMenuRef.current && !servicesMenuRef.current.contains(event.target as Node)) {
                setServicesOpen(false);
            }
        }
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    function getMenuClasses() {
        return isOpen ? 
            "flex flex-col absolute top-[60px] bg-gray-800 w-full p-4 left-0 gap-10 md:hidden" :
            "hidden md:flex";
    }

    return (
        <nav className="bg-gray-800 bg-opacity-10 text-white p-4 sm:p-6 md:flex md:justify-between">
            <div className="container mx-auto flex justify-between items-center">
                <a href="" className="text-2xl font-bold">
                    {logoUrl ? <img src={logoUrl} alt="Logo" className="h-16" /> : "WILLOW TREE MUSIC"}
                </a>
                <div className={getMenuClasses()}>
                    <Link href="/" className="mx-2 hover:text-gray-300">
                        Home
                    </Link>
                    <Link href="/estudio" className="mx-2 hover:text-gray-300">
                        Estudio
                    </Link>
                    <Link href="/nosotros" className="mx-2 hover:text-gray-300">
                        Nosotros
                    </Link>
                    <div className="relative mx-2" ref={servicesMenuRef}>
                        <button 
                            onClick={() => setServicesOpen(!servicesOpen)}
                            className="hover:text-gray-300 focus:outline-none"
                        >
                            Servicios
                        </button>
                        {servicesOpen && (
                            <div className="absolute left-0 mt-2 w-48 bg-gray-700 rounded-lg shadow-lg">
                                <Link href="/servicios/produccion" className="block px-4 py-2 hover:bg-gray-600">
                                    Producción
                                </Link>
                                <Link href="/servicios/mezcla" className="block px-4 py-2 hover:bg-gray-600">
                                    Mezcla
                                </Link>
                                <Link href="/servicios/masterizacion" className="block px-4 py-2 hover:bg-gray-600">
                                    Masterización
                                </Link>
                                <Link href="/servicios/grabacion" className="block px-4 py-2 hover:bg-gray-600">
                                    Grabación
                                </Link>
                                <Link href="/servicios/instrument-coach" className="block px-4 py-2 hover:bg-gray-600">
                                    Instrument Coach
                                </Link>
                                <Link href="/servicios/promocion" className="block px-4 py-2 hover:bg-gray-600">
                                    Promoción
                                </Link>
                            </div>
                        )}
                    </div>
                    <Link href="/contacto" className="mx-2 hover:text-gray-300">
                        Contacto
                    </Link>
                </div>

                <div className="md:hidden flex items-center">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {isOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6m6 6L18 18"></path>
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"></path>
                            )}
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};
