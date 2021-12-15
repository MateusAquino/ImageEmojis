/**
 * @name ImageEmojis
 * @version 0.2.3
 * @source https://raw.githubusercontent.com/MateusAquino/ImageEmojis/master/ImageEmojis.plugin.js
 * @updateUrl https://raw.githubusercontent.com/MateusAquino/ImageEmojis/master/ImageEmojis.plugin.js
 */

module.exports = class ImageEmojis {   
    getName() {return "ImageEmojis"}
    getShortName() {return "ie"}
    getDescription() {return "Unlock every single Discord emoji or sticker as images/gifs. Just Right-Click it."}
    getVersion() {return "0.2.3"}
    getAuthor() {return "Mafios"}
    load() {
        if (window.ZLibrary)
            ZLibrary.PluginUpdater.checkForUpdate(
                this.getName(),
                this.getVersion(),
                "https://raw.githubusercontent.com/MateusAquino/ImageEmojis/master/ImageEmojis.plugin.js"
            );
    }
    start() {
        // Global Styling (Removes grayscale filter from emojis + animations for plugin settings)
        this.style = document.createElement('style');
        this.style.innerHTML = `button[class^='emojiItem'], button[class*=' emojiItem'], div[class^='stickerNode'], div[class*='stickerNode'] { filter: none; -webkit-filter: none; } #ie-svg { -webkit-transition: all 0.1s ease-in-out;-moz-transition: all 0.1s ease-in-out;-ms-transition: all 0.1s ease-in-out;-o-transition: all 0.1s ease-in-out; };`;
        document.head.appendChild(this.style);
    }
    stop() {
        if (this.style && this.style.remove)
            this.style.remove();
    }
    observer(o) {
        const isSticker = o.target.id === "sticker-picker-grid";
        if (["sticker-picker-grid", "emoji-picker-grid"].includes(o.target.id))
            o.target.addEventListener('contextmenu', e => {
                // Get URL of Selected Emoji
                e = e || window.event;
                e = e.target || e.srcElement;
                let url = isSticker ? e.src : e.children[0].src;
                if (!url) return;
                let size = BdApi.loadData('ImageEmojis', 'fixedSize') | 0;
                if (size && !isSticker) url=url.split('?')[0] + `?size=${size}`;
                // Insert url on chat
                let chatInput = this.select('slateTextArea');
                let editor = chatInput[Object.keys(chatInput)[0]].memoizedProps.children.props.editor;
                editor.insertText(url)
                
                // Close Emoji Container
                let emojiBtn = this.select('emojiButton');
                emojiBtn.click();
            });
    }
    select(partialClass) {
        return document.querySelectorAll(`*[class^='${partialClass}'], *[class*=' ${partialClass}']`)[0]
    }
    id(id) {
        return document.getElementById(id);
    }
    getSettingsPanel() {
        let size = BdApi.loadData('ImageEmojis', 'fixedSize') | 0;
        const div = document.createElement('div');
        div.style = `padding: 20px; display:none`;
        let checkboxHTML = `<div class="container-2_Tvc_ da-container"> <div class="labelRow-16e77k da-labelRow"> <label for="ie-check" class="title-31JmR4 da-title" >Fixed Size</label > <div class="control-2BBjec da-control"> <div id="ie-btn" class="container-3auIfb da-container" tabindex="-1" style="opacity: 1; background-color: rgb(67, 181, 129)" > <svg id="ie-svg" class="slider-TkfMQL da-slider" viewBox="0 0 28 20" preserveAspectRatio="xMinYMid meet" style="left: 12px" > <rect fill="white" x="4" y="0" height="20" width="20" rx="10"></rect> <svg viewBox="0 0 20 20" fill="none"> <path id="ie-p1" fill="rgba(67, 181, 129, 1)" d="M7.89561 14.8538L6.30462 13.2629L14.3099 5.25755L15.9009 6.84854L7.89561 14.8538Z" ></path> <path id="ie-p2" fill="rgba(67, 181, 129, 1)" d="M4.08643 11.0903L5.67742 9.49929L9.4485 13.2704L7.85751 14.8614L4.08643 11.0903Z" ></path> </svg> </svg> <input id="ie-check" type="checkbox" class="input-rwLH4i da-input" tabindex="0" ${size ? 'checked=""' : ''}/> </div></div></div><div class="note-1V3kyJ da-note"> <div class="colorStandard-2KCXvj size14-e6ZScH description-3_Ncsb formText-3fs7AJ da-description da-formText modeDefault-3a2Ph1 da-modeDefault" > Discord CDN Endpoint allows to resize the image using <strong>powers of two</strong> or <strong>40</strong>, check this option to use custom emoji sizes. </div></div><div class="divider-3573oO da-divider dividerDefault-3rvLe- da-dividerDefault" ></div></div>`;
        let sliderHTML = `<div class="marginTop20-3TxNs6 da-marginTop20"> <h5 class="colorStandard-2KCXvj size14-e6ZScH h5-18_1nd title-3sZWYQ da-h5 da-title defaultMarginh5-2mL-bP da-defaultMarginh5"> Image Size </h5> <div id="ie-slider" class="slider-1PF9SW da-slider marginTop20-3TxNs6 da-marginTop20 marginBottom4-2qk4Hy da-marginBottom4 disabled-bolDAc da-disabled" aria-valuemin="50" aria-valuemax="200" aria-valuenow="100" aria-disabled="true" role="slider" tabindex="0"> <input type="number" class="input-2_ChIk da-input" readonly="" value="40"/> <div class="track-11EASc da-track" style="position: absolute"> <div id="ie-16" class="mark-1xjQqt da-mark" style="left: 0%"> <div class="markValue-2DwdXI da-markValue">16px</div><div class="markDash-3hAolZ da-markDash"></div></div><div id="ie-32" class="mark-1xjQqt da-mark" style="left: 11.111%"> <div class="markValue-2DwdXI da-markValue">32px</div><div class="markDash-3hAolZ da-markDash"></div></div><div id="ie-40" class="mark-1xjQqt da-mark defaultValue-3gC7yw da-defaultValue" style="left: 22.222%"> <div class="markValue-2DwdXI da-markValue">40px</div><div class="markDash-3hAolZ da-markDash"></div></div><div id="ie-64" class="mark-1xjQqt da-mark" style="left: 33.333%"> <div class="markValue-2DwdXI da-markValue">64px</div><div class="markDash-3hAolZ da-markDash"></div></div><div id="ie-128" class="mark-1xjQqt da-mark" style="left: 44.444%"> <div class="markValue-2DwdXI da-markValue">128px</div><div class="markDash-3hAolZ da-markDash"></div></div><div id="ie-256" class="mark-1xjQqt da-mark" style="left: 55.555%"> <div class="markValue-2DwdXI da-markValue">256px</div><div class="markDash-3hAolZ da-markDash"></div></div><div id="ie-512" class="mark-1xjQqt da-mark" style="left: 66.667%"> <div class="markValue-2DwdXI da-markValue">512px</div><div class="markDash-3hAolZ da-markDash"></div></div><div id="ie-1024" class="mark-1xjQqt da-mark" style="left: 77.778%"> <div class="markValue-2DwdXI da-markValue">1024px</div><div class="markDash-3hAolZ da-markDash"></div></div><div id="ie-2048" class="mark-1xjQqt da-mark" style="left: 88.889%"> <div class="markValue-2DwdXI da-markValue">2048px</div><div class="markDash-3hAolZ da-markDash"></div></div><div id="ie-4096" class="mark-1xjQqt da-mark" style="left: 100%"> <div class="markValue-2DwdXI da-markValue">4096px</div><div class="markDash-3hAolZ da-markDash"></div></div></div><div class="bar-2Qqk5Z da-bar"> <div id="ie-bar" class="barFill-23-gu- da-barFill" style="width: 22.222%"></div></div><div class="track-11EASc da-track"> <div id="ie-tick" class="grabber-3mFHz2 da-grabber bd-guild" style="left: 22.222%"></div></div></div></div>`;
        div.innerHTML = checkboxHTML + sliderHTML;
        setTimeout(()=>this.onSettings(div, size), 100);
        return div;
    }
    onSettings(panel, size) {
        // Make SettingsPanel functional (Checkbox + Slider)
        panel.style = `padding: 20px; display:block`;
        this.id('ie-check').addEventListener('change', ()=>this.useFixedSize(this.id('ie-check').checked ? 40 : 0))
        this.useFixedSize(size);
        this.makeDraggable(this.id('ie-tick'));
    }
    useFixedSize(toggle) {
        // Make Checkbox functional + Change Slider value to default
        if (!toggle) this.setFixedSize(0);
        else this.setFixedSize(toggle);
        this.id('ie-slider').classList = toggle ? "slider-1PF9SW da-slider marginTop20-3TxNs6 da-marginTop20 marginBottom4-2qk4Hy da-marginBottom4" : "slider-1PF9SW da-slider marginTop20-3TxNs6 da-marginTop20 marginBottom4-2qk4Hy da-marginBottom4 disabled-bolDAc da-disabled";
        this.id('ie-slider').setAttribute('aria-disabled', !toggle);
        this.id('ie-btn').style = toggle ? "opacity: 1; background-color: rgb(67, 181, 129)" : "opacity: 1; background-color: rgb(114, 118, 125)";
        this.id('ie-svg').style = toggle ? "left: 12px" : "left: -3px";
        this.id('ie-p1').setAttribute('fill', toggle ? "rgba(67, 181, 129, 1)" : "rgba(114, 118, 125, 1)");
        this.id('ie-p2').setAttribute('fill', toggle ? "rgba(67, 181, 129, 1)" : "rgba(114, 118, 125, 1)");
        this.id('ie-p1').setAttribute('d', toggle ? "M7.89561 14.8538L6.30462 13.2629L14.3099 5.25755L15.9009 6.84854L7.89561 14.8538Z" : "M5.13231 6.72963L6.7233 5.13864L14.855 13.2704L13.264 14.8614L5.13231 6.72963Z");
        this.id('ie-p2').setAttribute('d', toggle ? "M4.08643 11.0903L5.67742 9.49929L9.4485 13.2704L7.85751 14.8614L4.08643 11.0903Z" : "M13.2704 5.13864L14.8614 6.72963L6.72963 14.8614L5.13864 13.2704L13.2704 5.13864Z");
    }
    setFixedSize(size) {
        // Save fixed size on configs
        BdApi.saveData('ImageEmojis', 'fixedSize', size);
        if (!size) 
            size = 40;
        const percent = this.id(`ie-${size}`).style.left;
        this.id('ie-tick').style.left = percent;
        this.id('ie-bar').style.width = percent;
    }
    makeDraggable(node) {
        // Make Slider functional
        let dragging = false;
        let b = node.parentElement.getBoundingClientRect();
        let last = false;
        node.addEventListener('dragenter',   e => e.preventDefault());
        node.addEventListener('dragover',    e => e.preventDefault());
        node.addEventListener('dragstart',   e => e.preventDefault());
        node.parentElement.addEventListener('mousedown', () => dragging = true);
        node.parentElement.addEventListener('mouseup', () => dragging = false);
        node.parentElement.addEventListener('mousemove', e => {
            const isTracker = e.srcElement.classList[0].includes("track")
            if (dragging && isTracker) {
                let x = e.layerX;
                let w = 517;
                let selected = Math.round(x/w*9);
                let values = [16, 32, 40, 64, 128, 256, 512, 1024, 2048, 4096];
                if (last !== selected)
                    this.setFixedSize(values[(last = selected)]);
            }
        });
    }
};
