import React from "react";
import SendIcon from '@mui/icons-material/Send';
import MoodIcon from '@mui/icons-material/Mood';
import style from '../../Pages/Messages/whatsapp.module.css'

const MessageForm = ({ handleSubmit, text, setText }) => {
  const buttonStyle = {
    border: 'none',
    background:'transparent'
  }
  return (
    <form action="" onSubmit={handleSubmit}>
      <div className={style.messageFooter}>
        <div className={style.footerInput}>
          <div className={style.footerInputContainer}>
              <MoodIcon className={style.footerIcon} />
              <input 
              type="text" 
              placeholder='Type a Message' 
              value={text}
              onChange={(e) => setText(e.target.value)} 
              />
          </div>
        </div>
        <button style={buttonStyle}>
          <SendIcon className={style.messageFooterIcon} />
        </button>
      </div>
    </form>
  );
};

export default MessageForm;
