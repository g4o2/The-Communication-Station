const year = new Date().getFullYear();
document.getElementById("footer-year").innerHTML = year;


function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/'/g, "&#x27;")
        .replace(/"/g, "&quot;");
}

class Message {
    constructor(username, date, message) {
        this.username = username;
        this.date = date;
        this.message = message;
        this.localDate = new Date(this.date.toLocaleString())
    }
    appendMessage() {
        const div = document.createElement("div");
        div.classList.add("message-container");

        const img = document.createElement("img");
        img.classList.add("message-sender-pfp");
        img.setAttribute("src", "./assets/images/default-user.png");
        img.setAttribute("alt", `Profile picture for ${this.username}`);

        const messageContentDiv = document.createElement("div");
        messageContentDiv.classList.add("message-content");

        const messageHeaderDiv = document.createElement("div");
        messageHeaderDiv.classList.add("message-header");

        const messageSenderSpan = document.createElement("span");
        messageSenderSpan.classList.add("message-sender");
        messageSenderSpan.innerText = this.username.concat(" ");

        const messageDateTime = document.createElement("time");
        messageDateTime.classList.add("message-datetime");
        messageDateTime.setAttribute("datetime", this.localDate);
        messageDateTime.innerText = this.localDate;

        messageHeaderDiv.appendChild(messageSenderSpan);
        messageHeaderDiv.appendChild(messageDateTime);

        const messageBodyDiv = document.createElement("div");
        messageBodyDiv.classList.add("message-body");

        const messageSpan = document.createElement("span");
        messageSpan.classList.add("message");
        messageSpan.innerText = escapeHtml(this.message);

        messageBodyDiv.appendChild(messageSpan);

        messageContentDiv.appendChild(messageHeaderDiv);
        messageContentDiv.appendChild(messageBodyDiv);

        div.appendChild(img);
        div.appendChild(messageContentDiv);

        document.getElementById('messages').appendChild(div);
    }
}
class User {
    constructor(username) {
        this.username = username
    }
    addUserToUsers() {
        const liElement = document.createElement("li");

        const imgElement = document.createElement("img");
        imgElement.setAttribute("src", "./assets/images/default-user.png");
        imgElement.setAttribute("alt", `Profile picture for ${this.username}`);

        const spanElement = document.createElement("span");
        spanElement.textContent = this.username;

        liElement.appendChild(imgElement);
        liElement.appendChild(spanElement);

        document.getElementById("users").appendChild(liElement);
    }
    addUserToMessages() {
        const pElement = document.createElement("p");
        pElement.textContent = `User ${this.username} connected`;
        document.getElementById("messages").appendChild(pElement);
    }
}