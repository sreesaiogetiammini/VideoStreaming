import React, { useCallback, useEffect, useState } from 'react'
import NavBarItem from './navbaritem'
import {AiOutlineBars} from 'react-icons/ai'
import { icons } from 'react-icons'
import MobileMenuBar from './mobilemenubar'
import {TfiSearch} from 'react-icons/tfi'
import {BsFillBellFill,BsChevronBarDown} from 'react-icons/bs'
import AccountBox from './accountbox'
import SearchInput from './searchinput'
import useCurrentUser from '@/hooks/useCurrentUser'
import MoneyIcon from './moneyitem'
import { RiCoinsFill } from "react-icons/ri";

const TOP_OFFSET = 66;

const Navbar = () => {

const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

const  toggleMobileSwitch = useCallback(()=>{setMobileMenuVisible((current)=>!current)},[]);

const [accountMenuVisible, setAccountMenuVisible] = useState(false);

const  toggleAccountSwitch = useCallback(()=>{setAccountMenuVisible((current)=>!current)},[]);

const [showBackground, setShowBackground] = useState(false);
const [isSearchInputVisible, setSearchInputVisible] = useState(false);
const toggleSearchInput = () => { setSearchInputVisible(!isSearchInputVisible); };
const { data: curentuser } = useCurrentUser();



useEffect(()=>{
    const handleScroll = () => {
        if(window.scrollY >= TOP_OFFSET){
            setShowBackground(true);
        }
        else{
            setShowBackground(false);
        }
    }
    window.addEventListener('scroll',handleScroll);

    return () => {
        window.removeEventListener('scroll',handleScroll);
    }
},[])

  return (
    <nav className='w-full fixed z-40'>
        <div className=
        {`px-4 md:px-16
        py-6
        flex
        flex-row
        items-center
        transition
        duration-500
        ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}
        `}
        >
        <img className='h-8 lg:h-10' src='images/logo.png' alt='logo'></img>
         <div className='flex-row hidden lg:flex items-center ml-auto gap-8'>
                <NavBarItem  label = 'Home'/>
                <NavBarItem label = 'Movies'/>
                <NavBarItem label = 'TV Series'/>
                {curentuser !== undefined && curentuser.email !== "guest@gmail.com" &&   <NavBarItem label = 'My List'/>}  
        </div>

        <div onClick= {toggleMobileSwitch} className='lg:hidden flex flex-row items-center gap-3 ml-8 cursor-pointer relative'>
            <AiOutlineBars className={`h-8 w-10 text-white transition ${mobileMenuVisible ? 'rotate-180' : 'rotate-0'}`} />
            <MobileMenuBar visible = {mobileMenuVisible}/>
        </div>
        <div className='flex flex-row ml-auto gap-7 items-center'>
        
        {curentuser !== undefined && curentuser.email !== "guest@gmail.com" &&  
        <div className="text-gray-200 p-2 hover:text-gray-400 border-white border-2 square-full flex justify-center items-center transition hover:border-neutral-300">
            <RiCoinsFill size={35}/>
            <p className="text-3xl font-bold text-white">
            {curentuser !== undefined && curentuser.currentBalance ? curentuser.currentBalance.toString() : '0'}
            </p>
         </div>
         }
            <div onClick={toggleSearchInput} className='text-gray-200 hover:text-gray-400 cursor-pointer'>
                <TfiSearch />
            </div>
            {isSearchInputVisible && <SearchInput/>}
            {/* <div className='text-gray-200 hover:text-gray-400 cursor-pointer'>
                <BsFillBellFill/>
            </div> */}
            <div onClick={toggleAccountSwitch} className='flex flex-row items-center gap-2 cursor-pointer relative'>
                <div className='w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden'>
                   <img src='images/man.png' alt='profile logo'></img>
                </div>
                <BsChevronBarDown className={`w-6 h-6 lg:w-10 lg:h-10 text-white transition ${accountMenuVisible ? 'rotate-180' : 'rotate-0'}`} />
                <AccountBox visible={accountMenuVisible}/>
            </div>
     
        </div>
        </div>
    </nav>
  )
}

export default Navbar
