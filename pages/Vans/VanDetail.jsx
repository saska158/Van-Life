import { Suspense } from "react"
import { Link, useLocation, useLoaderData, defer, Await } from "react-router-dom"
//import { useState, useEffect } from "react"
import { getVan } from "../../api"
import { BeatLoader } from "react-spinners"

export function loader({params}) {//funckija loader dobija objekat koji ima property params, 
  return defer({van: getVan(params.id)})       //ona to dobija od propertija loader na <Route> u index.jsx
}                                 //tako da imamo pristup params iako smo van komponente VanDetail  

export default function VanDetail() {
    //const { id } = useParams()
    //const [van, setVan] = useState(null)
    const dataPromise = useLoaderData()
    const location = useLocation()
    const search = location.state?.search || ""
    const type = location.state?.type || "all"
/*
    useEffect(() => {
        fetch(`/api/vans/${id}`)
          .then(res => res.json())
          .then(data => setVan(data.vans))
    }, [id])*/
    
    return (
        <div className="van-detail-container">
         <Suspense fallback={<BeatLoader />}>
         <Await resolve={dataPromise.van}>
          {van => {
            return (
              <>
                <Link
                 to={`..${search}`}
                 relative="path"
                 className="back-button"
                >&larr; <span>Back to {type} vans</span></Link>
                <div className="van-detail">
                  <img src={van.imageUrl} />
                  <i className={`van-type ${van.type} selected`}>
                    {van.type}
                  </i>
                  <h2>{van.name}</h2>
                  <p className="van-price"><span>${van.price}</span>/day</p>
                  <p>{van.description}</p>
                  <button className="link-button">Rent this van</button>
                </div>
              </>
            )
          }}
         </Await>
         </Suspense>
        </div>
    )
}