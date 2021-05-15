let map;

/* Locations markers on the map. Format : { lat : number, lng : number} */
const locations = [];

let cards = document.querySelectorAll(".card");
cards.forEach((val, index) => {
    const lat = val.dataset.lat;
    const lng = val.dataset.lng;
    const obj = {
        lat: Number(lat),
        lng: Number(lng),
    };
    // console.log(val.dataset);
    locations.push(obj);
});

function initMap() {
    const brt = {
        lat: 26.56391,
        lng: 87.154312,
    };

    // Initate first marker on map with zoom
    map = new google.maps.Map(document.getElementById("gmap"), {
        center: brt,
        zoom: 4,
    });

    // Initiate marker cluster on map
    const marker = new google.maps.Marker({
        position: brt,
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
    });

    // on click animate marker
    marker.addListener("click", toggleBounce);

    //function to animate marker
    function toggleBounce() {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    }

    // const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // Loop for each marker in locations array
    const markers = locations.map((location, i) => {
        return new google.maps.Marker({
            position: location,
            animation: google.maps.Animation.DROP,
            // label: labels[i % labels.length],
        });
    });

    // Add a marker clusterer image to manage the markers.
    new MarkerClusterer(map, markers, {
        imagePath:
            "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
    });
}

const list = document.querySelectorAll("ul li.list");

const aR = (id) => {
    const allCards = document.querySelector("#cards");
    const xhr = new XMLHttpRequest();

    if (id) {
        xhr.open("GET", `ajax${id}.html`, true);
    }else{
        xhr.open("GET", `ajax.html`, true);
    }
    xhr.addEventListener("load", function () {
        const allHTML = this.responseText;
        // allHTML.querySelectorAll(`[data-modifier="${dataId}"]`);
        allCards.innerHTML = this.responseText;
    });

    xhr.send();
};

list.forEach((tal) => {
    tal.addEventListener("click", (val) => {
        const dataId = Number(val.target.dataset.id);

        aR(dataId);

        // cards.forEach(
        //     (cardall) => {
        //         cardall.classList.remove("d-none");
        //     }
        // );
        // const dataId = Number(val.target.dataset.id);

        // const newCards = Array.from(cards);
        // const removeCard = document.querySelectorAll(`[data-modifier="${dataId}"]`);

        // const filtered = newCards.filter((card) => {
        //     return Number(card.dataset.modifier) !== dataId;
        // });

        // filtered.forEach((card) => {
        //     card.classList.add("d-none");
        // });
    });
});

const reset = document.querySelector("[data-id='reset']");

reset.addEventListener("click", () => {
    // cards.forEach(
    //     (cardall) => {
    //         cardall.classList.remove("d-none");
    //     }
    // );

    aR();
});
