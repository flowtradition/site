import { useState } from "react";
import { RadioGroup } from "@headlessui/react";

type Value = {
  id: number;
  name: string;
  inStock: boolean;
  price?: number;
  description?: string;
};

type Props = {
  id: number;
  name: string;
  values: Value[];
  onChange({ id, name, value }: { id: number; name: string; value: Value }): void;
};

export const Option = ({ id, name, values, onChange }: Props) => {
  const [selected, setSelected] = useState(values[0]);

  const handleChange = (value) => {
    setSelected((_) => {
      onChange({ id, name, value });
      return value;
    });
  };

  return (
    <div className="w-full mx-auto my-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-900 font-medium">{name}:</h3>
      </div>
      <RadioGroup value={selected} onChange={handleChange}>
        <RadioGroup.Label className="sr-only">{name}</RadioGroup.Label>
        <div className="space-y-1 min">
          {values.map((value) => (
            <RadioGroup.Option
              key={value.name}
              value={value}
              className={({ active, checked }) =>
                `${active ? "ring-2 ring-offset-2 ring-offset-indigo-100 ring-white ring-opacity-50" : ""}
                  ${checked ? "bg-gray-50 text-gray-900 border-indigo-500" : "bg-white"}
                    relative rounded-lg border-2 px-5 py-4 cursor-pointer flex focus:outline-none`
              }
            >
              {({ active, checked }) => (
                <>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <div className="text-sm">
                        <RadioGroup.Label
                          as="p"
                          className={`font-bold  ${checked ? "text-indigo-500" : "text-gray-900"}`}
                        >
                          {value.name}
                        </RadioGroup.Label>
                        {value.description && (
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${checked ? "text-indigo-500" : "text-gray-500"}`}
                          >
                            <span>{value.description}</span>
                          </RadioGroup.Description>
                        )}
                      </div>
                    </div>
                    {checked && (
                      <div className="flex-shrink-0 text-indigo-500">
                        <CheckIcon className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};

const CheckIcon = (props) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="currentColor" opacity="0.2" />
      <path d="M7 13l3 3 7-7" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
