import React from 'react';
import InputGroup from './ui/InputGroup';

interface CalculatorFormProps {
  initialValue: string;
  setInitialValue: (value: string) => void;
  monthlyValue: string;
  setMonthlyValue: (value: string) => void;
  interestRate: string;
  setInterestRate: (value: string) => void;
  period: string;
  setPeriod: (value: string) => void;
  rateType: 'annual' | 'monthly';
  setRateType: (value: 'annual' | 'monthly') => void;
  periodType: 'years' | 'months';
  setPeriodType: (value: 'years' | 'months') => void;
  onCalculate: () => void;
  onClear: () => void;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({
  initialValue, setInitialValue,
  monthlyValue, setMonthlyValue,
  interestRate, setInterestRate,
  period, setPeriod,
  rateType, setRateType,
  periodType, setPeriodType,
  onCalculate, onClear
}) => {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onCalculate(); }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6">
        <InputGroup
          label="Valor inicial"
          prefix="R$"
          value={initialValue}
          onChange={(e) => setInitialValue(e.target.value)}
          placeholder="0,00"
          type="number"
        />
        <InputGroup
          label="Valor mensal"
          prefix="R$"
          value={monthlyValue}
          onChange={(e) => setMonthlyValue(e.target.value)}
          placeholder="0,00"
          type="number"
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Taxa de juros</label>
          <div className="flex">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
              %
            </span>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="flex-1 min-w-0 block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm bg-white"
              placeholder="8"
            />
            <select
              value={rateType}
              onChange={(e) => setRateType(e.target.value as 'annual' | 'monthly')}
              className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
            >
              <option value="annual">anual</option>
              <option value="monthly">mensal</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Período</label>
          <div className="flex">
            <input
              type="number"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border border-r-0 border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm bg-white"
              placeholder="1"
            />
            <select
              value={periodType}
              onChange={(e) => setPeriodType(e.target.value as 'years' | 'months')}
              className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
            >
              <option value="years">ano(s)</option>
              <option value="months">meses</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-6">
        <button
          type="submit"
          className="bg-red-800 text-white font-bold py-2 px-6 rounded-md hover:bg-red-900 transition-colors duration-300"
        >
          Calcular
        </button>
        <button type="button" onClick={onClear} className="text-gray-600 hover:underline">
          Limpar
        </button>
      </div>
    </form>
  );
};

export default CalculatorForm;