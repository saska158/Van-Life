//import { useState, useEffect } from "react"
import { Suspense } from "react"
import { Link, redirect, useLoaderData, defer, Await } from "react-router-dom"
import { getHostVans } from "../../api"
import { requireAuth } from "../../utils"
import { BeatLoader } from "react-spinners"

export async function loader({request}) {//ovo prvobitno nije bila async function dok smo vracali samo getHostVans()
    await requireAuth(request)         //ali sada je async jer treba da saceka requireAuth() funkciju  
    return defer({hostVans: getHostVans()})
}

export default function HostVans() {
    //const [vans, setVans] = useState([])
    const dataPromise = useLoaderData()

    /*useEffect(() => {
        fetch("/api/host/vans")
            .then(res => res.json())
            .then(data => setVans(data.vans))
    }, [])*/

    return (
        <section>
           <h1 className="host-vans-title">Your listed vans</h1>
           <Suspense fallback={<BeatLoader />}>
           <Await resolve={dataPromise.hostVans}>
            {hostVans => {
                const hostVansEls = hostVans.map(van => (
                    <Link
                        to={`/host/vans/${van.id}`}
                        key={van.id}
                        className="host-van-link-wrapper"
                    >
                        <div className="host-van-single" key={van.id}>
                            <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
                            <div className="host-van-info">
                                <h3>{van.name}</h3>
                                <p>${van.price}/day</p>
                            </div>
                        </div>
                    </Link>
                ))
                
                return (
                   <div className="host-vans-list">
                    <section>
                        {hostVansEls}
                    </section>
                   </div>
                )
            }}
           </Await>
           </Suspense>
        </section>
    )
}