import React from 'react';
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();
export default function ProductMultiSelect({ products, selected, setSelected }) {
  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={products.map(p => ({ value: p._id, label: p.name }))}
      value={products
        .filter(p => selected.includes(p._id))
        .map(p => ({ value: p._id, label: p.name }))}
      onChange={(selectedOptions) =>
        setSelected(selectedOptions.map(opt => opt.value))
      }
      placeholder="Select products..."
      className="w-full"
    />
  );
}