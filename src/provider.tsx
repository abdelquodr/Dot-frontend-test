import { useState, createContext } from 'react'

export interface EachVoteCast{
    count: number,
    title: string,
    category: string
  }
  
  export type VoteContextType = {
    totalVotes: number,
    eachVoteCast: EachVoteCast[],
    saveVoteCast: (todo: EachVoteCast) => void;
    updateVoteCast: (id: string) => void;
  };
  
  
 export const VoteCastContext = createContext<VoteContextType | null>(null);
  
export const VoteProvider = () => {
    const [totalVotes, setTotalVotes] = useState(0);
    const [eachVoteCast, setEachVoteCast] = useState<EachVoteCast[]>([
      {
        count: 0,
        title: '',
        category: ''
      }
    ]);
  
  
    const saveVoteCast = (vote: EachVoteCast) => {
      // eslint-disable-next-line array-callback-return
      eachVoteCast.map((eachvote, i): void => {
        switch (eachvote.title) {
          case vote.title:
            eachVoteCast[i] = {...eachvote, count: eachvote.count + vote?.count}
            setEachVoteCast([...eachVoteCast])
            break;
          case "":
            const newVote = {
              count: vote.count,
              title: vote.title,
              category: vote.category
            }
        
            setEachVoteCast([...eachVoteCast,  newVote])
            break;
        }
      });

      setTotalVotes(totalVotes + vote?.count)
    } 

   // eslint-disable-next-line array-callback-return
    const updateVoteCast = (): string => {
      if(totalVotes <= 0){
        return "You have not voted yet"
      }else if(totalVotes < 7){
         return `You still have ${7 - totalVotes} votes to cast`
      }
      return ''
    }

    return {
      totalVotes,
      eachVoteCast,
      saveVoteCast,
      updateVoteCast,
    }
   
}


  export default VoteProvider   