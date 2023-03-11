import React, { useContext, useState } from 'react';
import { Item } from '../Ballot/Ballot'
import { VoteContextType, VoteCastContext } from '../../provider';
import Toast from '../Toast';


const Card = ({item} : { item: Item} ) => {

  // state
  const [ selectedItem, setSelectedItem ] = useState(false);
  const [ showToast, setShowToast ] = useState(false);
  const [ toastMessage, setToastMessage ] = useState('');
  const [ toastType, setToastType ] = useState('');

  
  // context
  const { saveVoteCast, eachVoteCast } = useContext(VoteCastContext)  as VoteContextType
  
  // handlers
  const handleClick = (item: Item) => {
    // check if already selected for this category
    // eslint-disable-next-line array-callback-return
    eachVoteCast?.forEach(cast => {
      switch (cast.category) {
        case item.category:
          setShowToast(true)
          setSelectedItem(false)
          setToastType('red')
          setToastMessage("You have already voted for this category")
          break;
        default:   
          // if not selected, select it
          const newItem = {
            id: item.id,
            count: 1,
            title: item?.title,
            category: item?.category
          } 
          setSelectedItem(true)
          setToastType('green')
          setShowToast(true)
          setToastMessage("You have successfully selected for this category")
          saveVoteCast(newItem)
      }
    })  
  }
       
  return (
    <div  style={{ backgroundColor: selectedItem ? '#d5e8d4': '#dae8fc' }}  className='card'>
      <h4 className='card-title'>{item?.title}</h4>
      <div className="card-container-img">
        <img className="card-img" src={item?.photoUrL}  alt="nominee-img" />
      </div>  
      <button className="card-btn" onClick={ () =>handleClick(item) }>Select Button</button>

      {
        showToast && <Toast 
          toastList={[
            {
              id: Math.floor((Math.random() * 100) + 1),
              title: 'Notification',
              description: toastMessage,
              backgroundColor: toastType
            }
          ]}
          position="top-right"
          autoDelete={true}
          autoDeleteTime={3000}
        /> 
      }
    </div>  
  )
} 

export default Card;