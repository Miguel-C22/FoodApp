import React, { useEffect, useState } from 'react';
import { 
    Alert,
    Box, 
    Button, 
    CircularProgress, 
    Collapse, 
    styled, 
    Typography 
} from '@mui/material';
import { InfoBox } from '../styles/global';
import MacrosDisplay from './MacrosDisplay';

const CardContainer = styled(Box)`
    display: flex;
    justify-content: center;
    gap: 2em;
    margin: 2em auto;
    max-width: 100%;
    flex-wrap: wrap;
    width: 50em;
    box-shadow: grey 1px 1px 10px;
    border-radius: 1em;
`
const SummaryContainer = styled(Box)`
    display: flex; 
    gap: 1em;
    flex-direction: column;
    text-align: left;
    width: 20em;
    padding: 1em;
`
const Image = styled('img')`
    width: 100%;
    max-height: 14em;
    height: 100%;
    padding: 1em;
`
const StyledLink = styled('a')`
  color: green;
  text-decoration: none;
  text-align: left;
  padding-left: 1em;
  font-size: 1.5rem;
`;
const ImageContainer = styled(Box)`
    display: flex;
    flex-direction: column;
`
const CalorieContainer = styled(Box)`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    background-color: #f3f3f3;
    width: 100%;
    padding: 1em 2em;
`

type DisplayData = {
  foodData: any[];
  loading: boolean;
  error: boolean;
};

function DisplayData({ 
    foodData, 
    loading, 
    error 
}: DisplayData) {
    
  const [caloriedense, setCaloriedense] = useState<any[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null); 

  const getTheThreeCalorieDenseFoods = () => {
    const foodsWithCalories = foodData.map((data) => {
        const caloriesNutrient = data.nutrition.nutrients.find(
          (nutrient: any) => nutrient.name.toLowerCase() === 'calories'
        );
        return {
          ...data,
          calories: caloriesNutrient ? caloriesNutrient.amount : 0,
        };
      });
      const sortedFoods = foodsWithCalories.sort((a, b) => a.calories - b.calories);
      const leastCalorieDense = sortedFoods.slice(0, 3);
      setCaloriedense(leastCalorieDense);
      console.log(caloriedense)
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=360";
  };

  const cleanSummaryText = (summary: string) => {
    const cleanedSummary = summary
      .replace(/<b>/g, '')  
      .replace(/<\/b>/g, '') 
      .replace(/<a href=".*?">/g, '') 
      .replace(/<\/a>/g, '') 
      .replace(/\s+/g, ' ')  
      .trim();  

    return cleanedSummary;
  };

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  useEffect(() => {
    getTheThreeCalorieDenseFoods()
  }, [foodData]);

  return (
    <Box>
        {loading ? <CircularProgress /> :
            <>
                {error ? <Alert severity="error">Something went wrong please try again later 😢</Alert> : 
                    <>
                    {caloriedense.map((data, index) => (
                        <CardContainer key={index}>
                            <ImageContainer>
                                <Image
                                    src={data.image}
                                    alt={data.title}
                                    onError={handleImageError} 
                                />   
                                <StyledLink 
                                    href={data.spoonacularSourceUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    >
                                    View Recipe
                                </StyledLink>
                            </ImageContainer>
                            <SummaryContainer>
                                <Typography variant='h4'>{data.title}</Typography>
                                <Typography >
                                    {expandedIndex === index ? null : <>{cleanSummaryText(data.summary).slice(0, 150)}...</>}
                                </Typography>
                                <Collapse in={expandedIndex === index}>
                                    <Typography >{cleanSummaryText(data.summary)}</Typography>
                                </Collapse>
                                <Button
                                    onClick={() => toggleExpand(index)}
                                    variant="outlined"
                                    size="small"
                                >
                                    {expandedIndex === index ? "Show Less" : "Show More"}
                                </Button>
                            </SummaryContainer>
                            <CalorieContainer>
                                <Box>
                                    <InfoBox>
                                        <Typography variant="h5" style={{ fontWeight: "bold" }}>
                                            Calories:
                                        </Typography>
                                    <Typography variant='h6'> {`${data.calories}`}</Typography>
                                    </InfoBox>     
                                    <InfoBox>
                                        <Typography variant="h5" style={{ fontWeight: "bold" }}>
                                        Servings:
                                        </Typography>
                                    <Typography variant='h6'> {`${data.servings}`}</Typography>
                                    </InfoBox>                            
                                </Box>
                                <Box>
                                <MacrosDisplay caloriedense={caloriedense} index={index} /> 
                                </Box>
                            </CalorieContainer>
                        </CardContainer>
                    ))}
                </>
                }
            </>            
        }
    </Box>
  );
}

export default DisplayData;