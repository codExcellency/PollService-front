import { AppBar, Tab, Tabs, ThemeProvider, Typography, createTheme } from '@mui/material'
import './App.css'

import { useState } from 'react';
import AnswersReport from './components/AnswersReport';
import QuestionList from './components/Questionlist';

function App() {

  const [value, setValue] = useState('Questions');

  const handleChange = (event, value) => {
    setValue(value);
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: '#0079C2',
      },
      secondary: {
        main: '#FFFFFF',
      },
    },
  })


  return (
    <>
      <div>
        <ThemeProvider theme={theme}>
          <AppBar>
            <Typography variant='h4' align='center'>
              <Tabs textColor='inherit' indicatorColor='secondary' value={value} onChange={handleChange}>
                <Tab value='Questions' label='Questions' />
                <Tab value='Answers' label='Answers' />
              </Tabs>
            </Typography>
          </AppBar>
        </ThemeProvider>
        {value === 'Questions' && <QuestionList />}
        {value === 'Answers' && <AnswersReport />}
      </div>
    </>
  )
}

export default App
