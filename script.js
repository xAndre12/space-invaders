const rows = document.querySelectorAll(".row");
const spaceShip = document.querySelector(".space-ship");
const body = document.querySelector("body");
const motherShip = document.querySelector(".mother-ship");
const gameOverwrapper = document.querySelector(".game-over-wrapper")
const retry = document.querySelector(".retry");
const win = document.querySelector(".win");

spaceShip.style.bottom = "30px";
spaceShip.style.left = "50%";
motherShip.style.left = "50%";
motherShip.style.bottom = "450px";

let points = 0;
let touch = false;
let press = false;

for (let i = 0; i < rows.length; i++) {
  let left = 4;
  for (let j = 0; j < 15; j++) {
    const alien = document.createElement("img");
    const wrapper = document.createElement("div");
    wrapper.classList.add("alien-wrapper");
    alien.src = "./img/alien.png";
    alien.classList.add("alien");
    wrapper.style.left = left + "%";
    wrapper.style.bottom =
      parseInt(motherShip.style.bottom) + 100 * (rows.length - 1 - i) + "px";
    left = left + 6;
    wrapper.appendChild(alien);
    rows[i].appendChild(wrapper);
  }
}

const aliensMove = () => {
  for (let i = 1; i <= 2; i++) {
    setTimeout(() => {
      motherShip.style.left = parseInt(motherShip.style.left) + 2 + "%";
      for (let i = 0; i < rows.length; i++) {
        rows[i].querySelectorAll(".alien-wrapper").forEach((item) => {
          item.style.left = parseInt(item.style.left) + 1 + "%";
          if (item.querySelector("img")) {
            item.querySelector("img").style.left = item.style.left;
          }
        });
      }
    }, i * 1000);
  }
  setTimeout(() => {
    for (let i = 1; i <= 3; i++) {
      setTimeout(() => {
        motherShip.style.left = parseInt(motherShip.style.left) - 2 + "%";
        for (let i = 0; i < rows.length; i++) {
          rows[i].querySelectorAll(".alien-wrapper").forEach((item) => {
            item.style.left = parseInt(item.style.left) - 1 + "%";
            if (item.querySelector("img")) {
              item.querySelector("img").style.left = item.style.left;
            }
          });
        }
      }, i * 1000);
    }
  }, 2000);
  setTimeout(() => {
    motherShip.style.left = parseInt(motherShip.style.left) + 2 + "%";
    for (let i = 0; i < rows.length; i++) {
      rows[i].querySelectorAll(".alien-wrapper").forEach((item) => {
        item.style.left = parseInt(item.style.left) + 1 + "%";
        if (item.querySelector("img")) {
          item.querySelector("img").style.left = item.style.left;
        }
      });
    }
  }, 6000);
  setTimeout(() => {
    motherShip.style.bottom = parseInt(motherShip.style.bottom) - 50 + "px";
    for (let i = 0; i < rows.length; i++) {
      rows[i].querySelectorAll(".alien-wrapper").forEach((item) => {
        item.style.bottom =
          parseInt(motherShip.style.bottom) +
          100 * (rows.length - 1 - i) +
          "px";
        if (item.querySelector("img")) {
          item.querySelector("img").style.bottom = item.style.bottom;
        }
      });
    }
    if(!touch){
      aliensMove();
    }
  }, 7500);

  const spaceShipTouch = setInterval(() => {
    for (let i = 0; i < rows.length; i++) {
      const aliensWrapper = rows[i].querySelectorAll(".alien-wrapper");
      for (let j = 0; j < aliensWrapper.length; j++) {
        if (
          parseInt(aliensWrapper[j].style.bottom) - 10 <
            parseInt(spaceShip.style.bottom) &&
          parseInt(spaceShip.style.left) >
            parseInt(aliensWrapper[j].style.left) &&
          j === aliensWrapper.length - 1
        ) {
          if (!aliensWrapper[j].getAttribute("touch")) {
            aliensWrapper[j].setAttribute("touch", true);
            document.body.removeChild(spaceShip);
            gameOverwrapper.style.display = "flex";
            touch = true;
          }
        }

        if (
          parseInt(aliensWrapper[j].style.bottom) - 100 <
            parseInt(spaceShip.style.bottom) &&
          parseInt(spaceShip.style.left) >
            parseInt(aliensWrapper[j].style.left) &&
          parseInt(spaceShip.style.left) <
            parseInt(aliensWrapper[j + 1].style.left)
        ) {
          if (!aliensWrapper[j].getAttribute("touch")) {
            aliensWrapper[j].setAttribute("touch", true);
            document.body.removeChild(spaceShip);
            gameOverwrapper.style.display = "flex";
            touch = true;
          }
        }
        if (aliensWrapper[j].querySelector("img")) {
          if (
            parseInt(aliensWrapper[j].querySelector("img").style.bottom) < 100
          ) {
            console.log("you lost");
            clearInterval(spaceShipTouch);
            gameOverwrapper.style.display = "flex";
            touch = true;
          }
        }
      }
    }
  });
};

