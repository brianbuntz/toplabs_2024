// components/AwardsExplorer.tsx
import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { RD100Award } from "../types";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";

interface AwardsExplorerProps {
  awards: RD100Award[];
}

interface ChartData {
  year: number;
  type1: number;
  type2: number;
  type3: number;
}

const AwardsExplorer: React.FC<AwardsExplorerProps> = ({ awards }) => {
  const chartData = useMemo<ChartData[]>(() => {
    const data: { [key: string]: ChartData } = {};
    awards.forEach((award) => {
      if (!data[award.year]) {
        data[award.year] = { year: award.year, type1: 0, type2: 0, type3: 0 };
      }
      const randomType = Math.floor(Math.random() * 3) + 1;
      data[award.year][`type${randomType}` as keyof ChartData]++;
    });
    return Object.values(data).sort((a, b) => a.year - b.year);
  }, [awards]);

  const globalMaxAwards = useMemo(() => {
    const max = Math.max(
      ...chartData.map((data) => data.type1 + data.type2 + data.type3),
      10,
    );
    return Math.ceil(max / 5) * 5;
  }, [chartData]);

  const CustomTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({
    active,
    payload,
    label,
  }) => {
    if (active && payload && payload.length) {
      const yearAwards = awards.filter((award) => award.year === label);
      const totalAwards = payload.reduce((sum, entry) => {
        return sum + ((entry.value as number) || 0);
      }, 0);

      return (
        <div className="bg-gray-800 p-3 rounded shadow-lg max-w-md">
          <p className="text-white font-bold mb-1 text-sm">{`Year: ${label}`}</p>
          <p className="text-white text-sm">{`Total Awards: ${totalAwards}`}</p>
          <div className="text-gray-300 text-xs mt-1">
            <ul className="list-disc list-inside">
              {yearAwards.map((award, i) => (
                <li key={i}>{award.product}</li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
    return null;
  };

  if (!awards || awards.length === 0) {
    return null;
  }

  const renderSingleAward = (award: RD100Award) => (
    <div className="bg-gray-700 p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-white mb-2">{award.product}</h3>
      <p className="text-gray-300">Year: {award.year}</p>
      <p className="text-gray-300 mt-2">Organization: {award.organization}</p>
      {/* Removed the description field as it's not in the RD100Award type */}
    </div>
  );

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <p className="text-gray-300 mb-4">Total Awards: {awards.length}</p>
      {awards.length === 1 ? (
        renderSingleAward(awards[0])
      ) : (
        <ResponsiveContainer width="100%" height={240}>
          <BarChart
            data={chartData}
            margin={{ top: 16, right: 24, left: 16, bottom: 4 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="year" stroke="#E5E7EB" tick={{ fontSize: 12 }} />
            <YAxis
              stroke="#E5E7EB"
              domain={[0, globalMaxAwards]}
              tick={{ fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="type1" stackId="a" fill="#4C51BF" />
            <Bar dataKey="type2" stackId="a" fill="#9F7AEA" />
            <Bar dataKey="type3" stackId="a" fill="#718096" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default AwardsExplorer;
