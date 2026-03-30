import { Link } from 'react-router-dom';
import { Instagram, Twitter, Linkedin, Mail, MapPin, ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-surface border-t-2 border-border pt-20 pb-10 relative overflow-hidden">
      {/* Massive Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-5 z-0">
        <h2 className="font-display text-[15vw] leading-none whitespace-nowrap text-white">
          PANACHE 2K26
        </h2>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <Link
              to="/"
              className="flex items-center gap-2 mb-6 group inline-flex"
            >
              <div className="w-12 h-12 text-black flex items-center justify-center transform -skew-x-12 group-hover:skew-x-0 transition-transform">
              </div>
              <img
                src="/logo.png"
                alt="Panache Logo"
                className="w-30 h-24 object-contain"
              />
            </Link>
            <p className="text-text-muted max-w-md mb-8 font-sans text-lg">
              The ultimate collision of technology, culture, and raw energy.
              Don't just witness the future—create it.
            </p>
            <div className="flex gap">
              {/* <a href="#" className="w-12 h-12 border-2 border-white/20 flex items-center justify-center text-white hover:bg-primary hover:text-black hover:border-primary transition-all transform hover:-translate-y-1">
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-12 h-12 border-2 border-white/20 flex items-center justify-center text-white hover:bg-secondary hover:text-black hover:border-secondary transition-all transform hover:-translate-y-1">
                <Twitter size={20} />
              </a> */}
              <a
                href="https://www.instagram.com/srgi.panache/"
                className="w-12 h-12 border-2 border-white/20 flex items-center justify-center text-white hover:bg-accent hover:text-black hover:border-accent transition-all transform hover:-translate-y-1"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-2xl mb-6 text-white tracking-wider">
              NAVIGATION
            </h4>
            <ul className="space-y-4 font-sans font-bold uppercase tracking-wider text-sm">
              <li>
                <Link
                  to="/events"
                  className="text-text-muted hover:text-primary transition-colors flex items-center gap-1 group"
                >
                  All Events{" "}
                  <ArrowUpRight
                    size={16}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </Link>
              </li>
              <li>
                <Link
                  to="/schedule"
                  className="text-text-muted hover:text-secondary transition-colors flex items-center gap-1 group"
                >
                  Schedule{" "}
                  <ArrowUpRight
                    size={16}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </Link>
              </li>
              <li>
                <Link
                  to="/team"
                  className="text-text-muted hover:text-primary transition-colors flex items-center gap-1 group"
                >
                  Our Team{" "}
                  <ArrowUpRight
                    size={16}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-text-muted hover:text-accent transition-colors flex items-center gap-1 group"
                >
                  Dashboard{" "}
                  <ArrowUpRight
                    size={16}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-2xl mb-6 text-white tracking-wider">
              CONTACT
            </h4>
            <ul className="space-y-4 font-sans text-sm text-text-muted">
              <li className="flex items-start gap-3 group">
                <MapPin
                  size={20}
                  className="text-primary shrink-0 mt-0.5 group-hover:animate-bounce"
                />
                <a
                  href="https://maps.app.goo.gl/7MGayJYVfACA3RwT6"
                  className="uppercase tracking-wide"
                >
                  S.R. Group of Institutions
                  <br />
                  16 KM, Gwalior Road, Ambabai, Jhansi, Uttar Pradesh 284003
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail
                  size={20}
                  className="text-secondary shrink-0 group-hover:animate-pulse"
                />
                <a
                  href="mailto:srgipanache2k26@gmail.com"
                  className="uppercase tracking-wide"
                >
                  srgipanache2k26@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Credits Section */}
        <div className="mb-20 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-24 border-t border-border/30 pt-16">
          <div className="text-center group">
            <p className="text-[10px] tracking-[0.5em] text-text-muted mb-3 font-bold uppercase opacity-60">
              Designed By
            </p>
            <a
              href="https://www.instagram.com/varun_pironiya"
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-3xl md:text-4xl text-white hover:text-accent transition-all duration-500 flex items-center gap-3"
            >
              VARUN PIRONIYA
              <ArrowUpRight
                size={24}
                className="opacity-0 -translate-y-2 translate-x-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-500"
              />
            </a>
          </div>

          <div className="w-12 h-px md:w-px md:h-16 bg-gradient-to-b from-transparent via-border to-transparent opacity-20"></div>

          <div className="text-center group">
            <p className="text-[10px] tracking-[0.5em] text-text-muted mb-3 font-bold uppercase opacity-60">
              Developed By
            </p>
            <a
              href="https://www.instagram.com/shiv_.ka_ansh/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-3xl md:text-4xl text-white hover:text-primary transition-all duration-500 flex items-center gap-3"
            >
              SHIVANSH GUPTA
              <ArrowUpRight
                size={24}
                className="opacity-0 -translate-y-2 translate-x-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-500"
              />
            </a>
          </div>
        </div>

        <div className="border-t-2 border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-sans text-sm font-bold uppercase tracking-wider text-text-muted">
          <p>
            &copy; {new Date().getFullYear()} PANACHE 2K26. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              PRIVACY
            </a>
            <a href="#" className="hover:text-white transition-colors">
              TERMS
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