const misleMove = (misle) => {
  const move = setInterval(() => {
    misle.style.bottom = parseInt(misle.style.bottom) + 10 + "px";
    if (aliensTouch(misle) === true) {
      clearInterval(move);
    }
  }, 10);
};

const aliensTouch = (misle) => {
  for (let i = 0; i < rows.length; i++) {
    const aliensWrapper = rows[i].querySelectorAll(".alien-wrapper");
    for (let j = 0; j < aliensWrapper.length; j++) {
      if (
        parseInt(aliensWrapper[j].style.bottom) - 10 <
          parseInt(misle.style.bottom) &&
        parseInt(misle.style.left) > parseInt(aliensWrapper[j].style.left) &&
        j === aliensWrapper.length - 1
      ) {
        rows[i]
          .querySelectorAll(".alien-wrapper")
          [j].removeChild(aliensWrapper[j].querySelector(".alien"));
        document.body.removeChild(misle);
        points++;
        if(points === 60){
          win.style.display = "flex";
        }
        return true;
      }

      if (
        parseInt(aliensWrapper[j].style.bottom) - 10 <
          parseInt(misle.style.bottom) &&
        parseInt(misle.style.left) > parseInt(aliensWrapper[j].style.left) &&
        parseInt(misle.style.left) < parseInt(aliensWrapper[j + 1].style.left)
      ) {
        if (!aliensWrapper[j].getAttribute("touch")) {
          aliensWrapper[j].setAttribute("touch", true);
          aliensWrapper[j].removeChild(
            aliensWrapper[j].querySelector(".alien")
          );
          document.body.removeChild(misle);
          points++;
          if(points === 60){
            win.style.display = "flex";
          }
          return true;
        }
      }
    }
  }
};

window.addEventListener("keypress", (event) => {
  if (event.key === " " && press === false) {
    press = true;
    const misle = document.createElement("div");
    misle.classList.add("misle");
    misle.style.bottom = parseInt(spaceShip.style.bottom) + 100 + "px";
    misle.style.left = parseInt(spaceShip.style.left) - 0.2 + "%";
    misleMove(misle);
    body.appendChild(misle);
  }
  if (event.key === "w") {
    spaceShip.style.bottom = parseInt(spaceShip.style.bottom) + 20 + "px";
  }
  if (event.key === "s") {
    spaceShip.style.bottom = parseInt(spaceShip.style.bottom) - 20 + "px";
  }
  if (event.key === "a") {
    spaceShip.style.left = parseInt(spaceShip.style.left) - 1 + "%";
  }
  if (event.key === "d") {
    spaceShip.style.left = parseInt(spaceShip.style.left) + 1 + "%";
  }
});

window.addEventListener("keyup", (event) => {
  if (event.key === " ") {
    press = false;
  }
});
retry.addEventListener("click", () =>{
gameOverwrapper.style.display = "none";
spaceShip.style.bottom = "30px";
spaceShip.style.left = "50%";
document.body.appendChild(spaceShip);
})

aliensMove()