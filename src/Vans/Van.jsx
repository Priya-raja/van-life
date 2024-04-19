import { Server } from 'miragejs'
import React from 'react'
import { useState, useEffect } from 'react'
import '../server.js'
import { Link, useSearchParams } from 'react-router-dom'

const Vans = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const [vans, setVans] = useState([])

    const typeFilter = searchParams.get("type")

 
    
    useEffect(() => {
        fetch("/api/vans")
            .then(res => res.json())
            .then(data => setVans(data.vans))
    }, [])

    const displayedVans = typeFilter ?
    vans.filter(van=> van.type === typeFilter) :vans

    function genNewSearchParamString(key, value) {
        const sp = new URLSearchParams(searchParams)
        if (value === null) {
          sp.delete(key)
        } else {
          sp.set(key, value)
        }
        return `?${sp.toString()}`
      }
      //inLinks use this
    //   <Link to={genNewSearchParamString("type", "jedi")}>Jedi</Link>
    //     <Link to={genNewSearchParamString("type", null)}>Clear</Link>
      
      function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
          if (value === null) {
            prevParams.delete(key)
          } else {
            prevParams.set(key, value)
          }
          return prevParams
        })
      }
      //this for buttons filtering

    const vanElements = displayedVans.map(van => (
        <div key={van.id} className="van-tile">
        <Link to={van.id}
         state={{ search: `?${searchParams.toString()}`, type: typeFilter }}
        >
        <img src={van.imageUrl} />
        <div className="van-info">
            <h3>{van.name}</h3>
            <p>${van.price}<span>/day</span></p>
        </div>
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
    </Link>
    </div>
    ))



    return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>

            <div className="van-list-filter-buttons">
            <button
                    onClick={() => handleFilterChange("type", "simple")}
                    className={
                        `van-type simple ${typeFilter === "simple" ? "selected" : ""}`
                    }
                >Simple</button>
                <button
                    onClick={() => handleFilterChange("type", "luxury")}
                    className={
                        `van-type luxury ${typeFilter === "luxury" ? "selected" : ""}`
                    }
                >Luxury</button>
                <button
                    onClick={() => handleFilterChange("type", "rugged")}
                    className={
                        `van-type rugged ${typeFilter === "rugged" ? "selected" : ""}`
                    }
                >Rugged</button>

                {typeFilter ? (
                    <button
                        onClick={() => handleFilterChange("type", null)}
                        className="van-type clear-filters"
                    >Clear filter</button>
                ) : null}
            
            </div>  

            <div className="van-list">
                {vanElements}
            </div>
        </div>
    )
}

export default Vans
