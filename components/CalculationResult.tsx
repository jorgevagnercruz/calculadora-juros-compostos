
import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import type { CalculationResultData } from '../types';

interface CalculationResultProps {
  data: CalculationResultData;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const ResultCard: React.FC<{ title: string; value: string; color: string }> = ({ title, value, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
    <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
    <p className={`text-2xl font-bold ${color}`}>{value}</p>
  </div>
);

const CalculationResult: React.FC<CalculationResultProps> = ({ data }) => {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-red-800 mb-6">Resultado da Simulação</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <ResultCard title="Valor Final Bruto" value={formatCurrency(data.summary.finalBalance)} color="text-green-600" />
        <ResultCard title="Valor Investido" value={formatCurrency(data.summary.totalInvested)} color="text-blue-600" />
        <ResultCard title="Total em Juros" value={formatCurrency(data.summary.totalInterest)} color="text-red-800" />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Evolução do Patrimônio</h3>
        <div style={{ width: '100%', height: 400 }}>
          <ResponsiveContainer>
            <LineChart data={data.chartData} margin={{ top: 5, right: 20, left: 50, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" label={{ value: 'Anos', position: 'insideBottom', offset: -5 }}/>
              <YAxis tickFormatter={(value) => formatCurrency(value as number)} />
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
              <Legend />
              <Line type="monotone" dataKey="invested" name="Valor Investido" stroke="#3b82f6" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="total" name="Total Acumulado" stroke="#991b1b" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Tabela de Evolução (Mensal)</h3>
        <div className="overflow-x-auto max-h-96">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mês</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Juros</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Investido</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Acumulado</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.tableData.map((row) => (
                <tr key={row.period}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.period}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">{formatCurrency(row.interest)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">{formatCurrency(row.totalInvested)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-red-800">{formatCurrency(row.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CalculationResult;
