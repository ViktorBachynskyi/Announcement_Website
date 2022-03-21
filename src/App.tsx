/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { allAnnouncements } from './AllAnnouncements';
import './App.scss';
import { AddAnnouncement } from './components/AddAnnouncement/AddAnnouncement';
import { AnnouncementList } from './components/AnnouncementList/AnnouncementList';

export const App: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(allAnnouncements);
  const [query, setQuery] = useState('');

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const filterAnnouncements = (filteringAnnouncements: Announcement[]) => {
    const queryToLowerCase = query.toLowerCase();

    return filteringAnnouncements.filter(
      announcement => announcement.title.toLowerCase().includes(queryToLowerCase),
    );
  };

  return (
    <div className="App">
      <div className="title-container">
        <h1 className="title">Announcements</h1>
        <AddAnnouncement announcements={announcements} setAnnouncements={setAnnouncements} />
      </div>
      <input
        type="text"
        id="search-query"
        className="search-bar"
        placeholder="Type search word"
        value={query}
        onChange={inputHandler}
      />
      <AnnouncementList
        announcements={filterAnnouncements(announcements)}
        setAnnouncements={setAnnouncements}
      />
    </div>
  );
};
