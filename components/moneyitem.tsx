import axios from 'axios';
import React, { useCallback, useMemo } from 'react';
import { RiCoinsFill } from "react-icons/ri";


import useCurrentUser from '@/hooks/useCurrentUser';
import useFavorites from '@/hooks/useFavorites';

interface AccountBalanceProps {
    balance: BigInt; // Assuming balance is a BigInt
  }

const MoneyIcon : React.FC<AccountBalanceProps> = ({balance}) => {
   balance = BigInt(1000000);
   return (
    <div className="group item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
     <RiCoinsFill size={85} />
      <p className="text-3xl font-bold text-gray-800">{balance.toString()}</p>
    </div>
  );

  
}

export default MoneyIcon;