import React, { useContext } from 'react';
import { RoomContext } from '../context';
import Title from './Title';

const getUnique = (items, value) => {
    return [...new Set(items.map(item => item[value]))];
}

export default function RoomsFilter({ rooms }) {
    const context = useContext(RoomContext);
    const { handleChange, type, capacity, price, minPrice, maxPrice, minSize, maxSize, breakfast, pets } = context;
    let types = getUnique(rooms, 'type');
    let people = getUnique(rooms, 'capacity');
    types = ['all', ...types];
    types = types.map((item, index) => (
        <option key={index} value={item}>
            {item}
        </option>
    ));

    people = people.map((item, index) => (
        <option key={index} value={item}>
            {item}
        </option>
    ));
    return (
        <div className="filter-container">
            <Title title="search rooms" />
            <form className="filter-form">
                <div className="form-group">
                    <label htmlFor="type">room type</label>
                    <select name="type" id="type" className="form-control" onChange={handleChange} value={type}>
                        {types}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="capacity">Guests</label>
                    <select name="capacity" id="capacity" className="form-control" onChange={handleChange} value={capacity}>
                        {people}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="price">room price ${price}</label>
                    <input type="range" name="price" id="price" min={minPrice} max={maxPrice} className="form-control" onChange={handleChange} value={price} />
                </div>
                <div className="form-group">
                    <label htmlFor="size">room size</label>
                    <input type="rumber" name="minSize" className="size-input" onChange={handleChange} value={minSize} />
                    <input type="rumber" name="maxSize" className="size-input" onChange={handleChange} value={maxSize} />
                </div>
                <div className="form-group">
                    <div className="single-extra">
                        <input type="checkbox" name="breakfast" id="breakfast" checked={breakfast} onChange={handleChange} />
                        <label htmlFor="breakfast">breakfast</label>
                    </div>
                    <div className="single-extra">
                        <input type="checkbox" name="pets" id="pets" checked={pets} onChange={handleChange} />
                        <label htmlFor="pets">pets</label>
                    </div>
                </div>
            </form>
        </div>
    );
}

