'use client'
import Link from "next/link";
import { useState, useEffect } from "react";

import { storage } from '../../../firebase'
import { getDownloadURL, ref } from 'firebase/storage';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [logoUrl, setLogoUrl] = useState("");

    useEffect(() => {
        // Referencia a la imagen en Firebase Storage
        const logoRef = ref(storage, 'WT-type-white.png'); // Ajusta la ruta según tu almacenamiento

        // Obtener la URL de descarga
        getDownloadURL(logoRef)
            .then((url) => {
                setLogoUrl(url);
            })
            .catch((error) => {
                console.error("Error al obtener la URL de la imagen:", error);
            });
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
                    <Link href="/tienda" className="mx-2 hover:text-gray-300">
                        Tienda
                    </Link>
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
}; // Cerrar correctamente el componente
