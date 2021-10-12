let displayimg = document.getElementById("display"), PHOTO = document.getElementById('p1'), LIST = document.getElementById("l1");

const FAVORATE = [
    "images/img1.png", "images/img2.png",
    "images/img3.png", "images/img4.png",
    "images/img5.png", "images/img6.png",
    "images/img7.png", "images/img8.png"
];
const PET = [
    "images/img10.jpg", "images/img11.jpg",
    "images/img12.jpg", "images/img13.jpg",
    "images/img14.jpg", "images/img15.jpg",
    "images/img16.jpg", "images/img17.jpg",
]
const P = [
    "p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"
];

let P1 = document.getElementById("p1"), P2 = document.getElementById("p2"), P3 = document.getElementById("p3"), P4 = document.getElementById("p4"),
    P5 = document.getElementById("p5"), P6 = document.getElementById("p6"), P7 = document.getElementById("p7"), P8 = document.getElementById("p8");
const current = [
    "images/img1.png", "images/img2.png",
    "images/img3.png", "images/img4.png",
    "images/img5.png", "images/img6.png",
    "images/img7.png", "images/img8.png"
];
function initial() {
    displayimg.src = FAVORATE[0];
    PHOTO.classList.add("photo_chosen");
    LIST.classList.add("list_chosen");
    P1.src = current[0];
    P2.src = current[1];
    P3.src = current[2];
    P4.src = current[3];
    P5.src = current[4];
    P6.src = current[5];
    P7.src = current[6];
    P8.src = current[7];
}

function showimg(Img) {
    PHOTO.classList.remove("photo_chosen");
    displayimg.src = current[Img];
    PHOTO = document.getElementById(P[Img]);
    PHOTO.classList.add("photo_chosen");
}

function changelist(id) {
    LIST.classList.remove("list_chosen");
    LIST = document.getElementById(id);
    LIST.classList.add("list_chosen");
}
function change2Fav() {
    for (var i = 0; i < FAVORATE.length; i++) {
        current[i] = FAVORATE[i];
    }
    P1.src = current[0];
    P2.src = current[1];
    P3.src = current[2];
    P4.src = current[3];
    P5.src = current[4];
    P6.src = current[5];
    P7.src = current[6];
    P8.src = current[7];
}
function change2Pet() {
    for (var i = 0; i < PET.length; i++) {
        current[i] = PET[i];
    }
    P1.src = current[0];
    P2.src = current[1];
    P3.src = current[2];
    P4.src = current[3];
    P5.src = current[4];
    P6.src = current[5];
    P7.src = current[6];
    P8.src = current[7];
}
initial();
