export const Anim_Deep = el => {
    el.style.transition = "transform 0.5s ease";
    el.addEventListener('mousemove', e => {
        let rect = el.getBoundingClientRect()
        let x = e.clientX - rect.left
        let y = e.clientY - rect.top
        let centerX = rect.width / 2
        let centerY = rect.height / 2
        let rotateY = ((x - centerX) / centerX) * 1.5
        let rotateX = -((y - centerY) / centerY) * 1.5
        el.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`
    })
}