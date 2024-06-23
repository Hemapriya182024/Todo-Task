const URL = "https://66719227e083e62ee43c2d51.mockapi.io/todo";

const myForm = document.getElementById("myForm");
myForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const task = document.getElementById("task").value;
    const deadline = document.getElementById("deadline").value;
    
    const data = JSON.stringify({
        username: username,
        task: task,
        deadline: deadline,
        status: "pending"
    });
   
    fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: data,
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("success", data);
        })
        .catch((error) => {
            console.log("Error", error)
        }).finally(() => {
            myForm.reset();
            DisplayTodo();
        });
});

function DisplayTodo() {
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            const todosdiv = document.getElementById("todos");
            todosdiv.innerHTML = ""; 
            data.forEach(todo => {
                const Cardiv = document.createElement("div");
                Cardiv.classList.add("card");

                const CardHeader = document.createElement("div");
                CardHeader.classList.add("card-header");
                CardHeader.innerHTML = todo.username;
                Cardiv.appendChild(CardHeader);

                const CardBody = document.createElement("div");
                CardBody.classList.add("card-body");
                Cardiv.appendChild(CardBody);

                const CardTitle = document.createElement("h5");
                CardTitle.classList.add("card-title");
                CardTitle.innerHTML = todo.task;
                CardBody.appendChild(CardTitle);

                const CardText = document.createElement("p");
                CardText.classList.add("card-text");
                CardText.innerText = `Deadline: ${todo.deadline}`;
                CardBody.appendChild(CardText);

                const Updatebutton = document.createElement("button");
                Updatebutton .classList.add("btn", "btn-primary");
                Updatebutton .innerText = todo.status;
                CardBody.appendChild(Updatebutton );
               
                Updatebutton.addEventListener("click",function(){
               
               if(todo.status === "pending" ) {
                Updatebutton.innerText="ongoing";
                Updatebutton.classList.add("btn-warning");
                Updatebutton.classList.remove("btn-primary");
                
                todo.status = "ongoing";
               }
              
                
               else if(todo.status === "ongoing" ) {
                Updatebutton.innerText="completed";
                Updatebutton.classList.add("btn-success");
                Updatebutton.classList.remove("btn-warning");
                todo.status = "completed";
               }
            });

                todosdiv.appendChild(Cardiv);
               
                const DeleteButton = document.createElement("button");
                DeleteButton.classList.add("btn", "btn-danger");
                DeleteButton.innerText = "Delete";
                DeleteButton.setAttribute("data-id", todo.id);
                DeleteButton.addEventListener("click", function() {
                    deleteTodo(todo.id);
                });
                CardBody.appendChild(DeleteButton);

                todosdiv.appendChild(Cardiv);
            });
        })
        .catch((error) => {
            console.log("Error", error);
        });
}
 

function deleteTodo(id) {
    fetch(`${URL}/${id}`, {
        method: 'DELETE'
    })
    .then((response) => {
        if (response.ok) {
            DisplayTodo(); 
        } else {
            console.log("Failed to delete todo item");
        }
    })
    .catch((error) => {
        console.log("Error", error);
    });
}
       


