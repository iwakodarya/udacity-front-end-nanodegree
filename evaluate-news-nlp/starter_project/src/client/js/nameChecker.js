function isValidURL(inputText) {
    console.log("::: Running isValidURL :::", inputText);
    const validURLregex = '^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$'
    if (inputText.match(validURLregex))
        return true
    else {
        alert("Invalid URL! Try again.")
        return false
    }
}

export { isValidURL };
