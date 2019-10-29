import React, {useState, useEffect} from 'react'
import {Link, Route, Switch } from 'react-router-dom';
import Modal from '../Modal/Modal.jsx';
import styles from './List.module.css';
import BookmarkSvg from './BookmarkSvg.jsx';


const List = (props) => {
    const {inputValue} = props;
    const {films} = props;
    const {setShowTenItems} = props;
    const {showTenItems} = props;
    const {choosenTag} = props;

    const [activeBtn, setActiveBtn] = useState(true);
    const [showModal, setShowMaodal] = useState(false);

    const handleShowModal = () => {
        setShowMaodal(true);
    }

    useEffect( ()=> {
        const choosenElem = document.querySelectorAll('.choosenTag');
        [...choosenElem].forEach( elem => { 
            if(elem.innerText.toLowerCase() === choosenTag.choosen){
                elem.classList.add('choosenTagActive');
            }
            else {
                elem.classList.remove('choosenTagActive');
            }
        });
    }, [choosenTag.choosen, showTenItems]);

    const handleIncrease = ()=>{
        if(showTenItems <= films.length + 1){
            setShowTenItems(prev => prev + 10);
        }
    }
    
    const compare = term => {
        return function(films){
            return films.tags.map( o => o.toLowerCase()).includes(term.toLowerCase()) || films.title.toLowerCase().includes(term.toLowerCase()) || !term 
        }
    };

    return (
        <div className={styles.listWrapper}>
            {
                films.filter(compare(inputValue.value)).slice(0, showTenItems).map( o => 
                    <Link key={films.indexOf(o)} to={`movies/${films.indexOf(o) + 1}`} className={styles.fimlWrapper} onClick={handleShowModal}>
                        <p className={styles.filmName}>{o.title}</p>
                        <div className={styles.filmTagsWrapper}>
                            {
                                o.tags.map( items => 
                                    <span key={items} className={`${styles.filmTags} choosenTag`}>{items}</span>
                                )
                            }
                        </div>
                        <BookmarkSvg title = {o.title} showModal={showModal}/>
                    </Link>)
            }
            <div className={styles.bownBtnWrapper}>
                <p  onClick={handleIncrease} 
                    className={activeBtn ? styles.bownBtnActive : styles.bownBtnDisable} >
                        Показать еще
                </p>
            </div>
            <Switch>
                <Route path='/movies/:id' render={ ({match}) => <Modal match={match}  setShowMaodal={setShowMaodal} films={films}/> } />
            </Switch>
        </div>
    )
}

export default List
