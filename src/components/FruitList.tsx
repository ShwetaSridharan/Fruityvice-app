//imports
//libraries
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
//components
import { Fruit } from "../Fruit";
import { ListView } from "./ListView";
import { TableView } from "./TableView";

// Constants
const API_ENDPOINT = "https://wcz3qr33kmjvzotdqt65efniv40kokon.lambda-url.us-east-2.on.aws";
const TIMEOUT_DURATION = 5000;

//Type definations
enum ViewType {
  List = "list",
  Table = "table",
}

interface FruitListProps {
  groupBy: string;
  setGroupBy: (groupBy: string) => void;
  onAddFruit: (fruit: Fruit) => void;
  onAddGroup: (fruits: Fruit[]) => void;
}

// Loading Skeleton- utility component
const LoadingSkeleton: React.FC = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-10 bg-stone-200 rounded"></div>
    <div className="space-y-3">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="h-20 bg-stone-200 rounded"></div>
      ))}
    </div>
  </div>
);

//Main Component
const FruitList: React.FC<FruitListProps> = ({
  groupBy,
  setGroupBy,
  onAddFruit,
  onAddGroup,
}) => {
  //state management
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<ViewType>(ViewType.List);
  const [retryCount, setRetryCount] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState<Record<string, boolean>>({});

  //Fetching data from API
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(API_ENDPOINT, {
          timeout: TIMEOUT_DURATION,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
      
        if (response.status === 200) {
          setFruits(response.data);
        } else {
          throw new Error(`Server responded with status: ${response.status}`);
        }
      
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.code === "ECONNABORTED") {
            setError("Request timed out. Please try again.");
          } else if (!error.response) {
            setError("Network error. Please check your connection.");
          } else {
            setError(
              `Failed to fetch fruits: ${
                error.response?.data?.message || "Unknown error"
              }`
            );
          }
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [retryCount]);

  //Memoized grouped fruits
  const groupedFruits = useMemo(
    () =>
      groupBy !== "None"
        ? fruits.reduce((acc: Record<string, Fruit[]>, fruit) => {
            // Get the property value and capitalize first letter
            const propertyValue = fruit[groupBy.toLowerCase() as keyof Fruit] as string;
            const key = propertyValue.charAt(0).toUpperCase() + propertyValue.slice(1);
            acc[key] = [...(acc[key] || []), fruit];
            return acc;
          }, {})
        : { "All Fruits": fruits },
    [fruits, groupBy]
  );

  //event handlers
  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
  };

  const handleToggleGroup = (group: string) => {
    setIsCollapsed((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

 //consitional rendering and error loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <LoadingSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <div className="text-stone-600 mb-6 text-center">
          <svg
            className="w-12 h-12 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-lg font-medium">{error}</p>
        </div>
        <button
          onClick={handleRetry}
          className="px-4 py-2 bg-stone-300 text-black font-bold rounded-lg 
                   transition-all duration-200 active:scale-95 hover:bg-stone-400"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">

      {/* View Toggle */}
      <ul className="flex-none flex flex-wrap text-sm font-medium text-center text-stone-500 border-b border-stone-300 dark:border-stone-700 dark:text-stone-300 mb-4">

        <li className="mr-2">
          <button
            type="button"
            className={`p-4 rounded-t-lg transition-all duration-300 active:scale-95 flex items-center ${
              view === ViewType.List
                ? "text-black bg-stone-100 active dark:bg-stone-300 dark:text-black font-bold"
                : "text-black hover:text-black hover:bg-stone-100 dark:hover:bg-stone-300 dark:hover:text-black font-bold"
            }`}
            onClick={() => setView(ViewType.List)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 mr-2"
            >
              <path d="M3 4.75a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM6.25 3a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7ZM6.25 7.25a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7ZM6.25 11.5a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7ZM4 12.25a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM3 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
            </svg>
            List View
          </button>
        </li>
        <li>

          <button
            type="button"
            className={`p-4 rounded-t-lg transition-all duration-300 active:scale-95 flex items-center ${
              view === ViewType.Table
                ? "text-black bg-stone-100 active dark:bg-stone-300 dark:text-black font-bold"
                : "text-stone-800 hover:text-black hover:bg-stone-100 dark:hover:bg-stone-300 dark:hover:text-black font-bold"
            }`}
            onClick={() => setView(ViewType.Table)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M15 11a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6ZM7.25 7.5a.5.5 0 0 0-.5-.5H3a.5.5 0 0 0-.5.5V8a.5.5 0 0 0 .5.5h3.75a.5.5 0 0 0 .5-.5v-.5Zm1.5 3a.5.5 0 0 1 .5-.5H13a.5.5 0 0 1 .5.5v.5a.5.5 0 0 1-.5.5H9.25a.5.5 0 0 1-.5-.5v-.5ZM13.5 8v-.5A.5.5 0 0 0 13 7H9.25a.5.5 0 0 0-.5.5V8a.5.5 0 0 0 .5.5H13a.5.5 0 0 0 .5-.5Zm-6.75 3.5a.5.5 0 0 0 .5-.5v-.5a.5.5 0 0 0-.5-.5H3a.5.5 0 0 0-.5.5v.5a.5.5 0 0 0 .5.5h3.75Z"
                clipRule="evenodd"
              />
            </svg>
            Table View
          </button>
          
        </li>
      </ul>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {view === ViewType.List ? (
          <ListView
            groupedFruits={groupedFruits}
            groupBy={groupBy}
            onAddFruit={onAddFruit}
            onAddGroup={onAddGroup}
            isCollapsed={isCollapsed}
            onToggleGroup={handleToggleGroup}
          />
        ) : (
          <TableView
            groupedFruits={groupedFruits}
            groupBy={groupBy}
            onAddFruit={onAddFruit}
            onAddGroup={onAddGroup}
            isCollapsed={isCollapsed}
            onToggleGroup={handleToggleGroup}
          />
        )}
      </div>
    </div>
  );
};

export default FruitList;
