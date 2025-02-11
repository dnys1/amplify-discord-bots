import fetch from 'node-fetch'
import nacl from 'tweetnacl'

export * from './handleCommand.js'
export * from './registerCommand.js'
export * from './syncCommands.js'

export async function verifyEvent(event) {
  const signature = event.headers['X-Signature-Ed25519'.toLowerCase()]
  const timestamp = event.headers['X-Signature-Timestamp'.toLowerCase()]
  const body = JSON.stringify(event.body)
  if (!signature || !timestamp || !body) return false
  const isVerified = nacl.sign.detached.verify(
    Buffer.from(timestamp + body),
    Buffer.from(signature, 'hex'),
    Buffer.from(process.env.DISCORD_PUBLIC_KEY, 'hex')
  )
  return isVerified
}

export function generateResponse(content, embeds) {
  return {
    tts: false,
    content,
    embeds,
    allowed_mentions: [],
  }
}

export async function addRoleToUser({ guildId, userId, roleId }) {
  const config = {
    method: 'PUT',
    headers: {
      Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      'Content-Type': 'application/json',
    },
  }
  const url = `https://discord.com/api/v6/guilds/${guildId}/members/${userId}/roles/${roleId}`

  let data
  try {
    const response = await fetch(url, config)
    if (response.ok && response.status === 204) {
      return true
    }
  } catch (error) {
    throw new Error('Error adding role', error)
  }

  if (!data) return
  return data
}

export async function deleteCommand(commandId, { guildId }) {
  const config = {
    method: 'DELETE',
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      'Content-Type': 'application/json',
    },
  }
  let url = `https://discord.com/api/v8/applications/${process.env.DISCORD_APP_ID}/commands/${commandId}`
  if (guildId) {
    url = `https://discord.com/api/v8/applications/${process.env.DISCORD_APP_ID}/guilds/${guildId}/commands/${commandId}`
  }

  let data
  try {
    const response = await fetch(url, config)
    if (response.ok && response.status === 200) {
      data = await response.json()
    }
  } catch (error) {
    throw new Error(`Error deleting command ${commandId}:`, error)
  }

  return data
}

export async function getRegisteredCommands() {
  const config = {
    method: 'GET',
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      'Content-Type': 'application/json',
    },
  }
  const url = `https://discord.com/api/v8/applications/${process.env.DISCORD_APP_ID}/commands`

  let data
  try {
    const response = await fetch(url, config)
    if (response.ok && response.status === 200) {
      data = await response.json()
    }
  } catch (error) {
    throw new Error('Error fetching registered commands', error)
  }

  return data
}

export async function getGuilds() {
  const config = {
    method: 'GET',
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      'Content-Type': 'application/json',
    },
  }
  const url = `https://discord.com/api/v6/users/@me/guilds`

  let data
  try {
    const response = await fetch(url, config)
    if (response.ok && response.status === 200) {
      data = await response.json()
    }
  } catch (error) {
    throw new Error('Error fetching guilds', error)
  }

  return data
}
