import { createContext, useState } from 'react';

export const ListItemBuyContext = createContext([{}]);

export const ListItemBuyWrapper = (props) => {
    const [listItem, setListItem] = useState([{}]);

    return (
        <ListItemBuyContext.Provider value={{ listItem, setListItem }}>{props.children}</ListItemBuyContext.Provider>
    );
};
