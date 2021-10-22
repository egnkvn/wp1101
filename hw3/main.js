let inputValue;
let ROOT = document.getElementById("root");
let LIST = document.getElementById("todo-list");
let total = document.createElement("div");
let numoflist = 0;
let index = 0;
let ALL = [];
let ACTIVE = [];
let COMPLETED = [];
let num_of_completed = 0;
class ITEM {
    constructor(text, index) {
        let ID = index;
        this.node = document.createElement("li");
        this.node.className = "todo-app__item";
        let checkbox = document.createElement("div");
        let detail = document.createElement("h1");
        let IMG = document.createElement("img");
        checkbox.className = "todo-app__checkbox";
        let LABEL = document.createElement("label");
        let INPUT = document.createElement("input");
        INPUT.type = "checkbox";
        INPUT.id = index;
        LABEL.htmlFor = index;
        checkbox.appendChild(INPUT);
        checkbox.appendChild(LABEL);
        let status = 0;
        LABEL.onclick = function () {
            if (status === 0) {
                detail.style = "text-decoration: line-through; opacity: 0.5;"; status = 1;
                total.textContent = `${--numoflist} left`;
                ACTIVE[ID] = null;
                COMPLETED[ID] = ALL[ID];
                num_of_completed++;
            }
            else {
                detail.removeAttribute("style"); status = 0;
                total.textContent = `${++numoflist} left`;
                COMPLETED[ID] = null;
                ACTIVE[ID] = ALL[ID];
                num_of_completed--;
            }
            if (num_of_completed != 0) {
                ROOT.lastChild.lastChild.firstChild.style.display = "block";
            }
            else if (num_of_completed == 0) {
                ROOT.lastChild.lastChild.firstChild.style.display = "none";
            }
        };
        detail.className = "todo-app__item-detail";
        detail.innerHTML = text;
        IMG.src = "img/x.png";
        IMG.className = "todo-app__item-x";
        IMG.onclick = function () {
            LIST.removeChild(ALL[ID]);
            ALL[ID] = null;
            ACTIVE[ID] = null;
            COMPLETED[ID] = null;
            if (status === 0)
                total.textContent = `${--numoflist} left`;
            if (status === 1)
                num_of_completed--;
            if (numoflist === 0)
                ROOT.removeChild(ROOT.lastChild);
            if (num_of_completed == 0) {
                ROOT.lastChild.lastChild.firstChild.style.display = "none";
            }
        };
        this.node.appendChild(checkbox);
        this.node.appendChild(detail);
        this.node.appendChild(IMG);
    }
    get inode() { return this.node; }
}

class FOOT {
    constructor(num) {
        this.node = document.createElement("footer");
        this.node.className = "todo-app__footer";
        let viewBtn = document.createElement("ul");
        let clean = document.createElement("div");
        total.className = "todo-app__total";
        viewBtn.className = "todo-app__view-buttons";
        clean.className = "todo-app__clean";
        total.textContent = `${num} left`;
        let All = document.createElement("button");
        let Active = document.createElement("button");
        let Completed = document.createElement("button");
        All.className = "todo-app__view-buttons";
        All.innerHTML = "All";
        All.onclick = function () {
            while (LIST.firstChild) {
                LIST.removeChild(LIST.firstChild);
            }
            for (let i = 1; i < ALL.length; i++) {
                if (ALL[i] != null)
                    LIST.appendChild(ALL[i]);
            }
        };
        Active.className = "todo-app__view-buttons";
        Active.innerHTML = "Active";
        Active.onclick = function () {
            while (LIST.firstChild) {
                LIST.removeChild(LIST.firstChild);
            }
            for (let i = 1; i < ACTIVE.length; i++) {
                if (ACTIVE[i] != null)
                    LIST.appendChild(ACTIVE[i]);
            }
        }
        Completed.className = "todo-app__view-buttons";
        Completed.innerHTML = "Completed";
        Completed.onclick = function () {
            while (LIST.firstChild) {
                LIST.removeChild(LIST.firstChild);
            }
            for (let i = 1; i < COMPLETED.length; i++) {
                if (COMPLETED[i] != null)
                    LIST.appendChild(COMPLETED[i]);
            }
        }
        viewBtn.appendChild(All);
        viewBtn.appendChild(Active);
        viewBtn.appendChild(Completed);
        let Clear = document.createElement("button");
        Clear.innerHTML = "Clear completed";
        Clear.className = "todo-app__clean";
        Clear.onclick = function () {
            while (LIST.firstChild) {
                LIST.removeChild(LIST.firstChild);
            }
            for (let i = 1; i < ACTIVE.length; i++) {
                if (ACTIVE[i] != null)
                    LIST.appendChild(ACTIVE[i]);
            }
            for (let i = 1; i < COMPLETED.length; i++) {
                if (COMPLETED[i] != null) {
                    ALL[i] = null;
                    COMPLETED[i] = null;
                    num_of_completed--;
                }
            }
            ROOT.lastChild.lastChild.firstChild.style.display = "none";
            if (numoflist === 0)
                ROOT.removeChild(ROOT.lastChild);
        }
        Clear.style.display = "none";
        clean.appendChild(Clear);
        this.node.appendChild(total);
        this.node.appendChild(viewBtn);
        this.node.appendChild(clean);

    }
    get fnode() { return this.node; }
}

function Addlist(event) {
    let x = event.keyCode;
    if (x === 13) {
        inputValue = document.getElementById("INPUT").value;
        if (inputValue != '') {
            numoflist++;
            index++;
            if (ROOT.childElementCount == 2) { ROOT.appendChild(new FOOT(numoflist).fnode); }
            total.textContent = `${numoflist} left`;
            ALL[index] = new ITEM(inputValue, index).inode;
            ACTIVE[index] = ALL[index];
            LIST.appendChild(ALL[index]);
            document.getElementById("INPUT").value = "";
        }
    }
}