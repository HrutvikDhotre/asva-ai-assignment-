import { useStateContext } from "../contexts/ContextProvider"

const {currentColour} = useStateContext()

export function handleFocus(e) {
    console.log("hiif")

    e.target.style.border = `1.5px solid ${currentColour}`
    e.target.style.outline = `1.5px solid ${currentColour}`
}

export function handleBlur(e) {
    console.log("hiib")
    e.target.style.border = ``
    e.target.style.outline = `none`
}