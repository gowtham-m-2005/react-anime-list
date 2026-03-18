export function generateCodeVerifier() {
    const array = new Uint8Array(64)
    crypto.getRandomValues(array)

    return btoa(String.fromCharCode(...array))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '')
        .slice(0,128)
}

export function generateCodeChallenge(verifier){
    return verifier
}

export function redirectToMALLogin(){
    const verifier = generateCodeVerifier()
    const challenge = generateCodeChallenge(verifier)

    sessionStorage.setItem('pkce_verifier', verifier)

    const params = new URLSearchParams({
        response_type : 'code',
        client_id : import.meta.env.VITE_MAL_CLIENT_ID,
        redirect_uri : import.meta.env.VITE_MAL_REDIRECT_URI,
        code_challenge: challenge,
        code_challenge_method: 'plain',
        state: 'randomstate123'
    })

    const url = `https://myanimelist.net/v1/oauth2/authorize?${params}`

    // window.open(
    //     url,
    //     "_blank",
    //     "width=500,height=500,noopener,noreferrer"
    // )

    window.location.href = url
}

// export async function exchangeCodeForToken(code){
//     const verifier = sessionStorage.getItem('pkce_verifier')
//
//     console.log('--- TOKEN EXCHANGE DEBUG ---')
//     console.log('code:', code)
//     console.log('verifier:', verifier)
//     console.log('client_id:', import.meta.env.VITE_MAL_CLIENT_ID)
//     console.log('redirect_uri:', import.meta.env.VITE_MAL_REDIRECT_URI)
//
//
//     const body = new URLSearchParams({
//         client_id: import.meta.env.VITE_MAL_CLIENT_ID,
//         grant_type: 'authorization_code',
//         code,
//         redirect_uri: import.meta.env.VITE_MAL_REDIRECT_URI,
//         code_verifier: verifier
//     })
//
//     console.log('body being sent:', body.toString())
//     const res = await fetch('/oauth/v1/oauth2/token', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//         body
//     })
//
//     const data = await res.json()
//     console.log('token response:', data) // ← what did MAL actually send back?
//
//     // Save tokens to localStorage
//     localStorage.setItem('mal_access_token', data.access_token)
//     localStorage.setItem('mal_refresh_token', data.refresh_token)
//
//     return data
// }

export async function exchangeCodeForToken(code){
    const verifier = sessionStorage.getItem('pkce_verifier')

    const body = new URLSearchParams({
        client_id: import.meta.env.VITE_MAL_CLIENT_ID,
        client_secret: import.meta.env.VITE_MAL_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code,
        redirect_uri: import.meta.env.VITE_MAL_REDIRECT_URI,
        code_verifier: verifier
    })

    const res = await fetch('/oauth/v1/oauth2/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body
    })

    const data = await res.json()

    localStorage.setItem('mal_access_token', data.access_token)
    localStorage.setItem('mal_refresh_token', data.refresh_token)

    return data
}


export function getAccessToken() {
    return localStorage.getItem('mal_access_token')
}

export function logout() {
    localStorage.removeItem('mal_access_token')
    localStorage.removeItem('mal_refresh_token')
    sessionStorage.removeItem('pkce_verifier')
}