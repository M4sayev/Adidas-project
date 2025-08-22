import React from 'react';

const Information = () => {
  return (
    <div className="bg-black text-white py-16">
      <div className="max-w-2xl mx-auto text-left md:text-justify">
        {/* Başlıq */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-center uppercase mb-6">
          Sneakers, Activewear and Sporting Goods
        </h1>

        {/* Mətinin birinci hissəsi */}
        <p className="text-sm md:text-base text-gray-200 leading-relaxed mb-6">
          Calling all athletes. Gear up for your favorite sport with adidas
          sneakers and activewear for men and women. From running to soccer and
          the gym to the trail, performance workout clothes and shoes keep you
          feeling your best. Find sport-specific sneakers to support your
          passion, and shop versatile activewear and accessories that support
          everyday comfort. adidas has you covered with world-class performance,
          quality and unmatched comfort to fit your style. Explore the full
          range of adidas gear today.
        </p>

        {/* Mətinin ikinci hissəsi */}
        <p className="text-sm md:text-base text-gray-200 leading-relaxed">
          Founded on performance, adidas sporting goods equipment supports
          athletes at all levels. Men, women and kids will find their best form
          in sneakers and activewear made to perform under pressure. adidas
          sportswear breathes, manages sweat and helps support working muscles.
          Explore sport-specific clothes and gear for basketball, soccer, or the
          yoga studio. Runners will find a range of sneakers for training,
          racing and trail runs. Gym users will find tops, tees and tanks that
          support focused efforts with adidas CLIMACOOL to feel cool and dry.
          Explore warm-ups featuring four-way stretch to support mobility. Find
          a new outdoor jacket that helps protect against wind and rain. Lace up
          new athletic shoes that energize every step with adidas Boost
          cushioning. With sizes and styles for all ages, we have sporting goods
          for the whole family. Dedicated training demands dedicated workout
          clothes. Experience the latest performance fabrics and sneaker
          technologies to get the most out of your next training session.
        </p>
      </div>



        {/* Logo */}
        <div className="mt-8 flex justify-center">
          <img
            src="/w_logo.png"
            alt="adidas logo"
            className="w-10"
          />
        </div>
     
    </div>
  );
};

export default Information;
