import { useState, useEffect } from 'react';


type ToastList = {
    id: number,
    title: string,
    description: string,
    backgroundColor: string
}


type PropTypes = {
    toastList: ToastList[],
    position: string,
    autoDelete: boolean,
    autoDeleteTime: number
}

const Toast = (props: PropTypes) => {
    // destructure props
    const { toastList, position, autoDelete, autoDeleteTime } = props;

    // state
    const [list, setList] = useState(toastList);

    // effect
    useEffect(() => {
        setList([...toastList]);
    }, [toastList]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (autoDelete && toastList.length && list.length) {
                deleteToast(toastList[0].id);
            }
        }, autoDeleteTime);
        
        return () => {
            clearInterval(interval);
        }

        // eslint-disable-next-line
    }, [toastList, autoDelete, autoDeleteTime, list]);


    // handlers
    const deleteToast = (id: number) => {
        const listItemIndex = list.findIndex(e => e.id === id);
        const toastListItem = toastList.findIndex(e => e.id === id);
        list.splice(listItemIndex, 1);
        toastList.splice(toastListItem, 1);
        setList([...list]);
    }


    return (
        <>
            <div className={`notification-container ${position}`}>
                {
                    list.map((toast, i) =>     
                        <div 
                            key={i}
                            className={`notification toast ${position}`}
                            style={{ backgroundColor: toast.backgroundColor }}
                        >
                            <button onClick={() => deleteToast(toast.id)}>
                                X
                            </button>
                            <div className="notification-image">
                                {/* <img src={toast.icon} alt="" /> */}
                            </div>
                            <div>
                                <p className="notification-title">{toast.title}</p>
                                <p className="notification-message">
                                    {toast.description}
                                </p>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    );
}



export default Toast;