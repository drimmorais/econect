import app from "./app";
import { Server } from 'http';

let port = process.env.PORT || app.PORT;

app.server.listen(port, function () {
    console.log(`server running in" + ${port}`);
});
