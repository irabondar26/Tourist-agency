import { useState } from 'react';
import styles from "./MainPage.module.scss";
import { NavLink } from "react-router-dom";
import ToursList from '../../Components/ToursList/ToursList';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactComponent as Spinner } from "../../img/spinner.svg";
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { getStateFromLocalStorage, saveStateToLocalStorage } from '../../utils/localStorageHelper';

function MainPage() {

  const testimonials = getStateFromLocalStorage("testimonials");

  const [selectorFromValue, setSelectorFromValue] = useState("Київ");
  const [selectorToValue, setSelectorToValue] = useState("Одеса");
  const [listFromOpen, setlistFromOpen] = useState();
  const [listToOpen, setlistToOpen] = useState();
  const [duration, setDuration] = useState(0);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [selectedDate, setSelectedDate] = useState();

  const dateChange = (date) => {
    setSelectedDate(date);
  }

  return (
    <div className={styles.mainPage}>
      <img className={styles.mainImg} src="https://img.tsn.ua/cached/292/tsn-8c5f6b23d1211bb14030cc3abd4583f7/thumbs/x/bf/74/1d750cdae19c5075e0123ec455ee74bf.jpeg" alt="" />
      <section className={styles.mainSection}>
        <div className={styles.mainInfo}>
          <h1 className={styles.mainInfoTite}>Подорожуй Україною!</h1>
          <p className={styles.mainInfoText}>Наша туристична агенція готова запропонувати вам захоплюючу відпустку, яка буде створена відповідно до ваших потреб і побажань.</p>
          <NavLink to={"/contacts"} className={styles.mainInfoBtn}>подробніше</NavLink>
        </div>
        <form className={styles.form} action="">
          <h2 className={styles.formTitle}>Знайди свій тур</h2>
          <div className={styles.formCities}>
            Із
            <button type='button' className={styles.formSelectBtn} onClick={() =>
              setlistFromOpen((val) => !val)}>
              {selectorFromValue}
            </button>
            {listFromOpen ?
              <ul className={styles.formList}>
                <li className={styles.formListElement} onClick={() => {
                  setSelectorFromValue("Київ");
                  setlistFromOpen(false)
                }}>Київ</li>
                <li className={styles.formListElement} onClick={() => {
                  setSelectorFromValue("Харків");
                  setlistFromOpen(false)
                }}>Харків</li>
                <li className={styles.formListElement} onClick={() => {
                  setSelectorFromValue("Одеса");
                  setlistFromOpen(false)
                }}>Одеса</li>
                <li className={styles.formListElement} onClick={() => {
                  setSelectorFromValue("Дніпро");
                  setlistFromOpen(false)
                }}>Дніпро</li>
              </ul>
              : null}
          </div>

          <div className={styles.formCities}>
            До
            <button type='button' className={styles.formSelectBtn} onClick={() => setlistToOpen((val) => !val)}>
              {selectorToValue}
            </button>
            {listToOpen ?
              <ul className={styles.formList}>
                <li className={styles.formListElement} onClick={() => {
                  setSelectorToValue("Одеса");
                  setlistToOpen(false)
                }}>Одеса</li>
                <li className={styles.formListElement} onClick={() => {
                  setSelectorToValue("Іфвано-Франківськ");
                  setlistToOpen(false)
                }}>Іфвано-Франківськ</li>
                <li className={styles.formListElement} onClick={() => {
                  setSelectorToValue("Яремче");
                  setlistToOpen(false)
                }}>Яремче</li>
                <li className={styles.formListElement} onClick={() => {
                  setSelectorToValue("Буковель");
                  setlistToOpen(false)
                }}>Буковель</li>
              </ul>
              : null}
          </div>
          <div className={styles.anotherInfo}>
            <div className={styles.infoTitle}>
              Дата відправлення
              <ReactDatePicker
                className={styles.infoDateBtn}
                selected={selectedDate}
                onChange={dateChange}
                dateFormat="dd.MM.YYYY"
                placeholderText='Дата'
                closeOnScroll={(e) => e.target === document} />
            </div>
            <div className={styles.infoTitle}>
              Кількість днів
              <div className={styles.infoCounter}>
                <button className={styles.infoCounterBtn} type='button' onClick={() => {
                  setDuration(val => {
                    if (val >= 1) {
                      return val - 1;
                    } else {
                      return val;
                    }
                  })
                }}>-</button>
                {duration}
                <button className={styles.infoCounterBtn} type='button'
                  onClick={() => {
                    setDuration(val => {
                      if (val <= 13) {
                        return val + 1;
                      } else {
                        return val;
                      }
                    })
                  }}>+</button>
              </div>
            </div>
            <div className={styles.infoTitle}>
              Дорослих
              <div className={styles.infoCounter}>
                <button className={styles.infoCounterBtn} type='button'
                  onClick={() => {
                    setAdults(val => {
                      if (val >= 1) {
                        return val - 1;
                      } else {
                        return val;
                      }
                    })
                  }}>-</button>
                {adults}
                <button className={styles.infoCounterBtn} type='button'
                  onClick={() => {
                    setAdults(val => {
                      if (val <= 13) {
                        return val + 1;
                      } else {
                        return val;
                      }
                    })
                  }}>+</button>
              </div>
            </div>
            <div className={styles.infoTitle}>
              Дітей
              <div className={styles.infoCounter}>
                <button className={styles.infoCounterBtn} type='button'
                  onClick={() => {
                    setChildren(val => {
                      if (val >= 1) {
                        return val - 1;
                      } else {
                        return val;
                      }
                    })
                  }}>-</button>
                {children}
                <button className={styles.infoCounterBtn} type='button'
                  onClick={() => {
                    setChildren(val => {
                      if (val <= 4) {
                        return val + 1;
                      } else {
                        return val;
                      }
                    })
                  }}>+</button>
              </div>
            </div>
          </div>
          {<NavLink
            to="tours"
            className={styles.formBtn}
            onClick={() => saveStateToLocalStorage("searchTours", {
              selectorFromValue,
              selectorToValue,
              duration,
              adults,
              children,
              date: selectedDate
            })}
          >
            Знайти тур
          </NavLink>}
        </form >
      </section>
      <section className={styles.tours}>
        <h2 className={styles.toursTitle}>гарячі тури</h2>
        <div className={styles.toursTitleAddition}>
          <NavLink to="tours" className={styles.toursTitleAdditionBtn} >переглянути всі тури</NavLink>
        </div>
        <ToursList type="hot" />
      </section>
      <section className={styles.testimonials}>
        <h2 className={styles.testimonialsTitle}>Відгуки</h2>
        <Carousel data-bs-theme="dark" className={styles.testimonialsSlider}>
          {testimonials?.map((el) => <Carousel.Item key={el.id} className={styles.sliderItem}>
            <img className={styles.sliderItemImg} src={el.img} alt="" />
            <h3 className={styles.sliderItemTitle}>{el.name}</h3>
            <p className={styles.sliderItemText}>{el.text}</p>
          </Carousel.Item>)}
        </Carousel>
      </section>
      <section className={styles.footer}>
        <NavLink to={"/"} className={styles.footerLogo}>
          <Spinner className={styles.footerLogoImg} />
          <h1 className={styles.footerLogoText}>TRAVEL TEAM</h1>
        </NavLink>
        <p className={styles.footerText}>All Rights Reserved. Design by Iryna Nadtochyi</p>
      </section>
    </div>
  );
}

export default MainPage;