import React, { useState, useEffect } from 'react';
import Tour from '../Tour/Tour';
import styles from "./ToursList.module.scss";
import { getStateFromLocalStorage } from '../../utils/localStorageHelper';

function ToursList({ type }) {
    const [tours, setTours] = useState([]);

    useEffect(() => {
        const storedTours = getStateFromLocalStorage("tours") || [];
        setTours(storedTours);
    }, []);

    return (
        <div className={styles.tourList}>
            {type === "hot"
                ? tours.filter(t => t.hot).map(t => <Tour el={t} key={t.id} />)
                : tours.map(t => <Tour el={t} key={t.id} />)
            }
        </div>
    );
}
export default ToursList;