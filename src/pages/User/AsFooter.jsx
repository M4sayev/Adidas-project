import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube } from 'lucide-react';

const AsFooter = () => {
  const footerSections = [
    {
      title: "PRODUCTS",
      links: [
        { name: "Shoes", path: "/shoes" },
        { name: "Clothing", path: "/clothing" },
        { name: "Accessories", path: "/accessories" },
        { name: "Gift Cards", path: "/gift-cards" },
        { name: "New Arrivals", path: "/new-arrivals" },
        { name: "Best Sellers", path: "/best-sellers" },
        { name: "Release Dates", path: "/release-dates" },
        { name: "Sale", path: "/sale" }
      ]
    },
    {
      title: "Sports",
      links: [
        { name: "Soccer", path: "/soccer" },
        { name: "Running", path: "/running" },
        { name: "Basketball", path: "/basketball" },
        { name: "Football", path: "/football" },
        { name: "Outdoor", path: "/outdoor" },
        { name: "Golf", path: "/golf" },
        { name: "Baseball", path: "/baseball" },
        { name: "Tennis", path: "/tennis" },
        { name: "Skateboarding", path: "/skateboarding" },
        { name: "Workout", path: "/workout" }
      ]
    },
    {
      title: "Collections",
      links: [
        { name: "adicolor", path: "/adicolor" },
        { name: "Ultraboost", path: "/ultraboost" },
        { name: "Forum", path: "/forum" },
        { name: "Superstar", path: "/superstar" },
        { name: "Running Shoes", path: "/running-shoes" },
        { name: "adilette", path: "/adilette" },
        { name: "Stan Smith", path: "/stan-smith" },
        { name: "adizero", path: "/adizero" },
        { name: "Tiro", path: "/tiro" },
        { name: "Cloudfoam Pure", path: "/cloudfoam-pure" }
      ]
    },
    {
      title: "SUPPORT",
      links: [
        { name: "Help", path: "/help" },
        { name: "Returns & Exchanges", path: "/returns-exchanges" },
        { name: "Shipping", path: "/shipping" },
        { name: "Order Tracker", path: "/order-tracker" },
        { name: "Store Locator", path: "/store-locator" },
        { name: "Size Charts", path: "/size-charts" },
        { name: "Gift Card Balance", path: "/gift-card-balance" },
        { name: "How to Clean Shoes", path: "/how-to-clean-shoes" },
        { name: "Bra Fit Guide", path: "/bra-fit-guide" },
        { name: "Breathing for Running", path: "/breathing-for-running" },
        { name: "Promotions", path: "/promotions" },
        { name: "Sitemap", path: "/sitemap" }
      ]
    },
    {
      title: "COMPANY INFO",
      links: [
        { name: "About Us", path: "/about-us" },
        { name: "Student Discount", path: "/student-discount" },
        { name: "Military & Healthcare Discount", path: "/military-healthcare-discount" },
        { name: "adidas Stories", path: "/adidas-stories" },
        { name: "adidas Apps", path: "/adidas-apps" },
        { name: "Impact", path: "/impact" },
        { name: "People", path: "/people" },
        { name: "Planet", path: "/planet" },
        { name: "adiClub", path: "/adiclub" },
        { name: "Affiliates", path: "/affiliates" },
        { name: "Press", path: "/press" },
        { name: "Careers", path: "/careers" },
        { name: "California Transparency in Supply Chains Act", path: "/california-transparency" },
        { name: "Responsible Disclosure", path: "/responsible-disclosure" },
        { name: "Transparency in Coverage", path: "/transparency-coverage" }
      ]
    }
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, url: "https://facebook.com/adidas" },
    { name: "Instagram", icon: Instagram, url: "https://instagram.com/adidas" },
    { name: "Twitter", icon: () => (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ), url: "https://twitter.com/adidas" },
    { name: "Pinterest", icon: () => (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.001 24c6.624 0 11.99-5.373 11.99-12C24 5.372 18.626.001 12.001.001z"/>
      </svg>
    ), url: "https://pinterest.com/adidas" },
    { name: "TikTok", icon: () => (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
      </svg>
    ), url: "https://tiktok.com/@adidas" },
    { name: "Youtube", icon: Youtube, url: "https://youtube.com/adidas" }
  ];

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-sm font-bold text-white tracking-wide uppercase">
                {section.title}
              </h3>
              <div className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <Link
                    key={linkIndex}
                    to={link.path}
                    className="block text-white hover:underline transition-colors duration-200 text-sm leading-relaxed"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          
          {/* Social Media Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white tracking-wide uppercase">
              FOLLOW US
            </h3>
            <div className="flex flex-col space-y-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AsFooter;