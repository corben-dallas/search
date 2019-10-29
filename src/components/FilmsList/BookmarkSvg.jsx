import React, { useState , useEffect} from 'react'
import styles from './List.module.css';

const BookmarkSvg = ({title, showModal}) => {
  const [a, setA] = useState(false);
  
  useEffect(() => {
    const getItemsFromStorage = JSON.parse( localStorage.getItem('savedFilms') );
    if(getItemsFromStorage !== null){
      const filter = getItemsFromStorage.map(o => o.title).includes(title);
      if(filter){
        setA(true);
      }else{
        setA(false);
      }
    }
  }, [showModal])

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" className = {`${a ? styles.bookmarkActive : styles.bookmarkDisable} ${styles.bookmark}`}>
      <path d="M23,27l-8-7l-8,7V5c0-1.105,0.895-2,2-2h12c1.105,0,2,0.895,2,2V27z"/>
    </svg>
  )
}

export default BookmarkSvg



