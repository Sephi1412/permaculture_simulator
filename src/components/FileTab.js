export class FileTab {
    constructor({ visible, clickable }) {
        this.visible = visible;
        this.id = "options-tab-file"
        this.clickable = clickable;
        this.code = "";
        this._create();
    

        document.getElementById("test-visibility").addEventListener("click", () => this.toggleVisibility())
    }

    _create() {
        const isClickable = this.clickable ? " navbar-btn" : "disabled";
        const visibility = this.visible ? "flex" : "none";
        this.code = `
        <a class="navbar-item option ${isClickable}" role="button" data-bs-toggle="dropdown" style="display:${visibility}"
            aria-expanded="false" id="${this.id}">
            File
        </a>

        <ul class="dropdown-menu dropdown-tab" id="${this.id}-contents">
            <li><a class="dropdown-item disabled">New...</a></li>

            <li>
                <hr class="dropdown-divider">
            </li>
            <li><a class="dropdown-item">Project</a></li>
        </ul>
        `
    }

    toggleVisibility() {
        console.log("AAAAAAAA")
        const target = document.getElementById(this.id);
        this.visible = !this.visible;
        console.log(target.style.display)
        target.style.display = this.visible ? "flex" : "none";        
    }
}