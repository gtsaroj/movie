import { useState } from "react"
import { Button } from "@/components/ui/button"
import { icons } from "@/utils/icons/icons"
import { Link, useLocation } from "react-router"

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const location = useLocation()

    const isActive = (path: string) => {
        return location.pathname === path
    }

    return (
        <header className="bg-[#000000] border-b border-[#2e2e2e] sticky top-0 w-full z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to={"/"} className="flex gap-2 items-center">
                        <icons.logo className="size-8" />
                        <span className="text-[#ffffff] text-xl font-bold">Filmagnet</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-8">
                        <Link
                            to="/"
                            className={`transition-colors ${isActive('/') ? 'text-[#ffffff] ' : 'text-[#acacac]'}`}
                        >
                            HOME
                        </Link>
                        <Link
                            to="/movies"
                            className={`transition-colors ${isActive('/movies') ? 'text-[#ffffff]' : 'text-[#acacac]'} hover:text-[var(--primary-color)]`}
                        >
                            MOVIE
                        </Link>
                        <a href="#" className="text-[#acacac] hover:text-[var(--primary-color)] transition-colors">
                            TV SHOW
                        </a>
                        <a href="#" className="text-[#acacac] hover:text-[var(--primary-color)] transition-colors">
                            WEB SERIES
                        </a>
                        <a href="#" className="text-[#acacac] hover:text-[var(--primary-color)] transition-colors">
                            PREMIUM
                        </a>
                        <Link
                            to="/favourites"
                            className={`transition-colors ${isActive('/favourites') ? 'text-[#ffffff] ' : 'text-[#acacac]'}`}
                        >
                            Favourites
                        </Link>
                    </nav>

                    {/* Right Side */}
                    <div className="flex items-center space-x-4">

                        <div className="hidden cursor-pointer lg:flex items-center space-x-2 text-[#ffffff]">
                            <div className="w-6 h-6 p-2 bg-[var(--primary-color)] rounded-full flex items-center justify-center">
                                <span className="text-[#000000] text-xs font-bold">EN</span>
                            </div>
                            <icons.chevronDown className="w-4 h-4" />
                        </div>

                        <Button className="hidden lg:inline-flex bg-transparent border border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-[#000000]">
                            SIGN IN
                        </Button>

                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden hover:bgtran text-[#ffffff]"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <icons.x className="w-5 h-5" /> : <icons.menu className="w-5 h-5" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="py-4 ">
                        <nav className="flex flex-col space-y-4">
                            <Link
                                to="/"
                                className={`transition-colors ${isActive('/') ? 'text-[#ffffff]' : 'text-[#acacac]'} hover:text-[var(--primary-color)]`}
                            >
                                HOME
                            </Link>
                            <Link
                                to="/movies"
                                className={`transition-colors ${isActive('/movies') ? 'text-[#ffffff]' : 'text-[#acacac]'} hover:text-[var(--primary-color)]`}
                            >
                                MOVIE
                            </Link>
                            <a href="#" className="text-[#acacac] hover:text-[var(--primary-color)] transition-colors">
                                TV SHOW
                            </a>
                            <a href="#" className="text-[#acacac] hover:text-[var(--primary-color)] transition-colors">
                                WEB SERIES
                            </a>
                            <a href="#" className="text-[#acacac] hover:text-[var(--primary-color)] transition-colors">
                                PREMIUM
                            </a>
                            <Link
                                to="/favourites"
                                className={`transition-colors ${isActive('/favourites') ? 'text-[#ffffff]' : 'text-[#acacac]'} hover:text-[var(--primary-color)]`}
                            >
                                Favourites
                            </Link>
                            <Button className="w-fit bg-transparent border border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-[#000000]">
                                SIGN IN
                            </Button>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}
