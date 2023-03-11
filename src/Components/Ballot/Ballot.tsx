import Card from '../Card';


export interface Item {
  id: string; 
  title: string, 
  photoUrL: string,
  category: string,
}
interface Category {
  title: string;
  items: Item[];
}

const Ballot = ({ category }: { category: Category } ) => {

  return (
    <div className='ballot'>
      <h1 className="category-heading">{category?.title}</h1>
      <div className="card-container">
        {
          category?.items?.map((item: Item) => ( 
            <Card key={item?.id} item={{...item, category: category?.title}} />    
          ))
        }
      </div>
    </div>
  )
}

export default Ballot;