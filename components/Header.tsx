import { useEffect, useState } from 'react';
import Link from 'next/link';
import {  BellIcon, SearchIcon } from '@heroicons/react/solid';
import Image from 'next/legacy/image';
import useAuth from '../contexts/useAuth';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { logout } = useAuth(); // tmp

  useEffect(() => {
    const handleScrollHeader = () =>
      window.scrollY > 0 ? setIsScrolled(true) : setIsScrolled(false);

    window.addEventListener('scroll', handleScrollHeader);

    return () => {
      window.removeEventListener('scroll', handleScrollHeader);
    };
  }, []);

  return (
    <header className={`${isScrolled ? 'bg-[#141414]' : ''}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <Image
          src="/images/Netflix_2015_logo.svg"
          width={100}
          height={30}
          className="cursor-pointer object-contain"
          alt=""
        />

        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink cursor-default font-semibold text-white hover:text-white">
            Home
          </li>
          <li className="headerLink">TV Shows</li>
          <li className="headerLink">Movies</li>
          <li className="headerLink">New & Popular</li>
          <li className="headerLink">My List</li>
        </ul>
      </div>

      <div className="flex items-center space-x-4 text-sm font-light">
        <SearchIcon className="sm hidden h-6 w-6 sm:inline" />
        <p className="hidden lg:inline">Kids</p>
        <BellIcon className="h-6 w-6" />
        {/* <Link href="/account">
          <Image
            src="/images/img-avatar.png"
            alt="avatar"
            width={25}
            height={25}
            className="cursor-pointer rounded"
          />
        </Link> */}
        {/* TMP */}
        <Link href="/account">
          <Image
            onClick={logout}
            src="/images/img-avatar.png"
            alt="avatar"
            width={25}
            height={25}
            className="cursor-pointer rounded"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
