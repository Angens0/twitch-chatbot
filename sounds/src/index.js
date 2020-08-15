const { httpServer } = require("./httpServer");
require("./io");

httpServer.listen(4000, () => {
    console.log("listening on :4000");
});
