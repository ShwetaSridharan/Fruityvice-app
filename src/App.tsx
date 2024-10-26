// imports
// libraries
import React, { useState } from "react";
import Select from "react-select";
//components
import FruitList from "./components/FruitList";
import FruitJar from "./components/FruitJar";
import { Fruit } from "./Fruit";

//App Component
const App: React.FC = () => {
  const [groupBy, setGroupBy] = useState("None"); // State for managing the current grouping selection (None, family, order, or genus)-Initialize with "None" as default value
  const [jarFruits, setJarFruits] = useState<Fruit[]>([]); // State for managing the fruits added to the jar- Initialize as an empty array of Fruit type

  //Handlers for adding fruits
  const handleAddFruit = (fruit: Fruit) => {
    setJarFruits([...jarFruits, fruit]);
  }; //Single Fruit
  const handleAddGroup = (fruits: Fruit[]) => {
    setJarFruits([...jarFruits, ...fruits]);
  }; //Group of fruits

  //Styles for the Grouping Selection
  const selectStyles = {
    control: (base: any, state: any) => ({
      ...base,
      backgroundColor: "#f5f5f4",
      border: "1px solid #78716c",
      borderRadius: "0.75rem",
      boxShadow: state.isFocused ? "0 0 0 1px #78716c" : "none",
      padding: "2px",
      "&:hover": { borderColor: "#d6d3d1" },
      transition: "all 0.2s ease",
    }),
    option: (base: any, { isSelected, isFocused }: any) => ({
      ...base,
      backgroundColor: isSelected ? "" : isFocused ? "#d6d3d1" : "white",
      color: "rgb(0 0 0)",
      fontWeight: "500",
      cursor: "pointer",
      "&:active": { backgroundColor: "d6d3d1" },
    }),
    singleValue: (base: any) => ({
      ...base,
      color: "rgb(0 0 0)",
      fontWeight: "500",
    }),
    menu: (base: any) => ({
      ...base,
      borderRadius: "0.75rem",
      overflow: "hidden",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    }),
  };

  return (
    <main role="main">
      <div className="min-h-screen bg-gradient-to-br from-stone-100 to-stone-300 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center tracking-tight">
            FRUITYVICE
          </h1>

          <div className="flex flex-col lg:flex-row gap-6 lg:h-[1000px] lg:min-h-[1000px] min-h-[700px]">
            {/* Left section of the app */}
            <div className="left-section h-[700px] lg:h-[1000px] bg-stone-100 rounded-2xl w-full  lg:w-3/5 flex flex-col  lg:min-h-0 border-2 border-stone-500">
              <div className="rounded-2xl shadow-lg p-4 md:p-6 h-full flex flex-col">
                <div className="flex-none mb-6">
                  <label
                    htmlFor="groupBySelect"
                    className="block text-base font-bold text-black mb-2"
                  >
                    Group By:
                  </label>
                  <Select
                    id="groupBySelect"
                    isSearchable={false}
                    options={[
                      { value: "None", label: "None" },
                      { value: "family", label: "family" },
                      { value: "order", label: "order" },
                      { value: "genus", label: "genus" },
                    ]}
                    value={{ value: groupBy, label: groupBy }}
                    onChange={(selectedOption) => {
                      if (selectedOption) {
                        setGroupBy(selectedOption.value);
                      }
                    }}
                    styles={selectStyles}
                    className="w-full"
                  />
                </div>

                <div className="flex-1 overflow-hidden">
                  <FruitList
                    groupBy={groupBy}
                    setGroupBy={setGroupBy}
                    onAddFruit={handleAddFruit}
                    onAddGroup={handleAddGroup}
                  />
                </div>
              </div>
            </div>

            {/* Right section of the app*/}
            <div className="right-section h-[700px] lg:h-[1000px] w-full lg:w-2/5 flex flex-col  lg:min-h-0">
              <FruitJar fruits={jarFruits} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
