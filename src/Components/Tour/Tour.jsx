import React, { useState } from 'react';
import styles from "./Tour.module.scss";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { saveStateToLocalStorage, deleteStateFromLocalStorage } from "../../utils/localStorageHelper";

function Tour({ el }) {
    const [mouseEnter, setMouseEnter] = useState(false);
    
    return (
        <div className={styles.tour}>
            <div className={styles.tourImgWrapper} onMouseEnter={() => setMouseEnter(true)} onMouseLeave={() => setMouseEnter(false)}>
                <img className={styles.tourImg} src={el.img} alt="" />
                {mouseEnter ?
                    <div className={styles.tourLinkWrapper}>
                        <NavLink className={styles.tourLink} to="/tour" onClick={() => {
                            deleteStateFromLocalStorage("tour")
                            saveStateToLocalStorage("tour", el);
                        }}>Подробніше</NavLink>
                    </div>
                    : null}
            </div>
            <NavLink className={styles.tourInfo} to="/tour" onClick={() => {
                deleteStateFromLocalStorage("tour")
                saveStateToLocalStorage("tour", el);
            }}>
                <p className={styles.tourInfoTitle}>{`${el.country}, ${el.city}`}</p>
                <p className={styles.tourInfoPrice}>{`$${el.price}`}</p>
            </NavLink>
        </div>
    );
}
Tour.propTypes = {
    el: PropTypes.object.isRequired,
};
export default Tour;