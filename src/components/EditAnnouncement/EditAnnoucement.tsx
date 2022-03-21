import React, { useState } from 'react';
import { Modal } from '../Modal/Modal';
import './EditAnnoucement.scss';

type Props = {
  announcement: Announcement,
  announcements: Announcement[],
  setAnnouncements: (announcement: Announcement[]) => void,
};

export const EditAnnoucement: React.FC<Props> = ({
  announcement,
  announcements,
  setAnnouncements,
}) => {
  const [editingAnnouncement, setEditingAnnouncement] = useState(announcement);
  const [modalEditForm, setModalEditForm] = useState(false);

  const changeHandler = (event:
  (React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>)) => {
    setEditingAnnouncement({
      ...editingAnnouncement,
      [event.target.name]: event.target.value,
    });
  };

  const editAnnouncement = () => {
    const index = announcements
      .find((anncement: Announcement) => anncement.id === editingAnnouncement.id);

    if (index) {
      announcements.splice(announcements
        .findIndex((anncement: Announcement) => anncement.id === editingAnnouncement.id),
      1, editingAnnouncement);

      setAnnouncements(
        [...announcements],
      );
    }

    setModalEditForm(false);
  };

  return (
    <>
      <button
        type="button"
        className="button-edit-announcement"
        onClick={() => setModalEditForm(true)}
      >
        Edit
      </button>
      <Modal modalActive={modalEditForm} setModalActive={setModalEditForm}>
        <form className="edit-announcement-form">
          <span className="edit-announcement-form__input-title">Announcement title: </span>
          <input
            value={editingAnnouncement.title}
            name="title"
            className="edit-announcement-form__input"
            type="text"
            placeholder=""
            autoComplete="off"
            onChange={changeHandler}
          />
          <span className="edit-announcement-form__input-title">Description: </span>
          <textarea
            value={editingAnnouncement.description}
            name="description"
            className="edit-announcement-form__textarea"
            onChange={changeHandler}
          >
          </textarea>
          <button
            type="button"
            className="edit-announcement-form__button-edit"
            onClick={editAnnouncement}
          >
            Edit
          </button>
        </form>
      </Modal>
    </>
  );
};
