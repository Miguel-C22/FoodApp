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
    onSubmit: (input: string) => void;
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
                onSubmit(input); 
            }
        }
    };

  return (
    <Container>
        <TextField 
            data-testid="input-food-field"
            fullWidth 
            id="standard-basic" 
            onKeyDown={handleKeyDown} 
            label="Search Food" 
            variant="standard" 
            onChange={(e) => {setInput(e.target.value)}} 
            value={input ? input : ""}
        />
        <Button 
            variant="contained" 
            onClick={() => {onSubmit(input)}}
            disabled={!input.trim()}
        >
            <SearchIcon/>
        </Button>
    </Container>
  )
}

export default Search