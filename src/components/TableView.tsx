import React from "react";
import { Fruit } from "../Fruit";

interface TableViewProps {
  groupedFruits: Record<string, Fruit[]>; //Object containing fruits grouped by category
  groupBy: string; //Current grouping criteria (None, family, order, genus)
  onAddFruit: (fruit: Fruit) => void; //Function to add a single fruit to jar
  onAddGroup: (fruits: Fruit[]) => void; //Function to add all fruits from a group to jar
  isCollapsed: Record<string, boolean>; //object tracking collapse state of each group
  onToggleGroup: (group: string) => void; //Function to toggle group collapse/expand
}

export const TableView: React.FC<TableViewProps> = ({
  groupedFruits,
  groupBy,
  onAddFruit,
  onAddGroup,
  isCollapsed,
  onToggleGroup,
}) => {
  // Get all fruits when 'None' option is selected
  const allFruits =
    groupBy === "None"
      ? Object.values(groupedFruits)[0]
      : Object.values(groupedFruits).flat();

  return (
    <div className="table-view pr-2 space-y-4">
      {groupBy === "None" ? (
        <div className="mb-6 bg-stone-100 rounded-xl shadow-sm overflow-x-auto">
          <div className="group-header bg-stone-100 pt-4 pb-4 md:p-4 flex justify-between items-center">
            <span className="font-bold text-lg text-black">All Fruits</span>
            <button
              className="px-3 py-1.5 bg-stone-300 text-black font-bold
                      rounded-lg transition-all duration-200 active:scale-95 text-xs md:text-sm hover:bg-stone-400"
              onClick={() => onAddGroup(allFruits)}
            >
              Add All
            </button>
          </div>

          {/* all fruits display */}
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-stone-300">
              <thead className="bg-stone-100">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-semibold text-stone-500"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-semibold text-stone-500"
                  >
                    Family
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-semibold text-stone-500"
                  >
                    Order
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-semibold text-stone-500"
                  >
                    Genus
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-semibold text-stone-500"
                  >
                    Calories
                  </th>
                  <th scope="col" className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-300">
                {allFruits.map((fruit) => (
                  <tr key={fruit.name} className="hover:bg-stone-100">
                    <td className="px-4 py-4 text-sm font-medium text-black">
                      {fruit.name}
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-black">
                      {fruit.family}
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-black">
                      {fruit.order}
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-black">
                      {fruit.genus}
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-black">
                      {fruit.nutritions.calories}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button
                        onClick={() => onAddFruit(fruit)}
                        className="px-3 py-1 bg-stone-300 text-black text-sm font-bold rounded-lg 
                                 transition-all duration-200 active:scale-95 hover:bg-stone-400"
                      >
                        Add
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        // When you select any other other option (genus, order or family)
        Object.entries(groupedFruits).map(([group, fruits]) => (
          <div
            key={group}
            className="mb-6 bg-stone-100 rounded-xl shadow-sm overflow-x-auto"
          >
            <div
              className="group-header bg-stone-100 pt-4 pb-4 md:p-4 flex justify-between items-center cursor-pointer hover:bg-stone-100 transition-colors"
              onClick={() => onToggleGroup(group)}
            >
              <div className="flex items-center gap-0 md:gap-2">
                <svg
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isCollapsed[group] ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-bold text-lg text-black">{group}</span>
              </div>
              <button
                className="px-3 py-1.5 bg-stone-300 text-black font-bold
                        rounded-lg transition-all duration-200 active:scale-95 text-xs md:text-sm hover:bg-stone-400"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddGroup(fruits);
                }}
              >
                Add Group
              </button>
            </div>
            {/* Collapsible table with groups */}
            <div className={`${isCollapsed[group] ? "hidden" : ""}`}>
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full divide-y divide-stone-300">
                  <thead className="bg-stone-100">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-sm font-semibold text-stone-700"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-sm font-semibold text-stone-700"
                      >
                        Family
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-sm font-semibold text-stone-700"
                      >
                        Order
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-sm font-semibold text-stone-700"
                      >
                        Genus
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-sm font-semibold text-stone-700"
                      >
                        Calories
                      </th>
                      <th scope="col" className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-300">
                    {fruits.map((fruit) => (
                      <tr key={fruit.name} className="hover:bg-stone-100">
                        <td className="px-4 py-4 text-sm font-medium text-black">
                          {fruit.name}
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-black">
                          {fruit.family}
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-black">
                          {fruit.order}
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-black">
                          {fruit.genus}
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-black">
                          {fruit.nutritions.calories}
                        </td>
                        <td className="px-4 py-4 text-right">
                          <button
                            onClick={() => onAddFruit(fruit)}
                            className="px-3 py-1 bg-stone-300 text-black text-sm font-bold rounded-lg 
                                     transition-all duration-200 active:scale-95 hover:bg-stone-400"
                          >
                            Add
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
