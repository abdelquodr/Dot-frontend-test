import './App.css';
import Ballot from './Components/Ballot/Ballot';
import api from '../src/Api/Api'
import { useState, useEffect } from 'react';
import { VoteCastContext, VoteProvider } from "./provider";
import Modal from './Components/Modal';


function App() {
  // state
  const [ballotData, setBallotData] = useState<any[]>([]);
  const [ displayModal, setDisplayModal] = useState(false);
  const [voteData, setVoteData] = useState('');

  // destruturing context state and actions 
  const { eachVoteCast, totalVotes, saveVoteCast, updateVoteCast } = VoteProvider();

  // effects
  useEffect(() => {
    // function definition of getting the ballot
    const getBallotDataFromApi = async() => {
      const data = await api.getBallotData();
      setBallotData(data?.items);
    }

    // function that runs on component mount
    getBallotDataFromApi();

  }, [])


  function setDisplay(modalState: boolean): void {
    setDisplayModal(modalState) 
  }

  // handler
  const handleClick = () => {
    const result = updateVoteCast()
    setVoteData(result)
    setDisplayModal(true)
  }

  return (
    <VoteCastContext.Provider value={{ eachVoteCast, totalVotes, saveVoteCast, updateVoteCast }} >
      <h2 className="header"> Golden Globe Award </h2>
        <div>
          {
            ballotData.map(category => (
              <Ballot key={category?.id} category={category} />
            ))
          }
          <div className='modal-button'>
            <button onClick={handleClick} className="modal-btn">Submit Vote Button </button>
          </div>
        </div>
        <Modal 
          displayModal={displayModal}
          setDisplay={setDisplay}
          eachVote={eachVoteCast}
          noOfVotes={voteData}
        />
    </VoteCastContext.Provider>

  );
}

export default App;
