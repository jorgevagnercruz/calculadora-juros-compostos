import React from 'react';

interface InputGroupProps {
  label: string;
  prefix: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}

const InputGroup: React.FC<InputGroupProps> = ({ label, prefix, ...props }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
          {prefix}
        </span>
        <input
          {...props}
          className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm bg-white"
        />
      </div>
    </div>
  );
};

export default InputGroup;