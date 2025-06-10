"use client"

import { useState } from "react"
import {  ChevronDown, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {icons} from "@/utils/index"
import { Link } from "react-router"

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="bg-[#000000] border-b border-[#2e2e2e] sticky top-0 w-full z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex gap-2 items-center">
                        <icons.logo className="size-8"/>
                        <span className="text-[#ffffff] text-xl font-bold">Filmagnet</span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-8">
                        <Link to="/" className="text-[#ffffff] hover:text-[#ccff00] transition-colors">
                            HOME
                        </Link>
                        <a href="#" className="text-[#acacac] hover:text-[#ccff00] transition-colors">
                            MOVIE
                        </a>
                        <a href="#" className="text-[#acacac] hover:text-[#ccff00] transition-colors">
                            TV SHOW
                        </a>
                        <a href="#" className="text-[#acacac] hover:text-[#ccff00] transition-colors">
                            WEB SERIES
                        </a>
                        <a href="#" className="text-[#acacac] hover:text-[#ccff00] transition-colors">
                            PREMIUM
                        </a>
                    </nav>

                    {/* Right Side */}
                    <div className="flex items-center space-x-4">

                        <div className="hidden cursor-pointer lg:flex items-center space-x-2 text-[#ffffff]">
                            <div className="w-6 h-6 p-2 bg-[#ccff00] rounded-full flex items-center justify-center">
                                <span className="text-[#000000] text-xs font-bold">EN</span>
                            </div>
                            <ChevronDown className="w-4 h-4" />
                        </div>

                        <Button className="hidden lg:inline-flex bg-transparent border border-[#ccff00] text-[#ccff00] hover:bg-[#ccff00] hover:text-[#000000]">
                            SIGN IN
                        </Button>

                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden hover:bgtran text-[#ffffff]"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="py-4 ">
                        <nav className="flex flex-col space-y-4">
                            <a href="#" className="text-[#ffffff] hover:text-[#ccff00] transition-colors">
                                HOME
                            </a>
                            <a href="#" className="text-[#acacac] hover:text-[#ccff00] transition-colors">
                                MOVIE
                            </a>
                            <a href="#" className="text-[#acacac] hover:text-[#ccff00] transition-colors">
                                TV SHOW
                            </a>
                            <a href="#" className="text-[#acacac] hover:text-[#ccff00] transition-colors">
                                WEB SERIES
                            </a>
                            <a href="#" className="text-[#acacac] hover:text-[#ccff00] transition-colors">
                                PREMIUM
                            </a>
                            <Button className="w-fit bg-transparent border border-[#ccff00] text-[#ccff00] hover:bg-[#ccff00] hover:text-[#000000]">
                                SIGN IN
                            </Button>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}
