'use client'
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { storage } from '../../../firebase';
import { getDownloadURL, ref } from 'firebase/storage';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false); // Estado para el submenú
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null); // Referencia para el submenú de servicios

  useEffect(() => {
    const loadLogo = async () => {
      const logoRef = ref(storage, 'WT-type-white.png');
      const logoUrl = await getDownloadURL(logoRef);
      setLogoUrl(logoUrl);
    };

    loadLogo();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        servicesRef.current &&
        !servicesRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setIsServicesOpen(false); // Cerrar el submenú si se hace clic fuera
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {logoUrl && (
              <img src={logoUrl} alt="Willow Tree Logo" className="h-12 w-auto" />
            )}
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Inicio
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Nosotros
              </Link>
              <div className="relative">
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Servicios
                </button>
                {isServicesOpen && (
                  <div ref={servicesRef} className="absolute left-0 mt-2 bg-black text-gray-300 rounded-md shadow-lg z-50">
                    <Link href="/services/service1" className="block px-4 py-2 text-base">
                      Servicio 1
                    </Link>
                    <Link href="/services/service2" className="block px-4 py-2 text-base">
                      Servicio 2
                    </Link>
                    <Link href="/services/service3" className="block px-4 py-2 text-base">
                      Servicio 3
                    </Link>
                  </div>
                )}
              </div>
              <Link href="/contact" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Contacto
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span className="sr-only">Abrir menú principal</span>
              {isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" ref={dropdownRef}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Inicio
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Nosotros
            </Link>
            <div className="relative">
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Servicios
              </button>
              {isServicesOpen && (
                <div ref={servicesRef} className="absolute left-0 mt-2 bg-black text-gray-300 rounded-md shadow-lg z-50">
                  <Link href="/services/service1" className="block px-4 py-2 text-base">
                    Servicio 1
                  </Link>
                  <Link href="/services/service2" className="block px-4 py-2 text-base">
                    Servicio 2
                  </Link>
                  <Link href="/services/service3" className="block px-4 py-2 text-base">
                    Servicio 3
                  </Link>
                </div>
              )}
            </div>
            <Link href="/contact" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Contacto
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
