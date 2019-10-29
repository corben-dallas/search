import React, {useState} from 'react'
import styles from './Header.module.css';
import {NavLink, Switch, Route, useHistory} from 'react-router-dom';
import List from '../FilmsList/List';
import Marks from '../Marks/Marks';
import SearchSvg from './SearchSvg';
import CloseSvg from './CloseSvg';
import Tags from './Tags/Tags';



const Header = ({films, tags}) => {
    
    const [inputValue, setInputValue] = useState({ value: '', });
    const [showTenItems, setShowTenItems] = useState(10);
    const [choosenTag, setChoosenTag] = useState( { choosen: ''} );
    let history = useHistory();
    
    const handleInputChange = (evt) => {
        const value = evt.target.value;
        setInputValue({...inputValue, value: value});
        setShowTenItems(10);
    };
    
    const handleInputFocus = () => {
        setInputValue({...inputValue, value: ''});
        history.push('/films');
    }
    return (
        <React.Fragment>
            <div className={styles.wrapper}>
                <div className={styles.searchFealdWrapper}>
                    <div className={styles.searchFeald}>
                        <div className={styles.searchFealdIcon}>
                            <SearchSvg/>
                        </div>
                        <input  type="text" 
                                value={inputValue.value}
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                                name='search'
                                className={styles.searchFealdInput}
                                placeholder='Поиск'/>
                        <div className={styles.searchFealdIcon}>
                            <CloseSvg />
                        </div>
                    </div>
                </div>
                <div className={styles.serchFealdTagsWrapper}>
                    {   
                        tags.map( o => {
                            return (
                                <Tags   o={o}
                                        inputValue={inputValue}
                                        setInputValue={setInputValue}
                                        setShowTenItems={setShowTenItems}
                                        setChoosenTag={setChoosenTag}
                                        choosenTag={choosenTag}
                                        key={tags.indexOf(o)}
                                />
                            )
                        })
                    }
                </div>
                <div className={styles.navBtn}>
                    <NavLink to='/films' activeClassName={styles.activeBtn}>Фильмы</NavLink>
                    <NavLink to='/marks' activeClassName={styles.activeBtn}>Закладки</NavLink> 
                </div>
            </div>
            <Switch>
                <Route path='/films'> 
                    <List inputValue={inputValue} films={films} showTenItems={showTenItems} setShowTenItems={setShowTenItems} choosenTag={choosenTag}/> 
                </Route>
                <Route path='/marks'>
                    <Marks/>
                </Route>
            </Switch>
        </React.Fragment>
    )
}

export default Header
