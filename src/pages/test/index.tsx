import type { AppProps } from 'next/app';
import type { NextPageWithLayout } from '@/types';
import Layout from '@/layouts/_layout'; // Adjust the import path as needed
import { useState } from 'react';

import { WalletNotConnectedError } from "@demox-labs/aleo-wallet-adapter-base";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import React, { FC, useCallback } from "react";
import { SignMessage } from '@/components/SignMessage';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

type Transaction = {
  id: number;
  type: string;
  details: string;
  status: string;
  explorerLink: string;
};

function Test({ Component, pageProps }: AppPropsWithLayout) {

  const { publicKey, requestTransactionHistory } = useWallet();
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [loanDuration, setLoanDuration] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [icons] = useState({
    Payback: 'Icon for Payback',
    History: 'Icon for History',
    Invite: 'Icon for Invite',
    Account: 'Icon for Account'
  });

  const handleButtonClick = (buttonName: string) => {
    console.log(`${buttonName} pressed`);
  };

  // const handleViewAllClick = async () => {


  //   // const program = ".aleo";

  //   // if (!publicKey) throw new WalletNotConnectedError();
  //   // if (requestTransactionHistory) {
  //   //   const transactions = await requestTransactionHistory(program);
  //   //   console.log("Transactions: " + transactions);
  //   // }
  //   console.log('view');


  // };

  return (

    <>
      <Layout>

      <div className="flex flex-col items-center justify-center min-h-screen py-4 text-white">
          {/* Container 1 */}
          <div className="max-w-full rounded border p-4">
            <h2 className="text-lg font-bold">Loan Amount</h2>
            <p>{loanAmount}</p>
            <p className="mt-2">Loan Duration: {loanDuration} days</p>
          </div>

          {/* Container 2 */}
          <div className="max-w-full flex justify-around items-center mt-4 rounded p-4">
            {['Payback', 'History', 'Invite', 'Account'].map((item) => (
              <div key={item} className="flex flex-col items-center mx-2">
                <button onClick={() => handleButtonClick(item)} className="rounded p-2 border">
                  {/* Replace with actual icon related to 'item' */}
                  <span>Icon</span>
                </button>
                <p className="mt-2 text-center">{item}</p>
              </div>
            ))}
          </div>

          {/* Container 3 */}
          <div className="max-w-full mt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Transaction History</h3>
              {/* <button onClick={handleViewAllClick} className="rounded bg-white text-black px-4 py-2 mx-4">
                View All
              </button> */}
              <SignMessage/>
            </div>
            <ul>
              {transactions.map((transaction) => (
                <li key={transaction.id} className="flex items-center mt-2">
                  {/* Add Money Icon here */}
                  <span>{transaction.type} - {transaction.details} - {transaction.status}</span>
                  <a href={transaction.explorerLink} className="ml-2">Link</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Test;
