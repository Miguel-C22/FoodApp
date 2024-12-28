import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { styled } from '@mui/system';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const MacroContainer = styled(Box)`
  display: flex;
  align-items: center;
  flex: wrap;
  gap: .5em;
`

type MacroDisplayProps = {
  caloriedense: any[];
  index: number; 
};

function MacroDisplay({ caloriedense, index }: MacroDisplayProps) {
  const [macros, setMacros] = useState<any[]>([]);

  useEffect(() => {
    if (caloriedense[index]) {
      const relevantMacros = caloriedense[index].nutrition.nutrients.filter((m: any) =>
        ["Protein", "Carbohydrates", "Fat", "Sugar"].includes(m.name)
      );
      setMacros(relevantMacros);
    }
  }, [caloriedense, index]);

  const displayColorDots = (name: string) => {
    switch (name) {
      case "Protein":
        return <FiberManualRecordIcon style={{ color: "green" }} />;
      case "Carbohydrates":
        return <FiberManualRecordIcon style={{ color: "yellow" }} />;
      case "Fat":
        return <FiberManualRecordIcon style={{ color: "orange" }} />;
      case "Sugar":
          return <FiberManualRecordIcon style={{ color: "red" }} />;
      default:
        return null;
    }
  };

  return (
    <>
      {macros.map((data, index) => (
        <MacroContainer key={index}>
          {displayColorDots(data.name)}
          <Typography variant='h5'>
            {data.name}: 
          </Typography>
          <Typography fontSize={20}>
          {data.amount} {data.unit}
          </Typography>
        </MacroContainer>
      ))}
    </>
  );
}

export default MacroDisplay;