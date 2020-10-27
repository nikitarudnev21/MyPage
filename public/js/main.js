const upperLetterCheckerr = str => {
    const sL = str.length;
    for (let i=0; i < sL; i++) {
        if (str.charAt(i) === str.charAt(i).toUpperCase()) {
            str = str.replace(str.charAt(i), " "+str.charAt(i).toLowerCase());
        }
    }
        return str;
    }
    document.querySelectorAll('.th-word').forEach(th=>th.innerText = upperLetterCheckerr(th.innerText))

const request = async (url, method = 'GET', data = null) => {
    try {
        const headers = {}
        let body

        if (data) {
            headers['Content-Type'] = 'application/json'
            body = JSON.stringify(data)
        }

        const response = await fetch(url, {
            method,
            headers,
            body
        })
        return await response.json()
    } catch (e) {
        console.warn('Error:', e.message)
    }
}

document.querySelectorAll('.btn-delete').forEach(btn=> {
    btn.onclick = async () => {
        const idData = {id:btn.id};
        const res = await request("/admin", "DELETE", idData);
        res?.message && alert(res.message)
        console.log(JSON.parse(res.peoples));
    } 
});
