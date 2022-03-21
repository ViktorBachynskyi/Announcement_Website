import React, { useState } from 'react';
import { Modal } from '../Modal/Modal';
import './AddAnnouncement.scss';

type Props = {
  announcements: Announcement[],
  setAnnouncements: (announcement: Announcement[]) => void,
};

export const AddAnnouncement: React.FC<Props> = ({ announcements, setAnnouncements }) => {
  const [newAnnouncement, setNewAnnouncement] = useState({
    id: 0,
    title: '',
    description: '',
    date: '',
  });
  const [modalAddForm, setModalAddForm] = useState(false);

  const clearInputs = () => {
    setNewAnnouncement({
      id: 0,
      title: '',
      description: '',
      date: '',
    });
  };

  const changeHandler = (event:
  (React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>)) => {
    setNewAnnouncement({
      ...newAnnouncement,
      id: Math.random(),
      date: new Date().toDateString(),
      [event.target.name]: event.target.value,
    });
  };

  const addNewAnnouncement = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    setAnnouncements([...announcements, newAnnouncement]);
    clearInputs();
    setModalAddForm(false);
  };

  return (
    <>
      <button
        type="button"
        className="button-add-announcement"
        onClick={() => setModalAddForm(true)}
      >
        Add new
      </button>
      <Modal modalActive={modalAddForm} setModalActive={setModalAddForm}>
        <form className="add-announcement-form" onSubmit={addNewAnnouncement}>
          <span className="add-announcement-form__input-title">Announcement title: </span>
          <input
            value={newAnnouncement.title}
            name="title"
            className="add-announcement-form__input"
            type="text"
            placeholder=""
            required
            autoComplete="off"
            onChange={changeHandler}
          />
          <span className="add-announcement-form__input-title">Description: </span>
          <textarea
            value={newAnnouncement.description}
            name="description"
            className="add-announcement-form__textarea"
            wrap="hard"
            onChange={changeHandler}
          >
          </textarea>
          <button
            type="submit"
            className="add-announcement-form__button-add"
          >
            Add
          </button>
        </form>
      </Modal>
    </>
  );
};
