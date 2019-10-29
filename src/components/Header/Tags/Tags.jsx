import React,{ useState } from 'react'
import styles from '../Header.module.css';
import CloseSvg from '../CloseSvg';
import { useHistory } from 'react-router-dom';

const Tags = ( {o, inputValue, setInputValue, setShowTenItems, choosenTag, setChoosenTag} ) => {
    
    const [isActiveBar, setIsActiveBar] = useState(false);
    let history = useHistory();

    const handleSearchClick = (evt) => {
        const tag = evt.currentTarget.innerText.toLowerCase();
        setInputValue({...inputValue, value: tag});
        setShowTenItems(10);
        setIsActiveBar(true);
        setChoosenTag({...choosenTag, choosen: tag});
        history.push('/movies');
    };
    const handleCancelClick = () => {
        if( inputValue !== ''){
            setIsActiveBar(false);
            setInputValue({...inputValue, value: ''});
            setChoosenTag({...choosenTag, choosen: ''});
        }
    }

    return (
        <React.Fragment>
            <p  className={`${isActiveBar ? styles.serchFealdTagsActive : null} ${styles.serchFealdTags}` } >
                <span   className={styles.serchFealdTagsContent} 
                        onClick={handleSearchClick}>
                    {o}
                </span>
                <span   onClick={handleCancelClick}
                        className={`${isActiveBar ? styles.serchFealdTagsActiveSvg : null} ${styles.serchFealdTagsIcon}` }>
                    <CloseSvg />
                </span>
            </p>
        </React.Fragment>
    )
}

export default Tags
