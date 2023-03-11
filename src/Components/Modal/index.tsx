
import { EachVoteCast } from '../../provider'

const Modal = (props: { displayModal: boolean, noOfVotes: string, setDisplay: (modalState: boolean) => void, eachVote: EachVoteCast[] }) => {
  
    function closeModal (e: { stopPropagation: () => void }) {
      e.stopPropagation()
      props.setDisplay(false)
    }
  
    const ModalCard = () => {
			return (
				<div className="modal">
					<div className="modal-content" onClick={ e => e.stopPropagation() }>
							<span className="close" onClick={ closeModal }>&times;</span>
							<div className="modal-flex">
								<h2 className="modal-title">Success Modal</h2>
                { props?.noOfVotes.length > 0 && <h4 className="modal-title">{ props?.noOfVotes} </h4> }
                {
                  props?.eachVote.length && props?.eachVote?.map((vote, index) => vote?.title.length !> 2 && (
                    <div className='vote-list' key={ index }>
                      <h4 className='vote-list-title'>{vote?.title}</h4>
                      <h4 className=''>In</h4> 
                      <h4 className='vote-list-category'> {vote?.category.toUpperCase() }</h4>
                    </div>
                  ))
                }
							</div>
					</div>
				</div>
			)
        
    }
  
    return ( 
        <div>
           { props.displayModal && <ModalCard /> }
        </div>
    );
}


export default Modal;



