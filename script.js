const pickBtn = document.getElementById("pick-button")
const fileInput = document.getElementById("file")
const image = document.getElementById("image")
const hexInput = document.getElementById("hex-input")
const rgbInput = document.getElementById("rgb-input")
const pickedColor = document.getElementById("picked-color")


const initEyeDropper = () => {
    if ("EyeDropper" in window) {
        pickBtn.classList.remove("hide")
        const eyeDropper = new EyeDropper()

        pickBtn.addEventListener("click", async () => {
            try {
                const colorValue = await eyeDropper().open()
                const hexValue = colorValue.sRGBHex.toLowerCase()
                const rgbValue = hexToRGB(hexValue)

                result.style.display = "grid"
                hexInput.value = hexValue
                rgbInput.value = rgbValue
                pickedColor.style.backgroundColor = hexValue
            } catch {
                alert("Your Browser doesn't support EyeDropper API!")
            }
        })

    } else {
        alert("Your Browser doesn't support EyeDropper API!")
    }
}


fileInput.addEventListener("change", () => {
    result.style.display = "none"

    const reader = new FileReader()
    reader.onload = () => image.setAttribute("src", reader.result)
    reader.readAsDataURL(fileInput.files[0])
})


const copyToClipboard = (textId) => {
    const textElement = document.getElementById(textId)
    textElement.select()
    document.execCommand("copy")
}

// RGB conversion function
const hexToRGB = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgb(${r}, ${g}, ${b})`
}


// Initialize EyeDropper
window.onload = initEyeDropper