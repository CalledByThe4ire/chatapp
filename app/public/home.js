let roomId;

const createElementFromHTML = htmlString => {
    var div = document.createElement("div");
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild;
};

const getMessages = () => {
    fetch(`/api/rooms/${roomId}/messages`)
        .then(handleResponse)
        .then(data => {
            document.querySelector("#roomName").textContent = `Messages for ${
                data.room.name
            }`;
            let messages = "";
            data.messages.forEach(message => {
                messages += `${message.text}\r`;
            });
            document.querySelector("#messages").textContent = messages;
        })
        .catch(error => console.log(error));
};

const handleJSONResponse = response => {
    return response.json().then(json => {
        if (response.ok) {
            return json;
        } else {
            return Promise.reject(
                Object.assign({}, json, {
                    status: response.status,
                    statusText: response.statusText
                })
            );
        }
    });
};

const handleTextResponse = response => {
    return response.text().then(text => {
        if (response.ok) {
            return text;
        } else {
            return Promise.reject({
                status: response.status,
                statusText: response.statusText,
                err: text
            });
        }
    });
};

const handleResponse = response => {
    let contentType = response.headers.get("content-type");
    if (contentType.includes("application/json")) {
        return handleJSONResponse(response);
    } else if (contentType.includes("text/html")) {
               return handleTextResponse(response);
           } else {
               throw new Error(`Sorry, content-type ${contentType} not supported`);
           }
};

fetch("/api/rooms")
    .then(handleResponse)
    .then(rooms => {
        roomId = rooms[0].id;
        getMessages();
        rooms.forEach((room, index) => {
            const a = createElementFromHTML(
                `<a href='#' data-room-id='${
                    room.id
                }' class='room list-group-item'>${room.name}</a>`
            );
            document.querySelector("#rooms").appendChild(a);
        });
    })
    .catch(error => console.log(error));

document.querySelector("#post").addEventListener("click", () => {
    const message = { text: document.querySelector("#message").value };
    fetch(`/api/rooms/${roomId}/messages`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(message)
    })
        .then(handleResponse)
        .then(() => {
            document.querySelector("#message").value = "";
            getMessages();
        })
        .catch(error => console.log(error));
});

document.body.addEventListener("click", event => {
    if (event.target.classList.contains('room')) {
        roomId = event.target.getAttribute("data-room-id");
        getMessages();
    }
});

document.querySelector("#delete").addEventListener("click", () => {
    fetch(`/api/rooms/${roomId}/messages`, {
        method: "delete"
    })
        .then(handleResponse)
        .then((document.querySelector("#messages").textContent = ""))
        .catch(error => console.log(error));
});
