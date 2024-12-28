import React, { useState } from 'react'
import { Box, styled, Typography } from '@mui/material'
import Search from './components/Search'
import DisplayData from './components/DisplayData'
import useGetData from './hooks/useGetData'

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 1em;
    margin: 2em auto;
    max-width: 100%;
    width: 80rem;
`

function App() {
  const [input, setInput] = useState<string>("")
  const {onSubmit, foodData, error, loading } = useGetData({searchInput: input})

  return (
    <Container>
      <Typography variant='h4'>Food App</Typography>
      <Search onSubmit={onSubmit} setInput={setInput} input={input}/>
      <DisplayData foodData={foodData} loading={loading} error={error}/>
    </Container>
  )
}

export default App