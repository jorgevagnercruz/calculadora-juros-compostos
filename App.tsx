
import React, { useState } from 'react';
import CalculatorForm from './components/CalculatorForm';
import CalculationResult from './components/CalculationResult';
import InfoSection from './components/InfoSection';
import type { CalculationResultData } from './types';

const App: React.FC = () => {
  const [initialValue, setInitialValue] = useState<string>('1000');
  const [monthlyValue, setMonthlyValue] = useState<string>('500');
  const [interestRate, setInterestRate] = useState<string>('8');
  const [period, setPeriod] = useState<string>('10');
  const [rateType, setRateType] = useState<'annual' | 'monthly'>('annual');
  const [periodType, setPeriodType] = useState<'years' | 'months'>('years');
  const [result, setResult] = useState<CalculationResultData | null>(null);

  const handleClear = () => {
    setInitialValue('');
    setMonthlyValue('');
    setInterestRate('');
    setPeriod('');
    setRateType('annual');
    setPeriodType('years');
    setResult(null);
  };

  const handleCalculate = () => {
    const p = parseFloat(initialValue) || 0;
    const m = parseFloat(monthlyValue) || 0;
    const rate = parseFloat(interestRate) || 0;
    const t = parseInt(period, 10) || 0;

    const totalMonths = periodType === 'years' ? t * 12 : t;
    const monthlyRate = rateType === 'annual' 
      ? Math.pow(1 + rate / 100, 1 / 12) - 1 
      : rate / 100;

    if (totalMonths === 0 || monthlyRate === 0) {
      setResult({
        summary: {
          finalBalance: p + m * totalMonths,
          totalInvested: p + m * totalMonths,
          totalInterest: 0,
        },
        chartData: [],
        tableData: [],
      });
      return;
    }

    let accumulated = p;
    const chartData: { period: number; invested: number; total: number }[] = [{ period: 0, invested: p, total: p }];
    const tableData: { period: number; interest: number; totalInvested: number; total: number }[] = [];

    for (let i = 1; i <= totalMonths; i++) {
      const interestEarned = accumulated * monthlyRate;
      accumulated += interestEarned + m;
      const totalInvested = p + i * m;

      // We add data points for the table monthly and for the chart yearly to keep it clean
      if (i % 12 === 0 || i === totalMonths) {
        chartData.push({
          period: i / 12,
          invested: totalInvested,
          total: accumulated,
        });
      }
      
      tableData.push({
        period: i,
        interest: interestEarned,
        totalInvested: totalInvested,
        total: accumulated
      });
    }

    const finalTotalInvested = p + totalMonths * m;
    setResult({
      summary: {
        finalBalance: accumulated,
        totalInvested: finalTotalInvested,
        totalInterest: accumulated - finalTotalInvested,
      },
      chartData,
      tableData,
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 font-sans">
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <h1 className="text-3xl font-bold text-red-800 mb-6">
            Simulador de Juros Compostos
          </h1>
          <CalculatorForm
            initialValue={initialValue}
            setInitialValue={setInitialValue}
            monthlyValue={monthlyValue}
            setMonthlyValue={setMonthlyValue}
            interestRate={interestRate}
            setInterestRate={setInterestRate}
            period={period}
            setPeriod={setPeriod}
            rateType={rateType}
            setRateType={setRateType}
            periodType={periodType}
            setPeriodType={setPeriodType}
            onCalculate={handleCalculate}
            onClear={handleClear}
          />
        </div>
        
        {result && <CalculationResult data={result} />}
        
        <InfoSection />
      </main>
    </div>
  );
};

export default App;
