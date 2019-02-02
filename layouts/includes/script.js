const checkParentForBgImg = (target) => {
    if (target.tagName.toUpperCase() === "BODY") return null
    const parent = target.parentElement
    return parent.style.backgroundImage || checkParentForBgImg(parent)
}

const handleProjectCardClick = (ev, projectName) => {
    ev.preventDefault()
    const projectModal = document.getElementById('projectModal')
    const projectImg = document.getElementById('projectImg')
    const displayMobile = !window.matchMedia('(min-width: 768px)').matches
        ? '_mobile' : ''
    console.log(displayMobile)
    projectModal.style.display = 'block'
    projectImg.src = `./assets/img/${projectName}_screenshot${displayMobile}.png`
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
    const formData = new FormData(ev.target)

    fetch('mail.php', {
        method: 'POST',
        body: formData
    }).then((res, rej) => res.text())
    .then(res => {
        console.log(res);
        const message = res === 'Message sent.'
            ? 'Thanks for your message. You\'ll be hearing from me soon.'
            : 'I\'m sorry, there was a problem sending your message.'
        showModal(message)
    });
}

const showModal = text => {
    const form = document.forms['mailForm']
    const modal = document.getElementById('contactModal')
    const msgContainer = modal.children['contactResMsg']

    Array.from(form.elements).forEach(el => {
        el.setAttribute('disabled', '')
    })

    msgContainer.innerText = text
    modal.classList.add('success')
    modal.style.display = 'flex'
}
