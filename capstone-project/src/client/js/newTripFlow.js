const newTripFlow = () => {
    const addNewTripButton = document.getElementById("add-trip-button");
    const addNewTripModal = document.getElementById("new-trip-modal");
    const addNewTripClose = addNewTripModal.getElementsByClassName("close-x")[0];
  
    addNewTripButton.addEventListener("click", () => {
      addNewTripModal.style.display = "block";
    });
  
    addNewTripClose.addEventListener("click", () => {
      addNewTripModal.style.display = "none";
    });
  
    window.addEventListener("click", (event) => {
      if (event.target == addNewTripModal) addNewTripModal.style.display = "none";
    });
  };
  
  export { newTripFlow }