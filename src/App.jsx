import React from 'react';

// Components
import {CourseList} from './components/CourseList';
import {Banner} from './components/Banner';

// Utils
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import {fetchSchedule} from './utils/fetchSchedule';
import { useData } from './utils/firebase.js';
import { addScheduleTimes } from './utils/times';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {EditForm} from './EditForm';

// Styles
import './App.css';



const Main = () =>  {

  const [data, isLoading, error] = useData("/schedule", addScheduleTimes);
   console.log("Datalog", data)
  
  // console.log("loading", error)
  if (error) return <h1>{error}</h1>;
  if (isLoading) return <h1>Loading the schedule...</h1>
  console.log("Datalog", data)
  

  return (
    <div className="container">
      <Banner title={ data.title } />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CourseList courses={ data.courses } />} />
          <Route path="/edit" element={ <EditForm /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

const queryClient = new QueryClient();


const App = () => (
  <QueryClientProvider client={queryClient}>
    <Main />
  </QueryClientProvider>
);

export default App;