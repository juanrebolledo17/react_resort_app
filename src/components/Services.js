import React, { useState } from 'react';
import Title from './Title';
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from 'react-icons/fa';

export default function Services() {
    const [services, setServices] = useState([
        {
            icon: <FaCocktail />,
            title: 'free cocktails',
            info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo?'
        },
        {
            icon: <FaHiking />,
            title: 'endless hiking',
            info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo?'
        },
        {
            icon: <FaShuttleVan />,
            title: 'free shuttle',
            info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo?'
        },
        {
            icon: <FaBeer />,
            title: 'strongest beer',
            info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo?'
        }
    ]);

    return (
        <section className="services">
            <Title title="Services"></Title>
            <div className="services-center">
                { services.map((item, index) => {
                    return (
                        <article key={index} className="service">
                            <span>
                                { item.icon }
                            </span>
                            <h6>
                                { item.title }
                            </h6>
                            <p>
                                { item.info }
                            </p>
                        </article>
                    );
                }) }
            </div>
        </section>
    );
} 
