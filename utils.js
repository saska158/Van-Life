import { redirect } from "react-router-dom"

export async function requireAuth(request) {
    const pathname = new URL(request.url).pathname
    const isLoggedIn = JSON.parse(localStorage.getItem("loggedin")) //async jer ce umesto ovog hard-code, traziti sa servera data-u da li je ulogovan korisnik
    
    if(!isLoggedIn) {
        throw redirect(`/login?message=You must log in first&redirectTo=${pathname}`)
    }
}