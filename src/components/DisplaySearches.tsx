import React, { useEffect, useState } from 'react'
import { 
    Box, 
    Chip, 
    Typography, 
    styled
} from '@mui/material'
import deleteSearchQuery from '../utils/deleteSearchQuery'
import getSearchQuery from '../utils/getSearchQuery'

const Container = styled(Box)`
    display: flex; 
    flex-direction: column;
    align-items: center;
`
const ChipContainer = styled(Box)`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1em;
    margin-top: 1em;
`
const StyledChip = styled(Chip)`
    padding: 1.5em;
    font-size: 1rem;
    font-weight: bold;
`
const UnderLine = styled('span')`
    padding: .5em; 
    width: 50%;
    box-shadow: 0px 2px #D3D3D3;
`

type DisplaySearchesProps = {
    queryData: any[];
    onSubmit: (input: string) => void;
    setInput: React.Dispatch<React.SetStateAction<string>>;
}

function DisplaySearches({ 
  queryData, 
  onSubmit, 
  setInput 
}: DisplaySearchesProps) {
  
    const [currentQueryData, setCurrentQueryData] = useState<any[]>([]);
  
    const fetchSearchQuery = () => {
      getSearchQuery()
        .then((data) => {
          setCurrentQueryData(data); 
        })
        .catch((err) => {
          console.error('Error fetching data:', err);
        });
    };
  
    const remove = (id: number) => {
      deleteSearchQuery(id)
        .then(() => {
          fetchSearchQuery();
        })
        .catch((err) => {
          console.error('Error deleting search query:', err);
        });
    };
  
    const search = async (input: string) => {
      setInput(input);
      if(input.length > 0){
        onSubmit(input)
      }
    };

    const getSearchQueryData = () => {
        if (queryData.length > 0) {
            setCurrentQueryData(queryData);
          } else {
            fetchSearchQuery();
          }
    }
  
    useEffect(() => {
       getSearchQueryData()
      }, [queryData]);


  return (
    <Container>
        <Typography variant='h5'>Existing Searches</Typography>
        <UnderLine />
        <ChipContainer>
            {currentQueryData.length > 0 ? 
            <>
                {currentQueryData.map((data: any) => (
                    <Box key={data.searchQuery}> 
                        <StyledChip
                            label={data.searchQuery}
                            onClick={() => search(data.searchQuery)}
                            onDelete={() => remove(data.id)}
                            color="primary"
                        />
                    </Box>
                ))}
            </> 
                : null}
        </ChipContainer>
    </Container>
  )
}

export default DisplaySearches