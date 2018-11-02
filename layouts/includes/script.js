const checkParentForBgImg = (target) => {
    if (target.tagName.toUpperCase() === "BODY") return null
    const parent = target.parentElement
    return parent.style.backgroundImage || checkParentForBgImg(parent)
}

const handleProjectCardClick = (ev, projectName) => {
    ev.preventDefault()
    const projectModal = document.getElementById('projectModal')
    const projectImg = document.getElementById('projectImg')
    projectModal.style.display = 'block'
    projectImg.src = `./assets/img/${projectName}_screenshot.png`
}

const handleCloseModalClick = ev => {
    ev.preventDefault()
    const projectModal = document.getElementById('projectModal')
    const projectImg = document.getElementById('projectImg')
    projectModal.style.display = 'none'
    projectImg.src = ''
}

const handleSubmit = ev => {
    ev.preventDefault()
    const form = document.forms['mailForm']
    const formData = new FormData(ev.target)

    console.log({
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message')
    })
    fetch('mail.php', {
        method: 'POST',
        body: formData
    })
    .then(res => res.text())
    .then (text => console.log(text));
}