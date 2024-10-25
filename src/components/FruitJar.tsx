//imports
//libraries
import React, { useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { motion, AnimatePresence } from "framer-motion";
//components
import { Fruit } from "../Fruit";

//Types and Interfaces (3)
interface FruitJarProps {
  fruits: Fruit[];
}

interface TooltipData {
  x: number;
  y: number;
  title: string;
  value: number;
}

interface AggregatedFruit {
  name: string;
  calories: number;
  count: number;
  color: string;
}

//Main Component
const FruitJar: React.FC<FruitJarProps> = ({ fruits }) => {
  //1. Calories and Colour Calculations:

  //Calculate total calories in jar
  const totalCalories = fruits.reduce(
    (sum, fruit) => sum + fruit.nutritions.calories,
    0
  );

  //Generate unique colors for each fruit type
  const fruitColors = React.useMemo(() => {
    const uniqueFruits = Array.from(new Set(fruits.map((f) => f.name)));
    const goldenRatio = 0.618033988749895;

    return Object.fromEntries(
      uniqueFruits.map((name, index) => {
        const hue = (index * goldenRatio * 360) % 360;
        const saturation = 45 + (index % 3) * 5;
        const lightness = 65 + (index % 3) * 5;
        return [name, `hsl(${Math.round(hue)}, ${saturation}%, ${lightness}%)`];
      })
    );
  }, [fruits]);

  //2. Pie Chart Data Calculation:

  //Combine fruits and sum their calories as data
  const aggregatedData = React.useMemo(() => {
    return fruits.reduce((acc, fruit) => {
      if (!acc[fruit.name]) {
        acc[fruit.name] = {
          name: fruit.name,
          calories: 0,
          count: 0,
          color: fruitColors[fruit.name],
        };
      }
      acc[fruit.name].calories += fruit.nutritions.calories;
      acc[fruit.name].count += 1;
      return acc;
    }, {} as Record<string, AggregatedFruit>);
  }, [fruits, fruitColors]);

  //Format data for pie chart
  const pieData = Object.values(aggregatedData).map((item) => ({
    title: item.name,
    value: item.calories,
    color: item.color,
  }));

  //3. Pie chart tooltip and Interaction handling:

  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
  const [tooltipData, setTooltipData] = useState<TooltipData | null>(null);

  //mouse hover on pie chart segments
  const handleSegmentHover = (event: React.MouseEvent, index: number) => {
    if (!event.currentTarget) return;

    const segment = event.currentTarget as SVGPathElement;
    const bbox = segment.getBBox();

    //Calculate center point of segment
    const centerX = bbox.x + bbox.width / 2;
    const centerY = bbox.y + bbox.height / 2;

    //Convert SVG coordinates to screen coordinates
    const point = (segment.ownerSVGElement as SVGSVGElement).createSVGPoint();
    point.x = centerX;
    point.y = centerY;
    const screenPoint = point.matrixTransform(segment.getScreenCTM()!);

    //Position tooltip relative to container
    const container = segment.closest(".pie-chart-container") as HTMLDivElement;
    const containerRect = container.getBoundingClientRect();

    setTooltipData({
      x: screenPoint.x - containerRect.left,
      y: screenPoint.y - containerRect.top - 90,
      title: pieData[index].title,
      value: pieData[index].value,
    });
    setActiveIndex(index);
  };

  return (
    <div className="h-full bg-stone-100 rounded-2xl shadow-lg  pb-6 px-8 flex flex-col border-l-2 border-r-2 border-b-2 border-t-1 rounded-tl-[8.5rem] rounded-tr-[8.5rem] border-stone-600">
      {/* //Jar lid */}
      <div className="relative w-full mx-auto mb-4">
        <div className="h-[50px] bg-stone-300 border-2 border-stone-600 rounded-[10%]" />
      </div>

      {/* total calories */}
      <div className="flex-none">
        <h2 className="text-2xl font-semibold text-stone-800 mb-3 text-center">
          Fruit Jar
        </h2>
        <div className="bg-stone-100 rounded-xl p-3">
          <p className="text-stone-700 text-center font-medium text-lg">
            Total Calories:{" "}
            <span className="text-stone-600 font-bold">{totalCalories}</span>
          </p>
        </div>
      </div>

      {fruits.length > 0 ? (
        <div className="flex-1 flex flex-col min-h-0">
          {/* Pie Chart Section */}
          <div className="flex-none mb-4">
            <div className="w-[220px] h-[220px] mx-auto relative pie-chart-container">
              <PieChart
                data={pieData}
                animate
                animationDuration={500}
                center={[50, 50]}
                lengthAngle={360}
                lineWidth={100}
                paddingAngle={0}
                radius={45}
                startAngle={-90}
                segmentsStyle={(index) => ({
                  transition: "stroke-width 0.2s, opacity 0.2s",
                  opacity:
                    activeIndex === undefined || index === activeIndex
                      ? 1
                      : 0.3,
                })}
                segmentsShift={(index) => (index === activeIndex ? 1 : 0)}
                onClick={(event, index) => {
                  handleSegmentHover(event as React.MouseEvent, index);
                }}
                onMouseOver={(event, index) => {
                  handleSegmentHover(event as React.MouseEvent, index);
                }}
                onMouseOut={() => {
                  setActiveIndex(undefined);
                  setTooltipData(null);
                }}
              />

              {/* Tooltip */}
              {tooltipData && (
                <div
                  className="absolute bg-stone-800 text-white px-3 py-2 rounded-lg text-sm shadow-lg transform -translate-x-1/2 pointer-events-none"
                  style={{
                    left: `${tooltipData.x}px`,
                    top: `${tooltipData.y}px`,
                    opacity: 0.9,
                  }}
                >
                  <div className="font-medium">{tooltipData.title}</div>
                  <div>{Math.round(tooltipData.value)} calories</div>
                </div>
              )}
            </div>
          </div>

          {/* Fruit List Section */}
          <div className="flex-1 overflow-hidden min-h-0 border-2 border-stone-400 pb-10  rounded-2xl">
            <h1 className="p-2 text-center border-b-[1px] border-stone-400 font-medium text-stone-700">
              My Fruit List
            </h1>
            <div className="h-full overflow-y-auto custom-scrollbar">
              <div className="space-y-2 pr-2">
                <AnimatePresence>
                  {Object.values(aggregatedData).map((item) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center p-4 bg-stone-100 rounded-xl hover:bg-stone-100 transition-colors">
                        <div
                          className="w-10 h-10 flex items-center justify-center rounded-full mr-4 shadow-sm"
                          style={{ backgroundColor: item.color }}
                        >
                          <span className="text-lg font-semibold text-white">
                            {item.name.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-stone-800">
                              {item.name}
                              {item.count > 1 && (
                                <span className="ml-2 text-sm text-stone-500">
                                  × {item.count}
                                </span>
                              )}
                            </h3>
                            <span className="text-sm font-medium text-stone-600">
                              {Math.round(item.calories)} cal
                            </span>
                          </div>
                          <p className="text-sm text-stone-500">
                            {Math.round((item.calories / totalCalories) * 100)}%
                            of total
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-stone-500 text-center">
            Your jar is empty. Add some fruits!
          </p>
        </div>
      )}
    </div>
  );
};

export default FruitJar;
