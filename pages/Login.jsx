/*
Ova komponenta je prvobitno hendlovala formu na React nacin
(
    - koristila je state
    - imala funkcije handleChange i handleSubmit
    - kontrolisala inpute (value, onChange)
)
Sada koristi action funkciju react-router Data Layer APIs
*/
//import { useState } from "react"
import { useLoaderData, Form, useNavigate, redirect, useActionData, useNavigation } from "react-router-dom"
import { loginUser } from "../api"

export function loader({request}) {
    return new URL(request.url).searchParams.get('message')
}

export async function action({request}) {
    const formData = await request.formData()
    const email = formData.get("email")
    const password = formData.get("password")
    const pathname = new URL(request.url).searchParams.get("redirectTo") || "/host"
    
    try {
        //loginUser je async funkcija, tako da automatski wrapuje value in promise, so:
        const data = await loginUser({email, password})
        console.log(data)
        /*
         isto sto i:
         loginUser({email, password})
         then(data => console.log(data))
        */
        localStorage.setItem("loggedin", true)
        return redirect(pathname)
    }
    catch(err) {
        return err
    }
}

export default function Login() {
    //const [loginFormData, setLoginFormData] = useState({email: "", password: ""})
    //const [status, setStatus] = useState("idle")
    //const [error, setError] = useState(null)
    const message = useLoaderData()
    const error = useActionData()
    //const navigate = useNavigate()
    const navigation = useNavigation()
    //console.log('navigation', navigation, navigation.state)
/*
    function handleSubmit(e) {
        e.preventDefault()
        setStatus("submitting")
        setError(null)
        loginUser(loginFormData)
         .then(data => {
            navigate("/host")
         })
         .catch(err => setError(err))
         .finally(() => setStatus("idle"))
    }

    function handleChange(e) {
        const { name, value } = e.target
        setLoginFormData(prevData => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }
*/
    return (
        <div className="login-container">
            <h1>Sign in to your account</h1>
            { message && <h3 className="red">{message}</h3> }
            {error && <h3 className="red">{error.message}</h3>}
            <Form 
               method="post" 
               /*onSubmit={handleSubmit}*/ 
               className="login-form"
               replace
            >
                <input 
                  name="email"
                 //onChange={handleChange}
                  type="email"
                  placeholder="Email address"
                  //value={loginFormData.email}
                />
                <input 
                  name="password"
                  //onChange={handleChange}
                  type="password"
                  placeholder="Password"
                  //value={loginFormData.password}
                />
                <button
                  disabled={ navigation.state === "submitting" }
                >
                  { navigation.state === "submitting" 
                       ? "Logging in..."
                       : "Log in"    
                  }
                </button>
            </Form>
        </div>
    )
}