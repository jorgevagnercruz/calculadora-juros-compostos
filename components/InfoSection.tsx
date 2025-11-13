
import React from 'react';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const comparisonData = [
    { period: '5 anos', simple: 8000.00, compound: 9083.48 },
    { period: '10 anos', simple: 11000.00, compound: 16501.93 },
    { period: '20 anos', simple: 17000.00, compound: 54462.77 },
    { period: '30 anos', simple: 23000.00, compound: 179748.21 },
];

const InfoSection: React.FC = () => {
  return (
    <div className="mt-10 bg-white p-8 rounded-lg shadow-md border border-gray-200 prose max-w-none">
      <h2 className="text-2xl font-bold text-red-800">Entendendo os Juros Compostos</h2>
      
      <h3 className="text-xl font-semibold text-gray-800 mt-6">Como usar a calculadora?</h3>
      <p>Utilizar nossa ferramenta para suas simulações financeiras é simples e intuitivo. Siga os passos:</p>
      <ol className="list-decimal list-inside space-y-2">
        <li><strong>Valor Inicial:</strong> Comece inserindo o montante que você já possui para investir.</li>
        <li><strong>Valor Mensal:</strong> Informe a quantia que você planeja adicionar ao investimento a cada mês.</li>
        <li><strong>Taxa de Juros:</strong> Defina a rentabilidade do seu investimento, seja ela anual ou mensal.</li>
        <li><strong>Período:</strong> Especifique por quanto tempo, em anos ou meses, seu dinheiro ficará investido.</li>
        <li><strong>Calcular:</strong> Com todos os campos preenchidos, clique em "Calcular" para ver a mágica acontecer.</li>
      </ol>

      <h3 className="text-xl font-semibold text-gray-800 mt-6">A Fórmula por Trás da Mágica</h3>
      <p>O cálculo dos juros compostos segue a fórmula:</p>
      <p className="text-center font-mono bg-gray-100 p-4 rounded-md">M = C (1+i)^t</p>
      <p>Onde cada letra representa:</p>
      <ul className="list-disc list-inside space-y-1">
        <li><strong>M:</strong> O montante final acumulado após o período.</li>
        <li><strong>C:</strong> O capital inicial investido.</li>
        <li><strong>i:</strong> A taxa de juros (convertida para o mesmo período do tempo).</li>
        <li><strong>t:</strong> O tempo de aplicação.</li>
      </ul>
      <p>É crucial que a taxa de juros (i) e o tempo (t) estejam na mesma unidade. Se a taxa é mensal, o tempo deve ser em meses. Nossa calculadora faz essa conversão para você!</p>

      <h3 className="text-xl font-semibold text-gray-800 mt-6">Onde os Juros Compostos Atuam?</h3>
      <p>Conhecidos como "juros sobre juros", eles são uma força poderosa no mundo financeiro, presente em diversas situações:</p>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Investimentos:</strong> É aqui que eles brilham a seu favor. Em produtos de renda fixa como Tesouro Direto e CDBs, ou ao reinvestir dividendos de ações, os juros compostos aceleram exponencialmente o crescimento do seu patrimônio.</li>
        <li><strong>Financiamentos e Empréstimos:</strong> Instituições financeiras utilizam juros compostos, o que pode aumentar consideravelmente o custo final do crédito. Fica o alerta para o poder deles contra você.</li>
        <li><strong>Contas em Atraso:</strong> Para desincentivar a inadimplência, juros compostos são aplicados sobre faturas atrasadas, transformando pequenas dívidas em grandes "bolas de neve".</li>
      </ul>

      <h3 className="text-xl font-semibold text-gray-800 mt-6">Juros Simples vs. Juros Compostos</h3>
      <p>A diferença fundamental reside na base de cálculo. Os <strong>juros simples</strong> incidem sempre sobre o valor inicial. Já os <strong>juros compostos</strong> incidem sobre o montante acumulado (valor inicial + juros já ganhos).</p>
      <p>Imagine um investimento de R$ 5.000 a uma taxa de 1% ao mês. Veja a diferença ao longo do tempo:</p>
      <div className="border-2 border-blue-300 rounded-lg overflow-hidden my-4 not-prose">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 font-semibold text-gray-600">Período</th>
              <th className="p-3 font-semibold text-gray-600">Juros Simples</th>
              <th className="p-3 font-semibold text-gray-600">Juros Compostos</th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((item, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="p-3 text-sm text-gray-700">{item.period}</td>
                <td className="p-3 text-sm text-gray-700">{formatCurrency(item.simple)}</td>
                <td className="p-3 text-sm text-gray-700 font-semibold">{formatCurrency(item.compound)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4">No longo prazo, a diferença é monumental. Essa "bola de neve" de rendimentos é o que Albert Einstein supostamente chamou de "a oitava maravilha do mundo". Use-a a seu favor!</p>
    </div>
  );
};

export default InfoSection;
