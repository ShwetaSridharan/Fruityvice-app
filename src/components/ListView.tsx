//imports
//libraries
import React from "react";
//components
import { Fruit } from "../Fruit";

interface ListViewProps {
  groupedFruits: Record<string, Fruit[]>; //Object containing fruits grouped
  groupBy: string; //Current grouping criteria (None, family, order, genus)
  onAddFruit: (fruit: Fruit) => void; //Function to add a single fruit to jar
  onAddGroup: (fruits: Fruit[]) => void; //Function to add all fruits from a group to jar
  isCollapsed: Record<string, boolean>; //object tracking collapse state of each group
  onToggleGroup: (group: string) => void; //Function to toggle group collapse/expand
}

//Main Component
export const ListView: React.FC<ListViewProps> = ({
  groupedFruits, //destructured props
  groupBy,
  onAddFruit,
  onAddGroup,
  isCollapsed,
  onToggleGroup,
}) => {
  return (
    <div className="list-view px-2">
      {Object.entries(groupedFruits).map(([group, fruits]) => (
        <div
          key={group}
          className="mb-6 bg-stone-100 rounded-xl shadow-sm overflow-hidden"
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
            {/* Add All/Group button */}
            <button
              className="px-3 py-1.5 bg-stone-300 text-black font-bold rounded-lg 
                        transition-all duration-200 active:scale-95 text-xs md:text-sm hover:bg-stone-400"     
              onClick={(e) => {
                e.stopPropagation();
                onAddGroup(fruits);
              }}
            >
              {groupBy === "None" ? "Add All" : "Add Group"}
            </button>
          </div>

          <ul
            className={`divide-y divide-stone-200 ${
              isCollapsed[group] ? "hidden" : ""
            }`}
          >
            {fruits.map((fruit) => (
              <li
                key={fruit.name}
                className="hover:bg-stone-100 transition-colors"
              >
                <div className="px-4 py-3 flex items-center justify-between">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                    <span className="font-medium text-black">{fruit.name}</span>
                    <div className="flex items-center gap-4 text-sm text-stone-700">
                      <span>({fruit.nutritions.calories} cal)</span>
                    </div>
                  </div>
                  <button
                    className="px-3 py-1.5 bg-stone-300 text-black font-bold
                             rounded-lg transition-all duration-200 active:scale-95 text-xs md:text-sm hover:bg-stone-400
                             whitespace-nowrap ml-4"
                    onClick={() => onAddFruit(fruit)}
                  >
                    Add
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
