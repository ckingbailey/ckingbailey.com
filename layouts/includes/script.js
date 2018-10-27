// IDEA: could I use the event's bubbling to look up the DOM tree for the bgImg?
// possibly, but what I would have to do is make the click handler first call lookForBgImg
// and then on success it calls the rest of the handler
const checkParentForBgImg = (target) => {
    console.log(target)
    if (target.tagName.toUpperCase() === "BODY") return null
    const parent = target.parentElement
    return parent.style.backgroundImage || checkParentForBgImg(parent)
}

const handleClick = ev => {
    ev.preventDefault()
    const projectModal = document.getElementById('projectModal')
    // look up the tree for backgroundImage
    const bgImg = ev.target.style.backgroundImage || checkParentForBgImg(ev.target)
    console.log(bgImg)
    projectModal.style.display = 'block'
    projectModal.style.backgroundImage = `${bgImg}`
    console.log(projectModal)
}
