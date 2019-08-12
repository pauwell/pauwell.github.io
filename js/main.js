/*! pauwel-io | MIT License | https://github.com/pauwell/pauwell.github.io */
"use strict";

// Remove `js-enabled`-node to signal that javascript is enabled.
document.getElementById("js-disabled").remove();

// Get navbar.
let navbar = document.getElementsByTagName("nav")[0];

// Get content-blocks.
let contentHome = document.getElementById("content-home");
let contentTiny = document.getElementById("content-tinytemplates");
let contentChip = document.getElementById("content-chip8");
let contentDownload = document.getElementById("content-download");

// Get navbar-buttons.
let buttonContentHome = navbar.querySelector("a[for=content-home]");
let buttonContentTiny = navbar.querySelector("a[for=content-tinytemplates]");
let buttonContentChip = navbar.querySelector("a[for=content-chip8]");
let buttonContentDownload = navbar.querySelector("a[for=content-download]");
let buttonMenuIcon = document.querySelector(".menu-icon");

// Open the navbar menu.
function toggleMenu() {
  buttonMenuIcon.classList.toggle("change");

  buttonContentHome.classList.toggle("hidden");
  buttonContentTiny.classList.toggle("hidden");
  buttonContentChip.classList.toggle("hidden");
  buttonContentDownload.classList.toggle("hidden");
}

// Add sticky class to navbar when its scrolled down.
window.addEventListener("scroll", function() {
  if (window.pageYOffset >= navbar.offsetTop) {
    navbar.classList.add("sticky");
    buttonMenuIcon.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
    buttonMenuIcon.classList.remove("sticky");
  }
});

// Show `home`-content on startup.
window.addEventListener("load", function() {
  hideContent();
  contentHome.style.display = "block";
});

// Hide every content block.
function hideContent() {
  contentHome.style.display = "none";
  contentTiny.style.display = "none";
  contentChip.style.display = "none";
  contentDownload.style.display = "none";

  buttonMenuIcon.classList.remove("change");

  buttonContentHome.classList.add("hidden");
  buttonContentTiny.classList.add("hidden");
  buttonContentChip.classList.add("hidden");
  buttonContentDownload.classList.add("hidden");
}

// Show `home`-content.
buttonContentHome.addEventListener("click", function() {
  hideContent();
  contentHome.style.display = "block";
});
// Show `tinytemplates`-content.
buttonContentTiny.addEventListener("click", function() {
  hideContent();
  contentTiny.style.display = "block";
});
// Show `chip8`-content.
buttonContentChip.addEventListener("click", function() {
  hideContent();
  contentChip.style.display = "block";
});
// Show `downloads`-content.
buttonContentDownload.addEventListener("click", function() {
  hideContent();
  contentDownload.style.display = "block";
});

// Handle click on menu-icon.
buttonMenuIcon.addEventListener("click", function() {
  toggleMenu();
});

// Tiny Templates example.
let tinyCounter = new TinyTemplate(
  // Name
  "counter",
  {
    // State
    number: 0
  },
  {
    // Methods
    increaseNumber: function() {
      this.changeState({ number: this.getState("number") + 1 });
    },
    reset: function() {
      this.changeState({ number: 0 });
    }
  }, // Template-view
  /*html*/ `<div class="counter">
      <fieldset>
        <legend><b>Counter</b></legend>
        <p>Counting: {{number}}</p>
        <button on-event="onclick" call="increaseNumber">Increment</button>
        <button on-event="onclick" call="reset">Reset</button>
      </fieldset>
    </div>`
);

// Mount the template to a root node to add it to the DOM.
tinyCounter.mount(document.getElementById("tinytemplates-example"));

// Chip-8 script example.
let c8sdemo = null;
let demo_node = document.querySelector("#c8s-example");

let run_demo = function() {
  if (demo_node.hasChildNodes()) demo_node.removeChild(demo_node.firstChild);

  c8sdemo = new GDemo("#c8s-example");

  c8sdemo
    .openApp("editor", { minHeight: "350px", windowTitle: "demo.c8s" })
    .write(
      `
VAR a = 1
FOR i=4 TO 10 STEP 2:
  IF a==1:
    a+=2
  ENDIF
  a += 1
ENDFOR
`,
      { onCompleteDelay: 2000 }
    )
    .openApp("terminal", { minHeight: "350px", promptString: "$" })
    .command("c8s-compiler ./demo.c8s rom-output", { onCompleteDelay: 500 })
    .respond("Compiler finished with 0 errors and 0 warnings!")
    .command("od -t x1 rom-output", { onCompleteDelay: 500 })
    .respond(
      `
0000000 60 01 61 04 62 0a 63 02 30 01 12 0e 70 02 70 01
0000020 81 34 51 24 12 08
0000030
`
    )
    .command("")
    .end();
};

run_demo();
setInterval(run_demo, 24000);
