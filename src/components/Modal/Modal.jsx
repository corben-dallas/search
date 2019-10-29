import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from "react-router-dom";
import styles from './Modal.module.css';
import BackSvg from './BackSvg';


const Modal = ({match, setShowMaodal, films}) => {
    const {id} = match.params;
    const filmItem = films.filter( o => films.indexOf(o) === (id - 1));  // Находим фильм из JSON файла фильмов
    const filmName = filmItem[0].title; // Вытаскиваем его название
    let bntName;
    const getItemsFromStorage = JSON.parse( localStorage.getItem('savedFilms') ); // берем значения из LocalStor
    if(getItemsFromStorage !== null){
        const filter = getItemsFromStorage.map(o => o.title).includes(filmName); // Проверяем есть ли в LocalStor такой фильм
        if(filter){
            bntName = false;
        }else{
            bntName = true;
        }
    }
    if(getItemsFromStorage === null) {
        bntName = true;
    }

    const [d, setD] = useState(bntName);
        
    const handleClick = (evt) =>{
        const innerText = evt.currentTarget.innerText.toLowerCase();
        if(innerText === textInFuncButton.add.toLowerCase() ){
            if( getItemsFromStorage === null ) {
                localStorage.setItem('savedFilms', JSON.stringify(filmItem) );
            }
            if( getItemsFromStorage !== null ) {
                getItemsFromStorage.push(filmItem[0]);
                localStorage.setItem('savedFilms', JSON.stringify(getItemsFromStorage) );
            }
            setD(false);
            bntName = false;
        }
        if(innerText === textInFuncButton.remove.toLowerCase() ){
            const d = getItemsFromStorage.findIndex( o => o.title === filmName);
            getItemsFromStorage.splice(d, 1);
            localStorage.setItem('savedFilms', JSON.stringify(getItemsFromStorage) );
            setD(true);
            bntName = true;
        }
    }
    const textInFuncButton = {
        add: 'Добавить в закладки',
        remove: 'Удалить из закладок'
    }

    let history = useHistory();
    const handleBackClick = () => {
        setShowMaodal(false);
        history.push("/movies");
    }

    return (ReactDOM.createPortal(
        <React.Fragment>
        <div className={styles.modalWrapper}>
            <div className={styles.modalContent}>
                <div className={styles.modalBackBtnWrapper} >
                    <div className={styles.modalBackBtn} onClick={handleBackClick}>    
                        <BackSvg/>
                        <p>Назад</p>
                    </div>
                </div>
                <div className={styles.modalFilmInfo}>
                    <div className={styles.modalFilmImgBtn}>
                        <div className={styles.modalFilmImg}>
                            <p><span>Poster should be here</span></p>
                        </div>
                        <div className={ d ? styles.modalFilmBtn : styles.modalFilmBtnDisable}>
                            <p onClick={handleClick}>{bntName ? textInFuncButton.add : textInFuncButton.remove}</p>
                        </div>
                    </div>
                    <div className={styles.modalFilmName}>
                        <p>{filmName}</p>
                        <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum temporibus, odio laudantium, animi debitis rem vitae doloribus eligendi minima vel alias. Officiis suscipit mollitia, fuga, veniam illum deserunt quibusdam laboriosam aliquid, officia dolorem iusto atque vero placeat nam laborum ipsum minus! Vitae, similique reiciendis! Qui deleniti beatae ut eos rem.</span>
                    </div>
                </div>
            </div>
        </div>
        </React.Fragment>, document.body
        )    
    );
}

export default Modal
