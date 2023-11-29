import { AppBar, Tab, Tabs, Typography } from '@mui/material'
import './App.css'

import { useState } from 'react';
import AnswersReport from './components/AnswersReport';
import QuestionList from './components/QuestionList';

function App() {

  const [value, setValue] = useState('Questions');

  const handleChange = (event, value) => {
    setValue(value);
  }


  return (
    <>
      <div>
        <AppBar>
          <Typography variant='h4' align='center'>
            <Tabs value={value} onChange={handleChange}>
              <Tab value='Questions' label='Questions' />
              <Tab value='Answers' label='Answers' />
            </Tabs>
          </Typography>
        </AppBar>
        {value === 'Questions' && <QuestionList />}
        {value === 'Answers' && <AnswersReport />}
      </div>
    </>
  )
}

export default App
