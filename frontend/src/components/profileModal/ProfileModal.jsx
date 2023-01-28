import React from 'react';
import { Modal, useMantineTheme } from '@mantine/core';
import './profileModal.css';
function ProfileModal({ modalOpened, setModalOpened }) {
  const theme = useMantineTheme();
  return (
    <Modal
      overlayColor={
        theme.colorScheme === 'dark'
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size='55%'
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      {/* Modal content */}
      <form className='infoForm'>
        <h3>Your Info</h3>
        <div>
          <input
            type='text'
            name='firstname'
            placeholder='First Name'
            className='infoInput'
          />
          <input
            type='text'
            name='lastname'
            placeholder='Last Name'
            className='infoInput'
          />
        </div>
        <div>
          <input
            type='text'
            name='worksAt'
            placeholder='Works at'
            className='infoInput'
          />
        </div>
        <div>
          <input
            type='text'
            name='livesIn'
            placeholder='Lives In'
            className='infoInput'
          />
          <input
            type='text'
            name='country'
            placeholder='Country'
            className='infoInput'
          />
        </div>
        <div>
          <input
            type='text'
            name='relationsip'
            placeholder='Relationship status'
            className='infoInput'
          />
        </div>
        <div>
          Profile Image
          <input type='file' name='profileImg' />
          Cover Image
          <input type='file' name='coverImg' />
        </div>
        <button className='button up-btn'>Update</button>
      </form>
    </Modal>
  );
}
export default ProfileModal;
