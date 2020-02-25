import React, { useState, useEffect, useRef } from 'react';
import items from './data';

const RoomContext = React.createContext();

function RoomProvider({ children }) {
    const [data, setData] = useState({
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,

        type: "all",
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false
    });
    const [flag, setFlag] = useState(false);
    const isFirst = useRef(true);

    // const getData = () => {
    //     return false;
    // }

    useEffect(() => {
        let rooms = formatData(items);
        let featuredRooms = rooms.filter(room => room.featured === true);
        let maxPrice = Math.max(...rooms.map(room => room.price));
        let maxSize = Math.max(...rooms.map(room => room.size));

        setData(data => {
            return { ...data, rooms, featuredRooms, sortedRooms: rooms, loading: false, price: maxPrice, maxPrice, maxSize };
        });
    }, []);

    const formatData = items => {
        let tempItems = items.map(item => {
            let id = item.sys.id,
                images = item.fields.images.map(img => {
                    return img.fields.file.url
                }),
                room = { ...item.fields, images, id };

            return room;
        });
        return tempItems;
    }

    const getRoom = slug => {
        const tempRooms = [...data.rooms];
        const room = tempRooms.find(room => room.slug === slug);
        return room;
    }

    const handleChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setFlag(!flag)
        setData(data => ({ ...data, [name]: value }));
    }

    useEffect(() => {
        function filterRooms() {
            let { rooms, type, capacity, price, minSize, maxSize, breakfast, pets } = data;
            let tempRooms = [...rooms];

            capacity = parseInt(capacity);
            price = parseInt(price);
            // filter by type
            if (type !== "all") tempRooms = tempRooms.filter(room => room.type === type);
            // filter by capacity
            if (capacity !== 1) tempRooms = tempRooms.filter(room => room.capacity >= capacity);
            // filter by price
            tempRooms = tempRooms.filter(room => room.price <= price);
            // filter by size
            tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize);

            // filter by breakfast 
            if (breakfast) tempRooms = tempRooms.filter(room => room.breakfast === true);
            // filter by pets
            if (pets) tempRooms = tempRooms.filter(room => room.pets === true);

            setData(data => {
                return { ...data, sortedRooms: tempRooms };
            });
        }

        if (!isFirst.current) {
            filterRooms();
        }

        isFirst.current = false
    }, [flag]);

    return (
        <RoomContext.Provider value={{ ...data, getRoom, handleChange }}>
            {children}
        </RoomContext.Provider>
    );
}

const RoomConsumer = RoomContext.Consumer;

export { RoomContext, RoomConsumer, RoomProvider };

export function withRoomConsumer(Component) {
    return function ConsumerWrapper(props) {
        return (
            <RoomConsumer>
                {value => <Component {...props} context={value} />}
            </RoomConsumer>
        );
    }
}