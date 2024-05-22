import React from 'react';
import {CourseList} from './components/CourseList';
import {Banner} from './components/Banner';
import './App.css';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import {fetchSchedule} from './utils/fetchSchedule';




const Main = () =>  {
  const {data , isLoading, error } = useQuery({
    queryKey: ['schedule'],
    queryFn: fetchSchedule
  });
  
  
  if (error) return <h1>{error}</h1>;
  if (isLoading) return <h1>Loading the schedule...</h1>
  console.log("Datalog", data.courses)

  return (
    <div className="container">
      <Banner title={ data.title } />
      <CourseList courses={ data.courses } />
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