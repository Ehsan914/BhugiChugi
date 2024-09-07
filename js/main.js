const milestoneData = JSON.parse(data).data;

let milestoneSize = milestoneData.length;
let milestones = document.querySelector('.milestones');

loadMilestone()

function loadMilestone() {
    milestones.innerHTML = `${milestoneData.map(function (milestone) {
        return `<div class="milestone border-b" id = "${milestone._id}">
        <div class="flex">
          <div class="checkbox"><input type="checkbox" onclick = "markMilestone(this, ${milestone._id})"/></div>
          <div onclick = "openMilestone(this, ${milestone._id})">
            <p>
              ${milestone.name}
              <span><i class="fas fa-chevron-down"></i></span>
            </p>
          </div>
        </div>
        <div class="hidden_panel">
          ${milestone.modules.map(function (module) {
            return `<div class="module border-b">
                        <p>${module.name}</p>
                    </div>`;
          })
          .join("")}
        </div>
      </div>`
    }).join("")}`;
}

function openMilestone(milestoneElement, id) {
    const currentPanel = milestoneElement.parentNode.nextElementSibling;
    const showPanel = document.querySelector(".show");
    const active = document.querySelector(".active");
    
    if (active && !milestoneElement.classList.contains('active')) {
        active.classList.remove('active');
    }
    
    milestoneElement.classList.toggle("active");

    if (showPanel && !currentPanel.classList.contains('show')) {
        showPanel.classList.remove('show');
    }

    currentPanel.classList.toggle("show");
    showMilestone(id);
}

function showMilestone(id) {
    const milestoneImage = document.querySelector(".milestoneImage");
    const title = document.querySelector(".title");
    const details = document.querySelector(".details");

    milestoneImage.style.opacity = 0;
    //showImage(id);
    milestoneImage.src = milestoneData[id].image;
    title.textContent = milestoneData[id].name;
    details.textContent = milestoneData[id].description;
}

const milestoneImage = document.querySelector(".milestoneImage");

milestoneImage.onload = function () {
     this.style.opacity = "1";
};

const milestonesList = document.querySelector('.milestones');
const doneArray = [];
//const divs = milestonesList.getElementsByClassName('milestone');
//let divLen = divs.length;
const milestoneArray = Array.from(milestonesList.children);

function markMilestone(checkbox, id) {
    const doneList = document.querySelector('.doneList');
    const value = document.getElementById(id);
    let index = -1;
    if (checkbox.checked) {
        doneArray.push(value);
        index = milestoneArray.indexOf(value);
        milestoneArray.splice(index, 1);
    } else {
        milestoneArray.push(value);
        index = doneArray.indexOf(value);
        doneArray.splice(index, 1);
    }
    doneArray.sort(function(a, b) {
        let compA = Number(a.getAttribute('id'));
        let compB = Number(b.getAttribute('id'));
        return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
    });
    milestoneArray.sort(function(a, b) {
        let compA = Number(a.getAttribute('id'));
        let compB = Number(b.getAttribute('id'));
        return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
    });
    let mLen = milestoneArray.length;
    let dLen = doneArray.length;
    for (let i = 0; i < mLen; i++) {
        milestonesList.appendChild(milestoneArray[i]);
    }
    for (let i = 0; i < dLen; i++) {
        doneList.appendChild(doneArray[i]);
    }
}
