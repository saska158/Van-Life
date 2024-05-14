//import { useState, useEffect } from "react"
import { Suspense } from "react"
import { Link, NavLink, Outlet, redirect, useLoaderData, defer, Await } from "react-router-dom"
//import { getHostVans } from "../../api"
import { getVan } from "../../api"
import { requireAuth } from "../../utils"
import { BeatLoader } from "react-spinners"

export async function loader({params, request}) {
    await requireAuth(request)
    return defer({hostVan: getVan(params.id)})
}

export default function HostVanDetail() {
    //const { id } = useParams()
    //const [currentVan, setCurrentVan] = useState(null)

    const dataPromise = useLoaderData()

    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }
    /*
    useEffect(() => {
        fetch(`/api/host/vans/${id}`)
          .then(res => res.json())
          .then(data => setCurrentVan(data.vans))
    }, [])*/


    return (
       <section>
        <Suspense fallback={<BeatLoader />}>
            <Link
             to='..'
             relative="path"
             className="back-button"
            >
               &larr; <span>Back to all vans</span>
            </Link>
            <Await resolve={dataPromise.hostVan}>
                {currentVan => {
                    return (
                        <div className="host-van-detail-layout-container">
                            <div className="host-van-detail">
                               <img src={currentVan.imageUrl} />
                               <div className="host-van-detail-info-text">
                                  <i
                                   className={`van-type van-type-${currentVan.type}`}
                                  >
                                    {currentVan.type}
                                  </i>
                                  <h3>{currentVan.name}</h3>
                                  <h4>${currentVan.price}/day</h4>
                               </div>
                            </div>

                            <nav className="host-van-detail-nav">
                              <NavLink
                                to="."
                                end
                                style={({ isActive }) => isActive ? activeStyles : null}
                              >
                                Details
                              </NavLink>
                              <NavLink
                                 to="pricing"
                                 style={({ isActive }) => isActive ? activeStyles : null}
                              >
                                Pricing
                              </NavLink>
                              <NavLink
                                 to="photos"
                                 style={({ isActive }) => isActive ? activeStyles : null}
                              >
                                Photos
                              </NavLink>
                            </nav>
                            <Outlet context={{currentVan}} />
                        </div>
                    )
                }}
            </Await>
        </Suspense>
       </section>
    )
}