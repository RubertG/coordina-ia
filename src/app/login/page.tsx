import { login, signup } from "@/modules/auth"
import { SearchParams } from "@/modules/core"
import { use } from "react"

interface Props {
  searchParams: SearchParams
}

export default function LoginPage(props: Props) {
  const { error } = use(props.searchParams)

  return (
    <>
      <form>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <button formAction={login}>Log in</button>
        <button formAction={signup}>Sign up</button>
      </form>
      {error && <p>{error}</p>}
    </>
  )
}
