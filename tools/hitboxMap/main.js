import Engine from "../../core/Engine.js";
import Hitbox from "../../core/Hitbox.js";
import GameObject from "../../core/objects/GameObject.js";

let count = 0;

class HitboxFull {
  constructor() {
    count++;
    this.box = new Hitbox({
      position: { x: 0, y: 0 },
      width: 100,
      height: 100,
    });

    this.html = `
    <div class="box">
      <input type="number" min="0" id="x" value="0" />
      <input type="number" min="0" id="y" value="0" />
      <input type="number" min="0" id="w" value="100" />
      <input type="number" min="0" id="h"  value="100"/>
    </div>`;

    this.dom = document.createElement("div");
    this.dom.classList.add("Box");
    this.dom.innerHTML = this.html;
    document.body.appendChild(this.dom);

    this.code = `
    new Hitbox({
      position:{x: ${this.dom.querySelector("#x").value}, y: ${
      this.dom.querySelector("#y").value
    }},
      width: ${this.dom.querySelector("#w").value},
      height: ${this.dom.querySelector("#h").value},
    })
    `;
  }

  UpdateCode() {
    this.code = `
    new Hitbox({
      position:{x: ${this.dom.querySelector("#x").value}, y: ${
      this.dom.querySelector("#y").value
    }},
      width: ${this.dom.querySelector("#w").value},
      height: ${this.dom.querySelector("#h").value},
    })
    `;
  }

  Render() {
    this.UpdateCode();
    this.box.position.x = this.dom.querySelector("#x").value;
    this.box.position.y = this.dom.querySelector("#y").value;
    this.box.width = this.dom.querySelector("#w").value;
    this.box.height = this.dom.querySelector("#h").value;
    this.box.Render();
  }
}

const engine = new Engine(1024, 576);
const box = [];
const get = document.querySelector("#get");

//Loading map
const loadMapButton = document.querySelector("#load");
loadMapButton.onclick = () => {
  let fileInput = document.querySelector("#file");

  fileInput.click();

  fileInput.onchange = () => {
    const files = fileInput.files;

    // FileReader support
    if (FileReader && files && files.length) {
      const fr = new FileReader();
      fr.onload = () => {
        // let sprite = new GameObject({
        //   position: { x: 0, y: 0 },
        //   src: fr.result,
        // });
        // engine.RenderGameObject(sprite);
      };

      fr.readAsDataURL(files[0]);
    }
  };
}; //TODO: Add map on file selection

let sprite = new GameObject({
  position: { x: 0, y: 0 },
  src: "/assets/background.png",
});

//Create boxes
const createBtn = document.querySelector("#create");
createBtn.onclick = () => {
  box.push(new HitboxFull());
};

engine.RenderGameObject(sprite);

let boxesCode = "";
let finalCode = `
    const boxes = [
        
    ]
`;

function UpdateCode() {
  boxesCode = "";

  box.forEach(b => {
    boxesCode += b.code;
  });

  finalCode = `
    const boxes = [
        ${boxesCode}
    ]
`;

  const link = document.createElement("a");
  const file = new Blob([finalCode], { type: "text/plain" });

  // Add file content in the object URL
  link.href = URL.createObjectURL(file);

  // Add file name
  link.download = "gameObject.txt";

  // Add click event to <a> tag to save file.
  link.click();
  URL.revokeObjectURL(link.href);
}

engine.AddLoopCode(() => {
  box.forEach(b => {
    b.Render();
  });
});

get.onclick = () => {
  UpdateCode();
};

engine.Init();
