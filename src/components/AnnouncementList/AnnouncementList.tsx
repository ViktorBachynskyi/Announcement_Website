import React from 'react';
import { Announcement } from '../Announcement/Announcement';
import './AnnouncementList.scss';

type Props = {
  announcements: Announcement[];
  setAnnouncements: (announcement: Announcement[]) => void,
};

export const AnnouncementList: React.FC<Props> = ({ announcements, setAnnouncements }) => {
  return (
    <ul className="announcement__list">
      {announcements.map(announcement => (
        <li
          key={announcement.id}
          id={announcement.title}
        >
          <Announcement
            announcement={announcement}
            announcements={announcements}
            setAnnouncements={setAnnouncements}
          />
        </li>
      ))}
    </ul>
  );
};
