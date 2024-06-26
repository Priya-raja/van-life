
import React from 'react'
import { useState, useEffect } from 'react'
import '../../server.js'
import { Link, useSearchParams } from 'react-router-dom'
import { getVans } from "../../api"

const Vans = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const [vans, setVans] = useState([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    const typeFilter = searchParams.get("type")
    
    useEffect(() => {
        async function loadVans() {
            setLoading(true)
            try {
                const data = await getVans()
                setVans(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        loadVans()
    }, [])

    const displayedVans = typeFilter ?
    vans.filter(van=> van.type === typeFilter) :vans

    // function genNewSearchParamString(key, value) {
    //     const sp = new URLSearchParams(searchParams)
    //     if (value === null) {
    //       sp.delete(key)
    //     } else {
    //       sp.set(key, value)
    //     }
    //     return `?${sp.toString()}`
    //   }
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
         state={{ 
            search: `?${searchParams.toString()}`, //you will get like queryparameters '?type=luxury'
            type: typeFilter 
        }} 
        >
        <img src={van.imageUrl} alt="van" />
        <div className="van-info">
            <h3>{van.name}</h3>
            <p>${van.price}<span>/day</span></p>
        </div>
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
    </Link>
    </div>
    ))

    if (loading) {
        return <h1>Loading...</h1>
    }
    
    if (error) {
        return <h1>There was an error: {error.message}</h1>
    }


    return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>

            <div className="van-list-filter-buttons">
                {/* //instead of button if link then use genNewSearchParamString function */}
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
