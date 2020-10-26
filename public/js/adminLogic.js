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

const addSkill = document.querySelector("#addSkill");
let skills = [];
addSkill.addEventListener("click", e => {
    e.preventDefault();
    let skill = {};
    let skillName = document.querySelector("#skillName").value;
    if (skillName) {
        skill.skill = skillName;
        [...document.querySelectorAll(".skills")].forEach(rBtn => {
            if (rBtn.checked) {
                skill.type = rBtn.value;
            }
        })
    }
    if (skill.skill && skill.type) {
        const startLength = skills.length;
        skill.html = `<span class="skil ${skill.skill}">${skill.skill} <img src="https://www.flaticon.com/svg/static/icons/svg/25/25230.svg" alt="Remove" class="remove-skill ${skill.skill}"></span>`;
        if (startLength) {
            skills.every(s => s.skill !== skill.skill) ? skills.push(skill) : alert("this skill is already added");
        }
        else {
            skills.push(skill);
        }
        if (skills.length != startLength) {
            const skillEls = [...document.querySelectorAll(".skill-collection")];
            const el = skillEls.find(el => el.id.trim().toLowerCase().includes(skill.type.trim().toLowerCase()));
            el.innerHTML += skill.html;
        }
        document.querySelectorAll(".skil").forEach(s => {
            s.onclick = e => {
                skillName = e.target.classList[1];
                const el = e.target;
                if (el.childElementCount) {
                    el.remove();
                }
                else {
                    el.parentElement.remove();
                }
                skills = skills.filter(sk => sk.skill != skillName);
            }
        });
    }
    else {
        alert("Fill the form correctly");
    }
})


document.querySelectorAll("input[type='radio']").forEach((r, _, arr) => {
    r.onclick = e => {
        arr.forEach(rr => rr.checked = false);
        e.target.checked = true;
    }
})

const requestBtn = document.querySelector(".btn-send");
requestBtn.addEventListener("click", async e => {
    e.preventDefault();
    const info = {};
    [...document.querySelectorAll(".form-group")].map(gr => {
        if (gr.classList.length !== 2) {
            gr.querySelectorAll("[name]").forEach(el => {
                switch (el.nodeName) {
                    case "DIV":
                        info[el.id] = el.innerText.split(" ").filter(Boolean);
                        break;
                    default:
                        info[el.name] = el.value;
                        break;
                }
            })
        }
    })
    const req = await request('/admin', 'POST', info);
    req?.message && alert(req.message);
})