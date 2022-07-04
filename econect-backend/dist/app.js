"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const psql_1 = __importDefault(require("./psql"));
dotenv_1.default.config();
const generic_1 = __importDefault(require("./src/routes/generic"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
psql_1.default.connect()
    .then(() => {
    app.emit('Connected');
})
    .catch((e) => console.log(e));
const swaggerDocs = swagger_jsdoc_1.default(swagger_json_1.default);
const app = express_1.default();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(cors_1.default());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'x-www-form-urlencoded, Origin, X-Requested-With, Content-Type, Accept, Authorization, *');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE, OPTIONS');
        // res.setHeader('Access-Control-Allow-Credentials', true);
        return res.status(200).json({});
    }
    next();
});
app.use(generic_1.default);
app.use('/doc/apiv1', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
const port = 8080;
app.on('Connected', () => {
    app.listen(process.env.PORT || port, () => {
        console.log(`Server running on :${port}`);
        console.log('Press CTRL + C to exit');
    });
});
