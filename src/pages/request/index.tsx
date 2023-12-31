import Layout from '@/layouts/_layout';
import React, { useState } from 'react';

interface FormState {
  loanAmount: number;
  loanDuration: number;
}

const LoanForm: React.FC = () => {
  // State variables
  const [formState, setFormState] = useState<FormState>({ loanAmount: 0, loanDuration: 0 });
  const loanLimit = 10000; // Replace with actual loan limit
  const creditRate = 5; // Replace with actual credit rate

  // Handlers
  const handleLoanAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, loanAmount: parseFloat(event.target.value) });
  };

  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, loanDuration: parseInt(event.target.value, 10) });
  };

  const handleSubmit = () => {
    console.log('Sent', formState);
    // Add logic to send data to the contract
  };

  return (
    <>
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-screen py-4 text-white">
          <form className="w-full max-w-md">
            {/* Loan Amount */}
            <div className="mb-4">

              <label htmlFor="loanAmount" className="mb-14 text-lg font-medium uppercase text-center tracking-wider text-gray-900 dark:text-white sm:mb-10 sm:text-2xl">How much do you need?</label>
              <input
                type="number"
                id="loanAmount"
                value={formState.loanAmount}
                className="shadow appearance-none border rounded my-2 w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black"
                placeholder="Enter amount"
                onChange={handleLoanAmountChange}
                min="0"
                max={loanLimit}
              />
              <p className="text">Your loan limit is: ${loanLimit}</p>
            </div>

            {/* Loan Duration */}
            <div className="mb-4">
              <label htmlFor="loanDuration" className="mb-14 text-lg font-medium uppercase text-center tracking-wider text-gray-900 dark:text-white sm:mb-10 sm:text-2xl">Loan Duration (days)</label>
              <input
                type="number"
                id="loanDuration"
                value={formState.loanDuration}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black"
                placeholder="Enter number of days"
                min='0'
                onChange={handleDurationChange}
              />
            </div>

            {/* Credit Rate */}
            <div className="mb-6">
              <p className="text">Credit Based Interest Rates: {creditRate}%</p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center py-4">
              <button
                type="button"
                className="bg-transparent border border-white text-white py-2 px-4 rounded"
                onClick={handleSubmit}
              >
                Get Loan
              </button>


            </div>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default LoanForm;
