// ==UserScript==
// @name         Popsauce blur blind mode
// @namespace    https://github.com/wlalswjd
// @version      0.0.4
// @description  popsauce blur blind mode
// @author       este
// @match        *.jklm.fun/games/popsauce/
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const blurBlindArea = document.createElement('div');
    blurBlindArea.innerHTML = `
<div class="blur-mode" style="display: flex; justify-content: center; align-items: center; gap: 8px;">
<label for="blind"><input id="blind" type="checkbox" style="margin-right: 8px; transform: scale(1.5);">Blind mode, </label>
<span>Blur mode: </span>
<input id="blur-range" type="range" value="0" min="0" max="50" step="10">
<span style="width:55px;" class="blurValue">0px</span>
<button type="button" id="reset" style="border-radius: 50%; padding: 0 6px; font-size: 20px;">↻</button>
</div>
`

    const quickRules = document.querySelector(".quickRules");
    quickRules.parentNode.insertBefore(blurBlindArea, quickRules.nextSibling);
    const image = document.querySelector(".image");
    const text = document.querySelector(".darkScrollbar.textScroll");
    const blurValue = document.querySelector(".blurValue");

    const blind = document.querySelector("#blind");
    const blurRange = document.querySelector("#blur-range");
    const reset = document.querySelector("#reset");

    blurRange.addEventListener("change", () => {
        const value = blurRange.value;
        image.setAttribute("style", "filter: blur(" + value + "px);");
        text.setAttribute("style", "filter: blur(" + value + "px);");
        blurValue.textContent = value + "px";
        blind.checked = false;
    });

    blind.addEventListener("change", () => {
        if (blind.checked) {
            blurRange.value = 0;
            blurValue.textContent = "0px";
            image.setAttribute("style", "opacity: 0;");
            text.setAttribute("style", "opacity: 0;");
        } else {
            image.removeAttribute("style");
            text.removeAttribute("style");
        }
    });

    reset.addEventListener("click", () => {
        blind.checked = false;
        blurRange.value = 0;
        blurValue.textContent = "0px";
        image.removeAttribute("style");
        text.removeAttribute("style");
    });
})();