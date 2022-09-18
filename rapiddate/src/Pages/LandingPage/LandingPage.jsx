import React from 'react';
import {Link} from 'react-router-dom';
import style from  './Landingpage.module.css';
import mainPicture from '../../assets/bakpic.png'

const LandingPage = () => {
  return (
    <div>
      <header>
        <nav className={style.nav}>
          <div className={style.logoContainer}>
            <p className={style.logo}>Rapyd Date</p>
            <img alt="" src="src/menu.png" className={style.menuBtn} id="menu-btn" />
          </div>
          <ul className={style.listItems}>
            <div className={style.btnContainer}>
              <li className={style.list}>
                <Link to="/authenticate">
                  <p className={`${style.btn} ${style.btnSecondary}`}>
                    Join Us
                  </p>
                </Link>
              </li>
            </div>
          </ul>
        </nav>
        <div className={style.container}>
          <div className={style.containerLeft}>
            <p className={style.textSmall}>Because you deserve better!</p>
            <h1 className={style.title}>
              Get noticed for <span className={style.titleS}>who</span> you are,
              <span className={style.titleS}>not what</span> you look like.
            </h1>
            <p className={style.text}>
              You’re more than just a photo. You have stories to tell, and passions to
              share, and things to talk about that are more interesting than the
              weather. Because you deserve what dating deserves: better.
            </p>
            <div className={style.statsContainer}>
              <div className={style.stats}>
                <h1 className={style.statsTitle}>15k+</h1>
                <p className={style.statsText}>Dates and matches made everyday</p>
              </div>
              <div className={style.stats}>
                <h1 className={`${style.statsTitle} ${style.statsTitleBrown}`}>1,456</h1>
                <p className={style.statsText}>New members signup every day</p>
              </div>
              <div className={style.stats}>
                <h1 className={style.statsTitle}>1M+</h1>
                <p className={style.statsText}>Members from around the world</p>
              </div>
            </div>
            <img alt="" src="src/wave-left.png" className={style.waveLeft} />
          </div>
          <div className={style.containerRight}>
            <img
              className={`${style.couplesImg} ${style.couplesImgDesktop}`}
              src={mainPicture}
              alt=""
            />
            <img
              className={`${style.couplesImg} ${style.couplesImgMobile}`}
              src="src/date.webp"
              alt=""
            />
            {/* <img src="src/details.png" class="details-img" />
    <img src="src/wave-right.png" class="wave-right" /> */}
          </div>
        </div>
      </header>

    </div>
  );
};

export default LandingPage;
