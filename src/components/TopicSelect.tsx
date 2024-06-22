import { useState } from "react";
import { Combobox, InputBase, useCombobox } from "@mantine/core";
import useSearchStore from "../stores/useSearchStore";
import { Question } from "../../data/interfaces/Test";

function TopicSelect({ questions }: { questions: Question[] }) {

  let allTopics: string[] = [];
  
  questions.forEach((question) => {
    question.topics.forEach((topic) => {
      allTopics.push(topic);
    })})
  
  const uniqueTopics = Array.from(new Set(allTopics));


  const { topic, setTopic } = useSearchStore();

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [search, setSearch] = useState("");

  const shouldFilterOptions = uniqueTopics.every((item) => item !== search);
  const filteredOptions = shouldFilterOptions
    ? uniqueTopics.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase().trim())
      )
    : uniqueTopics;

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        setTopic(val);
        setSearch(val);
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
            setSearch(topic || "");
          }}
          placeholder="Search Source"
          rightSectionPointerEvents="none"
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options.length > 0 ? (
            options
          ) : (
            <Combobox.Empty>Nothing found</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

export default TopicSelect;
