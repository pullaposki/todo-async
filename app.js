// TODOList: Implement a todo app where each todo item is fetched from a public API like JSONPlaceholder.

const URL = "https://jsonplaceholder.typicode.com/todos"

displayToDos()

async function displayToDos(){
    try {
        const loadingElement = document.createElement('p');
        loadingElement.textContent="Loading...";
        document.body.appendChild(loadingElement);
        
        const htmlResponse = await fetch(URL);
        if(!htmlResponse.ok){
            throw new Error(`Http error: ${htmlResponse.status}`)
        }
        
        const arrayOfObjects = await htmlResponse.json();

        document.body.removeChild(loadingElement);

        for (const object of arrayOfObjects) {
            const dataContainer = document.createElement('p');
            document.body.appendChild(dataContainer);
            let completedText = object.completed ? "COMPLETED" : "Not complete";
            dataContainer.textContent = object.title + ", " + completedText;
            
            const separator = document.createElement('p');
            separator.textContent="--------------------------------"

            const completeButton = document.createElement('button');
            document.body.appendChild(completeButton);
            completeButton.textContent = "Complete";
            completeButton.addEventListener("click", ()=>{
                handleCompleteClick(completeButton, object, dataContainer, separator);
            })

            document.body.appendChild(separator);
        }    
    }catch (err) {
        console.log(err)
        const errorContainer = document.createElement('p');
        document.body.appendChild(errorContainer);
        errorContainer.textContent="data not gotten, " + err;
        
    }
    
}



function handleCompleteClick(completeButton, dataObject, dataContainer, separator){
    console.log("Should make an api call to update complete status");
    dataContainer.style.textDecoration = "line-through";
    dataContainer.textContent = dataObject.title + ", COMPLETE";
    completeButton.removeEventListener("click", () => handleCompleteClick);
    completeButton.disabled = true;

    // Add the CSS class that starts the transition
    dataContainer.classList.add('removing');
    completeButton.classList.add('removing');
    separator.classList.add('removing');

    // Delay the actual removal until the transition is complete
    setTimeout(() => {
        dataContainer.classList.add('collapsing');
        completeButton.classList.add('collapsing');
        separator.classList.add('collapsing');
    }, 10);

    setTimeout(() => {
        document.body.removeChild(dataContainer);
        document.body.removeChild(completeButton);
        document.body.removeChild(separator);
    }, 600); // Duration of the transition in CSS    
}


