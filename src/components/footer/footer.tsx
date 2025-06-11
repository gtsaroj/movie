export function Footer() {
  return (
    <footer className="bg-[#000000] w-full border-t border-[#2e2e2e] py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div className="text-center md:text-left">
            <h3 className="text-white text-lg font-semibold mb-4">About Filmagnet</h3>
            <p className="text-[#acacac] text-sm leading-relaxed">
              Filmagnet is your premier destination for discovering and streaming the latest movies and TV shows. 
              We provide a curated selection of entertainment content, keeping you updated with the newest releases 
              and timeless classics.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <a href="#" className="text-[#acacac] hover:text-[var(--primary-color)] transition-colors">About Us</a>
              <a href="#" className="text-[#acacac] hover:text-[var(--primary-color)] transition-colors">Contact</a>
              <a href="#" className="text-[#acacac] hover:text-[var(--primary-color)] transition-colors">FAQ</a>
              <a href="#" className="text-[#acacac] hover:text-[var(--primary-color)] transition-colors">Terms of Service</a>
              <a href="#" className="text-[#acacac] hover:text-[var(--primary-color)] transition-colors">Privacy Policy</a>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-right">
            <h3 className="text-white text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex justify-center md:justify-end space-x-4">
              <a href="#" className="text-[#acacac] hover:text-[var(--primary-color)] transition-colors">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-[#acacac] hover:text-[var(--primary-color)] transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-[#acacac] hover:text-[var(--primary-color)] transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-[#acacac] hover:text-[var(--primary-color)] transition-colors">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#2e2e2e] pt-6">
          <p className="text-center text-[#acacac] text-sm">
            © {new Date().getFullYear()} Filmagnet. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
  