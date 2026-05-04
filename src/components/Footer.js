export default function Footer() {
    return (
        <footer id="footer" className="bg-primary text-white py-12 font-retro border-t-4 border-text">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-lg text-text mb-8 md:mb-0 text-center md:text-left">
                        © 2026 Tegar Firmansyah. All rights reserved.
                    </p>
                    <div className="flex space-x-6 text-3xl">
                        <a href="https://github.com/Tegarfirmansyah1" className="text-text hover:text-hover transition duration-300" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-github"></i>
                        </a>
                        <a href="https://www.linkedin.com/in/tegar-firmansyah-081581244" className="text-text hover:text-hover transition duration-300" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a href="https://www.instagram.com/tegarfirmansyah_00" className="text-text hover:text-hover transition duration-300" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}