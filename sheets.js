const output = document.querySelector(".output");
const outputDiv = document.querySelector(".outputDiv");

let usernameValue = localStorage.getItem('user-name');
let passwordValue = localStorage.getItem('pass-word');
let qu = localStorage.getItem('quValue');



/* TABLA Y RECOPILACIÓN DE EXCEL*/
const sheetID = "13mtjme2h2Tw4bNdHW_11x48h_Hl5w99_whcvTz3M8i0";
const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`;
const sheetName = "vals";
const query = encodeURIComponent(qu);
const url = `${base}&sheet=${sheetName}&tq=${query}`;
const data = [];
document.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("ready");
  fetch(url)
    .then((res) => res.text())
    .then((rep) => {
      //console.log(rep);
      const jsData = JSON.parse(rep.substr(47).slice(0, -2));
      console.log(jsData);
      const colz = [];
      jsData.table.cols.forEach((heading) => {
        if (heading.label) {
          colz.push(heading.label.toLowerCase().replace(/\s/g, ""));
        }
      });
      jsData.table.rows.forEach((main) => {
        //console.log(main);
        const row = {};
        colz.forEach((ele, ind) => {
          //console.log(ele);
          row[ele] = main.c[ind] != null ? main.c[ind].v : "";
        });
        data.push(row);
      });
      maker(data);
    });
}

function maker(json) {
  const div = document.createElement("div");
  div.style.display = "grid";

  output.append(div);
  let first = true;
  json.forEach((el) => {
    //console.log(ele);
    const keys = Object.keys(el);
    div.style.gridTemplateColumns = `repeat(${keys.length} ,1fr)`;
    if (first) {
      first = false;
      keys.forEach((heading) => {
        const ele = document.createElement("div");
        ele.textContent = heading.toUpperCase();
        ele.style.background = "#ba1733";
        ele.style.color = "white";
        div.append(ele);
      });
    }
    keys.forEach((key) => {
      const ele = document.createElement("div");
      ele.style.border = "1px dashed #ba1733";
      ele.textContent = el[key];
      div.append(ele);
    });
    console.log(keys);
  });
}


/*========== PANEL SELECCIÓN COLE Y MONITOR ====================*/

const selectedAll = document.querySelectorAll(".wrapper-dropdown");

selectedAll.forEach((selected) => {
  const optionsContainer = selected.children[2];
  const optionsList = selected.querySelectorAll("div.wrapper-dropdown li");

  selected.addEventListener("click", () => {
    let arrow = selected.children[1];

    if (selected.classList.contains("active")) {
      handleDropdown(selected, arrow, false);
    } else {
      let currentActive = document.querySelector(".wrapper-dropdown.active");

      if (currentActive) {
        let anotherArrow = currentActive.children[1];
        handleDropdown(currentActive, anotherArrow, false);
      }

      handleDropdown(selected, arrow, true);
    }
  });

  // update the display of the dropdown
  for (let o of optionsList) {
    o.addEventListener("click", () => {
      selected.querySelector(".selected-display").innerHTML = o.innerHTML;
    });
  }
});

// check if anything else ofther than the dropdown is clicked
window.addEventListener("click", function (e) {
  if (e.target.closest(".wrapper-dropdown") === null) {
    closeAllDropdowns();
  }
});

// close all the dropdowns
function closeAllDropdowns() {
  const selectedAll = document.querySelectorAll(".wrapper-dropdown");
  selectedAll.forEach((selected) => {
    const optionsContainer = selected.children[2];
    let arrow = selected.children[1];

    handleDropdown(selected, arrow, false);
  });
}

// open all the dropdowns
function handleDropdown(dropdown, arrow, open) {
  if (open) {
    arrow.classList.add("rotated");
    dropdown.classList.add("active");
  } else {
    arrow.classList.remove("rotated");
    dropdown.classList.remove("active");
  }
}


