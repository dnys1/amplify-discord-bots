import { writable } from 'svelte/store'

export const user = writable()
export const notifications = writable([])
export const commands = writable([])
