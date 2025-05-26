let setActive = false
const navButton = document.getElementById("navButton")
const navList = document.getElementById("content")

navButton.addEventListener("click", () => {
  if (!setActive) setActive = true
  else setActive = false


  if (setActive) {
    for (const child of navButton.children) {
      child.classList.replace("show", "hide")
    }

    navList.classList.replace("close", "open")
  } else for (const child of navButton.children) {
    child.classList.replace("hide", "show")
    navList.classList.replace("open", "close")
  }
})
