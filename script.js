let ships = [];

const modal = document.getElementById("modal");
const createBtn = document.getElementById("create-btn");
const closeModal = document.getElementById("close-modal");
const shipForm = document.getElementById("ship-form");
const shipListContainer = document.getElementById("ships");
const totalPriceElement = document.getElementById("total-price");

let editShipId = null;

createBtn.onclick = function() {
    document.getElementById("modal-title").innerText = "Create Ship";
    shipForm.reset();
    editShipId = null;
    modal.style.display = "block";
}

closeModal.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

function saveShip() {
    const shipName = document.getElementById("ship-name").value;
    const shipPrice = parseFloat(document.getElementById("ship-price").value);
    const shipPassengers = parseInt(document.getElementById("ship-passengers").value);
    const shipTonnage = parseFloat(document.getElementById("ship-tonnage").value);

    if (shipName && shipPrice && shipPassengers && shipTonnage) {
        if (editShipId !== null) {
            const shipIndex = ships.findIndex(ship => ship.id === editShipId);
            ships[shipIndex] = { id: editShipId, name: shipName, price: shipPrice, passengers: shipPassengers, tonnage: shipTonnage };
        } else {
            const newShip = {
                id: Date.now(),
                name: shipName,
                price: shipPrice,
                passengers: shipPassengers,
                tonnage: shipTonnage
            };
            ships.push(newShip);
        }

        renderShips(ships); 
        modal.style.display = "none";
    } else {
        alert("Please fill in all fields!");
    }
}

function renderShips(shipArray = ships) {
    shipListContainer.innerHTML = "";
    shipArray.forEach(ship => {
        const shipElement = document.createElement("div");
        shipElement.className = "ship-item";
        shipElement.innerHTML = `
            <h3 class="ship-name">${ship.name}</h3>
            <p class="ship-info">Price: $${ship.price}</p>
            <p class="ship-info">Passengers: ${ship.passengers}</p>
            <p class="ship-info">Tonnage: ${ship.tonnage} tons</p>
            <button class="edit-btn" onclick="editShip(${ship.id})">Edit</button>
            <button class="remove-btn" onclick="deleteShip(${ship.id})">Delete</button>
        `;
        shipListContainer.appendChild(shipElement);
    });
}

function editShip(id) {
    const ship = ships.find(ship => ship.id === id);
    if (ship) {
        document.getElementById("modal-title").innerText = "Edit Ship";
        document.getElementById("ship-name").value = ship.name;
        document.getElementById("ship-price").value = ship.price;
        document.getElementById("ship-passengers").value = ship.passengers;
        document.getElementById("ship-tonnage").value = ship.tonnage;
        editShipId = id;
        modal.style.display = "block";
    }
}

function deleteShip(id) {
    ships = ships.filter(ship => ship.id !== id);
    renderShips();
}

function searchShips() {
    const searchInput = document.getElementById("search-input").value.toLowerCase();
    const filteredShips = ships.filter(ship => ship.name.toLowerCase().includes(searchInput));
    renderShips(filteredShips); 
}

function clearSearch() {
    document.getElementById("search-input").value = "";
    renderShips();
}

function sortShips() {
    const sortOption = document.getElementById("sort").value;
    if (sortOption === "price") {
        ships.sort((a, b) => b.price - a.price);
    } else if (sortOption === "passengers") {
        ships.sort((a, b) => b.passengers - a.passengers);
    } else if (sortOption === "tonnage") {
        ships.sort((a, b) => b.tonnage - a.tonnage);
    }
    renderShips();
}

function calculateTotalPrice() {
    const totalPrice = ships.reduce((sum, ship) => sum + ship.price, 0);
    totalPriceElement.innerText = `${totalPrice}$`;
}

window.onload = function() {
    ships = [
        { id: 1, name: "Titanic", price: 5000000, passengers: 2200, tonnage: 52310 },
        { id: 2, name: "Queen Mary", price: 4000000, passengers: 2000, tonnage: 81400 },
        { id: 3, name: "Bismarck", price: 3000000, passengers: 2500, tonnage: 41800 }
    ];
    renderShips();
}
