import React, { useEffect, useState } from 'react';
import { EditAnnoucement } from '../EditAnnouncement/EditAnnoucement';
import { Modal } from '../Modal/Modal';
import './Announcement.scss';

type Props = {
  announcement: Announcement,
  announcements: Announcement[],
  setAnnouncements: (announcement: Announcement[]) => void,
};

export const Announcement: React.FC<Props> = ({
  announcement,
  announcements,
  setAnnouncements,
}) => {
  const [showContent, setShowContent] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [similarAnnouncement, setSimilarAnnouncement] = useState<Announcement[]>([]);

  const contentToggle = () => {
    setShowContent(!showContent);
  };

  const removeAnnouncement = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    setAnnouncements(announcements.filter(el => el.id !== id));
  };

  useEffect(() => {
    const titleArray = announcement.title.split(' ');
    const result = [];

    for (let i = 0; i < announcements.length; i += 1) {
      for (let j = 0; j < titleArray.length; j += 1) {
        if (announcements[i].id !== announcement.id) {
          if (announcements[i].title.toLowerCase().includes(titleArray[j].toLowerCase())
          && result.length < 3) {
            result.push(announcements[i]);
          }
        }
      }
    }

    setSimilarAnnouncement(result);
    // eslint-disable-next-line no-console
    console.log(result);
  }, []);

  return (
    <div className="announcement">
      <h2 className="announcement__title">{announcement.title}</h2>
      {showContent && (
        <div className="announcement__content">
          <p className="announcement__description">{announcement.description}</p>
          <div className="announcement__date-n-buttons">
            <p className="announcement__date">{announcement.date}</p>
            <div className="announcement__buttons-container">
              <EditAnnoucement
                announcement={announcement}
                announcements={announcements}
                setAnnouncements={setAnnouncements}
              />
              <button
                type="button"
                className="button-delete-announcement"
                onClick={() => setModalDelete(true)}
              >
                Delete
              </button>
            </div>
          </div>
          {similarAnnouncement.length > 0 && (
            <div className="announcement__similar-announcements">
              <p className="announcement__similar-title">Similar announcements:</p>
              <ul className="annoncement__similar-list">
                {similarAnnouncement.map(similar => (
                  <li key={similar.id} className="annoncement__similar-li">
                    <a
                      href={`#${similar.title}`}
                      className="announcement__similar-link"
                    >
                      {similar.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <Modal modalActive={modalDelete} setModalActive={setModalDelete}>
            <div className="delete-announcement">
              <span className="delete-announcement__title">You sure you want to delete this product?</span>
              <div className="delete-announcement__buttons-container">
                <button
                  type="button"
                  className="delete-announcement__button-delete"
                  onClick={(event) => removeAnnouncement(event, announcement.id)}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="delete-announcement__button-cancel"
                  onClick={() => setModalDelete(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Modal>
        </div>
      )}
      <button
        type="button"
        className={!showContent ? 'announcement__content-button' : 'announcement__content-button expand'}
        onClick={contentToggle}
      >
      </button>
    </div>
  );
};
