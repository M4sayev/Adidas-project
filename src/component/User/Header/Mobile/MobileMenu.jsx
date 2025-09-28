import React from "react";
import MobileHeader from "./MobileHeader";
import MobileSearch from "./MobileSearch";
import MobileNav from "./MobileNav";
import MobileFooter from "./MobileFooter";

function MobileMenu({
  toggleMobileMenu,
  setMobileMenuOpen,
  categories,
  allProducts,
  setSearchQuery,
  navigate,
}) {
  return (
    <div className="fixed inset-0 z-[1001] bg-white w-screen h-screen">
      <div className="flex flex-col h-full w-full">
        {/* Mobile Menu Header */}
        <MobileHeader
          toggleMobileMenu={toggleMobileMenu}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {/* Mobile Search */}
        <MobileSearch
          allProducts={allProducts}
          setSearchQuery={setSearchQuery}
          navigate={navigate}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {/* Mobile Navigation - TAM ƏHATƏ */}
        <MobileNav
          categories={categories}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {/* Mobile Menu Footer - TAM GENIŞLIK */}
        <MobileFooter setMobileMenuOpen={setMobileMenuOpen} />
      </div>
    </div>
  );
}

export default MobileMenu;
