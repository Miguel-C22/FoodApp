import React from 'react'
import { 
    Box, 
    Button, 
    styled, 
    TextField 
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

const Container = styled(Box)`
    display: flex;
    flex-wrap: warp;
    gap: 1em;
`

type SearchProps = {
    onSubmit: () => void;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    input: string
}

function Search({
    onSubmit, 
    setInput, 
    input
}: SearchProps) {   

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(input.length > 0){
            if (e.key === "Enter") {
                onSubmit(); 
            }
        }
    };

  return (
    <Container>
        <TextField 
            fullWidth 
            id="standard-basic" 
            onKeyDown={handleKeyDown} 
            label="Search Food" 
            variant="standard" 
            onChange={(e) => {setInput(e.target.value)}} 
        />
        <Button 
            variant="contained" 
            onClick={onSubmit}
            disabled={!input.trim()}
        >
            <SearchIcon/>
        </Button>
    </Container>
  )
}

export default Search