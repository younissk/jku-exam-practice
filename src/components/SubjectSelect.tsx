import { useState } from 'react';
import { Combobox, InputBase, useCombobox } from '@mantine/core';
import useSearchStore from '../stores/useSearchStore';

const groceries = [
  { name: "Python 2", id: "qaGEDqLkQZwb34UTsHOf" },
  { name: "Hands on AI 2", id: "qKGyw05W1UXklk4P9m6J" }
];

function SubjectSelect() {
  const { subject, setSubject } = useSearchStore();
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const [search, setSearch] = useState('');

  const shouldFilterOptions = groceries.every((item) => item.name !== search);
  const filteredOptions = shouldFilterOptions
    ? groceries.filter((item) => item.name.toLowerCase().includes(search.toLowerCase().trim()))
    : groceries;

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item.id} key={item.id}>
      {item.name}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        const selectedItem = groceries.find((item) => item.id === val);
        setSubject(selectedItem ? selectedItem.id : '');
        setSearch(selectedItem ? selectedItem.name : '');
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          rightSection={<Combobox.Chevron />}
          value={search}
          onChange={(event) => {
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
            setSearch(event.currentTarget.value);
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => {
            combobox.closeDropdown();
            const selectedItem = groceries.find((item) => item.id === subject);
            setSearch(selectedItem ? selectedItem.name : '');
          }}
          placeholder="Search Subject"
          rightSectionPointerEvents="none"
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options.length > 0 ? options : <Combobox.Empty>Nothing found</Combobox.Empty>}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

export default SubjectSelect;
