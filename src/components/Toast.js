import Toastify from 'toastify-js'

const Toast = (state = "info",text) => {
    let backgroundColor
    let className

    if(state === "success"){
        backgroundColor = "#26962d"
        className = "toast-success"
    } else if(state === "info"){
        backgroundColor = "#FFF9C4"
        className = "toast-info"
    }

    Toastify({
        text: text,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        backgroundColor: backgroundColor,
        className: className, // Multiple classes also can be assigned as a string, with spaces between class names.
        stopOnFocus: true, // Prevents dismissing of toast on hover
        onClick: function(){} // Callback after click
      }).showToast();
}

export default Toast