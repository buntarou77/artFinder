import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/header/Header';
import Spinner from './components/spinner/Spinner';
import Welcome from "./components/welcome/Welcome";
import SingleCardPage from "./components/singleCardPage/SingleCardPage";
import SerchPage from './components/SerchPage/SerchPage'
import EntitySearch from "./components/entitySearch/EntitySearch";
import SingleEntityPage from "./components/SingleEntityPage/SingleEntityPage";
import Contacts from "./components/Contacts/Contacts";
function App() {
  return (
    <Router>
      <Header />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/card/:databaseId/:elementId' element={<SingleCardPage/>}/>
          <Route path= '/serch' element = {<SerchPage/>}/>
          <Route path="/EntitySearch" element={<EntitySearch/>}/>
          <Route path={`/Entity/:datatype/:EntityId`} element={<SingleEntityPage/>}/>
          <Route path={`/Contact`} element={<Contacts/>}/>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
