import { reset } from "./action.js"
import state from "./state.js"
import * as el from "./elements.js"

export function updatingDisplay(minutes, seconds) {
    minutes = minutes ?? state.minutes
    seconds = seconds ?? state.seconds

    el.minutes.textContent = String(minutes).padStart(2, "0")
    el.seconds.textContent = String(seconds).padStart(2, "0")
}

export function countDown() {
    clearTimeout(state.countDownId)
    if(!state.isRunning) {
        return
    }

    let minutes = Number(el.minutes.textContent)
    let seconds = Number(el.seconds.textContent)

    seconds--

    if(seconds < 0) {
        seconds = 59
        minutes--
    }

    if (minutes < 0) {
        reset()
        return
    }

    updatingDisplay(minutes, seconds)
    state.countDownId = setTimeout(() => countDown(), 1000)
}
