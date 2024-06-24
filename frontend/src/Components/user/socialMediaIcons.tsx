import React from "react";

const SocialMediaIcons: React.FC = () => {
  return (
    <div className="fixed left-0.5 top-1/3 z-50 flex flex-col gap-0.5">
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className=" bg-[#1877F2] text-white p-1 md:p-3"
      >
        <img
          src="public/logo/Icons/facebook(1).png"
          alt="Facebook"
          className="w-6 h-6"
        />
      </a>
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white hover:bg-blue-500 text-white p-1 md:p-3"
      >
        <img src="/public/logo/Icons/5296514_bird_tweet_twitter_twitter logo_icon.png" alt="Twitter" className="w-6 h-6" />
      </a>
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#FF9349] hover:bg-pink-700 text-white p-1 md:p-3"
      >
        <img
          src="public/logo/Icons/instagram_2111463.png"
          alt="Instagram"
          className="w-6 h-6"
        />
      </a>
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#29A71A] hover:bg-pink-700 text-white p-1 md:p-3"
      >
        <img
          src="public/logo/Icons/whatsapp(1).png"
          alt="Instagram"
          className="w-7 h-7"
        />
      </a>
    </div>
  );
};

export default SocialMediaIcons;
