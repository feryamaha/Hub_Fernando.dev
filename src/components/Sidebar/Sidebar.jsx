import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import GridDistortion from '../MainContent/Home/GridDistortion';

const Sidebar = () => {
    const location = useLocation();
    const [theme] = useTheme();

    const isActive = (path) => location.pathname === path;

    return (
        <div className={`w-sidebar h-screen bg-finder-sidebar border-r border-finder-border flex flex-col theme-${theme}`}>
            <div className="relative h-[100px] w-full overflow-hidden">
                <GridDistortion
                    imageSrc="/icons/img_profile.webp"
                    grid={10}
                    mouse={0.1}
                    strength={0.15}
                    relaxation={0.9}
                    className="absolute inset-0 object-cover"
                />
            </div>
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[var(--finder-accent)]/10 hover:scrollbar-thumb-[var(--finder-accent)]/20 scrollbar-track-transparent">
                <div className="p-3">
                    <h2 className="text-[var(--finder-accent)]/50 text-xs font-medium mb-2">Favoritos</h2>
                    <nav className="space-y-1">
                        <Link
                            to="/"
                            className={`flex items-center gap-2 px-2 py-1 rounded-md transition-colors ${isActive('/')
                                ? 'bg-[var(--finder-accent)]/10 text-[var(--finder-accent)]'
                                : 'text-[var(--finder-text)] hover:bg-[var(--finder-accent)]/5'
                                }`}
                        >
                            <img src="/icons/home.svg" alt="Home" className="w-4 h-4" />
                            <span>Home</span>
                        </Link>
                        {/* ... resto dos links ... */}
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Sidebar; 