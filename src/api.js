export async function getVans(){
    const res = await fetch("/api/vans")
    const data = res.json()
    return data.vans
}