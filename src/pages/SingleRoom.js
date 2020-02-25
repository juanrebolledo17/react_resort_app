import React, { useState, useContext, useEffect } from 'react';
import defaultBg from '../images/room-1.jpeg';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
import { RoomContext } from '../context';

import StyledHero from '../components/StyledHero';

export default function SingleRoom(props) {
    const [slug, setSlug] = useState(props.match.params.slug);
    const [defaultBackground, setDefaultBackground] = useState(defaultBg);
    const context = useContext(RoomContext);
    const { getRoom } = context;
    const room = getRoom(slug);
    // console.log(room) // this produces a double console.log, with the first being undefined, and i don't get why
    if (!room) {
        return (
            <div className="error">
                <h3>no such room could be found.</h3>
                <Link to="/rooms" className="btn-primary">
                    back to rooms
                </Link>
            </div>
        );
    }
    const { name, description, capacity, size, price, extras, breakfast, pets, images } = room;
    const [main, ...defaultImgs] = images;
    // console.log(room) // this one works like a charm

    return (
        <>
            <StyledHero img={images[0] || defaultBackground}>
                <Banner title={`${name} room`}>
                    <Link to="/rooms" className="btn-primary">
                        back to rooms
                    </Link>
                </Banner>
            </StyledHero>
            <section className="single-room">
                <div className="single-room-images">
                    {defaultImgs.map((item, index) => (
                        <img key={index} src={item} alt={name} />
                    ))}
                </div>
                <div className="single-room-info">
                    <article className="desc">
                        <h3>details</h3>
                        <p>
                            {description}
                        </p>
                    </article>
                    <article className="info">
                        <h3>info</h3>
                        <h6>price: ${price}</h6>
                        <h6>size: {size} SQFT</h6>
                        <h6>
                            max capacity: {capacity > 1 ? `${capacity} people` : `${capacity} person`}
                        </h6>
                        <h6>
                            {pets ? 'pets allowed' : 'no pets allowed'}
                        </h6>
                        <h6>
                            {breakfast && 'free breakfast include'}
                        </h6>
                    </article>
                </div>
            </section>
            <section className="room-extras">
                <h6>extras</h6>
                <ul className="extras">
                    {extras.map((item, index) => (
                        <li key={index}>- {item}</li>
                    ))}
                </ul>
            </section>        
        </>
    );
} 

