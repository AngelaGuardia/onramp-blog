"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const M = __importStar(require("materialize-css"));
const vue_1 = __importDefault(require("vue"));
// tslint:disable-next-line no-unused-expression
new vue_1.default({
    computed: {
        hazGuitars() {
            return this.isLoading === false && this.guitars.length > 0;
        },
        noGuitars() {
            return this.isLoading === false && this.guitars.length === 0;
        }
    },
    data() {
        return {
            brand: "",
            color: "",
            guitars: [],
            isLoading: true,
            model: "",
            selectedGuitar: "",
            selectedGuitarId: 0,
            year: ""
        };
    },
    el: "#app",
    methods: {
        addGuitar() {
            const guitar = {
                brand: this.brand,
                color: this.color,
                model: this.model,
                year: this.year
            };
            axios_1.default
                .post("/api/guitars/add", guitar)
                .then(() => {
                this.$refs.year.focus();
                this.brand = "";
                this.color = "";
                this.model = "";
                this.year = "";
                this.loadGuitars();
            })
                .catch((err) => {
                // tslint:disable-next-line:no-console
                console.log(err);
            });
        },
        confirmDeleteGuitar(id) {
            const guitar = this.guitars.find((g) => g.id === id);
            this.selectedGuitar = `${guitar.year} ${guitar.brand} ${guitar.model}`;
            this.selectedGuitarId = guitar.id;
            const dc = this.$refs.deleteConfirm;
            const modal = M.Modal.init(dc);
            modal.open();
        },
        deleteGuitar(id) {
            axios_1.default
                .delete(`/api/guitars/remove/${id}`)
                .then(this.loadGuitars)
                .catch((err) => {
                // tslint:disable-next-line:no-console
                console.log(err);
            });
        },
        loadGuitars() {
            axios_1.default
                .get("/api/guitars/all")
                .then((res) => {
                this.isLoading = false;
                this.guitars = res.data;
            })
                .catch((err) => {
                // tslint:disable-next-line:no-console
                console.log(err);
            });
        }
    },
    mounted() {
        return this.loadGuitars();
    }
});
//# sourceMappingURL=main.js.map