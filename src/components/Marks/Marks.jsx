import React, { useState, useEffect } from 'react'
import styles from './Marks.module.css';
import RubbishBinSvg from './RubbishBinSvg';


const Marks = () => {
    const [showMarks, setShowMarks] = useState(false);
    const getItemsFromStorage = JSON.parse( localStorage.getItem('savedFilms') );
    const [addClass, setAddClass] = useState(0);

    useEffect(() => {
        const getItemsFromStorage = JSON.parse( localStorage.getItem('savedFilms') );
            if ( getItemsFromStorage === null || getItemsFromStorage.length === 0){
                setShowMarks(false);
            }
            else{
                setShowMarks(true);
            }    
    }, [addClass])

    const handleDelClick = (evt) => {
        const innerText = evt.currentTarget.previousSibling.innerText 
        const d = getItemsFromStorage.findIndex( o => o.title === innerText);
        getItemsFromStorage.splice(d, 1);
        localStorage.setItem('savedFilms', JSON.stringify(getItemsFromStorage) );
        setAddClass(prev => prev + 1);
    }
    return (
        <div className={styles.marksWrapper}>
            {
                showMarks ? (
                getItemsFromStorage.map( o => 
                    <p key={getItemsFromStorage.indexOf(o)} className={styles.filmTitiels}>
                        <span>{o.title}</span>
                        <span onClick={handleDelClick} className={styles.rabbishBinWrapper}> <RubbishBinSvg /> </span>
                    </p>
                )
                ) : 
                    <p>Пока здесь пусто...</p>
                
            }
        </div>
    )
}

export default Marks
