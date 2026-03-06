import React, { useState, useEffect } from 'react';
import TourList from "../../Components/ToursList/ToursList";
import styles from "./ToursPage.module.scss";
import { ReactComponent as Filter } from "../../img/filter.svg";
import DatePicker from '../../Components/DatePicker/DatePicker';
import { NavLink } from "react-router-dom";
import { ReactComponent as Spinner } from "../../img/spinner.svg";
import Tour from '../../Components/Tour/Tour';
import { getStateFromLocalStorage, deleteStateFromLocalStorage } from '../../utils/localStorageHelper';

function ToursPage() {
  const seatrchTour = getStateFromLocalStorage("searchTours");

  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [selectorFromValue, setSelectorFromValue] = useState(seatrchTour ? seatrchTour.selectorFromValue : "Київ");
  const [selectorToValue, setSelectorToValue] = useState(seatrchTour ? seatrchTour.selectorToValue : "Одеса");
  const [listFromOpen, setlistFromOpen] = useState();
  const [listToOpen, setlistToOpen] = useState();
  const [duration, setDuration] = useState(seatrchTour ? seatrchTour.duration : 0);
  const [adults, setAdults] = useState(seatrchTour ? seatrchTour.adults : 0);
  const [children, setChildren] = useState(seatrchTour ? seatrchTour.children : 0);
  const [search, isSearch] = useState(seatrchTour ? true : false);
  const [date, setdate] = useState(seatrchTour ? new Date(seatrchTour.date) : "");
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const storedTours = getStateFromLocalStorage("tours") || [];
    setTours(storedTours);
  }, []);

  useEffect(() => {
    return () => {
      deleteStateFromLocalStorage("searchTours");
      isSearch(false);
    }
  }, [])

  return (
    <div className={styles.tourPageWrapper}>
      <div className={styles.tourPageTitleWrapper}>
        <h1 className={styles.tourPageTitle}>Тури</h1>
        <button className={styles.tourPageBtn} onClick={() => { setFilterIsOpen(val => !val) }}><Filter className={styles.tourPageBtnImg} /></button>
      </div>
      {filterIsOpen ?
        <div className={styles.formWrapper}>
          <form className={styles.form} action="">
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
            <div className={styles.infoTitle}>
              Дата відправлення
              <DatePicker setdate={setdate} />
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
            <button className={styles.formBtn} onClick={() => isSearch(true)} type='button'>Знайти</button>
          </form ></div>

        : null}
      {search ?
        <>
          <div className={styles.tourPageTitleWrapper}>
            <h1 className={styles.tourPageTitle}>Знайдені тури</h1>
          </div>
          <div className={styles.tourList}>
            {tours.filter((el) => el.city === selectorToValue && el.from === selectorFromValue && el.duration === duration && el.adult === adults && el.children === children && el.startDate === `${date.getDate()}.0${date.getMonth() + 1}.${date.getFullYear()}`).map((el) => <Tour el={el} key={el.id} />)}
          </div>
        </>
        : <div>
          <TourList />
          <div className={styles.tourPageTitleWrapper}>
            <h1 className={styles.tourPageTitle}>Гарячі тури</h1>
          </div>
          <TourList type="hot" />
        </div>
      }

      <section className={styles.footer}>
        <NavLink to={"/"} className={styles.footerLogo}>
          <Spinner className={styles.footerLogoImg} />
          <h1 className={styles.footerLogoText}>TRAVEL TEAM</h1>
        </NavLink>
        <p className={styles.footerText}>All Rights Reserved. Design by Iryna Nadtochyi</p>
      </section>
    </div>);
}

export default ToursPage;
